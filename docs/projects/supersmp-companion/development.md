# Development

## Android configuration

| Setting                       | Local source value   |
| ----------------------------- | -------------------- |
| Application ID / namespace    | `com.freetime.ssmpc` |
| Version                       | `2.0.1` (code `23`)  |
| Minimum SDK                   | `26`                 |
| Compile / target SDK          | `37`                 |
| Gradle daemon JDK criteria    | `21`                 |
| Java / Kotlin bytecode target | `17`                 |
| Android Gradle Plugin         | `9.5.1`              |
| Kotlin                        | `2.4.21`             |

Use the build configuration rather than the README's older API-24 badge when determining device support.

## UI and navigation

`MainActivity` hosts `SuperSMPTheme`, the FreetimeWarn notice and a Navigation Compose graph. Routes cover home, server commands, coordinates, links, shop, map and settings.

The app now delegates expressive theming to Freetime Design's `AppTheme`, `rememberDarkTheme(ThemeMode.AUTO_TIME)` and `FloatingBottomNavigationGlassRoot`. Local `ui/glass` helpers were removed. The wrapper selects light/dark/OLED modes and retains app-specific fallback colors and typography; dynamic color is passed through to `AppTheme`.

Core, Design, Browser, Donations, FreetimeWarn and the new Notifications module use **3.2.0**, under `com.freetime`, from `https://repo.free-time.me/maven/` instead of JitPack. The catalog also updates KSP to **2.3.14**.

## Data and remote content

`ServerStatusRepository` retrieves JSON from `https://api.mcsrvstat.us/3/<server>` using Ktor/OkHttp and Kotlin serialization. Room stores coordinate records through `CoordinateDatabase`, `CoordinateDao` and `CoordinatesViewModel`.

Shop and map screens embed remote websites in Android WebViews. Do not assume a WebView loading failure is a Ktor API failure.

## Release notifications

`SuperSMPApplication` initializes Freetime Notifications in an application coroutine scope with GitHub releases for `FreetimeMaker/SuperSMP-Companion-App` and the F-Droid feed for the app package. It configures a 360-minute check interval, no notification on the first check, and at most five notifications per check. Update and changelog categories are configured; developer messages are disabled. Initialization errors are logged under `SuperSMPNotifications` without deliberately crashing startup.

Settings includes `NotificationPermissionHelper`. Entering the screen does not itself launch a permission prompt. The enable action requests `POST_NOTIFICATIONS` on Android 13+ on the first recorded attempt; later denied attempts route to Android notification settings. If permission is already available, it requests a check. A separate settings action remains available for disabled permissions/channels.

These are configured library calls, not verified delivery or a guaranteed six-hour schedule. WorkManager remains a dependency; do not infer server-status background refresh from it. No device notification test was performed in this review.

## Release optimization

Release builds enable code minification and resource shrinking with Android's optimized ProGuard defaults and `app/proguard-rules.pro`.

## Build

With SDK 37 and the JDK 21 daemon toolchain available:

```bash
./gradlew :app:assembleDebug
```

The application bytecode target remains 17; it is distinct from the JDK used to run Gradle.
