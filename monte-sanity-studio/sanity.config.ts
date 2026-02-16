import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'  // ← ZMIEŃ z './schemas' na './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Monte Biuro Blog',

  projectId: 'mlkhfxw8',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})