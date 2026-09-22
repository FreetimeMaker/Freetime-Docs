# Authentication

All API uses Supabase-backed user authentication for authenticated service endpoints.

## Bearer authentication

Protected endpoints expect:

```http
Authorization: Bearer <access-token>
```

Auth routes provide the configured login/logout/current-user and linked-account flows.

## Luma Store ratings

Public rating summaries need no user session. Reading, setting or deleting `/v2/lumastore/apps/:id/rating/me` requires an authenticated Luma Store user. The backend resolves that user from the bearer token.

## Multiple backend projects

The current server can keep Luma Store Supabase configuration separate from the generic Supabase client. This prevents Luma Store authentication/data configuration from implicitly replacing other All API services.

GeoWeather code storage is a separate Appwrite-backed concern and its API key is server-only.

## Client security

Public clients may contain only public/publishable configuration. Never ship Supabase service-role credentials, Appwrite API keys, Arcade admin/JWT secrets or private wallet keys.
