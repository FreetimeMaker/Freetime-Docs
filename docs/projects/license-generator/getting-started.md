# Getting Started

[Project overview](./index.md) · [Troubleshooting](./troubleshooting.md)

## Prerequisites

- **Required for source use:** Python 3.9 or later and the source tree with its `templates/` directory. The CLI uses Python's standard library.
- **Optional:** Git for cloning, suggesting the author from `git config user.name`, deriving the default year, and detecting the GUI's repository save target; PyQt6 and a working graphical session for the GUI. No minimum PyQt6 version is specified in the source.
- **Packaging only:** Linux, make and the distribution's package-build tools; see [Development](./development.md).

Generation, `--info`, and the GUI try SPDX over HTTPS for selected license IDs, then use the bundled text if the request fails or returns invalid text. Author details, project names, and edits stay local. `--ls` works without a connection, and generation can use the bundled templates offline.

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

MIT and BSD require a nonempty single-line holder and a four-digit year or ascending year range such as `2024-2026`. Interactive generation asks for a project name and author unless you supply `--project` and `--holder`. The holder defaults to the saved author, then the Git user name. Unless overridden with `--year`, the CLI uses the earliest root commit's author year in the current Git checkout, or the current year if it cannot determine one.

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
generate-license --version
generate-license --ls
generate-license -i mit
generate-license -q --license mit --holder "Ada Example" -o LICENSE
license-gen --gui
```

`-i` / `--info` shows the unpersonalized text from SPDX or the bundled fallback. Release availability and package installation were not tested during the source review.

## Combine and edit licenses

Repeat `--license` in the order you want the texts to appear. In the interactive menu, you can instead enter comma-separated numbers or IDs. Add `--edit` to open the draft in `$VISUAL`, `$EDITOR`, or `vi` before writing:

```bash
python3 license_gen.py -q --license MIT --license Apache-2.0 \
  --holder "Ada Example" --edit -o license-example/LICENSE-combined
```

Save and close the editor to continue. `--edit` opens an editor even in quick mode and does not bypass overwrite protection. Explain how each license applies before publishing the draft.

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

Linux packages also supply a **License Generator** application-menu entry. Select a template and click **Append license** to add it to the editable draft, or **Replace text** to start over with that template. Copy and save use the text as edited.

Choose an existing **Save folder** and check **Target** before saving. If Git detects a working tree, the app locks the filename and targets `LICENSE` at the repository root, even when you choose a subfolder. Outside a detected working tree, the project name suggests an editable filename. The year defaults from the save folder's Git history or the current year; you can edit it. The app asks before overwriting an existing file.

`--gui` uses saved defaults and accepts `--project`; the CLI's `--license`, `--holder`, `--year`, `--output` and `--force` values are not forwarded into GUI controls. Configure these in the interface instead.
