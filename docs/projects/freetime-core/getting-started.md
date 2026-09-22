# Getting Started

Freetime Core 1.10.0 is split into `Core`, `Design`, `Browser` and `Donations`. Include only the modules an app needs.

## Dependency

The current dependency coordinates used by Freetime Core are:

```kotlin
dependencies {
    implementation("com.github.FreetimeMaker.Freetime-Core:Core:1.10.0")
    implementation("com.github.FreetimeMaker.Freetime-Core:Design:1.10.0")
    implementation("com.github.FreetimeMaker.Freetime-Core:Browser:1.10.0")
    implementation("com.github.FreetimeMaker.Freetime-Core:Donations:1.10.0")
}
```

Keep the modules on the same Freetime Core version.

## Recommended app root

For apps that want persisted Freetime appearance/accessibility settings, create one preferences instance and one shared controller:

```kotlin
val preferences = remember { FreetimePreferences.from(context) }
val controller = rememberFreetimePreferencesController(preferences)

FreetimeApp(controller = controller) {
    AppContent()
}
```

The same controller is exposed through `LocalFreetimePreferencesController`, so the built-in settings screen can use it directly:

```kotlin
FreetimeAccessibilitySettings()
```

You can also use `FreetimeApp(preferences = preferences)` when you do not need to keep a controller reference yourself.

## Theme modes

Persisted theme modes are:

- `SYSTEM`
- `LIGHT`
- `DARK`
- `OLED`
- `AUTO_TIME`

`AUTO_TIME` uses configurable `lightHour` and `darkHour` values.

## Accessibility and Liquid Glass settings

`FreetimePreferencesState` also stores:

```kotlin
reduceMotion
reduceTransparency
highContrast
liquidGlassEnabled
browserMode
```

The built-in appearance screen exposes Liquid Glass, reduced motion, reduced transparency and high contrast controls. Resetting appearance from that screen leaves unrelated browser preferences untouched.

## Liquid Glass

`FreetimeApp` creates the shared glass root automatically. If you use the lower-level theme API yourself, wrap foreground glass content with `FreetimeGlassRoot`:

```kotlin
FreetimeTheme {
    FreetimeGlassRoot {
        FreetimeCard {
            FreetimeText("Glass content")
        }
    }
}
```

Useful modifiers include:

```kotlin
Modifier.freetimeGlass()
Modifier.freetimeGlassCapsule()
Modifier.freetimeWideGlass()
Modifier.freetimeRoundGlass()
Modifier.freetimeSelectedGlassCapsule()
```

Use `interactive = false` for static surfaces.

When Liquid Glass is disabled or a live backdrop cannot be used, Design falls back to a Freetime-owned non-Material surface.

## Screen layout

```kotlin
FreetimeScaffold(
    topBar = { FreetimeTopBar("Example") },
    bottomBar = {
        FreetimeBottomBar(
            destinations = destinations,
            selectedIndex = selectedIndex,
            onDestinationSelected = { selectedIndex = it },
        )
    },
) {
    // Screen content
}
```

`FreetimeScaffold` applies safe drawing insets and provides top, content, bottom and floating-action slots without Material Scaffold.

## Next

- [Modules](/projects/freetime-core/modules)
- [Design & Liquid Glass](/projects/freetime-core/design)
