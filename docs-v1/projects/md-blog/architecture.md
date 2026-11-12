# Architecture

MD-Blog is a small Node/Vercel application that turns Markdown files into web pages.

## Rendering

The project uses Marked to convert Markdown to HTML. Content remains file-based instead of requiring a database or CMS.

## Routes

Vercel routes requests into serverless Node handlers:

| Route | Handler |
| --- | --- |
| `/` | `api/index.js` |
| `/blog` | `api/blog.js` |
| `/blog/<slug>` | `api/blog/[slug].js` |

Static styles and favicons are served from `public`.

## Adding content

Blog posts are Markdown files under `public/blogs`. A post filename becomes its URL slug, while the level-one Markdown heading is used as its title.

This makes publishing intentionally Git-friendly: adding a post only requires adding a Markdown file and deploying the repository.
