import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "parse5";
import ts from "typescript";

export const root = fileURLToPath(new URL("../", import.meta.url));
export const dist = path.join(root, "docs/.vitepress/dist");
const origin = "http://docs.invalid";
const nonempty = (value) =>
  typeof value === "string" && value.trim().length > 0;
const object = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const fail = (message) => {
  throw new Error(message);
};
const requireValue = (condition, message) => {
  if (!condition) fail(message);
};
export const projectTarget = (slug, page = "") => `/projects/${slug}/${page}`;

export async function loadMetadata() {
  const file = path.join(root, "docs/.vitepress/theme/projects.ts");
  const result = ts.transpileModule(await readFile(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
    fileName: file,
  });
  const errors =
    result.diagnostics?.filter(
      (d) => d.category === ts.DiagnosticCategory.Error,
    ) ?? [];
  requireValue(
    !errors.length,
    `projects.ts: ${errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n")}`,
  );
  const { projects } = await import(
    `data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`
  );
  const reviews = JSON.parse(
    await readFile(
      path.join(root, "docs/.vitepress/theme/source-reviews.json"),
      "utf8",
    ),
  );
  validateMetadata(projects, reviews);
  return { projects, reviews };
}

export function validateMetadata(projects, reviews) {
  requireValue(
    Array.isArray(projects) && projects.length > 0,
    "projects: expected a nonempty array",
  );
  requireValue(
    object(reviews),
    "source-reviews: expected an object keyed by project slug",
  );
  const slugs = new Set();
  for (const p of projects) {
    requireValue(
      object(p) &&
        nonempty(p.slug) &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug),
      "projects: invalid slug",
    );
    requireValue(!slugs.has(p.slug), `${p.slug}: duplicate project slug`);
    slugs.add(p.slug);
  }
  const safePage = (value) =>
    typeof value === "string" &&
    (value === "" ||
      /^(?:[a-z0-9-]+\/)*[a-z0-9-]+(?:#[a-z0-9-]+)?$/.test(value));
  for (const p of projects) {
    const label = `project ${p.slug}`;
    for (const key of ["name", "icon", "description", "source"])
      requireValue(nonempty(p[key]), `${label}: missing ${key}`);
    requireValue(
      /^[\w.-]+$/.test(p.source),
      `${label}: invalid source repository`,
    );
    requireValue(
      Array.isArray(p.tags) && p.tags.length && p.tags.every(nonempty),
      `${label}: invalid tags`,
    );
    requireValue(
      Array.isArray(p.paths) && p.paths.length,
      `${label}: missing entry paths`,
    );
    const paths = new Set();
    for (const entry of p.paths) {
      requireValue(
        object(entry) &&
          nonempty(entry.label) &&
          nonempty(entry.description) &&
          nonempty(entry.path) &&
          safePage(entry.path),
        `${label}: invalid entry path`,
      );
      requireValue(
        !paths.has(entry.path),
        `${label}: duplicate entry path ${entry.path}`,
      );
      paths.add(entry.path);
    }
    requireValue(
      Array.isArray(p.related),
      `${label}: related must be an array (empty is allowed)`,
    );
    for (const related of p.related)
      requireValue(
        object(related) &&
          slugs.has(related.slug) &&
          related.slug !== p.slug &&
          safePage(related.page) &&
          nonempty(related.label) &&
          nonempty(related.reason),
        `${label}: invalid related target/label/reason`,
      );
    const review = reviews[p.slug];
    requireValue(object(review), `${label}: missing source review`);
    requireValue(
      /^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt) &&
        Number.isFinite(Date.parse(review.reviewedAt)) &&
        new Date(review.reviewedAt).toISOString().slice(0, 10) ===
          review.reviewedAt,
      `${label}: invalid reviewedAt (expected real YYYY-MM-DD date)`,
    );
    requireValue(
      review.reviewedAt <= new Date().toISOString().slice(0, 10),
      `${label}: reviewedAt is in the future`,
    );
    requireValue(nonempty(review.scope), `${label}: missing review scope`);
    requireValue(
      Array.isArray(review.sources) && review.sources.length,
      `${label}: missing review sources`,
    );
    for (const source of review.sources) {
      requireValue(
        object(source) &&
          nonempty(source.repository) &&
          /^[\w.-]+$/.test(source.repository) &&
          typeof source.commit === "string" &&
          /^[a-f0-9]{40}$/i.test(source.commit),
        `${label}: invalid review repository or commit (expected 40 hex characters)`,
      );
      requireValue(
        Array.isArray(source.paths) &&
          source.paths.length &&
          source.paths.every(
            (p) =>
              nonempty(p) &&
              !p.startsWith("/") &&
              !p.includes("\\") &&
              !p.split("/").includes(".."),
          ),
        `${label}: invalid review source paths`,
      );
    }
    requireValue(
      review.sources.some((s) => s.repository === p.source),
      `${label}: review must include primary repository ${p.source}`,
    );
  }
  for (const slug of Object.keys(reviews))
    requireValue(slugs.has(slug), `source-reviews: unknown project ${slug}`);
}

export function inspectHtml(html) {
  const ids = new Set(),
    references = [],
    errors = [];
  function walk(node) {
    const attrs = Object.fromEntries(
      (node.attrs ?? []).map((a) => [a.name, a.value]),
    );
    if (attrs.id) ids.add(attrs.id);
    if (node.tagName === "a" && attrs.name) ids.add(attrs.name);
    if (node.tagName === "img" && !Object.hasOwn(attrs, "alt"))
      errors.push("image missing alt attribute");
    for (const key of ["href", "src", "poster"])
      if (
        attrs[key] &&
        (key !== "href" || ["a", "link"].includes(node.tagName))
      )
        references.push({ value: attrs[key], anchor: node.tagName === "a" });
    if (attrs.srcset) {
      // Data URLs contain commas; leave embedded image data alone.
      if (!attrs.srcset.trim().startsWith("data:"))
        for (const item of attrs.srcset.split(","))
          references.push({
            value: item.trim().split(/\s+/)[0],
            anchor: false,
          });
    }
    for (const child of node.childNodes ?? []) walk(child);
    if (node.content) walk(node.content);
  }
  walk(parse(html));
  return { ids, references, errors };
}

export async function resolveTarget(directory, from, reference) {
  const url = new URL(reference, new URL(from, origin));
  if (url.origin !== origin) return null;
  const pathname = decodeURIComponent(url.pathname);
  const base = path.resolve(directory, `.${pathname}`);
  requireValue(
    base === path.resolve(directory) ||
      base.startsWith(path.resolve(directory) + path.sep),
    `target escapes build directory: ${reference}`,
  );
  for (const candidate of [
    base,
    `${base}.html`,
    path.join(base, "index.html"),
  ]) {
    if (
      await stat(candidate).then(
        (s) => s.isFile(),
        () => false,
      )
    )
      return { file: candidate, hash: decodeURIComponent(url.hash.slice(1)) };
  }
  fail(`missing internal target ${reference} (from ${from})`);
}

export async function checkBuiltHtml(directory, projects = []) {
  const errors = [],
    documents = new Map();
  async function scan(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) await scan(file);
      else if (entry.name.endsWith(".html"))
        documents.set(file, inspectHtml(await readFile(file, "utf8")));
    }
  }
  await scan(directory);
  requireValue(
    documents.size,
    `No built HTML in ${directory}; run npm run build first`,
  );
  async function check(from, value, anchor = true) {
    try {
      const target = await resolveTarget(directory, from, value);
      if (
        target &&
        anchor &&
        target.hash &&
        documents.has(target.file) &&
        !documents.get(target.file).ids.has(target.hash)
      )
        fail(
          `missing anchor #${target.hash} in ${path.relative(directory, target.file)} (from ${from}: ${value})`,
        );
    } catch (error) {
      errors.push(error.message);
    }
  }
  for (const [file, doc] of documents) {
    const from = "/" + path.relative(directory, file).split(path.sep).join("/");
    errors.push(...doc.errors.map((e) => `${from}: ${e}`));
    for (const ref of doc.references) await check(from, ref.value, ref.anchor);
  }
  for (const p of projects) {
    for (const target of [
      projectTarget(p.slug),
      projectTarget(p.slug, "getting-started"),
      ...p.paths.map((e) => projectTarget(p.slug, e.path)),
      ...p.related.map((e) => projectTarget(e.slug, e.page)),
    ])
      await check(`/metadata/${p.slug}`, target);
  }
  return errors;
}

export async function main() {
  const { projects } = await loadMetadata();
  const errors = await checkBuiltHtml(dist, projects);
  if (errors.length)
    fail(
      `Documentation checks failed (${errors.length}):\n- ${errors.join("\n- ")}`,
    );
  console.log(`Documentation checks passed (${projects.length} projects).`);
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
