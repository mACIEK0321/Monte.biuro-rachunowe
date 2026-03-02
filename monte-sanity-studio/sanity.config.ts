import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

const I18N_SCHEMA_TYPES = ['blogPost', 'author', 'siteContent']

export default defineConfig({
  name: 'default',
  title: 'Monte Biuro Blog',

  projectId: 'mlkhfxw8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Treści / Content')
          .items([
            // ── Translations desk ──
            S.divider(),
            S.listItem()
              .title('Blog Posts (All Languages)')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .filter('_type == "blogPost"')
              ),
            S.listItem()
              .title('Authors (All Languages)')
              .child(
                S.documentList()
                  .title('Authors')
                  .filter('_type == "author"')
              ),
            S.listItem()
              .title('Site Content (All Languages)')
              .child(
                S.documentList()
                  .title('Site Content')
                  .filter('_type == "siteContent"')
              ),
            S.divider(),
            // ── By language ──
            S.listItem()
              .title('🇵🇱 Polski')
              .child(
                S.list()
                  .title('Treści PL')
                  .items([
                    S.listItem()
                      .title('Blog Posts PL')
                      .child(
                        S.documentList()
                          .title('Blog Posts PL')
                          .filter('_type == "blogPost" && language == "pl"')
                      ),
                    S.listItem()
                      .title('Authors PL')
                      .child(
                        S.documentList()
                          .title('Authors PL')
                          .filter('_type == "author" && language == "pl"')
                      ),
                    S.listItem()
                      .title('Site Content PL')
                      .child(
                        S.documentList()
                          .title('Site Content PL')
                          .filter('_type == "siteContent" && language == "pl"')
                      ),
                  ])
              ),
            S.listItem()
              .title('🇬🇧 English')
              .child(
                S.list()
                  .title('Content EN')
                  .items([
                    S.listItem()
                      .title('Blog Posts EN')
                      .child(
                        S.documentList()
                          .title('Blog Posts EN')
                          .filter('_type == "blogPost" && language == "en"')
                      ),
                    S.listItem()
                      .title('Authors EN')
                      .child(
                        S.documentList()
                          .title('Authors EN')
                          .filter('_type == "author" && language == "en"')
                      ),
                    S.listItem()
                      .title('Site Content EN')
                      .child(
                        S.documentList()
                          .title('Site Content EN')
                          .filter('_type == "siteContent" && language == "en"')
                      ),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['blogPost', 'author', 'siteContent'].includes(listItem.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'pl', title: 'Polski'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: I18N_SCHEMA_TYPES,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})