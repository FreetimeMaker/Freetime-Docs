# Android client

The Luma Store Android application is the native mobile store client. The inspected source declares **4.4.3** (version code **33**). See the [F-Droid repository guide](../repositories/f-droid.md#f-droid-build-metadata-and-index-status) for the separately checked package index.

Source code: [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android), verified against the local Git remote.

## Platform

- Application ID: `com.freetime.lumastore`
- Minimum SDK: 24
- Compile SDK: 37, minor API level 2; target SDK: 37
- Kotlin: 2.4.21
- Android Gradle Plugin: 9.5.2
- Compose BOM: 2026.11.01
- Freetime Core: **4.0.2**

## UI

The Compose client depends on Freetime Core/Design 4.0.2. Source configuration is not a visual validation of the running interface; no device or emulator was used in this review.

## Discover and app details

Discover supports trending, recommended, recently viewed, new and updated collections. Users can open complete collection views, use advanced filtering and sorting, and see ratings and download metrics.

App details include developer information, ratings, downloads, update information and developer funding methods.

## Developer area

The Android developer experience includes:

- public developer profiles, avatars and verified status
- profile and funding management
- developer donation links and supported cryptocurrency networks
- per-app download analytics for today, this month, this year and lifetime, where data is available
- profile image selection and Supabase Storage upload
- developer notifications

Authentication and developer metadata use Supabase. **Download analytics for published apps** lists the signed-in developer’s non-archived store apps, including apps without a linked submission. Counts come from `get_my_luma_download_stats`. Zero is a valid count; missing periods are not shown as zero. Dashboard totals are shown only when every listed app has a value for that metric. The UI distinguishes an empty published-app list from a load failure and offers retry on failure.

**Submissions** is separate. Android still displays submission details, review information, scans and available artifact metadata, but no longer offers editing/resubmission, artifact addition/removal or platform metadata editing. The removal action remains for Draft, Rejected and Changes Requested submissions; Approved entries offer archival. Use the [website dashboard](./developer-dashboard.md) to edit and resubmit.

## Sources and updates

The default enabled catalog is `https://api.free-time.me/v2/lumastore/apps?platform=android`. Built-in Freetime F-Droid, F-Droid and IzzyOnDroid sources are optional and disabled by default. The repository layer also supports custom sources, search, installed-app management and update workflows.

APK installation is handled by the platform integration in `install/ApkInstaller.kt`. Developer notification synchronization uses Android `JobService` (`NotificationSyncJobService`), not WorkManager. A saved developer session is required to load dashboard notifications.

Eligible operations can fall back to Supabase during an API outage. Android 4.4.3 recognizes HTTP 402 as disabled hosting when `X-Vercel-Error` is `DEPLOYMENT_DISABLED` or the body contains that marker on its own line. An ordinary 402 or an authorization failure does not qualify; see [Troubleshooting](./troubleshooting.md).

## Build dependencies

The wrapper selects Gradle **9.9.2**, and daemon criteria request JDK **21**. The Kotlin serialization library is **1.13.0**. `settings.gradle.kts` configures JitPack for the `com.github.FreetimeMaker.Freetime-Core` group, replacing the Freetime Maven repository in this checkout. The app uses `Core`, `Design` and `FreetimeWarn` from that group at **4.0.2**; `Notifications` is declared in the catalog but is not a direct app dependency. A component metadata rule points affected 4.0.2 Android variants at their `-android.aar` files. Dependency resolution/publication was not tested. JDK 21 is the daemon requirement; the app's Java source/target compatibility is separately set to Java 11.

## Release CI

The release workflow uses Android Build Tools 35.0.0 to align the APK for 16 KiB page boundaries before signing, then verifies the signature and alignment. A separate step scans and attempts an unsigned test build of the checked-out commit in the official F-Droid buildserver image, with pinned `fdroidserver` tooling and no signing keystore in the container. This is a CI check, not proof of reproducibility against a published APK or of F-Droid acceptance.

## Build

```bash
./gradlew assembleDebug
```

The build requires a compatible Android SDK/JDK and the repository's Gradle configuration. No Android build or device installation was executed for this documentation update; the command above is a build instruction, not a validation result.
