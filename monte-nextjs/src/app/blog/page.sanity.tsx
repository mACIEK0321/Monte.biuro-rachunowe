import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSanityPosts, urlFor } from '@/lib/sanity';

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPageSanity() {
  let posts: any[] = [];
  let hasError = false;

  try {
    posts = await getSanityPosts(20);
  } catch (error) {
    console.error('Failed to load blog posts from Sanity:', error);
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
              <article key={post._id} className="blog-card fade-in-scroll">
                <Link href={`/blog/${post.slug.current}`} className="blog-card-image">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.mainImage.alt || post.title}
                      width={400}
                      height={250}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '12px',
                      }}
                    />
                  )}
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                  </h3>
                  <p>
                    {post.body &&
                      post.body
                        .find((block: any) => block._type === 'block')
                        ?.children?.map((child: any) => child.text)
                        .join('')
                        .slice(0, 160)}
                    ...
                  </p>
                  <Link href={`/blog/${post.slug.current}`} className="blog-card-link">
                    Czytaj wiecej →
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
