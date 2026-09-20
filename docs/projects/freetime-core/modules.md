# Modules

Freetime Core is split into focused Android library artifacts so applications only need to depend on functionality they use.

## Core

```text
me.free-time:freetime-core
```

Contains shared models, result types and lightweight common utilities.

## Design

```text
me.free-time:freetime-design
```

Provides Material You integration and the current Freetime Liquid Glass system.

The glass implementation separates the backdrop source from glass content to avoid RuntimeShader feedback loops on affected Android GPU drivers.

## Updater

```text
me.free-time:freetime-updater
```

Provides source-agnostic update checking. Applications register the update sources they support and can check all or a selected subset.

Supported source types can include Luma Store, F-Droid, GitHub and custom implementations.

The updater selects update information but does not install APKs itself.

## Browser

```text
me.free-time:freetime-browser
```

Provides reusable URL-routing behavior.

For example:

```kotlin
FreetimeBrowser.openExternal(context, "https://example.org")
```

Applications can also provide their own in-app browser handling through the in-app mode callback.

## Donations

```text
me.free-time:freetime-donations
```

Provides reusable donation models and Compose UI for links and wallet addresses while leaving link handling and wallet-copy behavior under application control.

## Independence

None of these modules makes Luma Store or a Freetime account mandatory. Applications remain independently installable and can select only the shared infrastructure they require.
