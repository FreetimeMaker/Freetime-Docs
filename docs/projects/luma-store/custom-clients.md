# Building custom Luma Store clients

Luma Store is not limited to the official Android, Linux and web clients. A custom client can consume the same public store data and implement its own user interface, platform integration or package workflow.

## Client responsibilities

A client normally needs to:

1. load the available store/source data;
2. parse application and release metadata;
3. select metadata for the user's language;
4. display app lists, search results and app details;
5. choose a release for the current platform;
6. expose the download URL or perform the platform-specific installation flow;
7. handle authentication only for operations that require a user account.

Keep the network/data layer separate from the UI. This makes source parsing and API changes easier to test.

## Application model

Do not model an app as only a name and download URL. A client should be prepared to handle:

- application/package identifier;
- name and description;
- icon and other media;
- localized metadata;
- categories;
- source/repository information;
- platform-specific releases;
- version name and version code;
- changelog;
- download information and file metadata;
- visibility/review state where exposed by the API.

Fields can be optional. Clients should degrade gracefully instead of failing an entire listing because one optional metadata field is missing.

## Localization

When localized metadata is available, select it in this order:

1. exact device/requested language;
2. compatible language fallback where appropriate;
3. the application's default metadata.

Keep localization selection in the data layer so every screen displays the same language consistently.

## Sources

Luma Store can aggregate more than one source. Treat a source as a data provider rather than hard-coding a single repository into the UI.

A robust source pipeline is:

```text
source
  -> fetch
  -> validate
  -> parse
  -> normalize
  -> filter
  -> present
```

If one source fails, the client should report that source failure without making healthy sources unusable.

See [Sources](/projects/luma-store/sources) for the source model and debugging stages.

## Browsing apps

Cache or retain normalized app objects after loading them. Search and category filters should operate on normalized metadata instead of repeatedly parsing the source response.

Typical UI flow:

```text
Sources -> App list -> Search/filter -> App details -> Release -> Download/install
```

## App details

An app-details view should be driven by the application identifier and should resolve its current metadata and available releases. Do not depend on list position or UI state as the permanent identifier.

## Releases and downloads

Choose releases using explicit platform and version metadata. Before starting a download, validate that a usable download URL exists.

A client that installs packages itself is also responsible for platform security rules and package verification. A browser-style client may instead hand the download to the operating system.

## Authentication

Public catalog browsing should not require credentials unless the backend explicitly protects that resource.

For authenticated operations, use the supported Luma Store/Supabase authentication flow and keep session tokens out of logs and source control. Never embed privileged server credentials in a distributed client.

## Submission and developer features

Developer submission/review functionality is separate from ordinary store browsing. If a custom client implements developer functionality, follow the same submission lifecycle documented in [App submissions](/projects/luma-store/submissions).

## Compatibility

Custom clients should tolerate:

- additional JSON fields;
- missing optional fields;
- new source types;
- new platforms;
- localized metadata they do not recognize;
- applications without media or changelogs.

Avoid binding parsing logic to the exact visual structure of an official Luma Store client.

## Recommended architecture

```text
UI
 |
View/Application state
 |
Repository
 |------------------|
Source adapters     Luma Store API/Auth
 |
Normalized models
 |
Platform download/install integration
```

This keeps the client portable and allows Android, desktop, CLI or web clients to share the same conceptual data model.

## Next steps

Read [Sources](/projects/luma-store/sources) for repository integration, [Android](/projects/luma-store/android) for the official Android implementation stack, and [Troubleshooting](/projects/luma-store/troubleshooting) when a source or listing is empty.
