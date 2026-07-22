# Personal Portfolio + Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist Astro static portfolio + blog for `markqle.github.io`, deployed to GitHub Pages, with Home/About, Projects, Blog, and Resume pages authored from Markdown.

**Architecture:** Astro v7 static site (`output: 'static'`). Content (blog posts, projects) lives in Markdown files loaded via the Content Layer `glob()` loader with typed schemas. Shared `BaseLayout` renders SEO/OG head, nav, footer, and a light/dark theme toggle. Styling is hand-written CSS with design tokens — no CSS framework. Sitemap and RSS via official Astro integrations. GitHub Actions deploys `dist/` to Pages.

**Tech Stack:** Astro 7.x, TypeScript (strict), `@astrojs/sitemap`, `@astrojs/rss`, hand-written CSS, GitHub Actions (official Astro Pages workflow).

## Global Constraints

- Astro `^7.0.0`; Node `>=20` (dev machine has Node 24).
- `site: 'https://markqle.github.io'` in `astro.config.mjs`; **no** `base` (root user site).
- No third-party runtime requests: fonts are **system stacks only**; no CDN scripts/styles.
- Only client JS permitted is the inline theme-toggle script.
- All bio/project/resume copy is **clearly-marked placeholder** (prefix owner-editable copy with `TODO(mark):` in HTML comments where non-obvious).
- Aesthetic: typographic/editorial — serif prose/headings + system sans UI, ~65ch prose measure, light+dark mode.
- Verification for this static site = `npm run check` (astro check, type + content-schema) and `npm run build` succeed, plus asserting expected strings in `dist/` output. There is no runtime unit-test harness; build + output assertions are the test cycle.
- Commit after every task with a `feat:`/`chore:` message.

---

### Task 1: Project scaffold & build baseline

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/pages/index.astro` (temporary minimal page, replaced in Task 3)
- Create: `public/.nojekyll`

**Interfaces:**
- Consumes: nothing.
- Produces: a buildable Astro project. Scripts `npm run dev`, `npm run build`, `npm run preview`, `npm run check`. `astro.config.mjs` exports config with `site` set and `sitemap` integration registered (Task 7 adds RSS separately).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "markqle-github-io",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^7.1.3",
    "@astrojs/sitemap": "^3.7.3",
    "@astrojs/rss": "^4.0.19"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 3: Create `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
.env.production
```

- [ ] **Step 4: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markqle.github.io',
  output: 'static',
  integrations: [sitemap()],
});
```

- [ ] **Step 5: Create `public/.nojekyll`** (empty file — stops GitHub Pages from running Jekyll on Astro output)

```
```

- [ ] **Step 6: Create temporary `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head><meta charset="utf-8" /><title>markqle</title></head>
  <body><h1>Scaffold OK</h1></body>
</html>
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`
Expected: exits 0, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 8: Verify build succeeds**

Run: `npm run build`
Expected: exits 0, prints "Complete!", creates `dist/index.html` containing `Scaffold OK`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with build baseline"
```

---

### Task 2: Design tokens, global styles, BaseLayout, Nav, Footer, ThemeToggle

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/data/site.ts` (single source of truth for site metadata + contact links)
- Modify: `src/pages/index.astro` (replace temp page with real Home/About using BaseLayout)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces:
  - `src/data/site.ts` exports:
    ```ts
    export const site = {
      name: 'Mark Le',            // TODO(mark): confirm display name
      title: 'Mark Le — Portfolio',
      description: 'Portfolio and blog of Mark Le.',
      email: 'mark@belamourllc.com',
      github: 'https://github.com/markqle',
      linkedin: 'https://www.linkedin.com/in/markqle', // TODO(mark): confirm URL
    } as const;
    ```
  - `BaseLayout.astro` accepts props `{ title: string; description?: string; ogType?: string }` and a default `<slot />`. Every page uses it.

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: 'Mark Le', // TODO(mark): confirm display name
  title: 'Mark Le — Portfolio',
  description: 'Portfolio and blog of Mark Le.', // TODO(mark): refine tagline
  email: 'mark@belamourllc.com',
  github: 'https://github.com/markqle',
  linkedin: 'https://www.linkedin.com/in/markqle', // TODO(mark): confirm URL
} as const;

export const nav = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
];
```

- [ ] **Step 2: Create `src/styles/tokens.css`**

```css
:root {
  --font-serif: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif;
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;

  --measure: 65ch;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;

  /* light theme */
  --bg: #fbfbf9;
  --fg: #1a1a1a;
  --muted: #6b6b6b;
  --rule: #e4e2dc;
  --accent: #7a5c3e;
  --accent-fg: #ffffff;
}

:root[data-theme='dark'] {
  --bg: #16161a;
  --fg: #e9e8e4;
  --muted: #9a9a94;
  --rule: #2c2c31;
  --accent: #c8a97e;
  --accent-fg: #16161a;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --bg: #16161a;
    --fg: #e9e8e4;
    --muted: #9a9a94;
    --rule: #2c2c31;
    --accent: #c8a97e;
    --accent-fg: #16161a;
  }
}
```

- [ ] **Step 3: Create `src/styles/global.css`**

```css
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, nav, .ui { font-family: var(--font-sans); }
h1, h2, h3 { line-height: 1.25; font-weight: 650; }
a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 2px; }
a:hover { text-decoration: none; }
img { max-width: 100%; height: auto; }
code, pre { font-family: var(--font-mono); font-size: 0.9em; }
pre { overflow-x: auto; padding: var(--space-2); background: color-mix(in srgb, var(--fg) 6%, transparent); border-radius: 6px; }

.wrap { max-width: 46rem; margin-inline: auto; padding-inline: var(--space-2); }
.prose { max-width: var(--measure); }
.muted { color: var(--muted); }
hr { border: 0; border-top: 1px solid var(--rule); margin: var(--space-4) 0; }
```

- [ ] **Step 4: Create `src/components/ThemeToggle.astro`**

```astro
---
---
<button id="theme-toggle" class="ui" type="button" aria-label="Toggle color theme">◐</button>
<style>
  #theme-toggle {
    background: none; border: 1px solid var(--rule); border-radius: 6px;
    color: var(--fg); cursor: pointer; font-size: 1rem; line-height: 1;
    padding: 0.35rem 0.5rem;
  }
</style>
<script is:inline>
  (function () {
    const KEY = 'theme';
    const root = document.documentElement;
    const stored = localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
    const btn = document.getElementById('theme-toggle');
    btn?.addEventListener('click', function () {
      const isDark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#16161a'
        || root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
    });
  })();
</script>
```

- [ ] **Step 5: Create `src/components/Nav.astro`**

```astro
---
import { site, nav } from '../data/site';
import ThemeToggle from './ThemeToggle.astro';
const path = Astro.url.pathname;
---
<header class="wrap site-header">
  <a href="/" class="brand ui">{site.name}</a>
  <nav class="ui" aria-label="Primary">
    {nav.map((item) => (
      <a href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}</a>
    ))}
    <ThemeToggle />
  </nav>
</header>
<style>
  .site-header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--space-2); padding-block: var(--space-3); border-bottom: 1px solid var(--rule); }
  .brand { font-weight: 700; text-decoration: none; color: var(--fg); }
  nav { display: flex; align-items: center; gap: var(--space-2); font-size: 0.95rem; }
  nav a { color: var(--muted); text-decoration: none; }
  nav a:hover, nav a[aria-current='page'] { color: var(--fg); }
</style>
```

- [ ] **Step 6: Create `src/components/Footer.astro`**

```astro
---
import { site } from '../data/site';
const year = new Date().getFullYear();
---
<footer class="wrap site-footer ui">
  <div class="links">
    <a href={`mailto:${site.email}`}>Email</a>
    <a href={site.github}>GitHub</a>
    <a href={site.linkedin}>LinkedIn</a>
    <a href="/rss.xml">RSS</a>
  </div>
  <p class="muted">© {year} {site.name}</p>
</footer>
<style>
  .site-footer { display: flex; align-items: center; justify-content: space-between;
    gap: var(--space-2); flex-wrap: wrap; padding-block: var(--space-4);
    margin-top: var(--space-5); border-top: 1px solid var(--rule); font-size: 0.9rem; }
  .links { display: flex; gap: var(--space-2); }
  .links a { color: var(--muted); text-decoration: none; }
  .links a:hover { color: var(--fg); }
  p { margin: 0; }
</style>
```

- [ ] **Step 7: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import { site } from '../data/site';

interface Props { title: string; description?: string; ogType?: string; }
const { title, description = site.description, ogType = 'website' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary" />
    <link rel="alternate" type="application/rss+xml" title={site.title} href="/rss.xml" />
  </head>
  <body>
    <Nav />
    <main class="wrap">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 8: Replace `src/pages/index.astro` with real Home/About**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';
---
<BaseLayout title={site.title} description={site.description}>
  <section class="prose">
    <h1>{site.name}</h1>
    <!-- TODO(mark): replace with your real intro -->
    <p>
      I'm a software / data engineer who builds pragmatic systems and writes
      about what I learn. This is placeholder copy — swap it for a short intro
      about who you are, what you work on, and what you're looking for.
    </p>
    <p class="muted">
      Explore my <a href="/projects">projects</a>, read the
      <a href="/blog">blog</a>, or view my <a href="/resume">resume</a>.
    </p>
  </section>
</BaseLayout>
```

- [ ] **Step 9: Verify build & assert output**

Run: `npm run build`
Expected: exits 0. `dist/index.html` contains `Mark Le`, `Primary` (nav aria-label), and `theme-toggle`.

Run: `grep -q "theme-toggle" dist/index.html && grep -q "og:title" dist/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add base layout, nav, footer, theme toggle, and home page"
```

---

### Task 3: Content collections (blog + projects) with schemas and sample content

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.md`
- Create: `src/content/projects/sample-project.md`

**Interfaces:**
- Consumes: nothing.
- Produces: two typed collections queryable via `getCollection`:
  - `blog` entries: `data = { title: string; date: Date; description: string; draft: boolean }`, `id` = filename slug.
  - `projects` entries: `data = { title: string; description: string; tech: string[]; repo?: string; demo?: string; featured: boolean; order: number }`.
  - Blog entry bodies render via `render(entry)` → `{ Content }` (used in Task 4).

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects };
```

- [ ] **Step 2: Create sample post `src/content/blog/hello-world.md`**

```markdown
---
title: 'Hello, world'
date: 2026-07-22
description: 'A first post — why this blog exists and what I plan to write about.'
draft: false
---

<!-- TODO(mark): replace this sample post with your own writing -->

This is a sample post. I plan to use this space to write about the projects I
build and the decisions behind them.

## What to expect

Short, honest write-ups — what I tried, what worked, what I'd do differently.

```

- [ ] **Step 3: Create sample project `src/content/projects/sample-project.md`**

```markdown
---
title: 'Sample Project'
description: 'A placeholder project — replace with a real one you want to feature.'
tech: ['TypeScript', 'Astro']
repo: 'https://github.com/markqle'
featured: true
order: 1
---

<!-- TODO(mark): replace with a real project description -->

A longer description of the project can go here: the problem it solves, your
role, and notable technical details.
```

- [ ] **Step 4: Verify content schemas type-check**

Run: `npm run check`
Expected: exits 0, reports `0 errors`. (This runs `astro sync` which generates collection types, then type-checks.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add blog and projects content collections with sample content"
```

---

### Task 4: Blog index, post layout, and dynamic post pages

**Files:**
- Create: `src/layouts/PostLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

**Interfaces:**
- Consumes: `blog` collection from Task 3; `BaseLayout` from Task 2.
- Produces: routes `/blog` (index) and `/blog/<slug>` (one per non-draft post). `PostLayout` accepts props `{ title: string; date: Date; description: string }`.

- [ ] **Step 1: Create `src/layouts/PostLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
interface Props { title: string; date: Date; description: string; }
const { title, date, description } = Astro.props;
const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
---
<BaseLayout title={title} description={description} ogType="article">
  <article class="prose">
    <h1>{title}</h1>
    <p class="muted"><time datetime={date.toISOString()}>{dateStr}</time></p>
    <slot />
    <hr />
    <p class="muted"><a href="/blog">← All posts</a></p>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Create blog index `src/pages/blog/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Blog — Mark Le" description="Writing on projects and technical topics.">
  <section>
    <h1>Blog</h1>
    <ul class="post-list">
      {posts.map((post) => (
        <li>
          <a class="title" href={`/blog/${post.id}`}>{post.data.title}</a>
          <p class="muted meta">
            <time datetime={post.data.date.toISOString()}>
              {post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
            — {post.data.description}
          </p>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
<style>
  .post-list { list-style: none; padding: 0; }
  .post-list li { padding-block: var(--space-2); border-bottom: 1px solid var(--rule); }
  .title { font-family: var(--font-sans); font-weight: 650; font-size: 1.15rem; text-decoration: none; color: var(--fg); }
  .title:hover { color: var(--accent); }
  .meta { margin: 0.25rem 0 0; font-size: 0.95rem; }
</style>
```

- [ ] **Step 3: Create dynamic post page `src/pages/blog/[...slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<PostLayout title={post.data.title} date={post.data.date} description={post.data.description}>
  <Content />
</PostLayout>
```

- [ ] **Step 4: Build and assert blog output**

Run: `npm run build`
Expected: exits 0. Creates `dist/blog/index.html` and `dist/blog/hello-world/index.html`.

Run: `grep -q "Hello, world" dist/blog/index.html && grep -q "All posts" dist/blog/hello-world/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add blog index and dynamic post pages"
```

---

### Task 5: Projects page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/projects.astro`

**Interfaces:**
- Consumes: `projects` collection from Task 3; `BaseLayout` from Task 2.
- Produces: route `/projects`. `ProjectCard` accepts props `{ title: string; description: string; tech: string[]; repo?: string; demo?: string }`.

- [ ] **Step 1: Create `src/components/ProjectCard.astro`**

```astro
---
interface Props { title: string; description: string; tech: string[]; repo?: string; demo?: string; }
const { title, description, tech, repo, demo } = Astro.props;
---
<article class="card">
  <h2>{title}</h2>
  <p>{description}</p>
  {tech.length > 0 && (
    <ul class="tech ui">{tech.map((t) => <li>{t}</li>)}</ul>
  )}
  <p class="links ui">
    {repo && <a href={repo}>Code</a>}
    {demo && <a href={demo}>Demo</a>}
  </p>
</article>
<style>
  .card { padding-block: var(--space-3); border-bottom: 1px solid var(--rule); }
  .card h2 { margin: 0 0 var(--space-1); font-size: 1.3rem; }
  .card p { margin: 0 0 var(--space-1); }
  .tech { display: flex; flex-wrap: wrap; gap: 0.4rem; list-style: none; padding: 0; margin: var(--space-1) 0; }
  .tech li { font-size: 0.8rem; color: var(--muted); border: 1px solid var(--rule); border-radius: 999px; padding: 0.1rem 0.6rem; }
  .links { display: flex; gap: var(--space-2); font-size: 0.95rem; }
</style>
```

- [ ] **Step 2: Create `src/pages/projects.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout title="Projects — Mark Le" description="Selected projects and work.">
  <section>
    <h1>Projects</h1>
    <!-- TODO(mark): curate which projects appear; edit files in src/content/projects/ -->
    {projects.map((p) => (
      <ProjectCard
        title={p.data.title}
        description={p.data.description}
        tech={p.data.tech}
        repo={p.data.repo}
        demo={p.data.demo}
      />
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 3: Build and assert projects output**

Run: `npm run build`
Expected: exits 0. Creates `dist/projects/index.html`.

Run: `grep -q "Sample Project" dist/projects/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add projects page and project card"
```

---

### Task 6: Resume page + placeholder PDF

**Files:**
- Create: `src/pages/resume.astro`
- Create: `public/resume.pdf` (placeholder)

**Interfaces:**
- Consumes: `BaseLayout` from Task 2.
- Produces: route `/resume` with a download link to `/resume.pdf`.

- [ ] **Step 1: Create a placeholder `public/resume.pdf`**

Run:
```bash
printf '%%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\ntrailer<</Root 1 0 R>>\n%%%%EOF\n' > public/resume.pdf
```
Expected: creates `public/resume.pdf` that opens as a blank one-page PDF. (Owner replaces with the real resume.)

- [ ] **Step 2: Create `src/pages/resume.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Resume — Mark Le" description="Resume of Mark Le.">
  <section class="prose">
    <h1>Resume</h1>
    <p><a href="/resume.pdf">Download PDF</a></p>
    <!-- TODO(mark): fill in real resume content, or rely on the PDF above -->
    <h2>Experience</h2>
    <p class="muted">Placeholder — add roles, dates, and highlights.</p>
    <h2>Skills</h2>
    <p class="muted">Placeholder — list core skills and tools.</p>
    <h2>Education</h2>
    <p class="muted">Placeholder — add education.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Build and assert resume output**

Run: `npm run build`
Expected: exits 0. Creates `dist/resume/index.html` and copies `dist/resume.pdf`.

Run: `test -f dist/resume.pdf && grep -q "Download PDF" dist/resume/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add resume page with placeholder PDF"
```

---

### Task 7: RSS feed (sitemap already wired in Task 1)

**Files:**
- Create: `src/pages/rss.xml.ts`

**Interfaces:**
- Consumes: `blog` collection (Task 3); `site` config (Task 2); `Astro.site`.
- Produces: `/rss.xml` endpoint listing non-draft posts newest-first. Sitemap is already produced by the `@astrojs/sitemap` integration registered in Task 1.

- [ ] **Step 1: Create `src/pages/rss.xml.ts`**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

- [ ] **Step 2: Build and assert feeds**

Run: `npm run build`
Expected: exits 0. Creates `dist/rss.xml` and `dist/sitemap-index.xml`.

Run: `grep -q "Hello, world" dist/rss.xml && test -f dist/sitemap-index.xml && echo OK`
Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add RSS feed for blog"
```

---

### Task 8: GitHub Actions deploy workflow + README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: the buildable project (all prior tasks).
- Produces: CI that builds and deploys `dist/` to GitHub Pages on push to `main`.

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create `README.md`**

```markdown
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
```

- [ ] **Step 3: Final full verification**

Run: `npm run check && npm run build`
Expected: both exit 0; `check` reports `0 errors`.

Run: `git status --porcelain`
Expected: only untracked/modified are the two new files (workflow + README) before commit.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add GitHub Pages deploy workflow and README"
```

---

## Post-Plan Manual Steps (owner, outside this plan)

These require the owner's GitHub account and cannot be done by the build:

1. Create the GitHub repo named exactly `markqle.github.io` (public).
2. Add it as `origin` and push `main`.
3. Repo **Settings → Pages → Source → GitHub Actions**.
4. Wait for the deploy workflow to finish; site goes live at `https://markqle.github.io`.
5. Replace `TODO(mark)` placeholders and `public/resume.pdf` with real content.
