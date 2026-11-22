/* Gemeinsamer Satzgenerator: erzeugt Sätze mit Wortart, Fall, Nebensatz und Feld für jedes Wort.
   Daraus entstehen die Antipp-Aufgaben «Wort im Satz anklicken» in allen Kapiteln.
   Nutzung in einem Kapitel: GT.wg.tasks(task, {n:300, kinds:[...], classes:[...], ...}) */
(function(){
'use strict';
const GT=window.GT;
const rn=a=>a[Math.floor(Math.random()*a.length)];
const chance=p=>Math.random()<p;
const T=(w,t,o)=>Object.assign({w:w,t:t},o||{});
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- Nomen: [Einzahl, Mehrzahl, Geschlecht, Klasse, Genitiv/«schwach»] ---------- */
const NO={};
[['Hund','Hunde','m','A'],['Lehrer','Lehrer','m','P','Lehrers'],['Junge','Jungen','m','P','weak'],['Nachbar','Nachbarn','m','P','weak'],['Bruder','Brüder','m','P','Bruders'],
 ['Freund','Freunde','m','P','Freundes'],['Schüler','Schüler','m','P','Schülers'],['Ball','Bälle','m','T','Balles'],['Apfel','Äpfel','m','T','Apfels'],['Kuchen','Kuchen','m','T','Kuchens'],
 ['Brief','Briefe','m','T','Briefes'],['Rucksack','Rucksäcke','m','T','Rucksacks'],['Garten','Gärten','m','L','Gartens'],['Park','Parks','m','L','Parks'],['Sportplatz','Sportplätze','m','L','Sportplatzes'],
 ['Bahnhof','Bahnhöfe','m','L','Bahnhofs'],['Bus','Busse','m','V','Busses'],['Abend','Abende','m','Z','Abends'],['Sommer','Sommer','m','Z','Sommers'],['Morgen','Morgen','m','Z','Morgens'],
 ['Unterricht','Unterrichte','m','Z','Unterrichts'],
 ['Lehrerin','Lehrerinnen','f','P'],['Katze','Katzen','f','A'],['Schwester','Schwestern','f','P'],['Frau','Frauen','f','P'],['Freundin','Freundinnen','f','P'],['Mutter','Mütter','f','P'],
 ['Nachbarin','Nachbarinnen','f','P'],['Schülerin','Schülerinnen','f','P'],['Oma','Omas','f','P'],['Tasche','Taschen','f','T'],['Jacke','Jacken','f','T'],['Zeitung','Zeitungen','f','T'],
 ['Geschichte','Geschichten','f','T'],['Schule','Schulen','f','L'],['Küche','Küchen','f','L'],['Wiese','Wiesen','f','L'],['Stadt','Städte','f','L'],['Pause','Pausen','f','Z'],['Prüfung','Prüfungen','f','T'],
 ['Kind','Kinder','n','P','Kindes'],['Mädchen','Mädchen','n','P','Mädchens'],['Pferd','Pferde','n','A','Pferdes'],['Buch','Bücher','n','T','Buches'],['Fahrrad','Fahrräder','n','T','Fahrrades'],
 ['Heft','Hefte','n','T','Heftes'],['Haus','Häuser','n','L','Hauses'],['Lied','Lieder','n','T','Liedes'],['Bild','Bilder','n','T','Bildes'],['Kino','Kinos','n','L','Kinos'],
 ['Training','Trainings','n','Z','Trainings'],['Essen','Essen','n','Z','Essens'],['Wochenende','Wochenenden','n','Z','Wochenendes']
].forEach(a=>NO[a[0]]={sg:a[0],pl:a[1],g:a[2],k:a[3],gs:a[4]==='weak'?a[0]+'n':(a[4]||a[0]),weak:a[4]==='weak'});
const NAMES=['Anna','Tim','Lena','Max','Mia','Noah'];
const ADJP=['klein','gross','alt','neu','jung','freundlich','laut','schnell','nett','fleissig','hungrig','fröhlich','lustig','müde'];
const ADJT=['klein','gross','alt','neu','schön','bunt','schwer'];
const ADJ=ADJP.concat(ADJT);

/* ---------- Endungen ---------- */
const DEF={Nom:{m:'der',f:'die',n:'das',p:'die'},Akk:{m:'den',f:'die',n:'das',p:'die'},Dat:{m:'dem',f:'der',n:'dem',p:'den'},Gen:{m:'des',f:'der',n:'des',p:'der'}};
const IND={Nom:{m:'ein',f:'eine',n:'ein'},Akk:{m:'einen',f:'eine',n:'ein'},Dat:{m:'einem',f:'einer',n:'einem'},Gen:{m:'eines',f:'einer',n:'eines'}};
const PE={Nom:{m:'',f:'e',n:'',p:'e'},Akk:{m:'en',f:'e',n:'',p:'e'},Dat:{m:'em',f:'er',n:'em',p:'en'},Gen:{m:'es',f:'er',n:'es',p:'er'}};
const DE={Nom:{m:'er',f:'e',n:'es',p:'e'},Akk:{m:'en',f:'e',n:'es',p:'e'},Dat:{m:'em',f:'er',n:'em',p:'en'},Gen:{m:'es',f:'er',n:'es',p:'er'}};
const WEAK={Nom:{m:'e',f:'e',n:'e',p:'en'},Akk:{m:'en',f:'e',n:'e',p:'en'},Dat:{m:'en',f:'en',n:'en',p:'en'},Gen:{m:'en',f:'en',n:'en',p:'en'}};
const MIX={Nom:{m:'er',f:'e',n:'es',p:'en'},Akk:{m:'en',f:'e',n:'es',p:'en'},Dat:{m:'en',f:'en',n:'en',p:'en'},Gen:{m:'en',f:'en',n:'en',p:'en'}};
const STRP={Nom:'e',Akk:'e',Dat:'en',Gen:'er'};
const possForm=(st,c,g)=>{const e=PE[c][g];return st==='euer'&&e?'eur'+e:st+e;};

function nounForm(n,c,p){
  if(p)return c==='Dat'?(/[ns]$/.test(n.pl)?n.pl:n.pl+'n'):n.pl;
  if(c==='Gen')return n.g==='f'?n.sg:n.gs;
  if((c==='Dat'||c==='Akk')&&n.weak)return n.sg+'n';
  return n.sg;
}
/* Nominalgruppe: Begleiter + Adjektiv + Nomen. Alle Wörter tragen den Fall. */
function np(c,n,o){
  o=o||{};const p=o.num==='p',g=p?'p':n.g;let det=o.det||'def';if(p&&det==='indef')det='none';
  const out=[];
  if(det==='def')out.push(T(DEF[c][g],'ART',{c:c}));
  else if(det==='indef')out.push(T(IND[c][g],'ART',{c:c}));
  else if(det==='poss')out.push(T(possForm(o.poss||rn(['mein','dein','sein','ihr','unser','euer']),c,g),'POSS',{c:c}));
  else if(det==='dem')out.push(T('dies'+DE[c][g],'DEM',{c:c}));
  if(o.adj){let a=rn(n.k==='P'||n.k==='A'?ADJP:ADJT);let e;if(det==='none')e=p?STRP[c]:'er';else e=(det==='indef'||det==='poss')?MIX[c][g]:WEAK[c][g];if(/e$/.test(a)&&e)e=e.slice(1);out.push(T(a+e,'ADJ',{c:c}));}
  out.push(T(nounForm(n,c,p),'N',{c:c}));
  return out;
}
const propNP=(c,name)=>[T(name,'N',{c:c,proper:1})];
function pickDet(o,pl){const w=(o&&o.det)||{def:.55,indef:.2,poss:.25};let r=Math.random(),a=0;for(const k in w){a+=w[k];if(r<a)return(pl&&k==='indef')?'def':k;}return 'def';}
const nounsOf=k=>Object.keys(NO).filter(x=>NO[x].k===k);

/* ---------- Verben: Konjugation ich/du/er/wir/ihr/sie ---------- */
const AUX={h:['habe','hast','hat','haben','habt','haben'],s:['bin','bist','ist','sind','seid','sind']};
const MOD={wollen:['will','willst','will','wollen','wollt','wollen'],können:['kann','kannst','kann','können','könnt','können'],müssen:['muss','musst','muss','müssen','müsst','müssen']};
const mkV=(c,p,x,v,s,o,pr)=>({c:c.split(' '),p:p,x:x,v:v,s:s||'P',o:o||[],pr:!!pr});
const VERBS=[
 mkV('spiele spielst spielt spielen spielt spielen','gespielt','h','i','PA'),mkV('lache lachst lacht lachen lacht lachen','gelacht','h','i','P'),
 mkV('arbeite arbeitest arbeitet arbeiten arbeitet arbeiten','gearbeitet','h','i','P'),mkV('singe singst singt singen singt singen','gesungen','h','i','P'),
 mkV('warte wartest wartet warten wartet warten','gewartet','h','i','P'),mkV('schlafe schläfst schläft schlafen schlaft schlafen','geschlafen','h','i','PA'),
 mkV('laufe läufst läuft laufen lauft laufen','gelaufen','s','i','PA'),mkV('komme kommst kommt kommen kommt kommen','gekommen','s','i','P'),
 mkV('schwimme schwimmst schwimmt schwimmen schwimmt schwimmen','geschwommen','s','i','PA'),mkV('tanze tanzt tanzt tanzen tanzt tanzen','getanzt','h','i','P'),
 mkV('belle bellst bellt bellen bellt bellen','gebellt','h','i','D'),
 mkV('lese liest liest lesen lest lesen','gelesen','h','a','P',['Buch','Zeitung','Geschichte','Brief']),
 mkV('esse isst isst essen esst essen','gegessen','h','a','PA',['Apfel','Kuchen']),
 mkV('kaufe kaufst kauft kaufen kauft kaufen','gekauft','h','a','P',['Fahrrad','Ball','Heft','Jacke','Tasche']),
 mkV('male malst malt malen malt malen','gemalt','h','a','P',['Bild','Haus']),
 mkV('suche suchst sucht suchen sucht suchen','gesucht','h','a','P',['Rucksack','Buch','Tasche','Heft','Ball'],1),
 mkV('trage trägst trägt tragen tragt tragen','getragen','h','a','P',['Tasche','Rucksack','Jacke']),
 mkV('schreibe schreibst schreibt schreiben schreibt schreiben','geschrieben','h','a','P',['Brief','Geschichte','Lied']),
 mkV('höre hörst hört hören hört hören','gehört','h','a','P',['Lied','Geschichte'],1),
 mkV('lobe lobst lobt loben lobt loben','gelobt','h','a','P',['Schüler','Lehrerin','Kind','Freund','Hund'],1),
 mkV('besuche besuchst besucht besuchen besucht besuchen','besucht','h','a','P',['Oma','Freund','Freundin','Lehrerin','Nachbar'],1),
 mkV('sehe siehst sieht sehen seht sehen','gesehen','h','a','P',['Hund','Katze','Kind','Pferd','Freund'],1),
 mkV('helfe hilfst hilft helfen helft helfen','geholfen','h','d','P',['Nachbar','Freund','Lehrerin','Kind','Schüler']),
 mkV('danke dankst dankt danken dankt danken','gedankt','h','d','P',['Lehrerin','Oma','Freundin','Nachbar','Mutter']),
 mkV('antworte antwortest antwortet antworten antwortet antworten','geantwortet','h','d','P',['Lehrer','Frau','Schüler','Bruder','Kind']),
 mkV('gebe gibst gibt geben gebt geben','gegeben','h','ad','P',['Heft','Buch','Ball','Brief']),
 mkV('zeige zeigst zeigt zeigen zeigt zeigen','gezeigt','h','ad','P',['Bild','Haus','Heft']),
 mkV('schenke schenkst schenkt schenken schenkt schenken','geschenkt','h','ad','P',['Buch','Ball','Jacke']),
 mkV('bringe bringst bringt bringen bringt bringen','gebracht','h','ad','P',['Brief','Tasche','Kuchen'])
];
const DATPERS=['Nachbar','Freund','Lehrerin','Kind','Schüler','Oma','Freundin','Mutter','Bruder','Schwester','Nachbarin','Lehrer'];
const SEP=[
 {c:'stehe stehst steht stehen steht stehen',vz:'auf',p:'aufgestanden',x:'s',v:'i'},{c:'räume räumst räumt räumen räumt räumen',vz:'auf',p:'aufgeräumt',x:'h',v:'a',o:['Heft','Tasche','Küche']},
 {c:'rufe rufst ruft rufen ruft rufen',vz:'an',p:'angerufen',x:'h',v:'a',o:['Freund','Oma','Lehrerin']},{c:'kaufe kaufst kauft kaufen kauft kaufen',vz:'ein',p:'eingekauft',x:'h',v:'i'},
 {c:'komme kommst kommt kommen kommt kommen',vz:'mit',p:'mitgekommen',x:'s',v:'i'},{c:'fange fängst fängt fangen fangt fangen',vz:'an',p:'angefangen',x:'h',v:'i'}
].map(v=>({c:v.c.split(' '),vz:v.vz,p:v.p,x:v.x,v:v.v,o:v.o||[],s:'P'}));
const REFLV=[
 {c:'freue freust freut freuen freut freuen'.split(' '),p:'gefreut',pp:['auf','Akk',['Pause','Wochenende','Training']],x:'h'},
 {c:'ärgere ärgerst ärgert ärgern ärgert ärgern'.split(' '),p:'geärgert',pp:['über','Akk',['Prüfung','Bus','Hund']],x:'h'},
 {c:'wasche wäschst wäscht waschen wascht waschen'.split(' '),p:'gewaschen',x:'h'},
 {c:'beeile beeilst beeilt beeilen beeilt beeilen'.split(' '),p:'beeilt',x:'h'},
 {c:'erinnere erinnerst erinnert erinnern erinnert erinnern'.split(' '),p:'erinnert',pp:['an','Akk',['Schule','Sommer','Wochenende']],x:'h'}
];
const PERS={Nom:['ich','du','er','wir','ihr','sie'],Akk:['mich','dich','ihn','uns','euch','sie'],Dat:['mir','dir','ihm','uns','euch','ihnen']};
const P3={Nom:['er','sie'],Akk:['ihn','sie','es'],Dat:['ihm','ihr','ihm']};
const persForm=(c,pi)=>pi===2?rn(P3[c]):PERS[c][pi];
const REFL=['mich','dich','sich','uns','euch','sich'];
const PP=[['in','Dat',['Garten','Schule','Küche','Park','Stadt','Haus']],['auf','Dat',['Wiese','Sportplatz']],['vor','Dat',['Haus','Schule','Kino']],
 ['nach','Dat',['Training','Unterricht','Essen']],['mit','Dat',['Bruder','Freund','Freundin','Hund','Bus','Schwester']],['für','Akk',['Schule','Prüfung','Freund','Lehrerin']],
 ['durch','Akk',['Park','Stadt','Garten']],['zu','Dat',['Schule','Freund','Bahnhof','Oma']],['aus','Dat',['Schule','Haus','Stadt']],['bei','Dat',['Freund','Oma','Nachbar']],
 ['an','Dat',['Abend','Wochenende','Morgen']],['in','Dat',['Sommer','Pause']],['ohne','Akk',['Hund','Freund','Jacke']]];
const ADVL=['heute','gestern','oft','manchmal','leider','dort','hier','immer','bald','später','draussen','gern','jetzt'];
const ADVPAST=['gestern','oft','manchmal','leider','dort','hier','immer','draussen','gern','heute'];
const ADVPRES=['bald','später','oft','manchmal','leider','dort','hier','immer','draussen','gern','jetzt','heute'];
const advFor=mode=>rn(mode==='perf'?ADVPAST:ADVPRES);
const CONTR={'in dem':'im','an dem':'am','zu dem':'zum','bei dem':'beim','von dem':'vom','in das':'ins','zu der':'zur'};

/* Präpositionalgefüge: Präposition + Nominalgruppe (Artikel kann mit der Präposition verschmelzen) */
function ppGroup(o){
  const d=rn(PP),n=NO[rn(d[2])],c=d[1];
  let det=pickDet({det:{def:.7,indef:.15,poss:.15}},false);
  if(n.k==='Z'||(n.k==='L'&&det==='poss'))det='def';
  const g=np(c,n,{det:det,adj:chance(o.adj||.15)});
  const prep=T(d[0],'PRP');
  if(o.contract!==false&&det==='def'&&g.length===2&&chance(.7)){const m=CONTR[d[0]+' '+g[0].w];if(m){return[Object.assign(T(m,'PRP'),{c:c,merged:1}),g[1]];}}
  return[prep].concat(g);
}
/* Subjekt: Person/Tier/Name, Nominalgruppe */
function subject(v,o,forcePl){
  let pool=v.s==='D'?['Hund']:v.s==='A'?nounsOf('A'):v.s==='PA'?nounsOf('P').concat(nounsOf('A')):nounsOf('P');
  const pl=forcePl!==undefined?forcePl:chance(.3);
  if(!pl&&v.s!=='D'&&chance(.2))return{toks:propNP('Nom',rn(NAMES)),pi:2};
  const n=NO[rn(pool)];
  return{toks:np('Nom',n,{num:pl?'p':'s',det:pickDet(o,pl),adj:chance(o.adj||.2)}),pi:pl?5:2};
}
function objNP(c,key,o){const n=NO[key];const pl=chance(.2)&&n.k==='T'?true:false;return np(c,n,{num:pl?'p':'s',det:pickDet(o,pl),adj:chance(o.adj||.2)});}
function pronounObj(c,pi){return[T(persForm(c,pi),'PERS',{c:c})];}

/* Mehrteilige Verbformen */
function verbForms(v,pi,mode){
  // gibt {fin, rk[]} zurück
  if(mode==='perf')return{fin:T(AUX[v.x][pi],'V'),rk:[T(v.p,'V')]};
  if(mode==='modal'){const m=MOD[rn(Object.keys(MOD))];return{fin:T(m[pi],'V'),rk:[T(v.c[3],'V')]};}
  return{fin:T(v.c[pi],'V'),rk:[]};
}
function fieldsMain(parts,fin,rk,o){
  // parts: {S,A,O[],P}; wählt das Vorfeld und ordnet das Mittelfeld
  const cand=[];['S','S','S','A','P'].forEach(k=>{if(parts[k]&&parts[k].length)cand.push(k);});
  let vf=rn(cand);if(!vf)vf='S';
  const mf=[];
  const push=(arr,tag)=>{if(arr)arr.forEach(t=>t.f=tag);};
  const order=['S','A','O','P'];
  const out=[];
  const VFtoks=parts[vf]||[];VFtoks.forEach(t=>t.f='Vorfeld');
  out.push(...VFtoks);
  fin.f='Linke Satzklammer';out.push(fin);
  order.forEach(k=>{if(k===vf)return;if(k==='O'){(parts.O||[]).forEach(a=>a.forEach(t=>{t.f='Mittelfeld';out.push(t);}));}else if(parts[k]){parts[k].forEach(t=>{t.f='Mittelfeld';out.push(t);});}});
  rk.forEach(t=>{t.f='Rechte Satzklammer';out.push(t);});
  return out;
}

/* ---------- Satzarten ---------- */
function genBasic(o){
  const sepMode=o.sep!==false&&chance(.1);
  let v,pi,S,parts={},mode;
  if(sepMode){v=rn(SEP);}else v=rn(VERBS);
  const sub=subject(sepMode?{s:'P'}:v,o);S=sub.toks;pi=sub.pi;
  // Subjekt als Personalpronomen
  if(o.pron&&chance(o.pron)&&sub.pi!==undefined){const p=rn([0,1,2,3,4,5]);S=[T(persForm('Nom',p),'PERS',{c:'Nom'})];pi=p;}
  mode=sepMode?'sep':chance(.38)?'perf':chance(.12)?'modal':'pres';
  let fin,rk=[];
  if(sepMode){
    if(mode==='sep'&&chance(.3)){fin=T(AUX[v.x][pi],'V');rk=[T(v.p,'V')];}
    else{fin=T(v.c[pi],'V');rk=[T(v.vz,'VZ')];}
  }else{const f=verbForms(v,pi,mode);fin=f.fin;rk=f.rk;}
  parts.S=S;
  const objs=[];
  const vv=v.v;
  if(vv==='d'||vv==='ad'){const dk=(v.o&&vv==='d')?rn(v.o):rn(DATPERS);objs.push(o.pron&&chance(o.pron*.7)?pronounObj('Dat',rn([0,1,2,3,4,5])):objNP('Dat',dk,o));}
  if(vv==='a'||vv==='ad'){const ak=rn(v.o);objs.push(o.pron&&vv==='a'&&v.pr&&chance(o.pron*.7)?pronounObj('Akk',rn([0,1,2,3,4,5])):objNP('Akk',ak,o));}
  if(objs.length)parts.O=objs;
  if(chance(.45))parts.A=[T(advFor(mode==='perf'?'perf':'pres'),'ADV')];
  if(chance(.4)&&!(vv==='ad'))parts.P=ppGroup(o);
  const toks=fieldsMain(parts,fin,rk,o);
  toks.forEach(t=>t.cl='HS');
  return{toks:toks,lv:mode==='modal'||sepMode||vv==='ad'?2:1};
}
/* Hauptsatz + Nebensatz */
function nsClause(o,kind){
  // gibt die Wörter eines Nebensatzes (Verb am Ende) zurück
  const v=rn(VERBS.filter(x=>x.v==='i'||x.v==='a'));const sub=subject(v,o);let S=sub.toks,pi=sub.pi;
  if(o.pron&&chance(o.pron)){const p=rn([0,1,2,3,4,5]);S=[T(persForm('Nom',p),'PERS',{c:'Nom'})];pi=p;}
  const perf=kind==='als'||chance(.4);const out=[];
  out.push(...S);
  if(chance(.3))out.push(T(advFor(perf?'perf':'pres'),'ADV'));
  if(v.v==='a'){out.push(...objNP('Akk',rn(v.o),o));}
  if(perf){out.push(T(v.p,'V'));out.push(T(AUX[v.x][pi],'V'));}else out.push(T(v.c[pi],'V'));
  return out;
}
const SUBKJ=['weil','dass','wenn','obwohl','bevor','als'];
const SAYV=[['sagt','sagen'],['glaubt','glauben'],['weiss','wissen'],['meint','meinen']];
function genKonj(o){
  const kind=rn(['sub','sub','sub','koord','koord']);
  if(kind==='sub'){
    const kj=rn(SUBKJ);let hs,ns;
    if(kj==='dass'){const sv=rn(SAYV),sub=subject({s:'P'},o);const pl=sub.pi===5;hs=[...sub.toks,T(pl?sv[1]:sv[0],'V')];hs[0].f='Vorfeld';sub.toks.forEach(t=>t.f='Vorfeld');hs[hs.length-1].f='Linke Satzklammer';ns=nsClause(o,kj);
      if(sv[0]==='weiss'&&pl)hs[hs.length-1].w='wissen';
      if(sv[0]==='weiss'&&!pl)hs[hs.length-1].w='weiss';}
    else{hs=genBasic(Object.assign({},o,{sep:false})).toks.map(t=>({w:t.w,t:t.t,c:t.c,f:t.f}));ns=nsClause(o,kj);}
    hs.forEach(t=>{t.cl='HS';t.f=t.f||'';});
    const nsT=[T(kj,'KJ',{k:'S'}),...ns];nsT.forEach(t=>{t.cl='NS';t.f='Nachfeld';});
    if(kj==='dass'||chance(.8)){// Nebensatz nachgestellt
      hs[hs.length-1].p=',';return{toks:hs.concat(nsT),lv:1};}
    // Nebensatz zuerst (nur bei weil/wenn/obwohl/als/bevor)
    const lead=nsT.map(t=>Object.assign({},t,{f:'Vorfeld'}));lead[lead.length-1].p=',';
    const hs2=genBasic(Object.assign({},o,{sep:false})).toks;hs2.forEach(t=>{t.cl='HS';});
    // im Hauptsatz folgt das Verb direkt nach dem Nebensatz: Vorfeld des Hauptsatzes bleibt leer
    const fixed=reorderAfterNS(hs2);
    return{toks:lead.concat(fixed),lv:2};
  }
  const kj=rn(['und','aber','denn','oder']);
  const a=genBasic(Object.assign({},o,{sep:false})).toks,b=genBasic(Object.assign({},o,{sep:false})).toks;
  a.forEach(t=>{t.cl='HS';});b.forEach(t=>{t.cl='HS';});
  if(kj==='aber'||kj==='denn')a[a.length-1].p=',';
  a.concat(b).forEach(t=>{delete t.f;});
  return{toks:a.concat([T(kj,'KJ',{k:'K',cl:'HS'})],b),lv:1};
}
function reorderAfterNS(hs){
  // Hauptsatz nach vorangestelltem Nebensatz: Verb zuerst, Subjekt danach
  const i=hs.findIndex(t=>t.f==='Linke Satzklammer');if(i<0)return hs;
  const before=hs.slice(0,i),fin=hs[i],after=hs.slice(i+1);
  fin.f='Linke Satzklammer';
  // Wörter des Vorfelds gehören jetzt ins Mittelfeld
  before.forEach(t=>t.f='Mittelfeld');
  return[fin].concat(before,after);
}
/* Personalpronomen (Subjekt + Objekt) */
function genPers(o){
  const v=rn(VERBS.filter(x=>x.pr||x.v==='d'||x.v==='i'||x.v==='ad'));
  const sp=rn([0,1,2,3,4,5]);
  const S=[T(persForm('Nom',sp),'PERS',{c:'Nom'})];
  const mode=chance(.3)?'perf':'pres';const f=verbForms(v,sp,mode);
  const parts={S:S};
  if(v.v==='a')parts.O=[pronounObj('Akk',rn([0,1,2,3,4,5].filter(x=>x!==sp)))];
  else if(v.v==='d')parts.O=[pronounObj('Dat',rn([0,1,2,3,4,5].filter(x=>x!==sp)))];
  else if(v.v==='ad')parts.O=[pronounObj('Dat',rn([0,1,2,3,4,5].filter(x=>x!==sp))),objNP('Akk',rn(v.o),o)];
  if(chance(.3))parts.A=[T(advFor(mode),'ADV')];
  const toks=fieldsMain(parts,f.fin,f.rk,o);toks.forEach(t=>t.cl='HS');
  return{toks:toks,lv:1};
}
/* Possessivpronomen */
function genPoss(o){
  const v=rn(VERBS.filter(x=>x.v==='a'));const sub=subject(v,Object.assign({},o,{det:{def:.6,indef:.4}}));
  const st=rn(['mein','dein','sein','ihr','unser','euer']);
  const n=NO[rn(v.o)];const pl=chance(.2);
  const obj=np('Akk',n,{num:pl?'p':'s',det:'poss',poss:st,adj:chance(.2)});
  const mode=chance(.3)?'perf':'pres';const f=verbForms(v,sub.pi,mode);
  const parts={S:sub.toks,O:[obj]};if(chance(.25))parts.A=[T(advFor(mode),'ADV')];
  const toks=fieldsMain(parts,f.fin,f.rk,o);toks.forEach(t=>t.cl='HS');return{toks:toks,lv:1};
}
/* Reflexive Verben */
function genRefl(o){
  const v=rn(REFLV);const pi=rn([0,1,2,3,4,5]);
  let S;if(pi===2){S=chance(.4)?propNP('Nom',rn(NAMES)):np('Nom',NO[rn(nounsOf('P'))],{det:pickDet(o,false)});}
  else if(pi===5){S=np('Nom',NO[rn(nounsOf('P'))],{num:'p',det:pickDet(o,true)});}
  else S=[T(PERS.Nom[pi],'PERS',{c:'Nom'})];
  const mode=chance(.3)?'perf':'pres';const parts={S:S};
  const refl=T(REFL[pi],'REFL',{c:'Akk'});
  let fin,rk=[];if(mode==='perf'){fin=T(AUX.h[pi],'V');rk=[T(v.p,'V')];}else fin=T(v.c[pi],'V');
  const out=[];const vf=S;vf.forEach(t=>t.f='Vorfeld');out.push(...vf);fin.f='Linke Satzklammer';out.push(fin);refl.f='Mittelfeld';out.push(refl);
  if(v.pp){const d=v.pp,n=NO[rn(d[2])];const g=[T(d[0],'PRP')].concat(np(d[1],n,{det:'def'}));g.forEach(t=>{t.f='Mittelfeld';out.push(t);});}
  rk.forEach(t=>{t.f='Rechte Satzklammer';out.push(t);});
  out.forEach(t=>t.cl='HS');
  return{toks:out,lv:2};
}
/* Ausgewählte Sätze mit Markierung: «Wort|TAG:Fall@Satz»  (für seltene Pronomen und Relativsätze) */
function parse(s,lv){
  const toks=s.split(' ').map(x=>{let punct='';const pm=x.match(/^(.*?)([.,?!]+)$/);if(pm){x=pm[1];punct=pm[2];}let cl='HS',c,t,w=x;const at=w.indexOf('@');if(at>=0){cl=w.slice(at+1);w=w.slice(0,at);}
    const bar=w.indexOf('|');if(bar>=0){t=w.slice(bar+1);w=w.slice(0,bar);}else t='X';
    const col=t.indexOf(':');if(col>=0){c=t.slice(col+1);t=t.slice(0,col);}
    const o={cl:cl};if(c)o.c=c;
    const tok=T(w,t,o);if(punct)tok.p=punct;return tok;});
  return{toks:toks,lv:lv||1};
}
const DEMS=[
 'Dieser|DEM Hund|N bellt|V laut|ADV.','Diese|DEM Jacke|N gefällt|V mir|PERS.','Dieses|DEM Buch|N gehört|V mir|PERS.','Jene|DEM Schülerin|N dort|ADV hat|V gewonnen|V.',
 'Ich|PERS nehme|V diesen|DEM Apfel|N, nicht|ADV jenen|DEM.','Das|DEM ist|V mein|POSS Bruder|N.','Dieser|DEM gehört|V mir|PERS.','Diese|DEM sind|V neu|ADJ.',
 'Derjenige|DEM, der|REL@NS zuerst|ADV fertig|ADJ@NS ist|V@NS, darf|V gehen|V.','Dieselbe|DEM Jacke|N trägt|V Anna|N.','Solche|DEM Aufgaben|N mag|V ich|PERS.','Diese|DEM Tasche|N hier|ADV gehört|V ihr|PERS.',
 'Wir|PERS lesen|V diese|DEM Geschichte|N.','Das|DEM hat|V mir|PERS gefallen|V.','Mit|PRP diesem|DEM Stift|N schreibe|V ich|PERS.','Dieses|DEM Fahrrad|N ist|V neu|ADJ.'
];
const INDS=[
 'Man|IND kann|V hier|ADV gut|ADV essen|V.','Niemand|IND hat|V angerufen|V.','Jemand|IND klopft|V an|VZ die|ART Tür|N.','Alle|IND lachen|V.','Jeder|IND kennt|V diesen|DEM Hund|N.','Etwas|IND liegt|V auf|PRP dem|ART Tisch|N.',
 'Nichts|IND ist|V passiert|V.','Man|IND darf|V hier|ADV nicht|ADV rauchen|V.','Alle|IND haben|V gewonnen|V.','Einige|IND Kinder|N spielen|V draussen|ADV.','Manche|IND Schüler|N brauchen|V mehr|ADV Zeit|N.',
 'Jemand|IND hat|V mein|POSS Heft|N genommen|V.','Niemand|IND kennt|V die|ART Antwort|N.','Man|IND muss|V pünktlich|ADJ sein|V.','Jeder|IND hat|V seine|POSS Aufgabe|N.','Alles|IND ist|V in|PRP Ordnung|N.'
];
const FRGS=[
 'Wer|FRG hat|V angerufen|V?','Was|FRG suchst|V du|PERS?','Welches|FRG Buch|N liest|V du|PERS?','Wem|FRG gehört|V diese|DEM Jacke|N?','Wen|FRG besuchst|V du|PERS?','Wessen|FRG Tasche|N ist|V das|DEM?',
 'Welche|FRG Aufgabe|N ist|V schwer|ADJ?','Was|FRG macht|V ihr|PERS heute|ADV?','Wer|FRG kommt|V mit|VZ?','Wen|FRG hast|V du|PERS gesehen|V?','Wem|FRG hilfst|V du|PERS?','Welcher|FRG Schüler|N fehlt|V?',
 'Was|FRG für|PRP ein|ART Tier|N ist|V das|DEM?','Wer|FRG will|V Kuchen|N?','Was|FRG isst|V die|ART Katze|N?'
];
const RELS=[
 'Der|ART Mann|N, der|REL@REL dort|ADV@REL steht|V@REL, ist|V mein|POSS Onkel|N.','Das|ART Buch|N, das|REL@REL ich|PERS@REL lese|V@REL, ist|V spannend|ADJ.','Die|ART Frau|N, die|REL@REL hier|ADV@REL wohnt|V@REL, ist|V nett|ADJ.',
 'Der|ART Hund|N, der|REL@REL bellt|V@REL, gehört|V mir|PERS.','Die|ART Kinder|N, die|REL@REL spielen|V@REL, sind|V laut|ADJ.','Das|ART Mädchen|N, dem|REL@REL ich|PERS@REL helfe|V@REL, heisst|V Mia|N.',
 'Der|ART Freund|N, den|REL@REL ich|PERS@REL besuche|V@REL, wohnt|V weit|ADV weg|VZ.','Die|ART Jacke|N, die|REL@REL ich|PERS@REL gekauft|V@REL habe|V@REL, ist|V neu|ADJ.','Das|ART Haus|N, in|PRP@REL dem|REL@REL wir|PERS@REL wohnen|V@REL, ist|V alt|ADJ.',
 'Die|ART Lehrerin|N, mit|PRP@REL der|REL@REL wir|PERS@REL sprechen|V@REL, ist|V freundlich|ADJ.','Der|ART Junge|N, dessen|REL@REL Hund|N@REL bellt|V@REL, ist|V mein|POSS Nachbar|N.','Die|ART Schüler|N, die|REL@REL fehlen|V@REL, sind|V krank|ADJ.',
 'Alles|IND, was|REL@REL du|PERS@REL sagst|V@REL, ist|V richtig|ADJ.','Ich|PERS kenne|V den|ART Mann|N, der|REL@REL dort|ADV@REL sitzt|V@REL.','Sie|PERS liest|V das|ART Buch|N, das|REL@REL ihr|POSS@REL Bruder|N@REL geschrieben|V@REL hat|V@REL.'
];
['ART','N','V'].forEach(()=>{});

const ESS=['Es|PERS regnet|V heute|ADV.','Es|PERS schneit|V.','Es|PERS ist|V kalt|ADJ.','Es|PERS klingelt|V.','Es|PERS gibt|V heute|ADV Pizza|N.','Das|ART Kind|N ist|V müde|ADJ, es|PERS will|V schlafen|V.','Das|ART Mädchen|N lacht|V, weil|KJ@NS es|PERS@NS Geburtstag|N@NS hat|V@NS.','Es|PERS ist|V spät|ADJ.'];
const KINDS={
  basic:o=>genBasic(o),konj:o=>genKonj(o),pers:o=>genPers(o),poss:o=>genPoss(o),refl:o=>genRefl(o),
  es:()=>parse(rn(ESS),1),dem:()=>parse(rn(DEMS),1),ind:()=>parse(rn(INDS),2),frg:()=>parse(rn(FRGS),2),rel:()=>parse(rn(RELS),3)
};

/* ---------- Klassen: was soll angeklickt werden? ---------- */
const ALLPRON=['ART','PERS','POSS','REFL','DEM','IND','REL','FRG'];
const CLS={
 'Nomen':{test:t=>t.t==='N',q:'Nomen: Man kann einen Artikel davor setzen (der Hund).'},
 'Verb':{test:t=>t.t==='V'||t.t==='VZ',q:'Verben sagen, was jemand tut oder was geschieht. Sie ändern sich nach Person und Zeit.'},
 'Adjektiv':{test:t=>t.t==='ADJ',q:'Adjektive sagen, wie etwas ist. Man kann sie steigern.'},
 'Artikel':{test:t=>t.t==='ART',q:'Artikel begleiten ein Nomen: der, die, das, ein, eine.'},
 'Pronomen':{test:t=>ALLPRON.includes(t.t),q:'Pronomen stehen für ein Nomen oder begleiten es. Artikel gehören auch dazu.'},
 'Personalpronomen':{test:t=>t.t==='PERS',q:'Personalpronomen ersetzen Personen und Dinge: ich, du, er, sie, es, wir, ihr, sie (und ihre Fälle).'},
 'Possessivpronomen':{test:t=>t.t==='POSS',q:'Possessivpronomen zeigen, wem etwas gehört: mein, dein, sein, ihr, unser, euer.'},
 'Reflexivpronomen':{test:t=>t.t==='REFL',q:'Reflexivpronomen beziehen sich auf das Subjekt zurück: mich, dich, sich, uns, euch.'},
 'Demonstrativpronomen':{test:t=>t.t==='DEM',q:'Demonstrativpronomen zeigen auf etwas: dieser, diese, dieses, jener, derselbe.'},
 'Indefinitpronomen':{test:t=>t.t==='IND',q:'Indefinitpronomen sind unbestimmt: man, jemand, niemand, alle, jeder, nichts.'},
 'Relativpronomen':{test:t=>t.t==='REL',q:'Relativpronomen leiten einen Relativsatz ein: der, die, das, dem, den, dessen, was.'},
 'Fragepronomen':{test:t=>t.t==='FRG',q:'Fragepronomen leiten Fragen ein: wer, was, wem, wen, wessen, welcher.'},
 'Präposition':{test:t=>t.t==='PRP',q:'Präpositionen stehen vor einem Nomen (in, auf, mit, nach) und verlangen einen Fall.'},
 'Konjunktion':{test:t=>t.t==='KJ',q:'Konjunktionen verbinden Wörter oder Sätze: und, aber, denn, weil, dass, wenn.'},
 'Adverb':{test:t=>t.t==='ADV',q:'Adverbien sagen wann, wo oder wie. Sie verändern sich nicht: heute, dort, gern.'},
 'Partikel':{test:t=>t.t==='PRP'||t.t==='KJ'||t.t==='ADV',q:'Partikel verändern sich nie: Präpositionen, Konjunktionen, Adverbien.'},
 'Verbale Teile':{test:t=>t.t==='V'||t.t==='VZ',q:'Alle Teile des Verbs gehören zusammen: Personalform, Partizip, Infinitiv, Verbzusatz.'},
 'Nebensatz':{test:t=>t.cl==='NS'||t.cl==='REL',q:'Der Nebensatz wird mit einem Einleitewort eingeleitet. Das Verb steht am Schluss.'},
 'Hauptsatz':{test:t=>t.cl==='HS',q:'Der Hauptsatz kann allein stehen. Das Verb steht an zweiter Stelle.'},
 'Einleitewort':{test:t=>(t.t==='KJ'&&t.k==='S')||t.t==='REL',q:'Das Einleitewort steht am Anfang des Nebensatzes (weil, dass, wenn, der, die, das).'},
 'Relativsatz':{test:t=>t.cl==='REL',q:'Der Relativsatz bezieht sich auf ein Nomen und beginnt mit einem Relativpronomen.'},
 'Nominativ':{test:t=>t.c==='Nom',q:'Nominativ: Wer oder was?'},
 'Genitiv':{test:t=>t.c==='Gen',q:'Genitiv: Wessen?'},
 'Dativ':{test:t=>t.c==='Dat'&&!t.merged,q:'Dativ: Wem?'},
 'Akkusativ':{test:t=>t.c==='Akk',q:'Akkusativ: Wen oder was?'},
 'Vorfeld':{test:t=>t.f==='Vorfeld',q:'Das Vorfeld steht vor dem Verb. Dort steht genau ein Satzglied.'},
 'Linke Satzklammer':{test:t=>t.f==='Linke Satzklammer',q:'Die linke Satzklammer ist das konjugierte Verb (Personalform) an zweiter Stelle.'},
 'Mittelfeld':{test:t=>t.f==='Mittelfeld',q:'Das Mittelfeld liegt zwischen den beiden Klammern.'},
 'Rechte Satzklammer':{test:t=>t.f==='Rechte Satzklammer',q:'Die rechte Satzklammer enthält die übrigen Verbteile (Partizip, Infinitiv, Verbzusatz).'},
 'Nachfeld':{test:t=>t.f==='Nachfeld',q:'Das Nachfeld steht nach der rechten Klammer, zum Beispiel ein Nebensatz.'}
};
const INSTR={'Nomen':'Tippe alle Nomen an.','Verb':'Tippe alle Verben an (auch Hilfsverben und Verbzusätze).','Adjektiv':'Tippe alle Adjektive an.','Artikel':'Tippe alle Artikel an.','Präposition':'Tippe alle Präpositionen an.','Konjunktion':'Tippe alle Konjunktionen an.','Adverb':'Tippe alle Adverbien an.','Vorfeld':'Tippe alle Wörter im Vorfeld an.','Mittelfeld':'Tippe alle Wörter im Mittelfeld an.','Nachfeld':'Tippe alle Wörter im Nachfeld an.','Linke Satzklammer':'Tippe die linke Satzklammer an (das gebeugte Verb).','Rechte Satzklammer':'Tippe die rechte Satzklammer an (die übrigen Verbteile).','Pronomen':'Tippe alle Pronomen an (auch die Artikel).','Verbale Teile':'Tippe alle Teile des Verbs an.','Nebensatz':'Tippe alle Wörter des Nebensatzes an.','Hauptsatz':'Tippe alle Wörter des Hauptsatzes an.',
 'Einleitewort':'Tippe das Einleitewort des Nebensatzes an.','Relativsatz':'Tippe alle Wörter des Relativsatzes an.','Nominativ':'Tippe alle Wörter im Nominativ an (Wer oder was?).','Genitiv':'Tippe alle Wörter im Genitiv an (Wessen?).',
 'Dativ':'Tippe alle Wörter im Dativ an (Wem?).','Akkusativ':'Tippe alle Wörter im Akkusativ an (Wen oder was?).','Partikel':'Tippe alle Partikel an (Präpositionen, Konjunktionen, Adverbien).'};

/* Satz erzeugen: Rückgabe {toks:[Text], tags, ...} */
function sentence(kind,opt){
  const g=KINDS[kind](opt||{});
  const toks=g.toks;
  toks[0].w=cap(toks[0].w);
  const last=toks[toks.length-1];if(!last.p)last.p=kind==='frg'?'?':'.';
  else if(!/[.?!]$/.test(last.p)&&last.p===',')last.p='.';
  const texts=toks.map(t=>t.w+(t.p||''));
  // Eigennamen und Nomen gross, Sätze mit Frage enden mit ?
  return{toks:toks,text:texts,lv:g.lv||1,kind:kind};
}
function targetsOf(g,cls){const out=[];g.toks.forEach((t,i)=>{if(CLS[cls].test(t))out.push(i);});return out;}

/* Aufgaben für ein Kapitel erzeugen.
   spec: {n:Anzahl Sätze, kinds:{basic:3,pers:1,…}, opt:{…Generator-Optionen}, classes:[{gl:'Präposition',cats:['sg1'],lv:1}], perClass:max Aufgaben pro Klasse} */
function tasks(task,spec){
  const seen=new Set();const count={};const per=spec.perClass||70;
  const kinds=[];Object.keys(spec.kinds).forEach(k=>{for(let i=0;i<spec.kinds[k];i++)kinds.push(k);});
  for(let i=0;i<(spec.n||400);i++){
    const kind=rn(kinds);let g;try{g=sentence(kind,spec.opt||{});}catch(e){continue;}
    const key=g.text.join(' ');if(seen.has(key))continue;seen.add(key);
    spec.classes.forEach(c=>{
      if((count[c.gl]||0)>=per)return;
      const tg=targetsOf(g,c.gl);if(!tg.length)return;
      if(c.max&&tg.length>c.max)return;
      // Alle Wörter des Satzes klicken lassen ist keine Aufgabe
      if(tg.length===g.toks.length)return;
      let txt='';tg.forEach((k,j)=>{txt+=(j===0?'':(k===tg[j-1]+1?' ':' … '))+g.text[k].replace(/[.,?!]+$/,'');});
      count[c.gl]=(count[c.gl]||0)+1;
      task.push({typ:'markieren',stufe:Math.min(3,(g.lv||1)+(tg.length>3?1:0)),lv:Math.max(c.lv||1,g.lv>2?2:1),cats:c.cats,gl:c.gl,tokens:g.text.slice(),targets:tg,instr:c.instr||INSTR[c.gl]||('Tippe alle Wörter der Wortart «'+c.gl+'» an.'),why:'<b>'+c.gl+':</b> «'+txt+'». '+CLS[c.gl].q});
    });
  }
}
GT.wg={sentence:sentence,tasks:tasks,CLS:CLS,KINDS:KINDS,np:np,NO:NO,PERS:PERS,REFL:REFL,possForm:possForm,DEF:DEF,IND:IND,nounForm:nounForm,ADJ:ADJ,NAMES:NAMES,VERBS:VERBS,rn:rn};
})();
