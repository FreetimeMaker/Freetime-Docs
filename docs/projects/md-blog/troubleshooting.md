# Troubleshooting

These are source-derived checks, not observed runtime results. Start with the failing stage.

## Build cannot discover posts

**Check:** Read the error from `scripts/post-pages.js` and check access to `https://api.free-time.me/v2/blog/posts`.

**Expected:** A valid `posts` array within 20 seconds, or a `[build] API unavailable; using local blog posts:` warning and a build using local routes. An explicitly empty API array is valid.

**Action:** Restore API access or fix invalid metadata if you need shells for API-only posts. If the build stops before replacing `dist`, check local Markdown, filename slugs and routes first. Later failures can still leave a partial artifact. Do not deploy a partial `dist`.

## Invalid or conflicting routes

**Check:** Compare the slugs and titles named in the error in the API response or local Markdown.

**Expected:** Portable slugs and non-empty ASCII title paths of at most 180 characters, without duplicate or alias collisions.

**Action:** Correct API metadata or local filenames and headings rather than removing validation. Title-only non-ASCII text can normalize to an empty path. See [routing rules](./architecture.md#architecture-routes-and-canonical-urls).

## Homepage edits do not appear

**Check:** Compare `public/md/index.md` with `dist/index.html`.

**Expected:** Preview serves the generated artifact, not source.

**Action:** Stop and rerun `npm run dev`. There is no watcher. A file added under `public/blogs/` becomes fallback content only after rebuilding; it does not change the homepage or publish to the API.

## Blog unavailable or stuck loading

**Check:** Inspect browser script/vendor requests and API requests for posts, categories and individual post content.

**Expected:** JavaScript assets load. The API permits credential-free CORS requests or the browser resolves a failed request using `/data/local-posts.json`. List rendering needs both posts and categories, even if they come from different sources.

**Action:** Verify that `/data/local-posts.json` is deployed and contains the expected local post. A successful API list omits local-only entries; the fallback is not a merge. If a local-only title path fails while live discovery succeeds, try its filename-slug alias. Fix API availability/CORS for live content. `no-cors` makes JSON unreadable and is not a fix. A working homepage does not prove blog requests work. Check the console's `[blog]` and `[blog routes]` errors without sharing sensitive data.

## Post renders with HTTP 404

**Check:** Inspect the initial HTTP response and whether `dist/blog/<path>/index.html` exists.

**Expected:** New or legacy API-style paths may render through `404.html` while retaining HTTP 404.

**Action:** Rebuild/deploy for current title paths and use those links. Canonicals and address-bar replacement do not change HTTP status. Old title paths are not automatically retained after a rename.

## Wrong backend or broken deployment assets

**Check:** Inspect `API` in both build discovery and browser code, the workflow logs, Pages settings and hosting base path.

**Expected:** `ALL_API_URL` has no effect. Root-relative assets assume `blog.free-time.me`, not a repository subpath.

**Action:** Change both constants and rebuild, or restore root hosting. Verify DNS/HTTPS separately. Follow [setup and deployment](./getting-started.md); no successful deployment is certified by this review.
