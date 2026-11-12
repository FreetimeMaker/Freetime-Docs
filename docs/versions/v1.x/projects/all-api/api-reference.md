# API Reference

Current backend package: **2.8.0**.

## Health

```text
GET /api/v1/health
GET /api/v2/health
```

## Auth

Both versioned routers expose Supabase authentication routes for login/logout, the current user and linked accounts. Protected service operations use bearer authentication.

## GeoWeather

```text
GET  /api/v1/geoweather/subscriptions/plans
POST /api/v1/geoweather/subscriptions/redeem
GET  /api/v1/geoweather/subscriptions
```

Equivalent service routing exists in v2.

## Wallora

```text
GET  /api/v1/wallora/wallpapers
GET  /api/v1/wallora/wallpapers/:id
POST /api/v1/wallora/wallpapers/:id/purchase
POST /api/v1/wallora/wallpapers
```

## F-Port

```text
GET  /api/v1/fport/apps
GET  /api/v1/fport/apps/:id
POST /api/v1/fport/apps/:id/like
POST /api/v1/fport/apps
```

## Luma Store — v2

### Catalog and ratings

```text
GET    /api/v2/lumastore/apps
GET    /api/v2/lumastore/apps/:id
GET    /api/v2/lumastore/apps/:id/ratings
GET    /api/v2/lumastore/apps/:id/rating/me
PUT    /api/v2/lumastore/apps/:id/rating/me
DELETE /api/v2/lumastore/apps/:id/rating/me
GET    /api/v2/lumastore/package-formats
```

### Tracked release source resolver

```text
GET /api/v2/lumastore/sources/resolve?url=<repository-or-direct-url>&platform=<Linux|Android|Windows>
```

The resolver accepts GitHub, GitLab and Codeberg repository URLs plus arbitrary direct HTTPS download URLs. Forge sources resolve the latest release and return platform-classified assets; direct URLs return one artifact.

Clients can pass the matching VCS provider OAuth token as a bearer token together with `X-VCS-Provider`. All API forwards credentials only when that provider matches the source. This lets authenticated GitHub/GitLab/Codeberg requests use the user's provider account rather than anonymous API quotas.

## Sol Arcade — v2

The v2 Arcade routes cover service info, wallet challenge/login, current session/pass, pass payment session/confirmation, play start, score recording/querying and admin setup.

## Errors

Check HTTP status before treating a response as successful data. Authentication, validation, missing resources and upstream provider failures are separate states.
