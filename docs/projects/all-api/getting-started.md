# Getting Started

## Requirements

All API is a Node.js backend. Install a current Node.js runtime and npm.

## Install

```bash
git clone https://github.com/FreetimeMaker/All-API-Node.git
cd All-API-Node
npm install
```

## Configure

Create the required environment configuration for the services you intend to use. Supabase-backed features require the relevant Supabase URL and server credentials. Sol Arcade has additional Solana/JWT configuration.

::: danger
Service-role keys, JWT secrets, admin tokens and wallet private keys are server secrets. Never place them in a public client.
:::

## Run

```bash
npm start
```

The package starts `src/index.js`.

## Next steps

- [Authentication](./authentication)
- [Development](./development)
- [Troubleshooting](./troubleshooting)
