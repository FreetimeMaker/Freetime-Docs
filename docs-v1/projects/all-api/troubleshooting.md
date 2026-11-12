# Troubleshooting

## API returns 401

Confirm that the route requires authentication and that the client sends a current access token as `Authorization: Bearer <token>`.

## Supabase operations fail

Verify server environment variables and database permissions. Never solve permission failures by exposing a service-role key to a client.

## Documentation differs from the backend

Freetime Docs versions are independent snapshots. Check the selected docs version and the backend revision you are running.
