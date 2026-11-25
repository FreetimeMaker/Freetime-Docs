# Sources

Luma Store has two distinct source mechanisms: tracked release URLs in the website and catalog repositories in the Android client.

## Tracked release sources

The [website's sources page](https://github.com/FreetimeMaker/Luma-Store-Website/blob/ff8504f3d54ffa3cd2ac6035f94c342dc7acbca4/app/sources/page.tsx) accepts a source URL and currently fixes the platform to **Android**. Supported forge hosts are:

- `github.com`
- `gitlab.com`
- `codeberg.org`

Other HTTPS URLs are treated as direct downloads. Tracked sources do not require a developer submission. The list is saved in browser local storage, not synchronized as an account-owned source list. Refresh checks the latest release again.

The [backend resolver](https://github.com/FreetimeMaker/All-API-Node/blob/e7010ad906104bd8e597634c6e0cf7718b88fd5e/src/v2/lumastore/store.js) recognizes `.apk` asset names as Android and filters out all other assets. A direct non-APK URL or a latest release without APK assets can return an empty list even when resolution succeeds. Linux/Windows assets are not supported by this implementation.

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

The [Android repository layer](https://github.com/FreetimeMaker/Luma-Store-Android/blob/4ca4752c99d0d95fae5c92cc16d925050d187b91/app/src/main/java/com/freetime/lumastore/data/AppRepository.kt) enables the Luma Store catalog by default:

```text
https://api.free-time.me/v2/lumastore/apps?platform=android
```

Built-in Freetime F-Droid, F-Droid and IzzyOnDroid repositories are disabled by default and can be enabled separately. As of Android 4.4.3, the built-in Freetime source uses `https://repo.free-time.me/fdroid/repo/index-v2.json` instead of the old `fdroid.free-time.me` host. Custom F-Droid-compatible sources are also supported. These catalogs are separate from the website's locally tracked release URLs.

## Public catalog filters

`GET /v2/lumastore/apps` accepts `category` (category ID), `platform` and `search` (name matching). The current normalized platform list contains Android rows only. There is no `package_format` filter.

## Keep source types separate

| Source type | Stored where | What refresh means |
| --- | --- | --- |
| Website tracked URL | Browser local storage | Resolve the latest forge release or direct HTTPS asset again |
| Android catalog repository | Client repository preferences | Fetch and parse the selected Luma or F-Droid catalog |
| Published store listing | Server-side store tables | Read catalog metadata; publication is a separate developer workflow |

Removing a website tracked URL does not archive a published app. Enabling an Android repository does not submit any of its apps for review.

## Debugging

For tracked sources, check HTTPS URL syntax, latest release existence, APK asset names, provider login/permissions and rate limits. For catalogs, inspect HTTP status, response parsing, app visibility, source settings and client filters independently. A successful empty result is not equivalent to a transport error.

For the hosted Freetime catalog URL and fingerprint, see the [F-Droid repository guide](../repositories/f-droid.md).
