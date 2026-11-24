# Development

[Project overview](./index.md) · [Getting Started](./getting-started.md)

## Source layout

- `license_gen.py` — Argument parsing, template rendering, settings, filename generation and protected writes.
- `license_gui.py` — PyQt6 preview, clipboard, save dialogs and shared-default controls.
- `templates/` — Thirteen bundled license texts.
- `test_license_gen.py` — Standard-library unit tests.
- `Makefile` — Tests, filesystem staging and Debian/RPM packaging.
- `license-gen.spec` — RPM package metadata and installation instructions.
- `license-gen.desktop` — Linux application-menu entry.

The CLI works without PyQt6 unless the GUI is requested. Do not make CLI-only paths depend on a Qt installation.

## Run tests

From the source repository root:

```bash
python3 -m unittest -v
```

On Linux, `make test` runs the same suite. The inspected tests cover template rendering, validation, config persistence/reset, filename handling, interactive generation and quick-mode overwrite protection. They are not GUI or package-install integration tests. These commands describe the project's test entry points; the application suite was not executed for this documentation review.

## Build Linux packages

Debian or Ubuntu:

```bash
sudo apt install make dpkg-dev
make deb
```

Fedora:

```bash
sudo dnf install make rpm-build
make rpm
```

The recipes require Linux/Unix command-line tools. They generate the final `.deb` or `.rpm` in the repository root and place intermediate files in `build/` by default. If Debian staging on a Windows-mounted WSL drive produces permission errors, the documented workaround is:

```bash
make deb DEB_WORK=/tmp
```

This changes staging and temporary work, not the final artifact location. The workaround was not exercised during this review.

## Installed files

`make stage DESTDIR=...` stages an installation root containing:

- `/usr/share/license-gen/` — Python modules and templates.
- `/usr/bin/license-gen` — Wrapper invoking `/usr/bin/python3 -E`.
- `/usr/bin/generate-license` — Alias symlink.
- `/usr/share/applications/license-gen.desktop` — GUI launcher.

Built Debian packages use architecture `all`; RPM packages use `noarch`.
