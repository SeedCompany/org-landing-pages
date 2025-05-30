import { env } from 'node:process';
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
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: env.PROD,
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
});
