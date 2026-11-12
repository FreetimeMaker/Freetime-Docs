# Building custom Luma Store clients

A custom mobile, desktop, CLI or web client can browse the public catalog without reusing the official UI. The host platform does not change the current catalog's Android-only distribution scope.

## Source code

- [All-API-Node](https://github.com/FreetimeMaker/All-API-Node/blob/HEAD/src/v2/lumastore/store.js) — backend contract.
- [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android) — native client and F-Droid adapters.
- [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) — web client and developer workflow.

## Public API

Use the explicit backend mounts:

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
GET /v2/lumastore/developers/:id
GET /v2/lumastore/apps/:id/ratings
GET /v2/lumastore/apps/:id/reviews
```

The list endpoint returns an array and accepts `category` (category ID), `platform` and `search` (name matching). It excludes archived apps and normalizes platform rows to Android only. Linux/Windows filters do not return matching apps. `/package-formats` and `package_format` are not implemented.

App detail requests require the catalog's store app ID. Ratings, reviews and per-app favorites resolve either a UUID or a package name. Do not apply that flexible identifier contract to app details.

## Data model

Preserve app ID, package name, developer, description, category, media, repository/license data and the returned platform metadata. App normalization supplies a category name plus selected `platform`, `download_url` and `file_size_mb`. Keep optional fields optional and tolerate additional JSON fields.

The catalog includes public aggregate download counts. Do not request raw download-event rows as a replacement for that metric.

## Ratings and saved apps

Public rating summaries contain `app_id`, `average` and `count`. Reviews support `sort=newest`, `oldest` or `highest` and return at most 100 non-empty review entries.

Authenticated routes include:

```text
GET    /v2/lumastore/ratings/me
GET    /v2/lumastore/apps/:id/rating/me
PUT    /v2/lumastore/apps/:id/rating/me
DELETE /v2/lumastore/apps/:id/rating/me
GET    /v2/lumastore/favorites/me
GET    /v2/lumastore/apps/:id/favorite/me
PUT    /v2/lumastore/apps/:id/favorite/me
DELETE /v2/lumastore/apps/:id/favorite/me
```

Send a user bearer token from the Luma Store Supabase project. A rating write accepts `{"rating":5,"review_text":"Useful app"}` as JSON: integer rating 1–5, optional trimmed text up to 2,000 characters. Developers cannot rate their own app. Successful deletion returns 204 without JSON.

## Architecture and security

Keep catalog/source adapters, normalized models, application state, UI and platform download/install integration separate. F-Droid data and Luma API responses need their own adapters; the separate All API frontend's `/api/luma/apps` feed is not an interchangeable catalog response.

Public catalog browsing does not need privileged credentials. Never embed service-role keys or email/webhook secrets in a client. Distinguish Supabase user tokens from forge provider tokens used by [tracked sources](/projects/luma-store/sources).

Validate HTTP status, tolerate empty bodies and preserve stable IDs. Installing an APK is Android-specific; a desktop browser of this catalog must not advertise Linux package installation merely because it runs on Linux.
