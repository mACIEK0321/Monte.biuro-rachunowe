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
  language?: string
  body: any[]
}

export interface SanityAuthor {
  _id: string
  name: string
  role?: string
  photo?: { asset: { _ref: string }; alt?: string }
  bio?: any[]
  shortBio?: string
  certifications?: string[]
  experience?: string
  education?: string
  language?: string
}

// ─────────────────────────────────────────────
// GROQ Queries (Document-Level i18n)
// Usage: *[_type == "blogPost" && language == $lang]
// ─────────────────────────────────────────────

/**
 * Fetch posts filtered by language (document-level i18n).
 * For legacy documents without a language field, falls back to all posts.
 */
export async function getSanityPosts(limit: number = 10): Promise<SanityPost[]> {
  // Fetch PL posts (legacy: no language field OR language == 'pl')
  const query = `*[_type == "blogPost" && (language == "pl" || !defined(language))] | order(publishedAt desc)[0...${limit}]`
  const posts = await client.fetch(query)
  return posts
}

export async function getSanityPostsByLang(lang: string, limit: number = 10): Promise<SanityPost[]> {
  const query = `*[_type == "blogPost" && language == $lang] | order(publishedAt desc)[0...${limit}]`
  const posts = await client.fetch(query, { lang })
  return posts
}

export async function getSanityPost(slug: string): Promise<SanityPost | null> {
  const cleanSlug = slug.trim()
  // Fallback: fetch any language (for PL blog which may have no language field)
  const query = `*[_type == "blogPost" && slug.current == $slug && (language == "pl" || !defined(language))][0]`
  console.log('[Sanity] Fetching post by slug:', cleanSlug)
  const post = await client.fetch(query, { slug: cleanSlug })
  console.log('[Sanity] Post found:', !!post, post?.title)
  return post
}

export async function getSanityPostByLang(slug: string, lang: string): Promise<SanityPost | null> {
  const cleanSlug = slug.trim()
  const query = `*[_type == "blogPost" && slug.current == $slug && language == $lang][0]`
  const post = await client.fetch(query, { slug: cleanSlug, lang })
  return post
}

export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "blogPost" && (language == "pl" || !defined(language))]{ "slug": slug.current }`
  const slugs = await client.fetch(query)
  // Trim slugs to handle any trailing spaces
  const cleanSlugs = slugs.map((s: { slug: string }) => ({ slug: s.slug.trim() }))
  console.log('[Sanity] Slugs found:', cleanSlugs.length, cleanSlugs)
  return cleanSlugs
}

export async function getAllSanityPostSlugsByLang(lang: string): Promise<{ slug: string }[]> {
  const query = `*[_type == "blogPost" && language == $lang]{ "slug": slug.current }`
  const slugs = await client.fetch(query, { lang })
  return slugs.map((s: { slug: string }) => ({ slug: s.slug.trim() }))
}

/**
 * Fetch author by slug and language.
 */
export async function getSanityAuthor(slug: string, lang: string = 'pl'): Promise<SanityAuthor | null> {
  const query = `*[_type == "author" && slug.current == $slug && language == $lang][0]`
  return client.fetch(query, { slug, lang })
}

/**
 * Fetch all authors for a given language.
 */
export async function getSanityAuthors(lang: string = 'pl'): Promise<SanityAuthor[]> {
  const query = `*[_type == "author" && language == $lang] | order(name asc)`
  return client.fetch(query, { lang })
}

export function formatSanityDate(dateString: string, locale: string = 'pl'): string {
  const date = new Date(dateString)
  const localeCode = locale === 'en' ? 'en-GB' : 'pl-PL'
  return date.toLocaleDateString(localeCode, {
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