# Development

## Android configuration

| Setting                       | Reviewed source value   |
| ----------------------------- | -------------------- |
| Application ID / namespace    | `com.freetime.ssmpc` |
| Version                       | `2.0.1` (code `23`)  |
| Minimum SDK                   | `26`                 |
| Compile / target SDK          | `37.2` / `37`        |
| Gradle daemon JDK criteria    | `21`                 |
| Java / Kotlin bytecode target | `17`                 |
| Android Gradle Plugin         | `9.5.2`              |
| Kotlin                        | `2.4.21`             |
| KSP                            | `2.3.14`             |
| Gradle wrapper                 | `9.9.2`              |
| Compose BOM                    | `2026.11.01`         |

Use the build configuration rather than the README's older API-24 badge when determining device support.

## UI and navigation

`MainActivity` hosts `SuperSMPTheme`, the FreetimeWarn notice and a Navigation Compose graph. Routes cover home, server commands, coordinates, links, shop, map and settings.

`SuperSMPTheme` wraps Design’s Expressive `AppTheme` and delegates automatic dark mode to `rememberDarkTheme(ThemeMode.AUTO_TIME)`. It forwards `dynamicColor`; when dark mode and `oledBlack` are both enabled, it overrides the background and surface with black. The app-owned glass helpers were removed. The bottom bar uses Material 3 `NavigationBar` and icon-only `NavigationBarItem`s with accessible descriptions. FreetimeWarn gets its app name from `FreetimeCore.appName`.

Core, Design, Browser, Donations, FreetimeWarn and Notifications use `com.github.FreetimeMaker.Freetime-Core:<module>:4.0.1` from `https://jitpack.io/`, not the previous `com.freetime` repository coordinates. These are source declarations, not verified artifact resolution.

## Data and remote content

`ServerStatusRepository` retrieves JSON from `https://api.mcsrvstat.us/3/<server>` using Ktor/OkHttp and Kotlin serialization. Room stores coordinate records through `CoordinateDatabase`, `CoordinateDao` and `CoordinatesViewModel`.

Shop and map screens embed remote websites in Android WebViews. Do not assume a WebView loading failure is a Ktor API failure.

## Release notifications

[`SuperSMPApplication.onCreate()`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/app/src/main/java/com/freetime/ssmpc/SuperSMPApplication.kt) initializes Freetime Notifications asynchronously with the app’s GitHub Releases and F-Droid feeds. It configures a 360-minute check interval, no notifications on the first check, and a cap of five notifications per check. Update and changelog channels are configured separately; developer messages are disabled. The configured interval is not a delivery guarantee, and this integration does not poll Minecraft server status.

The manifest declares `POST_NOTIFICATIONS` and `ACCESS_NETWORK_STATE`. Settings hosts [`NotificationPermissionHelper`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/app/src/main/java/com/freetime/ssmpc/NotificationPermissionHelper.kt), which does not prompt on entry. **Enable notifications** requests a check if permission is already available, otherwise it can launch the first Android 13+ permission request. A grant triggers a check if permission is available; later attempts without permission open Android’s app notification settings. The settings shortcut also provides access to channel controls.

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

[Repository source](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt) · [Theme source](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/app/src/main/java/com/freetime/ssmpc/ui/theme/Theme.kt)

## Release optimization

Release builds enable code minification and resource shrinking with Android's optimized ProGuard defaults and `app/proguard-rules.pro`.

## Build

With SDK 37.2 and the JDK 21 daemon toolchain available:

```bash
./gradlew :app:assembleDebug
```

The application bytecode target remains 17; it is distinct from the JDK used to run Gradle.

`./gradlew :app:testDebugUnitTest` is the local unit-test target. Device tests use `./gradlew :app:connectedDebugAndroidTest` with a prepared emulator/device. Neither target was executed here; remote status/shop/map need separate runtime checks. Use [Getting Started](./getting-started.md) for APK installation and a deterministic local-data goal.
