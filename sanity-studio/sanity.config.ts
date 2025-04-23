import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';

export default defineConfig({
  name: 'default',
  title: 'seed-donate',

  projectId: 'fgpinugl',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), simplerColorInput()],

  schema: {
    types: schemaTypes,
  },
})
