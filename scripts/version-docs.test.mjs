import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { snapshot, rewriteSnapshotLinks } from "./version-docs.mjs";
import {
  buildVersionPages,
  buildArchiveSidebar,
} from "../docs/.vitepress/version-navigation.ts";
import ts from "typescript";

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "version-docs-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  function write(relative, content) {
    const file = path.join(root, "docs", relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  write(
    "versions.json",
    JSON.stringify({ current: "2.x", versions: ["v1.x", "v1.x", "2.x"] }),
  );
  write("index.md", "# Current\n[Start](/getting-started/)\n");
  write("getting-started/index.md", "# Getting Started\n");
  write("projects/example/index.md", "# Example\n[Guide](guide)\n");
  write("projects/example/guide.md", "# Guide\n");
  write("public/img/logo.svg", "<svg/>");
  write("versions/v1.x/index.md", "# Old Home\n");
  write("versions/v1.x/old/index.md", "# Historical Project\n");
  write(
    "versions/v1.x/old/only.md",
    "# Old Only\n[Untouched](./projects/broken/)\n",
  );
  return { root, write, docs: path.join(root, "docs") };
}

// Execute the real SFC setup with just VitePress's runtime boundary mocked.
function selector(relativePath, versionPages, base = "/docs/") {
  const source = fs.readFileSync(
    new URL("../docs/.vitepress/theme/VersionSelector.vue", import.meta.url),
    "utf8",
  );
  const script = source
    .split('<script setup lang="ts">')[1]
    .split("</script>")[0];
  const compiled = ts.transpileModule(script, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const navigations = [];
  const exports = {};
  const state = new Function(
    "require",
    "exports",
    compiled + "\nreturn { selected, versions, changeVersion };",
  )((name) => {
    if (name === "vue")
      return {
        computed: (read) => ({
          get value() {
            return read();
          },
        }),
      };
    if (name === "vitepress")
      return {
        useData: () => ({
          page: { value: { relativePath } },
          theme: { value: { versionPages } },
        }),
        useRouter: () => ({ go: (route) => navigations.push(route) }),
        withBase: (route) => base + route.slice(1),
      };
    if (name.endsWith("versions.json"))
      return {
        __esModule: true,
        default: { current: "2.x", versions: ["v1.x", "v1.x", "2.x"] },
      };
    throw new Error(`Unexpected client import: ${name}`);
  }, exports);
  return {
    ...state,
    navigations,
    choose: (value) => state.changeVersion({ target: { value } }),
  };
}

test("selector deduplicates versions, derives selection and preserves pages with a base", () => {
  const state = selector("versions/v1.x/projects/example/guide.md", {
    "2.x": ["index.md", "projects/example/guide.md"],
    "v1.x": ["index.md"],
  });
  assert.equal(state.selected.value, "v1.x");
  assert.deepEqual(state.versions, ["2.x", "v1.x"]);
  state.choose("2.x");
  assert.deepEqual(state.navigations, ["/docs/projects/example/guide"]);
});

test("selector falls back to the destination home for missing pages", () => {
  const manifest = {
    "2.x": ["index.md", "projects/new/page.md"],
    "v1.x": ["index.md", "old/only.md"],
  };
  for (const base of ["/", "/docs/"]) {
    const missing = selector("projects/new/page.md", manifest, base);
    missing.choose("v1.x");
    assert.deepEqual(missing.navigations, [base + "versions/v1.x/"]);
    const archived = selector("versions/v1.x/old/only.md", manifest, base);
    archived.choose("2.x");
    assert.deepEqual(archived.navigations, [base]);
    const home = selector("index.md", manifest, base);
    home.choose("v1.x");
    assert.deepEqual(home.navigations, [base + "versions/v1.x/"]);
  }
  for (const pages of [{}, { "v1.x": ["old/only.md"] }]) {
    const unavailable = selector("projects/new/page.md", pages);
    unavailable.choose("v1.x");
    assert.deepEqual(unavailable.navigations, []);
  }
});

test("manifest separates current and unique archives and discovers nested pages", (t) => {
  const { docs } = fixture(t);
  const manifest = buildVersionPages(docs, {
    current: "2.x",
    versions: ["v1.x", "v1.x", "2.x"],
  });
  assert.deepEqual(Object.keys(manifest), ["2.x", "v1.x"]);
  assert.ok(manifest["2.x"].includes("getting-started/index.md"));
  assert.ok(
    !manifest["2.x"].some(
      (file) => file.startsWith("versions/") || file.startsWith("public/"),
    ),
  );
  assert.deepEqual(manifest["v1.x"], [
    "index.md",
    "old/index.md",
    "old/only.md",
  ]);
});

test("archive sidebar uses actual historical headings and never current project pages", (t) => {
  const { docs } = fixture(t);
  assert.deepEqual(buildArchiveSidebar(docs, "v1.x"), [
    { text: "Old Home", link: "/versions/v1.x/" },
    {
      text: "Historical Project",
      link: "/versions/v1.x/old/",
      collapsed: true,
      items: [{ text: "Old Only", link: "/versions/v1.x/old/only" }],
    },
  ]);
  assert.deepEqual(buildArchiveSidebar(docs, "missing"), []);
  assert.throws(() => buildArchiveSidebar(docs, ".."));
});

test("snapshot preserves existing archives, relative links and global images; does not copy public", (t) => {
  const { root, docs, write } = fixture(t);
  write(
    "projects/example/guide.md",
    "# Guide\n[Home](/)\n[Start](/getting-started/?q=yes#next)\n[Relative](./index.md)\n![Image](/img/logo.svg)\n",
  );
  const previous = fs.readFileSync(
    path.join(docs, "versions/v1.x/old/only.md"),
    "utf8",
  );
  const target = snapshot(root, "v2.x");
  assert.equal(fs.existsSync(path.join(target, "public")), false);
  assert.equal(fs.existsSync(path.join(target, "versions")), false);
  assert.equal(
    fs.readFileSync(path.join(docs, "versions/v1.x/old/only.md"), "utf8"),
    previous,
  );
  assert.equal(
    fs.readFileSync(path.join(target, "projects/example/guide.md"), "utf8"),
    "# Guide\n[Home](/versions/v2.x/)\n[Start](/versions/v2.x/getting-started/?q=yes#next)\n[Relative](./index.md)\n![Image](/img/logo.svg)\n",
  );
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(docs, "versions.json"))).current,
    "2.x",
  );
  assert.throws(() => snapshot(root, "v2.x"), /already exists/);
  for (const invalid of ["..", ".", "../escape", "/absolute", ""])
    assert.throws(() => snapshot(root, invalid));
});

test("destination parser preserves fenced, indented and inline code, prose and external/static links", () => {
  const pages = new Set(["index.md", "guide.md", "a(b).md"]);
  const source = [
    "[Guide](/guide#heading)",
    "[Nested](/a(b))",
    '[Angle](</guide> "Title")',
    '[ref]: /guide "Guide title"',
    "[Use][ref]",
    "```md",
    "[Code](/guide)",
    "```",
    "~~~~",
    "[Code](/guide)",
    "~~~~",
    "    [Code](/guide)",
    "`[Code](/guide)`",
    "``[Code](/guide)``",
    "`multiline",
    "[Code](/guide)",
    "end`",
    "Prose /guide",
    "[External](https://example.org/guide)",
    "[Protocol](//example.org/guide)",
    "[Missing](/missing)",
    "![Image](/img/a.png)",
    "[Relative](../guide)",
    "[Hash](#guide)",
  ].join("\n");
  const output = rewriteSnapshotLinks(source, "v1", pages);
  assert.equal(
    output,
    source
      .replace("[Guide](/guide#heading)", "[Guide](/versions/v1/guide#heading)")
      .replace("[Nested](/a(b))", "[Nested](/versions/v1/a(b))")
      .replace("[Angle](</guide>", "[Angle](</versions/v1/guide>")
      .replace("[ref]: /guide", "[ref]: /versions/v1/guide"),
  );
});

test("VitePress frontmatter link fields are versioned, not image fields or code", () => {
  const source =
    '---\nlayout: home\nhero:\n  image:\n    src: /img/logo.svg\n  actions:\n    - text: Start\n      link: /getting-started/\n    - link: "/guide#next"\n---\n';
  assert.equal(
    rewriteSnapshotLinks(
      source,
      "v1",
      new Set(["getting-started/index.md", "guide.md"]),
    ),
    source
      .replace("link: /getting-started/", "link: /versions/v1/getting-started/")
      .replace('link: "/guide#next"', 'link: "/versions/v1/guide#next"'),
  );
});
