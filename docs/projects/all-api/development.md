# Development

All API is an Express 5 backend and the central server-side integration point for multiple Freetime Maker services.

## Runtime

The package entry point is `src/index.js`. Local execution uses:

```bash
npm install
npm start
```

## Main dependencies

- Express 5 for HTTP routing
- Helmet for security headers
- CORS middleware
- Supabase JavaScript client for database/auth integration
- Axios for outbound HTTP requests
- JSON Web Tokens and TweetNaCl for authentication/signature-related flows
- Solana Web3, Umi and Metaplex Bubblegum for Sol Arcade functionality

## Environment

Keep secrets in environment variables. Supabase service-role credentials, JWT/admin secrets and wallet private keys are server-only values.

## Deployment model

The backend is designed around HTTP API routes and Vercel deployment. API clients should depend on documented HTTP contracts rather than importing backend implementation modules.
