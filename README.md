# markqle.github.io

Minimalist personal portfolio and blog, built with [Astro](https://astro.build).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run check    # type + content-schema check
npm run build    # static build to dist/
npm run preview  # preview the production build
```

## Authoring

- **Blog posts:** add Markdown files to `src/content/blog/`. Frontmatter: `title`, `date`, `description`, `draft`.
- **Projects:** add Markdown files to `src/content/projects/`. Frontmatter: `title`, `description`, `tech`, `repo`, `demo`, `featured`, `order`.
- **Site info & links:** edit `src/data/site.ts`.
- **Resume:** edit `src/pages/resume.astro` and replace `public/resume.pdf`.

Search the repo for `TODO(mark)` to find placeholder copy to replace.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages at https://markqle.github.io.
Enable Pages once: repo Settings → Pages → Source: **GitHub Actions**.
