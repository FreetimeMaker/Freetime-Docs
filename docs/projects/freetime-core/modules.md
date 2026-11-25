# Modules

Freetime Core **4.0.2** provides six selectable Android/desktop JVM libraries. Use case-sensitive `com.freetime:<Module>:4.0.2` coordinates only after complete publication is verified; for now prefer the local sample. [Getting Started](./getting-started.md) covers repositories and KMP metadata.

| Module | Android | Desktop JVM |
| --- | --- | --- |
| `Core` | SharedPreferences and Android helpers | Java Preferences; no Context helper |
| `Design` | Shared Compose UI; Material You on API 31+ | Shared UI with regular color schemes |
| `Browser` | WebView and Context-bound intents | External browser action, not embedded HTML |
| `Donations` | Clipboard and wallet intents | AWT clipboard/registered URI handlers |
| `FreetimeWarn` | Shared UI; SharedPreferences | Shared UI; Java Preferences |
| `Notifications` | WorkManager, DataStore, native channels | In-process polling, atomic JSON, AWT tray |

## Core

Shared models, result types, SDK metadata, Android helpers and persisted preferences. `FreetimePreferences` stores theme/browser modes, automatic light/dark hours, accessibility flags and the floating-navigation glass setting in SharedPreferences. Applications own the UI state that consumes those values.

## Design

The UI foundation is **Material 3 Expressive + Material You**, not a separate Freetime component framework. Use AndroidX Material 3 components directly.

`AppTheme` supplies expressive motion, dynamic colors on Android 12+, regular schemes on older devices and five theme modes. `FloatingBottomNavigationGlassRoot` and `FloatingBottomNavigationBar` provide the dedicated navigation-only glass treatment, with a Material fallback when disabled.

Originally introduced in 3.1.0, the current Design module includes classic Material 3 and Expressive templates in `com.freetime.design.templates.material3` and `com.freetime.design.templates.expressive`. They separate colors, typography, shapes and theme composition; optional Freetime adapters disable navigation glass. Material You is opt-in in the templates.

See [Design & Liquid Glass](./design.md).

## Browser

URL routing and reusable browser UI. Open externally with:

```kotlin
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.*
import com.freetime.browser.BrowserOptions
import com.freetime.browser.rememberBrowserLauncher

// Inside a composable, on either supported platform:
val browser = rememberBrowserLauncher()
var error by remember { mutableStateOf<String?>(null) }
TextButton(onClick = {
    browser.open(
        "https://example.org",
        BrowserOptions(allowedHosts = setOf("example.org")),
    ).onFailure { error = it.message ?: "Could not open browser" }
}) { Text("Open website") }
error?.let { Text(it) }
```

`BrowserMode.IN_APP` accepts a host callback returning whether it handled the URL; otherwise the permitted external fallback applies. Android also has `FreetimeBrowser.openExternal(context, url)`. The Context-free direct external call intentionally fails on Android: use the remembered launcher in shared UI. Android WebView JavaScript is opt-in; desktop screen content offers only an external-browser action.

## Donations

Reusable donation targets and Material 3 Compose UI for links and wallet addresses. The host controls URL opening, wallet handling, clipboard actions and QR payloads.

## FreetimeWarn

Reusable Material 3 warning dialogs with a required non-blank app name, configurable text and a host-controlled Learn more action. Supports `ONCE`, `ONCE_PER_VERSION` and `ALWAYS`; acknowledgements use private SharedPreferences.

See [FreetimeWarn](./freetime-warn.md) for state and dialog examples.

## Notifications

Introduced in 3.2.0, `com.freetime.notifications` exposes an API dependency on `Core` and uses coroutines with platform-specific storage/scheduling. Android uses WorkManager and Preferences DataStore. It polls public sources locally; it is not push delivery and requires no Firebase, UnifiedPush or Freetime account.

### Android initialization

Call the suspending `FreetimeNotifications.initialize` from an application-owned coroutine, with normal host error handling, not `runBlocking` on the main thread. This fragment assumes `context` is the host application context and the host defines the icon resource:

```kotlin
import com.freetime.notifications.FreetimeNotifications

// Inside an application-owned coroutine:
FreetimeNotifications.initialize(context) {
    smallIcon = R.drawable.ic_stat_notification
    checkIntervalMinutes = 360
    notifyOnFirstCheck = false
    maxNotificationsPerCheck = 5
    github(owner = "your-owner", repository = "your-app")
    // Alternative update source: fdroid(packageName = context.packageName)
    developerMessages("Android", "Releases")
}
```

Use repositories/packages for the **installed host app**, not an unrelated app to monitor. The library does not verify repository ownership. Supply a valid app-owned drawable/mipmap small icon. The host must meet WorkManager initialization requirements and request `POST_NOTIFICATIONS` from its Activity on Android 13+; the library declares permissions but never prompts. `hasPermission(context)` checks runtime/app-wide permission, not each channel.

### Desktop lifecycle

Create `DesktopFreetimeNotifications` in `desktopMain` with an app-private storage directory, installed version name/code and app name. Use exactly one instance per directory. Call suspending `initialize { ... }` or `resume()` from the host coroutine scope after startup. `resume()` returns false if no configuration exists.

Desktop uses atomic JSON storage and AWT tray delivery, not WorkManager or native Android channels. It only polls while the process runs; it cannot deliver after exit. Check tray availability with `hasPermission()`. Use suspending `shutdown()` when closing a UI host; blocking `close()` is prohibited on the AWT event thread. Shutdown retains configuration for resume; `stop()` clears configuration but retains seen IDs/category choices.

### Sources and delivery rules

- `github(owner, repository, includePrereleases = false)` reads public GitHub releases, excluding drafts and, by default, prereleases. Numeric/semver-style tags are compared with the installed `versionName`; equal, older or unorderable versions do not alert. A newer release can also produce a separate `CHANGELOGS` alert if its body is nonblank.
- `fdroid(packageName, apiUrl = null)` compares the suggested version code, or highest code when no suggestion exists, with the installed host's long version code. It produces update alerts only, not changelogs. Custom HTTPS per-package APIs, raw `index-v1.json` and `index-v1.jar` are supported. Signatures are not validated; no APK is downloaded or installed.
- `developerMessages(vararg categories)` reads `https://api.free-time.me/v2/blog/posts`. Filters require **all** requested categories, case-insensitively; no categories means all posts. Full text is fetched only for pending deliveries, with a headline fallback on detail-fetch failure. This is a public content API, not a push backend.

`UPDATES`, `CHANGELOGS` and `DEVELOPER_MESSAGES` have independent channels and deduplication. Configure localized `NotificationChannelOptions` through `category(...)`; Android permission, channel settings and user choices remain authoritative. Existing channel importance cannot be changed by reinitializing.

### Checks and persistent controls

- `initialize` saves configuration, creates channels, schedules periodic work and queues an initial best-effort check; it does not wait for a foreground HTTP result.
- Suspending `checkNow(context)` performs a foreground HTTP check on `Dispatchers.IO`, serialized with background checks. `NotificationCheckResult` contains `checkedSources`, `postedNotifications`, per-source `failures` and `permissionGranted`. Source failures do not stop other sources; storage/configuration errors can still throw and cancellation propagates.
- Non-suspending `requestCheck(context)` replaces queued one-time check work with a connectivity-constrained request; it is not an immediate-delivery guarantee.
- Suspending `setCategoryEnabled(context, category, enabled)` and `isCategoryEnabled(context, category)` manage persistent user overrides that survive later initialization. Disabling also cancels that category's posted notifications.
- Suspending `stop(context)` clears configuration, cancels scheduled/queued work and invalidates active checks. It retains seen IDs and category overrides; reinitialization is not a history reset.

Periodic polling defaults to six hours, with a 15-minute minimum, and Android can delay execution. DataStore persists configuration and up to 500 seen IDs per source/category. The first successful check is a silent baseline by default, even for an empty feed; failed fetches do not establish it. Permission/channel-blocked or posting-limit-deferred entries remain pending after that baseline. This bounded history is not a complete archive.

Requests require HTTPS without embedded credentials. Public services receive ordinary network requests and the device's public IP; unauthenticated GitHub rate limits apply. No tracking token is needed. Inspect `failures` instead of interpreting an empty notification tray as proof of no new content. See the pinned [upstream integration guide](https://github.com/FreetimeMaker/Freetime-Core/blob/2bb88da626d82b77bd612f1f3eca857346c30e71/Notifications/README.md) for full configuration and networking limits.

## Sample

`:Sample` contains shared Compose UI and the desktop entry point; `:Sample-android` is the Android application host. Neither is a published library dependency.

## Independence

No module requires a Freetime account or Luma Store installation. Apps can adopt only the modules they need. Notifications needs network access to its configured public sources; its optional developer-message source defaults to the Freetime blog API, not a notification backend.
