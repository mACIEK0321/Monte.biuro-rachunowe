import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'mlkhfxw8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  publishedAt: string
  body: any[]
}

export async function getSanityPosts(limit: number = 10): Promise<SanityPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc)[0...${limit}]`
  console.log('[Sanity] Fetching posts, limit:', limit)
  const posts = await client.fetch(query)
  console.log('[Sanity] Posts fetched:', posts.length)
  return posts
}

export async function getSanityPost(slug: string): Promise<SanityPost | null> {
  // Trim slug to handle any trailing spaces
  const cleanSlug = slug.trim()
  const query = `*[_type == "blogPost" && slug.current == $slug][0]`
  console.log('[Sanity] Fetching post by slug:', cleanSlug)
  const post = await client.fetch(query, { slug: cleanSlug })
  console.log('[Sanity] Post found:', !!post, post?.title)
  return post
}

export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "blogPost"]{ "slug": slug.current }`
  console.log('[Sanity] Fetching all slugs...')
  const slugs = await client.fetch(query)
  // Trim slugs to handle any trailing spaces
  const cleanSlugs = slugs.map((s: { slug: string }) => ({ slug: s.slug.trim() }))
  console.log('[Sanity] Slugs found:', cleanSlugs.length, cleanSlugs)
  return cleanSlugs
}

export function formatSanityDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getExcerptFromBody(body: any[], maxLength: number = 160): string {
  if (!body || body.length === 0) return 'Brak opisu'
  const firstBlock = body.find((block: any) => block._type === 'block')
  if (!firstBlock || !firstBlock.children) return 'Brak opisu'
  const text = firstBlock.children.map((child: any) => child.text || '').join('').trim()
  if (!text) return 'Brak opisu'
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text
}

export function getPostExcerpt(post: SanityPost, maxLength: number = 160): string {
  // If post has explicit excerpt, use it
  if (post.excerpt && post.excerpt.trim()) {
    const excerpt = post.excerpt.trim()
    return excerpt.length > maxLength ? excerpt.slice(0, maxLength).trim() + '...' : excerpt
  }
  // Otherwise generate from body
  return getExcerptFromBody(post.body, maxLength)
}