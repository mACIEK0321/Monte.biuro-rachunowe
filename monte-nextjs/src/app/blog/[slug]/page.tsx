import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatDate, getAllPostSlugs, getAuthorName, getFeaturedImageUrl, getPostBySlug, stripHtml } from '@/lib/wordpress';

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs(300);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const canonicalUrl = `https://montebiuro.pl/blog/${params.slug}`;

  try {
    const post = await getPostBySlug(params.slug, 300);
    if (!post) {
      return {
        title: 'Artykul nie znaleziony',
        alternates: { canonical: canonicalUrl },
      };
    }

    const postTitle = stripHtml(post.title.rendered);
    const excerpt = stripHtml(post.excerpt.rendered);
    const description =
      excerpt.length > 155 ? `${excerpt.slice(0, 155).trim()}...` : excerpt;
    const imageUrl = getFeaturedImageUrl(post);

    return {
      title: postTitle,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${postTitle} | Monte Biuro Rachunkowe`,
        description,
        type: 'article',
        url: canonicalUrl,
        publishedTime: post.date,
        modifiedTime: post.modified,
        ...(imageUrl ? { images: [{ url: imageUrl, alt: postTitle }] } : {}),
      },
    };
  } catch (error) {
    console.error(`Failed to generate metadata for [${params.slug}]:`, error);
    return {
      title: 'Blog',
      alternates: { canonical: canonicalUrl },
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;

  try {
    post = await getPostBySlug(params.slug, 300);
  } catch (error) {
    console.error(`Failed to load post [${params.slug}]:`, error);
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 className="section-title">Artykul chwilowo niedostepny</h1>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--gray)' }}>
            Wystapil blad pobierania danych z WordPress. Sprobuj ponownie za chwile.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/blog" className="btn btn-primary">
              Wroc do bloga
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    notFound();
  }

  const title = stripHtml(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date);
  const excerpt = stripHtml(post.excerpt.rendered);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt.length > 155 ? `${excerpt.slice(0, 155).trim()}...` : excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monte Biuro Rachunkowe',
    },
    ...(imageUrl ? { image: { '@type': 'ImageObject', url: imageUrl } } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="blog-article" style={{ paddingTop: '5rem' }}>
        {imageUrl && (
          <div className="blog-article-hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={title} />
          </div>
        )}

        <div className="container" style={{ maxWidth: '800px', marginTop: '3rem' }}>
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona glowna</Link>
            <span> / </span>
            <Link href="/blog">Blog</Link>
            <span> / </span>
            <span>{title}</span>
          </nav>

          <header className="blog-article-header">
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div className="blog-article-meta">
              <time dateTime={post.date}>{date}</time>
              {author && <span> · Autor: {author}</span>}
            </div>
          </header>

          <div
            className="blog-article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <div
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color, #e5e5e5)',
            }}
          >
            <Link href="/blog" className="blog-card-link">
              ← Wroc do listy artykulow
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
