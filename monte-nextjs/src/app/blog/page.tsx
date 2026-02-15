import Link from 'next/link';
import { Metadata } from 'next';
import {
  getAuthorName,
  getFeaturedImageUrl,
  getPosts,
  formatDate,
  stripHtml,
  type WPPost,
} from '@/lib/wordpress';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog - aktualnosci i porady ksiegowe',
  description:
    'Blog biura rachunkowego Monte. Praktyczne porady o podatkach, ZUS, ksiegowosci i prowadzeniu firmy.',
  alternates: {
    canonical: 'https://montebiuro.pl/blog',
  },
  openGraph: {
    title: 'Blog | Monte Biuro Rachunkowe',
    description:
      'Praktyczne porady o podatkach, ZUS, ksiegowosci i prowadzeniu firmy.',
    type: 'website',
    url: 'https://montebiuro.pl/blog',
  },
};

export default async function BlogPage() {
  let posts: WPPost[] = [];
  let hasError = false;

  try {
    posts = await getPosts(100, 300);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    hasError = true;
  }

  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">Aktualnosci i porady ksiegowe</h1>
          <p className="section-subtitle">
            Praktyczne informacje o podatkach, ZUS i prowadzeniu firmy
          </p>
        </div>

        {hasError ? (
          <div style={{ textAlign: 'center', color: 'var(--gray)' }}>
            <p>Nie udalo sie pobrac artykulow. Sprobuj ponownie za chwile.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/" className="btn btn-primary">
                Wroc na strone glowna
              </Link>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
            Brak artykulow do wyswietlenia.
          </p>
        ) : (
          <div className="blog-grid blog-grid-full">
            {posts.map((post) => {
              const imageUrl = getFeaturedImageUrl(post);
              const author = getAuthorName(post);

              return (
                <article key={post.id} className="blog-card fade-in-scroll">
                  {imageUrl && (
                    <Link href={`/blog/${post.slug}`} className="blog-card-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt={stripHtml(post.title.rendered)} loading="lazy" />
                    </Link>
                  )}
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <time className="blog-card-date" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      {author && <span className="blog-card-author"> · {author}</span>}
                    </div>
                    <h2>
                      <Link href={`/blog/${post.slug}`}>
                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </Link>
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <Link href={`/blog/${post.slug}`} className="blog-card-link">
                      Czytaj wiecej →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
