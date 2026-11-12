# Android client

The Luma Store Android application is the native mobile store client. The inspected app version is **4.4.1** (version code **31**).

Source code: [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android), verified against the local Git remote.

## Platform

- Application ID: `com.freetime.lumastore`
- Minimum SDK: 24
- Compile/target SDK: 37
- Kotlin: 2.4.21
- Android Gradle Plugin: 9.5.1
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

The default enabled catalog is `https://api.free-time.me/v2/lumastore/apps?platform=android`. Built-in Freetime F-Droid, F-Droid and IzzyOnDroid sources are optional and disabled by default. The repository layer also supports custom sources, search, installed-app management and update workflows.

APK installation is handled by the platform integration in `install/ApkInstaller.kt`. Developer notification synchronization uses Android `JobService` (`NotificationSyncJobService`), not WorkManager. A saved developer session is required to load dashboard notifications.

## Build

```bash
./gradlew assembleDebug
```

The build requires a compatible Android SDK/JDK and the repository's Gradle configuration. No Android build or device installation was executed for this documentation update; the command above is a build instruction, not a validation result.
