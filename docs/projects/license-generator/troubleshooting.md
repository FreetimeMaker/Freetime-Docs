# Troubleshooting

[Project overview](./index.md) · [Getting Started](./getting-started.md)

## Command not found

**Symptom:** `generate-license` or `license-gen` is unavailable.

**Check:** Was a Linux package installed, or did you only clone the repository?

**Expected:** Packages install both commands. A source checkout does not add them to PATH.

**Fix:** Run `python3 license_gen.py` from the checkout, or install the package for your distribution.

## GUI does not start

**Symptom:** `--gui` reports a missing PyQt6 dependency or a Qt/display error.

**Check:** Confirm PyQt6 is installed for the same Python interpreter and that a graphical session is available.

**Expected:** CLI-only source use does not require Qt; the GUI does.

**Fix:** Install the appropriate PyQt6 package in the active environment. For packaged use, check the package manager's `python3-pyqt6` dependency. Investigate display/plugin errors separately; the application does not catch every Qt startup failure.

## Existing LICENSE is not replaced

**Symptom:** Quick mode returns exit code `1` without changing the file.

**Check:** Inspect the destination before retrying.

**Expected:** Existing-file protection is intentional. Quick mode cannot ask for overwrite approval.

**Fix:** Choose a new `--output` path, or use `--force` only after deciding that replacement is safe. Interactive generation asks for final write approval even with `--force`.

## Invalid holder, year or license identifier

**Symptom:** Generation reports invalid input.

**Check:** Use `--ls`; verify MIT/BSD holder and year values.

**Expected:** The holder must be nonempty and single-line. A year is four ASCII digits or an ascending `YYYY-YYYY` range. Other templates do not substitute holder/year fields.

**Fix:** Pass a valid `--holder` and `--year`, or correct saved defaults. The CLI supports `--ls`, not `--list`. For a copyleft license, use the exact variant listed by `--ls`; unsuffixed aliases such as `gpl-3.0` select `-only`, not `-or-later`. See [Supported licenses](./index.md#license-generator-supported-licenses).

## Saved settings prevent startup

**Symptom:** Commands that read defaults fail on malformed JSON or invalid config structure.

**Check:** Inspect `$XDG_CONFIG_HOME/license-gen/config.json`, or `~/.config/license-gen/config.json` when the variable is unset. The file must be a JSON object with string values.

**Expected:** CLI and GUI use the same settings file; an invalid one can affect both.

**Fix:** Back up needed settings, then run `python3 license_gen.py --rc` or the installed command with `--rc`. Reset runs before config loading, so it can remove a broken file. `--ls` and `--info` also bypass loading defaults.

## Output cannot be saved or the name is unexpected

**Symptom:** A file write fails, or generation suggests `LICENSE-My-Project` instead of `LICENSE`.

**Check:** Verify the current directory, parent-directory existence, permissions and `--project` value.

**Expected:** Project names are sanitized for the suggested filename only. Explicit output paths are not sanitized, and parent directories are not created automatically. The application does not itself expand `~` in a path.

**Fix:** Create the parent directory and use `-o` with the intended path; use `-o LICENSE` to override a project-derived filename.

## GUI ignores CLI generation fields

**Symptom:** A GUI launched with `--holder`, `--license` or `--output` does not show those values.

**Check:** Distinguish CLI generation options from GUI startup behavior.

**Expected:** GUI startup uses saved defaults and the optional project name, not the full set of CLI generation fields.

**Fix:** Set the values in the GUI or use quick/interactive CLI generation instead.

## Debian build fails on WSL file permissions

**Symptom:** `dpkg-deb` rejects staging permissions on a Windows-mounted drive.

**Check:** Confirm where the build work directory resides.

**Expected:** The README documents Linux-filesystem staging for this case.

**Fix:** Try `make deb DEB_WORK=/tmp`. See [Development](./development.md) for build dependencies and output locations; this workaround was source-reviewed, not tested here.

## Exit codes

- `0` — Success, or declining the final interactive write.
- `1` — Declining an existing-file overwrite, including quick mode without `--force`.
- `2` — Handled validation or I/O error.
- `130` — End-of-input or keyboard cancellation.
