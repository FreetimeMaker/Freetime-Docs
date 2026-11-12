# Linux client status

No Luma Store Linux repository was present among the local projects inspected for this documentation update. Consequently, a current Linux implementation, Git remote, package repository, build command or installation path could not be verified.

Earlier instructions describing a Python/GTK client, `make deb`, `make rpm` and system-wide installation paths are not retained as current setup guidance without a source checkout to confirm them.

## Current verified platform support

- [All-API-Node](https://github.com/FreetimeMaker/All-API-Node) **2.8.1** normalizes the Luma catalog to Android platform rows and filters tracked release assets to APKs.
- [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) currently requires Android APK entries for final submissions; its tracked-sources page requests Android.
- There is no `/v2/lumastore/package-formats` endpoint or `package_format` filtering in the inspected backend.

These facts do not prove that no separate Linux client exists elsewhere. They mean Linux package distribution and client features cannot be documented as verified capabilities of these local sources.

For a client running on Linux that only browses the current Android catalog, see [Building Custom Clients](./custom-clients.md). Do not infer native Linux installation support from the host platform of a catalog browser.
