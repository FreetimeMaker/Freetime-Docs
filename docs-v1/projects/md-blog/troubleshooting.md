# Troubleshooting

## Post is not listed

Confirm it is under `public/blogs`, has the expected Markdown extension and is discoverable by the blog handler.

## Route differs on Vercel

Check `vercel.json`; blog routes are explicitly mapped to serverless handlers.
