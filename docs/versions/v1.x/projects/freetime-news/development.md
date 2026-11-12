# Development

Freetime News is a native Android Markdown/news reader rather than a WebView wrapper.

## Android configuration

- Application ID: `com.freetime.news`
- Minimum SDK: 24
- Target SDK: 37
- Java compatibility: 11

## UI

The application uses Jetpack Compose and Material 3.

## Content pipeline

Retrofit handles API communication. Moshi maps API responses to Kotlin models, with KSP generating Moshi adapters.

Markdown content is rendered natively with Markwon, allowing articles to appear as formatted content inside the Android UI without embedding the website itself.

## Build

```bash
./gradlew assembleDebug
```
