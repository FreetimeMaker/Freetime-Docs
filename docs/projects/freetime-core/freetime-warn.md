# FreetimeWarn

`FreetimeWarn` is a Kotlin and Jetpack Compose warning library in Freetime Core. It is inspired by the idea of FreeDroidWarn, but uses Freetime Design for its UI and deliberately keeps the warning mechanism separate from policy-specific text.

## Dependency

```kotlin
implementation("com.github.FreetimeMaker.Freetime-Core:FreetimeWarn:1.10.1")
```

The module exposes Freetime Design transitively and uses the same Compose/Freetime UI foundation as the rest of the library suite.

## Required app name

Every integration must explicitly provide the user-facing application name:

```kotlin
val warning = rememberFreetimeWarnState(
    context = context,
    appName = "GeoWeather",
    versionCode = BuildConfig.VERSION_CODE.toLong(),
)
```

`appName` has no default value, so omitting it is a Kotlin compile-time error. A blank runtime value is also rejected with `require`.

This requirement keeps the shared warning reusable while making the final notice identify the integrating app.

## Basic usage

```kotlin
val warning = rememberFreetimeWarnState(
    context = context,
    appName = "GeoWeather",
    versionCode = BuildConfig.VERSION_CODE.toLong(),
)

FreetimeWarn(
    state = warning,
    onLearnMore = {
        // Open the current information page with the app's browser flow.
    },
)
```

`FreetimeWarn` is the convenience composable. It wires the state's visibility, acknowledgement and dismiss behavior to `FreetimeWarnDialog`.

## Display frequency

`FreetimeWarnFrequency` supports three modes:

| Mode | Behavior |
| --- | --- |
| `ONCE` | Shows until acknowledged, then stores the acknowledgement for this app/warning ID |
| `ONCE_PER_VERSION` | Default; shows once for every supplied app version code |
| `ALWAYS` | Does not persist acknowledgement; the host controls when the warning is shown |

Example:

```kotlin
val warning = rememberFreetimeWarnState(
    context = context,
    appName = "Luma Store",
    versionCode = BuildConfig.VERSION_CODE.toLong(),
    frequency = FreetimeWarnFrequency.ONCE,
)
```

## Warning IDs

The default warning ID is `android-distribution-notice`. Apps can provide a different `warningId` when they need independent acknowledgement state for another notice:

```kotlin
val warning = rememberFreetimeWarnState(
    context = context,
    appName = "GeoWeather",
    versionCode = BuildConfig.VERSION_CODE.toLong(),
    warningId = "my-second-notice",
)
```

The persisted key combines the warning ID with the application name.

## State API

`FreetimeWarnState` exposes:

```kotlin
warning.visible
warning.show()
warning.dismiss()
warning.acknowledge()
warning.reset()
```

`acknowledge()` writes the appropriate persistent state for `ONCE` and `ONCE_PER_VERSION`, then hides the dialog. `reset()` removes the stored acknowledgement and makes the warning visible again.

Persistence uses the app's private `SharedPreferences` file named `freetime_warn`.

## Custom content

Warning wording is configurable through `FreetimeWarnContent`:

```kotlin
val content = FreetimeWarnContent(
    title = "Distribution notice",
    message = { appName ->
        "Current information affecting $appName."
    },
    detailsLabel = "Learn more",
    acknowledgeLabel = "I understand",
)

FreetimeWarn(
    state = warning,
    content = content,
)
```

The message receives the mandatory app name, so custom copy can identify the application without duplicating configuration.

## Direct dialog API

Apps that already own their own state can use `FreetimeWarnDialog` directly:

```kotlin
FreetimeWarnDialog(
    appName = "GeoWeather",
    visible = showWarning,
    onAcknowledge = { showWarning = false },
    onDismissRequest = { showWarning = false },
    onLearnMore = { openInfoPage() },
)
```

The direct dialog API also requires a non-blank `appName`.

## Freetime Design

The dialog is implemented with:

- `FreetimeDialog`
- `FreetimeText`
- `FreetimeButton`
- `FreetimeDesign` typography and colors

Because `FreetimeDialog` uses the shared wide-glass surface, FreetimeWarn follows the active Freetime Design/Liquid Glass presentation instead of maintaining a second Material dialog style.

## Browser independence

`onLearnMore` is a callback rather than a hard-coded URL opener. The host app can therefore use Freetime Browser, an external browser, an in-app browser or its own navigation flow.

## Keeping warning text current

FreetimeWarn intentionally does not make persistence/UI depend on one permanent policy statement. Platform and distribution requirements can change over time. Apps should keep their user-facing warning text and Learn more destination current for the information they intend to communicate.
