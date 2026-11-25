# Getting Started

## Prerequisites

| Scope | Prerequisite |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required | Git, Node.js/npm compatible with the repository dependencies, a terminal and curl; a free local port. |
| Optional | Frontend checkout and browser; a configured Supabase project and user account for database/authentication features. Neither is needed for the local health check. |
| Publishing only | Deployment access and the appropriate server-side credentials, database schema and policies for the features you deploy. |

## Start the backend

```bash
git clone https://github.com/FreetimeMaker/All-API-Node.git
cd All-API-Node
npm install
npm start
```

The package declares `start: node src/index.js`, but no Node engine constraint, test script or lint script. Use Node.js/npm compatible with its dependency declarations; this review did not resolve dependencies or test a runtime version.

Leave the server running and use a second terminal:

```bash
curl -i --max-time 5 http://localhost:3000/v2/health
```

The directly mounted handler is coded to return HTTP **200** and `{"status":"ok"}`. This is an expected response from source inspection, not captured curl output. It checks only the Express process, not database access or release providers. `PORT` changes the listener port; the default is 3000. No database credentials are needed for this handler.

## Configuration

Configure generic Supabase access with `SUPABASE_URL` and `SUPABASE_ANON_KEY`; the implementation also accepts `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as fallbacks. Generic privileged operations can use `SUPABASE_SERVICE_ROLE_KEY`.

Luma Store uses separate `LUMASTORE_SUPABASE_URL` and `LUMASTORE_SUPABASE_PUBLISHABLE_KEY` settings with public defaults in the source. Luma user tokens must belong to that project. Configure the intended project and database policies rather than assuming the generic project is reused.

## Optional account/dashboard frontend

Run [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd) from its own checkout. With the backend on port 3000, use a different frontend port:

```bash
npm ci
cp .env.example .env.local
# Edit .env.local before starting Next.js.
npm run dev -- --port 3001
```

Set `API_BASE=http://localhost:3000` to use the local backend. If unset, both frontend health and proxy handlers target `https://api.free-time.me`. For sign-in, configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for the intended project. The login page hard-codes `https://dashboard.free-time.me/auth/callback`; running on localhost does not change that destination. To test sign-in locally, change the callback in your frontend checkout and allow that URL in Supabase.

For server-side features, the template also lists `SUPABASE_SERVICE_ROLE_KEY`, `LUMA_STATUS_WEBHOOK_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM` and `EMAIL_NOTIFICATION_TO`. Do not leave the example values in an environment you deploy. These setup steps were checked against source, not run.

## URL conventions

Use your configured backend origin. Append `/v1` or `/v2`, not `/api/v2`. `https://api.free-time.me` remains the inspected frontend's default, but the newer backend revision no longer contains its `CNAME` file; verify your deployment origin separately. On the Next.js origin, `/api/proxy/v2/health` forwards to the backend's `/v2/health`, while `/api/health` wraps the upstream health result in JSON. Production rewrites/aliases are deployment-specific and were not verified here.

:::callout danger
Never expose service-role credentials, OAuth client secrets, email keys or webhook secrets in browser or Android configuration.
:::

## Next

Use [Using the API](./using-the-api.md) for requests, or [Development](./development.md) for metadata synchronization and backend internals.
