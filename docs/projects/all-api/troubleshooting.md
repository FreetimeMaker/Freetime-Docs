# Troubleshooting

## Build fails after dependency changes

Clean the project and rebuild with the project's native build tool. Check the documented Java/Node/Android versions before changing dependencies.

## Documentation and implementation differ

The source repository is authoritative for implementation details. Freetime Docs versions are independent snapshots, so an archived docs version may intentionally describe an older state.

## Report a documentation issue

When reporting a docs issue, include the project name, page, expected behavior and the implementation/version you are using.

## API returns 401

Confirm that the route is protected and that the client sends a current access token using the Bearer authorization scheme.

## Supabase operations fail

Verify server environment variables and database permissions. Do not work around permission failures by exposing a service-role key to clients.
