---
title: License Generator
---

# License Generator

Generate open-source license files offline with a Python command-line tool or a PyQt6 desktop interface. Both interfaces use the same bundled templates and saved defaults.

**Technologies:** Python, PyQt6, Linux

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

The accepted short identifiers are:

```text
mit             apache-2.0       bsd-2-clause
bsd-3-clause    agpl-3.0         bsl-1.0
cc0-1.0         epl-2.0          gpl-2.0
gpl-3.0         lgpl-2.1         mpl-2.0
unlicense
```

Corresponding SPDX identifiers are accepted case-insensitively. The registered copyleft SPDX identifiers are `AGPL-3.0-only`, `GPL-2.0-only`, `GPL-3.0-only` and `LGPL-2.1-only`; these are not `-or-later` variants. Use `--ls` to inspect the available choices.

::: callout warning "Review the generated file"
This tool generates templates, not legal advice or a compliance assessment. Only MIT and BSD receive copyright-holder and year substitutions. Other templates retain their original examples and appendices. Check any additional source-file headers, copyright statements or NOTICE requirements your project needs.
:::

A project name changes only the suggested filename, not the license text. The source README attributes the bundled texts to SPDX License List v3.26.0, except GPL-3.0, which comes from the repository's own LICENSE; upstream text equivalence was not independently checked in this review.

## Source review

Last checked against source: **2026-11-24**.

**Review scope:** CLI options, template behavior, GUI entry point, settings, output protection, packaging and test definitions. The local checkout was clean at inspection.

Inspected revision: [`f62e55bb7dba28ead52d922e236089f8b717297c`](https://github.com/FreetimeMaker/License-Generator/tree/f62e55bb7dba28ead52d922e236089f8b717297c).

- [`license_gen.py`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/license_gen.py)
- [`license_gui.py`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/license_gui.py)
- [`templates/`](https://github.com/FreetimeMaker/License-Generator/tree/f62e55bb7dba28ead52d922e236089f8b717297c/templates)
- [`Makefile`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/Makefile)
- [`license-gen.spec`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/license-gen.spec)
- [`license-gen.desktop`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/license-gen.desktop)
- [`test_license_gen.py`](https://github.com/FreetimeMaker/License-Generator/blob/f62e55bb7dba28ead52d922e236089f8b717297c/test_license_gen.py)

This is a static source review, not a successful application test, GUI launch, package installation or verification of published downloads.
