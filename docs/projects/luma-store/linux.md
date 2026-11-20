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
| Build tools | Gradle wrapper **9.9.1**, Azul **JDK 21** Gradle daemon criteria, Kotlin **2.4.21**, Compose Multiplatform **1.12.2** |
| Package | `com.freetime.lumadevs`, package version **1.0.0** |
| Distribution formats | Linux `Deb` and `Rpm`; Windows `Exe` and `Msi`; no macOS package format declared |

No Android SDK or Android target is declared in this checkout. The daemon JDK setting is not a minimum runtime or distribution support guarantee. The [repository README](https://github.com/FreetimeMaker/Luma-Store-Dekstop/blob/27f5f156e5188d255b22ca4346c3f84fc12dad22/README.md) documents running from source with `./gradlew :desktopApp:run`; this is a development command, not an installer or a tested result.

## Accounts and data

- Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the shell or IDE run environment. The app also accepts the website's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as fallbacks. It does not automatically load `.env.local`. Use the intended Luma project and never give the desktop client a service-role key.
- GitHub, GitLab and Codeberg sign-in use a browser and a loopback callback. The repository README documents `http://127.0.0.1:*/oauth/callback/*` for the Supabase redirect allowlist. Sessions are kept in memory.
- The console reads the catalog, submissions, status history, profile and funding from Supabase. Draft saves and deletion/archival call the standalone website's submission API; they do not fall back to direct database writes. Lifetime download stats can fall back to an authenticated Supabase aggregate after an outage, but not after an authentication or authorization failure.

For the web workflow, see [Developer Dashboard](./developer-dashboard.md) and [App submissions](./submissions.md).

## Source review

**Reviewed 2026-11-20**, read-only, at [commit `27f5f156e5188d255b22ca4346c3f84fc12dad22`](https://github.com/FreetimeMaker/Luma-Store-Dekstop/tree/27f5f156e5188d255b22ca4346c3f84fc12dad22). The checkout was clean. Scope: Git remote, README, Gradle modules and targets, JVM entry point, Supabase configuration, sign-in and data paths. No dependencies were resolved and no build, app run, installer check or live service request was performed.
