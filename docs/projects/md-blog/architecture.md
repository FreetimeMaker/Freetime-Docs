# Architecture

## Build and request flow

`scripts/build.js` first calls `loadPostRoutes()` against `https://api.free-time.me/v2/blog/posts`, with a 20-second timeout. HTTP errors, invalid JSON or invalid routes fail before `dist` is removed. Later copy/render failures can still leave a partial artifact; this is not an atomic build.

The build renders `public/md/index.md`, copies browser assets, bundles Marked/DOMPurify locally and generates list/post shells plus `404.html`, `CNAME` and `.nojekyll`. It does not snapshot post Markdown or read the local blog archives.

At runtime, `public/scripts/blog.js` requests posts and categories concurrently for the listing. Both must succeed. Category matching is case-insensitive and requires every selected category; posts retain API order. For a post, discovery maps a title path to its API slug, then a separate request fetches the Markdown. If discovery fails, an API-slug link can still fetch directly; a title path cannot reliably resolve that way. Requests omit credentials and time out after 20 seconds. There is no local content fallback.

`server.js` serves only `dist`, accepts GET/HEAD and supplies the shell with HTTP 404 for missing paths. Production needs no Node server.

## Routes and canonical URLs

Build and browser share `public/scripts/post-routes.js`. For example, `XMRiGUI Update V2.0.0` becomes `/blog/xmrigui-update-v2-0-0/`. Titles use NFKD normalization, combining-mark removal and ASCII hyphenation. Slugs must be portable directory names; duplicate slugs, empty/overlong title paths and title/alias collisions are rejected.

Known title paths and API-slug aliases receive generated directories. Legacy `/blog/?post=<api-slug>`, `/api/blog/<slug>` and `/api/blog.js` are understood by the browser. API-style paths normally use the HTTP-404 shell. Newly published paths can render live but retain HTTP 404 until rebuilt. `history.replaceState` and canonical tags do not alter that response status.

Renaming a title changes its canonical path; old title paths are not retained automatically. Canonical and Back URLs target `https://blog.free-time.me`, even in local previews.

## Markdown pipeline and trust

API post rendering removes H1 lines and lines containing `Categories:`, transforms Discord timestamp tokens, passes Markdown through Marked, then sanitizes the HTML with DOMPurify before assigning `innerHTML`. Titles and category labels use DOM/text APIs. Sanitization reduces executable-HTML and unsafe-link risks; it is not a guarantee that content or linked resources are safe.

::: callout warning Homepage Markdown is trusted input
The homepage is rendered by Marked at build time **without DOMPurify**. Raw HTML can become executable deployed content. Restrict write access to `public/md/index.md` and review HTML changes; the browser post sanitizer does not protect this build-time path.
:::

Timestamps use the visitor's locale and refresh every 30 seconds. The homepage prose is readable without JavaScript, but timestamp text is populated by JavaScript. Theme preference is stored under local-storage key `theme`.

Browser requests expose network information to the API. The stylesheet imports Google Fonts, adding external requests; sanitized Markdown may also reference remote resources. There are no API secrets required by this public frontend. Do not embed credentials in static assets.

## Development checks

After changing route logic, keep build and browser on the shared validator and add cases to `tests/site.test.js`. For a renderer change, test malicious HTML as well as ordinary Markdown, and distinguish post sanitization from trusted homepage rendering. Run the [build/test sequence](./getting-started.md#getting-started-test-changes); this review inspected test structure but did not execute it.
