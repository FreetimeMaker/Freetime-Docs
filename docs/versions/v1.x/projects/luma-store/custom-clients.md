# Building custom Luma Store clients

Custom Android, desktop, CLI or web clients can consume the public Luma Store catalog without using the official UI.

## Recommended API

Use All API v2:

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
GET /v2/lumastore/package-formats
GET /v2/lumastore/apps/:id/ratings
```

The list endpoint accepts `category`, `platform` and `search`. Linux package filtering uses `platform=Linux&package_format=...`.

## Data model

Do not reduce an app to a name and URL. Preserve the application/package identifier, developer, description, category, media, repository/license data and the complete platform list. Platform rows can carry version/download metadata and Linux package format.

Clients should ignore unknown optional fields and degrade gracefully when optional media or metadata is absent.

## Ratings

Rating summaries are public. Writing or deleting the current user's rating requires authentication:

```text
GET    /v2/lumastore/apps/:id/rating/me
PUT    /v2/lumastore/apps/:id/rating/me
DELETE /v2/lumastore/apps/:id/rating/me
```

A submitted rating must be an integer from 1 to 5. The backend prevents a developer from rating their own app.

## Architecture

Keep source/API adapters separate from UI and installation logic:

```text
UI
 |
Application state
 |
Repository
 |--------------------|
F-Droid adapters      Luma Store API
 |
Normalized models
 |
Platform download/install integration
```

## Security

Public catalog browsing does not require privileged credentials. Never embed Supabase service-role keys or other server secrets in a distributed client.

## Compatibility

Support additional JSON fields, missing optional fields, new platforms and future package formats without failing the entire catalog. Use stable app/package identifiers instead of list positions.
