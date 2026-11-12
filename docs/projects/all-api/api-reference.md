# API Reference

Backend package: **2.8.1**. Paths below are the mounts in [All-API-Node](https://github.com/FreetimeMaker/All-API-Node/tree/HEAD/src). They do not start with `/api`.

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

For example, use `GET /v2/health`. Authentication and wallpaper mutations have route-specific authorization requirements; see the source handlers rather than treating every route as public.

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

`/apps` returns an array and accepts `category` (category ID), `search` (case-insensitive name matching) and `platform`. The list excludes archived apps. Normalization keeps only Android platform rows; `platform=Linux` or `platform=Windows` therefore produces no matching list entries. There is no `/package-formats` route or `package_format` filter in this revision.

App details query the store app ID directly. Rating, review and per-app favorite handlers instead resolve either an app UUID or a package name. Do not assume package-name lookup is supported by the app detail handler.

Ratings return `app_id`, `average` and `count`. Reviews return up to 100 non-empty reviews with `rating`, `review_text` and `updated_at`; supported sort branches include `newest` (default), `oldest` and `highest`. Download counts use the public `luma_app_download_count` RPC, not raw download-event access.

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

The response contains `source_url`, `provider`, `version`, `title`, `published_at` and `assets`. Provider credentials are optional; see [Authentication](/projects/all-api/authentication).

## MD-Blog — v2

```text
GET /v2/blog/posts
GET /v2/blog/posts/:slug
GET /v2/blog/categories
```

The router reads Markdown from the MD-Blog repository, parses metadata and caches normalized responses.

## Separate frontend routes

[All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd/tree/HEAD/app/api) implements `/api/health`, `/api/proxy/[...path]`, `/api/luma/apps`, `/api/luma/submissions`, `/api/luma/status-webhook`, `/api/support` and `/api/payment/verify`. These are Next.js routes, not additional Express mounts. The public `/api/luma/apps` endpoint exposes submissions whose status is exactly `Approved` and identifies its publishing mode as manual review.

## Errors

Check HTTP status and handle empty/204 responses before parsing JSON. Error mapping is handler-specific: some database failures are returned as 401 or 404 as well as genuine authentication/missing-resource errors. Read `error` and `message` where present; do not infer the underlying cause from status alone.
