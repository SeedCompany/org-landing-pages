import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { env } from 'node:process';
import { graphqlBabelPlugin as graphql } from './src/integrations/graphql/babel-plugin.js';
import { posthogAstro as posthog } from './src/integrations/posthog/posthog.astro-plugin.js';

export default defineConfig({
  integrations: [
    tailwind({
      // We import tw base styles in global.css - do not duplicate
      applyBaseStyles: false,
    }),
    react({
      babel: {
        plugins: [graphql],
      },
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      studioBasePath: '/studio',
      // Opt-in per environment (production only). The CDN is faster & cheaper under load,
      // but content edits can take ~30-60s to appear. Local dev & staging want instant edits.
      useCdn: env.PUBLIC_SANITY_USE_CDN === 'true',
    }),
    posthog(env.PUBLIC_POSTHOG_KEY, {
      api_host: env.PUBLIC_POSTHOG_API_HOST,
      ui_host: env.PUBLIC_POSTHOG_UI_HOST,
      defaults: '2025-05-24',
    }),
    icon({
      include: {
        lucide: ['check', 'heart', 'chevron-down', 'calendar', 'book', 'users'],
      },
    }),
  ],
  vite: {
    optimizeDeps: {
      // Found late by the dev server. A late find triggers a re-optimize and stale chunk names.
      include: ['@sanity/client', 'zod/v4/core'],
    },
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  session: {
    ...(env.REDIS_URL && {
      driver: 'redis',
      options: {
        url: env.REDIS_URL,
        base: env.REDIS_NS,
      },
    }),
  },
});
