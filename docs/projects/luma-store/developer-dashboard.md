# Developer Dashboard

The Luma Store web project is a standalone developer dashboard for application submissions and management.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase SSR
- Supabase JavaScript client

## Local development

```bash
npm install
npm run dev
```

For production validation:

```bash
npm run type-check
npm run lint
npm run build
```

## Supabase

The dashboard requires the public Supabase URL and publishable key. Service-role credentials must not be exposed through `NEXT_PUBLIC_*` variables.

## Responsibilities

The dashboard is the developer-facing part of Luma Store: submissions, metadata, update resubmission, verification and submission status belong here rather than in the public store browsing UI.
