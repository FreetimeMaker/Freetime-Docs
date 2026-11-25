# Architecture

## Build and request flow

`scripts/build.js` first loads and validates local routes via `scripts/local-posts.js`, then calls `loadPostRoutes()` against `https://api.free-time.me/v2/blog/posts` with a 20-second timeout. API discovery or validation failure logs a warning and uses local routes. Invalid local input fails before `dist` is removed; later copy/render failures can still leave a partial artifact.

The build renders `public/md/index.md`, copies browser assets, bundles Marked/DOMPurify locally and generates list/post shells plus `404.html`, `CNAME` and `.nojekyll`. It writes local Markdown and metadata to `dist/data/local-posts.json` but does not snapshot API post bodies. Local shells are emitted even with successful API discovery; on a shared output path the API entry wins.

At runtime, `public/scripts/blog.js` requests posts and categories concurrently. Both must resolve, but each falls back independently on request or response-validation failure, so a list can mix API metadata and locally derived categories. A successful empty response does not trigger fallback. Category matching is case-insensitive and requires every selected category; displayed categories use case-insensitive, numeric English ordering. Posts sort newest first from `publishedAt` (epoch seconds or a date string), or a `Released on` timestamp in available Markdown when no numeric/string date is supplied. Unknown dates sort last; ties keep input order.

Post discovery maps title paths to slugs using whichever list resolves; the body request independently tries the API then local Markdown by slug. If live discovery succeeds but omits a local post, its title path cannot use the local title-to-slug mapping; a direct filename-slug link can still reach the local copy. An API 404 can also fall back to a matching local copy. Requests omit credentials and each fetch has a 20-second timeout.

`server.js` serves only `dist`, accepts GET/HEAD and supplies the shell with HTTP 404 for missing paths. Production needs no Node server.

## Routes and canonical URLs

Build and browser share `public/scripts/post-routes.js`. For example, `XMRiGUI Update V2.0.0` becomes `/blog/xmrigui-update-v2-0-0/`. Titles use NFKD normalization, combining-mark removal and ASCII hyphenation. Slugs must be portable directory names; duplicate slugs, empty/overlong title paths and title/alias collisions are rejected.

Known title paths and API-slug aliases receive generated directories. Legacy `/blog/?post=<api-slug>`, `/api/blog/<slug>` and `/api/blog.js` are understood by the browser. API-style paths normally use the HTTP-404 shell. Newly published paths can render live but retain HTTP 404 until rebuilt. `history.replaceState` and canonical tags do not alter that response status.

Renaming a title changes its canonical path; old title paths are not retained automatically. Canonical and Back URLs target `https://blog.free-time.me`, even in local previews.

## Markdown pipeline and trust

Post rendering (live or bundled) removes H1 lines and lines containing `Categories:`, transforms Discord timestamp tokens, passes Markdown through Marked, then sanitizes the HTML with DOMPurify before assigning `innerHTML`. Titles and category labels use DOM/text APIs. Sanitization reduces executable-HTML and unsafe-link risks; it is not a guarantee that content or linked resources are safe.

::: callout warning Homepage Markdown is trusted input
The homepage is rendered by Marked at build time **without DOMPurify**. Raw HTML can become executable deployed content. Restrict write access to `public/md/index.md` and review HTML changes; the browser post sanitizer does not protect this build-time path.
:::

Timestamps use English formatting and refresh every 30 seconds. The homepage prose is readable without JavaScript, but timestamp text is populated by JavaScript. Theme preference is stored under local-storage key `theme`.

Browser requests expose network information to the API. The stylesheet imports Google Fonts, adding external requests; sanitized Markdown may also reference remote resources. There are no API secrets required by this public frontend. Do not embed credentials in static assets.

## Development checks

After changing route logic, keep build and browser on the shared validator and add cases to `tests/site.test.js`. Local Markdown loader cases belong in `tests/local-posts.test.js`. For a renderer change, test malicious HTML as well as ordinary Markdown, and distinguish post sanitization from trusted homepage rendering. Run the [build/test sequence](./getting-started.md#getting-started-test-changes); this review inspected test structure but did not execute it.
