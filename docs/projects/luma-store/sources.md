# Sources

Sources define the application catalogs visible in the Android client.

## Source types

Luma Store can work with its own metadata as well as F-Droid-compatible/custom repositories. Each source is fetched, parsed and filtered independently.

## Debugging an empty source

Check these stages separately:

1. Repository URL and connectivity.
2. Index response.
3. Metadata parsing.
4. App visibility/filtering.
5. Package metadata.
6. Icon/screenshot URLs.

A successful HTTP request does not necessarily mean that parsed applications will be visible.
