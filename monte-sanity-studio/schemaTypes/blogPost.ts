export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Streszczenie (opcjonalne)',
      type: 'text',
      rows: 3,
      description: 'Krótki opis artykułu (160-200 znaków). Jeśli puste, zostanie automatycznie wygenerowane z treści.'
    },
    {
      name: 'mainImage',
      title: 'Główne zdjęcie',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis zdjęcia dla osób niewidomych i SEO'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'body',
      title: 'Treść',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage'
    }
  }
}