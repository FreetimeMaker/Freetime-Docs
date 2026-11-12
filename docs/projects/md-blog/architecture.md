# Architecture

MD-Blog combines local templates with API-backed blog content. It uses ES modules, native `fetch` and Marked **18.2.0** (declared compatible range).

## Routes

| Route          | Handler              | Content source               |
| -------------- | -------------------- | ---------------------------- |
| `/`            | `api/index.js`       | `public/md/index.md`         |
| `/blog`        | `api/blog.js`        | All API posts and categories |
| `/blog/<slug>` | `api/blog/[slug].js` | All API post detail          |

`vercel.json` configures deployed routes. `server.js` runs the same handlers locally and additionally accepts `/api/blog/<slug>`, the path currently emitted by the listing template. Check both paths when deploying behind custom rewrites.

## Blog data flow

The listing fetches posts and categories concurrently. The optional `category` query parameter contains comma-separated names; matching is case-insensitive and requires every selected category.

Post detail expects `title`, `categories` and `markdown`. Before Marked renders the body, the handler removes level-one heading lines and `Categories:` lines and replaces Discord timestamp syntax with time elements.

A missing backend post returns 404. Other backend failures produce a temporary-unavailability response with status 503 rather than falling back to local post files.

## Local assets and trust

Templates live in `public/views`, with CSS and favicons under `public/styles` and `public/favicons`. The local server serves only its configured routes and asset prefixes, not the entire public directory.

Markdown and metadata should come from a trusted publishing source: the rendering path inserts generated HTML into templates and is not a general-purpose sanitizer for untrusted submissions.
