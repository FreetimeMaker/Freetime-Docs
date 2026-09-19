# Authentication

All API uses Supabase-backed authentication for authenticated service endpoints.

## OAuth flow

The API exposes endpoints to start provider login, process callbacks, retrieve the current user and sign out.

Protected endpoints expect a Bearer token:

```http
Authorization: Bearer <access-token>
```

## Linked accounts

Authenticated users can query, link and unlink external accounts through the linked-account endpoints.

## Client security

Public clients may use publishable/anonymous Supabase credentials where required. Never ship the Supabase service-role key, Arcade admin token, JWT signing secret or private wallet keys in Android, browser or desktop clients.
