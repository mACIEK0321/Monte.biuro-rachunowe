import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle', title: 'SEO title (nie zmienia nagłówka)', type: 'string',
      description: 'Tytuł dla wyszukiwarek. Suffix | MonTe dodaje strona. Puste pole używa istniejącego tytułu.',
    }),
    defineField({
      name: 'seoDescription', title: 'SEO description (nie zmienia streszczenia)', type: 'text', rows: 3,
      description: 'Opis dla wyszukiwarek; nie edytuje excerpt ani body.',
    }),
    defineField({
      name: 'translation', title: 'Potwierdzone tłumaczenie / Confirmed translation', type: 'reference',
      to: [{type: 'blogPost'}],
      description: 'Wybierz istniejący odpowiednik w drugim języku po sprawdzeniu treści. Nie twórz kopii. Można też użyć istniejącego powiązania we wtyczce tłumaczeń.',
      options: {filter: ({document}) => ({filter: '_id != $id && coalesce(language, "pl") != $lang', params: {id: document._id.replace(/^drafts\./, ''), lang: document.language || 'pl'}})},
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Tytuł / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Streszczenie / Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Krótki opis artykułu (160-200 znaków). Jeśli puste, zostanie automatycznie wygenerowane z treści.',
    }),
    defineField({
      name: 'author',
      title: 'Autor / Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Autor artykułu',
    }),
    defineField({
      name: 'mainImage',
      title: 'Główne zdjęcie / Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny / Alt text',
          type: 'string',
          description: 'Opis zdjęcia dla osób niewidomych i SEO',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji / Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Treść / Body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage',
      language: 'language',
    },
    prepare({title, subtitle, media, language}: {title?: string; subtitle?: string; media?: any; language?: string}) {
      const lang = language ? `[${language.toUpperCase()}]` : ''
      return {
        title: `${lang} ${title || 'Untitled'}`,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
