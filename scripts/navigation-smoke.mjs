import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
import ts from "typescript";
import { createServer } from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, expect } from "@playwright/test";
import {
  dist,
  root,
  loadMetadata,
  loadBuildBase,
  normalizeBase,
  resolveTarget,
} from "./check-docs.mjs";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function withBase(base, route) {
  if (
    !route.startsWith("/") ||
    route.startsWith("//") ||
    (base !== "/" && route.startsWith(base))
  )
    throw new Error(`Expected an unprefixed logical route: ${route}`);
  return base + route.slice(1);
}

// Deliberately independent of browser-smoke.mjs: importing it runs its matrix.
function createBuiltServer(base) {
  base = normalizeBase(base);
  const server = createServer(async (request, response) => {
    try {
      const target = await resolveTarget(dist, base, request.url ?? "/", base);
      if (!target) throw new Error("External request target");
      const body = await readFile(target.file);
      response.writeHead(200, {
        "Content-Type":
          mime[path.extname(target.file)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  server.requestTimeout = 10_000;
  server.headersTimeout = 10_000;
  return server;
}

async function noOverflow(page) {
  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            Math.max(
              document.documentElement.scrollWidth,
              document.body.scrollWidth,
            ) - innerWidth,
        ),
      { message: "Controls must not cause horizontal document overflow" },
    )
    .toBeLessThanOrEqual(1);
}

async function externalLinks(page) {
  const links = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors
      .filter((anchor) =>
        /^(?:https?:)?\/\//i.test(anchor.getAttribute("href") ?? ""),
      )
      .map((anchor) => ({
        href: anchor.href,
        target: anchor.target,
        rel: anchor.rel.toLowerCase().split(/\s+/),
      })),
  );
  expect(
    links.length,
    "Page must expose external hyperlinks to inspect",
  ).toBeGreaterThan(0);
  for (const link of links) {
    expect(link.target, link.href).toBe("_blank");
    expect(link.rel, link.href).toContain("noopener");
  }
}

async function checkNavigation(
  browser,
  origin,
  base,
  versions,
  versionPages,
  mobile,
) {
  const context = await browser.newContext({
    viewport: mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
    colorScheme: "light",
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  let page;
  try {
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      return url.origin === origin || ["data:", "blob:"].includes(url.protocol)
        ? route.continue()
        : route.abort();
    });
    page = await context.newPage();
    page.setDefaultTimeout(8_000);
    page.setDefaultNavigationTimeout(15_000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (new URL(response.url()).origin === origin && response.status() >= 400)
        errors.push(`HTTP ${response.status()}: ${response.url()}`);
    });
    const sidebar = page.locator(".VPSidebar");
    const version = sidebar.locator(".version-selector select");
    const theme = page.locator(".theme-toggle");
    const archive = versions.versions.find(
      (value) => value !== versions.current,
    );
    const archiveRoot = `/versions/${archive}/`;

    async function goto(route) {
      const response = await page.goto(origin + withBase(base, route), {
        waitUntil: "networkidle",
      });
      expect(response?.status(), route).toBe(200);
      await expect(page.locator(".VPDoc")).toBeVisible();
      await expect(page.locator(".VPHome")).toHaveCount(0);
    }
    async function openSidebar() {
      if (
        mobile &&
        !(await sidebar.evaluate((element) =>
          element.classList.contains("open"),
        ))
      ) {
        const menu = page.locator(".VPLocalNav button.menu");
        await expect(menu).toContainText("Menu");
        await menu.click();
      }
      await expect(sidebar).toBeVisible();
      if (mobile) await noOverflow(page);
    }
    async function switchVersion(value, destination) {
      await openSidebar();
      await version.selectOption(value);
      await expect(page).toHaveURL(origin + withBase(base, destination));
      await openSidebar();
      await expect(version).toHaveValue(value);
    }
    async function checkLayout() {
      await openSidebar();
      const sections = page.locator("nav.docs-section-nav");
      await expect(sections).toHaveCount(1);
      expect(
        await sections.evaluate((element) => !element.closest(".VPSidebar")),
        "Section navigation must be separate from the sidebar",
      ).toBe(true);
      await expect(sidebar.locator(".version-selector select")).toHaveCount(1);
      await expect(version).toBeVisible();
      await expect(
        sidebar.locator(".version-selector label > span"),
      ).toHaveText("Documentation version");
      await expect(sidebar.getByLabel(/Documentation version/)).toHaveCount(1);
      expect(
        await sidebar.evaluate((element) => {
          const select = element.querySelector(".version-selector select");
          const firstLink = element.querySelector("a[href]");
          return Boolean(
            select &&
            firstLink &&
            select.compareDocumentPosition(firstLink) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );
        }),
        "Version selector must precede the first sidebar link",
      ).toBe(true);
      const firstLink = sidebar.locator("a[href]").first();
      const firstHref = await firstLink.getAttribute("href");
      const firstText = (await firstLink.innerText()).trim();
      if (
        firstHref !== withBase(base, "/getting-started/") ||
        firstText !== "Getting Started"
      ) {
        const issue = `First sidebar link must be Getting Started (${withBase(base, "/getting-started/")}), received ${firstText} (${firstHref})`;
        if (!errors.includes(issue)) {
          errors.push(issue);
          const artifacts = path.join(root, "artifacts/navigation-smoke");
          await mkdir(artifacts, { recursive: true });
          await page.screenshot({
            path: path.join(
              artifacts,
              `${mobile ? "mobile" : "desktop"}-sidebar-order.png`,
            ),
            timeout: 5_000,
          });
          console.error(issue);
        }
      }
      await expect(
        sidebar.getByText("Documentation versions", { exact: true }),
      ).toHaveCount(0);
      await expect(page.locator(".VPNav .version-selector")).toHaveCount(0);
      const versionDropdowns = page
        .locator(".VPNav .VPNavBarMenuGroup")
        .filter({
          hasText: new RegExp(
            versions.versions
              .concat(versions.current)
              .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .join("|"),
          ),
        });
      await expect(versionDropdowns).toHaveCount(0);
      expect(
        await version
          .locator("option")
          .evaluateAll((elements) => elements.map((el) => el.value)),
      ).toEqual([
        versions.current,
        ...new Set(versions.versions.filter((v) => v !== versions.current)),
      ]);
      if (mobile) {
        expect(
          await page
            .locator(".VPLocalNav button.menu")
            .evaluate((element) => !element.closest(".docs-section-nav")),
          "Mobile Menu is not a section-navigation item",
        ).toBe(true);
      }
    }

    await goto("/");
    await checkLayout();
    await externalLinks(page);
    await goto("/getting-started/");
    await checkLayout();
    await switchVersion(archive, `${archiveRoot}getting-started/`);
    const archivedLinks = await sidebar
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")),
      );
    expect(archivedLinks.length).toBeGreaterThan(0);
    for (const href of archivedLinks)
      expect(href, "Archive sidebar must stay within its version").toMatch(
        new RegExp(
          `^${withBase(base, archiveRoot).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        ),
      );
    await externalLinks(page);
    await switchVersion(versions.current, "/getting-started/");
    const archivedPages = versionPages[archive];
    const missing = versionPages[versions.current].find(
      (file) => !archivedPages.includes(file),
    );
    const pageRoute = (file) =>
      file === "index.md"
        ? ""
        : file.replace(/index\.md$/, "").replace(/\.md$/, "");
    if (missing) {
      await goto("/" + pageRoute(missing));
      await switchVersion(archive, archiveRoot);
    } else {
      console.log("No differing archive page; missing-page fallback covered by unit tests");
    }
    await goto("/getting-started/");
    await expect(page.locator("html")).toHaveAttribute("lang", /^en(?:-|$)/);
    await expect(page.locator('.language-selector, .VPNavBarTranslations, select[aria-label*="language" i]')).toHaveCount(0);
    await expect(theme).toHaveCount(1);
    // No stored preference: both system startup modes must be honored.
    for (const mode of ["dark", "light"]) {
      await page.evaluate(() => localStorage.removeItem("vitepress-theme-appearance"));
      await page.emulateMedia({ colorScheme: mode });
      await page.reload({ waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveClass(mode === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/);
      await expect(theme).toHaveAccessibleName(`Switch to ${mode === "dark" ? "light" : "dark"} theme`);
    }
    for (const mode of ["dark", "light"]) {
      await theme.click();
      await expect(page.locator("html")).toHaveClass(mode === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/);
      await page.emulateMedia({ colorScheme: mode === "dark" ? "light" : "dark" });
      await page.reload({ waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveClass(mode === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/);
      await expect(theme).toHaveAccessibleName(`Switch to ${mode === "dark" ? "light" : "dark"} theme`);
      if (mobile) await noOverflow(page);
    }
    const artifacts = path.join(root, "artifacts/reference-layout");
    await mkdir(artifacts, { recursive: true });
    await page.screenshot({ path: path.join(artifacts, `${mobile ? "mobile" : "desktop"}.png`), fullPage: true });
    await goto("/projects/md-blog/getting-started");
    const block = page.locator("div.language-bash").first();
    const expected = (await block.locator("pre code").innerText()).trim();
    expect(expected).toContain("curl -i --max-time 5 http://localhost:3000/");
    expect(await page.evaluate(() => isSecureContext)).toBe(true);
    await page.evaluate(() =>
      navigator.clipboard.writeText("navigation-smoke sentinel"),
    );
    await block.hover();
    await block.locator("button.copy").click();

    await expect
      .poll(async () =>
        (await page.evaluate(() => navigator.clipboard.readText())).trim(),
      )
      .toBe(expected);
    await externalLinks(page);
    expect(errors, "Browser runtime and local HTTP errors").toEqual([]);
    console.log(`PASS navigation ${mobile ? "mobile" : "desktop"}`);
  } catch (error) {
    const artifacts = path.join(root, "artifacts/navigation-smoke");
    await mkdir(artifacts, { recursive: true });
    const screenshot = path.join(
      artifacts,
      `${mobile ? "mobile" : "desktop"}-failure.png`,
    );
    await page
      ?.screenshot({ path: screenshot, fullPage: true, timeout: 5_000 })
      .then(() => console.error(`Screenshot: ${screenshot}`))
      .catch(() => {});
    throw error;
  } finally {
    await context.close();
  }
}

export async function main() {
  const versions = JSON.parse(
    await readFile(path.join(root, "docs/versions.json"), "utf8"),
  );
  assert.equal(typeof versions.current, "string");
  assert(
    Array.isArray(versions.versions) &&
      versions.versions.some((v) => v !== versions.current),
    "An archived version is required",
  );
  for (const version of [versions.current, ...versions.versions])
    assert.match(
      version,
      /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/,
      "Safe version identifier required",
    );
  const source = await readFile(
    path.join(root, "docs/.vitepress/version-navigation.ts"),
    "utf8",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const { buildVersionPages } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
  );
  const versionPages = buildVersionPages(path.join(root, "docs"), versions);
  const { projects } = await loadMetadata();
  for (const slug of ["freetime-core", "md-blog"])
    assert(
      projects.some((project) => project.slug === slug),
      `Missing test project: ${slug}`,
    );
  const base = await loadBuildBase();
  await resolveTarget(dist, base, withBase(base, "/getting-started/"), base);
  const server = createBuiltServer(base);
  let browser;
  let timer;
  const cleanup = async () => {
    try {
      await browser?.close();
    } finally {
      server.closeAllConnections();
      await new Promise((resolve, reject) =>
        server.close((error) =>
          error && error.code !== "ERR_SERVER_NOT_RUNNING"
            ? reject(error)
            : resolve(),
        ),
      );
    }
  };
  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ timeout: 30_000 });
    await Promise.race([
      (async () => {
        const failures = [];
        for (const mobile of [false, true]) {
          try {
            await checkNavigation(
              browser,
              origin,
              base,
              versions,
              versionPages,
              mobile,
            );
          } catch (error) {
            failures.push(`${mobile ? "Mobile" : "Desktop"}: ${error.message}`);
          }
        }
        if (failures.length) throw new Error(failures.join("\n\n"));
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("Navigation smoke exceeded 180 seconds")),
          180_000,
        );
      }),
    ]);
    console.log("Navigation smoke passed.");
  } finally {
    clearTimeout(timer);
    await cleanup();
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
