import { wpFetchJson, wpFetchJsonSafe } from './wp';

export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

export async function getPosts(
  perPage: number = 100,
  revalidate: number = 300
): Promise<WPPost[]> {
  return wpFetchJson<WPPost[]>(
    `posts?_embed&per_page=${perPage}`,
    { revalidate, tags: ['blog-posts'] }
  );
}

export async function getPostBySlug(
  slug: string,
  revalidate: number = 300
): Promise<WPPost | null> {
  const posts = await wpFetchJson<WPPost[]>(
    `posts?slug=${encodeURIComponent(slug)}&_embed`,
    { revalidate, tags: ['blog-post', `blog-post-${slug}`] }
  );

  return posts[0] ?? null;
}

export async function getAllPostSlugs(revalidate: number = 300): Promise<string[]> {
  const posts = await wpFetchJsonSafe<Array<{ slug: string }>>(
    'posts?_embed&per_page=100&_fields=slug',
    { revalidate, tags: ['blog-slugs'] }
  );

  if (!posts) {
    return [];
  }

  return posts.map((post) => post.slug).filter(Boolean);
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) {
    return null;
  }

  return media.media_details?.sizes?.medium?.source_url || media.source_url || null;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Monte Biuro';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
