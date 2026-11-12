# Getting Started

## Prerequisites

| Scope | Prerequisite |
| --- | --- |
| Required | For the quick start: an already installed Android client on Android API 24+, network access and a reachable, configured public catalog. |
| Optional | For Android source builds: Git and the repository-compatible Gradle JDK/Android SDK (compile SDK 37). For website development: Node.js/npm, a browser and configured public Supabase values. |
| Publishing only | A developer Supabase session, a supported public forge repository with verified ownership/write access, Android APK data and the dashboard/backend schema and policies. Deployment/email/webhook operations also need their corresponding server-only credentials. |

## First success in five minutes

**Goal: browse the Android catalog without a developer account.** This estimate assumes the client is already installed, any APK downloads are complete and the public service is available. Installing SDKs, building from source, creating accounts and publishing an app are not five-minute steps.

1. Obtain the Android client using the options in [Android](./android.md), if it is not installed yet.
2. Open the client and browse the Luma catalog. It is enabled by default; built-in F-Droid/community sources are not.
3. Open an available catalog entry. Expect an app detail screen for that entry; the actual entries depend on the live catalog. Public browsing does not require developer sign-in. An empty catalog is not proof of a working end-to-end integration.

If the list is empty or details fail, use [Troubleshooting](./troubleshooting.md). For source setup instead, continue below; these build instructions are not a guarantee of a five-minute build.

## Android client

Source: [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android).

```bash
git clone https://github.com/FreetimeMaker/Luma-Store-Android.git
cd Luma-Store-Android
./gradlew assembleDebug
```

The inspected app is **4.4.1**, targets/compiles SDK 37 and supports Android API 24 or later. Install the SDK/JDK required by the repository's Gradle configuration before building.

## Website and Developer Dashboard

Source: [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website).

```bash
git clone https://github.com/FreetimeMaker/Luma-Store-Website.git
cd Luma-Store-Website
cp .env.example .env.local
npm install
npm run dev
```

The website uses Next.js **16.4.5**, React **19.3.1**, TypeScript and Tailwind CSS 4. Configure:

| Variable                               | Purpose                               |
| -------------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Public Supabase project URL           |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public client key                     |
| `NEXT_PUBLIC_SITE_URL`                 | Site URL configuration                |
| `SUPABASE_SERVICE_ROLE_KEY`            | Server-side privileged API operations |
| `RESEND_API_KEY`, `EMAIL_FROM`         | Server-side email notifications       |
| `LUMA_STATUS_WEBHOOK_SECRET`           | Status webhook authentication         |

Use the same intended Supabase project across clients and dashboard. Public discovery and developer operations rely on the corresponding schema, policies and RPCs; installing dependencies does not provision those automatically.

Never place privileged values in `NEXT_PUBLIC_*` variables.

## Public store API

The [All API backend](https://github.com/FreetimeMaker/All-API-Node) mounts:

```text
GET /v2/lumastore/apps?platform=Android
GET /v2/lumastore/apps/:id
GET /v2/lumastore/developers/:id
```

App details use the catalog's store app ID. The current normalized catalog is Android-only and has no `/package-formats` route. The separate [All API frontend](https://github.com/FreetimeMaker/All-API-FrontEnd) implements `/api/luma/apps` as a manually reviewed submission feed; do not assume the two responses are interchangeable.

The standalone website also uses `https://api.free-time.me/lumastore` for API calls. That unversioned alias is not mounted in the inspected Express entry point and depends on deployment configuration; use the explicit versioned backend paths for direct integration.

## Developer access

The website dashboard's `AuthGate` requires a Supabase session and redirects unauthenticated visitors to login. It does not enforce an invite check in that gate. Final submissions additionally verify a supported public repository and require Android APK data. Public Discover browsing does not require developer sign-in.

## Next

Read [Android](./android.md), [Developer Dashboard](./developer-dashboard.md), [Submissions](./submissions.md), [Sources](./sources.md) and [Custom Clients](./custom-clients.md).
