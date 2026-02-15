'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getPosts,
  getFeaturedImageUrl,
  getAuthorName,
  stripHtml,
  formatDate,
  type WPPost,
} from '@/lib/wordpress';

/* ── Mock Data (fallback gdy WordPress API jest niedostępne) ── */
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'przewodnik-po-kpir-2026',
    title: 'Przewodnik po KPiR w 2026 roku – co musisz wiedzieć',
    excerpt:
      'Prowadzenie Księgi Przychodów i Rozchodów (KPiR) może wydawać się skomplikowane, ale z odpowiednim przewodnikiem to proste. Sprawdź najważniejsze zasady obowiązujące w 2026 roku.',
    date: '2026-02-10',
    image: '/images/blog/kpir-guide.jpg',
    author: 'Anna Kowalska',
  },
  {
    id: 2,
    slug: 'zmiany-w-podatku-vat-2026',
    title: 'Najważniejsze zmiany w VAT od stycznia 2026',
    excerpt:
      'Nowy rok przyniósł istotne zmiany w rozliczeniach VAT. Sprawdź, co zmienia się dla przedsiębiorców i jak przygotować się na nowe obowiązki związane z JPK_VAT.',
    date: '2026-01-15',
    image: '/images/blog/vat-changes.jpg',
    author: 'Katarzyna Nowak',
  },
  {
    id: 3,
    slug: 'jak-wybrac-forme-opodatkowania',
    title: 'Jak wybrać formę opodatkowania dla swojej firmy?',
    excerpt:
      'Wybór formy opodatkowania to jedna z najważniejszych decyzji przy rozpoczynaniu działalności. Ryczałt, skala podatkowa czy podatek liniowy – która opcja będzie najlepsza dla Ciebie?',
    date: '2026-01-08',
    image: '/images/blog/tax-forms.jpg',
    author: 'Anna Kowalska',
  },
];

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

/** Mapuje WPPost z wordpress.ts → uproszczony BlogPost */
function wpToBlogPost(post: WPPost): BlogPost {
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

/* ────────────────────── Komponent ────────────────────── */

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPosts(3)
      .then((wpPosts) => {
        if (cancelled) return;
        // Jeśli API zwróciło posty — mapuj; inaczej fallback
        setPosts(wpPosts.length > 0 ? wpPosts.map(wpToBlogPost) : MOCK_POSTS);
      })
      .catch(() => {
        if (!cancelled) setPosts(MOCK_POSTS);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

        {isLoading ? (
          /* ── Loading skeleton ── */
          <div className="blog-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="blog-card fade-in-scroll">
                <div
                  style={{
                    background: 'var(--light-bg)',
                    height: '200px',
                    borderRadius: '12px',
                    marginBottom: '1.25rem',
                  }}
                />
                <div className="blog-card-content">
                  <div style={{ height: '12px', background: 'var(--light-bg)', borderRadius: '4px', marginBottom: '0.75rem', width: '40%' }} />
                  <div style={{ height: '24px', background: 'var(--light-bg)', borderRadius: '4px', marginBottom: '0.75rem' }} />
                  <div style={{ height: '60px', background: 'var(--light-bg)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Blog cards ── */
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
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = '/images/blog/placeholder.jpg';
                    }}
                  />
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-card-date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    {post.author && (
                      <span className="blog-card-author"> · {post.author}</span>
                    )}
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Czytaj więcej →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/blog" className="btn btn-primary">
            Zobacz wszystkie artykuły
          </Link>
        </div>
      </div>
    </section>
  );
}
