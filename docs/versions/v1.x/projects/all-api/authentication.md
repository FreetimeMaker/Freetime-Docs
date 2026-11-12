# Authentication

All API uses Supabase-backed user authentication for authenticated service endpoints and can also receive matching VCS provider credentials for Luma Store release resolution.

## Bearer authentication

Protected All API endpoints expect:

```http
Authorization: Bearer <access-token>
```

Auth routes provide login/logout/current-user and linked-account flows.

## VCS provider tokens

The Luma Store source resolver can receive a forge OAuth token using:

```http
Authorization: Bearer <provider-token>
X-VCS-Provider: github
```

Supported provider identities are GitHub, GitLab and Codeberg (`custom:codeberg` is normalized to Codeberg). The provider token is forwarded only when the provider matches the repository being resolved.

This allows release lookups to use the signed-in user's forge account and avoids depending on anonymous API request quotas.

## Codeberg

Luma Store's Supabase OAuth integration requests the Codeberg scopes needed for identity and repository verification:

```text
openid profile email read:user read:repository write:repository
```

Developer submissions require a public repository and verify that the authenticated Codeberg identity owns it or has push/admin access.

## Client security

Public clients may contain only public/publishable configuration. Never expose Supabase service-role credentials, Appwrite API keys, Arcade admin/JWT secrets, private wallet keys or unrelated provider tokens.
