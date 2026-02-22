import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getSanityPosts,
  urlFor,
  formatSanityDate,
  getPostExcerpt,
  type SanityPost,
} from '@/lib/sanity';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog - aktualności i porady księgowe',
  description:
    'Blog biura rachunkowego MonTe. Praktyczne porady o podatkach, ZUS, księgowości i prowadzeniu firmy.',
  alternates: {
    canonical: 'https://montebiuro.pl/blog',
  },
  openGraph: {
    title: 'Blog | Monte Biuro Rachunkowe',
    description:
      'Praktyczne porady o podatkach, ZUS, księgowości i prowadzeniu firmy.',
    type: 'website',
    url: 'https://montebiuro.pl/blog',
  },
};

export default async function BlogPage() {
  let posts: SanityPost[] = [];
  let hasError = false;

  try {
    posts = await getSanityPosts(100);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    hasError = true;
  }

  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">Aktualności i porady księgowe</h1>
          <p className="section-subtitle">
            Praktyczne informacje o podatkach, ZUS i prowadzeniu firmy
          </p>
        </div>

        {hasError ? (
          <div style={{ textAlign: 'center', color: 'var(--gray)' }}>
            <p>Nie udało się pobrać artykułów. Spróbuj ponownie za chwilę.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/" className="btn btn-primary">
                Wróć na stronę główną
              </Link>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
            Brak artykułów do wyświetlenia.
          </p>
        ) : (
          <div className="blog-grid blog-grid-full">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                {post.mainImage ? (
                  <Link href={`/blog/${post.slug.current}`} className="blog-card-image">
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
                  </Link>
                ) : (
                  <Link href={`/blog/${post.slug.current}`} className="blog-card-image">
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
                  </Link>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt)}
                    </time>
                  </div>
                  <h2>
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={`/blog/${post.slug.current}`} className="blog-card-link">
                    Czytaj więcej →
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
