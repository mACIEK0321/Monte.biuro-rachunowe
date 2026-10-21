import type { MetadataRoute } from 'next';
import { getSitemapPosts } from '@/lib/sanity';
import { absoluteUrl, postPath, routePairs } from '@/lib/seo';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Failed CMS reads throw: ISR keeps the last good result, never a partial map.
  const posts = await getSitemapPosts();
  const entries: MetadataRoute.Sitemap = routePairs.flatMap(pair => pair.map(path => ({url: absoluteUrl(path)})));
  for (const post of posts) {
    const modified = post._updatedAt || post.publishedAt;
    entries.push({
      url: absoluteUrl(postPath(post.slug.current, post.language === 'en' ? 'en' : 'pl')),
      ...(modified && Number.isFinite(Date.parse(modified)) ? {lastModified: modified} : {}),
    });
  }
  return Array.from(new Map(entries.map(entry => [entry.url, entry])).values());
}
