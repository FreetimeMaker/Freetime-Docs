# App submissions

The standalone website's [submission handler](https://github.com/FreetimeMaker/Luma-Store-Website/blob/HEAD/app/api/luma/submissions/route.ts) implements developer draft, final submission and archive operations. It is separate from the submission API in [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd).

## Authentication and platform requirements

`POST /api/luma/submissions` requires a Supabase user bearer token. Forge authorization is passed separately through `x-github-token`, `x-gitlab-token` or `x-codeberg-token` when needed for repository verification.

The handler retains only platform entries with `platform: "Android"`, `packageType: "apk"` and a valid HTTP/HTTPS download URL. A final submission without such an entry is rejected. Windows/Linux entries are not accepted as a substitute. Closed-source submissions and a `Proprietary` license type are rejected.

## Drafts

Draft saves use `draft: true` and can persist incomplete metadata without final forge verification. Draft progress is clamped to steps 1–3. Updating an existing draft is scoped to the authenticated user's row with status `Draft`.

## Final repository verification

Final submissions require a public repository on GitHub, GitLab or Codeberg. Verification checks the authenticated forge identity's ownership or sufficient write permissions; a public URL alone is not proof of control. Reauthorize the relevant forge if a required provider token is missing or expired.

When separate platform repositories are enabled, the handler also validates repository URLs and complete per-platform metadata/screenshots. This retained data structure does not override the current Android-only platform filter.

## Review and updates

Successful final saves enter `Pending`. An existing submission can be resubmitted from `Draft`, `Rejected`, `Approved` or `Changes Requested`; updates are scoped to the user and expected current status. Other edit states return a conflict.

The dashboard provides status/history and reviewer information, Fastlane metadata assistance and published-app metadata editing. Treat the persisted review/publication state as authoritative, not merely the presence of a submission row. A pending update is not proof that the public store has changed.

## Metadata and archiving

Keep display/localized store metadata distinct from version, APK download and release metadata. Updates should retain their association with the existing store app.

The handler also includes authenticated deletion/archive logic. Archiving a published store app sets `archived_at`; the public catalog list excludes archived rows. Do not equate every removal operation with permanent deletion of all related data.

## Visibility troubleshooting

If an app is present in the dashboard but absent from the catalog, inspect review state, publication into store tables, archive state and Android platform metadata before investigating client rendering. The separate All API frontend's public `/api/luma/apps` route explicitly selects `Approved` submission rows; the Express catalog reads `store_apps` instead.
