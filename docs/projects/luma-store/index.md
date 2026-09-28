# Luma Store

Luma Store is an open-source app-store ecosystem with Android and Linux clients, a public web experience, developer tooling and shared store metadata.

## Components

| Component | Role |
| --- | --- |
| Luma Store Android | Native Kotlin/Compose store client |
| Luma Store Website | Public discovery and developer dashboard |
| Luma Store Linux | Native Python/GTK 3 Linux client |
| Supabase | Authentication, profiles, submissions, store metadata, analytics and storage |

## Android

The Android client now uses **Freetime Core 3.0.0**, Material 3 Expressive and Material You, including the new floating Liquid Glass bottom navigation.

Discover includes trending, recommended, recently viewed, new and updated collections, full collection views, advanced filters and sorting, ratings and download metrics. App details include richer developer information, ratings, downloads and update information.

The developer area includes public developer profiles, avatars and verified status, profile/funding management, developer donation methods, app-specific analytics and developer notifications. Supabase Storage is used for developer profile images.

## Website and Developer Dashboard

The web dashboard supports Fastlane metadata import, current F-Droid categories, app update resubmission, developer verification and submission status/timeline handling. The current web stack uses Next.js 16.3.3, React 19.2.8 and Supabase.

## Linux

The Linux client is a native GTK 3 application with DEB and RPM support. Its developer dashboard is native rather than a WebView and uses Supabase OAuth with PKCE.

It supports drafts, Android/Windows/Linux submissions and updates, multi-platform artifacts, localized metadata, status timelines, security information, version history, review comments, developer notifications, analytics, profile/funding editing and Fastlane metadata assistance.

Packages can be installed through the Freetime Packagecloud-style APT/YUM repositories documented by the Linux project.

## Authentication and publishing

Developer functionality uses Supabase authentication. Final submissions and metadata updates that require repository ownership verification use the GitHub provider token. Store metadata, download statistics, developer profiles and submission state are shared across the clients and dashboard.

## Continue

- [Getting Started](/projects/luma-store/getting-started)
- [Android](/projects/luma-store/android)
- [Developer Dashboard](/projects/luma-store/developer-dashboard)
- [Linux](/projects/luma-store/linux)
- [Sources](/projects/luma-store/sources)
- [Building Custom Clients](/projects/luma-store/custom-clients)
