# Sources

Luma Store has two distinct source mechanisms: tracked release URLs in the website and catalog repositories in the Android client.

## Tracked release sources

The [website's sources page](https://github.com/FreetimeMaker/Luma-Store-Website/blob/HEAD/app/sources/page.tsx) accepts a source URL and currently fixes the platform to **Android**. Supported forge hosts are:

- `github.com`
- `gitlab.com`
- `codeberg.org`

Other HTTPS URLs are treated as direct downloads. Tracked sources do not require a developer submission. The list is saved in browser local storage, not synchronized as an account-owned source list. Refresh checks the latest release again.

The [backend resolver](https://github.com/FreetimeMaker/All-API-Node/blob/HEAD/src/v2/lumastore/store.js) recognizes `.apk` asset names as Android and filters out all other assets. A direct non-APK URL or a latest release without APK assets can return an empty list even when resolution succeeds. Linux/Windows assets are not supported by this implementation.

## Signed-in forge access

Source requests can send a forge OAuth token as `Authorization: Bearer <provider-token>` with `X-VCS-Provider: github`, `gitlab` or `codeberg`. `custom:codeberg` is also accepted for Codeberg. The backend forwards the token only to the matching source provider; anonymous requests are otherwise possible and may hit provider rate limits.

This provider token is different from the Supabase user token required for ratings and saved apps.

## Resolver paths

The Express backend mounts:

```text
GET /v2/lumastore/sources/resolve?url=<https-url>&platform=Android
```

The inspected website calls `https://api.free-time.me/lumastore/sources/resolve`. That unversioned alias requires deployment routing not present in the inspected Express entry point; its live availability was not tested.

The response includes `source_url`, `provider`, latest release `version` / `title` / `published_at` and an `assets` array. Direct URLs do not supply forge release metadata.

## Android catalog repositories

The [Android repository layer](https://github.com/FreetimeMaker/Luma-Store-Android/blob/HEAD/app/src/main/java/com/freetime/lumastore/data/AppRepository.kt) enables the Luma Store catalog by default:

```text
https://api.free-time.me/v2/lumastore/apps?platform=android
```

Built-in Freetime F-Droid, F-Droid and IzzyOnDroid repositories are disabled by default and can be enabled separately. Custom F-Droid-compatible sources are also supported. These catalogs are separate from the website's locally tracked release URLs.

## Public catalog filters

`GET /v2/lumastore/apps` accepts `category` (category ID), `platform` and `search` (name matching). The current normalized platform list contains Android rows only. There is no `package_format` filter.

## Debugging

For tracked sources, check HTTPS URL syntax, latest release existence, APK asset names, provider login/permissions and rate limits. For catalogs, inspect HTTP status, response parsing, app visibility, source settings and client filters independently. A successful empty result is not equivalent to a transport error.
