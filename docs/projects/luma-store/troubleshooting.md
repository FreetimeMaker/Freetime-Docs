# Troubleshooting

## Build fails after dependency changes

Clean the project and rebuild with the project's native build tool. Check the documented Java/Node/Android versions before changing dependencies.

## Documentation and implementation differ

The source repository is authoritative for implementation details. Freetime Docs versions are independent snapshots, so an archived docs version may intentionally describe an older state.

## Report a documentation issue

When reporting a docs issue, include the project name, page, expected behavior and the implementation/version you are using.

## Source shows no apps

Test repository retrieval separately from parsing and filtering. For the Luma Store source, also verify that backend records meet the client's visibility/approval criteria.

## Images do not render

The Android client uses Coil for remote images. Verify that the stored icon URL is reachable and points to an image the client can decode.

## Dashboard build fails

Run `npm run type-check` and `npm run lint` before the production build to isolate TypeScript and lint failures.
