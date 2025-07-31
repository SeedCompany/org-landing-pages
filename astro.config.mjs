import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'fgpinugl',
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: import.meta.env.PUBLIC_PROD === 'true',
      studioBasePath: '/studio',
    }),
    icon({
      include: {
        lucide: ['check', 'heart', 'chevron-down', 'calendar', 'book', 'users'],
      },
    }),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 4321,
    host: 'localhost',
  },
});