# Using All API

All API exposes versioned HTTP contracts for Freetime Maker services.

## Base URL

The production origin is `https://api.free-time.me`. Append the documented `/v1` or `/v2` path.

## Versioning

Use v2 for new Luma Store, MD-Blog and Sol Arcade integrations. Do not silently rewrite a v1 route to v2; treat versions as separate contracts.

## Shared request helper

```js
const API_BASE = 'https://api.free-time.me'

async function api(path, options = {}) {
  const response = await fetch(API_BASE + path, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers }
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw Object.assign(new Error(body?.message || `HTTP ${response.status}`), { body })
  return body
}
```

## Authentication

Protected routes accept the signed-in user's bearer token:

```http
Authorization: Bearer <access-token>
```

Never substitute server credentials for a user token in a distributed client.

## Luma Store example

```js
const apps = await api('/v2/lumastore/apps?platform=Android')
const ratings = await api('/v2/lumastore/apps/com.example.app/ratings')
```

Linux package selection can use `platform=Linux&package_format=AppImage` (or `Debian-based` / `RPM-based`).

## MD-Blog example

```js
const { posts } = await api('/v2/blog/posts')
const post = await api('/v2/blog/posts/my-post')
const { categories } = await api('/v2/blog/categories')
```

The posts endpoint can filter categories and returns posts ordered by release timestamp. Post details include the Markdown body.

## Compatibility

Ignore unknown optional response fields, validate fields your feature requires and handle HTTP errors separately from successful empty results.
