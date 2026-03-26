import { getAllSanityPostSlugs } from '@/lib/sanity';

const SITE_URL = 'https://www.montebiuro.pl';

function hreflangLinks(plUrl: string, enUrl: string): string {
  return `
    <xhtml:link rel="alternate" hreflang="pl" href="${plUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${plUrl}"/>`;
}

export const revalidate = 3600;

export async function GET() {
  let blogEntries = '';

  try {
    const posts = await getAllSanityPostSlugs();
    blogEntries = posts
      .map(
        (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
      )
      .join('');
  } catch {
    // Sanity niedostępne — pomijamy wpisy blogowe
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${hreflangLinks(`${SITE_URL}/`, `${SITE_URL}/en/`)}
  </url>
  <url>
    <loc>${SITE_URL}/en/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>${hreflangLinks(`${SITE_URL}/`, `${SITE_URL}/en/`)}
  </url>
  <url>
    <loc>${SITE_URL}/blog/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/polityka-prywatnosci/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/polityka-cookies/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>${blogEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
