---
title: MD-Blog
---

# MD-Blog

A static homepage and browser-rendered blog backed by [All API](../all-api/index.md). GitHub Pages serves generated HTML shells; post content still requires JavaScript and a reachable API.

[Source code](https://github.com/FreetimeMaker/MD-Blog) · [Build and preview](./getting-started.md) · [Architecture](./architecture.md) · [Troubleshooting](./troubleshooting.md)

## Verified source summary

| Item | Inspected declaration |
| --- | --- |
| Package | `md-blog` 2.0.0; not proof of a published release |
| Build/runtime | Node.js ES modules and npm; Pages workflow selects Node 26 |
| Renderer | Marked 18.2.0 and DOMPurify 3.4.17 in the lockfile |
| Hosting | Static files at the custom-domain root `https://blog.free-time.me` |
| Browser state | Theme preference in local storage; no API credentials configured |

The build discovers title-based routes from the API. Visitors fetch the current list, categories and post Markdown directly from that API. Local files under `public/blogs/` are archives, **not a fallback or publishing mechanism**. The list preserves API order; this frontend does not sort by publication date.

## Choose a task

- [Preview or deploy](./getting-started.md): prerequisites, commands and expected checkpoints.
- [Change rendering or routing](./architecture.md): request flow, canonical paths and trust boundaries.
- [Diagnose missing content](./troubleshooting.md): API failures, stale artifacts and HTTP 404 shells.

## Source review

Checked **2026-11-20**, confirmed with `date -I`, against clean local HEAD [`9f290522a0cb2577cdf4268f16e48774d7dc5c9e`](https://github.com/FreetimeMaker/MD-Blog/tree/9f290522a0cb2577cdf4268f16e48774d7dc5c9e).

Static inspection covered package/lockfile declarations, build and route discovery, browser renderer/shared route validation/theme, preview server, HTML/CSS, Pages workflow, README and test structure. Evidence: [build scripts](https://github.com/FreetimeMaker/MD-Blog/tree/9f290522a0cb2577cdf4268f16e48774d7dc5c9e/scripts), [browser scripts](https://github.com/FreetimeMaker/MD-Blog/tree/9f290522a0cb2577cdf4268f16e48774d7dc5c9e/public/scripts), [package manifest](https://github.com/FreetimeMaker/MD-Blog/blob/9f290522a0cb2577cdf4268f16e48774d7dc5c9e/package.json) and [Pages workflow](https://github.com/FreetimeMaker/MD-Blog/blob/9f290522a0cb2577cdf4268f16e48774d7dc5c9e/.github/workflows/pages.yml).

No source build, tests, browser session, dependency resolution, live API, DNS or deployment check was run. Upstream historical live-check claims were not repeated. No secret environment files were read.
