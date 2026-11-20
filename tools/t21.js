const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path').resolve(__dirname,'..')+'/';
let html=fs.readFileSync(path+'index.html','utf8').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="chapters\/([a-z0-9-]+)\.js"><\/script>/g,(m,n)=>'<script>'+fs.readFileSync(path+'chapters/'+n+'.js','utf8')+'</script>').replace(/<script src="vendor[^>]*><\/script>/g,'');
const errs=[];
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};w.print=()=>{};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.matchMedia=w.matchMedia||(()=>({matches:false,addListener(){},addEventListener(){}}));}});
const w=dom.window,d=w.document,GT=w.GT,T=GT.__test;T.S.user={uid:'t',email:'t@x'};const click=e=>e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));const q=s=>d.querySelector(s);
setTimeout(()=>{
 const cl=(a,v)=>{const el=[...d.querySelectorAll('[data-a="'+a+'"]')].find(e=>v===undefined||e.dataset.v===v);if(!el)throw new Error('missing '+a+v);click(el)};
 cl('niv','B');cl('theorie','verschiebe')
 ;
 try{
 let el=q('#s-check [data-w="try"]');
 for(let k=0;k<6;k++){
  el=q('#s-check [data-w="try"]');const t=el._t;
  t.cuts.forEach(i=>click(el.querySelector('.gap[data-i="'+i+'"]')));
  click(el.querySelector('[data-a="tchk"]'));
  const ok=!!el.querySelector('.fb.ok');
  const mv=el.querySelector('.mvb:not(.fixed)');
  const before=el.querySelector('.mvsent').textContent;
  const btns=[...el.querySelectorAll('.mvb:not(.fixed)')];click(btns[btns.length-1]);
  console.log(ok,'|',before,'->',el.querySelector('.mvsent').textContent);
  click(el.querySelector('[data-a="tnext"]'));
 }
 // falsche Antwort
 el=q('#s-check [data-w="try"]');click(el.querySelector('.gap'));click(el.querySelector('[data-a="tchk"]'));console.log('wrong ->',!!el.querySelector('.fb.err'),!!el.querySelector('.mvbox'));
 }catch(e){console.log('ERR',e.message,e.stack.split('\n')[1]);}
 console.log('errs',errs);process.exit(0);
},300);
