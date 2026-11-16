# Architecture

MD-Blog **2.0.0** is a static site built with Node.js ES modules. Marked (`^18.2.0`) renders Markdown; DOMPurify (`^3.4.18`) sanitizes blog post HTML in the browser. Production does not require a Node API or serverless handlers.

## Build and preview

`scripts/build.js` renders `public/md/index.md` into `dist/index.html`, copies styles, favicons and browser scripts, and bundles Marked and DOMPurify locally under `dist/vendor`. The homepage is pre-rendered and readable without JavaScript; its repository Markdown is trusted input, not passed through the runtime sanitizer.

The build discovers posts from `https://api.free-time.me/v2/blog/posts` with a 20-second timeout. It also recursively loads `public/blogs/**/*.md` and writes `dist/data/local-posts.json`. Failed API discovery or invalid API routes trigger a warning and use local routes instead. Invalid local content fails before the previous `dist` artifact is replaced.

`server.js` previews only `dist`, supports GET/HEAD, and serves the generated `404.html` shell with HTTP 404 for missing files. It does not proxy API requests. There is no watcher: rebuild or restart `npm run dev` after source edits.

## Routes and canonical URLs

- `/`: pre-rendered homepage.
- `/blog/`: JavaScript-powered listing, optionally filtered by `?category=Apps,Android`.
- `/blog/<title-slug>/`: generated post shell with a clean canonical URL.
- `/blog/<api-slug>/`: generated compatibility alias where known at build time.
- `/blog/?post=<api-slug>`, `/api/blog/<slug>` and `/api/blog.js`: legacy forms interpreted by the browser script; API-style paths use the 404 fallback.

Build and browser share `public/scripts/post-routes.js`. Titles are NFKD-normalized, stripped of combining marks, lowercased and converted to ASCII hyphenated paths. Invalid slugs, duplicate title paths and title/API-alias collisions are rejected. A title change changes its canonical path; previous title paths are not retained automatically.

The build generates shells for both local and API routes. Posts added after deployment may render through `404.html`, but retain HTTP 404 until a rebuild creates their directories. Browser rendering can normalize the address bar with `history.replaceState`; that does not change the original HTTP status. Canonicals and Back links target `https://blog.free-time.me`, including in local previews.

## Browser data flow and fallback

`public/scripts/blog.js` makes credential-free requests directly to the hardcoded API origin. `ALL_API_URL` is no longer read. To change the backend, edit `API` in both this file and `scripts/post-pages.js`, then rebuild. Cross-origin API responses must permit the site's origin; Pages cannot supply a backend proxy.

Posts and categories are requested concurrently. Each failed API request, including HTTP errors or invalid response data, tries the bundled local JSON. Fallback is per request, not a merge of all local and remote posts. A successful remote listing does not automatically include local-only posts. Local content reflects the last build.

Category matching is case-insensitive and requires every selected category. Posts are sorted newest first using `publishedAt` (numeric Unix seconds or a parseable date string), falling back to `Released on <t:...>` in Markdown when that field is absent. Undated/invalid dates sort last.

Post rendering removes H1 and `Categories:` lines, converts Discord timestamps to time elements, and sanitizes Marked output with DOMPurify. Metadata uses DOM/text APIs rather than HTML interpolation. Timestamps use the English locale; relative timestamps refresh periodically. If neither API nor local content succeeds, the shell displays an error; an API 404 is preserved when no local copy can be found.

## Local post metadata

The filename without `.md` supplies the legacy slug, the first H1 supplies the title (otherwise the filename is humanized), and `Categories:` supplies comma-separated categories. `Released on <t:UNIX_SECONDS>` supplies publication time. Duplicate filename slugs are rejected case-insensitively across nested directories. Local posts are ordered newest first, undated posts last, with an English slug comparison as tie-breaker.

## Deployment

`.github/workflows/pages.yml` builds and tests on pushes to `main` or manual dispatch using Node.js **26**, then uploads only `dist` and deploys through GitHub Pages actions. The build writes `CNAME` for `blog.free-time.me` and `.nojekyll`. Root-relative assets assume the custom-domain root, not a repository subpath. The former `api/` handlers and `vercel.json` have been removed. No scheduled rebuild or API publishing hook is configured.
