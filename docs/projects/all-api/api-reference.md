# API Reference

Backend package: **2.8.1**. Paths below are the mounts in [All-API-Node](https://github.com/FreetimeMaker/All-API-Node/tree/HEAD/src). They do not start with `/api`.

## Entry point and version information

```text
GET /          backend welcome/endpoint summary
GET /v1/v1     legacy version information (deprecated)
GET /v2/v2     v2 version information
```

The doubled version segments follow from the router mounts: `src/index.js` mounts `/v1` and `/v2`, while each router declares its own `/v1` or `/v2` information path. Neither `GET /v1` nor `GET /v2` is declared as a version-root handler. The welcome JSON is descriptive, not a routing table: its blog examples omit the `/v2` mount. Resolve paths from the actual mounts below. Static files are served under `/assets`.

## Shared routes

Both `/v1` and `/v2` expose these suffixes:

```text
GET    /health
GET    /auth/config
GET    /auth/login
GET    /auth/login/:provider
POST   /auth/login
POST   /auth/logout
GET    /auth/me
GET    /auth/linked-accounts
POST   /auth/link-account
DELETE /auth/link-account/:accountId
GET    /auth/callback
POST   /auth/callback
GET    /wallora/wallpapers
GET    /wallora/wallpapers/:id
POST   /wallora/wallpapers/:id/purchase
POST   /wallora/wallpapers
```

For example, use `GET /v2/health`; it returns `{"status":"ok"}`. Both auth and Wallora implementations were compared between versions and are identical in this checkout.

### Shared handler behavior

| Routes (after `/v1` or `/v2`) | Request / authorization |
| --- | --- |
| `GET /auth/config` | Public configuration booleans; `configured` tests client construction, while `hasUrl` / `hasAnonKey` inspect the primary environment names, not fallback names |
| `GET /auth/login`, `GET /auth/login/:provider`, `POST /auth/login` | Start generic-project OAuth; GET redirects, JSON POST returns redirect information; see [callback setup](./authentication.md#authentication-start-a-generic-oauth-login) |
| `GET /auth/me`, `GET /auth/linked-accounts` | Generic-project user bearer token |
| `POST /auth/link-account` | User token; JSON `accountId` required, optional `provider`, `providerUserId`, `metadata`; this is not proof of forge repository permission |
| `DELETE /auth/link-account/:accountId` | User token; removes the caller's linked-account entry |
| `POST /auth/logout` | Accepts an optional bearer token; success may have `user: null`; clear the client session too |
| `GET /auth/callback`, `POST /auth/callback` | Browser callback page / user token validation; not a Luma submission endpoint |
| `GET /wallora/wallpapers`, `GET /wallora/wallpapers/:id` | Public reads; list supports exact `category` filtering |
| `POST /wallora/wallpapers/:id/purchase` | Generic-project user token; records a purchase, returns 201; duplicate purchase returns 400 |
| `POST /wallora/wallpapers` | Generic-project user token; upserts supplied JSON with `created_by` set to the authenticated user, returns 201 |

Wallora price presentation uses Android detection plus `x-app-id` (or `x-requested-with`) equal to `com.freetime.wallora` to show zero cost and retain `original_cost`. These client-supplied headers are not authentication or payment verification. The purchase handler records a row; it does not implement a payment-provider checkout. Database permissions remain relevant to writes.

## Luma Store — v2

All paths in this section are relative to `/v2/lumastore`.

### Public catalog and profiles

```text
GET /apps
GET /apps/:id
GET /developers/:id
GET /apps/:id/ratings
GET /apps/:id/reviews
```

`/apps` returns an array and accepts `category` (category ID), `search` (case-insensitive name matching) and `platform`. The list excludes archived apps. Without a `platform` filter, rows without Android platform metadata can still appear with an empty `platforms` array and null selected download fields. Normalization keeps only Android platform rows; `platform=Linux` or `platform=Windows` therefore produces no matching list entries. There is no `/package-formats` route or `package_format` filter in this revision.

App details query the store app ID directly. Rating, review and per-app favorite handlers instead resolve either an app UUID or a package name. Do not assume package-name lookup is supported by the app detail handler. Unlike the list, the detail query does not itself filter `archived_at`; catalog exclusion is not an authorization guarantee.

Ratings return `app_id`, `average` and `count`. Reviews return up to 100 non-empty reviews with `rating`, `review_text` and `updated_at`; supported sort branches include `newest` (default), `oldest` and `highest`. Download counts use the public `luma_app_download_count` RPC, not raw download-event access.

Catalog list/detail responses now include read-time enrichment from developer profiles and GitHub Fastlane metadata where available. Titles, descriptions, changelog, screenshots, localized metadata and optional icon can therefore differ from stored values. This does not persist database changes; missing/unsupported metadata falls back to stored listing content. See [Development](./development.md).

### Metadata database webhook

```text
POST /metadata/webhook
```

This server-to-server endpoint requires `Authorization: Bearer <LUMASTORE_METADATA_WEBHOOK_SECRET>`, not a user or forge token. It accepts a database event with `schema: "public"`, `table` equal to `store_apps`, `luma_submissions` or `store_app_platforms`, `type` equal to `INSERT` or `UPDATE`, and a UUID `record.id`. It rereads database rows using that identity; payload metadata/ownership is not trusted.

Missing webhook-secret configuration returns 503, invalid authorization 401 and invalid event shape 400. Successful synchronization returns JSON with `ok: true` and synchronization details; inactive records or records without Android artifacts can be reported as skipped. Failed/incomplete synchronization returns 503 and asks the caller to retry. Responses use `Cache-Control: no-store`. The server also needs `LUMASTORE_SUPABASE_SERVICE_ROLE_KEY` for writes. This is distinct from the frontend's status webhook.

### Authenticated user data

```text
GET    /favorites/me
GET    /apps/:id/favorite/me
PUT    /apps/:id/favorite/me
DELETE /apps/:id/favorite/me
GET    /ratings/me
GET    /apps/:id/rating/me
PUT    /apps/:id/rating/me
DELETE /apps/:id/rating/me
```

Send the Luma Store Supabase access token as a bearer token. Rating writes accept JSON such as `{"rating":5,"review_text":"Useful app"}`. The rating must be an integer from 1 to 5; trimmed review text may contain at most 2,000 characters. Developers cannot rate their own app. Successful rating/favorite deletion returns **204**, without a JSON body.

### Tracked release sources

```text
GET /sources/resolve?url=<https-url>&platform=Android
```

Supported forge hosts are `github.com`, `gitlab.com` and `codeberg.org`; other HTTPS URLs are treated as direct downloads. Forge lookup requests the latest release. Only assets whose names end in `.apk` survive the current Android-only filter. Non-APK direct URLs can therefore resolve successfully with an empty asset list.

The response contains `source_url`, `provider`, `version`, `title`, `published_at` and `assets`. Provider credentials are optional; see [Authentication](./authentication.md).

## MD-Blog — v2

```text
GET /v2/blog/posts
GET /v2/blog/posts/:slug
GET /v2/blog/categories
```

The router reads Markdown from the MD-Blog repository. Lists return `{posts: [...]}` ordered by descending `releaseTimestamp`; `category` accepts comma-separated names and requires all requested categories (case-insensitive). Each summary contains `slug`, `title`, `releaseTimestamp` and `categories`; details add `markdown`. Categories return `{categories: [...]}`. Successful responses set `Cache-Control: public, max-age=60, s-maxage=300`; this is HTTP cache policy, not an in-process response cache. Invalid/missing post slugs return 404; upstream loading failures return 502.

## Separate frontend routes

Earlier documentation listed `/api/health`, `/api/proxy/[...path]`, `/api/luma/apps`, `/api/luma/submissions`, `/api/luma/status-webhook`, `/api/support` and `/api/payment/verify` in [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd). That checkout is unavailable locally, so this is not a verified current route inventory. These Next.js paths must not be added to the Express endpoint list.

The separately inspected Luma website has its own submission handler; see [App submissions](../luma-store/submissions.md).

## Errors

Check HTTP status and handle empty/204 responses before parsing JSON. Error mapping is handler-specific: some database failures are returned as 401 or 404 as well as genuine authentication/missing-resource errors. Read `error` and `message` where present; do not infer the underlying cause from status alone.

:::callout info Separate frontend not revalidated
`All-API-FrontEnd` was unavailable locally on 2026-11-20. References to its submission feed or proxy describe earlier documentation, not a current source-verified contract.
:::
