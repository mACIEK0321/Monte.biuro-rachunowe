import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import {
  getSanityPostByLang,
  getAllSanityPostSlugsByLang,
  urlFor,
  formatSanityDate,
  getPostExcerpt,
  type SanityPost,
} from '@/lib/sanity';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;
export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const slugs = await getAllSanityPostSlugsByLang('en');
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = `https://montebiuro.pl/en/blog/${slug}`;
  try {
    const post = await getSanityPostByLang(slug, 'en');
    if (!post) {
      return { title: 'Article not found', alternates: { canonical: canonicalUrl } };
    }
    const excerpt = getPostExcerpt(post, 155);
    const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(1200).url() : undefined;
    return {
      title: post.title,
      description: excerpt,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          pl: `https://montebiuro.pl/blog/${slug}`,
          en: canonicalUrl,
        },
      },
      openGraph: {
        title: `${post.title} | MonTe Certified Accounting Office`,
        description: excerpt,
        type: 'article',
        url: canonicalUrl,
        publishedTime: post.publishedAt,
        ...(imageUrl ? { images: [{ url: imageUrl, alt: post.title }] } : {}),
      },
    };
  } catch {
    return { title: 'Blog', alternates: { canonical: canonicalUrl } };
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
      <div style={{ margin: '2rem 0' }}>
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          width={800}
          height={500}
          unoptimized
          style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
        />
      </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontSize: '1.6rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export default async function BlogPostEnPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post: SanityPost | null = null;

  try {
    post = await getSanityPostByLang(slug, 'en');
  } catch (error) {
    console.error(`[EN Blog Page] Failed to load post [${slug}]:`, error);
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 className="section-title">Article temporarily unavailable</h1>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--gray)' }}>
            An error occurred. Please try again shortly.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/en/blog" className="btn btn-primary">Back to Blog</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!post) notFound();

  const imageUrl = post!.mainImage?.asset ? urlFor(post!.mainImage).width(1200).url() : null;
  const excerpt = getPostExcerpt(post!, 155);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post!.title,
    description: excerpt,
    datePublished: post!.publishedAt,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'MonTe Certified Accounting Office',
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
        {false && imageUrl && (
          <div className="blog-article-hero-image">
            <Image
              src={imageUrl!}
              alt={post!.mainImage?.alt || post!.title}
              width={1200}
              height={600}
              priority
              unoptimized
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
        <div className="container" style={{ maxWidth: '800px', marginTop: '3rem' }}>
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/en">Home</Link>
            <span> / </span>
            <Link href="/en/blog">Blog</Link>
            <span> / </span>
            <span>{post!.title}</span>
          </nav>
          <header className="blog-article-header">
            <h1>{post!.title}</h1>
            <div className="blog-article-meta">
              <time dateTime={post!.publishedAt}>{formatSanityDate(post!.publishedAt, 'en')}</time>
            </div>
          </header>
          <div className="blog-article-content">
            <PortableText value={post!.body} components={portableTextComponents} />
          </div>
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color, #e5e5e5)' }}>
            <Link href="/en/blog" className="blog-card-link">← Back to all articles</Link>
          </div>
        </div>
      </article>
    </>
  );
}
