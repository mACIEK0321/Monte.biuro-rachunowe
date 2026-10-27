// Dry-run is the default. Apply only AFTER deploying the compatible frontend.
const {createClient} = require('@sanity/client');
const {writeFileSync, mkdirSync, readFileSync} = require('node:fs');
const path = require('node:path');
const {migration, canonicalSlug, rawPostPath, rewriteInternalLinks} = require('../seo-urls.cjs');
const {checkRedirects} = require('./check-redirects.cjs');
const {services, addServiceLink} = require('../service-links.cjs');

async function main() {
  const apply = process.argv.includes('--apply');
  const withServices = process.argv.includes('--with-service-links');
  if (process.argv.slice(2).some(arg => !['--apply', '--dry-run', '--use-sanity-login', '--with-service-links'].includes(arg))) throw new Error('Use --dry-run or --apply, optionally with --use-sanity-login and --with-service-links');
  let token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
  if (!token && process.argv.includes('--use-sanity-login')) {
    const config = path.join(process.env.XDG_CONFIG_HOME || path.join(require('node:os').homedir(), '.config'), 'sanity', 'config.json');
    token = JSON.parse(readFileSync(config, 'utf8')).authToken;
  }
  if (apply && !token) throw new Error('Set SANITY_API_TOKEN locally or use --use-sanity-login with an existing Sanity CLI session. Never commit tokens.');
  const client = createClient({projectId: 'mlkhfxw8', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, perspective: 'raw', token});
  const docs = await client.fetch('*[_type == "blogPost" && !(_id in path("versions.**"))]');
  const plans = [];
  for (const entry of migration.posts) {
    const published = docs.filter(doc => !doc._id.startsWith('drafts.') && (doc.language || 'pl') === entry.language && [entry.from, entry.to].includes(doc.slug?.current));
    if (published.length !== 1) throw new Error(`Expected exactly one published article: ${entry.language}/${entry.from}; found ${published.length}`);
  }
  const owners = new Map();
  for (const doc of docs) {
    if (!doc.slug?.current) continue;
    const language = doc.language || 'pl';
    const slug = canonicalSlug(doc.slug.current, language);
    const key = `${language}/${slug}`;
    const id = doc._id.replace(/^drafts\./, '');
    if (owners.has(key) && owners.get(key) !== id) throw new Error(`Slug collision: ${key}`);
    owners.set(key, id);
    const rewritten = rewriteInternalLinks(doc.body, rawPostPath(doc.slug.current, language));
    const body = withServices ? addServiceLink(rewritten, slug, language) : rewritten;
    const set = {};
    if (slug !== doc.slug.current) set['slug.current'] = slug;
    if (JSON.stringify(body) !== JSON.stringify(doc.body)) set.body = body;
    if (Object.keys(set).length) plans.push({doc, set});
  }
  console.log(`${apply ? 'APPLY' : 'DRY RUN'}: ${docs.length} documents; ${plans.length} changes.`);
  for (const {doc, set} of plans) console.log(`${doc._id}: ${doc.slug.current} -> ${set['slug.current'] || '(slug unchanged)'}${set.body ? ' + internal links' : ''}`);
  if (!apply || !plans.length) return;
  await checkRedirects(); // Refuse a migration while live redirects or target pages are missing.
  if (withServices) {
    for (const service of services) {
      const url = 'https://www.montebiuro.pl' + service.path;
      const response = await fetch(url, {redirect:'manual', signal:AbortSignal.timeout(20000)});
      const html = await response.text();
      if (response.status !== 200 || !html.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`Deploy service page first: ${url}`);
    }
  }
  const backupDir = path.join(__dirname, '..', '.seo-migration-backups');
  mkdirSync(backupDir, {recursive: true});
  const backup = path.join(backupDir, `${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  writeFileSync(backup, JSON.stringify(plans.map(({doc}) => doc), null, 2), {flag: 'wx'});
  let transaction = client.transaction();
  for (const {doc, set} of plans) transaction = transaction.patch(doc._id, patch => patch.ifRevisionId(doc._rev).set(set));
  await transaction.commit(); // Atomic; concurrent CMS edits cause the entire operation to fail.
  console.log(`Saved ${plans.length} documents. Backup: ${backup}. Sanity updated _updatedAt automatically.`);
}
main().catch(error => {console.error(error.message); process.exitCode = 1;});
