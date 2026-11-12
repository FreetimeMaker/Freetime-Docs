# Modules

Freetime Core 3.1.0 contains five independently selectable Android libraries and a sample app. Use the `com.freetime` Maven group and [repository configuration](./getting-started).

| Module       | Dependency                        |
| ------------ | --------------------------------- |
| Core         | `com.freetime:Core:3.1.0`         |
| Design       | `com.freetime:Design:3.1.0`       |
| Browser      | `com.freetime:Browser:3.1.0`      |
| Donations    | `com.freetime:Donations:3.1.0`    |
| FreetimeWarn | `com.freetime:FreetimeWarn:3.1.0` |

## Core

Shared models, result types, SDK metadata, Android helpers and persisted preferences. `FreetimePreferences` stores theme/browser modes, automatic light/dark hours, accessibility flags and the floating-navigation glass setting in SharedPreferences. Applications own the UI state that consumes those values.

## Design

The UI foundation is **Material 3 Expressive + Material You**, not a separate Freetime component framework. Use AndroidX Material 3 components directly.

`AppTheme` supplies expressive motion, dynamic colors on Android 12+, regular schemes on older devices and five theme modes. `FloatingBottomNavigationGlassRoot` and `FloatingBottomNavigationBar` provide the dedicated navigation-only glass treatment, with a Material fallback when disabled.

Version 3.1.0 includes classic Material 3 and Expressive templates in `com.freetime.design.templates.material3` and `com.freetime.design.templates.expressive`. They separate colors, typography, shapes and theme composition; optional Freetime adapters disable navigation glass. Material You is opt-in in the templates.

See [Design & Liquid Glass](./design).

## Browser

URL routing and reusable browser UI. Open externally with:

```kotlin
FreetimeBrowser.openExternal(context, "https://example.org")
```

`BrowserMode.IN_APP` supports host-owned handling through routing options or the reusable browser screen.

## Donations

Reusable donation targets and Material 3 Compose UI for links and wallet addresses. The host controls URL opening, wallet handling, clipboard actions and QR payloads.

## FreetimeWarn

Reusable Material 3 warning dialogs with a required non-blank app name, configurable text and a host-controlled Learn more action. Supports `ONCE`, `ONCE_PER_VERSION` and `ALWAYS`; acknowledgements use private SharedPreferences.

See [FreetimeWarn](./freetime-warn) for state and dialog examples.

## Sample

`:Sample` demonstrates the library modules together. It is an Android application, not a published library dependency.

## Independence

No module requires a Freetime account, Luma Store installation or proprietary backend. Apps can adopt only the modules they need.
