import { notFound } from 'next/navigation';
import { getPostTranslation, getPostExcerpt, urlFor, type SanityPost } from './sanity';
import { absoluteUrl, ORGANIZATION_ID, pageMetadata, postPath, SITE_URL, type SiteLanguage } from './seo';

export async function postMetadata(post: SanityPost | null, lang: SiteLanguage) {
  if (!post) notFound();
  const translation = await getPostTranslation(post);
  return pageMetadata({
    title: post.seoTitle?.trim() || post.title,
    description: post.seoDescription?.trim() || getPostExcerpt(post, 155),
    path: postPath(post.slug.current, lang), lang,
    alternate: translation ? postPath(translation.slug.current, lang === 'en' ? 'pl' : 'en') : undefined,
    image: post.mainImage?.asset ? urlFor(post.mainImage).width(1200).url() : undefined,
    article: {published: post.publishedAt, modified: post._updatedAt},
  });
}

export function postSchema(post: SanityPost, lang: SiteLanguage) {
  const url = absoluteUrl(postPath(post.slug.current, lang));
  const home = lang === 'en' ? '/en/' : '/';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'WebPage', '@id': `${url}#webpage`, url, name: post.title, inLanguage: lang, isPartOf: {'@id': `${SITE_URL}/#website`}, breadcrumb: {'@id': `${url}#breadcrumbs`}},
      {
        '@type': 'BlogPosting', '@id': `${url}#article`, url,
        headline: post.title, description: getPostExcerpt(post, 155),
        mainEntityOfPage: {'@id': `${url}#webpage`}, inLanguage: lang,
        datePublished: post.publishedAt, dateModified: post._updatedAt,
        publisher: {'@id': ORGANIZATION_ID},
        image: post.mainImage?.asset ? urlFor(post.mainImage).width(1200).url() : `${SITE_URL}/og-image.jpg`,
      },
      {'@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: [
        {'@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Strona główna', item: absoluteUrl(home)},
        {'@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl(`${home}blog/`)},
        {'@type': 'ListItem', position: 3, name: post.title, item: url},
      ]},
    ],
  };
}
