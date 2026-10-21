import { postMetadata, postSchema } from '@/lib/post-seo';
import { jsonLd } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import {
  getSanityPost,
  getAllSanityPostSlugs,
  urlFor,
  formatSanityDate,
} from '@/lib/sanity';

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 300;
export const dynamicParams = true; // Allow dynamic paths not in generateStaticParams

export async function generateStaticParams() {
  const slugs = await getAllSanityPostSlugs();
  return slugs.map(s => ({slug: s.slug}));
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  return postMetadata(await getSanityPost(slug), 'pl');
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
            sizes="(max-width: 800px) 100vw, 800px"

            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h2 className="article-original-h1" style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>{children}</h2>
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getSanityPost(slug);
  if (!post) notFound();

  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).url()
    : null;

  const schema = postSchema(post, 'pl');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
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

              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        <div className="container" style={{ maxWidth: '800px', marginTop: '3rem' }}>
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona główna</Link>
            <span> / </span>
            <Link href="/blog/">Blog</Link>
            <span> / </span>
            <span>{post.title}</span>
          </nav>

          <header className="blog-article-header">
            <h1>{post.title}</h1>
            <div className="blog-article-meta">
              <time dateTime={post.publishedAt}>{formatSanityDate(post.publishedAt)}</time>
            </div>
          </header>

          <div className="blog-article-content">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          <div
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color, #e5e5e5)',
            }}
          >
            <Link href="/blog/" className="blog-card-link">
              ← Wróć do listy artykułów
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
