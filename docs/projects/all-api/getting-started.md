# Getting Started

## Prerequisites

| Scope | Prerequisite |
| --- | --- |
| Required | Git, Node.js/npm compatible with the repository dependencies, a terminal and curl; a free local port. |
| Optional | Frontend checkout and browser; a configured Supabase project and user account for database/authentication features. Neither is needed for the local health check. |
| Publishing only | Deployment access and the appropriate server-side credentials, database schema and policies for the features you deploy. |

## First success in five minutes

**Goal: a local process-health response.** The five-minute estimate assumes Node.js/npm and Git are installed and dependency downloads are already complete or fast. It excludes provisioning accounts, databases and deployment; no third-party request is needed for this check.

1. Follow the [backend setup](#backend) below in one terminal. Leave `npm start` running.
2. In a second terminal, run:

   ```bash
   curl -i --max-time 5 http://localhost:3000/v2/health
   ```

3. Expect HTTP **200** with the JSON body `{"status":"ok"}` from the directly mounted handler. If you set `PORT`, use that port instead. This proves only that the Express process responds, not that its database or release providers work.

Need help? Start with [Troubleshooting](./troubleshooting.md).

All API has separate backend and frontend repositories. The inspected backend package is **2.8.1**.

## Backend

```bash
git clone https://github.com/FreetimeMaker/All-API-Node.git
cd All-API-Node
npm install
npm start
```

Direct execution listens on port 3000 unless `PORT` is set. Start with:

```bash
curl http://localhost:3000/v2/health
```

The health handler returns `{"status":"ok"}`. This is a process-health check, not proof that Supabase or upstream release providers are configured correctly.

## Configuration

Configure generic Supabase access with `SUPABASE_URL` and `SUPABASE_ANON_KEY`; the implementation also accepts `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as fallbacks. Generic privileged operations can use `SUPABASE_SERVICE_ROLE_KEY`.

Luma Store uses separate `LUMASTORE_SUPABASE_URL` and `LUMASTORE_SUPABASE_PUBLISHABLE_KEY` settings with public defaults in the source. Luma user tokens must belong to that project. Configure the intended project and database policies rather than assuming the generic project is reused.

## Frontend

```bash
git clone https://github.com/FreetimeMaker/All-API-FrontEnd.git
cd All-API-FrontEnd
npm install
```

Copy `.env.example` to a local environment file, set `API_BASE` to the backend origin, and configure Supabase. Then run `npm run dev`. When running both projects locally, assign different ports; the backend defaults to 3000 and Next.js also normally requests that port.

## URL conventions

Clients in the inspected sources use `https://api.free-time.me` as the backend origin. Append `/v1` or `/v2`, not `/api/v2`. Next.js routes such as `/api/proxy/v2/health` and `/api/luma/apps` belong to the frontend and are separate contracts. Production rewrites/aliases are deployment-specific and were not verified here.

::: callout danger
Never expose service-role credentials, OAuth client secrets, email keys or webhook secrets in browser or Android configuration.
:::

## Next

Read [Using the API](./using-the-api.md), [API Reference](./api-reference.md) and [Development](./development.md).
