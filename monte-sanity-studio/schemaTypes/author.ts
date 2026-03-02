import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Imię i nazwisko / Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rola / Role',
      type: 'string',
      description: 'np. Partner Zarządzający / Managing Partner',
    }),
    defineField({
      name: 'photo',
      title: 'Zdjęcie / Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny / Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biografia / Bio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Pełna biografia autora (obsługuje akapity i formatowanie)',
    }),
    defineField({
      name: 'shortBio',
      title: 'Krótka biografia / Short Bio',
      type: 'text',
      rows: 3,
      description: 'Krótki opis (1-2 zdania) do wyświetlenia przy artykułach',
    }),
    defineField({
      name: 'certifications',
      title: 'Certyfikaty / Certifications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Lista certyfikatów (np. Certyfikat MF nr 36393/2020, CFO Certificate)',
    }),
    defineField({
      name: 'experience',
      title: 'Doświadczenie / Experience',
      type: 'text',
      rows: 4,
      description: 'Kluczowe doświadczenie zawodowe',
    }),
    defineField({
      name: 'education',
      title: 'Wykształcenie / Education',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      language: 'language',
    },
    prepare({title, subtitle, media, language}) {
      const lang = language ? `[${language.toUpperCase()}]` : ''
      return {
        title: `${lang} ${title || 'Unnamed'}`,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
