// Read-only HTTP checks. Start the production build before checking localhost.
// Usage: npm run check:indexing -- [https://www.montebiuro.pl]
const assert = require('node:assert/strict');
const {redirectPairs} = require('../seo-urls.cjs');

const production = 'https://www.montebiuro.pl';
const base = new URL(process.argv[2] || production).origin;
const failures = [];

async function read(path, headers) {
  // Native HTTP is needed for local Host-header tests: fetch ignores Host overrides.
  if (headers) {
    const url = new URL(path, base);
    return new Promise((resolve, reject) => {
      const request = require(url.protocol === 'https:' ? 'node:https' : 'node:http').get(url, {
        headers, signal: AbortSignal.timeout(20000),
      }, response => {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('error', reject);
        response.on('end', () => resolve({
          response: { status: response.statusCode, headers: new Headers(response.headers) },
          body: Buffer.concat(chunks).toString('utf8'),
        }));
      });
      request.on('error', reject);
    });
  }
  const response = await fetch(new URL(path, base), {
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });
  return { response, body: await response.text() };
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)]
    .map(([, key, value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')]));
}

async function check(label, run) {
  try {
    await run();
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(label);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

async function main() {
  const { response: sitemap, body: xml } = await read('/sitemap.xml');
  assert.equal(sitemap.status, 200, 'Sitemap must return HTTP 200');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url.replaceAll('&amp;', '&'));
  assert.ok(urls.length > 0, 'Empty sitemap');
  assert.equal(urls.length, new Set(urls).size, 'Duplicate sitemap URLs');
  assert.equal([...xml.matchAll(/<lastmod>/g)].length, urls.length, 'Every sitemap entry needs lastmod');
  const discovered = new Set();
  const alternates = new Map();

  for (const url of urls) {
    await check(url, async () => {
      const parsed = new URL(url);
      assert.equal(parsed.origin, production, 'Non-canonical host');
      assert.ok(parsed.pathname.endsWith('/'), 'Missing trailing slash');
      assert.ok(!parsed.search && !parsed.hash, 'Sitemap contains parameters or fragments');
      const { response, body } = await read(parsed.pathname);
      assert.equal(response.status, 200, 'Must return HTTP 200 without redirects');
      assert.match(response.headers.get('content-type') || '', /text\/html/i);
      assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /\b(noindex|none)\b/i);
      const links = [...body.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag));
      assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [url]);
      const language = parsed.pathname.startsWith('/en/') ? 'en' : 'pl';
      assert.equal(attributes(body.match(/<html\b[^>]*>/i)?.[0] || '').lang, language, 'Wrong language in server HTML');
      const translations = links.filter(link => link.rel === 'alternate' && link.hreflang);
      alternates.set(url, translations);
      if (translations.length) {
        assert.ok(translations.some(link => link.hreflang === language && link.href === url), 'Missing self-referencing hreflang');
      }
      // English content must exist before JavaScript runs, not just after hydration.
      if (parsed.pathname === '/en/') assert.match(body, /<h1\b[^>]*>MonTe - a modern accounting firm/);
      const robots = [...body.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag))
        .filter(meta => ['robots', 'googlebot'].includes(meta.name?.toLowerCase()));
      for (const meta of robots) assert.doesNotMatch(meta.content || '', /\b(noindex|none)\b/i);
      assert.equal([...body.matchAll(/<h1\b/gi)].length, 1, 'Expected one H1');
      for (const [tag] of body.matchAll(/<a\b[^>]*>/gi)) {
        const href = attributes(tag).href;
        if (!href) continue;
        const target = new URL(href, url);
        if (target.origin === production) discovered.add(target.origin + target.pathname);
        if (target.origin === production) assert.ok(!redirectPairs.some(pair => pair.from === target.pathname), `Old internal URL: ${href}`);
      }
    });
  }

  await check('Reciprocal hreflang on canonical URLs', async () => {
    for (const [url, translations] of alternates) {
      for (const link of translations) {
        assert.ok(urls.includes(link.href), `Alternate missing from sitemap: ${link.href}`);
        if (link.hreflang === 'x-default') continue;
        assert.ok(alternates.get(link.href)?.some(reverse => reverse.href === url), `Non-reciprocal hreflang: ${url}`);
      }
    }
  });
  await check('Internal links to every article', async () => {
    for (const url of urls.filter(url => /\/(?:en\/)?blog\/[^/]+\/$/.test(new URL(url).pathname))) {
      assert.ok(discovered.has(url), `No internal link to ${url}`);
    }
  });
  await check('robots.txt', async () => {
    const { response, body } = await read('/robots.txt');
    assert.equal(response.status, 200);
    assert.ok(body.includes(`Sitemap: ${production}/sitemap.xml`));
    assert.doesNotMatch(body, /^Disallow:\s*\/\s*$/mi, 'Site-wide crawl block');
  });
  await check('Permanent redirect from non-www host', async () => {
    const query = '?utm_source=indexing-check';
    const { response } = base === production
      ? await read(`https://montebiuro.pl/${query}`)
      : await read(`/${query}`, { Host: 'montebiuro.pl' });
    assert.equal(response.status, 308, 'Expected permanent 308; check the Vercel Domains redirect setting');
    assert.equal(response.headers.get('location'), `${production}/${query}`);
  });
  for (const [oldPath, path] of [
    ['/index.html', '/'],
    ['/polityka-prywatnosci.html', '/polityka-prywatnosci/'],
    ['/regulamin.html', '/regulamin/'],
  ]) {
    await check(`Legacy redirect ${oldPath}`, async () => {
      const { response } = await read(`${oldPath}?utm_source=indexing-check`);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), `${production}${path}?utm_source=indexing-check`);
      assert.ok(urls.includes(production + path), 'Redirect target missing from sitemap');
    });
  }
  for (const path of ['/blog/no-such-article-indexing-check/', '/en/blog/no-such-article-indexing-check/', '/no-such-page-indexing-check/']) {
    await check(`404 ${path}`, async () => assert.equal((await read(path)).response.status, 404));
  }
  console.log(`Checked ${urls.length} sitemap URLs; ${failures.length} failed checks.`);
  if (failures.length) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
