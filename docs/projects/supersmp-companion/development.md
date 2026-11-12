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

Material 3 provides the main controls. The app includes its own `ui/glass` helpers; it does not declare a separate Liquid library dependency. The shared Core, Design, Browser, Donations and FreetimeWarn modules are pinned to Freetime Core 3.0.0 through JitPack.

## Data and remote content

`ServerStatusRepository` retrieves JSON from `https://api.mcsrvstat.us/3/<server>` using Ktor/OkHttp and Kotlin serialization. Room stores coordinate records through `CoordinateDatabase`, `CoordinateDao` and `CoordinatesViewModel`.

Shop and map screens embed remote websites in Android WebViews. Do not assume a WebView loading failure is a Ktor API failure.

## Background dependencies

WorkManager is included in the build. Do not infer an active periodic task or guaranteed background refresh from the dependency declaration alone.

## Release optimization

Release builds enable code minification and resource shrinking with Android's optimized ProGuard defaults and `app/proguard-rules.pro`.

## Build

With SDK 37 and the JDK 21 daemon toolchain available:

```bash
./gradlew :app:assembleDebug
```

The application bytecode target remains 17; it is distinct from the JDK used to run Gradle.
