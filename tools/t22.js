const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path').resolve(__dirname,'..')+'/';
let html=fs.readFileSync(path+'index.html','utf8').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="chapters\/([a-z0-9-]+)\.js"><\/script>/g,(m,n)=>'<script>'+fs.readFileSync(path+'chapters/'+n+'.js','utf8')+'</script>').replace(/<script src="vendor[^>]*><\/script>/g,'');
const errs=[];const m={};
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};w.print=()=>{w.__p=(w.__p||0)+1};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.Element.prototype.scrollIntoView=()=>{};Object.defineProperty(w,'localStorage',{value:{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}}});}});
const w=dom.window,d=w.document,GT=w.GT,T=GT.__test;T.S.user={uid:'t',email:'t@x'};const click=e=>e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));const q=s=>d.querySelector(s);
const cl=(a,v)=>{const el=[...d.querySelectorAll('[data-a="'+a+'"]')].find(e=>v===undefined||e.dataset.v===v);if(!el)throw new Error('missing '+a+v);click(el)};
const only=process.argv[2];
T.S.niv='A';T.S.ch='feld';T.S.teil='satz';T.S.screen='start';T.render();cl('niv','A');cl('theorie','feld');
cl('home');T.S.t.mode='slides';cl('teach','feld');const V=T.slidesVis();const idx=V.findIndex(s=>s.id==='felder');T.S.t.cur=idx;T.render();
const el=q('[data-w="felder"]');console.log('widget',!!el,el&&el.querySelectorAll('.fmchip').length);
const fsent=()=>q('.fmsent b').textContent;
for(let k=0;k<30;k++){
 const s=fsent();const chips=[...el.querySelectorAll('.fmpool .fmchip')];
 // read solution via GT chapter data: reconstruct from texts is hard -> brute: place by clicking each chip into correct field using exported fn? use wrong then check
 const n=chips.length;
 // place all in mittelfeld, check, expect err unless all m
 for(let j=0;j<n;j++){click(el.querySelector('.fmpool .fmchip'));click(el.querySelector('.fmcell[data-f="m"]'));}
 click(el.querySelector('[data-fm="chk"]'));
 const fb=el.querySelector('.fmfb').textContent;
 if(k<3)console.log(s,'->',fb.slice(0,140));
 click(el.querySelector('[data-fm="next"]'));
}
// correct placement test for fixed sentence
let tries=0;while(fsent()!=='Gestern habe ich mein Handy verloren.'&&tries++<200)click(el.querySelector('[data-fm="next"]'));
console.log(fsent());
const place=(t,f)=>{const c=[...el.querySelectorAll('.fmpool .fmchip')].find(x=>x.textContent===t);click(c);click(el.querySelector('.fmcell[data-f="'+f+'"]'));};
place('Gestern','v');place('habe','l');place('ich','m');place('mein Handy','m');place('verloren','r');
click(el.querySelector('[data-fm="chk"]'));console.log(el.querySelector('.fmfb').textContent);
console.log('errors',errs);
