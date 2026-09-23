# Design & Liquid Glass

Freetime Design is the standalone Compose UI system shipped by Freetime Core. Since 1.6 it no longer uses Material 3 as its UI foundation; 1.10 brings the Liquid Glass renderer and navigation behavior much closer to SimpMusic while preserving **Freetime's own glass tinting**.

## Design system

`FreetimeDesign` exposes the active design tokens:

```kotlin
FreetimeDesign.palette
FreetimeDesign.colors
FreetimeDesign.typography
FreetimeDesign.shapes
FreetimeDesign.spacing
FreetimeDesign.sizes
FreetimeDesign.motion
FreetimeDesign.glass
```

This lets applications share the same visual language without importing Material UI components.

## Liquid Glass pipeline

The live glass path is built from Kyant Backdrop and Shapes. A surface samples a sibling backdrop rather than recursively sampling itself.

The standard interactive recipe combines:

1. backdrop vibrancy;
2. Freetime color controls with approximately 1.5× saturation;
3. luminance-adaptive blur;
4. lens refraction;
5. an adaptive light/dark scrim;
6. optional Freetime tint;
7. press scaling, extra blur and a radial additive highlight.

The tint layer is intentionally Freetime-specific. The rest of the optical and interaction behavior is kept close to the SimpMusic-style implementation used as the design reference.

## Luminance sampling

Surfaces that need adaptive luminance can record their backdrop to a Compose `GraphicsLayer`. `rememberFreetimeBackdropLuminance()` periodically downsamples that layer to 5×5 pixels and calculates Rec.709 luminance:

```text
0.2126 × R + 0.7152 × G + 0.0722 × B
```

The sampled value is constrained to the useful glass range and animated before it drives blur/scrim behavior. The small sample keeps the effect inexpensive enough for navigation surfaces.

## Selection glass

`freetimeSelectedGlassCapsule()` adds the stronger selected-surface treatment used by tabs/navigation. It combines extra frosting, chromatic lens refraction, highlight, outer shadow and a press-progress-driven inner shadow.

## Interactive navigation

`FreetimeBottomBar` uses a movable selection surface instead of drawing a separate selected background in every item. Horizontal drag updates its position, release velocity contributes to the target selection, and spring animations settle the blob onto the selected destination.

During interaction the blob can bulge and squash/stretch based on press and velocity. Reduced-motion mode bypasses decorative movement.

## Gesture behavior

Glass press tracking is observe-only: it follows pointer position and release/cancel state without consuming the click handling owned by buttons, tabs and other controls.

## Accessibility

The renderer responds to:

- **Reduce motion** — minimizes decorative animation.
- **Reduce transparency** — uses more opaque surfaces and removes/refuses expensive refraction behavior.
- **High contrast** — strengthens separation and glass edges.
- **Liquid Glass** — disables the live glass effect while retaining a readable fallback.

These values are available through `FreetimeAppEnvironment`.

## App root

For persisted settings:

```kotlin
val preferences = remember { FreetimePreferences.from(context) }
val controller = rememberFreetimePreferencesController(preferences)

FreetimeApp(controller = controller) {
    AppContent()
}
```

For lower-level control:

```kotlin
FreetimeTheme {
    FreetimeGlassRoot(
        dynamicBackdrop = FreetimeDynamicBackdrop(colors)
    ) {
        AppContent()
    }
}
```

## Reusable UI

Beyond glass modifiers, Design provides Material-free layout, navigation, settings, state and control components. See [Modules](/projects/freetime-core/modules) for the current component groups.


## FreetimeWarn integration

The `FreetimeWarn` module depends on Freetime Design and composes its warning UI from `FreetimeDialog`, `FreetimeText` and `FreetimeButton`. This means warning dialogs inherit the same Freetime typography, colors and Liquid Glass surface behavior as other Design dialogs instead of introducing Material UI.

The warning mechanism and warning copy are separate. Apps can provide current, app-specific wording through `FreetimeWarnContent` while retaining the shared Design presentation.

See [FreetimeWarn](/projects/freetime-core/freetime-warn) for integration details.
