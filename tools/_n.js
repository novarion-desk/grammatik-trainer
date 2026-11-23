const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path').resolve(__dirname,'..')+'/';
let html=fs.readFileSync(path+'index.html','utf8').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="chapters\/([a-z0-9-]+)\.js"><\/script>/g,(m,n)=>'<script>'+fs.readFileSync(path+'chapters/'+n+'.js','utf8')+'</script>').replace(/<script src="vendor[^>]*><\/script>/g,'');
const errs=[];const m={};
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};w.print=()=>{w.__p=(w.__p||0)+1};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.Element.prototype.scrollIntoView=()=>{};Object.defineProperty(w,'localStorage',{value:{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}}});}});
const w=dom.window,d=w.document,GT=w.GT,T=GT.__test;T.S.user={uid:'t',email:'t@x'};const click=e=>e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));const q=s=>d.querySelector(s);
const cl=(a,v)=>{const el=[...d.querySelectorAll('[data-a="'+a+'"]')].find(e=>v===undefined||e.dataset.v===v);if(!el)throw new Error('missing '+a+v);click(el)};
const C=GT.chapters.rede;const s=[0,0,0,0],pc={};C.TASKS.forEach(t=>{s[t.stufe]++;(t.cats||[]).forEach(c=>pc[c]=(pc[c]||0)+1)});console.log('rede',C.TASKS.length,s.slice(1).join('/'),JSON.stringify(pc),errs);process.exit(0)
