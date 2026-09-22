# API Reference

Current backend package: **2.7.0**.

## Health

```text
GET /v1/health
GET /v2/health
```

## Auth

Both versioned routers expose authentication routes including login/logout and the configured Supabase authentication flow. Protected service operations use bearer authentication.

## GeoWeather

```text
GET  /v1/geoweather/subscriptions/plans
POST /v1/geoweather/subscriptions/redeem
GET  /v1/geoweather/subscriptions
```

Equivalent service routing exists in v2. GeoWeather code storage/lookup is backed by Appwrite TablesDB in the current backend models.

## Wallora

```text
GET  /v1/wallora/wallpapers
GET  /v1/wallora/wallpapers/:id
POST /v1/wallora/wallpapers/:id/purchase
POST /v1/wallora/wallpapers
```

## Luma Store — v2

### Catalog

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
GET /v2/lumastore/package-formats
```

List filters include `category`, `platform` and `search`. Linux package filtering additionally accepts `package_format` with `platform=Linux`.

### Ratings

```text
GET    /v2/lumastore/apps/:id/ratings
GET    /v2/lumastore/apps/:id/rating/me
PUT    /v2/lumastore/apps/:id/rating/me
DELETE /v2/lumastore/apps/:id/rating/me
```

The summary endpoint is public. The `/rating/me` endpoints require authentication. PUT accepts an integer rating from 1 through 5; developers cannot rate their own app.

## MD-Blog — v2

```text
GET /v2/blog/posts
GET /v2/blog/posts/:slug
GET /v2/blog/categories
```

`/posts` supports category filtering and sorts by release timestamp. Individual posts include Markdown content. Responses use short public cache headers.

## Sol Arcade — v2

The v2 Arcade routes cover service info, wallet challenge/login, current session/pass, pass payment session/confirmation, play start, score recording/querying and admin setup.

## Errors

Check HTTP status before reading a response as successful data. Authentication, validation, missing resources and upstream failures are separate states.
