import Link from 'next/link';
import { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
  getFeaturedImageUrl,
  getAuthorName,
  formatDate,
  stripHtml,
} from '@/lib/wordpress';

interface BlogPostPageProps {
  params: { slug: string };
}

// Mock slugi jako fallback dla statycznego exportu
const MOCK_SLUGS = [
  'przewodnik-po-kpir-2026',
  'zmiany-w-podatku-vat-2026',
  'jak-wybrac-forme-opodatkowania',
];

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    // Jeśli API zwróci slugi, użyj ich; w przeciwnym razie użyj mocków
    return slugs.length > 0
      ? slugs.map((slug) => ({ slug }))
      : MOCK_SLUGS.map((slug) => ({ slug }));
  } catch {
    // Zawsze zwracaj przynajmniej mock slugi, żeby build się udał
    return MOCK_SLUGS.map((slug) => ({ slug }));
  }
}

// Zablokuj generowanie dynamicznych ścieżek poza tymi z generateStaticParams
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return { title: 'Artykuł nie znaleziony' };
    }

    const title = stripHtml(post.title.rendered);
    const description = stripHtml(post.excerpt.rendered).slice(0, 160);
    const imageUrl = getFeaturedImageUrl(post);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        ...(imageUrl && {
          images: [{ url: imageUrl, width: 1200, height: 630 }],
        }),
      },
    };
  } catch {
    return { title: 'Blog – Monte Biuro Rachunkowe' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;

  try {
    post = await getPostBySlug(params.slug);
  } catch {
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 className="section-title">Artykuł niedostępny</h1>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--gray)' }}>
            Nie udało się pobrać artykułu. Spróbuj ponownie później.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/blog" className="btn btn-primary">
              Wróć do bloga
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 className="section-title">Artykuł nie znaleziony</h1>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--gray)' }}>
            Szukany artykuł nie istnieje lub został usunięty.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/blog" className="btn btn-primary">
              Wróć do bloga
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const title = stripHtml(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: author || 'Monte Biuro Rachunkowe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monte Biuro Rachunkowe',
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="blog-article" style={{ paddingTop: '5rem' }}>
        {/* Featured Image - Full Width na samej górze */}
        {imageUrl && (
          <div className="blog-article-hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={title} />
          </div>
        )}

        <div className="container" style={{ maxWidth: '800px', marginTop: '3rem' }}>
          {/* Breadcrumb */}
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona główna</Link>
            <span> / </span>
            <Link href="/blog">Blog</Link>
            <span> / </span>
            <span>{title}</span>
          </nav>

          {/* Header - Tytuł + Data */}
          <header className="blog-article-header">
            <h1>{title}</h1>
            <div className="blog-article-meta">
              <time dateTime={post.date}>{date}</time>
              {author && <span> · Autor: {author}</span>}
            </div>
          </header>

          {/* Content z WordPress - automatyczne responsive images */}
          <div
            className="blog-article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Back link */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color, #e5e5e5)' }}>
            <Link href="/blog" className="blog-card-link">
              ← Wróć do listy artykułów
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
