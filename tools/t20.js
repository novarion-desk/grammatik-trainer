const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path').resolve(__dirname,'..')+'/';
let html=fs.readFileSync(path+'index.html','utf8').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="chapters\/([a-z0-9-]+)\.js"><\/script>/g,(m,n)=>'<script>'+fs.readFileSync(path+'chapters/'+n+'.js','utf8')+'</script>').replace(/<script src="vendor[^>]*><\/script>/g,'');
const errs=[];const m={};
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};w.print=()=>{w.__p=(w.__p||0)+1};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.Element.prototype.scrollIntoView=()=>{};Object.defineProperty(w,'localStorage',{value:{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}}});}});
const w=dom.window,d=w.document,GT=w.GT,T=GT.__test;T.S.user={uid:'t',email:'t@x'};const click=e=>e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));const q=s=>d.querySelector(s);
const cl=(a,v)=>{const el=[...d.querySelectorAll('[data-a="'+a+'"]')].find(e=>v===undefined||e.dataset.v===v);if(!el)throw new Error('missing '+a+v);click(el)};
const only=process.argv[2];
for(const id of Object.keys(GT.chapters)){
 if(only&&only!==id)continue;
 const C=GT.chapters[id];let bad=0,seen=new Set();
 C.TASKS.forEach(t=>{const x=JSON.stringify(t);
  if(/ß/.test(x)){bad++;console.log(' ß',t.id)}
  if(t.opts&&!t.opts.includes(t.answer)){bad++;console.log(' answer not in opts',t.id,t.answer)}
  if(t.opts&&new Set(t.opts).size!==t.opts.length){bad++;console.log(' dup opts',t.id)}
  if(t.cuts&&(!t.cuts.length||t.cuts.some(i=>i>=t.tokens.length-1))){bad++;console.log(' bad cuts',t.id)}
  if(t.tokens&&!t.cuts&&(!t.targets.length||t.targets.some(i=>i>=t.tokens.length))){bad++;console.log(' bad targets',t.id)}
  if(!t.opts&&!t.tokens&&!t.parts&&!t.input){bad++;console.log(' no answer form',t.id)}
  const k=t.typ+(t.instr||"")+(t.gl||"")+"|"+(t.sent||'')+(t.prompt||'')+(t.tokens||[]).join(' ')+(t.parts?JSON.stringify(t.parts):'')+t.answer+JSON.stringify([t.targets||0,t.cuts||0,t.opts?[...t.opts].sort():0]);if(seen.has(k)){bad++;console.log(' dup',t.id,k.slice(0,60))}seen.add(k);});
 const cnt={};C.TASKS.forEach(t=>{const k=t.typ+'/'+t.stufe;cnt[k]=(cnt[k]||0)+1});
 console.log(id,'tasks',C.TASKS.length,'bad',bad,JSON.stringify(cnt));
 // UI
 for(const niv of ['A','B','C']){
  T.S.niv=niv;T.S.ch=id;T.S.teil=C.teil;T.S.cfg.types=null;T.S.cfg.cats=null;T.S.screen='start';T.render();
  cl('niv',niv);cl('theorie',id);const secs=d.querySelectorAll('.sec').length;
  const ws=[...d.querySelectorAll('[data-w="try"]')];
  for(let r=0;r<12;r++)ws.forEach(el=>{const o=el.querySelectorAll('[data-a="tpick"]');if(!o.length)return;click(o[Math.min(r%3,o.length-1)]);click(el.querySelector('[data-a="tnext"]'));});
  cl('home');T.S.t.mode='slides';cl('teach',id);const V=T.slidesVis();for(let i=0;i<V.length;i++){T.S.t.cur=i;T.render();if(!q('.tslide'))throw 'slide '+i;if(V[i].id==='uebungen'){const n=d.querySelectorAll('.tslide [data-w="try"]:not([hidden])');const f=[...n].filter(e=>e.querySelector('.opt')).length;console.log('  uebungen live',f);}}
  cl('tmode','overview');['h','m','u'].forEach(v=>cl('tprint',v));cl('home');
  cl('config',id);
  for(let r=0;r<2;r++){cl('start');let n=0;
   while(q('#checkBtn')){const R=T.S.R,t=R.tasks[R.i];
    if(t.cuts){(r===0?t.cuts:[]).forEach(i=>click(q('.gap[data-i="'+i+'"]')));if(r===1)click(q('.gap[data-i="0"]'));}
    else if(t.tokens){t.targets.forEach(i=>click(q('.tok[data-i="'+i+'"]')));}
    else if(t.parts){t.parts.forEach((p,i)=>{if(p.f){click([...d.querySelectorAll('[data-a="brush"]')].find(x=>x.dataset.k===p.f));click(q('[data-a="paint"][data-i="'+i+'"]'))}})}
    else if(q('#wfield')){const f=q('#wfield');f.value=r===0?t.answer:'xx';f.dispatchEvent(new w.Event('input',{bubbles:true}));}
    else click(d.querySelectorAll('[data-a="pick"]')[R.order.indexOf(t.answer)]);
    cl('check');cl('next');if(++n>300)throw 'loop';}
   if(r===0)console.log('  ',niv,'secs',secs,'slides',V.length,'avail',T.visibleTasks().length,'round',q('.score').textContent);cl('again');}
  cl('home');
 }
}
console.log('errors',errs);
