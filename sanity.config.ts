import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './src/schemaTypes';

const env = typeof process !== 'undefined' ? process.env : import.meta.env;

export default defineConfig({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool(), visionTool(), simplerColorInput(), media()],

  schema: {
    types: schemaTypes,
  },
});
