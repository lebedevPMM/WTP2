const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1080,height:1350} });
  await p.goto('file://'+path.join(process.cwd(),'corp-kit/instagram/carousels.html'), {waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  const bad = await p.evaluate(() => {
    const out=[];
    document.querySelectorAll('.ig').forEach(s=>{
      const sb=s.getBoundingClientRect();
      const f=s.querySelector('.foot');
      const ft=f? f.getBoundingClientRect().top-sb.top : 1350;
      let max=0, worst='';
      s.querySelectorAll(':scope > *:not(.foot)').forEach(el=>{
        const bo=el.getBoundingClientRect().bottom-sb.top;
        if(bo>max){max=bo;worst=el.className||el.tagName;}
      });
      if(max>ft-8) out.push({id:s.id, bottom:Math.round(max), footTop:Math.round(ft), over:Math.round(max-ft), worst});
    });
    return out;
  });
  console.log(bad.length? JSON.stringify(bad,null,1) : 'переполнений нет — все 25 кадров в границах');
  await b.close();
})();
