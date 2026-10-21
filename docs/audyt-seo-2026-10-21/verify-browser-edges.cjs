const {chromium} = require(process.argv[2]);
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=process.argv[3]||'http://localhost:3101';
const key='montebiuro-cookie-consent';
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const ctx=await browser.newContext({locale:'pl-PL'});
  const collection=[];const errors=[];
  let release;
  const waitForRelease=new Promise(r=>{release=r});
  let delayed=false;
  await ctx.route('**/*',async route=>{
    const u=new URL(route.request().url());
    if(/google-analytics\.com$|clarity\.ms$/.test(u.hostname)) {
      collection.push(u.toString());return route.fulfill({status:204,body:''});
    }
    if(u.hostname==='www.googletagmanager.com'&&!delayed){delayed=true;await waitForRelease;}
    return route.continue();
  });
  const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/',{waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click();
  await p.waitForTimeout(700);assert.ok(delayed);
  await p.evaluate(()=>window.showCookieBanner());
  await p.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
  release();await p.waitForTimeout(2500);
  assert.equal(collection.length,0,'A delayed GA script must not flush hits after withdrawal');
  assert.ok(!/_ga/.test(await p.evaluate(()=>document.cookie)));
  await p.evaluate(()=>window.showCookieBanner());
  await p.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click();
  await p.waitForTimeout(2000);
  assert.ok(collection.length>0,'Regrant after cancelled pending initialization works');
  await p.evaluate(key=>{
    localStorage.setItem(key,JSON.stringify({v:2,analytics:'granted',decidedAt:'2020-01-01T00:00:00.000Z'}));
    document.dispatchEvent(new Event('visibilitychange'));
  },key);
  await p.waitForTimeout(400);
  assert.equal(await p.evaluate(()=>window['ga-disable-G-2GL77N6KWP']),true);
  assert.ok(await p.locator('.cookie-banner').isVisible());
  assert.ok(!/_ga/.test(await p.evaluate(()=>document.cookie)));
  console.log('PASS delayed script, withdrawal race, regrant, expiry');
  await ctx.close();
  const seo=JSON.parse(fs.readFileSync(path.join(__dirname,'validation/seo.json')));
  const browsing=await browser.newContext();
  await browsing.route(/google-analytics\.com|googletagmanager\.com|clarity\.ms/,r=>r.abort());
  const page=await browsing.newPage();
  for(const item of seo.results.filter(x=>x.languages.length && !['/','/en/'].includes(new URL(x.url).pathname))) {
    const route=new URL(item.url).pathname;
    await page.goto(base+route,{waitUntil:'networkidle'});
    const alternate=item.languages.find(x=>x.lang!=='x-default'&&x.lang!==item.lang);
    const link=page.locator('header a[aria-label="'+(item.lang==='en'?'Przełącz na Polski':'Switch to English')+'"]');
    assert.equal(await link.getAttribute('href'),new URL(alternate.url).pathname,route+' language switch');
  }
  await page.goto(base+'/',{waitUntil:'networkidle'});
  const fonts=await page.evaluate(()=>({computed:getComputedStyle(document.body).fontFamily,loaded:[...document.fonts].map(f=>({family:f.family,status:f.status}))}));
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(__dirname,'validation/browser-edges.json'),JSON.stringify({passed:true,checks:['pending-script withdrawal','regrant','expiry on visibility','all paired language switches'],fonts,errors},null,2));
  await browser.close();console.log('PASS all paired language switch targets');
})().catch(e=>{console.error(e);process.exitCode=1});
