import { pageMetadata, postPath } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
import Link from 'next/link';
import {
  getSanityPosts,
  formatSanityDate,
  getPostExcerpt,
} from '@/lib/sanity';

export const revalidate = 300;

export const metadata = pageMetadata({title: 'Blog księgowy – podatki, ZUS i prowadzenie firmy', description: 'Artykuły MonTe o księgowości, podatkach, ZUS i prowadzeniu firmy. Poznaj praktyczne informacje dla przedsiębiorców i spółek.', path: '/blog/', lang: 'pl'});

export default async function BlogPage() {
  const posts = await getSanityPosts();

  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <PageSchema path="/blog/" title={'Blog księgowy – podatki, ZUS i prowadzenie firmy'} lang="pl" />
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">Aktualności i porady księgowe</h1>
          <p className="section-subtitle">
            Praktyczne informacje o podatkach, ZUS i prowadzeniu firmy
          </p>
        </div>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
            Brak artykułów do wyświetlenia.
          </p>
        ) : (
          <div className="blog-grid blog-grid-full">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt)}
                    </time>
                  </div>
                  <h2>
                    <Link href={postPath(post.slug.current, 'pl')}>
                      {post.title}
                    </Link>
                  </h2>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={postPath(post.slug.current, 'pl')} className="blog-card-link">
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
