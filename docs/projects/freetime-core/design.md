# Design & Liquid Glass

Freetime Core 3.1.0 uses **Material 3 Expressive + Material You** as the shared Android UI foundation. The Design module no longer acts as a separate Material-free component framework.

## App theme

Use Material 3 components directly and wrap the application with `AppTheme`:

```kotlin
AppTheme(
    themeMode = ThemeMode.AUTO_TIME,
    floatingBottomNavigationGlassEnabled = true,
) {
    AppContent()
}
```

The shared theme provides Material 3 Expressive motion, Material You dynamic colors on Android 12+, regular color schemes on older versions, and `SYSTEM`, `LIGHT`, `DARK`, `OLED` and `AUTO_TIME` modes.

The default automatic schedule uses light mode from 07:00 and dark mode from 19:00.

## App-owned theme templates

Version 3.1.0 includes copyable templates under `com.freetime.design.templates.material3` and `com.freetime.design.templates.expressive`. The former uses classic `MaterialTheme`, the latter `MaterialExpressiveTheme` and expressive motion. Both separate colors, typography, shapes and theme composition, with light/dark previews and optional Freetime adapters that disable navigation glass.

The templates use Material defaults as starting values, make Material You opt-in and leave scheduling/OLED behavior to the app. They do not change the root `AppTheme` defaults. Their source guide is in `Design/src/main/java/com/freetime/design/templates/README.md`. Maintainers can compile-check them with `sh gradlew :Design:checkTemplates`.

## Liquid Glass

In 3.x Liquid Glass is reserved for the floating bottom navigation. Cards, dialogs, buttons, text fields, top bars and normal content surfaces should use Material 3 Expressive.

```kotlin
FloatingBottomNavigationGlassRoot(
    source = { AppBackground() },
) {
    FloatingBottomNavigationBar(
        items = tabs,
        selectedItemIndex = selectedIndex,
        onItemSelected = { selectedIndex = it },
        searchItem = searchItem,
        onSearchSelected = ::openSearch,
    )
}
```

The navigation layout uses a 64dp capsule, a 56dp sliding frosted selection pill, up-to-96dp tabs, 6dp inset and an optional separate 56dp circular search action.

## Disabling glass

The global setting is exposed through `LocalFloatingBottomNavigationGlassEnabled`. Apps that own their Material theme can provide only this setting:

```kotlin
ProvideFloatingBottomNavigationGlass(
    enabled = settings.floatingBottomNavigationGlassEnabled
) {
    AppContent()
}
```

When disabled, the navigation automatically falls back to Material styling.

## Migrating from 2.x

Remove generic glass APIs including `Modifier.liquidGlass()`, `Modifier.liquidGlassCapsule()`, `Modifier.liquidGlassCircle()`, `LiquidGlassContainer`, `LiquidGlassIconButton`, `LiquidGlassRoot`, `LocalLiquidGlassEnabled` and `ProvideLiquidGlass`.

Replace them with Material 3 surfaces and use the dedicated floating navigation glass APIs only where appropriate.
