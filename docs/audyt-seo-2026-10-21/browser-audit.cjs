// Run: node browser-audit.cjs <absolute path to installed playwright package>
// Collection requests are intercepted locally; no forms are submitted.
const { chromium } = require(process.argv[2]);
const fs = require('fs');
const path = require('path');
const base = 'https://www.montebiuro.pl';
const output = [];
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  for (const scenario of [
    {name:'fresh-pl-accept-reload-withdraw', locale:'pl-PL', url:'/'},
    {name:'returning-all', locale:'pl-PL', url:'/', choice:'all'},
    {name:'returning-necessary', locale:'pl-PL', url:'/', choice:'necessary'},
    {name:'fresh-en-on-pl-article', locale:'en-GB', url:'/blog/wybr-formy-opodatkowania-dziaalnoci-gospodarczej/'},
  ]) {
    const context = await browser.newContext({locale:scenario.locale, viewport:{width:390,height:844}});
    const requests = [];
    let stage = 'initial';
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      const isGA = /google-analytics\.com$/.test(url.hostname) && url.pathname.includes('collect');
      const isClarity = /clarity\.ms$/.test(url.hostname) && url.pathname.includes('collect');
      if (isGA || isClarity) {
        requests.push({stage,host:url.hostname,path:url.pathname, params:Object.fromEntries(['en','tid','gcs','gcd','dl'].filter(k=>url.searchParams.has(k)).map(k=>[k,url.searchParams.get(k)]))});
        await route.fulfill({status:204,body:''});
      } else await route.continue();
    });
    if (scenario.choice) await context.addInitScript(choice=>localStorage.setItem('montebiuro-cookie-consent',choice),scenario.choice);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e=>errors.push(e.message));
    async function snapshot(label) {
      await page.waitForTimeout(1800);
      const state = await page.evaluate(()=>({url:location.href,lang:document.documentElement.lang,banner:!!document.querySelector('.cookie-banner'),choice:localStorage.getItem('montebiuro-cookie-consent'),dataLayer:(window.dataLayer||[]).map(x=>({type:Object.prototype.toString.call(x),args:x && typeof x==='object' && '0' in x ? Array.from(x) : x})).filter(x=>x.args?.[0]==='consent'||x.args?.[0]==='config'),overflow:document.documentElement.scrollWidth>innerWidth}));
      state.cookies = (await context.cookies()).map(c=>({name:c.name,domain:c.domain}));
      output.push({scenario:scenario.name,stage:label,...state,requests:requests.filter(r=>r.stage===label),errors:[...errors]});
    }
    try {
      await page.goto(base+scenario.url,{waitUntil:'networkidle',timeout:45000});
      await snapshot(stage);
      if(scenario.name==='fresh-pl-accept-reload-withdraw') {
        stage='accept'; await page.getByRole('button',{name:'Akceptuj wszystkie',exact:true}).click(); await snapshot(stage);
        stage='reload'; await page.reload({waitUntil:'networkidle'}); await snapshot(stage);
        stage='withdraw'; await page.evaluate(()=>window.showCookieBanner?.());
        await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click(); await snapshot(stage);
        stage='spa-blog'; await page.locator('header a').filter({hasText:/^Blog$/}).evaluate(a=>a.click()); await snapshot(stage);
      }
      if (scenario.name==='returning-all') {
        stage='diagnostic-standard-gtag';
        await page.evaluate(()=>window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'}));
        await snapshot(stage);
      }
    } catch(e) { output.push({scenario:scenario.name,error:e.message,requests,errors}); }
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname,'browser-evidence.json'),JSON.stringify({checked_at:new Date().toISOString(),method:'Chrome headless, fresh isolated profiles; GA/Clarity collect intercepted and answered locally (204); no real analytics delivery or forms',results:output},null,2));
  console.log(JSON.stringify(output,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
