import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { cache } from 'react'
import type { SiteLanguage } from './seo'
import { canonicalSlug, rawPostPath, slugCandidates, rewriteInternalLinks } from '../../seo-urls.cjs'
import { addServiceLink } from '../../service-links.cjs'

export const client = createClient({
  projectId: 'mlkhfxw8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export interface SanityPost {
  _id: string
  _updatedAt?: string
  seoTitle?: string
  seoDescription?: string
  translation?: { _ref: string }
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

// Published predicates shared by lists, articles, translations and sitemap.
// Errors propagate so ISR keeps the last successful render during CMS outages.
const published = `_type == "blogPost" && !(_id in path("drafts.**")) && defined(slug.current) && slug.current != "" && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))`;
const languageFilter = `(coalesce(language, "pl") == $lang)`;
const options = { next: { revalidate: 300 } };

function validPosts(posts: SanityPost[]): SanityPost[] {
  return posts.filter(post => typeof post.slug?.current === 'string' && post.slug.current.trim().length > 0).map(withCanonicalLinks);
}

function withCanonicalLinks(post: SanityPost): SanityPost {
  const language = post.language || 'pl';
  const body = rewriteInternalLinks(post.body, rawPostPath(post.slug.current, language));
  // The deployed page has the new links immediately; the guarded CMS migration persists them.
  return {...post, body: addServiceLink(body, canonicalSlug(post.slug.current, language), language)};
}

export const getSanityPostsByLang = cache(async (lang: string, limit?: number): Promise<SanityPost[]> => {
  const posts = validPosts(await client.fetch<SanityPost[]>(`*[${published} && ${languageFilter}] | order(publishedAt desc)`, {lang}, options));
  return limit === undefined ? posts : posts.slice(0, limit);
});
export const getSanityPosts = (limit?: number) => getSanityPostsByLang('pl', limit);

export const getSanityPostByLang = cache(async (slug: string, lang: string): Promise<SanityPost | null> => {
  const post = await client.fetch<SanityPost | null>(
    `*[${published} && ${languageFilter} && slug.current in $slugs] | order((slug.current == $canonical) desc)[0]`,
    {slugs: slugCandidates(slug, lang), canonical: canonicalSlug(slug, lang), lang}, options);
  return post ? withCanonicalLinks(post) : null;
});
export const getSanityPost = (slug: string) => getSanityPostByLang(slug, 'pl');

export async function getAllSanityPostSlugsByLang(lang: string): Promise<{slug: string}[]> {
  return (await getSanityPostsByLang(lang)).map(p => ({slug: canonicalSlug(p.slug.current, lang)}));
}
export const getAllSanityPostSlugs = () => getAllSanityPostSlugsByLang('pl');

const translationCandidates = cache(async (id: string, reference: string, lang: SiteLanguage): Promise<SanityPost[]> => {
  // Supports the existing internationalization plugin and explicit references.
  return validPosts(await client.fetch<SanityPost[]>(`*[${published} && coalesce(language, "pl") == $other][
    _id == $reference || translation._ref == $id ||
    _id in *[_type == "translation.metadata" && references($id)].translations[].value._ref
  ]`, {id, reference, other: lang === 'en' ? 'pl' : 'en'}, options));
});

export async function getPostTranslation(post: SanityPost): Promise<SanityPost | null> {
  const lang = post.language === 'en' ? 'en' : 'pl';
  const candidates = await translationCandidates(post._id, post.translation?._ref || '', lang);
  if (candidates.length !== 1) return null;
  const candidate = candidates[0];
  const reverse = await translationCandidates(candidate._id, candidate.translation?._ref || '', lang === 'pl' ? 'en' : 'pl');
  return reverse.length === 1 && reverse[0]._id === post._id ? candidate : null;
}

export const getSitemapPosts = cache(async (): Promise<SanityPost[]> =>
  validPosts(await client.fetch<SanityPost[]>(`*[${published} && coalesce(language, "pl") in ["pl", "en"]]{_id, slug, language, _updatedAt, publishedAt}`, {}, options))
);

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
