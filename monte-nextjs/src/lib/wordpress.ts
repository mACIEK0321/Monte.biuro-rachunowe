// WordPress Headless CMS API Service
// Pobiera posty z wp-json/wp/v2/posts?_embed

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
      avatar_urls?: Record<string, string>;
    }>;
  };
}

// KONFIGURACJA: ustaw `NEXT_PUBLIC_WP_API_URL` jako:
// - domenę WordPressa (np. https://example.com) albo
// - pełny endpoint (np. https://example.com/wp-json/wp/v2)
function normalizeWpApiUrl(rawUrl: string): string {
  const url = rawUrl.trim().replace(/\/+$/, '');
  if (!url) return url;

  if (url.includes('/wp-json/wp/v2')) return url;
  if (url.includes('/wp-json')) return `${url}/wp/v2`;
  return `${url}/wp-json/wp/v2`;
}

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL
  ? normalizeWpApiUrl(process.env.NEXT_PUBLIC_WP_API_URL)
  : null;

const FALLBACK_POSTS: WPPost[] = [
  {
    id: 1,
    slug: 'przewodnik-po-kpir-2026',
    title: { rendered: 'Przewodnik po KPiR w 2026 roku – co musisz wiedzieć' },
    excerpt: {
      rendered:
        '<p>Prowadzenie Księgi Przychodów i Rozchodów (KPiR) może wydawać się skomplikowane, ale z odpowiednim przewodnikiem to proste.</p>',
    },
    content: {
      rendered:
        '<p>Blog jest w przygotowaniu. Wkrótce pojawią się pełne artykuły z poradami księgowymi.</p>',
    },
    date: '2026-02-10',
    modified: '2026-02-10',
  },
  {
    id: 2,
    slug: 'zmiany-w-podatku-vat-2026',
    title: { rendered: 'Najważniejsze zmiany w VAT od stycznia 2026' },
    excerpt: {
      rendered:
        '<p>Nowy rok przyniósł istotne zmiany w rozliczeniach VAT. Sprawdź, co zmienia się dla przedsiębiorców.</p>',
    },
    content: {
      rendered:
        '<p>Blog jest w przygotowaniu. Wkrótce pojawią się pełne artykuły z poradami księgowymi.</p>',
    },
    date: '2026-01-15',
    modified: '2026-01-15',
  },
  {
    id: 3,
    slug: 'jak-wybrac-forme-opodatkowania',
    title: { rendered: 'Jak wybrać formę opodatkowania dla swojej firmy?' },
    excerpt: {
      rendered:
        '<p>Ryczałt, skala podatkowa czy podatek liniowy – która opcja będzie najlepsza dla Ciebie?</p>',
    },
    content: {
      rendered:
        '<p>Blog jest w przygotowaniu. Wkrótce pojawią się pełne artykuły z poradami księgowymi.</p>',
    },
    date: '2026-01-08',
    modified: '2026-01-08',
  },
];

/**
 * Pobiera listę postów z WordPress API
 */
export async function getPosts(perPage: number = 12): Promise<WPPost[]> {
  if (!WP_API_URL) return FALLBACK_POSTS.slice(0, perPage);

  try {
    const res = await fetch(
      `${WP_API_URL}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status} ${res.statusText}`);
      return FALLBACK_POSTS.slice(0, perPage);
    }

    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts : FALLBACK_POSTS.slice(0, perPage);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return FALLBACK_POSTS.slice(0, perPage);
  }
}

/**
 * Pobiera pojedynczy post po slug
 */
export async function getPostBySlug(
  slug: string
): Promise<WPPost | null> {
  if (!WP_API_URL) return FALLBACK_POSTS.find((p) => p.slug === slug) || null;

  try {
    const res = await fetch(
      `${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status} ${res.statusText}`);
      return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
    }

    const posts: WPPost[] = await res.json();
    return posts.length > 0
      ? posts[0]
      : FALLBACK_POSTS.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Pobiera listę slugów – potrzebne do generateStaticParams()
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const fallbackSlugs = FALLBACK_POSTS.map((p) => p.slug);
  if (!WP_API_URL) return fallbackSlugs;

  try {
    const res = await fetch(
      `${WP_API_URL}/posts?per_page=100&_fields=slug`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return fallbackSlugs;

    const posts: Array<{ slug: string }> = await res.json();
    const slugs = posts.map((p) => p.slug).filter(Boolean);
    return slugs.length > 0 ? slugs : fallbackSlugs;
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return fallbackSlugs;
  }
}

/**
 * Pomocnicze: wyciąga URL wyróżnionego obrazka z _embedded
 */
export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;

  return (
    media.media_details?.sizes?.large?.source_url ||
    media.media_details?.sizes?.full?.source_url ||
    media.source_url ||
    null
  );
}

/**
 * Pomocnicze: wyciąga imię autora z _embedded
 */
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Monte Biuro';
}

/**
 * Pomocnicze: formatuje datę na polski format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Pomocnicze: usuwa tagi HTML z excerpt
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
