# Troubleshooting

These checks are derived from source, not observed build, browser or live-service results from this review.

## Homepage changes do not appear

**Check:** Compare `public/md/index.md` with the generated `dist/index.html`.

**Expected:** The preview serves generated files, not source Markdown.

**Fix:** Stop and rerun `npm run dev`, or rebuild before restarting `server.js`. There is no watcher. Keep `public/views/home.html`, styles and other build inputs in the checkout.

## Blog is unavailable or only shows Loading

**Check:** Enable JavaScript and inspect browser console/network requests to `/scripts/blog.js`, `/vendor/`, the API's `/v2/blog/posts` and `/v2/blog/categories`, and `/data/local-posts.json`.

**Expected:** The browser can load scripts and either API responses or bundled local fallback JSON. Homepage success does not test these paths. API fetches time out after 20 seconds.

**Fix:** Deploy the complete `dist` directory. Check API availability and CORS headers; requests are credential-free and go directly to the API, not through the preview. If the API fails, inspect `[blog] API request failed; trying local Markdown` and the local JSON request. `no-cors` is not a fix for unreadable JSON. If both sources fail, the page displays an error rather than a server-generated 503.

## Local post is missing or old content appears

**Check:** Inspect `dist/data/local-posts.json`, the browser's API response and any category filters.

**Expected:** Local files are bundled at build time and used only when a request fails. They are not automatically merged into successful API listings. Category filters require all selected categories.

**Fix:** Rebuild/deploy after editing `public/blogs/**/*.md`, clear filters and verify the filename slug and H1 title. Publish through the API's content process for live API listings. A local working-tree file is not evidence that a published deployment contains it.

## Post renders but returns HTTP 404

**Check:** Compare the requested path with directories in `dist/blog`, and inspect the initial HTTP status separately from the browser-rendered content.

**Expected:** Known build-time title/API-slug directories have index files. New or legacy `/api/blog/<slug>` paths can render via `404.html` while retaining HTTP 404.

**Fix:** Rebuild/deploy to generate current title paths and use `/blog/<title-slug>/` links. A canonical tag or `history.replaceState` does not turn a 404 into HTTP 200. Renaming a title changes its canonical path; old title paths are not automatically retained. API-slug aliases remain the compatibility path.

## Build reports invalid or conflicting paths

**Check:** Read the build warning/error and compare filename/API slugs and H1/API titles.

**Expected:** Slugs must be portable path names; title-derived paths must be non-empty, at most 180 characters and collision-free. Local filename slugs must be unique across nested directories, ignoring case.

**Fix:** Correct conflicting metadata. Invalid API discovery falls back to local routes, but invalid local content prevents building and preserves the previous artifact. Do not remove route validation to force deployment.

## Changing ALL_API_URL has no effect

**Check:** Inspect `API` in `scripts/post-pages.js` and `public/scripts/blog.js`.

**Expected:** Both use the hardcoded `https://api.free-time.me/v2`; the old environment variable is unused.

**Fix:** Change both constants and rebuild. Ensure browser CORS access to the selected backend. Do not embed tokens or secrets in static JavaScript.

## Preview or deployment assets fail

**Check:** Confirm `npm ci` and `npm run build` completed, `dist` exists, and the site is hosted at the custom-domain root.

**Expected:** The preview serves only `dist`; root-relative assets do not support a repository subpath without changes. Tests also require a completed build.

**Fix:** Use a compatible recent Node runtime (the Pages workflow selects 26), run the declared scripts, and deploy only the complete artifact. The former `--use-system-ca` startup-flag instructions and Vercel route configuration no longer apply. Check Pages settings and DNS independently; repository configuration does not prove a working deployment.
