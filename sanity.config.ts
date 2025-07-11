import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { schemaTypes } from './src/schemaTypes';

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'fgpinugl',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), simplerColorInput()],

  schema: {
    types: schemaTypes,
  },
});
