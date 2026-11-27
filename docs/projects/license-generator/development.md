# Development

[Project overview](./index.md) · [Getting Started](./getting-started.md)

## Source layout

- `license_gen.py` — Argument parsing, SPDX retrieval and fallback, draft editing, Git lookup, settings and protected writes.
- `license_gui.py` — PyQt6 draft editor, clipboard, save-target selection and shared-default controls.
- `templates/` — 187 bundled fallback texts in version 1.2.0.
- `test_license_gen.py` — Standard-library unit tests.
- `Makefile` — Tests, filesystem staging and Debian/RPM packaging.
- `license-gen.spec` — RPM package metadata and installation instructions.
- `license-gen.desktop` and `license-gen.png` — Linux application-menu entry and app icon.

The CLI works without PyQt6 unless the GUI is requested. Do not make CLI-only paths depend on a Qt installation.

## Run tests

From the source repository root:

```bash
python3 -m unittest -v
```

On Linux, `make test` runs the same suite. The inspected tests cover template rendering, validation, config persistence/reset, output protection, SPDX response validation and caching, combined drafts with an editor, and the Git-derived year. They are not GUI or package-install integration tests. These commands describe the project's test entry points; the application suite was not executed for this documentation review.

## Build Linux packages

Debian or Ubuntu:

```bash
sudo apt install make dpkg
make deb AUTO_INSTALL_DEPS=0
```

Fedora:

```bash
sudo dnf install make rpm-build
make rpm AUTO_INSTALL_DEPS=0
```

The recipes require Linux/Unix command-line tools. By default, they may invoke `apt-get` or `dnf` (using `sudo` when needed) to install a missing package-build tool. The commands above disable that automatic installation. They generate the final `.deb` or `.rpm` in the repository root and place intermediate files under `rpmbuild/` by default. If Debian staging on a Windows-mounted WSL drive produces permission errors, the documented workaround is:

```bash
make deb DEB_WORK=/tmp
```

This changes staging and temporary work, not the final artifact location. The workaround was not exercised during this review.

## Install from source

On Linux, `make install` uses `/usr/local` by default. Override `PREFIX` to install elsewhere, and use the same `PREFIX` for `make uninstall`. Direct installation does not install Python or PyQt6 for you.

## Installed files

`make stage DESTDIR=...` uses `/usr` by default for package staging and produces:

- `/usr/share/license-gen/` — Python modules, templates and the GUI window icon.
- `/usr/share/icons/hicolor/128x128/apps/license-gen.png` — Application-menu icon.
- `/usr/bin/license-gen` — Wrapper invoking `/usr/bin/python3 -E -B`.
- `/usr/bin/generate-license` — Alias symlink.
- `/usr/share/applications/license-gen.desktop` — GUI launcher.

Built Debian packages use architecture `all`; RPM packages use `noarch`.
