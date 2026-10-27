export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'seoTitle', title: 'SEO title (nie zmienia nagłówka)', type: 'string',
      description: 'Tytuł dla wyszukiwarek. Suffix | MonTe dodaje strona. Puste pole używa istniejącego tytułu.'
    },
    {
      name: 'seoDescription', title: 'SEO description (nie zmienia streszczenia)', type: 'text', rows: 3,
      description: 'Opis dla wyszukiwarek; nie edytuje excerpt ani body.'
    },
    {
      name: 'translation', title: 'Potwierdzone tłumaczenie / Confirmed translation', type: 'reference',
      to: [{type: 'blogPost'}],
      description: 'Wybierz istniejący odpowiednik w drugim języku po sprawdzeniu treści. Nie twórz kopii.',
      options: {filter: ({document}) => ({filter: '_id != $id && coalesce(language, "pl") != $lang', params: {id: document._id.replace(/^drafts\./, ''), lang: document.language || 'pl'}})}
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/ł/g, 'l')
          .normalize('NFKD')
          .replace(/[\u0300-\u036f\u00ad]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 96)
          .replace(/-+$/, '')
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
