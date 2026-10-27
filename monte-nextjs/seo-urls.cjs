const migration = require('./seo-slugs.json');
const SITE_ORIGIN = 'https://www.montebiuro.pl';
const migrationDate = process.env.SEO_MIGRATION_DATE || migration.modifiedAt;
if (!Number.isFinite(Date.parse(migrationDate))) throw new Error('Invalid SEO_MIGRATION_DATE');

function rawPostPath(slug, language) {
  return `${language === 'en' ? '/en' : ''}/blog/${encodeURIComponent(slug.trim())}/`;
}

const redirectPairs = [
  ...migration.posts.map(post => ({from: rawPostPath(post.from, post.language), to: rawPostPath(post.to, post.language)})),
  ...migration.aliases,
];

function canonicalSlug(slug, language) {
  const clean = slug.trim();
  return migration.posts.find(post => post.language === language && post.from === clean)?.to || clean;
}

function slugCandidates(slug, language) {
  const canonical = canonicalSlug(slug, language);
  const post = migration.posts.find(post => post.language === language && post.to === canonical);
  return post ? [post.to, post.from] : [canonical];
}

function postModifiedAt(post) {
  const dates = [post._updatedAt, post.publishedAt].filter(value => value && Number.isFinite(Date.parse(value)));
  const language = post.language || 'pl';
  if (migration.posts.some(entry => entry.language === language && [entry.from, entry.to].includes(post.slug?.current))) {
    dates.push(migrationDate);
  }
  return dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0];
}

// Rewrite only known internal URLs. Preserve anchors, campaign parameters and external links.
function canonicalInternalHref(href, currentPath = '/') {
  if (typeof href !== 'string' || !href || href.startsWith('#') || href.startsWith('?')) return href;
  try {
    const url = new URL(href, new URL(currentPath, SITE_ORIGIN));
    if (!['http:', 'https:'].includes(url.protocol) || !['montebiuro.pl', 'www.montebiuro.pl'].includes(url.hostname)) return href;
    const path = url.pathname.replace(/\/+$/, '') + '/';
    const redirect = redirectPairs.find(entry => entry.from === path);
    if (!redirect) return href;
    const target = redirect.to + url.search + url.hash;
    return /^(https?:)?\/\//i.test(href) ? SITE_ORIGIN + target : target;
  } catch {
    return href;
  }
}

function rewriteInternalLinks(value, currentPath = '/') {
  if (Array.isArray(value)) return value.map(item => rewriteInternalLinks(item, currentPath));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
    (key === 'href' || key === 'url') && typeof item === 'string'
      ? canonicalInternalHref(item, currentPath)
      : rewriteInternalLinks(item, currentPath),
  ]));
}

module.exports = {migration, migrationDate, redirectPairs, rawPostPath, canonicalSlug, slugCandidates, postModifiedAt, canonicalInternalHref, rewriteInternalLinks};
