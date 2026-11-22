/* Kapitel Wortlehre 6: Pronomen (inkl. Artikel). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Artikel',sg2:'Personalpronomen',sg3:'Possessivpronomen',sg4:'Reflexivpronomen',sg5:'Demonstrativ-, Frage- und Indefinitpronomen',sg6:'Relativpronomen',sg0:'Fachbegriffe'};
const task=[];
const GAP='<span class="gap">_____</span>';
const gap=s=>s.replace('___',GAP);
const rn=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const uniq=a=>a.filter((x,i)=>a.indexOf(x)===i);
const pick3=(correct,pool)=>shuf(uniq(pool).filter(x=>x!==correct)).slice(0,3);
const seen=new Set();
const add=t=>{const k=t.typ+'|'+(t.sent||t.prompt||'')+'|'+t.answer;if(t.typ!=='markieren'&&t.typ!=='text'){if(seen.has(k))return;seen.add(k);}task.push(t);};

/* ---------- Nomen für die Generatoren ---------- */
const NN=[
 {w:'Hund',g:'m',a:1},{w:'Katze',g:'f',a:1},{w:'Kind',g:'n',a:1},{w:'Freund',g:'m',a:1},{w:'Lehrerin',g:'f',a:1},
 {w:'Oma',g:'f',a:1},{w:'Bruder',g:'m',a:1},{w:'Schwester',g:'f',a:1},{w:'Opa',g:'m',a:1},{w:'Pferd',g:'n',a:1},
 {w:'Ball',g:'m'},{w:'Buch',g:'n'},{w:'Tasche',g:'f'},{w:'Heft',g:'n'},{w:'Haus',g:'n'},{w:'Fahrrad',g:'n'},{w:'Jacke',g:'f'},{w:'Rucksack',g:'m'}
];
const NP_=[{w:'Kinder',dat:'Kindern',a:1},{w:'Freunde',dat:'Freunden',a:1},{w:'Katzen',dat:'Katzen',a:1},{w:'Eltern',dat:'Eltern',a:1},{w:'Hefte',dat:'Heften'},{w:'Bücher',dat:'Büchern'}];
const DEFA={Nom:{m:'der',f:'die',n:'das',p:'die'},Akk:{m:'den',f:'die',n:'das',p:'die'},Dat:{m:'dem',f:'der',n:'dem',p:'den'}};
const INDA={Nom:{m:'ein',f:'eine',n:'ein'},Akk:{m:'einen',f:'eine',n:'ein'},Dat:{m:'einem',f:'einer',n:'einem'}};
const P3={Nom:{m:'er',f:'sie',n:'es',p:'sie'},Akk:{m:'ihn',f:'sie',n:'es',p:'sie'},Dat:{m:'ihm',f:'ihr',n:'ihm',p:'ihnen'}};
const P3ALL=['er','sie','es','ihn','ihm','ihr','ihnen'];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const CASEN={Nom:'Nominativ',Akk:'Akkusativ',Dat:'Dativ'};

/* ---------- 1. Artikel erkennen (von Hand) ---------- */
const A=[
['Welches Wort ist ein <b>bestimmter Artikel</b>?',['der','ein','mein','dieser'],'der','Bestimmte Artikel: der, die, das.',1],
['Welches Wort ist ein <b>unbestimmter Artikel</b>?',['ein','der','die','das'],'ein','Unbestimmte Artikel: ein, eine.',1],
['Welches Wort ist ein <b>bestimmter Artikel</b>?',['die','eine','keine','meine'],'die','Bestimmte Artikel: der, die, das.',1],
['Welches Wort ist ein <b>unbestimmter Artikel</b>?',['eine','das','dem','den'],'eine','Unbestimmte Artikel: ein, eine.',1],
['Welcher Satz enthält einen <b>unbestimmten</b> Artikel?',['Ich sehe einen Hund.','Ich sehe den Hund.','Ich sehe diesen Hund.','Ich sehe meinen Hund.'],'Ich sehe einen Hund.','«einen» ist die Akkusativform von «ein».',2],
['Welcher Satz enthält einen <b>bestimmten</b> Artikel?',['Das Kind lacht.','Ein Kind lacht.','Kein Kind lacht.','Mein Kind lacht.'],'Das Kind lacht.','«das» ist ein bestimmter Artikel.',2],
['Welcher Satz enthält einen <b>bestimmten</b> Artikel im Dativ?',['Ich helfe dem Kind.','Ich sehe das Kind.','Ich helfe einem Kind.','Ich helfe diesem Kind.'],'Ich helfe dem Kind.','«dem» ist der bestimmte Artikel im Dativ (männlich oder sächlich).',3],
['Welcher Satz enthält einen <b>unbestimmten</b> Artikel im Dativ?',['Sie gibt einer Freundin ein Buch.','Sie gibt der Freundin ein Buch.','Sie gibt ihrer Freundin ein Buch.','Sie gibt dieser Freundin ein Buch.'],'Sie gibt einer Freundin ein Buch.','«einer» ist der unbestimmte Artikel im Dativ (weiblich).',3]
];
A.forEach(a=>add({typ:'artikel',stufe:a[4],lv:a[4]===3?2:1,cats:['sg1'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

/* ---------- 2. Artikel einsetzen (Generator) ---------- */
(function(){
  const all=NN.concat(NP_.map(x=>({w:x.w,g:'p',dat:x.dat,a:x.a})));
  all.forEach(n=>{
    ['Nom','Akk','Dat'].forEach(c=>{
      const bestimmt=Math.random()<.6,g=n.g;
      if(g==='p'&&!bestimmt)return;
      const noun=(c==='Dat'&&g==='p')?n.dat:n.w;
      let s;
      if(c==='Nom')s='___ '+noun+' '+(g==='p'?'sind':'ist')+' heute hier.';
      else if(c==='Akk')s='Ich sehe ___ '+noun+'.';
      else{ if(n.a||g==='p')s='Ich helfe ___ '+noun+'.'; else s='Ich warte neben ___ '+noun+'.'; }
      const ans=bestimmt?DEFA[c][g]:INDA[c][g];
      const pool=bestimmt?['der','die','das','den','dem']:['ein','eine','einen','einem','einer'];
      const wrong=pick3(ans,pool);
      add({typ:'artikelein',stufe:c==='Nom'?1:c==='Akk'?2:3,lv:c==='Dat'?2:1,cats:['sg1'],
        prompt:'Setze den <b>'+(bestimmt?'bestimmten':'unbestimmten')+'</b> Artikel ein.',sent:gap(s),opts:[ans].concat(wrong),answer:ans,
        why:'<b>'+ans+'.</b> «'+noun+'» ist '+({m:'männlich',f:'weiblich',n:'sächlich',p:'Mehrzahl'})[g]+', der Fall ist '+CASEN[c]+'.'});
    });
  });
})();

/* ---------- 3. Personalpronomen ersetzen (Generator + von Hand) ---------- */
const P=[
['<b>Anna</b> spielt Klavier. → ___ spielt Klavier.','Sie',['Er','Es','Ihr'],1,'Anna ist weiblich: sie.'],
['<b>Der Hund</b> bellt. → ___ bellt.','Er',['Sie','Es','Ihm'],1,'Der Hund ist männlich: er.'],
['<b>Das Kind</b> lacht. → ___ lacht.','Es',['Er','Sie','Ihm'],1,'Das Kind ist sächlich: es.'],
['<b>Tim und ich</b> spielen. → ___ spielen.','Wir',['Ihr','Sie','Uns'],1,'Tim und ich: wir.'],
['<b>Du und Mia</b> kommt. → ___ kommt.','Ihr',['Wir','Sie','Euch'],1,'Du und Mia: ihr.'],
['<b>Die Kinder</b> singen. → ___ singen.','Sie',['Er','Es','Ihnen'],1,'Mehrzahl: sie.'],
['Ich sehe <b>den Hund</b>. → Ich sehe ___.','ihn',['er','ihm','sie'],2,'Akkusativ männlich: ihn.'],
['Ich sehe <b>die Katze</b>. → Ich sehe ___.','sie',['ihr','er','ihn'],2,'Akkusativ weiblich: sie.'],
['Ich sehe <b>das Kind</b>. → Ich sehe ___.','es',['ihm','ihn','sie'],2,'Akkusativ sächlich: es.'],
['Ich helfe <b>dem Mann</b>. → Ich helfe ___.','ihm',['ihn','er','ihr'],2,'Dativ männlich: ihm.'],
['Ich helfe <b>der Frau</b>. → Ich helfe ___.','ihr',['sie','ihm','ihnen'],2,'Dativ weiblich: ihr.'],
['Ich helfe <b>den Kindern</b>. → Ich helfe ___.','ihnen',['sie','ihm','ihr'],2,'Dativ Mehrzahl: ihnen.'],
['Sie ruft <b>uns</b> an. → Wen ruft sie an? ___','Uns',['Wir','Unser','Euch'],3,'«uns» ist Akkusativ von «wir».'],
['Er dankt <b>dir</b>. → Wem dankt er? ___','Dir',['Dich','Du','Dein'],3,'«dir» ist Dativ von «du».'],
['Das Buch gehört <b>mir</b>. → Wem gehört das Buch? ___','Mir',['Mich','Ich','Mein'],3,'«mir» ist Dativ von «ich».']
];
P.forEach(p=>add({typ:'personal',stufe:p[3],lv:p[3]===3?2:1,cats:['sg2'],sent:gap(p[0]),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> '+p[4]}));

(function(){
  const AV=[['sehe','sehen'],['suche','suchen'],['kenne','kennen'],['besuche','besuchen'],['hole','holen'],['mag','mögen']];
  const DV=[['helfe','helfen'],['danke','danken'],['antworte','antworten'],['gratuliere','gratulieren'],['folge','folgen']];
  const NV=['ist heute hier','wartet dort','kommt gleich'];
  const all=NN.concat(NP_.map(x=>({w:x.w,g:'p',dat:x.dat,a:x.a})));
  all.forEach(n=>{
    const g=n.g,pl=g==='p';
    // Nominativ
    {const art=DEFA.Nom[g],pr=P3.Nom[g];const verb=pl?'sind heute hier':'ist heute hier';
     add({typ:'personal',stufe:1,lv:1,cats:['sg2'],sent:gap('<b>'+cap(art)+' '+n.w+'</b> '+verb+'. → ___ '+verb+'.'),opts:[cap(pr)].concat(pick3(pr,P3ALL).map(cap)),answer:cap(pr),why:'<b>'+cap(pr)+'.</b> '+cap(art)+' '+n.w+' ('+({m:'männlich',f:'weiblich',n:'sächlich',p:'Mehrzahl'})[g]+', Nominativ): '+pr+'.'});}
    // Akkusativ
    {const v=rn(AV),wir=Math.random()<.3,vb=wir?v[1]:v[0],S=wir?'Wir':'Ich';const art=DEFA.Akk[g],pr=P3.Akk[g];
     add({typ:'personal',stufe:2,lv:1,cats:['sg2'],sent:gap(S+' '+vb+' <b>'+art+' '+n.w+'</b>. → '+S+' '+vb+' ___.'),opts:[pr].concat(pick3(pr,P3ALL)),answer:pr,why:'<b>'+pr+'.</b> Wen oder was '+(wir?'sehen wir':'sehe ich')+'? '+art+' '+n.w+' (Akkusativ): '+pr+'.'});}
    // Dativ (nur Lebewesen und Mehrzahl)
    if(n.a||pl){const v=rn(DV),wir=Math.random()<.3,vb=wir?v[1]:v[0],S=wir?'Wir':'Ich';const art=DEFA.Dat[g],pr=P3.Dat[g],noun=pl?n.dat:n.w;
     add({typ:'personal',stufe:3,lv:1,cats:['sg2'],sent:gap(S+' '+vb+' <b>'+art+' '+noun+'</b>. → '+S+' '+vb+' ___.'),opts:[pr].concat(pick3(pr,P3ALL)),answer:pr,why:'<b>'+pr+'.</b> Wem? '+art+' '+noun+' (Dativ): '+pr+'.'});}
  });
})();

/* ---------- 4. Fall des Pronomens bestimmen ---------- */
const FALL=[
['<b>Er</b> kommt heute.','Nom',1],['<b>Wir</b> spielen Fussball.','Nom',1],['<b>Sie</b> lacht laut.','Nom',1],['Heute habe <b>ich</b> Zeit.','Nom',1],
['Ich sehe <b>ihn</b>.','Akk',1],['Sie ruft <b>uns</b> an.','Akk',1],['Er mag <b>sie</b>.','Akk',1],['Wir besuchen <b>euch</b>.','Akk',1],['Ich kenne <b>dich</b>.','Akk',1],['Sie sucht <b>es</b>.','Akk',1],
['Ich helfe <b>ihm</b>.','Dat',2],['Er dankt <b>dir</b>.','Dat',2],['Das Buch gehört <b>mir</b>.','Dat',2],['Sie antwortet <b>ihnen</b>.','Dat',2],['Wir gratulieren <b>euch</b>.','Dat',2],['Der Film gefällt <b>ihr</b>.','Dat',2],
['Er gibt <b>mir</b> das Buch.','Dat',2],['Er gibt <b>es</b> mir.','Akk',2],['Sie zeigt <b>ihm</b> den Weg.','Dat',2],['Die Lehrerin lobt <b>uns</b>.','Akk',2],['Heute wartet <b>er</b> auf <b>dich</b>.','Nom',2],['Gestern hat <b>sie</b> mir geholfen.','Nom',2]
];
FALL.forEach(f=>{
  const m=f[0].match(/<b>(.*?)<\/b>/)[1];
  const wh={Nom:'Wer oder was?',Akk:'Wen oder was?',Dat:'Wem?'}[f[1]];
  add({typ:'fall',stufe:f[2],lv:f[2]===2&&f[1]==='Dat'?1:1,cats:['sg2'],prompt:'In welchem Fall steht das Pronomen «<b>'+m+'</b>»?',sent:f[0],opts:['Nominativ','Akkusativ','Dativ'],answer:CASEN[f[1]],why:'<b>'+CASEN[f[1]]+'.</b> Frage: '+wh+' → «'+m+'».'});
});

/* ---------- 5. Possessivpronomen ---------- */
const B=[
['Das ist <b>meine</b> Tasche. Wem gehört sie?',['mir (ich)','dir (du)','ihm (er)','uns (wir)'],'mir (ich)','«mein» gehört zu «ich».',1],
['Das ist <b>dein</b> Hund. Wem gehört er?',['dir (du)','mir (ich)','ihr (sie)','uns (wir)'],'dir (du)','«dein» gehört zu «du».',1],
['Das ist <b>sein</b> Buch. Wem gehört es?',['ihm (er)','ihr (sie)','mir (ich)','dir (du)'],'ihm (er)','«sein» gehört zu «er».',1],
['Das ist <b>ihr</b> Heft (Anna). Wem gehört es?',['ihr (sie)','ihm (er)','uns (wir)','dir (du)'],'ihr (sie)','«ihr» gehört zu «sie».',1],
['Das ist <b>unser</b> Haus. Wem gehört es?',['uns (wir)','euch (ihr)','ihnen (sie)','mir (ich)'],'uns (wir)','«unser» gehört zu «wir».',1],
['Das ist <b>euer</b> Ball. Wem gehört er?',['euch (ihr)','uns (wir)','ihnen (sie)','dir (du)'],'euch (ihr)','«euer» gehört zu «ihr».',1],
['Das sind <b>ihre</b> Hefte (die Kinder). Wem gehören sie?',['ihnen (sie, Mz.)','ihm (er)','uns (wir)','euch (ihr)'],'ihnen (sie, Mz.)','«ihr» kann auch zu «sie» (Mehrzahl) gehören.',2]
];
B.forEach(b=>add({typ:'wissen',stufe:b[4],lv:1,cats:['sg3'],prompt:b[0],opts:b[1],answer:b[2],why:b[3]}));

(function(){
  const OW=[
   {s:'Ich',v:[0],d:'mir',st:'mein'},{s:'Du',v:[1],d:'dir',st:'dein'},{s:'Tim',v:[2],d:'Tim',st:'sein'},{s:'Anna',v:[2],d:'Anna',st:'ihr'},
   {s:'Wir',v:[3],d:'uns',st:'unser'},{s:'Ihr',v:[4],d:'euch',st:'euer'},{s:'Die Kinder',v:[5],d:'den Kindern',st:'ihr'}
  ];
  const VB={sag:['sage','sagst','sagt','sagen','sagt','sagen'],such:['suche','suchst','sucht','suchen','sucht','suchen'],helf:['helfe','hilfst','hilft','helfen','helft','helfen']};
  const PE={Nom:{m:'',f:'e',n:'',p:'e'},Akk:{m:'en',f:'e',n:'',p:'e'},Dat:{m:'em',f:'er',n:'em',p:'en'}};
  const STEMS=['mein','dein','sein','ihr','unser','euer'];
  const form=(st,e)=>(st==='euer'&&e)?'eur'+e:st+e;
  const all=NN.concat(NP_.map(x=>({w:x.w,g:'p',dat:x.dat,a:x.a})));
  const items=[];
  all.forEach(n=>{['Nom','Akk','Dat'].forEach(c=>{items.push([n,c]);});});
  shuf(items).forEach(([n,c])=>{
    const g=n.g;if(c==='Dat'&&!(n.a||g==='p'))return;
    const o=rn(OW),vi=o.v[0];
    const noun=(c==='Dat'&&g==='p')?n.dat:n.w;
    const e=PE[c][g],ans=form(o.st,e);
    let s;
    if(c==='Nom')s=o.s+' '+VB.sag[vi]+': «Das '+(g==='p'?'sind':'ist')+' ___ '+n.w+'.»';
    else if(c==='Akk')s=o.s+' '+VB.such[vi]+' ___ '+n.w+'.';
    else s=o.s+' '+VB.helf[vi]+' ___ '+noun+'.';
    const own=cap(DEFA.Nom[g])+' '+n.w+(g==='p'?' gehören ':' gehört ')+o.d+'.';
    const sent=gap(s)+' <span class="muted">('+own+')</span>';
    const endings=['','e','en','em','er'].filter(x=>x!==e&&form(o.st,x)!==ans);
    const wrongE=shuf(endings).slice(0,2).map(x=>form(o.st,x));
    const otherSt=STEMS.filter(x=>x!==o.st&&form(x,e)!==ans);
    const wrongO=form(rn(otherSt),e);
    const opts=uniq([ans].concat(wrongE,[wrongO]));
    if(opts.length<4)return;
    const gname={m:'männlich',f:'weiblich',n:'sächlich',p:'Mehrzahl'}[g];
    add({typ:'possessiv',stufe:c==='Nom'?1:c==='Akk'?2:3,lv:c==='Dat'?2:1,cats:['sg3'],sent:sent,opts:opts,answer:ans,
      why:'<b>'+ans+'.</b> Besitzer: '+o.d+' → «'+o.st+'». «'+n.w+'» ist '+gname+', '+CASEN[c]+' → Endung «'+(e||'–')+'».'});
  });
})();
const B2=[
['Ich liebe ___ Familie.',['meine','mein','meiner','meinen'],'meine','«Familie» ist weiblich: meine Familie.',1],
['Er sucht ___ Hund.',['seinen','seine','seiner','sein'],'seinen','Akkusativ männlich: seinen Hund.',2],
['Sie besucht ___ Grossmutter.',['ihre','ihr','ihren','ihrem'],'ihre','«Grossmutter» ist weiblich: ihre Grossmutter.',2],
['Wir feiern ___ Geburtstag.',['unseren','unsere','unser','unseres'],'unseren','Akkusativ männlich: unseren Geburtstag.',2],
['Hast du ___ Buch dabei?',['dein','deine','deiner','deinen'],'dein','Akkusativ sächlich: dein Buch.',2],
['Er hilft ___ Freund.',['seinem','seinen','seine','sein'],'seinem','Dativ männlich: seinem Freund.',3],
['Das ist das Haus (ich) ___ Eltern.',['meiner','meine','meinen','mein'],'meiner','Genitiv Mehrzahl: meiner Eltern.',3]
];
B2.forEach(b=>add({typ:'possessiv',stufe:b[4],lv:b[4]===3?2:1,cats:['sg3'],sent:gap(b[0]),opts:b[1],answer:b[2],why:'<b>'+b[2]+'.</b> '+b[3]}));

/* ---------- 6. Reflexivpronomen ---------- */
(function(){
  const SUBJ=[['Ich',0],['Du',1],['Er',2],['Anna',2],['Wir',3],['Ihr',4],['Die Kinder',5],['Tim und Lena',5]];
  const RF=['mich','dich','sich','uns','euch','sich'];
  const V=[
   {f:['wasche','wäschst','wäscht','waschen','wascht','waschen'],x:''},
   {f:['freue','freust','freut','freuen','freut','freuen'],x:' auf die Ferien'},
   {f:['beeile','beeilst','beeilt','beeilen','beeilt','beeilen'],x:''},
   {f:['erinnere','erinnerst','erinnert','erinnern','erinnert','erinnern'],x:' an den Sommer'},
   {f:['ärgere','ärgerst','ärgert','ärgern','ärgert','ärgern'],x:' über den Lärm'},
   {f:['setze','setzt','setzt','setzen','setzt','setzen'],x:' auf das Sofa'},
   {f:['konzentriere','konzentrierst','konzentriert','konzentrieren','konzentriert','konzentrieren'],x:' auf die Aufgabe'},
   {f:['treffe','triffst','trifft','treffen','trefft','treffen'],x:' morgen',pl:1}
  ];
  const pool=['mich','dich','sich','uns','euch','mir','dir'];
  V.forEach(v=>{
    shuf(SUBJ).slice(0,5).forEach(([s,i])=>{
      if(v.pl&&![3,4,5].includes(i))return;
      const ans=RF[i];
      const sent=gap(s+' '+v.f[i]+' ___'+v.x+'.');
      const wrong=pick3(ans,pool.filter(x=>x!==ans&&!(['mir','dir'].includes(x)&&Math.random()<.6)));
      add({typ:'reflexiv',stufe:2,lv:2,cats:['sg4'],sent:sent,opts:[ans].concat(wrong),answer:ans,why:'<b>'+ans+'.</b> Das Pronomen bezieht sich auf das Subjekt zurück ('+s.toLowerCase().replace(/^./,x=>x)+' → '+ans+').'});
    });
  });
  [['Ich putze ___ die Zähne.','mir',['mich','dich','sich'],'Die Zähne sind das Akkusativobjekt, darum steht «mir» im Dativ.'],
   ['Du kämmst ___ die Haare.','dir',['dich','mir','sich'],'Die Haare sind das Akkusativobjekt, darum steht «dir» im Dativ.'],
   ['Er wäscht ___ die Hände.','sich',['ihn','ihm','mir'],'Für er/sie/es gibt es nur «sich».'],
   ['Wir waschen ___ die Hände.','uns',['wir','unser','euch'],'«uns» ist Dativ und Akkusativ zugleich.'],
   ['Ihr putzt ___ die Zähne.','euch',['ihr','eure','uns'],'«euch» ist Dativ und Akkusativ zugleich.'],
   ['Ich merke ___ die Nummer.','mir',['mich','ich','mein'],'Die Nummer ist das Akkusativobjekt, darum steht «mir» im Dativ.']
  ].forEach(r=>add({typ:'reflexiv',stufe:3,lv:3,cats:['sg4'],sent:gap(r[0]),opts:[r[1]].concat(r[2]),answer:r[1],why:'<b>'+r[1]+'.</b> '+r[3]}));
})();

/* ---------- 7. Pronomenart zuordnen ---------- */
const ART={Personalpronomen:'sg2',Possessivpronomen:'sg3',Artikel:'sg1',Reflexivpronomen:'sg4',Demonstrativpronomen:'sg5',Indefinitpronomen:'sg5',Fragepronomen:'sg5',Relativpronomen:'sg6'};
const ARTLV={Personalpronomen:1,Possessivpronomen:1,Artikel:1,Reflexivpronomen:2,Demonstrativpronomen:2,Indefinitpronomen:2,Fragepronomen:2,Relativpronomen:3};
const ARTW={
 Personalpronomen:'Personalpronomen ersetzen Personen oder Dinge (er, ihn, ihm …).',
 Possessivpronomen:'Possessivpronomen zeigen, wem etwas gehört (mein, dein, sein …).',
 Artikel:'Artikel begleiten ein Nomen (der, die, das, ein, eine …).',
 Reflexivpronomen:'Reflexivpronomen beziehen sich auf das Subjekt zurück (mich, dich, sich …).',
 Demonstrativpronomen:'Demonstrativpronomen zeigen auf etwas (dieser, jener …).',
 Indefinitpronomen:'Indefinitpronomen sind unbestimmt (man, jemand, niemand …).',
 Fragepronomen:'Fragepronomen leiten eine Frage ein (wer, was, welcher …).',
 Relativpronomen:'Relativpronomen leiten einen Relativsatz ein und beziehen sich auf ein Nomen.'};
const Z=[
['<b>Er</b> kommt später.','Er','Personalpronomen'],['Ich sehe <b>ihn</b>.','ihn','Personalpronomen'],['Sie hilft <b>mir</b>.','mir','Personalpronomen'],['Wir rufen <b>euch</b> an.','euch','Personalpronomen'],['<b>Ihr</b> kommt zu spät.','Ihr','Personalpronomen'],['Die Lehrerin lobt <b>sie</b>.','sie','Personalpronomen'],['<b>Es</b> ist spät.','Es','Personalpronomen'],
['Das ist <b>mein</b> Hund.','mein','Possessivpronomen'],['Sie liebt <b>ihre</b> Katze.','ihre','Possessivpronomen'],['<b>Unser</b> Haus ist gross.','Unser','Possessivpronomen'],['Das ist <b>ihr</b> Heft.','ihr','Possessivpronomen'],['Er sucht <b>seinen</b> Stift.','seinen','Possessivpronomen'],['Wo ist <b>euer</b> Ball?','euer','Possessivpronomen'],
['<b>Die</b> Katze schläft.','Die','Artikel'],['Ich habe <b>einen</b> Hund.','einen','Artikel'],['<b>Das</b> Kind lacht.','Das','Artikel'],['Sie gibt <b>der</b> Freundin ein Buch.','der','Artikel'],['Er hat <b>eine</b> Schwester.','eine','Artikel'],
['Er wäscht <b>sich</b>.','sich','Reflexivpronomen'],['Ich freue <b>mich</b> auf morgen.','mich','Reflexivpronomen'],['Wir treffen <b>uns</b> am Bahnhof.','uns','Reflexivpronomen'],['Ihr müsst <b>euch</b> beeilen.','euch','Reflexivpronomen'],['Du ärgerst <b>dich</b>.','dich','Reflexivpronomen'],
['<b>Diese</b> Jacke gefällt mir.','Diese','Demonstrativpronomen'],['<b>Jener</b> Mann dort winkt.','Jener','Demonstrativpronomen'],['<b>Dieser</b> hier ist schöner.','Dieser','Demonstrativpronomen'],['<b>Solche</b> Aufgaben mag ich.','Solche','Demonstrativpronomen'],['Ich nehme <b>diesen</b> Apfel.','diesen','Demonstrativpronomen'],
['<b>Wer</b> kommt?','Wer','Fragepronomen'],['<b>Was</b> machst du?','Was','Fragepronomen'],['<b>Welches</b> Buch liest du?','Welches','Fragepronomen'],['<b>Wessen</b> Tasche ist das?','Wessen','Fragepronomen'],['<b>Wem</b> hilfst du?','Wem','Fragepronomen'],
['<b>Man</b> darf hier nicht rauchen.','Man','Indefinitpronomen'],['<b>Jemand</b> hat geklingelt.','Jemand','Indefinitpronomen'],['<b>Niemand</b> war da.','Niemand','Indefinitpronomen'],['<b>Alle</b> sind da.','Alle','Indefinitpronomen'],['Ich habe <b>nichts</b> gesehen.','nichts','Indefinitpronomen'],['<b>Jeder</b> kennt das.','Jeder','Indefinitpronomen'],['<b>Etwas</b> fehlt.','Etwas','Indefinitpronomen'],
['Der Mann, <b>der</b> dort steht, ist mein Onkel.','der','Relativpronomen'],['Das Buch, <b>das</b> ich lese, ist spannend.','das','Relativpronomen'],['Die Frau, <b>die</b> neben mir wohnt, ist nett.','die','Relativpronomen'],['Der Hund, <b>dessen</b> Besitzer fehlt, bellt.','dessen','Relativpronomen'],['Der Freund, <b>dem</b> ich helfe, ist krank.','dem','Relativpronomen'],['Alles, <b>was</b> du sagst, stimmt.','was','Relativpronomen']
];
Z.forEach(z=>{
  const names=Object.keys(ART),lv=ARTLV[z[2]];
  const near={Personalpronomen:['Possessivpronomen','Reflexivpronomen','Artikel'],Possessivpronomen:['Personalpronomen','Artikel','Reflexivpronomen'],Artikel:['Possessivpronomen','Demonstrativpronomen','Personalpronomen'],Reflexivpronomen:['Personalpronomen','Possessivpronomen','Artikel'],Demonstrativpronomen:['Artikel','Personalpronomen','Possessivpronomen'],Fragepronomen:['Relativpronomen','Indefinitpronomen','Personalpronomen'],Indefinitpronomen:['Personalpronomen','Fragepronomen','Demonstrativpronomen'],Relativpronomen:['Artikel','Demonstrativpronomen','Personalpronomen']};
  const pool=lv===1?near[z[2]].filter(x=>ARTLV[x]===1).concat(['Personalpronomen','Possessivpronomen','Artikel']):near[z[2]].concat(names);
  const wrong=pick3(z[2],pool);
  add({typ:'zuordnen',stufe:lv,lv:lv,cats:[ART[z[2]]],prompt:'Welche Art von Wort ist «<b>'+z[1]+'</b>»?',sent:z[0],opts:[z[2]].concat(wrong),answer:z[2],why:'<b>'+z[2]+'.</b> '+ARTW[z[2]]});
});

/* ---------- 8. Fehler finden ---------- */
const FE=[
[['Ich helfe ihm.','Ich helfe ihn.','Ich helfe er.'],'«helfen» verlangt den Dativ: wem? → ihm.',1],
[['Sie sieht mich.','Sie sieht mir.','Sie sieht ich.'],'«sehen» verlangt den Akkusativ: wen? → mich.',1],
[['Er gibt mir das Buch.','Er gibt mich das Buch.','Er gibt ich das Buch.'],'Wem gibt er das Buch? → mir (Dativ).',1],
[['Wir besuchen unsere Oma.','Wir besuchen uns Oma.','Wir besuchen unser Oma.'],'«Oma» ist weiblich, Akkusativ: unsere Oma.',1],
[['Kommt ihr morgen?','Kommt euch morgen?','Kommt Ihnen morgen?'],'Das Subjekt steht im Nominativ: ihr.',1],
[['Er dankt dir.','Er dankt dich.','Er dankt du.'],'«danken» verlangt den Dativ: wem? → dir.',1],
[['Ich freue mich auf die Ferien.','Ich freue mir auf die Ferien.','Ich freue sich auf die Ferien.'],'Reflexiv bei «ich»: mich.',2],
[['Das Buch gehört mir.','Das Buch gehört mich.','Das Buch gehört ich.'],'«gehören» verlangt den Dativ: mir.',1],
[['Der Lehrer lobt uns.','Der Lehrer lobt wir.','Der Lehrer lobt unser.'],'«loben» verlangt den Akkusativ: wen? → uns.',1],
[['Ich gebe ihm meinen Stift.','Ich gebe ihn meinen Stift.','Ich gebe ihm mein Stift.'],'ihm (Dativ), meinen Stift (Akkusativ männlich).',2],
[['Der Hund wedelt mit seinem Schwanz.','Der Hund wedelt mit seinen Schwanz.','Der Hund wedelt mit seine Schwanz.'],'«mit» verlangt den Dativ: seinem Schwanz.',2],
[['Wir treffen uns morgen.','Wir treffen euch morgen.','Wir treffen sich morgen.'],'Reflexiv bei «wir»: uns.',2],
[['Sie zeigt ihrem Bruder ihre Zeichnung.','Sie zeigt ihren Bruder ihre Zeichnung.','Sie zeigt ihrem Bruder ihren Zeichnung.'],'ihrem Bruder (Dativ), ihre Zeichnung (Akkusativ weiblich).',2],
[['Ich ärgere mich.','Ich ärgere mir.','Ich ärgere ich.'],'Reflexiv bei «ich»: mich.',2],
[['Der Kuchen schmeckt mir.','Der Kuchen schmeckt mich.','Der Kuchen schmeckt ich.'],'«schmecken» verlangt den Dativ: mir.',1],
[['Ich rufe dich an.','Ich rufe dir an.','Ich rufe du an.'],'«anrufen» verlangt den Akkusativ: wen? → dich.',1],
[['Haben Sie Ihre Tasche dabei?','Haben sie Ihre Tasche dabei?','Haben Sie ihre Tasche dabei?'],'Höflichkeitsform: Sie und Ihre immer gross.',2],
[['Das ist unser Haus.','Das ist uns Haus.','Das ist unsere Haus.'],'«Haus» ist sächlich, Nominativ: unser Haus.',1],
[['Er hat seinen Schlüssel vergessen.','Er hat sein Schlüssel vergessen.','Er hat seinem Schlüssel vergessen.'],'Akkusativ männlich: seinen Schlüssel.',2],
[['Die Kinder spielen mit ihren Freunden.','Die Kinder spielen mit ihre Freunde.','Die Kinder spielen mit ihren Freunde.'],'«mit» verlangt den Dativ: ihren Freunden.',3]
];
FE.forEach(f=>add({typ:'fehler',stufe:f[2],lv:f[2]===3?2:1,cats:['sg2'],prompt:'Welcher Satz ist <b>richtig</b>?',opts:f[0],answer:f[0][0],why:'<b>'+f[0][0]+'</b> '+f[1]}));

/* ---------- 9. Bezug ---------- */
const BZ=[
['Das Buch liegt auf dem Tisch. Ich lese <b>es</b> gern.','es',['das Buch','der Tisch','ich','das Lesen'],'das Buch',1,'sg2','«es» ersetzt «das Buch» (sächlich).'],
['Die Kinder spielen draussen. <b>Sie</b> lachen laut.','Sie',['die Kinder','die Eltern','der Garten','das Spiel'],'die Kinder',1,'sg2','Mehrzahl: «sie» ersetzt «die Kinder».'],
['Meine Schwester wohnt in Zürich. Ich besuche <b>sie</b> oft.','sie',['meine Schwester','Zürich','ich','die Stadt'],'meine Schwester',1,'sg2','«sie» (weiblich) ersetzt «meine Schwester».'],
['Wir haben ein neues Auto. <b>Es</b> ist rot.','Es',['das Auto','wir','die Farbe','das Haus'],'das Auto',1,'sg2','«es» ersetzt «das Auto».'],
['Hast du die Tasche gesehen? Ich suche <b>sie</b>.','sie',['die Tasche','du','ich','das Suchen'],'die Tasche',1,'sg2','«sie» ersetzt «die Tasche».'],
['Tim hat einen Hund. <b>Er</b> heisst Bello.','Er',['der Hund','Tim','Bello','die Katze'],'der Hund',2,'sg2','Wer heisst Bello? Der Hund. Darum ersetzt «er» hier «der Hund».'],
['Ich habe Mia und Noah gesehen. Ich habe <b>ihnen</b> gewinkt.','ihnen',['Mia und Noah','Mia','ich','Noah'],'Mia und Noah',2,'sg2','Mehrzahl, Dativ: «ihnen» ersetzt «Mia und Noah».'],
['Die Lehrerin gibt dem Schüler ein Heft. <b>Er</b> bedankt sich.','Er',['der Schüler','die Lehrerin','das Heft','niemand'],'der Schüler',2,'sg2','Wer bedankt sich? Der Schüler: «er».'],
['Das Fahrrad steht vor der Schule. <b>Es</b> gehört meinem Bruder.','Es',['das Fahrrad','die Schule','mein Bruder','das Haus'],'das Fahrrad',2,'sg2','«es» ist sächlich: Das Fahrrad (die Schule wäre «sie»).'],
['<b>Es</b> regnet.','Es',['auf kein Nomen (Platzhalter)','auf den Regen','auf das Wetter','auf die Wolke'],'auf kein Nomen (Platzhalter)',2,'sg2','Bei Wetterverben ist «es» nur ein Platzhalter. Es ersetzt kein Nomen.'],
['<b>Es</b> ist spät.','Es',['auf kein Nomen (Platzhalter)','auf den Abend','auf die Uhr','auf das Kind'],'auf kein Nomen (Platzhalter)',2,'sg2','Bei Zeitangaben ist «es» ein Platzhalter.'],
['Anna besucht Lena. <b>Sie</b> ist krank.','Sie',['Anna oder Lena – das ist unklar','nur Anna','nur Lena','niemand'],'Anna oder Lena – das ist unklar',3,'sg2','Zwei weibliche Personen: «sie» kann beides meinen. Besser den Namen wiederholen.'],
['Der Mann, <b>der</b> dort steht, ist mein Onkel.','der',['der Mann','mein Onkel','dort','ich'],'der Mann',2,'sg6','Das Relativpronomen bezieht sich auf das Nomen davor: der Mann.'],
['Das Buch, <b>das</b> ich lese, ist spannend.','das',['das Buch','ich','das Lesen','spannend'],'das Buch',2,'sg6','Das Relativpronomen bezieht sich auf «das Buch».'],
['Der Junge, <b>dessen</b> Hund bellt, ist mein Nachbar.','dessen',['der Junge','der Hund','mein Nachbar','der Hund bellt'],'der Junge',3,'sg6','«dessen» zeigt: Der Hund gehört dem Jungen.']
];
BZ.forEach(b=>add({typ:'bezug',stufe:b[4],lv:b[5]==='sg6'?3:b[4]===3?2:1,cats:[b[5]],prompt:'Worauf bezieht sich «<b>'+b[1]+'</b>»?',sent:b[0],opts:b[2],answer:b[3],why:'<b>'+b[3]+'.</b> '+b[6]}));

/* ---------- 10. Höflichkeitsform ---------- */
[
['«Kommst du morgen?» An eine fremde Person: Kommen ___ morgen?','Sie',['sie','Ihr','Du'],'Höflichkeitsform: Sie (gross).'],
['«Wie heisst du?» An eine fremde Person: Wie heissen ___?','Sie',['sie','Ihr','Du'],'Höflichkeitsform: Sie (gross).'],
['«Ich danke dir.» An eine fremde Person: Ich danke ___.','Ihnen',['ihnen','Sie','Ihr'],'Dativ der Höflichkeitsform: Ihnen (gross).'],
['«Ist das dein Heft?» An eine fremde Person: Ist das ___ Heft?','Ihr',['ihr','Sie','Ihnen'],'Possessiv der Höflichkeitsform: Ihr (gross).'],
['«Ich rufe dich an.» An eine fremde Person: Ich rufe ___ an.','Sie',['sie','Ihnen','Ihr'],'Akkusativ der Höflichkeitsform: Sie (gross).'],
['«Hast du deine Tasche?» An eine fremde Person: Haben Sie ___ Tasche?','Ihre',['ihre','Sie','Ihnen'],'Possessiv, weiblich, Akkusativ: Ihre (gross).'],
['«Kann ich euch helfen?» An zwei fremde Personen: Kann ich ___ helfen?','Ihnen',['ihnen','euch','Sie'],'Fremde Personen siezt man, auch mehrere: Ihnen.'],
['«Wo wohnt ihr?» An zwei fremde Personen: Wo wohnen ___?','Sie',['sie','ihr','Ihnen'],'Mehrere fremde Personen: Sie (gross).']
].forEach(h=>add({typ:'hoeflich',stufe:2,lv:2,cats:['sg2'],sent:gap(h[0]),opts:[h[1]].concat(h[2]),answer:h[1],why:'<b>'+h[1]+'.</b> '+h[3]}));
[
[['Wo wohnen Sie?','Wo wohnen sie?','Wo wohnt Sie?'],'Höflichkeitsform: Sie (gross) mit dem Verb in der 3. Person Mehrzahl.'],
[['Ist das Ihr Hund?','Ist das ihr Hund?','Ist das dein Hund?'],'An eine fremde Person: Ihr (gross).'],
[['Können Sie mir helfen?','Kannst Sie mir helfen?','Können sie mir helfen?'],'«Sie» verlangt «können» (3. Person Mehrzahl) und die Grossschreibung.'],
[['Ich danke Ihnen.','Ich danke ihnen.','Ich danke Sie.'],'Dativ: Ihnen (gross).']
].forEach(h=>add({typ:'hoeflich',stufe:2,lv:2,cats:['sg2'],prompt:'Welcher Satz ist richtig? Du sprichst mit einer <b>fremden Person</b>.',opts:h[0],answer:h[0][0],why:'<b>'+h[0][0]+'</b> '+h[1]}));

/* ---------- 11. Text kürzen (Pronomen statt Wiederholung) ---------- */
[
['Tim hat einen Hund. <b>Tim</b> füttert <b>den Hund</b> jeden Tag.','Er … ihn',['Er … er','Ihn … ihn','Er … ihm'],'Tim (Nominativ) → er, den Hund (Akkusativ) → ihn.'],
['Lena liest ein Buch. <b>Lena</b> findet <b>das Buch</b> spannend.','Sie … es',['Sie … sie','Sie … ihm','Er … es'],'Lena → sie, das Buch (sächlich, Akkusativ) → es.'],
['Wir besuchen unsere Oma. Wir bringen <b>unserer Oma</b> Blumen.','ihr',['sie','ihm','ihnen'],'Wem bringen wir Blumen? Der Oma (Dativ, weiblich): ihr.'],
['Die Kinder spielen draussen. <b>Die Kinder</b> haben Spass.','Sie',['Er','Es','Ihnen'],'Mehrzahl, Nominativ: sie.'],
['Max hat Hunger. Mama gibt <b>Max</b> einen Apfel.','ihm',['ihn','er','ihr'],'Wem gibt Mama einen Apfel? Max (Dativ): ihm.'],
['Anna ruft Lena an. <b>Anna</b> fragt <b>Lena</b> nach den Hausaufgaben.','Sie … sie',['Sie … ihr','Ihr … sie','Sie … ihnen'],'Anna → sie (Nominativ), Lena → sie (Akkusativ: wen fragt sie?).'],
['Das Fahrrad ist neu. <b>Das Fahrrad</b> gehört meinem Bruder.','Es',['Er','Sie','Ihm'],'Das Fahrrad (sächlich, Nominativ): es.'],
['Ich sehe Tim und Mia. Ich winke <b>Tim und Mia</b> zu.','ihnen',['sie','ihm','ihr'],'Wem winke ich zu? Tim und Mia (Dativ, Mehrzahl): ihnen.']
].forEach(k=>add({typ:'kuerzen',stufe:2,lv:1,cats:['sg2'],prompt:'Ersetze den <b>fetten Teil</b> durch Pronomen.',sent:k[0],opts:[k[1]].concat(k[2]),answer:k[1],why:'<b>'+k[1]+'.</b> '+k[3]}));

/* ---------- 12. Wissen ---------- */
const W=[
['Wofür steht das Pronomen?',['für ein Nomen','für ein Verb','für ein Adjektiv','für einen Satz'],'für ein Nomen','Pronomen stehen für ein Nomen: «Anna kommt. Sie lacht.»','sg2',1],
['Wie nennt man «ich, du, er, sie, es, wir, ihr, sie»?',['Personalpronomen','Possessivpronomen','Artikel','Reflexivpronomen'],'Personalpronomen','Sie ersetzen Personen und Dinge.','sg2',1],
['Wie nennt man «mein, dein, sein, ihr, unser, euer»?',['Possessivpronomen','Personalpronomen','Artikel','Fragepronomen'],'Possessivpronomen','Possessivpronomen zeigen, wem etwas gehört.','sg3',1],
['Was ist ein <b>Begleiter</b>?',['ein Wort, das vor einem Nomen steht','ein Wort, das ein Verb begleitet','ein Wort, das einen Satz beendet','ein Wort, das nur allein stehen kann'],'ein Wort, das vor einem Nomen steht','Begleiter stehen vor einem Nomen: der Hund, mein Hund, dieser Hund.','sg1',1],
['Welcher Satz enthält ein Pronomen als <b>Stellvertreter</b>?',['Er bellt.','Der Hund bellt.','Mein Hund bellt.','Dieser Hund bellt.'],'Er bellt.','«Er» steht allein und ersetzt «der Hund». Die anderen Wörter begleiten das Nomen.','sg1',1],
['Welcher Satz enthält ein Pronomen als <b>Begleiter</b>?',['Mein Hund bellt.','Er bellt.','Wer bellt?','Sie schläft.'],'Mein Hund bellt.','«mein» steht vor dem Nomen «Hund».','sg1',1],
['Wie lautet «am» in voller Form?',['an dem','an den','an das','auf dem'],'an dem','am = an + dem, im = in + dem, zum = zu + dem, beim = bei + dem.','sg1',1],
['Wie lautet «zur» in voller Form?',['zu der','zu dem','zu den','zu die'],'zu der','zur = zu + der.','sg1',2],
['Wie lautet «ins» in voller Form?',['in das','in dem','in den','in die'],'in das','ins = in + das.','sg1',2],
['Welcher Satz hat <b>keinen</b> Artikel (Nullartikel)?',['Ich trinke Wasser.','Ich trinke das Wasser.','Ich trinke dieses Wasser.','Ich trinke mein Wasser.'],'Ich trinke Wasser.','Vor «Wasser» steht kein Artikel: Nullartikel.','sg1',2],
['Wie verneint man «ein Hund»?',['kein Hund','nicht Hund','nein Hund','keiner Hund'],'kein Hund','«kein» verneint Nomen mit unbestimmtem Artikel. Es wird wie «ein» dekliniert.','sg1',2],
['Was bedeutet «es» in «Es regnet»?',['Platzhalter, ersetzt kein Nomen','«es» ersetzt «der Regen»','«es» ersetzt «das Wetter»','«es» ersetzt «ich»'],'Platzhalter, ersetzt kein Nomen','Bei Wetterverben steht «es» nur, weil im Satz ein Subjekt nötig ist.','sg2',2],
['Wann schreibt man «Sie» mitten im Satz gross?',['wenn man eine Person höflich anredet','wenn es mehrere Personen sind','wenn es ein Nomen ersetzt','wenn es nach einem Komma steht'],'wenn man eine Person höflich anredet','Höflichkeitsform: Sie, Ihnen, Ihr werden immer gross geschrieben.','sg2',2],
['Wonach richtet sich ein Possessivpronomen?',['Stamm nach dem Besitzer, Endung nach dem Nomen','nur nach dem Besitzer','nur nach dem Fall des Satzes','nur nach dem Verb'],'Stamm nach dem Besitzer, Endung nach dem Nomen','Anna → ihr, Tim → sein (Besitzer). Dazu die Endung: ihren Hund, ihre Katze.','sg3',2],
['Welcher Fall folgt auf die Frage «wem?»',['Dativ','Akkusativ','Nominativ','Genitiv'],'Dativ','Wem? → Dativ. Wen oder was? → Akkusativ. Wer oder was? → Nominativ.','sg2',1],
['Mit welchem Wort fragt man im Akkusativ nach einer Person?',['wen','wer','wem','wessen'],'wen','Wen? → Akkusativ.','sg5',2],
['Was ist ein Reflexivpronomen?',['ein Pronomen, das sich auf das Subjekt zurückbezieht','ein Pronomen, das fragt','ein Pronomen, das zeigt, wem etwas gehört','ein Pronomen, das einen Nebensatz einleitet'],'ein Pronomen, das sich auf das Subjekt zurückbezieht','Ich wasche mich: «mich» meint dieselbe Person wie «ich».','sg4',2],
['Zu welcher Person gehört «sich»?',['er, sie, es und sie (Mehrzahl)','ich','du','wir'],'er, sie, es und sie (Mehrzahl)','Nur in der 3. Person gibt es «sich». Sonst: mich, dich, uns, euch.','sg4',2],
['Welches Wort ist ein <b>Demonstrativpronomen</b> (zeigt auf etwas)?',['dieser','mein','man','wer'],'dieser','Demonstrativpronomen: dieser, diese, dieses, jener, derselbe.','sg5',2],
['Welches Wort ist ein <b>Fragepronomen</b>?',['wer','er','mein','dieser'],'wer','Fragepronomen: wer, was, welcher, wessen.','sg5',2],
['Welches Wort ist ein <b>Reflexivpronomen</b>?',['sich','sie','ihr','ihm'],'sich','Reflexivpronomen: mich, dich, sich, uns, euch.','sg4',2],
['Welches Wort ist ein <b>Indefinitpronomen</b> (unbestimmt)?',['man','er','mein','dieser'],'man','Indefinitpronomen: man, jemand, niemand, alle, etwas.','sg5',2],
['Welches Wort ist ein <b>Relativpronomen</b>?',['der (Der Mann, der dort steht, …)','er','mein','sich'],'der (Der Mann, der dort steht, …)','Relativpronomen leiten einen Nebensatz ein: der, die, das, welcher.','sg6',3],
['Ergänze: Ich wasche ___.',['mich','mir','ich','mein'],'mich','Reflexiv: ich wasche mich.','sg4',2],
['Ergänze: Er freut ___ auf die Ferien.',['sich','ihn','ihm','er'],'sich','«sich freuen» ist ein reflexives Verb.','sg4',2],
['Ergänze: ___ kommt zur Party? (Frage nach einer Person)',['Wer','Was','Wem','Wessen'],'Wer','Nach Personen fragt man mit «wer».','sg5',2],
['Ergänze: ___ Tasche ist das? (Frage nach dem Besitzer)',['Wessen','Wer','Wem','Wen'],'Wessen','Nach dem Besitzer fragt man mit «wessen».','sg5',2],
['Ergänze: ___ hilfst du? (Frage nach einer Person im Dativ)',['Wem','Wen','Wer','Wessen'],'Wem','Helfen verlangt den Dativ: wem?','sg5',2],
['Ergänze: ___ siehst du dort? (Frage nach einer Person im Akkusativ)',['Wen','Wer','Wem','Wessen'],'Wen','Sehen verlangt den Akkusativ: wen?','sg5',2],
['Ergänze: ___ Buch liest du? (Auswahl aus mehreren)',['Welches','Wer','Wem','Wessen'],'Welches','«Welches Buch» fragt nach einer Auswahl. Das Nomen ist sächlich.','sg5',2],
['Ergänze: ___ hat geklingelt, aber niemand hat geöffnet.',['Jemand','Man','Alle','Nichts'],'Jemand','«jemand» meint eine unbekannte Person.','sg5',2],
['Ergänze: ___ darf hier nicht parkieren.',['Man','Mann','Wer','Dieser'],'Man','«man» meint «irgendwer» und wird kleingeschrieben. «Mann» ist ein Nomen.','sg5',2],
['Ergänze: ___ Jacke gefällt mir. (Du zeigst auf eine Jacke.)',['Diese','Wer','Man','Welche'],'Diese','Demonstrativpronomen zeigen auf etwas.','sg5',2],
['Ergänze: Ich nehme ___ Apfel hier. (Du zeigst darauf.)',['diesen','dieser','dieses','diesem'],'diesen','Akkusativ männlich: diesen Apfel.','sg5',2],
['Ergänze: Das Mädchen, ___ ich helfe, ist neu.',['dem','den','der','die'],'dem','Das Mädchen ist sächlich. Wem helfe ich? Dativ: dem.','sg6',3],
['Ergänze: Der Mann, ___ Hund bellt, ist mein Nachbar.',['dessen','dem','deren','der'],'dessen','Der Hund gehört dem Mann: dessen (Genitiv, männlich).','sg6',3],
['Ergänze: Die Frau, ___ ich sehe, ist nett.',['die','der','dem','den'],'die','Die Frau ist weiblich, Akkusativ: die.','sg6',3],
['Wonach richtet sich der Fall eines Relativpronomens?',['nach seiner Aufgabe im Relativsatz','nach dem Fall des Bezugsworts','nach dem Verb im Hauptsatz','nach dem Subjekt des Hauptsatzes'],'nach seiner Aufgabe im Relativsatz','Geschlecht und Zahl kommen vom Bezugswort, der Fall von der Rolle im Relativsatz.','sg6',3]
];
W.forEach(w=>add({typ:'wissen',stufe:w[5],lv:w[5]===3?3:w[5]===2?(w[4]==='sg1'||w[4]==='sg2'||w[4]==='sg3'?1:2):1,cats:[w[4]],prompt:w[0].replace('___',GAP),opts:w[1],answer:w[2],why:w[3]}));

/* ---------- 13. Fachbegriffe ---------- */
const FB=[
['Was ist das deutsche Wort für «Pronomen»?','Fürwort',['Zeitwort','Eigenschaftswort','Namenwort'],'Pronomen = Fürwort (steht «für» ein Nomen).'],
['Was ist das deutsche Wort für «Artikel»?','Geschlechtswort',['Fürwort','Zeitwort','Verhältniswort'],'Artikel = Geschlechtswort.'],
['Was ist das deutsche Wort für «Personalpronomen»?','persönliches Fürwort',['besitzanzeigendes Fürwort','rückbezügliches Fürwort','hinweisendes Fürwort'],'Personalpronomen = persönliches Fürwort.'],
['Was ist das deutsche Wort für «Possessivpronomen»?','besitzanzeigendes Fürwort',['persönliches Fürwort','rückbezügliches Fürwort','Fragefürwort'],'Possessivpronomen = besitzanzeigendes Fürwort.'],
['Was ist das deutsche Wort für «Reflexivpronomen»?','rückbezügliches Fürwort',['besitzanzeigendes Fürwort','hinweisendes Fürwort','unbestimmtes Fürwort'],'Reflexivpronomen = rückbezügliches Fürwort.'],
['Was ist das deutsche Wort für «Demonstrativpronomen»?','hinweisendes Fürwort',['rückbezügliches Fürwort','unbestimmtes Fürwort','persönliches Fürwort'],'Demonstrativpronomen = hinweisendes Fürwort.'],
['Was ist das deutsche Wort für «Indefinitpronomen»?','unbestimmtes Fürwort',['hinweisendes Fürwort','bezügliches Fürwort','Fragefürwort'],'Indefinitpronomen = unbestimmtes Fürwort.'],
['Was ist das deutsche Wort für «Relativpronomen»?','bezügliches Fürwort',['unbestimmtes Fürwort','Fragefürwort','besitzanzeigendes Fürwort'],'Relativpronomen = bezügliches Fürwort.'],
['Was ist das deutsche Wort für «Fragepronomen» (Interrogativpronomen)?','Fragefürwort',['bezügliches Fürwort','hinweisendes Fürwort','persönliches Fürwort'],'Fragepronomen = Fragefürwort.'],
['Welcher Fachbegriff passt zu «hinweisendes Fürwort»?','Demonstrativpronomen',['Possessivpronomen','Reflexivpronomen','Relativpronomen'],'hinweisendes Fürwort = Demonstrativpronomen.'],
['Welcher Fachbegriff passt zu «besitzanzeigendes Fürwort»?','Possessivpronomen',['Personalpronomen','Demonstrativpronomen','Indefinitpronomen'],'besitzanzeigendes Fürwort = Possessivpronomen.'],
['Welcher Fachbegriff passt zu «rückbezügliches Fürwort»?','Reflexivpronomen',['Relativpronomen','Personalpronomen','Possessivpronomen'],'rückbezügliches Fürwort = Reflexivpronomen.'],
['Welcher Fachbegriff passt zu «unbestimmtes Fürwort»?','Indefinitpronomen',['Demonstrativpronomen','Fragepronomen','Personalpronomen'],'unbestimmtes Fürwort = Indefinitpronomen.'],
['Wie heisst der Dativ auch?','Wem-Fall',['Wer-Fall','Wen-Fall','Wessen-Fall'],'Dativ = Wem-Fall.'],
['Wie heisst der Akkusativ auch?','Wen-Fall',['Wer-Fall','Wem-Fall','Wessen-Fall'],'Akkusativ = Wen-Fall.'],
['Wie heisst der Genitiv auch?','Wessen-Fall',['Wer-Fall','Wen-Fall','Wem-Fall'],'Genitiv = Wessen-Fall.'],
['Wie heisst der Nominativ auch?','Wer-Fall',['Wen-Fall','Wem-Fall','Wessen-Fall'],'Nominativ = Wer-Fall.']
];
FB.forEach(f=>add({typ:'begriff',stufe:f[1].length>14?2:1,lv:1,cats:['sg0'],prompt:f[0],opts:[f[1]].concat(f[2]),answer:f[1],why:'<b>'+f[1]+'.</b> '+f[3]}));
const FI=[
['Fachbegriff für «persönliches Fürwort»: ___','Personalpronomen',['personalpronomen'],'persönliches Fürwort = Personalpronomen.'],
['Fachbegriff für «besitzanzeigendes Fürwort»: ___','Possessivpronomen',['possessivpronomen'],'besitzanzeigendes Fürwort = Possessivpronomen.'],
['Fachbegriff für «rückbezügliches Fürwort»: ___','Reflexivpronomen',['reflexivpronomen'],'rückbezügliches Fürwort = Reflexivpronomen.'],
['Fachbegriff für «hinweisendes Fürwort»: ___','Demonstrativpronomen',['demonstrativpronomen'],'hinweisendes Fürwort = Demonstrativpronomen.'],
['Fachbegriff für «unbestimmtes Fürwort»: ___','Indefinitpronomen',['indefinitpronomen'],'unbestimmtes Fürwort = Indefinitpronomen.'],
['Fachbegriff für «bezügliches Fürwort»: ___','Relativpronomen',['relativpronomen'],'bezügliches Fürwort = Relativpronomen.'],
['Fachbegriff für «Fürwort»: ___','Pronomen',[],'Fürwort = Pronomen.'],
['Fachbegriff für «Geschlechtswort»: ___','Artikel',[],'Geschlechtswort = Artikel.']
];
FI.forEach(f=>add({typ:'begriffin',stufe:2,lv:1,cats:['sg0'],input:true,prompt:'Schreibe den Fachbegriff.',sent:gap(f[0]),answer:f[1],accept:f[2],strict:true,why:'<b>'+f[1]+'.</b> '+f[3]}));

/* ---------- 14. Wortart im Text erkennen (inkl. Artikel) ---------- */
const TX=[
["*Ich sehe *den Hund. *Er bellt.",1,"Ich, er (Personalpronomen), den (Artikel)."],
["*Das Mädchen gibt *ihrem Bruder *ein Buch.",2,"Das und ein (Artikel), ihrem (Possessivpronomen)."],
["*Wir spielen mit *unserem Ball, und *er gehört *uns.",2,"wir, er, uns (Personalpronomen), unserem (Possessivpronomen)."],
["*Die Lehrerin lobt *uns, weil *wir *unsere Hausaufgaben gemacht haben.",2,"Die (Artikel), uns, wir (Personalpronomen), unsere (Possessivpronomen)."],
["*Mein Vater sagt, dass *er *dich morgen abholt.",3,"Mein (Possessivpronomen), er, dich (Personalpronomen)."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg2'],tokens,targets,instr:'Tippe alle Pronomen im Text an (auch Artikel).',why:m[2]});
});

/* ---------- 15. Selber schreiben ---------- */
/*INP*/
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));
[
['Mia singt. → ___ singt.','Sie'],['Tim und ich spielen. → ___ spielen.','Wir'],['Ich helfe dem Mann. → Ich helfe ___.','ihm'],
['Ich gebe dem Kind einen Ball. → Ich gebe ___ einen Ball.','ihm'],['Wir sehen die Lehrerin. → Wir sehen ___.','sie'],['Der Ball ist rund. → ___ ist rund.','Er'],
['Ich suche das Heft. → Ich suche ___.','es'],['Die Kinder spielen. Ich sehe die Kinder. → Ich sehe ___.','sie']
].forEach(r=>add({typ:'ersetzen',stufe:2,lv:1,cats:['sg2'],input:true,prompt:'Ersetze das Nomen durch ein Pronomen.',sent:r[0],answer:r[1],accept:[],strict:false,why:'<b>'+r[1]+'</b>'}));

/* ---------- 16. Anklicken im Satz (Generator) ---------- */
if(GT.wg){
  const ALL=['sg1','sg2','sg3','sg4','sg5','sg6'];
  const run=(kinds,opt,classes,per,n)=>GT.wg.tasks(task,{n:n||260,kinds:kinds,opt:opt,classes:classes,perClass:per||30});
  run({basic:4,pers:2,poss:2,es:1,konj:1},{pron:.45,det:{def:.35,indef:.2,poss:.3,dem:.15}},[{gl:'Pronomen',cats:ALL,lv:1,instr:'Tippe alle Pronomen an (auch die Artikel).'}],34);
  run({basic:4,pers:1,refl:1,dem:2,ind:1,konj:1},{pron:.4,det:{def:.3,indef:.15,poss:.25,dem:.3}},[{gl:'Pronomen',cats:ALL,lv:2,instr:'Tippe alle Pronomen an (auch die Artikel).'}],26);
  run({basic:5,konj:1,pers:1},{pron:.15,det:{def:.6,indef:.4}},[{gl:'Artikel',cats:['sg1'],lv:1,instr:'Tippe alle Artikel an.'}],34);
  run({pers:4,basic:3,konj:1},{pron:.65,det:{def:.5,indef:.3,poss:.1,dem:.1}},[{gl:'Personalpronomen',cats:['sg2'],lv:1,instr:'Tippe alle Personalpronomen an.'}],34);
  run({poss:5,basic:2},{pron:.2,det:{poss:.7,def:.2,indef:.1}},[{gl:'Possessivpronomen',cats:['sg3'],lv:1,instr:'Tippe alle Possessivpronomen an.'}],34);
  run({refl:5},{pron:.1,det:{def:.5,indef:.3,poss:.2}},[{gl:'Reflexivpronomen',cats:['sg4'],lv:2,instr:'Tippe alle Reflexivpronomen an.'}],28);
  run({dem:4,basic:1},{pron:.2,det:{def:.3,indef:.2,dem:.5}},[{gl:'Demonstrativpronomen',cats:['sg5'],lv:2,instr:'Tippe alle Demonstrativpronomen an.'}],28);
  run({ind:5},{pron:.2,det:{def:.5,indef:.3,poss:.2}},[{gl:'Indefinitpronomen',cats:['sg5'],lv:2,instr:'Tippe alle Indefinitpronomen an.'}],28);
  run({frg:5},{pron:.1,det:{def:.5,indef:.3,poss:.2}},[{gl:'Fragepronomen',cats:['sg5'],lv:2,instr:'Tippe alle Fragepronomen an.'}],28);
  run({rel:5},{pron:.2,det:{def:.5,indef:.3,poss:.2}},[{gl:'Relativpronomen',cats:['sg6'],lv:3,instr:'Tippe alle Relativpronomen an.'}],28);
}

/* ---------- Theorie ---------- */
const FT=(rows)=>T(['Fall','männlich','weiblich','sächlich','Mehrzahl'],rows);
const SECS=[
{id:'merkmale',title:'Was ist ein Pronomen?',short:'Merkmale',min:6,note:'Pronomen stehen für ein Nomen oder begleiten es. Hier: Artikel gehören in der Schule zu den Pronomen (Artikelwörter). Vorwissen zu Wortarten wiederholen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Pronomen ersetzen oder begleiten</h3><p><b>Anna</b> kommt. → <b>Sie</b> lacht. (ersetzt)</p><p><b>Mein</b> Hund bellt. (begleitet)</p></div>'+
 '<div class="card"><h3>Warum Pronomen?</h3><p>Ohne Pronomen klingt es seltsam:</p><p class="muted">«Anna sagt, dass Anna Annas Tasche vergessen hat.»</p><p>Mit Pronomen: «Anna sagt, dass <b>sie ihre</b> Tasche vergessen hat.»</p></div></div>'+
 '<div class="callout">Pronomen verändern sich nach <b>Fall</b>, <b>Geschlecht</b> und <b>Zahl</b>: er – ihn – ihm – sein.</div>'+
 '<div class="callout info">Im Lehrmittel gehören auch die <b>Artikel</b> zu den Pronomen (Begleiter). Darum tippst du bei «alle Pronomen» auch «der», «die», «das», «ein», «eine» an.</div>'},
{id:'begleiter',title:'Begleiter und Stellvertreter',short:'Begleiter / Stellvertreter',min:6,note:'Zentrale Unterscheidung: Steht das Wort vor einem Nomen (Begleiter) oder allein (Stellvertreter)? Dieselben Wörter können beides sein.',
 html:()=>T(['Wort','als Begleiter (vor dem Nomen)','als Stellvertreter (allein)'],[['der / die / das','<b>Der</b> Hund bellt.','–'],['mein, dein, sein …','<b>Mein</b> Hund bellt.','Das ist <b>meiner</b>.'],['dieser, diese, dieses','<b>Dieser</b> Hund bellt.','<b>Dieser</b> bellt.'],['kein, keine','<b>Kein</b> Hund bellt.','<b>Keiner</b> bellt.'],['er, sie, es','–','<b>Er</b> bellt.']])+
 '<div class="callout"><b>Begleiter</b> stehen vor dem Nomen. <b>Stellvertreter</b> stehen allein und ersetzen das Nomen. Beide gehören zu den Pronomen.</div>'},
{id:'artikel',title:'Artikel',short:'Artikel',min:8,note:'Hier zählen die Artikel zu den Pronomen (Begleiter). Bestimmt: der, die, das. Unbestimmt: ein, eine. Fälle erst im Überblick, Vertiefung im Kapitel Fälle.',
 html:()=>'<div class="grid2"><div class="card"><h3>Bestimmter Artikel</h3><p><b>der</b> Hund · <b>die</b> Katze · <b>das</b> Kind</p><p class="muted">Man meint etwas Bestimmtes.</p></div>'+
 '<div class="card"><h3>Unbestimmter Artikel</h3><p><b>ein</b> Hund · <b>eine</b> Katze · <b>ein</b> Kind</p><p class="muted">Man meint etwas Beliebiges.</p></div></div>'+
 '<h3>Die Formen in den Fällen</h3><div class="grid2"><div>'+FT([['Nominativ','der','die','das','die'],['Akkusativ','den','die','das','die'],['Dativ','dem','der','dem','den']])+'</div><div>'+T(['Fall','männlich','weiblich','sächlich'],[['Nominativ','ein','eine','ein'],['Akkusativ','einen','eine','ein'],['Dativ','einem','einer','einem']])+'</div></div>'+
 '<div class="grid2"><div class="card"><h3>Kein Artikel</h3><p><b>kein</b> Hund · <b>keine</b> Katze (wie «ein»)</p><p>Nullartikel: «Ich trinke Wasser.» «Kinder lachen.»</p></div>'+
 '<div class="card"><h3>Artikel verschmelzen</h3><p><b>am</b> = an dem · <b>im</b> = in dem · <b>zum</b> = zu dem</p><p><b>beim</b> = bei dem · <b>zur</b> = zu der · <b>ins</b> = in das</p></div></div>'+
 '<div class="callout">Der Artikel zeigt <b>Geschlecht</b>, <b>Zahl</b> und <b>Fall</b> des Nomens. Artikelwörter wie <b>dieser</b>, <b>jeder</b>, <b>welcher</b> funktionieren ähnlich.</div>'},
{id:'personal',title:'Personalpronomen',short:'Personalpronomen',min:10,note:'Tabelle an die Wandtafel. Fälle vorerst nur Nominativ, Akkusativ, Dativ. Erst dann Genitiv (nur Niveau A).',
 html:()=>T(['','Nominativ','Akkusativ','Dativ'],[['ich','ich','mich','mir'],['du','du','dich','dir'],['er','er','ihn','ihm'],['sie','sie','sie','ihr'],['es','es','es','ihm'],['wir','wir','uns','uns'],['ihr','ihr','euch','euch'],['sie (Mz.)','sie','sie','ihnen']])+
 '<div class="callout">Beispiel: <b>Er</b> (Nom.) sieht <b>mich</b> (Akk.) und gibt <b>mir</b> (Dat.) das Buch.</div>'+
 '<div class="grid2"><div class="card"><h3>Worauf bezieht sich das Pronomen?</h3><p>Das Buch liegt dort. Ich lese <b>es</b>. → «es» = das Buch</p><p class="muted">Das Pronomen richtet sich nach Geschlecht und Zahl des Nomens. Ist der Bezug unklar, wiederholt man das Nomen.</p></div>'+
 '<div class="card"><h3>«es» ohne Bezug</h3><p><b>Es</b> regnet. · <b>Es</b> ist spät. · <b>Es</b> klingelt.</p><p class="muted">Hier ist «es» nur ein Platzhalter. Es ersetzt kein Nomen.</p></div></div>'},
{id:'hoeflich',title:'Höflichkeitsform',short:'Höflichkeit',lv:2,min:6,note:'Fremde Personen und Erwachsene siezt man. Gross: Sie, Ihnen, Ihr.',
 html:()=>T(['du-Form','Höflichkeitsform','Beispiel'],[['du','Sie','Kommen <b>Sie</b> morgen?'],['dich','Sie','Ich rufe <b>Sie</b> an.'],['dir','Ihnen','Ich danke <b>Ihnen</b>.'],['dein','Ihr','Ist das <b>Ihr</b> Heft?'],['ihr / euch','Sie / Ihnen','Kann ich <b>Ihnen</b> helfen?']])+
 '<div class="callout">Höflichkeitsform: <b>Sie, Ihnen, Ihr</b> immer <b>gross</b>. Das Verb steht wie bei «sie» (Mehrzahl): Sie kommen.</div>'+
 '<div class="grid3"><div class="card"><b>sie</b> (Einzahl)<p>Sie schläft.</p></div><div class="card"><b>sie</b> (Mehrzahl)<p>Sie schlafen.</p></div><div class="card"><b>Sie</b> (höflich)<p>Schlafen Sie gut?</p></div></div>'},
{id:'possessiv',title:'Possessivpronomen',short:'Possessiv',min:10,note:'Possessivpronomen werden wie «ein» dekliniert. Zwei Fragen: Wem gehört es? (Stamm) und Welches Nomen, welcher Fall? (Endung). Vorsicht bei «ihr» (sie / Mehrzahl) und «Ihr» (Höflichkeitsform).',
 html:()=>'<div class="grid2"><div class="card"><h3>Wem gehört es? (Stamm)</h3>'+T(['Person','Possessivpronomen'],[['ich','mein'],['du','dein'],['er / es','sein'],['sie','ihr'],['wir','unser'],['ihr','euer'],['sie (Mz.)','ihr'],['Sie (höflich)','Ihr']])+'</div>'+
 '<div class="card"><h3>Endungen wie bei «ein»</h3>'+FT([['Nominativ','mein','mein<b>e</b>','mein','mein<b>e</b>'],['Akkusativ','mein<b>en</b>','mein<b>e</b>','mein','mein<b>e</b>'],['Dativ','mein<b>em</b>','mein<b>er</b>','mein<b>em</b>','mein<b>en</b>']])+'</div></div>'+
 '<div class="callout"><b>Besitzer:</b> Anna → <b>ihr</b>, Tim → <b>sein</b>. <b>Endung:</b> Anna sucht ihr<b>en</b> Hund, aber ihr<b>e</b> Katze. Bei «euer»: eu<b>re</b> Katze, eu<b>rem</b> Hund. Bei «unser»: unser<b>e</b> Katze.</div>'},
{id:'reflexiv',title:'Reflexivpronomen',short:'Reflexiv',lv:2,min:8,note:'Ab Niveau B. Das Reflexivpronomen bezieht sich auf das Subjekt zurück. Nur in der 3. Person gibt es «sich».',
 html:()=>'<div class="grid2"><div>'+T(['Person','Akkusativ','Dativ'],[['ich','mich','mir'],['du','dich','dir'],['er / sie / es','sich','sich'],['wir','uns','uns'],['ihr','euch','euch'],['sie (Mz.)','sich','sich']])+'</div>'+
 '<div class="card"><h3>Reflexiv oder nicht?</h3><p>Er wäscht <b>sich</b>. (er selbst)</p><p>Er wäscht <b>ihn</b>. (eine andere Person)</p><p>Wir treffen <b>uns</b>. (gegenseitig)</p></div></div>'+
 '<div class="callout">Reflexive Verben: sich freuen, sich beeilen, sich erinnern, sich ärgern. Mit Akkusativobjekt steht der Dativ: Ich putze <b>mir</b> die Zähne.</div>'},
{id:'demonstrativ',title:'Demonstrativpronomen',short:'Demonstrativ',lv:2,min:6,note:'Ab Niveau B. Zeigen auf etwas. Dekliniert wie die bestimmten Artikel mit er/e/es.',
 html:()=>'<div class="grid2"><div>'+FT([['Nominativ','dieser','diese','dieses','diese'],['Akkusativ','diesen','diese','dieses','diese'],['Dativ','diesem','dieser','diesem','diesen']])+'</div>'+
 '<div class="card"><h3>Beispiele</h3><p><b>Diese</b> Jacke gefällt mir. (Begleiter)</p><p><b>Dieser</b> ist schöner. (Stellvertreter)</p><p>Weitere: <b>jener</b>, <b>solcher</b>, <b>derselbe</b>.</p></div></div>'},
{id:'frage',title:'Fragepronomen',short:'Fragepronomen',lv:2,min:6,note:'Ab Niveau B. Fragepronomen leiten Fragen ein. Mit ihnen findet man den Fall.',
 html:()=>T(['Fall','Person','Sache'],[['Nominativ','wer','was'],['Akkusativ','wen','was'],['Dativ','wem','–'],['Genitiv','wessen','wessen']])+'<div class="callout"><b>Wer</b> kommt? · <b>Wen</b> siehst du? · <b>Wem</b> hilfst du? · <b>Wessen</b> Tasche ist das? · <b>Welches</b> Buch liest du?</div>'},
{id:'indefinit',title:'Indefinitpronomen',short:'Indefinit',lv:2,min:6,note:'Ab Niveau B. Unbestimmte Pronomen. «man» schreibt man klein, «Mann» ist ein Nomen.',
 html:()=>T(['Wort','Beispiel'],[['man','<b>Man</b> darf hier nicht parkieren.'],['jemand / niemand','<b>Jemand</b> hat geklingelt. <b>Niemand</b> war da.'],['alle / jeder','<b>Alle</b> sind da. <b>Jeder</b> kennt das.'],['etwas / nichts','<b>Etwas</b> fehlt. Ich habe <b>nichts</b> gesehen.'],['einige / manche / viele','<b>Viele</b> kommen.']])},
{id:'relativ',title:'Relativpronomen',short:'Relativ',lv:3,min:8,note:'Nur Niveau A. Geschlecht und Zahl vom Bezugswort, Fall von der Rolle im Relativsatz. Verb am Ende, Komma davor.',
 html:()=>'<div class="grid2"><div>'+FT([['Nominativ','der','die','das','die'],['Akkusativ','den','die','das','die'],['Dativ','dem','der','dem','denen'],['Genitiv','dessen','deren','dessen','deren']])+'</div>'+
 '<div class="card"><h3>Beispiele</h3><p>Der Mann, <b>der</b> dort steht, ist mein Onkel.</p><p>Das Buch, <b>das</b> ich lese, ist spannend.</p><p>Der Freund, <b>dem</b> ich helfe, ist krank.</p><p>Alles, <b>was</b> du sagst, stimmt.</p></div></div>'+
 '<div class="callout">Relativpronomen leiten einen <b>Nebensatz</b> ein. Das Komma steht davor, das Verb am Ende.</div>'},
{id:'genitiv',title:'Genitivformen',short:'Genitiv',lv:3,min:6,note:'Nur Niveau A. Genitiv der Personalpronomen wird selten gebraucht (meiner, deiner, seiner); in der Praxis Possessiv.',
 html:()=>'<div class="card"><h3>Genitiv</h3><p>Das Haus <b>meiner</b> Eltern.</p><p>Wegen <b>seines</b> Fehlers.</p><p class="muted">Der Genitiv der Personalpronomen (meiner, deiner, seiner …) ist selten; häufiger ist das Possessiv.</p></div>'},
{id:'fachbegriffe',title:'Fachbegriffe',short:'Fachbegriffe',min:6,note:'Fremdwort und deutsches Wort. Für Prüfungen beide Begriffe kennen.',
 html:()=>T(['Fachbegriff','Deutsches Wort','Beispiel'],[['Pronomen','Fürwort','er, mein, sich'],['Artikel','Geschlechtswort','der, ein'],['Personalpronomen','persönliches Fürwort','ich, du, er'],['Possessivpronomen','besitzanzeigendes Fürwort','mein, dein'],['Reflexivpronomen','rückbezügliches Fürwort','mich, sich'],['Demonstrativpronomen','hinweisendes Fürwort','dieser, jener'],['Indefinitpronomen','unbestimmtes Fürwort','man, jemand'],['Relativpronomen','bezügliches Fürwort','der, die, das'],['Fragepronomen','Fragefürwort','wer, was']])+
 T(['Fall','Frage','Deutsches Wort'],[['Nominativ','Wer oder was?','Wer-Fall'],['Genitiv','Wessen?','Wessen-Fall'],['Dativ','Wem?','Wem-Fall'],['Akkusativ','Wen oder was?','Wen-Fall']])},
{id:'vorgehen',title:'So bestimmst du Pronomen',short:'Vorgehen',min:8,note:'Arbeitsschritte als Wandplakat. Zuerst prüfen, ob es ein Pronomen ist, dann die Art, dann den Fall.',
 html:()=>'<ol class="steps"><li><b>Pronomen?</b> Ersetzt oder begleitet das Wort ein Nomen? (Artikel zählen mit.)</li><li><b>Welche Art?</b> Zeigt es, wem etwas gehört → Possessiv. Bezieht es sich auf das Subjekt zurück → Reflexiv. Zeigt es auf etwas → Demonstrativ. Fragt es → Frage. Ist es unbestimmt → Indefinit. Leitet es einen Nebensatz ein → Relativ. Sonst: Personal.</li><li><b>Welcher Fall?</b> Wer oder was? → Nominativ. Wen oder was? → Akkusativ. Wem? → Dativ.</li></ol>'+
 T(['Frage','Pronomenart','Beispiel'],[['Ersetzt es eine Person oder Sache?','Personalpronomen','<b>Er</b> kommt.'],['Zeigt es, wem etwas gehört?','Possessivpronomen','<b>Mein</b> Hund'],['Meint es das Subjekt selbst?','Reflexivpronomen','Er wäscht <b>sich</b>.'],['Zeigt es auf etwas?','Demonstrativpronomen','<b>Diese</b> Jacke'],['Ist es unbestimmt?','Indefinitpronomen','<b>Jemand</b> klingelt.'],['Fragt es?','Fragepronomen','<b>Wer</b> kommt?'],['Leitet es einen Relativsatz ein?','Relativpronomen','Der Mann, <b>der</b> …']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Verwechslungen: ihr/Ihr, seine/seins, dass/das, ihn/ihm.',
 html:()=>'<div class="grid3">'+[
  ['1 · sie oder Sie?','«<b>Sie</b> kommt.» (sie, Einzahl) / «<b>Sie</b> kommen.» (sie, Mehrzahl) / «Kommen <b>Sie</b>?» (höflich)','Höflichkeitsform immer gross.'],
  ['2 · ihn oder ihm?','«Ich sehe <b>ihn</b>.» / «Ich helfe <b>ihm</b>.»','Akkusativ: ihn. Dativ: ihm. Hilfe: wen? / wem?'],
  ['3 · ihr als Pronomen','«<b>Ihr</b> kommt.» (Personalpronomen)<br>«<b>Ihr</b> Hund bellt.» (Possessiv)','Ein Wort, zwei Rollen.'],
  ['4 · das oder dass?','«<b>Das</b> Buch» (Artikel/Pronomen)<br>«Ich weiss, <b>dass</b> er kommt.» (Konjunktion)','Probe: dieses / welches ersetzt → das.'],
  ['5 · seine Endung','«Er sucht <b>seinen</b> Hund.»','Possessiv richtet sich nach Nomen: seinen Hund, seine Katze.'],
  ['6 · mich oder mir?','«Er sieht <b>mich</b>.» / «Er gibt <b>mir</b> das Buch.»','Akkusativ: mich. Dativ: mir.'],
  ['7 · sich oder ihn?','«Er wäscht <b>sich</b>.» (er selbst) / «Er wäscht <b>ihn</b>.» (eine andere Person)','Reflexiv, wenn Subjekt und Objekt dieselbe Person sind.'],
  ['8 · man oder Mann?','«<b>Man</b> darf hier nicht rauchen.» / «Der <b>Mann</b> raucht.»','«man» ist ein Pronomen und wird kleingeschrieben.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('fehler,personal,possessiv')}
];
const EX=[
 ['Ersetze durch ein Pronomen: «Der Hund bellt.»','Er bellt.',1],
 ['Ersetze durch ein Pronomen: «Ich sehe die Katze.»','Ich sehe sie.',1],
 ['Ersetze durch ein Pronomen: «Ich helfe dem Mann.»','Ich helfe ihm.',1],
 ['Setze ein Possessivpronomen ein: Er sucht (er) ___ Stift.','seinen',1],
 ['Setze ein Possessivpronomen ein: Wir feiern (wir) ___ Fest.','unser',1],
 ['Unterstreiche alle Pronomen (auch Artikel): «Ich gebe ihr mein Buch.»','Ich · ihr · mein',1],
 ['Bestimme den Fall von «ihm»: «Ich helfe ihm.»','Dativ (wem?)',1],
 ['Setze den Artikel ein: Ich sehe ___ Katze. (bestimmt)','die',1],
 ['Nenne zwei Reflexivpronomen und bilde je einen Satz.','Zum Beispiel: Ich wasche mich. Er freut sich.',2],
 ['Schreibe die Höflichkeitsform: «Kommst du morgen?» (an eine fremde Person)','Kommen Sie morgen?',2],
 ['Welche Art Pronomen ist «man»? Bilde einen Satz.','Indefinitpronomen: Man darf hier nicht rauchen.',2],
 ['Setze das Relativpronomen ein: Das Buch, ___ ich lese, ist spannend.','das',3]
];
const merk=()=>T(['Thema','Merksatz'],[['Pronomen','Sie ersetzen ein Nomen (Stellvertreter) oder begleiten es (Begleiter).'],['Artikel','bestimmt: der, die, das · unbestimmt: ein, eine · kein wie «ein»'],['Personalpronomen','ich, du, er, sie, es, wir, ihr, sie – ändern sich nach Fall: er – ihn – ihm'],['Höflichkeit','Sie, Ihnen, Ihr immer gross'],['Possessiv','mein, dein, sein, ihr, unser, euer – Stamm nach dem Besitzer, Endung wie bei «ein»'],['Reflexiv','mich, dich, sich, uns, euch – bezieht sich auf das Subjekt zurück'],['Weitere','Demonstrativ: dieser · Frage: wer, was · Indefinit: man, jemand · Relativ: der, die, das (Nebensatz)']])+
 T(['Person','Nom.','Akk.','Dat.'],[['ich','ich','mich','mir'],['du','du','dich','dir'],['er','er','ihn','ihm'],['sie','sie','sie','ihr'],['es','es','es','ihm'],['wir','wir','uns','uns'],['ihr','ihr','euch','euch'],['sie (Mz.)','sie','sie','ihnen']]);
const UEM={
 begleiter:{types:'wissen',cats:'sg1'},
 artikel:{types:'artikel,artikelein',cats:'sg1'},
 personal:{types:'personal,fall,ersetzen,kuerzen,bezug',cats:'sg2'},
 hoeflich:{types:'hoeflich',cats:'sg2'},
 possessiv:{types:'possessiv',cats:'sg3'},
 reflexiv:{types:'reflexiv,zuordnen',cats:'sg4'},
 demonstrativ:{types:'zuordnen,wissen',cats:'sg5'},
 frage:{types:'zuordnen,wissen',cats:'sg5'},
 indefinit:{types:'zuordnen,wissen',cats:'sg5'},
 relativ:{types:'zuordnen,wissen,bezug',cats:'sg6'}
};
SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
GT.chapter({id:'pronomen',teil:'wort',nr:6,title:'Pronomen',big:'Er gibt ihr sein Buch',desc:'Artikel und Pronomen: ersetzen und begleiten',
 ex:'«'+mk('pron','Er')+' gibt '+mk('pron','ihr')+' '+mk('pron','sein')+' Buch.»',
 goals:['Ich unterscheide Begleiter und Stellvertreter.','Ich erkenne und setze bestimmte und unbestimmte Artikel ein.','Ich ersetze Nomen durch Personalpronomen in der richtigen Form.','Ich wähle das richtige Possessivpronomen (Besitzer und Endung).','Ich kenne Reflexiv-, Demonstrativ-, Frage-, Indefinit- und Relativpronomen.'],
 write:['personal','possessiv','reflexiv','artikelein','hoeflich'], strict:['hoeflich'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{
  markieren:{icon:'👆',label:'Im Satz antippen',short:'Die Wörter der geübten Wortart finden',instr:'Tippe alle Pronomen an.',hint:'Pronomen ersetzen oder begleiten ein Nomen.',ref:'merkmale'},
  artikel:{label:'Artikel erkennen',short:'bestimmt oder unbestimmt',instr:'Wähle die richtige Antwort.',hint:'bestimmt: der, die, das · unbestimmt: ein, eine.',ref:'artikel'},
  artikelein:{icon:'🅰️',winstr:'Schreibe den passenden Artikel.',label:'Artikel einsetzen',short:'Den richtigen Artikel wählen',instr:'Welcher Artikel passt?',hint:'Geschlecht, Zahl und Fall des Nomens beachten.',ref:'artikel'},
  personal:{winstr:'Schreibe das passende Pronomen.',label:'Personalpronomen',short:'Nomen ersetzen',instr:'Welches Pronomen passt?',hint:'Geschlecht, Zahl und Fall des Nomens beachten. Wen? → Akk. Wem? → Dat.',ref:'personal'},
  fall:{icon:'🔎',label:'Fall bestimmen',short:'Fall des Pronomens finden',instr:'In welchem Fall steht das Pronomen?',hint:'Wer oder was? → Nominativ. Wen oder was? → Akkusativ. Wem? → Dativ.',ref:'personal'},
  possessiv:{winstr:'Schreibe das passende Possessivpronomen.',label:'Possessivpronomen',short:'Wem gehört es?',instr:'Welche Form passt?',hint:'Wer ist der Besitzer? Welches Geschlecht und welchen Fall hat das Nomen?',ref:'possessiv'},
  reflexiv:{icon:'🪞',winstr:'Schreibe das passende Reflexivpronomen.',label:'Reflexivpronomen',short:'mich, dich, sich …',instr:'Welches Reflexivpronomen passt?',hint:'Zu welcher Person gehört das Subjekt? ich → mich, du → dich, er/sie/es → sich.',ref:'reflexiv'},
  zuordnen:{icon:'🗂️',label:'Pronomenart bestimmen',short:'Welche Art Pronomen ist das Wort?',instr:'Welche Art von Wort ist das fette Wort?',hint:'Stellt es etwas vor? Zeigt es? Fragt es? Gehört etwas jemandem?',ref:'vorgehen'},
  fehler:{icon:'⚠️',label:'Richtigen Satz finden',short:'Fehler bei Pronomen erkennen',instr:'Welcher Satz ist richtig?',hint:'Prüfe den Fall: wen? oder wem?',ref:'stolper'},
  bezug:{icon:'🔗',label:'Worauf bezieht es sich?',short:'Bezugswort finden',instr:'Worauf bezieht sich das fette Wort?',hint:'Geschlecht und Zahl des Pronomens zeigen das Bezugswort.',ref:'personal'},
  hoeflich:{icon:'🎩',winstr:'Schreibe das passende Wort (Gross- und Kleinschreibung beachten).',label:'Höflichkeitsform',short:'Sie, Ihnen, Ihr',instr:'Welche Form passt?',hint:'Höflichkeitsform immer gross: Sie, Ihnen, Ihr.',ref:'hoeflich'},
  kuerzen:{icon:'✂️',label:'Text mit Pronomen kürzen',short:'Wiederholungen durch Pronomen ersetzen',instr:'Ersetze den fetten Teil durch Pronomen.',hint:'Wer oder was? Wen oder was? Wem?',ref:'personal'},
  ersetzen:{icon:'🔄',label:'Ersetzen',short:'Nomen durch Pronomen ersetzen',instr:'Schreibe das passende Pronomen.',hint:'Welches Wort steht stellvertretend für das Nomen?',ref:'personal'},
  wissen:{label:'Wissen',short:'Pronomenarten und Regeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'vorgehen'},
  begriff:{icon:'📚',label:'Fachbegriffe wählen',short:'Fremdwort und deutsches Wort',instr:'Wähle den richtigen Begriff.',hint:'Schau bei den Fachbegriffen nach.',ref:'fachbegriffe'},
  begriffin:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Achte auf die Schreibweise.',hint:'Fachbegriffe sind Nomen und werden gross geschrieben.',ref:'fachbegriffe'},
  text:{icon:'🔍',label:'Pronomen im Text',short:'Alle Pronomen in einem Text finden',instr:'Tippe alle Pronomen im Text an (auch Artikel).',hint:'Pronomen ersetzen oder begleiten ein Nomen. Artikel gehören auch dazu.',ref:'merkmale'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
