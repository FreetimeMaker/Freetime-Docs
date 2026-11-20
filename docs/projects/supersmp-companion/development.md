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

The local `SuperSMPTheme` uses Material 3 `MaterialTheme`, app typography/fallback palettes and `SuperSMPLiquidGlassRoot`; the `ui/glass` helpers are still present. Automatic mode checks the local hour every minute and uses dark before 07:00 or from 19:00. On Android 12+ the implementation chooses dynamic palettes directly; the `dynamicColor` and `oledBlack` parameters do not currently alter that selection, so do not promise those switches affect rendering.

Core, Design, Browser, Donations and FreetimeWarn use **3.1.0**, under `com.freetime`, from [`https://repo.free-time.me/maven/`](../repositories/maven-gradle.md). KSP is pinned to **2.3.13**. This app has not adopted Core 4.0.1 or Notifications.

## Data and remote content

`ServerStatusRepository` retrieves JSON from `https://api.mcsrvstat.us/3/<server>` using Ktor/OkHttp and Kotlin serialization. Room stores coordinate records through `CoordinateDatabase`, `CoordinateDao` and `CoordinatesViewModel`.

Shop and map screens embed remote websites in Android WebViews. Do not assume a WebView loading failure is a Ktor API failure.

## Background integration boundary

`SuperSMPApplication.onCreate()` only calls its superclass. There is no Notifications module dependency or release-feed setup in the inspected checkout. WorkManager remains a dependency, not evidence of background status refresh. A future notification integration needs explicit dependency, lifecycle, permission/channel and delivery testing.

## Status API example

This is a suspend helper for app code, using the real repository API. The host supplies the server address and owns coroutine/UI state; it must distinguish a decoded offline response from a transport or parsing exception.

```kotlin
import com.freetime.ssmpc.data.status.McSrvStatResponse
import com.freetime.ssmpc.data.status.ServerStatusRepository
import kotlinx.coroutines.CancellationException

suspend fun readStatus(
    repository: ServerStatusRepository,
    serverAddress: String,
): Result<McSrvStatResponse> = try {
    Result.success(repository.getServerStatus(serverAddress))
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Exception) {
    Result.failure(error)
}
```

Unlike this helper, the current `ServerStatusViewModel.refreshStatus` catches exceptions without exposing detailed error state. Inspect the failure at the repository boundary when debugging. Do not infer that an absent status means the Minecraft server is offline.

[Repository source](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/bef24070b407296991498e79ac15f6406b621680/app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt) · [Theme source](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/bef24070b407296991498e79ac15f6406b621680/app/src/main/java/com/freetime/ssmpc/ui/theme/Theme.kt)

## Release optimization

Release builds enable code minification and resource shrinking with Android's optimized ProGuard defaults and `app/proguard-rules.pro`.

## Build

With SDK 37 and the JDK 21 daemon toolchain available:

```bash
./gradlew :app:assembleDebug
```

The application bytecode target remains 17; it is distinct from the JDK used to run Gradle.

`./gradlew :app:testDebugUnitTest` is the local unit-test target. Device tests use `./gradlew :app:connectedDebugAndroidTest` with a prepared emulator/device. Neither target was executed here; remote status/shop/map need separate runtime checks. Use [Getting Started](./getting-started.md) for APK installation and a deterministic local-data goal.
