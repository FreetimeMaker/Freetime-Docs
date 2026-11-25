# Installation & Build

## Install the app

The app README lists [GitHub Releases](https://github.com/FreetimeMaker/GeoWeather/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.geoweather/), [OpenAPK](https://www.openapk.net/de/geoweather/com.freetime.geoweather/), [GitHub Store](https://github-store.org/app?repo=FreetimeMaker/GeoWeather) and [Luma Store](https://luma.free-time.me/com.freetime.geoweather). Previously documented website links also include [Freetime F-Droid repository](../repositories/f-droid.md) and [Luma’s discover page](https://luma.free-time.me/discover/com.freetime.geoweather); the website was not re-reviewed here. These links do not verify downloads, channel versions or deployment success. The README now uses a repository-local Luma Store badge; its destination is unchanged. The Android package is `com.freetime.geoweather`; the local source requires API 26+.

## Build requirements

- Android SDK 37.2 for compilation; the app targets API 37
- JDK 21 for the Gradle daemon, as requested by `gradle/gradle-daemon-jvm.properties`
- The repository's Gradle 9.9.2 wrapper; the local catalog pins AGP 9.5.2 and Kotlin 2.4.21

Kotlin emits JVM 11 bytecode. This does not mean Gradle runs on JDK 11.

## Build from source

```bash
git clone https://github.com/FreetimeMaker/GeoWeather.git
cd GeoWeather
./gradlew :app:assembleDebug
```

On Windows, run `.\gradlew.bat :app:assembleDebug` from the cloned repository. The standard APK output is under `app/build/outputs/apk/debug/`.

The local build declares version 4.7.6 (code 95). Release availability in individual distribution channels may differ from the local checkout.

## Project layout

There is one Android `:app` module and no shared multiplatform module. Runtime dependencies include Freetime Core 4.0.1 (`com.github.FreetimeMaker.Freetime-Core` artifacts via JitPack), Ktor, Room/bundled SQLite, Coil, WorkManager, Glance and osmdroid.

## Build and integration targets

| Goal | Target / boundary |
| --- | --- |
| Debug APK | `./gradlew :app:assembleDebug`; install/launch checkpoints in [Getting Started](./getting-started.md) |
| Local unit tests | `./gradlew :app:testDebugUnitTest`; source includes planner, rain-policy and notification-configuration tests |
| Weather integration | Ktor/Open-Meteo data layer, not the optional subscription backend |
| UI/background checks | Prepared API 26+ device; verify permissions, widget locations and freshness independently |

Targets are documented from source, not executed in this review. Release signing/distribution is outside the debug setup goal.

## Release CI and F-Droid compatibility

The [release workflow](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/.github/workflows/build_and_co.yml) checks 16 KB APK alignment without rewriting the APK, then signs it while preserving Gradle’s ZIP layout. Before publishing a new GitHub release, it runs source scanning and an unsigned build with binary scanning in the official F-Droid buildserver container. The check uses a clean clone of the exact commit and the signed reference APK, not the signing keystore.

The [container script](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/.github/scripts/fdroid-build.sh) copies the release signature onto the F-Droid-built APK and verifies the reconstructed APK with `apksigner`. Failures block publication; the `fdroid-build-results` artifact can contain logs, the image digest, the generated recipe and APK comparison reports. This tests signature reproduction against the workflow’s reference APK, not against an already-published F-Droid package. It does not verify production F-Droid acceptance or replace the separately maintained `fdroiddata` recipe. Do not run the container script directly on your host.
