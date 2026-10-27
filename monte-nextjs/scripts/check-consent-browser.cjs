// Usage: node scripts/check-consent-browser.cjs <path-to-playwright> [http://localhost:3102]
// Google collection and contact submissions are intercepted; no test leads are sent.
const {chromium} = require(process.argv[2]);
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const base = process.argv[3] || 'http://localhost:3102';
const key = 'montebiuro-cookie-consent';
const screenshots = path.join(require('node:os').tmpdir(), 'monte-consent-review');
fs.mkdirSync(screenshots, {recursive: true});
async function commands(page) {return page.evaluate(() => (window.dataLayer || []).filter(x => x && '0' in x).map(x => Array.from(x)));}
async function main() {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    for (const lang of ['pl','en']) for (const width of [390,1440]) {
      const context = await browser.newContext({viewport: {width, height: 900}});
      const errors = [], requests = [];
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.pathname === '/api/contact/') return route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}'});
        if (/google|doubleclick|clarity/.test(url.hostname)) {
          requests.push(url.toString());
          // Mock the tag lifecycle, but exercise the real app consent/event commands.
          if (url.pathname === '/gtag/js') return route.fulfill({contentType: 'application/javascript', body: 'window.dataLayer.push = function(){return Array.prototype.push.apply(this,arguments)};'});
          return route.fulfill({status: 204, body: ''});
        }
        return route.continue();
      });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}${lang === 'en' ? '/en/' : '/'}?utm_source=google&utm_medium=cpc&gclid=testClick`, {waitUntil: 'networkidle'});
      assert.equal(requests.length, 0, 'No tag requests before consent');
      const banner = page.getByRole('dialog');
      await banner.getByRole('button', {name: lang === 'en' ? 'Details' : 'Szczegóły', exact: true}).click();
      assert.equal(await banner.getByRole('checkbox').count(), 2);
      assert.equal(await banner.getByRole('checkbox').nth(0).isChecked(), false);
      assert.equal(await banner.getByRole('checkbox').nth(1).isChecked(), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Horizontal overflow');
      await page.screenshot({path: path.join(screenshots, `${lang}-${width}.png`)});
      // Choose marketing only; check no analytics page views and both conversion events.
      await banner.getByRole('checkbox', {name: /Marketing/}).check();
      await banner.getByRole('button', {name: lang === 'en' ? 'Save Selected' : 'Zapisz wybrane', exact: true}).click();
      await page.waitForTimeout(500);
      const record = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
      assert.equal(record.analytics, 'denied'); assert.equal(record.marketing, 'granted');
      assert.ok(!await banner.isVisible());
      assert.ok(!(await commands(page)).some(c => c[0] === 'event' && c[1] === 'page_view'));
      await page.locator('a[href^="tel:"]').first().evaluate(link => {
        link.addEventListener('click', event => event.preventDefault(), {once: true});
        link.click();
      });
      for (const [name,value] of [['email','test@example.com'],['phone','123456789'],['topic','Test']]) await page.locator(`[name=${name}]`).fill(value);
      await page.locator('[name=regulamin]').focus();
      await page.keyboard.press('Space');
      await page.locator('#contactForm button[type=submit]').focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      let cmd = await commands(page);
      for (const name of ['click_phone','generate_lead']) assert.equal(cmd.filter(c => c[0] === 'event' && c[1] === name).length, 1, `${name}: ${JSON.stringify(cmd.filter(c => c[0] === 'event'))}`);
      assert.ok(cmd.filter(c => c[0] === 'event').every(c => c[2].page_location.includes('gclid=testClick')));
      // Change purpose from a second tab. The first tab must follow immediately.
      const other = await context.newPage();
      await other.goto(base + '/blog/', {waitUntil: 'domcontentloaded'});
      await other.evaluate(key => localStorage.setItem(key, JSON.stringify({v:3,analytics:'granted',marketing:'denied',decidedAt:new Date().toISOString()})), key);
      await page.waitForTimeout(650);
      cmd = await commands(page);
      const consent = cmd.filter(c => c[0] === 'consent' && c[1] === 'update').at(-1)[2];
      assert.equal(consent.analytics_storage, 'granted'); assert.equal(consent.ad_storage, 'denied');
      const view = cmd.filter(c => c[0] === 'event' && c[1] === 'page_view').at(-1);
      assert.ok(view); assert.ok(!view[2].page_location.includes('gclid'));
      await other.close();
      await page.goto(base + (lang === 'en' ? '/en/cookie-policy/' : '/polityka-cookies/'), {waitUntil:'networkidle'});
      await page.getByRole('button', {name: lang === 'en' ? 'Change Cookie Settings' : 'Zmień ustawienia cookies', exact: true}).click();
      assert.equal(await page.evaluate(() => window['ga-disable-G-2GL77N6KWP']), true);
      await banner.getByRole('button', {name: lang === 'en' ? 'Essential Only' : 'Tylko niezbędne', exact: true}).click();
      await page.reload({waitUntil: 'networkidle'});
      assert.ok(!await page.getByRole('dialog').isVisible());
      assert.deepEqual(errors, []);
      console.log(`PASS ${lang} ${width}px: UI, independent purposes, conversions, other tab, withdrawal, reload`);
      await context.close();
    }
  } finally {await browser.close();}
  console.log(`Screenshots: ${screenshots}`);
}
main().catch(error => {console.error(error); process.exitCode = 1;});
