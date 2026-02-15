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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Fetch postów z WordPress API (zawsze świeże dane)
    getPosts(3)
      .then((wpPosts) => {
        if (cancelled) return;
        
        // Sprawdź czy to prawdziwe posty z WP czy fallback
        const mappedPosts = wpPosts.map(wpToBlogPost);
        setPosts(mappedPosts);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Blog fetch error:', err);
          setError('Nie udało się pobrać wpisów z bloga');
          setPosts([]);
        }
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
          /* ── Loading skeleton z animacją pulse ── */
          <div className="blog-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="blog-card skeleton-card">
                <div className="skeleton skeleton-image" />
                <div className="blog-card-content">
                  <div className="skeleton skeleton-text skeleton-date" />
                  <div className="skeleton skeleton-text skeleton-title" />
                  <div className="skeleton skeleton-text skeleton-excerpt" />
                  <div className="skeleton skeleton-text skeleton-excerpt" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* ── Empty state gdy brak postów ── */
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: 'var(--text-secondary)',
            fontSize: '1.125rem'
          }}>
            <p>Wkrótce pojawią się nowe artykuły</p>
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

        {!isLoading && posts.length > 0 && (
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
