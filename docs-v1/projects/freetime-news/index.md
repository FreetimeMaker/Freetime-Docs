# Freetime News

Freetime News is the native Android client for reading Freetime news and blog content without relying on a traditional WebView-only experience.

**Repository:** [FreetimeMaker/Freetime-News](https://github.com/FreetimeMaker/Freetime-News)

## Goals and features

- native Android news reading
- Material 3 / Material You interface
- content and category filtering
- API-backed content
- Markdown article rendering
- device-language-aware content where localized metadata is available
- F-Droid-friendly open-source distribution

## Current Android stack

The project currently uses Kotlin 2.4.20, Android Gradle Plugin 9.4.0 and the Compose BOM 2026.09.00. Networking is based on Retrofit 3 with Moshi, while Markdown content is rendered with Markwon.

The content source is integrated with the Freetime web/API ecosystem.
