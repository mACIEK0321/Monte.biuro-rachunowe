import { MetadataRoute } from 'next';
import { getAllSanityPostSlugs } from '@/lib/sanity';

const SITE_URL = 'https://www.montebiuro.pl';

const hreflangAlternates = {
  languages: {
    pl: 'https://www.montebiuro.pl/',
    en: 'https://www.montebiuro.pl/en/',
    'x-default': 'https://www.montebiuro.pl/',
  },
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: hreflangAlternates,
    },
    {
      url: `${SITE_URL}/en/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: hreflangAlternates,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/polityka-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    const posts = await getAllSanityPostSlugs();
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('Failed to generate sitemap from Sanity:', error);
    return staticPages;
  }
}
