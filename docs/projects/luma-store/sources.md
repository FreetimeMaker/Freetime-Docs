# Sources

Luma Store can track application releases outside the central store catalog. This is useful for Linux software and other apps that publish directly from their own repositories.

## Tracked sources

The Luma Store Website has a **Tracked sources** page where a user can add a source URL and choose Linux, Android or Windows.

Supported source types are:

- GitHub repositories
- GitLab repositories
- Codeberg repositories
- direct HTTPS download URLs

Tracked sources do not require a Luma Store developer submission. The website stores the tracked source list locally and can refresh all saved sources to check the latest release.

For forge repositories, Luma Store resolves the latest release and lists matching downloadable assets. Direct URLs are treated as a single downloadable artifact.

## Signed-in VCS access

When the user is signed in with the same forge as the tracked repository, source checks forward that provider's OAuth token to All API. This means GitHub, GitLab and Codeberg release checks can use the signed-in account instead of relying on anonymous API quotas.

The token is only forwarded when the signed-in provider matches the source provider.

## Source resolver API

All API exposes the resolver through the Luma Store v2 service:

```text
GET /v2/lumastore/sources/resolve?url=<repository-or-direct-url>&platform=<Linux|Android|Windows>
```

The deployed Luma Store API alias exposes the same resolver as:

```text
GET /lumastore/sources/resolve?url=<repository-or-direct-url>&platform=<Linux|Android|Windows>
```

The response identifies the provider, latest release version/title/date and matching assets.

Recognized asset types include APK for Android; AppImage, DEB, RPM, Flatpak and Flatpakref for Linux; and EXE, MSI and MSIX for Windows.

## F-Droid-compatible sources

The Android client separately supports Luma Store data together with F-Droid-compatible/community repositories. Each catalog should be fetched independently so one unavailable source does not hide healthy sources.

## Luma Store catalog

For store integrations, All API v2 exposes the normalized catalog:

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
```

Useful list filters include `category`, `platform` and `search`. Linux clients can additionally filter by `package_format`.

## Debugging

For tracked VCS sources, check the repository URL, provider login/token, release existence and requested platform. For catalog sources, check retrieval, response status, parsing, normalization, client filters, platform selection and media URLs separately.
