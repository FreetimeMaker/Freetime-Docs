# Troubleshooting

## Build fails after dependency changes

Clean the project and rebuild with the project's native build tool. Check the documented Java/Node/Android versions before changing dependencies.

## Documentation and implementation differ

The source repository is authoritative for implementation details. Freetime Docs versions are independent snapshots, so an archived docs version may intentionally describe an older state.

## Report a documentation issue

When reporting a docs issue, include the project name, page, expected behavior and the implementation/version you are using.

## Weather data does not load

Check network access first. GeoWeather uses Ktor with the OkHttp engine for remote requests, so failures can originate from connectivity, the upstream weather service or backend configuration.

## Local data behaves unexpectedly

Room/SQLite stores persistent application data. When testing schema or persistence changes, distinguish migration problems from UI state problems before clearing app data.
