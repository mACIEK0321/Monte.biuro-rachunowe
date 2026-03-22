import Link from 'next/link';
import Image from 'next/image';
import {
  getSanityPosts,
  getSanityPostsByLang,
  urlFor,
  formatSanityDate,
  getPostExcerpt,
  type SanityPost,
} from '@/lib/sanity';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/config';

export default async function BlogSection({ lang = 'pl', showImage = true }: { lang?: string; showImage?: boolean }) {
  const locale = (lang as Locale) || 'pl';
  const dict = getDictionary(locale);
  const b = dict.blog;

  let posts: SanityPost[] = [];
  let hasError = false;

  try {
    posts = locale === 'en'
      ? await getSanityPostsByLang('en', 3)
      : await getSanityPosts(3);
  } catch (error) {
    console.error('Failed to load blog section posts:', error);
    hasError = true;
  }

  const blogHref = locale === 'en' ? '/en/blog' : '/blog';
  const postHref = (slug: string) => locale === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{b.tag}</div>
          <h2 className="section-title">{b.title}</h2>
          <p className="section-subtitle">{b.subtitle}</p>
        </div>

        {hasError ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
            }}
          >
            {b.loadError}
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
            }}
          >
            {b.noPosts}
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                {showImage && (
                  <Link href={postHref(post.slug.current)} className="blog-card-image">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).url()}
                        alt={post.mainImage.alt || post.title}
                        width={400}
                        height={250}
                        unoptimized
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                    ) : (
                      <Image
                        src="/images/blog/placeholder.jpg"
                        alt={post.title}
                        width={400}
                        height={250}
                        unoptimized
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                    )}
                  </Link>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt, locale === 'en' ? 'en' : undefined)}
                    </time>
                  </div>
                  <h3>
                    <Link href={postHref(post.slug.current)}>{post.title}</Link>
                  </h3>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={postHref(post.slug.current)} className="blog-card-link">
                    {b.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!hasError && posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href={blogHref} className="btn btn-primary">
              {b.allPosts}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
