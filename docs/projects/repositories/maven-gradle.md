# Maven/Gradle

Add this entry to the existing `dependencyResolutionManagement.repositories` block in `settings.gradle.kts`. Keep the other repositories your project needs for dependencies:

```kotlin
maven("https://repo.free-time.me/maven/") {
    content { includeGroup("com.freetime") }
}
```

For example, a compatible Kotlin Multiplatform project can declare `implementation("com.freetime:Core:4.0.2")` in the relevant Gradle source-set dependencies. Check the [Freetime Core setup guide](../freetime-core/getting-started.md) before changing a version pin or choosing a target.

For Maven, add the endpoint under `<repositories>` in `pom.xml`:

```xml
<repository>
  <id>freetime</id>
  <url>https://repo.free-time.me/maven/</url>
</repository>
```

Use the coordinates published for your target. Maven does not select Kotlin Multiplatform variants from Gradle `.module` metadata the way Gradle does.
