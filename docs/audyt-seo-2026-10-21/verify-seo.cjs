// node verify-seo.cjs <playwright path> [base URL]
const {chromium, request} = require(process.argv[2]);
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[3] || 'http://localhost:3101';
const production = 'https://www.montebiuro.pl';
(async()=>{
  const api = await request.newContext({baseURL:base});
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage();
  // Parse raw server HTML without running the site or loading its assets.
  await page.route('**/*',r=>r.abort());
  const sitemap = await api.get('/sitemap.xml');
  assert.equal(sitemap.status(),200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
  const inventory = JSON.parse(fs.readFileSync(path.join(__dirname,'cms-readonly-inventory.json'),'utf8'));
  const publishedPosts = inventory.posts.filter(p=>p.slug?.current?.trim() && (!p.publishedAt || Date.parse(p.publishedAt)<=Date.now()));
  assert.equal(urls.length,new Set(urls).size,'Duplicate URLs');
  assert.equal(urls.length,10+publishedPosts.length,'Missing static pages or articles');
  const results = [];
  for (const url of urls) {
    assert.ok(url.startsWith(production+'/') && url.endsWith('/'),url);
    const route = new URL(url).pathname;
    const response = await api.get(route,{maxRedirects:0});
    assert.equal(response.status(),200,route);
    const html = await response.text();
    await page.setContent(html,{waitUntil:'domcontentloaded'});
    const data = await page.evaluate(()=>({
      lang:document.documentElement.lang,
      canonical:[...document.querySelectorAll('link[rel="canonical"]')].map(e=>e.href),
      title:document.title,
      og:document.querySelector('meta[property="og:url"]')?.content,
      description:document.querySelector('meta[name="description"]')?.content,
      image:document.querySelector('meta[property="og:image"]')?.content,
      h1:document.querySelectorAll('h1').length,
      internalPaths:[...document.querySelectorAll('a[href^="/"]')].map(e=>e.getAttribute('href')),
      robots:[...document.querySelectorAll('meta[name="robots"]')].map(e=>e.content),
      languages:[...document.querySelectorAll('link[hreflang]')].map(e=>({lang:e.hreflang,url:e.href})),
      schema:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const s=JSON.parse(e.textContent);return s['@graph']||[s];}),
    }));
    assert.deepEqual(data.canonical,[url],route+' canonical');
    assert.equal(data.og,url,route+' OG');
    assert.equal(data.lang,route.startsWith('/en/')?'en':'pl',route+' lang');
    assert.equal(data.h1,1,route+' H1');
    assert.ok(data.internalPaths.every(href=>!href.split(/[?#]/)[0].includes('//')),route+' doubled slash in internal link');
    assert.ok(data.description && data.image,route+' social metadata');
    assert.ok(!data.robots.some(x=>x.includes('noindex')),route+' noindex');
    assert.equal(data.schema.filter(x=>x['@type']==='AccountingService').length,1);
    assert.ok(!data.schema.some(x=>['FAQPage','LocalBusiness','ProfessionalService'].includes(x['@type'])));
    results.push({url,...data});
    console.log('PASS '+route);
  }
  for(const item of results) for(const alternate of item.languages) {
    const target=results.find(x=>x.url===alternate.url);
    assert.ok(target,`Missing alternate ${alternate.url}`);
    if(alternate.lang!=='x-default') assert.ok(target.languages.some(x=>x.url===item.url),`Non-reciprocal ${item.url}`);
  }
  for(const route of ['/blog/no-such-article-seo-check/','/en/blog/no-such-article-seo-check/','/no-such-page-seo-check/']) {
    const response=await api.get(route,{maxRedirects:0});
    assert.equal(response.status(),404,route+' must be HTTP 404');
  }
  const robots = await api.get('/robots.txt');
  assert.ok((await robots.text()).includes(production+'/sitemap.xml'));
  for(const asset of ['/og-image.jpg','/icon.png','/apple-icon.png']) assert.equal((await api.get(asset)).status(),200,asset);
  for (const route of ['/', '/blog/', '/blog/?utm_source=google']) {
    const redirect=await api.get(route,{headers:{host:'montebiuro.pl'},maxRedirects:0});
    assert.equal(redirect.status(),308,'Permanent host redirect in Next');
    assert.equal(redirect.headers().location,production+route,'Preserved path and query');
  }
  fs.mkdirSync(path.join(__dirname,'validation'),{recursive:true});
  fs.writeFileSync(path.join(__dirname,'validation/seo.json'),JSON.stringify({base,count:results.length,results},null,2));
  await browser.close(); await api.dispose();
  console.log(`PASS ${results.length} URLs, reciprocal hreflang, 404s, assets, robots, 308`);
})().catch(e=>{console.error(e);process.exitCode=1});
