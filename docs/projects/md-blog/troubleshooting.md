# Troubleshooting

These are source-derived checks, not observed runtime results. Start with the failing stage.

## Build cannot discover posts

**Check:** Read the error from `scripts/post-pages.js` and check access to `https://api.free-time.me/v2/blog/posts`.

**Expected:** A valid `posts` array within 20 seconds. An explicitly empty array is valid; network/HTTP/JSON errors are not.

**Action:** Restore API access or fix invalid metadata, then rebuild. There is no local fallback. Discovery/validation failure preserves the previous artifact, but later build failures may not. Do not deploy a partial `dist`.

## Invalid or conflicting routes

**Check:** Compare API slugs and titles named in the error.

**Expected:** Portable slugs and non-empty ASCII title paths of at most 180 characters, without duplicate or alias collisions.

**Action:** Correct API metadata rather than removing validation. Title-only non-ASCII text can normalize to an empty path. See [routing rules](./architecture.md#architecture-routes-and-canonical-urls).

## Homepage edits do not appear

**Check:** Compare `public/md/index.md` with `dist/index.html`.

**Expected:** Preview serves the generated artifact, not source.

**Action:** Stop and rerun `npm run dev`. There is no watcher. A file added under `public/blogs/` is not published content.

## Blog unavailable or stuck loading

**Check:** Inspect browser script/vendor requests and API requests for posts, categories and individual post content.

**Expected:** JavaScript assets load and the API permits credential-free CORS requests. List rendering requires both posts and categories. There is no bundled fallback.

**Action:** Deploy complete assets and fix API availability/CORS. `no-cors` makes JSON unreadable and is not a fix. A working homepage does not prove blog requests work. Check the console's `[blog]` and `[blog routes]` errors without sharing sensitive data.

## Post renders with HTTP 404

**Check:** Inspect the initial HTTP response and whether `dist/blog/<path>/index.html` exists.

**Expected:** New or legacy API-style paths may render through `404.html` while retaining HTTP 404.

**Action:** Rebuild/deploy for current title paths and use those links. Canonicals and address-bar replacement do not change HTTP status. Old title paths are not automatically retained after a rename.

## Wrong backend or broken deployment assets

**Check:** Inspect `API` in both build discovery and browser code, the workflow logs, Pages settings and hosting base path.

**Expected:** `ALL_API_URL` has no effect. Root-relative assets assume `blog.free-time.me`, not a repository subpath.

**Action:** Change both constants and rebuild, or restore root hosting. Verify DNS/HTTPS separately. Follow [setup and deployment](./getting-started.md); no successful deployment is certified by this review.
