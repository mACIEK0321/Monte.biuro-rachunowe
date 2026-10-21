import { pageMetadata, postPath } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
import Link from 'next/link';
import {
  getSanityPostsByLang,
  formatSanityDate,
  getPostExcerpt,
} from '@/lib/sanity';

export const revalidate = 300;

export const metadata = pageMetadata({title: 'Accounting & Tax in Poland – Blog', description: 'MonTe articles on accounting, taxes, social insurance and running a business in Poland. Practical information for entrepreneurs and companies.', path: '/en/blog/', lang: 'en'});

export default async function BlogEnPage() {
  const posts = await getSanityPostsByLang('en');

  return (
    <section className="section blog-section" style={{ paddingTop: '5rem' }}>
      <PageSchema path="/en/blog/" title={'Accounting & Tax in Poland – Blog'} lang="en" />
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">News & Accounting Tips</h1>
          <p className="section-subtitle">
            Practical information on taxes, social insurance (ZUS) and running a business in Poland
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>New articles will be published soon.</p>
            <p style={{ marginTop: '1rem' }}>
              In the meantime, you can read our{' '}
              <Link href="/blog/" style={{ color: 'var(--primary, #00a86b)' }}>
                Polish articles
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post._id} className="blog-card fade-in-scroll">
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.publishedAt}>
                      {formatSanityDate(post.publishedAt, 'en')}
                    </time>
                  </div>
                  <h3>
                    <Link href={postPath(post.slug.current, 'en')}>{post.title}</Link>
                  </h3>
                  <p>{getPostExcerpt(post)}</p>
                  <Link href={postPath(post.slug.current, 'en')} className="blog-card-link">
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
