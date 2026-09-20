# Getting Started

Freetime Core artifacts are published under the `me.free-time` Maven namespace.

## Repository

Use Maven Central together with Google's Android repository:

```kotlin
repositories {
    google()
    mavenCentral()
}
```

## Add a module

Only include the modules your application needs:

```kotlin
dependencies {
    implementation("me.free-time:freetime-core:1.0.0")
    implementation("me.free-time:freetime-design:1.0.0")
    implementation("me.free-time:freetime-updater:1.0.0")
    implementation("me.free-time:freetime-browser:1.0.0")
    implementation("me.free-time:freetime-donations:1.0.0")
}
```

Keep all Freetime Core artifacts on compatible versions.

## Liquid Glass

Wrap the app content once so glass surfaces can sample a separate backdrop:

```kotlin
FreetimeTheme {
    FreetimeGlassRoot {
        // App UI
    }
}
```

Reusable glass components and modifiers can then be used inside the root:

```kotlin
FreetimeGlassCard {
    FreetimeGlassButton("Continue", onClick = ::continueFlow)
}

Modifier.freetimeGlass()
Modifier.freetimeGlassCapsule()
```

On Android 13 and newer the design module uses Kyant Backdrop and Shapes for backdrop sampling and visual effects. Older Android versions receive a Material color-aware fallback.

## Next

See [Modules](/projects/freetime-core/modules) for the responsibilities of each artifact.
