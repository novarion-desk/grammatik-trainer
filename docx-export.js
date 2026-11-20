/* Word-Export (.docx): wandelt die Druck-HTML in ein bearbeitbares Word-Dokument um.
   Die Farben und Formatierungen werden aus der echten Darstellung gelesen (getComputedStyle). */
(function(){
'use strict';
const GT=window.GT=window.GT||{};
const FONT='Calibri',BASE=22,PAGEW=9866; /* A4 mit ca. 1.8 cm Rand, in Twips */
let D=null;

function loadLib(){
  if(window.docx){D=window.docx;return Promise.resolve();}
  return new Promise((res,rej)=>{
    const s=document.createElement('script');s.src='vendor/docx.min.js';
    s.onload=()=>{D=window.docx;D?res():rej(new Error('docx fehlt'));};
    s.onerror=()=>rej(new Error('Die Word-Bibliothek konnte nicht geladen werden (offline?).'));
    document.head.appendChild(s);
  });
}
function hex(c){
  const m=/rgba?\(([^)]+)\)/.exec(c||'');if(!m)return null;
  const p=m[1].split(',').map(x=>parseFloat(x));if(p.length>3&&p[3]===0)return null;
  return p.slice(0,3).map(n=>Math.round(n).toString(16).padStart(2,'0')).join('').toUpperCase();
}
const cs=el=>getComputedStyle(el);
function skip(n){
  if(n.nodeType!==1)return false;
  const t=n.tagName;
  if(/^(BUTTON|SCRIPT|STYLE|SVG|INPUT|SELECT|TEXTAREA|NOSCRIPT|DIALOG)$/i.test(t))return true;
  const c=n.classList;
  if(c.contains('noprint')||c.contains('try'))return true;
  if(n.hidden&&!c.contains('sol'))return true;
  if(!c.contains('po')&&cs(n).display==='none')return true;
  return false;
}
function txt(n){return (n.textContent||'').replace(/\s+/g,' ').trim();}

/* ---------- Inline ---------- */
function styleOf(n,st){
  const s=cs(n),o=Object.assign({},st);
  const fw=s.fontWeight;if(fw==='bold'||parseInt(fw,10)>=600)o.b=true;
  if(s.fontStyle==='italic')o.i=true;
  const col=hex(s.color);if(col)o.c=col;
  const bg=hex(s.backgroundColor);if(bg&&bg!=='FFFFFF')o.fill=bg;
  if(/underline/.test(s.textDecorationLine||''))o.u=true;
  const px=parseFloat(s.fontSize);if(px&&st.px&&Math.abs(px-st.px)>0.5)o.sz=Math.round(px/16*BASE);
  o.px=px||st.px;
  return o;
}
function run(text,st){
  return new D.TextRun({text,font:FONT,size:st.sz||BASE,bold:!!st.b,italics:!!st.i,color:st.c,
    underline:st.u?{}:undefined,shading:st.fill?{type:D.ShadingType.CLEAR,color:'auto',fill:st.fill}:undefined});
}
function inl(n,st,out){
  if(n.nodeType===3){const t=n.textContent.replace(/\s+/g,' ');if(t)out.push({t,st});return;}
  if(n.nodeType!==1||skip(n))return;
  if(n.tagName==='BR'){out.push({br:1});return;}
  const s2=styleOf(n,st);
  n.childNodes.forEach(c=>inl(c,s2,out));
}
function runs(parts){
  /* Leerzeichen am Anfang und Ende entfernen */
  const items=parts.filter(p=>p.br||p.t);
  while(items.length&&items[0].t!==undefined){items[0].t=items[0].t.replace(/^\s+/,'');if(items[0].t)break;items.shift();}
  while(items.length&&items[items.length-1].t!==undefined){const l=items[items.length-1];l.t=l.t.replace(/\s+$/,'');if(l.t)break;items.pop();}
  return items.map(p=>p.br?new D.TextRun({break:1}):run(p.t,p.st));
}

/* ---------- Absätze ---------- */
function para(parts,o){
  o=o||{};const r=runs(parts);
  return new D.Paragraph(Object.assign({children:r,spacing:{before:o.before||0,after:o.after===undefined?90:o.after,line:o.line||264,lineRule:D.LineRuleType.AUTO},keepNext:!!o.keepNext},o.extra||{}));
}
function lineP(){
  return new D.Paragraph({children:[],spacing:{before:120,after:60,line:360,lineRule:D.LineRuleType.AUTO},border:{bottom:{style:D.BorderStyle.SINGLE,size:4,color:'94A3B8',space:1}}});
}
let numRefs=[];
function newOl(){const ref='ol'+(numRefs.length+1);numRefs.push(ref);return ref;}

function inlineParts(el,st){const out=[];el.childNodes.forEach(c=>inl(c,st,out));return out;}

function headingEl(n,st){
  const t=n.tagName,s=cs(n),lvl=+t[1];
  const sz=lvl<=1?36:lvl===2?30:lvl===3?26:24;
  const col=hex(s.color)||'1E293B';
  const p=[];n.childNodes.forEach(c=>inl(c,Object.assign({},st,{b:true,c:col,sz}),p));
  const bd=lvl<=2?{bottom:{style:D.BorderStyle.SINGLE,size:8,color:col,space:2}}:undefined;
  return [para(p,{before:lvl<=2?240:160,after:90,keepNext:true,extra:{border:bd}})];
}

/* ---------- Listen ---------- */
function listEl(n,st,level,ref){
  const ordered=n.tagName==='OL';
  const myRef=ordered?newOl():'bul';
  const res=[];
  [...n.children].forEach(li=>{
    if(li.tagName!=='LI'||skip(li))return;
    const parts=[];const blocksAfter=[];
    li.childNodes.forEach(c=>{
      if(c.nodeType===1&&/^(UL|OL)$/.test(c.tagName)){blocksAfter.push(c);}
      else if(c.nodeType===1&&(cs(c).display==='block'||cs(c).display==='flex'||c.classList.contains('po'))){blocksAfter.push(c);}
      else inl(c,st,parts);
    });
    res.push(para(parts,{after:70,extra:{numbering:{reference:myRef,level:Math.min(level,1)}}}));
    blocksAfter.forEach(b=>{
      if(/^(UL|OL)$/.test(b.tagName))res.push(...listEl(b,st,level+1));
      else res.push(...blockEl(b,st));
    });
  });
  return res;
}

/* ---------- Tabellen ---------- */
function borders(color,left){
  const b=(sz,c)=>({style:D.BorderStyle.SINGLE,size:sz,color:c});
  return {top:b(4,color),bottom:b(4,color),right:b(4,color),left:left?b(left.size,left.color):b(4,color)};
}
const nob=()=>{const N={style:D.BorderStyle.NONE,size:0,color:'FFFFFF'};return {top:N,bottom:N,left:N,right:N};};

function cellContent(el,st){
  const bl=blocks(el,st);
  return bl.length?bl:[new D.Paragraph({children:[]})];
}
function tableEl(n,st){
  const rows=[...n.rows];if(!rows.length)return [];
  const ncol=Math.max(...rows.map(r=>[...r.cells].reduce((a,c)=>a+(c.colSpan||1),0)));
  const w=new Array(ncol).fill(0);
  rows.forEach(r=>{let ci=0;[...r.cells].forEach(c=>{const span=c.colSpan||1;if(span===1)w[ci]=Math.max(w[ci],Math.min(txt(c).length,60));ci+=span;});});
  const wt=w.map(x=>Math.max(8,x)),sum=wt.reduce((a,b)=>a+b,0);
  const cw=wt.map(x=>Math.round(PAGEW*x/sum));
  const trs=rows.map(r=>{
    let ci=0;
    const cells=[...r.cells].map(c=>{
      const span=c.colSpan||1;const width=cw.slice(ci,ci+span).reduce((a,b)=>a+b,0);ci+=span;
      const s=cs(c),bg=hex(s.backgroundColor),isH=c.tagName==='TH';
      const st2=styleOf(c,Object.assign({},st,{px:16}));
      if(isH)st2.b=true;
      return new D.TableCell({
        width:{size:width,type:D.WidthType.DXA},columnSpan:span>1?span:undefined,
        shading:bg&&bg!=='FFFFFF'?{type:D.ShadingType.CLEAR,color:'auto',fill:bg}:undefined,
        margins:{top:60,bottom:60,left:100,right:100},
        borders:borders('CBD5E1'),
        children:cellContent(c,Object.assign({},st2,{sz:20}))
      });
    });
    return new D.TableRow({children:cells,cantSplit:true,tableHeader:r.parentElement.tagName==='THEAD'});
  });
  return [new D.Table({width:{size:PAGEW,type:D.WidthType.DXA},columnWidths:cw,rows:trs}),spacer()];
}
function spacer(){return new D.Paragraph({children:[],spacing:{after:60,line:120}});}

/* Mehrspaltige Anordnung (grid / flex) als Tabelle ohne Rahmen */
function gridEl(items,cols,st,weights){
  const rows=[];
  for(let i=0;i<items.length;i+=cols)rows.push(items.slice(i,i+cols));
  const cw=weights?weights.map(x=>Math.round(PAGEW*x)):new Array(cols).fill(Math.round(PAGEW/cols));
  const trs=rows.map(r=>new D.TableRow({cantSplit:true,children:Array.from({length:cols},(_,j)=>{
    const it=r[j];
    return new D.TableCell({width:{size:cw[j],type:D.WidthType.DXA},borders:nob(),margins:{top:40,bottom:40,left:60,right:60},
      children:it?boxed(it,st):[new D.Paragraph({children:[]})]});
  })}));
  return [new D.Table({width:{size:PAGEW,type:D.WidthType.DXA},columnWidths:cw,rows:trs}),spacer()];
}

/* Einzelne Box (Karte, Hinweis) als Tabelle mit einer Zelle */
function boxInfo(n){
  const s=cs(n);let bg=hex(s.backgroundColor);if(bg==='FFFFFF')bg=null;
  const bw=parseFloat(s.borderLeftWidth)||0,bc=hex(s.borderLeftColor);
  const aw=parseFloat(s.borderTopWidth)||0,ac=hex(s.borderTopColor);
  return {bg,bw,bc,aw,ac,box:!!bg||bw>0||aw>0};
}
function boxed(n,st){
  const bi=boxInfo(n);
  if(!bi.box)return blocks(n,st);
  return [boxTable(n,st,bi)];
}
function boxTable(n,st,bi,width){
  const col=bi.bc||bi.ac||'CBD5E1';
  const left=bi.bw>=3?{size:Math.min(24,Math.round(bi.bw*6)),color:col}:null;
  const st2=styleOf(n,Object.assign({},st,{px:16}));
  const inner=cellContent(n,Object.assign({},st2));
  return new D.Table({width:{size:width||'100%',type:width?D.WidthType.DXA:D.WidthType.PERCENTAGE},rows:[new D.TableRow({cantSplit:true,children:[new D.TableCell({
    width:{size:width||PAGEW,type:D.WidthType.DXA},
    shading:bi.bg?{type:D.ShadingType.CLEAR,color:'auto',fill:bi.bg}:undefined,
    margins:{top:90,bottom:90,left:150,right:150},
    borders:borders(bi.ac&&!bi.bc?bi.ac:(col==='CBD5E1'?'CBD5E1':col),left),
    children:inner})]})]});
}

/* ---------- Block-Elemente ---------- */
function blocks(el,st){
  const res=[];let buf=[];
  const flush=()=>{if(buf.length&&buf.some(p=>p.br||(p.t&&p.t.trim()))){res.push(para(buf,{after:el.closest&&el.closest('td,th')?40:90}));}buf=[];};
  el.childNodes.forEach(n=>{
    if(n.nodeType===3){inl(n,st,buf);return;}
    if(n.nodeType!==1||skip(n))return;
    const s=cs(n),d=s.display,t=n.tagName;
    const isBlock=/^(DIV|P|H[1-6]|UL|OL|TABLE|SECTION|ARTICLE|BLOCKQUOTE|PRE|DETAILS|SUMMARY|HR|FIGURE|HEADER|FOOTER)$/.test(t)||/^(block|flex|grid|table|list-item)$/.test(d);
    if(!isBlock){inl(n,st,buf);return;}
    flush();res.push(...blockEl(n,st));
  });
  flush();return res;
}
function blockEl(n,st){
  const t=n.tagName,c=n.classList,s=cs(n);
  if(skip(n))return [];
  if(c.contains('po')||(c.contains('wl')&&!n.children.length)){return [lineP(),lineP()].slice(0,c.contains('po')?2:1);}
  if(c.contains('wo')){
    const parts=[];[...n.children].forEach((o,i)=>{if(i)parts.push({t:'      ',st});parts.push({t:'☐ '+txt(o),st});});
    return [para(parts,{after:110})];
  }
  if(/^H[1-6]$/.test(t))return headingEl(n,st);
  if(t==='HR')return [new D.Paragraph({children:[],border:{bottom:{style:D.BorderStyle.SINGLE,size:6,color:'CBD5E1',space:1}},spacing:{after:80}})];
  if(t==='TABLE')return tableEl(n,st);
  if(t==='UL'||t==='OL')return listEl(n,st,0).concat([]);
  if(t==='P'){
    const parts=inlineParts(n,styleOf(n,st));
    const lead=c.contains('lead');
    if(lead)parts.forEach(p=>{if(p.st)p.st=Object.assign({},p.st,{sz:24});});
    const bi=boxInfo(n);
    const al=s.textAlign==='center'?D.AlignmentType.CENTER:undefined;
    if(bi.box&&(bi.bg||bi.bw>0))return [boxTable(n,st,bi)];
    return [para(parts,{extra:{alignment:al}})];
  }
  /* Grid: zwei oder drei Spalten */
  const gm=/(?:^|\s)grid([234])(?:\s|$)/.exec(n.className||'');
  if((s.display==='grid'||gm)&&n.children.length){
    const cols=gm?+gm[1]:Math.max(1,(s.gridTemplateColumns||'').split(' ').length);
    const items=[...n.children].filter(x=>!skip(x));
    return gridEl(items,Math.min(cols,3),st);
  }
  /* Flex: nebeneinander */
  if(s.display==='flex'&&s.flexDirection!=='column'&&n.children.length>1){
    const items=[...n.children].filter(x=>!skip(x));
    const lens=items.map(x=>Math.min(txt(x).length,200));
    const small=lens.map(l=>l<=3);
    const tot=lens.reduce((a,l,i)=>a+(small[i]?0:Math.max(l,10)),0)||1;
    const wts=lens.map((l,i)=>small[i]?0.08:(1-0.08*small.filter(Boolean).length)*Math.max(l,10)/tot);
    const inner=gridEl(items,items.length,st,wts);
    const bi=boxInfo(n);
    if(bi.box){
      return [new D.Table({width:{size:PAGEW,type:D.WidthType.DXA},columnWidths:[PAGEW],rows:[new D.TableRow({cantSplit:true,children:[new D.TableCell({width:{size:PAGEW,type:D.WidthType.DXA},
        shading:bi.bg?{type:D.ShadingType.CLEAR,color:'auto',fill:bi.bg}:undefined,margins:{top:90,bottom:90,left:150,right:150},
        borders:borders(bi.bc||bi.ac||'CBD5E1'),children:inner.slice(0,1)})]})]}),spacer()];
    }
    return inner;
  }
  const bi=boxInfo(n);
  const st2=styleOf(n,st);
  if(bi.box&&(bi.bg||bi.bw>0||bi.aw>0)&&!n.matches('.sec,.ps,.pbody,main')){
    return [boxTable(n,st,bi,PAGEW),spacer()];
  }
  return blocks(n,st2);
}

/* ---------- Dokument ---------- */
function headerFooter(meta){
  const hdr=new D.Header({children:[new D.Paragraph({
    spacing:{after:120},
    border:{bottom:{style:D.BorderStyle.SINGLE,size:10,color:'4F46E5',space:4}},
    children:[
      new D.TextRun({text:'Grammatik Trainer',bold:true,color:'4F46E5',size:22,font:FONT}),
      new D.TextRun({text:'   '+(meta.title||''),bold:true,size:22,font:FONT,color:'0F172A'}),
      new D.TextRun({text:'   '+(meta.sub||''),size:18,font:FONT,color:'64748B'})
    ]})]});
  const ftr=new D.Footer({children:[new D.Paragraph({alignment:D.AlignmentType.CENTER,children:[
    new D.TextRun({children:['Seite ',D.PageNumber.CURRENT],size:16,font:FONT,color:'94A3B8'})]})]});
  return {hdr,ftr};
}
/* sections: [{html,title,sub}] */
GT.docxExport=async function(sections,filename){
  await loadLib();
  numRefs=[];
  const host=document.createElement('div');
  host.id='docxhost';host.style.cssText='position:fixed;left:-99999px;top:0;width:720px;background:#fff;color:#0f172a;font-size:16px;line-height:1.5';
  document.body.appendChild(host);
  try{
    const secs=sections.map(sec=>{
      host.innerHTML=sec.html;
      host.querySelectorAll('.uw').forEach(e=>e.classList.add('on'));
      host.querySelectorAll('.sol[hidden]').forEach(e=>e.hidden=false);
      const st={sz:BASE,px:16,c:'0F172A'};
      const ch=blocks(host,st);
      const hf=headerFooter(sec);
      return {properties:{page:{size:{width:11906,height:16838},margin:{top:1300,bottom:1000,left:1020,right:1020,header:560,footer:450}}},
        headers:{default:hf.hdr},footers:{default:hf.ftr},children:ch.length?ch:[new D.Paragraph('')]};
    });
    const doc=new D.Document({
      creator:'Grammatik Trainer',title:(sections[0]&&sections[0].title)||'Grammatik Trainer',
      styles:{default:{document:{run:{font:FONT,size:BASE}}}},
      numbering:{config:[
        {reference:'bul',levels:[{level:0,format:D.LevelFormat.BULLET,text:'•',alignment:D.AlignmentType.LEFT,style:{paragraph:{indent:{left:500,hanging:260}}}},{level:1,format:D.LevelFormat.BULLET,text:'–',alignment:D.AlignmentType.LEFT,style:{paragraph:{indent:{left:900,hanging:260}}}}]}
      ].concat(numRefs.map(r=>({reference:r,levels:[{level:0,format:D.LevelFormat.DECIMAL,text:'%1.',alignment:D.AlignmentType.LEFT,style:{paragraph:{indent:{left:500,hanging:360}}}},{level:1,format:D.LevelFormat.LOWER_LETTER,text:'%2)',alignment:D.AlignmentType.LEFT,style:{paragraph:{indent:{left:900,hanging:360}}}}]})))},
      sections:secs
    });
    const blob=await D.Packer.toBlob(doc);
    if(filename){
      const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();
      setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},4000);
    }
    return blob;
  }finally{host.remove();}
};
})();
