# Troubleshooting

## Build fails after dependency changes

Clean the project and rebuild with the project's native build tool. Check the documented Java/Node/Android versions before changing dependencies.

## Documentation and implementation differ

The source repository is authoritative for implementation details. Freetime Docs versions are independent snapshots, so an archived docs version may intentionally describe an older state.

## Report a documentation issue

When reporting a docs issue, include the project name, page, expected behavior and the implementation/version you are using.

## Map or remote content is blank

Separate UI rendering from network/content failures. Confirm the remote resource is reachable and inspect Android logs for Ktor or rendering errors.

## Release-only problem

Release builds enable minification and resource shrinking. If debug works but release fails, inspect R8/ProGuard behavior and project keep rules.
