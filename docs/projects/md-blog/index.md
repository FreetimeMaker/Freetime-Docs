---
title: MD-Blog
---

# MD-Blog

A lightweight Markdown blog frontend powered by All API.

**Technologies:** Node.js, Markdown, Web

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/MD-Blog)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Start the blog](./getting-started.md) — Run locally and connect your content backend.
- [Understand the renderer](./architecture.md) — Trace routes, templates and API-backed posts.
- [Resolve a problem](./troubleshooting.md) — Diagnose missing posts, routing and backend errors.

MD-Blog is a Node.js Markdown blog frontend. The current package version is **1.0.0**. Blog content is fetched from [All API](../all-api/index.md); the homepage remains a local Markdown file.

**Source code:** [FreetimeMaker/MD-Blog](https://github.com/FreetimeMaker/MD-Blog)

## At a glance

1. **Reader · /blog or /blog/`<slug>`** — Open the listing or an individual post.
2. **Node.js handlers → All API** — Fetch posts, categories and Markdown from the configured backend.
3. **Marked + local templates** — Render the response as an HTML page.

Blog post rendering flow. The homepage separately reads public/md/index.md.

## Features

- server-rendered HTML using Marked and reusable templates
- post listing and category discovery through All API
- comma-separated category filters that must all match a post
- individual posts resolved by slug
- Discord-style timestamps rendered through HTML time elements
- light and dark styling
- local Node HTTP server and Vercel routing

## Content and configuration

`public/md/index.md` supplies the homepage. `public/views` contains the homepage and blog templates; styles and favicons are also local assets.

::: callout info Posts come from the backend
The blog handlers request `/blog/posts`, `/blog/categories` and `/blog/posts/<slug>` from `ALL_API_URL`, which defaults to `https://api.free-time.me/v2`. Adding a file to `public/blogs` alone no longer publishes a post: posts must be available from the backend.
:::

## Continue

- [Getting Started](./getting-started.md)
- [Architecture](./architecture.md)
- [Troubleshooting](./troubleshooting.md)

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### MD-Blog

Inspected revision: [`973314ab1a7e81e61767dff3f82572ca535e90ca`](https://github.com/FreetimeMaker/MD-Blog/tree/973314ab1a7e81e61767dff3f82572ca535e90ca).

- [`package.json`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/package.json)
- [`server.js`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/server.js)
- [`vercel.json`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/vercel.json)
- [`api/index.js`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/api/index.js)
- [`api/blog.js`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/api/blog.js)
- [`api/blog/[slug].js`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/api/blog/%5Bslug%5D.js)
- [`public/md/index.md`](https://github.com/FreetimeMaker/MD-Blog/blob/973314ab1a7e81e61767dff3f82572ca535e90ca/public/md/index.md)
