---
title: Linux Developer Console
---

# Linux Developer Console

The [Luma Store desktop repository](https://github.com/FreetimeMaker/Luma-Store-Dekstop) contains a JVM desktop app titled **Luma Store · Developer Console**. The spelling `Dekstop` is part of the Git remote. This is the developer client with Linux packaging configured, not a Linux package store or a port of the [Android client](./android.md).

:::callout info Source status
Linux package formats are declared in Gradle. No installer, supported distribution or CPU architecture, or published release was verified. These package formats distribute the Developer Console itself; they do not enable Linux app submissions or Linux packages in the public store API.
:::

The [APT](../repositories/apt.md) and [DNF / YUM](../repositories/dnf-yum.md) guides configure the generic Freetime package sources; they do not establish that the Developer Console is published there.

## Build configuration

| Item | Source declaration |
| --- | --- |
| Modules and target | `:desktopApp` uses Kotlin/JVM and Compose Desktop; `:shared` uses Kotlin Multiplatform with only `jvm()` declared |
| Build tools | Gradle wrapper **9.9.2**, Azul **JDK 21** Gradle daemon criteria, Kotlin **2.4.21**, Compose Multiplatform **1.12.2** |
| Package | `com.freetime.lumadevs`, package version **1.0.0** |
| Distribution formats | Linux `Deb` and `Rpm`; Windows `Exe` and `Msi`; no macOS package format declared |

No Android SDK or Android target is declared in this checkout. The daemon JDK setting is not a minimum runtime or distribution support guarantee. The [repository README](https://github.com/FreetimeMaker/Luma-Store-Dekstop/blob/b765c2d5d4075ce4c4459773421f7b74701fd9a9/README.md) documents running from source with `./gradlew :desktopApp:run`; this is a development command, not an installer or a tested result.

## Accounts and data

- Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the shell or IDE run environment. The app also accepts the website's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as fallbacks. It does not automatically load `.env.local`. Use the intended Luma project and never give the desktop client a service-role key.
- GitHub, GitLab and Codeberg sign-in use a browser and a loopback callback. The repository README documents `http://127.0.0.1:*/oauth/callback/*` for the Supabase redirect allowlist. The SDK persists sessions in local Java Preferences, not an OS keychain, and restores them at startup. Sign out to clear the saved session.
- The console reads the catalog, submissions, status history, profile and funding from Supabase. Lifetime download counts try the website API first and can fall back to an authenticated Supabase aggregate after a network I/O failure (excluding SSL errors), HTTP 5xx or a recognized hosting-disabled HTTP 402. Authentication and authorization failures do not trigger fallback.

## Developer workflows

- **Add app** submits an already-hosted Android APK and a supported public forge repository for review. It is not an APK uploader. Metadata editing requires an editable linked submission, refreshes Android listing text and images from GitHub Fastlane, and sends the edit back to review through the website API. Draft saves and deletion/archival also use the website API; submission writes do not fall back to direct database writes.
- The console has a separate analytics view backed by `luma_my_developer_analytics` for totals, breakdowns, daily series and funding clicks. The lifetime-count path does not use the website stats endpoint’s placeholder period counts.
- Profile and funding settings are editable through Supabase under the signed-in developer’s account. While signed in, the console polls for app status changes and can post desktop notifications when a previously seen status changes.

For the web workflow, see [Developer Dashboard](./developer-dashboard.md) and [App submissions](./submissions.md).

## Source review

**Reviewed 2026-11-25**, read-only, at [commit `b765c2d5d4075ce4c4459773421f7b74701fd9a9`](https://github.com/FreetimeMaker/Luma-Store-Dekstop/tree/b765c2d5d4075ce4c4459773421f7b74701fd9a9) against the 2026-11-20 baseline `27f5f156e5188d255b22ca4346c3f84fc12dad22`. The checkout was clean. The follow-up covered changes to the README, wrapper and packaging, session persistence, submission and metadata workflows, profile/funding settings, analytics and status notifications. No dependencies were resolved and no build, app run, installer check or live service request was performed.
