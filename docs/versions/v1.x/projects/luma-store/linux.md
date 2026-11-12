# Linux client

Luma Store Linux is the native Linux store client.

## Stack

The client uses Python 3, GTK 3 and PyGObject.

## Packages

The project supports building both Debian and RPM packages.

```bash
make deb
make rpm
```

The Makefile packages the Python entry point, desktop file and application icon.

## Native installation

The install target places the launcher under `/usr/local/bin/store`, the desktop entry under `/usr/share/applications`, and the icon in the hicolor icon hierarchy.

::: warning
The `install` target writes to system directories and therefore normally requires appropriate system permissions.
:::

## Runtime behavior

The client consumes the Luma Store API, displays package metadata and can hand downloaded DEB/RPM packages to the platform's normal installation workflow.
