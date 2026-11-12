# Getting Started

Luma Store is split into separate clients and backend services.

## Android client

```bash
git clone https://github.com/FreetimeMaker/Luma-Store-Android.git
cd Luma-Store-Android
./gradlew assembleDebug
```

The current Android project targets SDK 37, has minimum SDK 24 and uses Kotlin/Compose.

## Website and Developer Dashboard

```bash
git clone https://github.com/FreetimeMaker/Luma-Store-Website.git
cd Luma-Store-Website
npm install
npm run dev
```

The web project currently uses Next.js 16.3, React 19, TypeScript, Tailwind CSS 4 and Supabase.

Configure at least the public Supabase URL and publishable key for normal client-side Supabase access. Server-only operations must keep privileged credentials outside `NEXT_PUBLIC_*`.

## Public store API

For new custom clients, prefer the All API v2 Luma Store routes:

```text
/v2/lumastore/apps
/v2/lumastore/apps/:id
/v2/lumastore/package-formats
```

The apps endpoints support platform-aware normalized metadata. Linux clients can additionally filter by package format.

## Developer access

The Developer Dashboard signs in through the configured Supabase providers and can require a valid developer invite before dashboard access. Ordinary public Discover browsing does not require a developer account.

## Next

Read [Android](/projects/luma-store/android), [Developer Dashboard](/projects/luma-store/developer-dashboard), [Sources](/projects/luma-store/sources) and [Custom Clients](/projects/luma-store/custom-clients).
