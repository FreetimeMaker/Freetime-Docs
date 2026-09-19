# API Reference

All API groups its HTTP endpoints by service.

## Base URL

```text
https://api.free-time.me
```

All endpoint paths below are relative to this public API origin.

## Base path


Most routes are available below `/v1`. Services that expose a v2 contract use `/v2`.

## Health

### GET /v1/health

Use the health endpoint to verify that the API process is reachable before debugging a service-specific request.

## GeoWeather

### GET /v1/geoweather/subscriptions/plans

Returns available subscription plans.

### POST /v1/geoweather/subscriptions/redeem

Redeems a subscription/code for the authenticated flow.

### GET /v1/geoweather/subscriptions

Returns subscription information.

## Wallora

### GET /v1/wallora/wallpapers

Lists wallpapers.

### GET /v1/wallora/wallpapers/:id

Returns a wallpaper.

### POST /v1/wallora/wallpapers/:id/purchase

Starts/records a purchase flow.

## Sol Arcade

Sol Arcade is exposed through the v2 API and includes challenge/login, session, pass payment/minting and play-management operations.

## Errors

Clients should handle HTTP status codes before assuming a JSON success shape. Authentication failures, validation errors and backend/provider failures are separate conditions and should not be collapsed into a generic empty result.
