# Authentication

All API uses Supabase authentication. Distinguish a Supabase user access token from a forge provider token: they serve different purposes and are not interchangeable.

## User authentication

Both versioned routers expose login, logout, callback, current-user and linked-account routes. See the [API Reference](./api-reference.md) for methods and paths.

Protected operations expect:

```http
Authorization: Bearer <supabase-access-token>
```

Generic auth routes validate users against the generic Supabase project. Luma Store ratings and favorites validate against the dedicated Luma Store project and perform user-scoped database access with that token. A valid token from another project is not sufficient.

## Start a generic OAuth login

`GET /v2/auth/login?provider=github` and `GET /v2/auth/login/github` initiate a browser redirect. `POST /v2/auth/login` accepts JSON with `provider`, optional `redirectTo` and `next`; a non-HTML request receives `redirectUrl` and `redirectTo`. Provider availability still depends on the generic Supabase project's configuration.

:::callout warning Configure an explicit callback
The inspected login helper defaults to `/api/v1/auth/callback`, including when called through v2. That legacy path is **not** mounted by the direct Express app. Set `redirectTo` to your actual mounted callback (for example your backend origin plus `/v2/auth/callback`) and allow that URL in Supabase. `SUPABASE_DEFAULT_REDIRECT` supplies the default base origin, not a correction to the legacy callback suffix. A production rewrite could mask this mismatch; none was verified.
:::

`GET /auth/callback` serves the browser callback page; `POST /auth/callback` accepts `access_token` and optional `refresh_token` and validates the user. These suffixes exist under both versions. Clear local session state on logout; the logout handler's success response alone is not evidence that every previously issued access token has become unusable.

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

## Server-to-server secrets

The backend metadata webhook expects `Authorization: Bearer <LUMASTORE_METADATA_WEBHOOK_SECRET>`. The standalone website's status webhook instead expects `x-luma-webhook-secret` matching `LUMA_STATUS_WEBHOOK_SECRET`. These secrets are neither user sessions nor forge credentials. See the [metadata webhook contract](./api-reference.md#api-reference-luma-store-v2-metadata-database-webhook).

## Client security

Public clients may contain public/publishable Supabase configuration, never service-role credentials, OAuth client secrets, email keys or webhook secrets. Send provider tokens only to the intended trusted endpoint and only for the provider involved.

## Source code

- [Backend auth and Supabase clients](https://github.com/FreetimeMaker/All-API-Node/tree/HEAD/src)
- [Account/dashboard frontend](https://github.com/FreetimeMaker/All-API-FrontEnd)
- [Standalone Luma website](https://github.com/FreetimeMaker/Luma-Store-Website)
