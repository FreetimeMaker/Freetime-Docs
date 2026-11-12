import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, expect } from "@playwright/test";
import {
  dist,
  root,
  loadMetadata,
  projectTarget,
  resolveTarget,
} from "./check-docs.mjs";

const artifacts = path.join(root, "artifacts/browser-smoke");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

export function createBuiltServer() {
  return createServer(async (request, response) => {
    try {
      const target = await resolveTarget(dist, "/", request.url);
      if (!target) throw new Error("External target");
      const data = await readFile(target.file);
      response.writeHead(200, {
        "Content-Type":
          mime[path.extname(target.file)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      });
      response.end(data);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
}

async function checkFeedback(page, pagePath) {
  const heading = await page.locator("main h1").evaluate((el) => {
    const copy = el.cloneNode(true);
    copy
      .querySelectorAll(".header-anchor")
      .forEach((anchor) => anchor.remove());
    return copy.textContent.trim();
  });
  const link = page.getByRole("link", { name: /report/i }).first();
  await expect(link).toHaveAttribute("href", /github\.com\/.*\/issues/);
  // URLSearchParams decodes percent escapes and '+' before we inspect the payload.
  const url = new URL(await link.getAttribute("href"));
  expect(
    url.searchParams.get("title")?.trim(),
    `${pagePath}: decoded feedback title`,
  ).toContain(heading);
  expect(
    url.searchParams.get("body"),
    `${pagePath}: decoded feedback body`,
  ).toContain(pagePath);
  return url.href;
}

async function checkKeyboardAndSearch(page, project) {
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused, "Tab must focus a visible control").toBeVisible();
  expect(
    await focused.evaluate((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const outlined =
        style.outlineStyle !== "none" &&
        parseFloat(style.outlineWidth) > 0 &&
        style.outlineColor !== "transparent" &&
        style.outlineColor !== "rgba(0, 0, 0, 0)";
      return (
        el.matches(":focus-visible") &&
        (outlined || style.boxShadow !== "none") &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < innerHeight
      );
    }),
    "Keyboard focus must have a visible focus indicator in the viewport",
  ).toBe(true);
  await page
    .getByRole("button", { name: /search/i })
    .first()
    .click();
  // VitePress local search uses a listbox-owning container, not role="dialog".
  const dialog = page.locator(".VPLocalSearchBox");
  await expect(dialog).toBeVisible();
  await dialog.locator("input").first().fill(project.name);
  const result = dialog
    .locator(`a[href^="${projectTarget(project.slug)}"]`)
    .first();
  await expect(
    result,
    `Local search must return ${project.name}`,
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
}

async function main() {
  const { projects, reviews } = await loadMetadata();

  const server = createBuiltServer();
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ timeout: 30_000 });
    const routes = [
      { url: "/", kind: "home" },
      { url: "/projects/", kind: "directory" },
      ...projects.map((project) => ({
        url: projectTarget(project.slug),
        kind: "overview",
        project,
      })),
      {
        url: projectTarget(projects[0].slug, "getting-started"),
        kind: "subpage",
        project: projects[0],
      },
    ];
    console.log(
      `Browser matrix: ${routes.length} routes × 2 viewports × 2 color schemes = ${routes.length * 4} cases`,
    );
    const failures = [];
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      for (const colorScheme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme,
          reducedMotion: "reduce",
        });
        try {
          // Never contact live APIs, analytics, or remote image hosts during the smoke test.
          await context.route("**/*", (route) => {
            const url = new URL(route.request().url());
            return url.origin === origin ||
              ["data:", "blob:"].includes(url.protocol)
              ? route.continue()
              : route.abort();
          });
          await context.addInitScript(
            (scheme) =>
              localStorage.setItem("vitepress-theme-appearance", scheme),
            colorScheme,
          );
          for (const target of routes) {
            const page = await context.newPage();
            const runtime = [];
            page.setDefaultTimeout(8_000);
            page.setDefaultNavigationTimeout(20_000);
            page.on("pageerror", (error) =>
              runtime.push(`pageerror: ${error.message}`),
            );
            page.on("console", (message) => {
              if (message.type() === "error")
                runtime.push(`console: ${message.text()}`);
            });
            page.on("response", (response) => {
              if (response.url().startsWith(origin) && response.status() >= 400)
                runtime.push(`HTTP ${response.status()}: ${response.url()}`);
            });
            const id = `${viewport.name}-${colorScheme}-${target.url.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;
            try {
              const response = await page.goto(origin + target.url, {
                waitUntil: "networkidle",
              });
              expect(response?.status(), `${target.url}: HTTP status`).toBe(
                200,
              );
              await expect(page.locator("html")).toHaveClass(
                colorScheme === "dark" ? /dark/ : /^(?!.*\bdark\b)/,
              );
              await expect(
                page.getByRole("heading", { level: 1 }).first(),
              ).toBeVisible();
              if (target.kind === "home" || target.kind === "directory") {
                await expect(page.locator(".project-card")).toHaveCount(
                  projects.length,
                );
                for (const project of projects)
                  await expect(
                    page.locator(".project-card").getByRole("link", {
                      name: `${project.name} documentation`,
                      exact: true,
                    }),
                  ).toHaveAttribute("href", projectTarget(project.slug));
              }
              if (target.project) {
                const { project } = target;
                const main = page.locator("main");
                if (target.kind === "overview") {
                  await expect(main.locator("h1")).toHaveText(project.name);
                  for (const entry of project.paths)
                    await expect(
                      main
                        .locator(
                          `a[href="${projectTarget(project.slug, entry.path)}"]`,
                        )
                        .first(),
                    ).toBeVisible();
                  await expect(
                    page.locator(".project-relations").getByRole("heading", {
                      name: "Work with other projects",
                      exact: true,
                    }),
                  ).toBeVisible();
                  for (const related of project.related)
                    await expect(
                      page
                        .locator(".project-relations")
                        .locator(
                          `a[href="${projectTarget(related.slug, related.page)}"]`,
                        )
                        .first(),
                    ).toBeVisible();
                  if (project.related.length === 0)
                    await expect(
                      page
                        .locator(".project-relations")
                        .getByText(/no direct integration/i)
                        .first(),
                    ).toBeVisible();
                }
                await expect(
                  page.getByRole("link", { name: /edit.*page/i }).first(),
                ).toHaveAttribute("href", /github\.com\/.*\/edit\//);
                await checkFeedback(page, target.url);
                await expect(
                  page
                    .getByText(reviews[project.slug].reviewedAt, {
                      exact: false,
                    })
                    .first(),
                ).toBeVisible();
                await expect(
                  page
                    .getByText(reviews[project.slug].scope, { exact: false })
                    .first(),
                ).toBeVisible();
              }
              // Force lazy images into view before validating their decoded dimensions.
              for (const image of await page.locator("main img").all()) {
                await image.scrollIntoViewIfNeeded();
                await expect(image).toHaveAttribute("alt", /.*/);
                await expect
                  .poll(
                    () =>
                      image.evaluate(
                        (img) => img.complete && img.naturalWidth > 0,
                      ),
                    { message: `${target.url}: image failed to load` },
                  )
                  .toBe(true);
              }
              const overflow = await page.evaluate(() => ({
                document: document.documentElement.scrollWidth,
                viewport: innerWidth,
                headings: [
                  ...document.querySelectorAll("main h1, main h2, main h3"),
                ]
                  .filter(
                    (el) =>
                      el.getBoundingClientRect().right > innerWidth + 1 ||
                      el.getBoundingClientRect().left < -1,
                  )
                  .map((el) => el.textContent),
              }));
              expect(
                overflow.document,
                `${target.url}: horizontal document overflow`,
              ).toBeLessThanOrEqual(overflow.viewport + 1);
              expect(
                overflow.headings,
                `${target.url}: overflowing headings`,
              ).toEqual([]);
              if (target.kind === "home")
                await checkKeyboardAndSearch(page, projects[0]);
              if (
                target.kind === "overview" &&
                target.project === projects[0]
              ) {
                const nextPath = projectTarget(
                  target.project.slug,
                  "getting-started",
                );
                const beforeFeedback = await checkFeedback(page, target.url);
                const edit = page
                  .getByRole("link", { name: /edit.*page/i })
                  .first();
                const beforeEdit = await edit.getAttribute("href");
                // A window marker distinguishes client-side navigation from a full reload.
                await page.evaluate(() => {
                  window.__docsSmokeSpa = true;
                });
                await page
                  .locator(`main a[href="${nextPath}"]`)
                  .first()
                  .click();
                await expect(page).toHaveURL(origin + nextPath);
                await expect(edit).not.toHaveAttribute("href", beforeEdit);
                expect(
                  decodeURIComponent(await edit.getAttribute("href")),
                  "SPA edit link must target the new Markdown page",
                ).toContain(`docs${nextPath}.md`);
                await expect
                  .poll(
                    () =>
                      page
                        .getByRole("link", { name: /report/i })
                        .first()
                        .getAttribute("href"),
                    { message: "SPA feedback link must update" },
                  )
                  .not.toBe(beforeFeedback);
                expect(await checkFeedback(page, nextPath)).not.toBe(
                  beforeFeedback,
                );
                expect(
                  await page.evaluate(() => window.__docsSmokeSpa),
                  "Navigation must stay within the SPA",
                ).toBe(true);
              }
              expect(runtime, `${target.url}: browser runtime errors`).toEqual(
                [],
              );
              console.log(`PASS ${id}`);
            } catch (error) {
              failures.push(`${id}: ${error.message}\n${runtime.join("\n")}`);
              await mkdir(artifacts, { recursive: true });
              await page
                .screenshot({
                  path: path.join(artifacts, `${id}.png`),
                  fullPage: true,
                  timeout: 10_000,
                })
                .catch((e) =>
                  failures.push(`${id}: screenshot failed: ${e.message}`),
                );
              await writeFile(
                path.join(artifacts, `${id}.txt`),
                `${error.stack}\n${runtime.join("\n")}`,
              );
            } finally {
              await page.close();
            }
          }
        } finally {
          await context.close();
        }
      }
    }
    if (failures.length)
      throw new Error(`Browser smoke failures:\n${failures.join("\n\n")}`);
  } finally {
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
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
