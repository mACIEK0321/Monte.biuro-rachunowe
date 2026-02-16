import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getSanityPost, urlFor, client } from '@/lib/sanity';

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`);
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const canonicalUrl = `https://montebiuro.pl/blog/${params.slug}`;

  try {
    const post = await getSanityPost(params.slug);
    if (!post) {
      return {
        title: 'Artykul nie znaleziony',
        alternates: { canonical: canonicalUrl },
      };
    }

    const excerpt = post.body
      ?.find((block: any) => block._type === 'block')
      ?.children?.map((child: any) => child.text)
      .join('')
      .slice(0, 155) || '';

    const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined;

    return {
      title: post.title,
      description: excerpt,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${post.title} | Monte Biuro Rachunkowe`,
        description: excerpt,
        type: 'article',
        url: canonicalUrl,
        publishedTime: post.publishedAt,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch (error) {
    console.error('Failed to load post metadata:', error);
    return {
      title: 'Artykul nie znaleziony',
      alternates: { canonical: canonicalUrl },
    };
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div style={{ margin: '2rem 0' }}>
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={500}
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
    h1: ({ children }: any) => <h1 style={{ fontSize: '2.5rem', marginTop: '2rem' }}>{children}</h1>,
    h2: ({ children }: any) => <h2 style={{ fontSize: '2rem', marginTop: '1.5rem' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>{children}</h3>,
    normal: ({ children }: any) => <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{children}</p>,
  },
};

export default async function BlogPostPageSanity({ params }: BlogPostPageProps) {
  const post = await getSanityPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <article
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '8rem 2rem 4rem',
        }}
      >
        <Link
          href="/#blog"
          className="btn btn-secondary"
          style={{
            display: 'inline-block',
            marginBottom: '2rem',
            textDecoration: 'none',
          }}
        >
          ← Powrót do bloga
        </Link>

        <header style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            {post.title}
          </h1>
          <time
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
            }}
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
        </header>

        {post.mainImage && (
          <div style={{ marginBottom: '2rem' }}>
            <Image
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.mainImage.alt || post.title}
              width={800}
              height={500}
              priority
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
              }}
            />
          </div>
        )}

        <div
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
          }}
        >
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
    </main>
  );
}
