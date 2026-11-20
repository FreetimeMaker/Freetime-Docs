# Installation & Build

## Install the app

The app README lists [GitHub Releases](https://github.com/FreetimeMaker/GeoWeather/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.geoweather/), [OpenAPK](https://www.openapk.net/de/geoweather/com.freetime.geoweather/), [GitHub Store](https://github-store.org/app?repo=FreetimeMaker/GeoWeather) and [Luma Store](https://luma.free-time.me/com.freetime.geoweather). Previously documented website links also include [Freetime F-Droid repository](../repositories/f-droid.md) and [Luma’s discover page](https://luma.free-time.me/discover/com.freetime.geoweather); the website was not re-reviewed here. These links do not verify downloads, channel versions or deployment success. The Android package is `com.freetime.geoweather`; the local source requires API 26+.

## Build requirements

- Android SDK 37 for compilation and targeting
- JDK 21 for the Gradle daemon, as requested by `gradle/gradle-daemon-jvm.properties`
- The repository's Gradle wrapper; the local catalog pins AGP 9.5.1 and Kotlin 2.4.21

Kotlin emits JVM 11 bytecode. This does not mean Gradle runs on JDK 11.

## Build from source

```bash
git clone https://github.com/FreetimeMaker/GeoWeather.git
cd GeoWeather
./gradlew :app:assembleDebug
```

On Windows, run `.\gradlew.bat :app:assembleDebug` from the cloned repository. The standard APK output is under `app/build/outputs/apk/debug/`.

The local build declares version 4.7.3 (code 92). Release availability in individual distribution channels may differ from the local checkout.

## Project layout

There is one Android `:app` module and no shared multiplatform module. Runtime dependencies include Freetime Core 3.2.0 (`com.freetime` artifacts via [`https://repo.free-time.me/maven/`](../repositories/maven-gradle.md)), Ktor, Room/bundled SQLite, Coil, WorkManager, Glance and osmdroid.

## Build and integration targets

| Goal | Target / boundary |
| --- | --- |
| Debug APK | `./gradlew :app:assembleDebug`; install/launch checkpoints in [Getting Started](./getting-started.md) |
| Local unit tests | `./gradlew :app:testDebugUnitTest`; source includes planner, rain-policy and notification-configuration tests |
| Weather integration | Ktor/Open-Meteo data layer, not the optional subscription backend |
| UI/background checks | Prepared API 26+ device; verify permissions, widget locations and freshness independently |

Targets are documented from source, not executed in this review. Release signing/distribution is outside the debug setup goal.
