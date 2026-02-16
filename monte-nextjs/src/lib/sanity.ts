import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'mlkhfxw8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

export interface SanityPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt: string
  body: any[]
}

// Funkcja do pobierania postów
export async function getSanityPosts(limit: number = 10): Promise<SanityPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc)[0...${limit}]`
  return await client.fetch(query)
}

// Funkcja do pobierania pojedynczego posta
export async function getSanityPost(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]`
  return await client.fetch(query, { slug })
}

// Funkcja do pobierania wszystkich slugów (dla generateStaticParams)
export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "blogPost"]{ "slug": slug.current }`
  return await client.fetch(query)
}

// Pomocnicza funkcja do formatowania daty
export function formatSanityDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Pomocnicza funkcja do wyciągania excerpta z body (Portable Text)
export function getExcerptFromBody(body: any[], maxLength: number = 160): string {
  if (!body || body.length === 0) return ''
  
  const firstBlock = body.find((block: any) => block._type === 'block')
  if (!firstBlock) return ''
  
  const text = firstBlock.children
    ?.map((child: any) => child.text)
    .join('') || ''
  
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}