# Modules

Freetime Core is split into focused Android library modules so applications only depend on the shared functionality they use.

## Core

```text
com.github.FreetimeMaker.Freetime-Core:Core:1.10.0
```

Provides shared models, result types, lightweight Android utilities and persisted Freetime preferences.

`FreetimePreferencesState` currently covers theme mode, browser mode, automatic theme hours, reduced motion, reduced transparency, high contrast and the Liquid Glass enable/disable state.

## Design

```text
com.github.FreetimeMaker.Freetime-Core:Design:1.10.0
```

Freetime's standalone Compose UI system. It does **not** use Material 3 as its UI foundation.

### Theme and tokens

Design exposes Freetime-owned palette, typography, shapes, spacing, sizing, motion and glass tokens through `FreetimeDesign`.

### App-level components

The reusable component set includes text, screens, section headers, list items, option groups, status banners, empty/loading/error states, dividers, badges and info cards.

Controls include buttons, icon buttons, cards, top bars, text fields, switches, sliders, chips, dialogs, snackbars and progress indicators.

### Layout and adaptive navigation

Design includes:

- `FreetimeScaffold`
- `FreetimeTabRow`
- `FreetimeFloatingActionButton`
- `FreetimeExtendedFloatingActionButton`
- `FreetimeBottomSheet`
- `FreetimeBottomBar` and `FreetimeAdaptiveBottomBar`
- adaptive bottom-navigation/navigation-rail support
- popup menus and menu item models

### Preferences and accessibility

`FreetimeApp` can use one shared `FreetimePreferencesController` and exposes the same controller to child composables. `FreetimeAccessibilitySettings()` uses it automatically.

### Liquid Glass 1.10

The glass renderer uses Kyant Backdrop/Shapes and is intentionally close to SimpMusic's glass behavior except that Freetime retains its own tintable glass colors.

The current implementation includes:

- live backdrop sampling with separated backdrop/foreground layers
- vibrancy and 1.5× saturation
- adaptive blur driven by backdrop luminance
- lens refraction without the central depth seam for standard interactive glass
- press-driven blur, scale and radial highlight
- dynamic light/dark scrims
- selected-glass frosting, chromatic refraction, highlight, shadow and inner shadow
- recorded `GraphicsLayer` backdrop capture
- lightweight 5×5 Rec.709 luminance sampling with smooth transitions
- observe-only gesture tracking so glass interactions do not steal normal clicks
- draggable navigation selection with spring snapping and velocity deformation
- reduced-motion, reduced-transparency and high-contrast behavior
- persistent Liquid Glass enable/disable setting
- translucent/non-glass fallbacks where the live effect is unavailable or disabled

Keep the backdrop source separate from foreground glass content to avoid shader feedback loops.

## Browser

```text
com.github.FreetimeMaker.Freetime-Core:Browser:1.10.0
```

Provides URL routing without forcing a WebView implementation.

```kotlin
FreetimeBrowser.openExternal(context, "https://example.org")
```

For app-owned WebView or Custom Tabs behavior, use in-app mode and provide the callback that handles the URL.

## Donations

```text
com.github.FreetimeMaker.Freetime-Core:Donations:1.10.0
```

Provides reusable donation models and Compose UI for links and wallet addresses. The host app retains control over link opening, browser preference and wallet-address behavior. Its UI uses Freetime Design rather than Material 3.

## Sample

`Sample` is an application module used to demonstrate Core, Design, Browser and Donations together; it is not a library dependency.

## Independence

None of the modules requires Luma Store or a Freetime account. Applications remain independently installable and can select only the shared infrastructure they need.
