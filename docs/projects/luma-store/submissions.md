# App submissions

The Developer Dashboard is responsible for developer-facing submission and update workflows.

## Submission lifecycle

A submission contains application metadata and platform/release information. New submissions and updates can require review before becoming visible to store clients.

## Metadata

Keep display metadata separate from package/release metadata. Localized metadata should be selected according to the requested/device language when available, with a defined fallback.

## Updates

An update to an existing app should be associated with that app rather than treated as an unrelated duplicate listing. Version, changelog and platform data belong to the update/review flow.

## Review and automation

Automated checks may assist review, but the persisted submission state remains the source of truth for what clients are allowed to display.

## Client visibility

If a submission exists in the dashboard but not in the store, inspect approval/visibility and platform metadata before treating it as a client rendering bug.
