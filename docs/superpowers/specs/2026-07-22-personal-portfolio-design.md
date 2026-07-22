# Personal Portfolio + Blog — Design

**Date:** 2026-07-22
**Repo:** `markqle.github.io` (GitHub Pages user site)
**Owner:** markqle (mark@belamourllc.com)

## Purpose

A minimalist personal portfolio and blog. Two jobs:

1. **Job applications** — present who I am, what I do, and my key projects to recruiters and hiring managers.
2. **Blog** — share thoughts on projects and technical topics.

Success = a fast, clean, easy-to-maintain static site I can update by editing Markdown, deployed automatically to `markqle.github.io`.

## Stack & Hosting

- **Astro** (latest v5), TypeScript, using content collections for the blog and projects.
- **Zero-to-minimal client JS** — static HTML/CSS output. The only interactive JS is a small light/dark theme toggle.
- **Styling:** hand-written CSS with design tokens (CSS custom properties). No Tailwind / UI kit — keeps output lightweight and the aesthetic fully controlled.
- **Hosting:** GitHub Pages via a GitHub Actions workflow (`.github/workflows/deploy.yml`) deploying from `main`.
- **URL:** root `https://markqle.github.io` (user site). Astro `site` set to that URL; **no** `base` path.

## Aesthetic — Typographic / Editorial

- Refined type: a serif for headings and prose + a clean sans for UI chrome. Fonts either **system stacks** or **self-hosted** — no third-party font requests (privacy + speed).
- Generous whitespace, single readable prose column (~65ch measure).
- Restrained accent color; supports **light and dark mode** (respects `prefers-color-scheme`, with a manual toggle that persists via `localStorage`).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home/About — short intro, what I do, links to Projects/Blog/Resume, contact links (email, GitHub, LinkedIn). |
| `/projects` | Featured projects — title, blurb, tech tags, repo/demo links. |
| `/blog` | Blog index — list of posts (title, date, excerpt), newest first. |
| `/blog/[slug]` | Individual post rendered from Markdown, reading-optimized typography. |
| `/resume` | Resume content in Markdown + link to a downloadable PDF (placeholder PDF for now). |

## Content Model

- **Blog posts:** `src/content/blog/*.md`, frontmatter: `title`, `date`, `description`, `draft` (boolean). One sample post included. Drafts excluded from production builds.
- **Projects:** `src/content/projects/*.md`, frontmatter: `title`, `description`, `tech` (string[]), `repo` (url), `demo` (url, optional), `featured` (boolean), `order` (number).
- **Resume:** `src/pages/resume` content authored in Markdown; PDF at `public/resume.pdf` (placeholder).
- All bio / project / resume copy ships as **clearly-marked placeholder text** the owner edits later.

## Components / Structure

- `BaseLayout.astro` — html head (SEO/OG tags), header nav, footer, theme handling.
- `PostLayout.astro` — wraps a blog post (title, date, prose container).
- `Nav.astro`, `Footer.astro`, `ThemeToggle.astro`, `ProjectCard.astro`.
- Design tokens in a single `src/styles/tokens.css`; global styles in `src/styles/global.css`.

## SEO & Feeds (minimal)

- Per-page `<title>` and meta description.
- Open Graph / Twitter card tags.
- `sitemap.xml` (via `@astrojs/sitemap`).
- `rss.xml` for the blog (via `@astrojs/rss`).

## Out of Scope (YAGNI)

Comments, analytics, full-text search, tags/categories, pagination, CMS. All easy to add later if wanted.

## Testing / Verification

- `astro check` (type + content-schema validation) passes.
- `astro build` produces a static `dist/` with no errors.
- Local `astro preview` — every route renders, nav works, theme toggle works, blog post renders from Markdown, RSS and sitemap generate.
- Links (email/GitHub/LinkedIn/repo) resolve to the right targets (placeholders clearly marked).

## Deployment Flow

1. Push to `main`.
2. GitHub Actions builds with Astro's official Pages workflow and publishes `dist/` to Pages.
3. Site live at `https://markqle.github.io`.
