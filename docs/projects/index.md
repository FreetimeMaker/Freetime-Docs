# Projects

Choose a project for its setup guide, technical details and source code. For tooling and navigation help, see [Getting Started](../getting-started/index.md).

| Project                                             | What it does                                                      | Setup                                                 | Source code                                                                                                                                                                                            |
| --------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Freetime Core](./freetime-core/index.md)           | Shared Kotlin Multiplatform libraries for Android and desktop JVM | [Quickstart](./freetime-core/getting-started.md)      | [Library](https://github.com/FreetimeMaker/Freetime-Core)                                                                                                                                              |
| [GeoWeather](./geoweather/index.md)                 | Android forecasts, alerts and widgets                             | [Quickstart](./geoweather/getting-started.md)         | [App](https://github.com/FreetimeMaker/GeoWeather)                                                                                                                                                     |
| [Luma Store](./luma-store/index.md)                 | Android app discovery, publishing and developer tools             | [Quickstart](./luma-store/getting-started.md)         | [Android](https://github.com/FreetimeMaker/Luma-Store-Android), [Website](https://github.com/FreetimeMaker/Luma-Store-Website), [Desktop Console](https://github.com/FreetimeMaker/Luma-Store-Dekstop) |
| [SuperSMP Companion](./supersmp-companion/index.md) | Unofficial Android companion for SuperSMP                         | [Quickstart](./supersmp-companion/getting-started.md) | [App](https://github.com/FreetimeMaker/SuperSMP-Companion-App)                                                                                                                                         |
| [All API](./all-api/index.md)                       | Shared backend APIs for app services                              | [Quickstart](./all-api/getting-started.md)            | [Backend](https://github.com/FreetimeMaker/All-API-Node), [Frontend](https://github.com/FreetimeMaker/All-API-FrontEnd)                                                                                |
| [MD-Blog](./md-blog/index.md)                       | Markdown blog frontend backed by All API                          | [Quickstart](./md-blog/getting-started.md)            | [Blog](https://github.com/FreetimeMaker/MD-Blog)                                                                                                                                                       |
| [Multi AI Chat](./multi-ai-chat/index.md)           | Multi-provider chat plugin for JetBrains IDEs                     | [Quickstart](./multi-ai-chat/getting-started.md)      | [Plugin](https://github.com/FreetimeMaker/Multi-AI-Chat)                                                                                                                                               |

Looking for package sources? See [Repositories](./repositories/index.md) for client-specific setup and signing-key checks.

## Integration paths

- [Build a Luma client](./luma-store/custom-clients.md) against the [All API catalog](./all-api/api-reference.md), or [submit an Android app](./luma-store/submissions.md).
- [Configure MD-Blog](./md-blog/getting-started.md) with an All API backend.
- [Use Freetime Core in an app](./freetime-core/modules.md). Existing apps can pin different library versions; check their project guides before upgrading.

::: callout info "Source versus release"
Each project overview identifies the source revision and review scope, or notes where a current checkout was unavailable. A version declared in source does not guarantee a published download or live deployment.
:::
