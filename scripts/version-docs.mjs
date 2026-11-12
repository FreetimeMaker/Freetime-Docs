import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const excluded = new Set([".vitepress", "versions", "public", "versions.json"]);

function sourcePages(docsDir) {
  const pages = new Set();
  function walk(directory, prefix = "") {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || (!prefix && excluded.has(entry.name)))
        continue;
      const relative = prefix + entry.name;
      if (entry.isDirectory())
        walk(path.join(directory, entry.name), relative + "/");
      else if (entry.isFile() && relative.endsWith(".md")) pages.add(relative);
    }
  }
  walk(docsDir);
  return pages;
}

/** Rewrite Markdown destinations, not prose, examples, code, or global assets. */
export function rewriteSnapshotLinks(source, version, pages) {
  const rewrite = (url) => {
    if (!url.startsWith("/") || url.startsWith("//")) return url;
    const pathname = url.split(/[?#]/, 1)[0].slice(1);
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return url;
    }
    const candidates =
      decoded.endsWith("/") || !decoded
        ? [decoded + "index.md"]
        : [
            decoded.replace(/\.(?:html|md)$/, "") + ".md",
            decoded + "/index.md",
          ];
    return candidates.some((candidate) => pages.has(candidate))
      ? `/versions/${version}${url}`
      : url;
  };

  // Keep source positions and formatting intact. Parse destinations with balanced
  // parentheses/escapes; a regex alone cannot distinguish links from code examples.
  const edits = [];
  function destination(start) {
    let pos = start;
    while (
      source[pos] === " " ||
      source[pos] === "\t" ||
      source[pos] === "\n" ||
      source[pos] === "\r"
    )
      pos++;
    const angled = source[pos] === "<";
    if (angled) pos++;
    const from = pos;
    let depth = 0;
    for (; pos < source.length; pos++) {
      const char = source[pos];
      if (char === "\\") {
        pos++;
        continue;
      }
      if (angled && char === ">") break;
      if (!angled) {
        if (/\s/.test(char)) break;
        if (char === "(") depth++;
        if (char === ")") {
          if (!depth) break;
          depth--;
        }
      }
      if (angled && /[\r\n<>]/.test(char)) return;
    }
    if (depth || (angled && source[pos] !== ">")) return;
    const original = source.slice(from, pos);
    const replacement = rewrite(original);
    if (replacement !== original) edits.push({ from, to: pos, replacement });
  }

  let fence = null;
  let frontmatter = false;
  let offset = 0;
  for (const line of source.split(/(?<=\n)/)) {
    const content = line.replace(/\r?\n$/, "");
    if (offset === 0 && content === "---") {
      frontmatter = true;
      offset += line.length;
      continue;
    }
    if (frontmatter) {
      if (content === "---") frontmatter = false;
      else {
        // VitePress home actions/features store their routes in YAML link fields.
        const link =
          /^(\s*(?:-\s+)?link:\s*)(["']?)(\/[^\s"']*)\2(?:\s*(?:#.*)?)$/.exec(
            content,
          );
        if (link) {
          const original = link[3];
          const replacement = rewrite(original);
          if (replacement !== original)
            edits.push({
              from: offset + link[1].length + link[2].length,
              to: offset + link[1].length + link[2].length + original.length,
              replacement,
            });
        }
      }
      offset += line.length;
      continue;
    }
    const marker = /^\s{0,3}(`{3,}|~{3,})(.*)$/.exec(content);
    if (fence) {
      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        !marker[2].trim()
      )
        fence = null;
      offset += line.length;
      continue;
    }
    if (marker) {
      fence = marker[1];
      offset += line.length;
      continue;
    }
    if (/^(?: {4}|\t)/.test(content)) {
      offset += line.length;
      continue;
    }
    const reference = /^ {0,3}\[(?:[^\]\\]|\\.)+\]:/.exec(content);
    if (reference) destination(offset + reference[0].length);
    offset += line.length;
  }

  // Scan non-code blocks separately, allowing multiline inline code spans.
  let inFence = null;
  let inFrontmatter =
    source.startsWith("---\n") || source.startsWith("---\r\n");
  let codeTicks = 0;
  offset = 0;
  for (const line of source.split(/(?<=\n)/)) {
    const content = line.replace(/\r?\n$/, "");
    if (inFrontmatter) {
      if (offset > 0 && content === "---") inFrontmatter = false;
      offset += line.length;
      continue;
    }
    const marker = /^\s{0,3}(`{3,}|~{3,})(.*)$/.exec(content);
    if (inFence) {
      if (
        marker &&
        marker[1][0] === inFence[0] &&
        marker[1].length >= inFence.length &&
        !marker[2].trim()
      )
        inFence = null;
      offset += line.length;
      continue;
    }
    if (!codeTicks && marker) {
      inFence = marker[1];
      offset += line.length;
      continue;
    }
    if (!codeTicks && /^(?: {4}|\t)/.test(content)) {
      offset += line.length;
      continue;
    }
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "\\") {
        i++;
        continue;
      }
      if (line[i] === "`") {
        let end = i + 1;
        while (line[end] === "`") end++;
        const count = end - i;
        if (!codeTicks) codeTicks = count;
        else if (codeTicks === count) codeTicks = 0;
        i = end - 1;
        continue;
      }
      if (!codeTicks && line[i] === "]" && line[i + 1] === "(")
        destination(offset + i + 2);
    }
    offset += line.length;
  }
  for (const edit of edits.sort((a, b) => b.from - a.from))
    source =
      source.slice(0, edit.from) + edit.replacement + source.slice(edit.to);
  return source;
}

/** Create a new archive. Existing archives are never opened for writing. */
export function snapshot(root, version) {
  if (
    !version ||
    !/^[0-9A-Za-z._-]+$/.test(version) ||
    version === "." ||
    version === ".."
  ) {
    throw new Error(
      "Version may only contain letters, numbers, dots, underscores and hyphens (not . or ..).",
    );
  }
  const docsDir = path.join(root, "docs");
  const versionsDir = path.join(docsDir, "versions");
  const targetDir = path.join(versionsDir, version);
  const metadataPath = path.join(docsDir, "versions.json");
  if (fs.existsSync(targetDir))
    throw new Error(`Version ${version} already exists at ${targetDir}`);
  const metadata = fs.existsSync(metadataPath)
    ? JSON.parse(fs.readFileSync(metadataPath, "utf8"))
    : { current: version, versions: [] };
  const pages = sourcePages(docsDir);
  fs.mkdirSync(targetDir, { recursive: true });
  function copy(directory, destination, prefix = "") {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || (!prefix && excluded.has(entry.name)))
        continue;
      const source = path.join(directory, entry.name);
      const target = path.join(destination, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(target);
        copy(source, target, prefix + entry.name + "/");
      } else if (entry.isFile()) {
        if (entry.name.endsWith(".md"))
          fs.writeFileSync(
            target,
            rewriteSnapshotLinks(
              fs.readFileSync(source, "utf8"),
              version,
              pages,
            ),
          );
        else fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
      }
    }
  }
  copy(docsDir, targetDir);
  metadata.versions = [...new Set([version, ...(metadata.versions ?? [])])];
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + "\n");
  const links = metadata.versions
    .map((item) => `- [Docs ${item}](/versions/${item}/)`)
    .join("\n");
  fs.writeFileSync(
    path.join(versionsDir, "index.md"),
    `# Documentation versions\n\nThe current documentation is always available from the normal site paths.\n\nArchived snapshots are stored under \`/versions/<version>/\`.\n\n<!-- versions:start -->\n${links}\n<!-- versions:end -->\n`,
  );
  return targetDir;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  try {
    if (!process.argv[2])
      throw new Error("Usage: npm run docs:version -- <version>");
    const target = snapshot(process.cwd(), process.argv[2]);
    console.log(
      `Created documentation snapshot: ${process.argv[2]}\nPath: ${target}`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
