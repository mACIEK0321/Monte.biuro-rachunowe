import Link from 'next/link';
import Image from 'next/image';
import {
  formatDate,
  getAuthorName,
  getFeaturedImageUrl,
  getPosts,
  stripHtml,
  type WPPost,
} from '@/lib/wordpress';

interface BlogCardModel {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

function mapPostToCard(post: WPPost): BlogCardModel {
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered).slice(0, 160),
    date: post.date,
    image: getFeaturedImageUrl(post) || '/images/blog/placeholder.jpg',
    author: getAuthorName(post),
  };
}

export default async function BlogSection() {
  let posts: BlogCardModel[] = [];
  let hasError = false;

  try {
    const wpPosts = await getPosts(3, 300);
    posts = wpPosts.map(mapPostToCard);
  } catch (error) {
    console.error('Failed to load blog section posts:', error);
    hasError = true;
  }

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h2 className="section-title">Aktualnosci i porady ksiegowe</h2>
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
            Nie udalo sie pobrac wpisow z bloga.
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
            Wkrotce pojawia sie nowe artykuly.
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card fade-in-scroll">
                <Link href={`/blog/${post.slug}`} className="blog-card-image">
                  <Image
                    src={post.image}
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
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    {post.author && <span className="blog-card-author"> · {post.author}</span>}
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Czytaj wiecej →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!hasError && posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/blog" className="btn btn-primary">
              Zobacz wszystkie artykuly
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
