import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts, getFeaturedImageUrl, formatDate, stripHtml, getAuthorName } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog – aktualności i porady księgowe',
  description:
    'Blog biura rachunkowego Monte. Praktyczne porady o podatkach, ZUS, księgowości i prowadzeniu firmy. Bądź na bieżąco ze zmianami w przepisach.',
  openGraph: {
    title: 'Blog – Monte Biuro Rachunkowe',
    description:
      'Praktyczne porady o podatkach, ZUS, księgowości i prowadzeniu firmy.',
  },
};

export default async function BlogPage() {
  let posts;

  try {
    posts = await getPosts(50);
  } catch {
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle">
              Blog jest w przygotowaniu. Wkrótce pojawią się artykuły z
              poradami księgowymi.
            </p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/" className="btn btn-primary">
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">
            Aktualności i porady księgowe
          </h1>
            <p className="section-subtitle">
              Praktyczne informacje o podatkach, ZUS i prowadzeniu firmy
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="blog-grid blog-grid-full">
              {posts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post);
                const excerpt =
                  stripHtml(post.excerpt.rendered).slice(0, 200) + '...';
                const author = getAuthorName(post);

                return (
                  <article
                    key={post.id}
                    className="blog-card fade-in-scroll"
                  >
                    {imageUrl && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-image"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={stripHtml(post.title.rendered)}
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <time
                          className="blog-card-date"
                          dateTime={post.date}
                        >
                          {formatDate(post.date)}
                        </time>
                        {author && (
                          <span className="blog-card-author">
                            {' '}
                            · {author}
                          </span>
                        )}
                      </div>
                      <h2>
                        <Link href={`/blog/${post.slug}`}>
                          {stripHtml(post.title.rendered)}
                        </Link>
                      </h2>
                      <p>{excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-link"
                      >
                        Czytaj więcej →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
              Brak artykułów do wyświetlenia.
            </p>
          )}
        </div>
      </section>
  );
}
