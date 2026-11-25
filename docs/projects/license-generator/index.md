---
title: License Generator
---

# License Generator

Generate open-source license files offline with a Python command-line tool or a PyQt6 desktop interface. Both interfaces use the same bundled templates and saved defaults.

**Technologies:** Python, PyQt6, Linux · **Source-declared version:** 1.1.0

[Getting Started](./getting-started.md) · [Development](./development.md) · [Troubleshooting](./troubleshooting.md) · [Source code](https://github.com/FreetimeMaker/License-Generator)

## Features

- Interactive generation, noninteractive quick mode and original-template inspection.
- Preview, copy and save in the desktop interface.
- Shared default license and author settings.
- Copyright-holder and year substitution for MIT and the two BSD licenses.
- Optional project-specific output filenames and explicit overwrite protection.
- Debian and RPM packaging for Linux.

Git is optional and provides an author suggestion. Generation itself does not need a network connection.

## Supported licenses

Version 1.1.0 bundles 187 offline templates in both the CLI and GUI. The original 13 short identifiers still work:

```text
mit             apache-2.0       bsd-2-clause
bsd-3-clause    agpl-3.0         bsl-1.0
cc0-1.0         epl-2.0          gpl-2.0
gpl-3.0         lgpl-2.1         mpl-2.0
unlicense
```

The CLI accepts SPDX identifiers case-insensitively. Unsuffixed identifiers such as `gpl-3.0`, `gfdl-1.3` and `lgpl-3.0` select the corresponding `-only` templates. Specify the full `-or-later` identifier to select that variant when listed. Run `--ls` to see what your installed version provides.

::: callout warning "Review the generated file"
This tool generates templates, not legal advice or a compliance assessment. Only MIT and BSD receive copyright-holder and year substitutions. Other templates retain their original examples and appendices. Check any additional source-file headers, copyright statements or NOTICE requirements your project needs.
:::

A project name changes only the suggested filename, not the license text. The upstream changelog describes the expanded catalog as covering non-deprecated SPDX License List v3.29.0 entries marked OSI-approved or FSF-libre. Catalog completeness and text equivalence were not independently verified.

## Source review

Last checked against source: **2026-11-25**.

**Review scope:** CLI options, template behavior, GUI entry point, settings, output protection, packaging and test definitions. The local checkout was clean at inspection.

Inspected revision: [`5363c352e37da599ee0a9a91a3b4b57b19d51c99`](https://github.com/FreetimeMaker/License-Generator/tree/5363c352e37da599ee0a9a91a3b4b57b19d51c99). The 2026-11-25 pass reviewed changes since `f62e55b`: the catalog and alias lookup, GUI version, packaging recipes and related tests.

- [`license_gen.py`](https://github.com/FreetimeMaker/License-Generator/blob/5363c352e37da599ee0a9a91a3b4b57b19d51c99/license_gen.py)
- [`license_gui.py`](https://github.com/FreetimeMaker/License-Generator/blob/5363c352e37da599ee0a9a91a3b4b57b19d51c99/license_gui.py)
- [`templates/`](https://github.com/FreetimeMaker/License-Generator/tree/5363c352e37da599ee0a9a91a3b4b57b19d51c99/templates)
- [`Makefile`](https://github.com/FreetimeMaker/License-Generator/blob/5363c352e37da599ee0a9a91a3b4b57b19d51c99/Makefile)
- [`test_license_gen.py`](https://github.com/FreetimeMaker/License-Generator/blob/5363c352e37da599ee0a9a91a3b4b57b19d51c99/test_license_gen.py)

This is a static source review, not a successful application test, GUI launch, package installation or verification of published downloads.
