# Sources

Sources determine which application catalogs the Android client can browse.

## Source model

Luma Store can work with Luma Store metadata as well as F-Droid-compatible/custom repositories. Source availability and enable/disable state are client concerns.

## Custom repositories

A repository must expose metadata in the format expected by the corresponding source implementation. A repository being reachable does not guarantee that all icons, packages or metadata fields are valid.

## Troubleshooting sources

When a source appears empty, check these independently:

1. repository URL/reachability,
2. index parsing,
3. app filtering,
4. package metadata,
5. icon/screenshot URLs.

This separation is important because a successful repository request can still result in zero visible apps after parsing or filtering.
