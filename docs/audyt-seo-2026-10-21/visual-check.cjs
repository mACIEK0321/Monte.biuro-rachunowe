// node visual-check.cjs <playwright path> <base URL> <before|after>
const {chromium} = require(process.argv[2]);
const fs = require('node:fs');
const path = require('node:path');
const out = path.join(__dirname, 'validation', process.argv[4]);
fs.mkdirSync(out, {recursive:true});
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const results = [];
  for (const width of [390,768,1440]) {
    const context = await browser.newContext({viewport:{width,height:900},locale:'pl-PL'});
    await context.route(/google-analytics\.com|googletagmanager\.com|clarity\.ms/, r=>r.abort());
    const page = await context.newPage();
    for (const route of ['/', '/en/', '/blog/wybor-formy-opodatkowania/', '/blog/jak-zalozyc-dzialalnosc-gospodarcza/', '/en/blog/how-to-set-up-a-sole-proprietorship-step-by-step-the-most-important-decisions-for-a-future-entrepreneur/']) {
      await page.goto(process.argv[3]+route,{waitUntil:'networkidle',timeout:90000});
      await page.evaluate(async()=>{await document.fonts.ready; document.querySelectorAll('.fade-in-scroll').forEach(e=>e.setAttribute('data-visible','true'));});
      // Freeze animations only in this measurement browser, never in site code.
      await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}'});
      await page.waitForTimeout(500);
      const name = (route==='/'?'home':route.replaceAll('/','_'))+'-'+width;
      results.push({name,...await page.evaluate(()=>({
        text:document.body.innerText,
        font:getComputedStyle(document.body).fontFamily,
        overflow:document.documentElement.scrollWidth>innerWidth,
        elements:[...document.querySelectorAll('h1,h2,h3,p,img,header.site-header,section,footer')].map(e=>{
          const r=e.getBoundingClientRect(),s=getComputedStyle(e);
          return {tag:e.tagName,text:e.tagName==='IMG'?e.getAttribute('alt'):e.textContent,box:[r.x,r.y,r.width,r.height].map(n=>Math.round(n*100)/100),font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,color:s.color,objectFit:s.objectFit,objectPosition:s.objectPosition};
        })
      }))});
      await page.screenshot({path:path.join(out,name+'.png'),fullPage:true});
      if(route==='/') await page.screenshot({path:path.join(out,'viewport-'+width+'.png')});
      console.log(name);
    }
    await context.close();
  }
  fs.writeFileSync(path.join(out,'layout.json'),JSON.stringify(results,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
