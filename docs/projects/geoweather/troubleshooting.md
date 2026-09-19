# Troubleshooting

## Weather data does not load

Check network access first. GeoWeather uses Ktor with OkHttp, so distinguish connectivity/upstream failures from UI problems.

## Local data behaves unexpectedly

Room/SQLite stores persistent app data. When changing schemas, distinguish migration failures from state/UI issues before clearing app data.

## Build fails

Verify Android SDK/JDK compatibility and run the Gradle wrapper from the repository root.
