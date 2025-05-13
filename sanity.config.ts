import { env } from 'node:process';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { schemaTypes } from './src/schemaTypes';

export default defineConfig({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,

  plugins: [structureTool(), visionTool(), simplerColorInput()],

  schema: {
    types: schemaTypes,
  },
});
