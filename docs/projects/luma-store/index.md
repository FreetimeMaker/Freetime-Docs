# Luma Store

Luma Store is an app-store ecosystem focused on open-source/community sources and cross-platform app discovery.

## Repositories

- [Android](https://github.com/FreetimeMaker/Luma-Store-Android)
- [Website / Developer Dashboard](https://github.com/FreetimeMaker/Luma-Store-Website)
- [Linux](https://github.com/FreetimeMaker/Luma-Store-Linux)

## Android

The Android client uses Kotlin and Jetpack Compose with Material 3/Material You. It supports multiple F-Droid-compatible sources, search, app management, source filtering, custom repositories, background updates and developer functionality.

## Developer dashboard

The web dashboard is used for submitting and managing apps. It supports developer verification, Fastlane metadata import, categories, update resubmission and submission status/timeline functionality.

## Linux

The Linux client is built with Python 3 and GTK 3. It supports browsing/searching the store API and native DEB/RPM package workflows.

## Backend

Luma Store metadata, authentication and submission workflows are backed by the Freetime backend infrastructure. Client applications should use public/publishable credentials only; privileged backend credentials must remain server-side.
