// Execute the real TypeScript loaders with an injected failing CMS client.
// No CMS mutations or production outage are involved.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root=path.resolve(__dirname,'../../monte-nextjs');
const ts=require(path.join(root,'node_modules/typescript'));
function load(relative,mocks) {
  const file=path.join(root,relative);
  const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
  const module={exports:{}};
  const requireMock=name=>{if(!(name in mocks))throw new Error('Unexpected dependency '+name);return mocks[name]};
  vm.runInNewContext(source,{module,exports:module.exports,require:requireMock,console,URL,Date},{filename:file});
  return module.exports;
}
(async()=>{
  const outage=new Error('Simulated CMS outage');
  const sanity=load('src/lib/sanity.ts',{
    '../../seo-urls.cjs': require(path.join(root,'seo-urls.cjs')),
    '../../service-links.cjs': require(path.join(root,'service-links.cjs')),
    '@sanity/client':{createClient:()=>({fetch:async()=>{throw outage}})},
    '@sanity/image-url':()=>({image:()=>({})}),
    react:{cache:fn=>fn},
  });
  for(const [name,run] of [
    ['PL list',()=>sanity.getSanityPosts()],
    ['EN list',()=>sanity.getSanityPostsByLang('en')],
    ['article',()=>sanity.getSanityPost('test')],
    ['sitemap loader',()=>sanity.getSitemapPosts()],
  ]) {await assert.rejects(run,e=>e===outage);console.log('PASS '+name+' preserves CMS error')}
  const helpers = require(path.join(root,'seo-urls.cjs'));
  const seo=load('src/lib/seo.ts',{'../../seo-urls.cjs':helpers});
  const sitemap=load('src/app/sitemap.ts',{'@/lib/sanity':sanity,'@/lib/seo':seo,'../../seo-urls.cjs':helpers});
  await assert.rejects(()=>sitemap.default(),e=>e===outage);
  console.log('PASS sitemap throws instead of returning a partial success');
  fs.writeFileSync(path.join(__dirname,'validation/cms-failure.json'),JSON.stringify({method:'Real loaders with injected rejected CMS fetch; no live outage',passed:true,checks:5},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
