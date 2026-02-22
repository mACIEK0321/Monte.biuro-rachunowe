import Link from 'next/link';
import Image from 'next/image';
import {
  getSanityPosts,
  urlFor,
  formatSanityDate,
  getPostExcerpt,
  type SanityPost,
} from '@/lib/sanity';

export default async function BlogSection() {
  let posts: SanityPost[] = [];
  let hasError = false;

  try {
    posts = await getSanityPosts(3);
  } catch (error) {
    console.error('Failed to load blog section posts:', error);
    hasError = true;
  }

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h2 className="section-title">Aktualności i porady księgowe</h2>
          <p className="section-subtitle">
            Praktyczne informacje o podatkach, ZUS i prowadzeniu firmy
          </p>
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
            Nie udało się pobrać wpisów z bloga.
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
            Wkrótce pojawią się nowe artykuły.
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                <Link href={`/blog/${post.slug.current}`} className="blog-card-image">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.mainImage.alt || post.title}
                      width={400}
                      height={250}
                      unoptimized
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
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                  )}
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt)}
                    </time>
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                  </h3>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={`/blog/${post.slug.current}`} className="blog-card-link">
                    Czytaj więcej →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!hasError && posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/blog" className="btn btn-primary">
              Zobacz wszystkie artykuły
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
