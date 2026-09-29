# Developer Dashboard

The Luma Store Website combines public Discover pages with the authenticated developer experience.

## Stack

- Next.js 16.3.3
- React 19.2.8
- TypeScript
- Tailwind CSS 4
- Supabase SSR / Supabase JavaScript client

## Sign-in and repository verification

The developer login supports GitHub, GitLab and Codeberg through Supabase, alongside Luma Store's first-party account flow where applicable.

Repository submissions support public repositories on:

- GitHub
- GitLab
- Codeberg

The submission backend verifies that the signed-in forge account owns the repository or has sufficient write access. Codeberg OAuth requests `openid profile email read:user read:repository write:repository`; repository verification checks ownership or push/admin permission.

Provider tokens are used for the matching forge only. A missing or expired provider authorization requires signing in with that provider again.

## Dashboard capabilities

Developers can submit and maintain apps for Android, Windows and Linux, inspect submission state/history, edit published metadata and manage developer-wide funding.

The dashboard also provides app/developer download analytics, profile/avatar management, verification status, review/status information and README download badges.

## Tracked app sources

The website also exposes a separate **Tracked sources** page for apps distributed directly through GitHub, GitLab, Codeberg or a direct HTTPS download URL. This does not require a developer submission.

When signed in with the matching forge, release checks use the user's provider token rather than anonymous forge API access. See [Sources](/projects/luma-store/sources).

## Developer funding

Funding is stored once on the developer profile and reused by the developer's public apps. Current support includes general donation links and supported cryptocurrency/network wallet fields.

## Public Discover

Discover remains separate from developer authentication. Public app and developer pages can expose ratings, downloads, developer information and funding data without private dashboard controls.

## Local development

```bash
npm install
npm run dev
npm run type-check
npm run lint
npm run build
```
