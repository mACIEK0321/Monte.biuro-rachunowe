// All GA/Clarity collection requests are answered locally. Contact API is stubbed.
// node verify-analytics.cjs <playwright path> [base URL]
const {chromium} = require(process.argv[2]);
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[3] || 'http://localhost:3101';
const key = 'montebiuro-cookie-consent';
const results=[];
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function snapshot(page) {
  await page.waitForTimeout(650);
  return page.evaluate(()=>({
    url:location.href, title:document.title, banner:!!document.querySelector('.cookie-banner'),
    disabled:window['ga-disable-G-2GL77N6KWP'],
    commands:(window.dataLayer||[]).filter(x=>x && typeof x==='object' && '0' in x).map(x=>({type:Object.prototype.toString.call(x),args:Array.from(x)})),
    cookies:document.cookie,
  }));
}
const events=(s,name)=>s.commands.filter(c=>c.args[0]==='event' && c.args[1]===name);
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  async function setup({stored,blocked=false,adblock=false,locale='pl-PL'}={}) {
    const context=await browser.newContext({locale,viewport:{width:390,height:844}});
    const requests=[], errors=[];
    await context.route('**/*',async route=>{
      const u=new URL(route.request().url());
      if(/google-analytics\.com$|clarity\.ms$/.test(u.hostname)) {
        requests.push({kind:'collect',url:u.toString(),body:route.request().postData()});
        return route.fulfill({status:204,body:''});
      }
      if(u.hostname==='www.googletagmanager.com') {
        requests.push({kind:'script',url:u.toString()});
        if(adblock) return route.abort();
      }
      return route.continue();
    });
    if(stored!==undefined) await context.addInitScript(({key,stored})=>localStorage.setItem(key,stored),{key,stored});
    if(blocked) await context.addInitScript(()=>{
      for(const method of ['getItem','setItem','removeItem']) Storage.prototype[method]=()=>{throw new DOMException('blocked','SecurityError')};
    });
    const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
    return {context,page,requests,errors};
  }
  async function finish(name,ctx,extra={}) {
    assert.deepEqual(ctx.errors,[],name+' JS errors');
    results.push({name,requests:ctx.requests,errors:ctx.errors,...extra});
    await ctx.context.close(); console.log('PASS '+name);
  }

  const fresh=await setup();
  await fresh.page.goto(base+'/',{waitUntil:'networkidle'});
  let s=await snapshot(fresh.page);assert.ok(s.banner);assert.equal(fresh.requests.length,0);assert.ok(!/_ga|_clck|_clsk/.test(s.cookies));
  await fresh.page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
  await fresh.page.reload({waitUntil:'networkidle'});
  s=await snapshot(fresh.page);assert.ok(!s.banner);assert.equal(fresh.requests.length,0);
  await finish('fresh and remembered denial',fresh,{state:s});

  for(const stored of ['all','necessary',JSON.stringify({v:2,analytics:'granted',decidedAt:'2020-01-01T00:00:00.000Z'})]) {
    const ctx=await setup({stored});await ctx.page.goto(base+'/',{waitUntil:'networkidle'});
    s=await snapshot(ctx.page);assert.ok(s.banner);assert.equal(ctx.requests.length,0);
    await finish('legacy or expired '+stored,ctx);
  }

  const ctx=await setup();const {page}=ctx;
  await page.goto(base+'/?email=private%40example.com&utm_source=google&utm_medium=organic&utm_campaign=profil_firmy#private',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click();
  await page.waitForTimeout(1800);s=await snapshot(page);
  assert.equal(ctx.requests.filter(r=>r.kind==='script').length,1);
  assert.equal(events(s,'page_view').length,1);
  assert.ok(s.commands.every(x=>x.type==='[object Arguments]'));
  const consents=s.commands.filter(c=>c.args[0]==='consent');
  assert.equal(consents[0].args[1],'default');assert.equal(consents[0].args[2].analytics_storage,'denied');
  assert.equal(consents[1].args[2].analytics_storage,'granted');
  for(const ad of ['ad_storage','ad_user_data','ad_personalization']) assert.equal(consents[1].args[2][ad],'denied');
  assert.ok(!JSON.stringify(s.commands).includes('private'));
  const consent=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
  assert.equal(consent.v,2);assert.equal(consent.analytics,'granted');assert.ok(consent.decidedAt);
  await page.evaluate(()=>{location.hash='cennik'});s=await snapshot(page);assert.equal(events(s,'page_view').length,1);
  await page.locator('#cennik').scrollIntoViewIfNeeded();s=await snapshot(page);assert.equal(events(s,'view_pricing').length,1);
  await page.evaluate(()=>document.querySelector('a[href^="tel:"]').addEventListener('click',e=>e.preventDefault(),{once:true}));
  await page.locator('a[href^="tel:"]').first().evaluate(a=>a.click());
  s=await snapshot(page);assert.equal(events(s,'click_phone').length,1);
  await page.locator('.hero a[href="#kontakt"]').evaluate(a=>a.click());
  s=await snapshot(page);assert.equal(events(s,'click_consultation').length,1);

  let submits=0,success=false;
  await page.route('**/api/contact/',async route=>{
    submits++;await delay(200);
    await route.fulfill({status:success?200:500,contentType:'application/json',body:JSON.stringify({ok:success})});
  });
  await page.locator('[name=email]').fill('private@example.com');
  await page.locator('[name=phone]').fill('123456789');
  await page.locator('[name=topic]').fill('Private test subject');
  await page.locator('[name=message]').fill('Private test message');
  await page.locator('[name=regulamin]').check();
  await page.locator('#contactForm').evaluate(f=>{f.requestSubmit();f.requestSubmit()});
  s=await snapshot(page);assert.equal(submits,1);assert.equal(events(s,'generate_lead').length,0);
  success=true;
  await page.locator('#contactForm').evaluate(f=>{f.requestSubmit();f.requestSubmit()});
  s=await snapshot(page);assert.equal(submits,2);assert.equal(events(s,'generate_lead').length,1);
  assert.ok(!/private@example|123456789|Private test/.test(JSON.stringify(s.commands)));
  assert.ok(!/private%40|private@example|123456789|Private.test/.test(JSON.stringify(ctx.requests.filter(r=>r.kind==='collect'))));

  await page.locator('header a[href="/blog/"]').evaluate(a=>a.click());
  await page.waitForURL('**/blog/');s=await snapshot(page);
  assert.equal(events(s,'page_view').length,2);assert.equal(events(s,'page_view').at(-1).args[2].page_title,await page.title());
  await page.locator('.blog-card h2 a').first().click();
  s=await snapshot(page);assert.equal(events(s,'page_view').length,3);assert.equal(events(s,'page_view').at(-1).args[2].page_title,await page.title());
  await page.reload({waitUntil:'networkidle'});s=await snapshot(page);assert.ok(!s.banner);assert.equal(events(s,'page_view').length,1);
  await page.goto(base+'/polityka-cookies/',{waitUntil:'networkidle'});await snapshot(page);
  await page.getByRole('button',{name:'Zmień ustawienia cookies',exact:true}).click();
  s=await snapshot(page);assert.ok(s.banner);assert.equal(s.disabled,true);assert.ok(!/_ga|_clck|_clsk/.test(s.cookies));
  const afterWithdraw=ctx.requests.filter(r=>r.kind==='collect').length;
  await page.waitForTimeout(2000);assert.equal(ctx.requests.filter(r=>r.kind==='collect').length,afterWithdraw);
  await page.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click();s=await snapshot(page);assert.equal(s.disabled,false);
  assert.equal(events(s,'page_view').length,2,'re-grant creates one new consent-session view');

  const second=await ctx.context.newPage();await second.goto(base+'/',{waitUntil:'networkidle'});
  await second.evaluate(()=>window.showCookieBanner());
  await second.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
  s=await snapshot(page);assert.equal(s.disabled,true);assert.ok(!/_ga/.test(s.cookies));
  await finish('accept, events, SPA, forms, reload, withdraw, regrant, other tab',ctx,{state:s,submits});

  for(const scenario of [{blocked:true},{adblock:true}]) {
    const ctx=await setup(scenario);await ctx.page.goto(base+'/',{waitUntil:'networkidle'});
    await ctx.page.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click();
    s=await snapshot(ctx.page);assert.ok(!s.banner);
    await ctx.page.route('**/api/contact/',r=>r.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'}));
    for(const [name,value] of [['email','test@example.com'],['phone','123456789'],['topic','Test form']]) await ctx.page.locator(`[name=${name}]`).fill(value);
    await ctx.page.locator('[name=regulamin]').check();
    await ctx.page.locator('#contactForm').evaluate(f=>f.requestSubmit());
    await ctx.page.locator('.contact-success').waitFor();
    await finish(JSON.stringify(scenario)+' leaves contact form working',ctx);
  }

  const en=await setup({locale:'en-GB'});
  await en.page.goto(base+'/blog/wybr-formy-opodatkowania-dziaalnoci-gospodarczej/',{waitUntil:'networkidle'});
  assert.ok(new URL(en.page.url()).pathname.startsWith('/blog/'));
  await finish('English browser stays on Polish article',en);

  await browser.close();fs.mkdirSync(path.join(__dirname,'validation'),{recursive:true});
  fs.writeFileSync(path.join(__dirname,'validation/analytics.json'),JSON.stringify({base,method:'Real gtag script; all collection intercepted locally, contact API stubbed; no real GA delivery or email',results},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
