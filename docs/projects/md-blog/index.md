---
title: MD-Blog
---

# MD-Blog

A static homepage and browser-rendered blog backed by [All API](../all-api/index.md). GitHub Pages serves generated HTML shells; post content requires JavaScript and uses the live API with a bundled Markdown fallback.

[Source code](https://github.com/FreetimeMaker/MD-Blog) · [Build and preview](./getting-started.md) · [Architecture](./architecture.md) · [Troubleshooting](./troubleshooting.md)

## Verified source summary

| Item | Inspected declaration |
| --- | --- |
| Package | `md-blog` 1.0.0; not proof of a published release |
| Build/runtime | Node.js ES modules and npm; Pages workflow selects Node 26 |
| Renderer | Marked 18.3.0 and DOMPurify 3.5.0 in the lockfile |
| Hosting | Static files at the custom-domain root `https://blog.free-time.me` |
| Browser state | Theme preference in local storage; no API credentials configured |

The build generates routes from API discovery and local Markdown under `public/blogs/`. The browser tries the API first and falls back per request to the last build’s bundled local posts. The sources are not merged into one listing. Posts sort newest first, with unknown dates last; category labels sort naturally (for example, `Tag 2` before `Tag 10`).

## Choose a task

- [Preview or deploy](./getting-started.md): prerequisites, commands and expected checkpoints.
- [Change rendering or routing](./architecture.md): request flow, canonical paths and trust boundaries.
- [Diagnose missing content](./troubleshooting.md): API failures, stale artifacts and HTTP 404 shells.

## Source review

On **2026-11-25**, compared GitHub `main` HEAD [`909baf628cf1e57361a9f88bee8dbba76d845b24`](https://github.com/FreetimeMaker/MD-Blog/tree/909baf628cf1e57361a9f88bee8dbba76d845b24) with the previously documented local snapshot [`9f290522`](https://github.com/FreetimeMaker/MD-Blog/tree/9f290522a0cb2577cdf4268f16e48774d7dc5c9e) in a temporary clone.

Static review focused on the changed build and browser behavior, local post discovery, sorting, renderer versions, and test coverage, with the unchanged Pages workflow checked for deployment context. Evidence: [build scripts](https://github.com/FreetimeMaker/MD-Blog/tree/909baf628cf1e57361a9f88bee8dbba76d845b24/scripts), [browser scripts](https://github.com/FreetimeMaker/MD-Blog/tree/909baf628cf1e57361a9f88bee8dbba76d845b24/public/scripts), [package manifest](https://github.com/FreetimeMaker/MD-Blog/blob/909baf628cf1e57361a9f88bee8dbba76d845b24/package.json) and [Pages workflow](https://github.com/FreetimeMaker/MD-Blog/blob/909baf628cf1e57361a9f88bee8dbba76d845b24/.github/workflows/pages.yml).

No source build, tests, browser session, dependency resolution, live API, DNS or deployment check was run. Upstream historical live-check claims were not repeated. No secret environment files were read.
