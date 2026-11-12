---
title: MD-Blog
---

<ProjectHeader project="md-blog" />

## Find your starting point

<ProjectPaths project="md-blog" />

MD-Blog is a Node.js Markdown blog frontend. The current package version is **1.0.0**. Blog content is fetched from [All API](/projects/all-api/); the homepage remains a local Markdown file.

**Source code:** [FreetimeMaker/MD-Blog](https://github.com/FreetimeMaker/MD-Blog)

## At a glance

<ProjectDiagram project="md-blog" />

## Features

- server-rendered HTML using Marked and reusable templates
- post listing and category discovery through All API
- comma-separated category filters that must all match a post
- individual posts resolved by slug
- Discord-style timestamps rendered through HTML time elements
- light and dark styling
- local Node HTTP server and Vercel routing

## Content and configuration

`public/md/index.md` supplies the homepage. `public/views` contains the homepage and blog templates; styles and favicons are also local assets.

::: info Posts come from the backend
The blog handlers request `/blog/posts`, `/blog/categories` and `/blog/posts/<slug>` from `ALL_API_URL`, which defaults to `https://api.free-time.me/v2`. Adding a file to `public/blogs` alone no longer publishes a post: posts must be available from the backend.
:::

## Continue

- [Getting Started](/projects/md-blog/getting-started)
- [Architecture](/projects/md-blog/architecture)
- [Troubleshooting](/projects/md-blog/troubleshooting)
