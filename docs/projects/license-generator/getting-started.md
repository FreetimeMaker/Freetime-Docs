# Getting Started

[Project overview](./index.md) · [Troubleshooting](./troubleshooting.md)

## Prerequisites

- **Required for source use:** Python 3.9 or later and the source tree with its `templates/` directory. The CLI uses Python's standard library.
- **Optional:** Git for cloning and suggesting the author from `git config user.name`; PyQt6 and a working graphical session for the GUI. No minimum PyQt6 version is specified in the source.
- **Packaging only:** Linux, make and the distribution's package-build tools; see [Development](./development.md).

Downloads and package installation need network access. License generation works offline once the source or package is available.

## First license from source

Clone the repository, then generate a file in a disposable working directory rather than overwriting a project's existing license:

```bash
git clone https://github.com/FreetimeMaker/License-Generator.git
cd License-Generator
python3 license_gen.py --ls
mkdir license-example
python3 license_gen.py -q --license mit --holder "Ada Example" --year 2026 -o license-example/LICENSE
```

Expected: `license-example/LICENSE` contains the MIT text with `Ada Example` and `2026`. No account or API key is needed. The exercise takes only a few minutes with Python, Git and the source already available.

Omit `-q` to use the interactive menu:

```bash
python3 license_gen.py
```

MIT and BSD require a nonempty single-line holder and a four-digit year or ascending year range such as `2024-2026`. The year defaults to the current year. Holder suggestions prefer an explicit `--holder`, then the saved author, then the Git user name.

## Install a Linux package

Obtain the appropriate package from [GitHub Releases](https://github.com/FreetimeMaker/License-Generator/releases), then install it with the distribution's package manager:

```bash
# Debian or Ubuntu
sudo apt install ./license-gen_*_all.deb

# Fedora
sudo dnf install ./license-gen-*.noarch.rpm
```

Both package types depend on PyQt6, even if you use only the CLI. The installed commands `license-gen` and `generate-license` invoke the same application:

```bash
generate-license --ls
generate-license -i mit
generate-license -q --license mit --holder "Ada Example" -o LICENSE
license-gen --gui
```

`-i` / `--info` shows the original template, not personalized output. Release availability and package installation were not tested during the source review.

## Shared defaults

From an installed package:

```bash
generate-license --sl mit
generate-license --sa "Ada Example"
generate-license --sc
generate-license --rc
```

For source use, replace `generate-license` with `python3 license_gen.py`.

`--sl` saves the license, `--sa` saves the author, `--sc` displays defaults and `--rc` clears them. CLI and GUI share `$XDG_CONFIG_HOME/license-gen/config.json`, or `~/.config/license-gen/config.json` when that environment variable is unset.

## Filenames and overwrite protection

The default output is `LICENSE` in the current directory. `--project "My Project"` suggests `LICENSE-My-Project` without changing the text. Use `-o LICENSE` to choose that exact filename even when specifying a project.

Output parent directories must already exist. Quick mode refuses to replace an existing file unless `--force` is supplied; add that flag only when replacement is intentional. Interactive generation asks for approval before writing and confirms overwrites.

## Desktop interface

Install PyQt6 into the Python environment used to run the source, then launch:

```bash
python3 license_gen.py --gui
```

Linux packages also supply a **License Generator** application-menu entry. The GUI supports preview, copy, save and shared defaults. It asks separately before replacing an existing file.

`--gui` uses saved defaults and accepts `--project`; the CLI's `--license`, `--holder`, `--year`, `--output` and `--force` values are not forwarded into GUI controls. Configure these in the interface instead.
