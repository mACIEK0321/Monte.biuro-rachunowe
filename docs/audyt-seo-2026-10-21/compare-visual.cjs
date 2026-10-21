const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'validation');
const before=JSON.parse(fs.readFileSync(path.join(root,'before/layout.json')));
const after=JSON.parse(fs.readFileSync(path.join(root,'after/layout.json')));
const results=before.map(b=>{
  const a=after.find(x=>x.name===b.name);assert.ok(a,b.name);
  assert.equal(b.text,a.text,b.name+' visible text');
  assert.equal(b.elements.length,a.elements.length,b.name+' elements');
  const differences=[];let maxBoxDifference=0;
  b.elements.forEach((x,i)=>{
    const y=a.elements[i];
    for(const key of ['text','font','size','weight','color','objectFit','objectPosition']) {
      if(x[key]!==y[key])differences.push({index:i,key,before:x[key],after:y[key]});
    }
    x.box.forEach((value,j)=>{maxBoxDifference=Math.max(maxBoxDifference,Math.abs(value-y.box[j]))});
  });
  assert.deepEqual(differences,[],b.name+' typography/content/crop');
  assert.ok(maxBoxDifference<=1,b.name+' layout delta '+maxBoxDifference);
  assert.equal(a.overflow,false,b.name+' horizontal overflow');
  return {name:b.name,identicalText:true,identicalStyles:true,elementCount:a.elements.length,maxBoxDifference,overflow:false};
});
fs.writeFileSync(path.join(root,'visual-comparison.json'),JSON.stringify({method:'Public production before vs local production build after; identical Chromium viewport, locale; animations frozen in test browser only. Images recompressed with original styles and crop.',results},null,2));
console.log(JSON.stringify(results,null,2));
