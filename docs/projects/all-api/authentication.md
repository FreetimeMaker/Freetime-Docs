# Authentication

All API uses Supabase authentication. Distinguish a Supabase user access token from a forge provider token: they serve different purposes and are not interchangeable.

## User authentication

Both versioned routers expose login, logout, callback, current-user and linked-account routes. See the [API Reference](/projects/all-api/api-reference) for methods and paths.

Protected operations expect:

```http
Authorization: Bearer <supabase-access-token>
```

Generic auth routes validate users against the generic Supabase project. Luma Store ratings and favorites validate against the dedicated Luma Store project and perform user-scoped database access with that token. A valid token from another project is not sufficient.

## VCS provider tokens

The public Luma source resolver can optionally receive a forge OAuth token:

```http
Authorization: Bearer <provider-token>
X-VCS-Provider: github
```

The resolver forwards the token only when `X-VCS-Provider` matches the detected source provider. Supported providers are GitHub, GitLab and Codeberg; `custom:codeberg` also matches Codeberg. This is separate from authenticating a user for ratings/favorites. Anonymous release requests remain possible and may be subject to forge rate limits.

## Developer submissions

Submission verification is implemented separately in the web applications. The standalone Luma website requires a Supabase user bearer token and accepts forge credentials through `x-github-token`, `x-gitlab-token` or `x-codeberg-token`. These headers are not the source resolver's `X-VCS-Provider` contract.

Final submissions require a public supported repository and verify ownership or sufficient write access. Codeberg OAuth requests `openid profile email read:user read:repository write:repository`; the verification path checks ownership or push/admin permission.

## Client security

Public clients may contain public/publishable Supabase configuration, never service-role credentials, OAuth client secrets, email keys or webhook secrets. Send provider tokens only to the intended trusted endpoint and only for the provider involved.

## Source code

- [Backend auth and Supabase clients](https://github.com/FreetimeMaker/All-API-Node/tree/HEAD/src)
- [Account/dashboard frontend](https://github.com/FreetimeMaker/All-API-FrontEnd)
- [Standalone Luma website](https://github.com/FreetimeMaker/Luma-Store-Website)
