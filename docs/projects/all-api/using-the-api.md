# Using All API

All API is the central HTTP backend used by multiple Freetime Maker services. This guide explains how to consume it from applications, websites, scripts and third-party clients.

## Base URL

The public All API base URL is:

```text
https://api.free-time.me
```

For example, the v1 health endpoint is:

```text
https://api.free-time.me/api/v1/health
```

## API versions


Most established endpoints are exposed below:

```text
/api/v1
```

Services with a newer contract can use:

```text
/api/v2
```

Do not silently replace a v1 path with v2. Treat API versions as separate contracts and migrate a client deliberately.

## First request

Start with a health request before debugging a service-specific integration.

```js
const response = await fetch('https://api.free-time.me/api/v1/health')

if (!response.ok) {
  throw new Error(`API unavailable: ${response.status}`)
}

const data = await response.json()
console.log(data)
```

The examples below use a shared base URL so the same client helper can be reused for every All API service.

## Request pattern

Use one shared API client instead of scattering `fetch` calls throughout UI components.

```js
const API_BASE_URL = 'https://api.free-time.me'\n\nasync function api(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers
    }
  })

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(body?.message || `HTTP ${response.status}`)
    error.status = response.status
    error.body = body
    throw error
  }

  return body
}
```

This centralizes status handling, JSON parsing and authentication.

## JSON requests

For endpoints accepting JSON:

```js
await api('/api/v1/example', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    example: 'value'
  })
})
```

Send only fields supported by the endpoint. Do not assume unknown properties will be ignored.

## Authentication

Some endpoints are public while account-specific or mutating operations can require authentication.

For bearer-token authentication:

```http
Authorization: Bearer <access-token>
```

With the helper above:

```js
await api('/api/v1/protected-resource', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
```

Never ship Supabase service-role keys, private signing keys or other server credentials in Android, desktop, browser or other distributed clients.

See [Authentication](/projects/all-api/authentication) for the authentication model.

## Status codes

Always evaluate the HTTP status before using the response as application data.

Typical classes are:

| Status | Meaning for a client |
| --- | --- |
| 2xx | Request succeeded |
| 400 | Invalid request or validation failure |
| 401 | Missing, expired or invalid authentication |
| 403 | Authenticated but operation is not permitted |
| 404 | Resource or route was not found |
| 409 | Request conflicts with existing state |
| 429 | Too many requests; retry later |
| 5xx | Backend or upstream service failed |

An empty result and an HTTP error are different states and should have different UI behavior.

## Error handling

Preserve useful backend error information for debugging, but do not expose secrets or raw internal errors to end users.

A client should distinguish at least:

```text
network unavailable
API HTTP error
authentication error
validation error
empty successful response
parsing/client error
```

## Service groups

All API contains endpoints for multiple Freetime Maker services. Keep integrations separated by service in client code.

A practical layout is:

```text
api/
  client.js
  auth.js
  geoweather.js
  fport.js
  wallora.js
  sol-arcade.js
```

The shared client owns transport behavior while each service module owns its paths and request/response mapping.

## GeoWeather

GeoWeather endpoints include subscription-related operations. Use the API reference to determine the current route and whether authentication is required.

## F-Port

F-Port exposes application/catalog operations including app listing, app lookup and supported authenticated interactions.

## Wallora

Wallora endpoints expose wallpaper/catalog functionality and purchase-related operations.

## Sol Arcade

Sol Arcade uses the v2 API for its newer contract, including challenge/login, sessions and pass/play-related operations. Keep its v2 integration separate from v1 service modules.

## Server-side integrations

Server environments may use credentials that must never be distributed to clients. Read secrets from environment variables and restrict them to the minimum privileges required.

```js
const secret = process.env.SERVICE_SECRET

if (!secret) {
  throw new Error('SERVICE_SECRET is not configured')
}
```

Do not commit `.env` values.

## Browser and app clients

Public clients should contain only public configuration. Authentication tokens belong to the signed-in user's session and should be stored using the security facilities appropriate for the platform.

Android, desktop and browser clients should assume that anything bundled with the application can ultimately be inspected by a user.

## Timeouts and retries

Use timeouts for network requests. Retry only operations that are safe to repeat, and use bounded backoff rather than an infinite retry loop.

Do not automatically retry a state-changing request unless the endpoint semantics make that safe.

## Response compatibility

Clients should generally ignore unknown response fields. This allows the backend to add optional information without immediately breaking older clients.

Do not silently accept missing required fields: validate the fields your feature needs and produce a useful error.

## Development workflow

When integrating a new endpoint:

1. verify the endpoint with a simple HTTP request;
2. document its method, path, authentication and body;
3. add it to the appropriate service module;
4. map the response into client-domain models;
5. handle non-2xx responses;
6. add UI/loading/error states;
7. test authenticated and unauthenticated behavior where applicable.

## API reference

See [API Reference](/projects/all-api/api-reference) for endpoint-oriented documentation and [Development](/projects/all-api/development) for the backend stack and local development setup.
