# Getting Started

All API is the central Node.js backend.

## Install

```bash
git clone https://github.com/FreetimeMaker/All-API-Node.git
cd All-API-Node
npm install
npm start
```

The package starts `src/index.js`.

## Configuration

Configure only the services you use. Supabase-backed functionality needs server-side Supabase configuration; Sol Arcade additionally needs its Solana/JWT configuration.

::: danger
Never expose service-role keys, JWT secrets, admin tokens or wallet private keys to clients.
:::

## Next steps

Read [Authentication](./authentication), [Development](./development) and [Troubleshooting](./troubleshooting).
