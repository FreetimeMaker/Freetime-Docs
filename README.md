# Freetime Docs

Freetime Docs is a VitePress-based documentation site with documentation-specific versioning.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

VitePress writes the static build to:

```text
docs/.vitepress/dist
```

## Versioning

Documentation versions are independent from Git tags and application releases.

Create a snapshot with:

```bash
npm run docs:version -- 1.0
```

Archived versions are stored under `docs/versions/<version>/` and are automatically exposed through the VitePress version selector.

## Vercel

Use:

- Build Command: `npm run build`
- Output Directory: `docs/.vitepress/dist`
- Install Command: `npm install`
