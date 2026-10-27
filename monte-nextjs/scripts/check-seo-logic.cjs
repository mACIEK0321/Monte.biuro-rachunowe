const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const helpers = require('../seo-urls.cjs');
const root = path.resolve(__dirname, '..');
function load(file, mocks = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true}}).outputText;
  const module = {exports: {}};
  vm.runInNewContext(source, {module, exports: module.exports, require: name => {
    if (name in mocks) return mocks[name];
    throw new Error(`Unexpected dependency: ${name}`);
  }, URL, Date, console});
  return module.exports;
}
async function main() {
  for (const file of ['../monte-sanity-studio/schemaTypes/blogPost.ts', 'sanity/schemas/blogPost.js']) {
    const schema = load(path.resolve(root, file), {sanity: {defineType: x => x, defineField: x => x}}).default;
    const slug = schema.fields.find(field => field.name === 'slug');
    assert.ok(!slug.readOnly);
    for (const [input, expected] of [
      ['ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż', 'acelnoszz-acelnoszz'],
      ['Złe długi: co można kupić?', 'zle-dlugi-co-mozna-kupic'],
      ['A com\u00adpany / café déjà vu', 'a-company-cafe-deja-vu'],
      ['  --- nowy / adres --- ', 'nowy-adres'],
    ]) assert.equal(slug.options.slugify(input), expected);
    assert.ok(slug.options.slugify('a-'.repeat(100)).length <= 96);
    assert.ok(!slug.options.slugify('a-'.repeat(100)).endsWith('-'));
  }
  assert.equal(helpers.migration.posts.filter(p => p.language === 'pl').length, 13);
  assert.equal(helpers.migration.posts.filter(p => p.language === 'en').length, 1);
  assert.equal(new Set(helpers.redirectPairs.map(p => p.from)).size, 17);
  for (const {from, to} of helpers.redirectPairs) {
    assert.ok(!helpers.redirectPairs.some(pair => pair.from === to), 'Redirect chain');
    assert.equal(helpers.canonicalInternalHref(`${from}?utm_source=google#test`), `${to}?utm_source=google#test`);
    assert.equal(helpers.canonicalInternalHref(`https://example.com${from}`), `https://example.com${from}`);
  }
  const entry = helpers.migration.posts[0];
  const unchanged = 'family-foundation-what-is-it-how-does-it-work-and-when-is-it-worth-considering';
  assert.equal(helpers.canonicalSlug(unchanged, 'en'), unchanged);
  const mockDocs = [];
  const outage = new Error('CMS unavailable');
  let fail = false;
  const sanity = load(path.join(root, 'src/lib/sanity.ts'), {
    '../../seo-urls.cjs': helpers,
    '@sanity/client': {createClient: () => ({fetch: async (_query, params) => {
      if (fail) throw outage;
      return params.slugs ? mockDocs.find(doc => params.slugs.includes(doc.slug.current)) || null : mockDocs;
    }})},
    '@sanity/image-url': () => ({image: () => ({})}), react: {cache: fn => fn},
  });
  // The same canonical URL resolves both before and after the CMS migration.
  for (const current of [entry.from, entry.to]) {
    mockDocs[0] = {_id: 'test', slug: {current}, language: 'pl', body: [{markDefs: [{href: `/blog/${entry.from}/`}]}]};
    const post = await sanity.getSanityPostByLang(entry.to, 'pl');
    assert.equal(post._id, 'test');
    assert.equal(post.body[0].markDefs[0].href, `/blog/${entry.to}/`);
    assert.equal((await sanity.getAllSanityPostSlugsByLang('pl'))[0].slug, entry.to);
  }
  assert.equal(await sanity.getSanityPostByLang('missing', 'pl'), null);
  fail = true;
  for (const run of [() => sanity.getSanityPosts(), () => sanity.getSanityPost(entry.to), () => sanity.getSitemapPosts()]) await assert.rejects(run, error => error === outage);
  const old = {_updatedAt: '2026-01-01', slug: {current: entry.from}, language: 'pl'};
  assert.equal(helpers.postModifiedAt(old), helpers.migrationDate);
  assert.equal(helpers.postModifiedAt({...old, _updatedAt: '2027-01-01'}), '2027-01-01');
  console.log('PASS slug generators, 14 mappings, 17 aliases, links, CMS compatibility, failures, lastmod');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
