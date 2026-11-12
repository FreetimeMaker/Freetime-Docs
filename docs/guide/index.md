# Getting started

Freetime Docs is built with VitePress.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is generated in `docs/.vitepress/dist`.

## Create a docs version

Create an immutable snapshot of the current documentation:

```bash
npm run docs:version -- 2.x
```

This copies the current documentation into:

```text
docs/versions/2.x/
```

The snapshot is independent from Git tags and software release versions.
