# Sources

Luma Store clients can aggregate multiple application catalogs rather than depending on one hard-coded source.

## Source types

The Android client supports Luma Store data together with F-Droid-compatible/community repositories. Each source should be fetched and parsed independently so a failure in one catalog does not hide healthy sources.

## Luma Store source

For new integrations, All API v2 exposes the normalized Luma Store catalog:

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
```

Useful list filters include `category`, `platform` and `search`.

Linux clients can also supply `package_format` together with `platform=Linux`. Accepted formats currently are:

- `AppImage`
- `Debian-based`
- `RPM-based`

`linux_package_base` remains accepted for backwards compatibility, but new clients should use `package_format`.

## Normalized platform data

The API exposes the selected platform at the top level for compatibility while retaining the complete `platforms` array. Platform data can include `download_url`, `file_size_mb`, `package_format` and the legacy `linux_package_base`.

## Debugging an empty source

Check retrieval, response status, parsing, normalization, client filters, platform selection and media URLs separately. A successful HTTP request does not guarantee that a client-side filter will leave visible apps.
