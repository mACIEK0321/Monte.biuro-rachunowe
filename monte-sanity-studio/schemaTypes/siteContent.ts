import {defineType, defineField} from 'sanity'

/**
 * siteContent — manages translatable static page content (hero, about, etc.)
 * One document per language (pl, en).
 * Editors can create EN version via the Translation plugin's "Translate" button.
 */
export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Identyfikator / Identifier',
      type: 'string',
      description: 'Np. "homepage", "privacy-policy", "cookie-policy"',
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──
    defineField({
      name: 'heroTitle',
      title: 'Hero – Tytuł / Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero – Podtytuł / Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCta1',
      title: 'Hero – CTA Primary',
      type: 'string',
    }),
    defineField({
      name: 'heroCta2',
      title: 'Hero – CTA Secondary',
      type: 'string',
    }),

    // ── About section ──
    defineField({
      name: 'aboutTitle',
      title: 'O nas – Tytuł / About Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'O nas – Podtytuł / About Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody',
      title: 'O nas – Treść / About Body',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // ── Generic rich text (for privacy / cookies pages) ──
    defineField({
      name: 'body',
      title: 'Treść strony / Page Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({title, language}) {
      const lang = language ? `[${language.toUpperCase()}]` : ''
      return {
        title: `${lang} ${title || 'Untitled'}`,
      }
    },
  },
})
