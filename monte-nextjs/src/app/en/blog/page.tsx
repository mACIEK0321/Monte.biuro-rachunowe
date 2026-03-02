import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  getSanityPostsByLang,
  urlFor,
  formatSanityDate,
  getPostExcerpt,
  type SanityPost,
} from '@/lib/sanity';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog – Accounting & Tax Advisory News',
  description:
    'Practical articles on accounting, taxes, social insurance and running a business in Poland. MonTe Certified Accounting Office.',
  alternates: {
    canonical: 'https://www.montebiuro.pl/en/blog',
    languages: {
      pl: 'https://www.montebiuro.pl/blog',
      en: 'https://www.montebiuro.pl/en/blog',
    },
  },
};

export default async function BlogEnPage() {
  let posts: SanityPost[] = [];
  let hasError = false;

  try {
    posts = await getSanityPostsByLang('en', 20);
  } catch (error) {
    console.error('Failed to load EN blog posts:', error);
    hasError = true;
  }

  return (
    <section className="section blog-section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">News & Accounting Tips</h1>
          <p className="section-subtitle">
            Practical information on taxes, social insurance (ZUS) and running a business in Poland
          </p>
        </div>

        {hasError ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Failed to load blog posts.</p>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>New articles will be published soon.</p>
            <p style={{ marginTop: '1rem' }}>
              In the meantime, you can read our{' '}
              <Link href="/blog" style={{ color: 'var(--primary, #00a86b)' }}>
                Polish articles
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                <Link
                  href={`/en/blog/${post.slug.current}`}
                  className="blog-card-image"
                >
                  {post.mainImage?.asset ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.mainImage.alt || post.title}
                      width={400}
                      height={250}
                      unoptimized
                      style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '12px' }}
                    />
                  ) : (
                    <Image
                      src="/images/blog/placeholder.jpg"
                      alt={post.title}
                      width={400}
                      height={250}
                      unoptimized
                      style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '12px' }}
                    />
                  )}
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt, 'en')}
                    </time>
                  </div>
                  <h3>
                    <Link href={`/en/blog/${post.slug.current}`}>{post.title}</Link>
                  </h3>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={`/en/blog/${post.slug.current}`} className="blog-card-link">
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
