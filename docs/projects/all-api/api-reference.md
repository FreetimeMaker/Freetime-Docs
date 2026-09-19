# API Reference

All API groups its HTTP endpoints by service.

## Base path

Most routes are available below `/api/v1`. Services that expose a v2 contract use `/api/v2`.

## Health

### GET /api/v1/health

Use the health endpoint to verify that the API process is reachable before debugging a service-specific request.

## GeoWeather

### GET /api/v1/geoweather/subscriptions/plans

Returns available subscription plans.

### POST /api/v1/geoweather/subscriptions/redeem

Redeems a subscription/code for the authenticated flow.

### GET /api/v1/geoweather/subscriptions

Returns subscription information.

## F-Port

### GET /api/v1/fport/apps

Lists applications.

### GET /api/v1/fport/apps/:id

Returns one application.

### POST /api/v1/fport/apps/:id/like

Updates the authenticated user's like state.

### POST /api/v1/fport/apps

Creates application metadata where permitted.

## Wallora

### GET /api/v1/wallora/wallpapers

Lists wallpapers.

### GET /api/v1/wallora/wallpapers/:id

Returns a wallpaper.

### POST /api/v1/wallora/wallpapers/:id/purchase

Starts/records a purchase flow.

## Sol Arcade

Sol Arcade is exposed through the v2 API and includes challenge/login, session, pass payment/minting and play-management operations.

## Errors

Clients should handle HTTP status codes before assuming a JSON success shape. Authentication failures, validation errors and backend/provider failures are separate conditions and should not be collapsed into a generic empty result.
