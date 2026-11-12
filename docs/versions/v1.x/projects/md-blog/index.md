# MD-Blog

MD-Blog is a lightweight Markdown publishing platform for blogs, changelogs and project updates.

**Repository:** [FreetimeMaker/MD-Blog](https://github.com/FreetimeMaker/MD-Blog)

## Features

- Markdown files rendered to HTML with Marked
- automatic post discovery from `public/blogs`
- readable filename-based slugs
- reusable homepage and post templates
- light and dark themes
- Vercel-ready routing

## Content structure

```text
api/
  index.js
  blog.js
  blog/[slug].js
public/
  blogs/
  md/index.md
  views/
  styles/
vercel.json
```

Create a post by adding a Markdown file to `public/blogs`. A level-one heading becomes the post title; otherwise a title is generated from the filename.

```md
# My First Post

Post content goes here.
```

The example above is available under `/blog/my-first-post`.

## Deployment

The repository includes Vercel routing. The homepage is sourced from `public/md/index.md`, `/blog` lists posts and `/blog/<slug>` renders an individual post.
