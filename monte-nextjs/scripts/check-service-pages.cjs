// node scripts/check-service-pages.cjs <path-to-playwright> [http://localhost:3102]
// Contact submissions and Google tag requests are intercepted locally.
const {chromium} = require(process.argv[2]);
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {services} = require('../service-links.cjs');
const base = process.argv[3] || 'http://localhost:3102';
const output = path.join(require('node:os').tmpdir(), 'monte-service-review');
fs.mkdirSync(output,{recursive:true});
async function main() {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    for (const width of [390,1440]) for (const service of services) {
      const context = await browser.newContext({viewport:{width,height:900}});
      const errors = [];
      await context.addInitScript(() => localStorage.setItem('montebiuro-cookie-consent', JSON.stringify({v:3,analytics:'granted',marketing:'denied',decidedAt:new Date().toISOString()})));
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.pathname === '/api/contact/') return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});
        if (/google|doubleclick|clarity/.test(url.hostname)) return route.fulfill({status:200,contentType:'application/javascript',body:''});
        return route.continue();
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + service.path,{waitUntil:'networkidle'});
      assert.equal(await page.locator('main').count(),1);
      assert.equal(await page.locator('h1').count(),1);
      assert.equal(await page.locator('#kontakt').count(),1);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.montebiuro.pl'+service.path);
      assert.equal(await page.locator('link[hreflang=en]').count(),0, 'No invented EN translation');
      const graph = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => JSON.parse(node.textContent)['@graph'] || []));
      const schema = type => graph.find(node => node['@type'] === type);
      for (const type of ['Service','FAQPage','BreadcrumbList','AccountingService']) assert.ok(schema(type),type);
      assert.equal(schema('Service').provider['@id'],schema('AccountingService')['@id']);
      assert.equal(schema('AccountingService').legalName,'MonTe Biuro Rachunkowe s.c.');
      assert.ok(schema('AccountingService').sameAs.includes('https://share.google/356Vi23Gv4iIhKFWR'));
      const faq = page.locator('details.faq-item');
      assert.equal(await faq.count(),6);
      for (let index=0; index<6; index++) {
        assert.equal((await faq.nth(index).locator('summary').textContent()).trim(),schema('FAQPage').mainEntity[index].name);
        assert.equal((await faq.nth(index).locator('.faq-answer').textContent()).trim(),schema('FAQPage').mainEntity[index].acceptedAnswer.text);
      }
      if (service.key === 'service_pelna') {
        assert.equal(schema('Service').offers,undefined);
        assert.ok(!(await page.locator('.service-page').textContent()).includes('299'));
        assert.ok(!(await page.locator('.service-page').textContent()).includes('599'));
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true,'Horizontal overflow');
      assert.equal(await page.locator('.service-process-steps').evaluate(el => getComputedStyle(el).display),'grid');
      const headerBottom = await page.locator('#site-header').evaluate(el => el.getBoundingClientRect().bottom);
      const breadcrumbTop = await page.locator('.breadcrumbs').evaluate(el=>el.getBoundingClientRect().top);
      assert.ok(breadcrumbTop >= headerBottom,'Header covers breadcrumbs');
      await page.screenshot({path:path.join(output,`${service.key}-${width}.png`)});
      if (width === 1440) await page.screenshot({path:path.join(output,`${service.key}-full.png`),fullPage:true});
      await faq.first().locator('summary').focus(); await page.keyboard.press('Enter');
      assert.equal(await faq.first().getAttribute('open'),'');
      for (const slug of service.slugs) {
        const response = await context.request.get(base+'/blog/'+slug+'/', {maxRedirects:0});
        assert.equal(response.status(),200,slug);
        const body = await response.text();
        assert.ok(body.includes(`href="${service.path}"`));
        assert.ok(body.includes(service.before));
      }
      assert.equal(await page.locator('#site-header a.cta').getAttribute('href'),'#kontakt');
      for (const [name,value] of [['email','test@example.com'],['phone','123456789'],['topic','Test strony usługi']]) await page.locator(`[name=${name}]`).fill(value);
      await page.locator('[name=regulamin]').focus(); await page.keyboard.press('Space');
      await page.locator('#contactForm').evaluate(form => {form.requestSubmit();form.requestSubmit();});
      await page.locator('.contact-success').waitFor();
      const leads = await page.evaluate(() => (window.dataLayer||[]).filter(command=>command[0]==='event'&&command[1]==='generate_lead').map(command=>command[2]));
      assert.equal(leads.length,1); assert.equal(leads[0].component,service.key);
      assert.ok(!JSON.stringify(leads).includes('test@example.com'));
      assert.deepEqual(errors,[]);
      await context.close(); console.log(`PASS ${service.key} ${width}px: HTML/schema, FAQ, links, layout, lead attribution`);
    }
    const homeContext = await browser.newContext();
    const home = await homeContext.newPage();
    await home.goto(base+'/',{waitUntil:'networkidle'});
    await home.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
    for (const [title, href] of [['Księgowość uproszczona','/ksiegowosc-jdg-krakow/'],['Pełna księgowość','/pelna-ksiegowosc-krakow/']]) {
      const card = home.locator('[data-service-card]').filter({has:home.getByRole('heading',{name:title,exact:true})});
      const toggle = card.getByRole('button',{name:'Szczegóły',exact:true});
      await toggle.click();
      assert.equal(await card.locator('button').getAttribute('aria-expanded'),'true');
      const link = card.getByRole('link',{name:'Więcej o usłudze',exact:true});
      assert.equal(await link.getAttribute('href'),href);
      assert.equal(await link.getAttribute('tabindex'),'0');
      assert.equal(await home.locator(`footer a[href="${href}"]`).count(),1);
    }
    await homeContext.close(); console.log('PASS home service toggles, links and footer');
    const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const page = await context.newPage();
    for (const service of services) {
      await page.goto(base+service.path);
      await page.locator('details summary').first().click();
      assert.equal(await page.locator('details').first().getAttribute('open'),'');
    }
    await context.close(); console.log('PASS FAQs open without JavaScript');
  } finally {await browser.close();}
  console.log(`Screenshots: ${output}`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
