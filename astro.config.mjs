import { env } from 'node:process';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { posthogAstro as posthog } from './src/components/posthog/posthog.astro-plugin.js';
import { babelOptimizerPlugin } from '@graphql-codegen/client-preset';

export default defineConfig({
  integrations: [
    tailwind(),
    react({
      babel: {
        plugins: [
          [
            babelOptimizerPlugin,
            {
              artifactDirectory: './src/graphql/generated',
              gqlTagName: 'graphql',
            },
          ],
          //
        ],
      },
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      studioBasePath: '/studio',
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
