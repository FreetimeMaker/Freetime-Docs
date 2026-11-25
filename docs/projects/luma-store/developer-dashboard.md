# Developer Dashboard

The [Luma Store Website](https://github.com/FreetimeMaker/Luma-Store-Website) combines public Discover pages with the authenticated developer experience. This source URL was verified against its local Git remote. It is separate from the developer pages in [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd).

The [Linux Developer Console](./linux.md) is a separate Desktop JVM client for developer workflows. It uses the same Luma Supabase project and calls the website API to submit already-hosted Android APKs and resubmit metadata edits. Its Linux packaging does not add Linux app publishing support. The [Android developer area](./android.md) shows published-app analytics and submission details, but no longer edits or resubmits listings.

## Stack

- Next.js 16.4.6
- React 19.3.1
- TypeScript
- Tailwind CSS (`^4.3.5`)
- Supabase SSR (`^0.12.7`) / Supabase JavaScript client (`^2.119.2`)

## Sign-in and repository verification

The developer login supports GitHub, GitLab and Codeberg through Supabase, alongside Luma Store's first-party account flow where applicable.

Repository submissions support public repositories on:

- GitHub
- GitLab
- Codeberg

The submission backend verifies that the signed-in forge account owns the repository or has sufficient write access. Codeberg OAuth requests `openid profile email read:user read:repository write:repository`; repository verification checks ownership or push/admin permission.

Provider tokens are used for the matching forge only. A missing or expired provider authorization requires signing in with that provider again.

The public navigation's **Developers** link opens `/login?next=/dashboard`. Its **Help** menu provides FAQs on browsing, source tracking, developer sign-in, submissions, updates, funding and privacy. Codeberg guidance explicitly asks developers to sign in with Codeberg and grant repository access for ownership/Write-access verification. This is source/UI guidance, not a verified OAuth or production-permissions test.

## A practical publishing path

1. Open **Developers**, sign in, and create a draft before collecting all release data.
2. Prepare the public repository, Android package/version data and APK download. Repository verification is a server-side check, not merely a successful sign-in.
3. Load Android Fastlane metadata, check the imported listing and submit for review. The current dashboard loader is GitHub-only even though the final submission API verifies GitHub, GitLab and Codeberg repositories.
4. Read the saved review status/history. After a requested change, update and resubmit rather than assuming a local form edit updates the public catalog.

The [submission guide](./submissions.md) explains the metadata layout, accepted states and archive behavior. The form still contains legacy multi-platform data structures; the server's Android/APK filter is the effective publishing boundary.

## Dashboard capabilities

Developers can submit and maintain Android apps, inspect submission state/history, edit published metadata and manage developer-wide funding. The current submission handler retains only `platform: "Android"` / `packageType: "apk"` entries and rejects final submissions without an APK download. Older multi-platform UI/data fields do not establish current Linux/Windows publishing support.

The dashboard requires a Supabase session. Drafts can be saved before final repository verification; final submissions enter `Pending` review. See [App Submissions](./submissions.md) for validation and resubmission rules.

The dashboard also provides app/developer download analytics, profile/avatar management, verification status, review/status information and README download badges.

## Tracked app sources

The website also exposes a separate **Tracked sources** page for APKs distributed directly through GitHub, GitLab, Codeberg or a direct HTTPS download URL. It currently fixes the requested platform to Android and stores the source list in browser local storage. This does not require a developer submission.

When signed in with the matching forge, release checks use the user's provider token rather than anonymous forge API access. See [Sources](./sources.md).

## Developer funding

Funding is stored once on the developer profile and reused by the developer's public apps. Support includes a donation URL, Liberapay, OpenCollective and cryptocurrency/network wallet fields. Crypto funding uses one address per network, not a separate address per token; legacy `coin::network` values remain readable. The public `/support` page loads the Freetime Maker developer's funding configuration.

## Public Discover

Discover remains separate from developer authentication. Public app and developer pages can expose ratings, downloads, developer information and funding data without private dashboard controls.

## Local development

Configure `.env.local` from the repository's public `.env.example` first; see [Getting Started](./getting-started.md#getting-started-website-and-developer-dashboard). The following scripts are declared in the website package:

```bash
npm install
npm run dev
npm run type-check
npm run lint
npm run build
```
