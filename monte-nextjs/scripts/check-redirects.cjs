const assert = require('node:assert/strict');
const {redirectPairs} = require('../seo-urls.cjs');
const production = 'https://www.montebiuro.pl';

async function checkRedirects(base = production) {
  const origin = new URL(base).origin;
  for (const {from, to} of redirectPairs) {
    const response = await fetch(new URL(from, origin), {redirect: 'manual', signal: AbortSignal.timeout(20000)});
    await response.arrayBuffer();
    assert.equal(response.status, 301, `${from}: expected 301`);
    assert.equal(response.headers.get('location'), production + to, `${from}: wrong destination`);
    // Local tests check the same build, rather than following the absolute redirect to production.
    const target = await fetch(new URL(to, origin), {redirect: 'manual', signal: AbortSignal.timeout(20000)});
    assert.equal(target.status, 200, `${to}: expected 200 without another redirect`);
    const html = await target.text();
    assert.ok(html.includes(`<link rel="canonical" href="${production}${to}"`), `${to}: wrong canonical`);
    console.log(`OK 301 -> 200 ${from} -> ${to}`);
  }
  return redirectPairs.length;
}

module.exports = {checkRedirects};
if (require.main === module) checkRedirects(process.argv[2]).then(count => console.log(`${count} redirects passed.`))
  .catch(error => { console.error(error.message); process.exitCode = 1; });
