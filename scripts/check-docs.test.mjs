import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  checkBuiltHtml,
  inspectHtml,
  loadBuildBase,
  normalizeBase,
  resolveTarget,
  validateMetadata,
} from "./check-docs.mjs";

const metadata = () => ({
  projects: [
    {
      slug: "demo",
      name: "Demo",
      icon: "D",
      description: "Demo project",
      source: "Demo",
      tags: ["Web"],
      paths: [
        { label: "Start", path: "getting-started", description: "Setup" },
      ],
      related: [],
    },
  ],
  reviews: {
    demo: {
      reviewedAt: "2026-01-01",
      scope: "Setup",
      sources: [
        { repository: "Demo", commit: "a".repeat(40), paths: ["src/main.ts"] },
      ],
    },
  },
});
test("valid metadata", () => {
  const { projects, reviews } = metadata();
  validateMetadata(projects, reviews);
});
for (const [name, mutate, message] of [
  ["duplicate slug", (p) => p.push(p[0]), /duplicate/],
  ["missing description", (p) => delete p[0].description, /description/],
  ["missing entry paths", (p) => (p[0].paths = []), /entry paths/],
  ["unsafe entry", (p) => (p[0].paths[0].path = "../escape"), /entry path/],
  ["missing related", (p) => delete p[0].related, /related/],
  [
    "unknown related",
    (p) =>
      (p[0].related = [
        { slug: "unknown", page: "", label: "Other", reason: "Integration" },
      ]),
    /related/,
  ],
  ["missing review", (p, r) => delete r.demo, /missing source review/],
  [
    "invalid calendar date",
    (p, r) => (r.demo.reviewedAt = "2026-02-30"),
    /reviewedAt/,
  ],
  ["short commit", (p, r) => (r.demo.sources[0].commit = "abc"), /commit/],
  [
    "unsafe review path",
    (p, r) => (r.demo.sources[0].paths = ["../secret"]),
    /source paths/,
  ],
  ["missing scope", (p, r) => (r.demo.scope = ""), /scope/],
  ["unknown review", (p, r) => (r.extra = r.demo), /unknown project/],
])
  test(`rejects ${name}`, () => {
    const { projects, reviews } = metadata();
    mutate(projects, reviews);
    assert.throws(() => validateMetadata(projects, reviews), message);
  });

test("HTML parser handles entities, unquoted attributes and decorative alt", () => {
  const doc = inspectHtml(
    '<h1 id="a&amp;b">Title</h1><img alt="" src=x><a href="/#a&amp;b">go</a>',
  );
  assert.ok(doc.ids.has("a&b"));
  assert.deepEqual(doc.errors, []);
  assert.ok(doc.references.some((r) => r.value === "/#a&b"));
});
test("external web links open safely in a new tab", () => {
  for (const href of [
    "https://example.invalid/",
    "http://example.invalid/",
    "//example.invalid/",
  ]) {
    assert.deepEqual(
      inspectHtml(
        `<a href="${href}" target="_blank" rel="noopener noreferrer">External</a>`,
      ).errors,
      [],
    );
    assert.match(
      inspectHtml(`<a href="${href}">External</a>`).errors.join("\n"),
      /new tab/,
    );
    assert.match(
      inspectHtml(`<a href="${href}" target="_blank">External</a>`).errors.join(
        "\n",
      ),
      /noopener/,
    );
  }
});
test("VitePress social links with noopener are safe", () => {
  assert.deepEqual(
    inspectHtml(
      '<a href="https://github.com/example" target="_blank" rel="noopener">GitHub</a>',
    ).errors,
    [],
  );
});
test("internal links, anchors and email links do not need a new tab", () => {
  assert.deepEqual(
    inspectHtml(
      '<a href="/projects/">Projects</a><a href="#setup">Setup</a><a href="mailto:help@example.invalid">Email</a>',
    ).errors,
    [],
  );
});
async function fixture(t, files) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "check-docs-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const [name, html] of Object.entries(files)) {
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  return dir;
}
test("checks clean URLs, relative links, encoded hashes and ignores external URLs", async (t) => {
  const dir = await fixture(t, {
    "index.html":
      '<a href="/guide/?q=1#hello%20world">Go</a><a href="https://example.invalid/no" target="_blank" rel="noopener noreferrer">External</a><a href="mailto:x@example.invalid">Mail</a>',
    "guide/index.html":
      '<h1 id="hello world">Hello</h1><img src="../image.svg" alt=""><a href="../">Home</a>',
    "image.svg": "<svg/>",
  });
  assert.deepEqual(await checkBuiltHtml(dir), []);
});
for (const [name, html, pattern] of [
  ["broken link", '<a href="/missing">Broken</a>', /missing internal target/],
  ["broken hash", '<a href="#missing">Broken</a>', /missing anchor/],
  ["missing alt", '<img src="/image.svg">', /missing alt/],
  [
    "broken image",
    '<img alt="test" src="/missing.png">',
    /missing internal target/,
  ],
  [
    "broken srcset",
    '<img alt="test" srcset="/missing.png 2x">',
    /missing internal target/,
  ],
])
  test(name, async (t) => {
    const dir = await fixture(t, { "index.html": html, "image.svg": "<svg/>" });
    assert.match((await checkBuiltHtml(dir)).join("\n"), pattern);
  });
for (const base of ["/Freetime-Docs/", "/nested/docs/"]) {
  test(`checks links and metadata under ${base}`, async (t) => {
    const dir = await fixture(t, {
      "index.html": `<a href="${base}guide?q=1#hello%20world">Guide</a><img alt="" src="${base}image.svg">`,
      "guide.html":
        '<h1 id="hello world">Guide</h1><a href="#hello%20world">Here</a><a href="./">Home</a>',
      "image.svg": "<svg/>",
      "projects/demo/index.html": "Demo",
      "projects/demo/getting-started.html": "Start",
    });
    assert.deepEqual(await checkBuiltHtml(dir, metadata().projects, base), []);
    assert.deepEqual(
      await resolveTarget(
        dir,
        `${base}index.html`,
        `${base}guide#hello%20world`,
        base,
      ),
      {
        file: path.join(dir, "guide.html"),
        hash: "hello world",
      },
    );
    assert.equal(
      await resolveTarget(
        dir,
        `${base}index.html`,
        "https://example.invalid/no",
        base,
      ),
      null,
    );
  });
}

for (const reference of [
  "/image.svg",
  "/Freetime-Docs-evil/image.svg",
  "/Freetime-Docs",
  "../image.svg",
  "/Freetime-Docs/%2e%2e/image.svg",
  "/Freetime-Docs/%2e%2e%2fimage.svg",
  "/Freetime-Docs/guide%2f..%2fimage.svg",
  "/Freetime-Docs/guide%5c..%5cimage.svg",
  "http://docs.invalid/image.svg",
]) {
  test(`rejects outside-base or encoded traversal target ${reference}`, async (t) => {
    const dir = await fixture(t, { "image.svg": "<svg/>" });
    await assert.rejects(
      resolveTarget(
        dir,
        "/Freetime-Docs/index.html",
        reference,
        "/Freetime-Docs/",
      ),
      /outside deployment base|escapes build/,
    );
  });
}

test("reports root-relative assets outside deployment base even when file exists", async (t) => {
  const dir = await fixture(t, {
    "index.html": '<img alt="" src="/logo.svg">',
    "logo.svg": "<svg/>",
  });
  assert.match(
    (await checkBuiltHtml(dir, [], "/Freetime-Docs/")).join("\n"),
    /outside deployment base/,
  );
});

test("loads actual build base and requires valid deployment metadata", async (t) => {
  const dir = await fixture(t, { "index.html": "Home" });
  await assert.rejects(loadBuildBase(dir), /deployment metadata/);
  for (const base of ["/", "/Freetime-Docs/", "/nested/docs/"]) {
    await writeFile(
      path.join(dir, ".deployment.json"),
      JSON.stringify({ base }),
    );
    assert.equal(await loadBuildBase(dir), base);
  }
  for (const content of [
    "{",
    "{}",
    '{"base":null}',
    '{"base":"https://example.invalid/"}',
    '{"base":"/../"}',
  ]) {
    await writeFile(path.join(dir, ".deployment.json"), content);
    await assert.rejects(loadBuildBase(dir));
  }
});

test("deployment base must be a canonical absolute directory path", () => {
  assert.equal(normalizeBase(), "/");
  for (const base of [
    "",
    "docs",
    "/docs",
    "//docs/",
    "/a/../",
    "/%2e/",
    "/docs/?q=1",
    "/docs/#hash",
    null,
  ])
    assert.throws(() => normalizeBase(base), /invalid deployment base/);
});

test("checks metadata targets even if no HTML link points to them", async (t) => {
  const dir = await fixture(t, { "index.html": "<h1>Home</h1>" });
  const { projects } = metadata();
  projects[0].related = [
    {
      slug: "other",
      page: "integration",
      label: "Other",
      reason: "Integration",
    },
  ];
  const errors = (await checkBuiltHtml(dir, projects)).join("\n");
  assert.match(errors, /\/projects\/demo\/getting-started/);
  assert.match(errors, /\/projects\/other\/integration/);
});
