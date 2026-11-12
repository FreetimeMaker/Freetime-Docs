# Android client

The Luma Store Android application is the native mobile store client.

## Platform

- Application ID: `com.freetime.lumastore`
- Minimum SDK: 24
- Kotlin: 2.4.20
- Android Gradle Plugin: 9.4.1
- Compose BOM: 2026.09.00
- Freetime Core: **3.0.0**

## UI

The current client uses Material 3 Expressive and Material You through Freetime Core 3.0.0. Liquid Glass is used for the new floating bottom navigation rather than generic content surfaces.

## Discover and app details

Discover supports trending, recommended, recently viewed, new and updated collections. Users can open complete collection views, use advanced filtering and sorting, and see ratings and download metrics.

App details include developer information, ratings, downloads, update information and developer funding methods.

## Developer area

The Android developer experience includes:

- public developer profiles, avatars and verified status
- profile and funding management
- developer donation links and supported cryptocurrency networks
- app-specific analytics for today, month, year and total downloads
- profile image selection and Supabase Storage upload
- developer notifications

Authentication and developer metadata use Supabase.

## Sources and updates

The client combines Luma Store data with F-Droid-compatible/community repositories. It supports custom sources, search, installed-app management and update workflows. Background work is handled with WorkManager.

## Build

```bash
./gradlew assembleDebug
```

Release builds should use the repository's configured CI flow. The release workflow also contains distribution automation for the project's configured stores.
