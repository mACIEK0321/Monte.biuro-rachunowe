import type { MetadataRoute } from 'next';
import { getSitemapPosts } from '@/lib/sanity';
import { absoluteUrl, postPath, routePairs } from '@/lib/seo';
import { migrationDate, postModifiedAt } from '../../seo-urls.cjs';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Failed CMS reads throw: ISR keeps the last good result, never a partial map.
  const posts = await getSitemapPosts();
  // Fixed release dates, not the time of each request/rebuild. Update the migration
  // date via SEO_MIGRATION_DATE if this release is deployed on a later date.
  const changedPages = new Set(['/', '/en/', '/blog/', '/en/blog/', '/polityka-cookies/', '/en/cookie-policy/']);
  const newestPost = posts.map(postModifiedAt).filter(Boolean).sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  const entries: MetadataRoute.Sitemap = routePairs.flatMap(pair => pair.map(path => ({
    url: absoluteUrl(path),
    lastModified: changedPages.has(path)
      ? (['/', '/en/', '/blog/', '/en/blog/'].includes(path) && newestPost && Date.parse(newestPost) > Date.parse(migrationDate) ? newestPost : migrationDate)
      : '2026-10-21',
  })));
  for (const post of posts) {
    const modified = postModifiedAt(post);
    entries.push({
      url: absoluteUrl(postPath(post.slug.current, post.language === 'en' ? 'en' : 'pl')),
      ...(modified && Number.isFinite(Date.parse(modified)) ? {lastModified: modified} : {}),
    });
  }
  return Array.from(new Map(entries.map(entry => [entry.url, entry])).values());
}
