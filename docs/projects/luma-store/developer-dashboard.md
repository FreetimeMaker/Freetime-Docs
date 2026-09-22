# Developer Dashboard

The Luma Store Website combines public Discover pages with the authenticated developer experience.

## Stack

- Next.js 16.3
- React 19.2
- TypeScript
- Tailwind CSS 4
- Supabase SSR / Supabase JavaScript client

## Sign-in and access

The developer login currently offers GitHub or GitLab through Supabase. Dashboard access can additionally require a developer invite code.

## Dashboard capabilities

Developers can submit and maintain apps for Android, Windows and Linux, inspect submission state/history, edit published metadata and manage developer-wide funding.

The dashboard also displays Luma-hosted download statistics. Download totals are aggregated across versions and can be represented as README badges:

- per-app all-time download badge;
- per-developer all-time badge across published apps.

## Developer funding

Funding is stored once for the developer profile instead of being duplicated per app. Current fields include:

- donation URL;
- Liberapay;
- OpenCollective;
- Bitcoin;
- Litecoin.

Public app pages can reuse these methods for every app belonging to that developer.

## App metadata

Published app management includes repository/license information, categories, anti-features, platform/release metadata and the latest published update. Funding is intentionally linked back to the developer profile.

## Public Discover

Discover is separate from developer authentication. App pages can show public ratings and all-time download information without requiring the visitor to be a developer.

Developer profile pages list the developer's public apps without embedding the private dashboard controls.

## Local development

```bash
npm install
npm run dev
```

For validation:

```bash
npm run type-check
npm run lint
npm run build
```
