const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path').resolve(__dirname,'..')+'/';
let html=fs.readFileSync(path+'index.html','utf8').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="chapters\/([a-z0-9-]+)\.js"><\/script>/g,(m,n)=>'<script>'+fs.readFileSync(path+'chapters/'+n+'.js','utf8')+'</script>').replace(/<script src="vendor[^>]*><\/script>/g,'');
const errs=[];const m={};
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};w.print=()=>{w.__p=(w.__p||0)+1};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.Element.prototype.scrollIntoView=()=>{};Object.defineProperty(w,'localStorage',{value:{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}}});}});
const w=dom.window,d=w.document,GT=w.GT,T=GT.__test;T.S.user={uid:'t',email:'t@x'};const click=e=>e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));const q=s=>d.querySelector(s);
const cl=(a,v)=>{const el=[...d.querySelectorAll('[data-a="'+a+'"]')].find(e=>v===undefined||e.dataset.v===v);if(!el)throw new Error('missing '+a+v);click(el)};
const id=process.argv[2];const C=GT.chapters[id];
console.log(id,C.title,'| cats:',JSON.stringify(C.catName));
console.log('types:',Object.keys(C.TYPES).join(','));
const TK=C.TASKS;const strip=s=>String(s==null?'':s).replace(/<[^>]+>/g,'');
const want=process.argv[3]; // optional filter cat
TK.filter(t=>!want||(t.cats||[]).includes(want)).slice(0,+process.argv[4]||60).forEach(t=>console.log([t.typ,t.stufe,(t.cats||[]).join('+'),strip(t.prompt||t.sent||(t.tokens&&t.tokens.join(' '))||''),'=>',strip(t.answer),(t.opts?'['+t.opts.map(strip).join(' / ')+']':''),t.input?'INPUT':''].join(' | ').slice(0,260)));
process.exit(0)
