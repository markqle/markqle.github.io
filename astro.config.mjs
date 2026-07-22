import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markqle.github.io',
  output: 'static',
  integrations: [sitemap()],
});
