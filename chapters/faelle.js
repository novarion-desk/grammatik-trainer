/* Kapitel Wortlehre 3: Die 4 Fälle. Registriert sich beim Trainer (GT). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,cap=GT.cap,shuffle=GT.shuffle,lv=GT.lv;
const FK=['nom','gen','dat','akk'];
const FN={nom:'Nominativ',gen:'Genitiv',dat:'Dativ',akk:'Akkusativ'};
const FQ={nom:'Wer oder was?',gen:'Wessen?',dat:'Wem?',akk:'Wen oder was?'};
const N2K={Nominativ:'nom',Genitiv:'gen',Dativ:'dat',Akkusativ:'akk'};
const tag=k=>'<span class="tag f-'+k+'">'+FN[k]+'</span>';

const EXF='«'+mk('nom','Der Hund')+' beisst '+mk('akk','den Mann')+'.»';

/* ---- Wortschatz für die generierten Aufgaben ---- */
const DEF={m:['der','des','dem','den'],f:['die','der','der','die'],n:['das','des','dem','das'],p:['die','der','den','die']};
const MEIN={m:['mein','meines','meinem','meinen'],f:['meine','meiner','meiner','meine'],n:['mein','meines','meinem','mein'],p:['meine','meiner','meinen','meine']};
const ADJE={m:['e','en','en','en'],f:['e','en','en','e'],n:['e','en','en','e'],p:['en','en','en','en']};
const EIN={m:['ein','eines','einem','einen'],f:['eine','einer','einer','eine'],n:['ein','eines','einem','ein']};
const ADJEE={m:['er','en','en','en'],f:['e','en','en','e'],n:['es','en','en','es']};
const ADJ=['klein','alt','nett','müde','neugierig','freundlich'];
const NOUN=[
 {g:'m',f:['Hund','Hundes','Hund','Hund']},{g:'m',f:['Lehrer','Lehrers','Lehrer','Lehrer']},
 {g:'m',f:['Bruder','Bruders','Bruder','Bruder']},{g:'m',f:['Vater','Vaters','Vater','Vater']},
 {g:'f',f:['Katze','Katze','Katze','Katze']},{g:'f',f:['Lehrerin','Lehrerin','Lehrerin','Lehrerin']},
 {g:'f',f:['Schwester','Schwester','Schwester','Schwester']},{g:'f',f:['Mutter','Mutter','Mutter','Mutter']},
 {g:'n',f:['Kind','Kindes','Kind','Kind']},{g:'n',f:['Mädchen','Mädchens','Mädchen','Mädchen']},{g:'n',f:['Pferd','Pferdes','Pferd','Pferd']},
 {g:'p',f:['Kinder','Kinder','Kindern','Kinder']},{g:'p',f:['Eltern','Eltern','Eltern','Eltern']},
 {g:'p',f:['Freunde','Freunde','Freunden','Freunde']},{g:'p',f:['Schülerinnen','Schülerinnen','Schülerinnen','Schülerinnen']}
];
const POOL={m:NOUN.filter(n=>n.g==='m'),fpn:NOUN.filter(n=>n.g!=='m'),all:NOUN};
const TPL={
 nom:[{sg:['','schläft tief.'],pl:['','schlafen tief.'],q:'Wer oder was schläft tief?'},
      {sg:['Heute kommt','früher.'],pl:['Heute kommen','früher.'],q:'Wer oder was kommt früher?'},
      {sg:['Im Garten spielt','.'],pl:['Im Garten spielen','.'],q:'Wer oder was spielt im Garten?'},
      {sg:['Am Abend lacht','laut.'],pl:['Am Abend lachen','laut.'],q:'Wer oder was lacht am Abend laut?'}],
 gen:[{sg:['Das Haus','ist gross.'],q:'Wessen Haus ist gross?'},{sg:['Der Hut','liegt hier.'],q:'Wessen Hut liegt hier?'},
      {sg:['Das Fahrrad','ist neu.'],q:'Wessen Fahrrad ist neu?'},{sg:['Die Tasche','ist schwer.'],q:'Wessen Tasche ist schwer?'}],
 dat:[{sg:['Ich helfe','.'],q:'Wem helfe ich?'},{sg:['Wir danken','heute.'],q:'Wem danken wir?'},
      {sg:['Das Velo gehört','.'],q:'Wem gehört das Velo?'},{sg:['Das Lied gefällt','.'],q:'Wem gefällt das Lied?'}],
 akk:[{sg:['Ich sehe','.'],q:'Wen oder was sehe ich?'},{sg:['Wir besuchen','am Samstag.'],q:'Wen oder was besuchen wir?'},
      {sg:['Die Lehrerin lobt','oft.'],q:'Wen oder was lobt die Lehrerin?'},{sg:['Er sucht','schon lange.'],q:'Wen oder was sucht er?'}]
};
const MAN=['der Mann','des Mannes','dem Mann','den Mann'];
const sent=(a,mid,b)=>{let s=[a,mid].filter(Boolean).join(' ');if(b)s+=(b==='.'?'.':' '+b);return s;};
const adjF=(a,e)=>(a.endsWith('e')?a.slice(0,-1):a)+e;
function build(ci,noun,det,adj,ti){
  const k=FK[ci],T=TPL[k][ti%TPL[k].length],pl=noun.g==='p';
  const form=c=>[(det==='mein'?MEIN:det==='ein'?EIN:DEF)[noun.g][c],adj?adjF(adj,(det==='ein'?ADJEE:ADJE)[noun.g][c]):'',noun.f[c]].filter(Boolean).join(' ');
  const [pre,post]=(pl&&T.pl)?T.pl:T.sg,[spre,spost]=T.sg;
  const start=!pre,fix=s=>start?cap(s):s;
  const g=fix(form(ci));
  return {k,pre,post,g,q:T.q,
    html:sent(pre,'<span class="hl">'+g+'</span>',post),
    plain:sent(pre,g,post),
    gap:sent(pre,'<span class="gap">_____</span>',post),
    gapE:sent(pre,'<span class="gap">'+fix(['ein___',adj?adjF(adj,'')+'___':'',noun.f[ci]].filter(Boolean).join(' '))+'</span>',post),
    start,
    repl:sent(spre,fix(MAN[ci]),spost),
    man:fix(MAN[ci]),
    manOpts:MAN.map(fix),
    forms:FK.map((_,c)=>fix(form(c)))};
}

/* ---- Aufgabenpool ---- */
const TASKS=[];let NID=1;
const TYPES={
 bestimmen:{label:'Fall bestimmen',instr:'In welchem Fall steht die markierte Gruppe?',hint:'Suche das Verb und frage von dort aus: Wer oder was …? Wem …? Wen oder was …? Beim Genitiv fragst du beim Nomen: Wessen …? Unsicher? Ersatzprobe mit «der Mann».',ref:'proben'},
 zuordnen:{label:'Fälle und Fragen zuordnen',instr:'Wähle die richtige Antwort.',hint:'Die Reihenfolge der Fälle: 1. Nominativ (Wer oder was?), 2. Genitiv (Wessen?), 3. Dativ (Wem?), 4. Akkusativ (Wen oder was?).',ref:'vier'},
 frage:{label:'Frageprobe',instr:'Welche Frage führt zur markierten Gruppe?',hint:'Finde das Verb im Satz. Frage mit dem Verb: Wer …? Wem …? Wen …? Beim Genitiv: Wessen + Nomen?',ref:'proben'},
 ersatz:{label:'Ersatzprobe',instr:'Ersetze die markierte Gruppe durch «der Mann». Welche Form passt in den Satz?',hint:'Setze «der Mann» in den Satz und lies ihn laut: der, des, dem oder den?',ref:'proben'},
 einsetzen:{label:'Artikel einsetzen',instr:'Welche Form passt in die Lücke?',hint:'Frage vom Verb aus: Wer …? Wem …? Wen …? Beim Genitiv: Wessen + Nomen?',ref:'tabelle'},
 anmalen:{label:'Alle Fälle anmalen',instr:'Wähle eine Farbe und tippe die Gruppen an, die in diesem Fall stehen.',hint:'Finde zuerst das Verb und frage von dort aus. Den Genitiv erkennst du an der Frage Wessen + Nomen?',ref:'proben'},
 praep:{label:'Präposition und Fall',instr:'In welchem Fall steht die markierte Gruppe?',hint:'Die Präposition verlangt den Fall: mit, nach, bei, von, zu, aus = Dativ. für, durch, gegen, ohne, um = Akkusativ. wegen, während, trotz = Genitiv. Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ.',ref:'praep'},
 fehler:{label:'Fallfehler korrigieren',instr:'Die markierte Gruppe könnte einen Fall-Fehler haben. Wähle die richtige Form.',hint:'Bestimme den Fall (Präposition oder Verb, dann Frage oder Ersatzprobe). Nicht jeder Satz hat einen Fehler.',ref:'fehler'},
 endung:{label:'Endungen setzen',instr:'Welche Form passt in die Lücke?',hint:'Fall bestimmen, dann Artikel und Adjektiv aus der Tabelle: nach «ein» endet das Adjektiv meistens auf -en.',ref:'endung'}
};
function add(t){t.id=NID++;t.lv=t.lv||(t.stufe===3?2:1);TASKS.push(t);}
function pick(level,ci,i,off){
  if(level===1){const p=POOL.m;return {n:p[(ci*2+i+off)%p.length],det:'def',adj:''};}
  if(level===2){const p=POOL.fpn;return {n:p[(ci*3+i*2+off)%p.length],det:(i+ci)%2?'mein':'def',adj:''};}
  const p=POOL.all;return {n:p[(ci*5+i*3+off)%p.length],det:'def',adj:ADJ[(ci+i+off)%ADJ.length]};
}
const SPEC={bestimmen:[[2,3,2],0],frage:[[1,2,1],2],ersatz:[[1,2,1],4],einsetzen:[[1,2,1],6]};
FK.forEach((k,ci)=>{
  Object.keys(SPEC).forEach(typ=>{
    const [cnt,off]=SPEC[typ];
    cnt.forEach((c,li)=>{const level=li+1;for(let i=0;i<c;i++){
      const p=pick(level,ci,i,off),b=build(ci,p.n,p.det,p.adj,i+ci+off);
      const base={typ,stufe:level,cats:[k]};
      if(typ==='bestimmen'){
        add(Object.assign(base,{sent:b.html,opts:FK.map(x=>FN[x]),answer:FN[k],optCat:N2K,
          why:'<b>'+b.q+'</b> → '+b.g+' ('+FN[k]+').<br>Ersatzprobe: «'+b.repl+'» → «'+b.man+'» ist '+FN[k]+'.'}));
      }else if(typ==='frage'){
        add(Object.assign(base,{sent:b.html,opts:FK.map(x=>FQ[x]),answer:FQ[k],optCat:{'Wer oder was?':'nom','Wessen?':'gen','Wem?':'dat','Wen oder was?':'akk'},
          why:'Die Frage lautet: <b>'+b.q+'</b> Antwort: '+b.g+' → '+FN[k]+'.'}));
      }else if(typ==='ersatz'){
        const opts=b.manOpts;
        add(Object.assign(base,{sent:b.html,opts,answer:b.man,optCat:opts.reduce((o,x,j)=>(o[x]=FK[j],o),{}),
          why:'«'+b.repl+'» – «'+b.man+'» ist '+FN[k]+'. Also steht auch «'+b.g+'» im '+FN[k]+'.'}));
      }else{
        const opts=[...new Set(b.forms)];
        add(Object.assign(base,{sent:b.gap,opts,answer:b.g,
          why:'<b>'+b.q+'</b> → '+b.g+' ('+FN[k]+').'}));
      }
    }});
  });
});
/* handgeschriebene Fall-Aufgaben */
[
 ['Den Ball wirft','der Torwart','.','nom',2,1,'Wer wirft den Ball?','Das Wer-Wort steht hier hinten.'],
 ['','Den Ball','wirft der Torwart.','akk',2,1,'Wen oder was wirft der Torwart?','Die Gruppe steht vorne, ist aber nicht das Wer-Wort.'],
 ['Den Mann beisst','der Hund','.','nom',2,1,'Wer beisst den Mann?','Auch hier steht das Wer-Wort hinten.'],
 ['','Den Mann','beisst der Hund.','akk',2,1,'Wen beisst der Hund?','«den» verrät den Akkusativ.'],
 ['Wir gedenken','der Opfer','.','gen',3,3,'Wessen gedenken wir?','Das Verb «gedenken» verlangt den Genitiv.'],
 ['Er rühmt sich','seiner Erfolge','.','gen',3,3,'Wessen rühmt er sich?','Das Verb «sich rühmen» verlangt den Genitiv.'],
 ['Er ist','ein guter Lehrer','.','nom',3,3,'Wer oder was ist er?','Nach «sein» steht ebenfalls der Nominativ.'],
 ['Ich helfe','ihm','.','dat',2,2,'Wem helfe ich?','Auch Pronomen haben Fälle: er, seiner, ihm, ihn.'],
 ['Ich sehe','ihn','.','akk',2,2,'Wen sehe ich?','Auch Pronomen haben Fälle: er, seiner, ihm, ihn.'],
 ['Das Buch gehört','mir','.','dat',2,2,'Wem gehört das Buch?','ich, meiner, mir, mich.'],
 ['Er besucht','mich','.','akk',2,2,'Wen besucht er?','ich, meiner, mir, mich.']
].forEach(r=>{
  add({typ:'bestimmen',stufe:r[4],lv:r[5],cats:[r[3]],sent:sent(r[0],'<span class="hl">'+r[1]+'</span>',r[2]),opts:FK.map(x=>FN[x]),answer:FN[r[3]],optCat:N2K,
    why:'<b>'+r[6]+'</b> → '+r[1]+' ('+FN[r[3]]+'). '+r[7]});
});
/* Zuordnen: Kernwissen */
FK.forEach((k,ci)=>{
  const names=FK.map(x=>FN[x]);
  add({typ:'zuordnen',stufe:1,cats:[k],sent:'',prompt:'Welche Frage gehört zum <b>'+FN[k]+'</b>?',opts:FK.map(x=>FQ[x]),answer:FQ[k],why:'Der '+FN[k]+' fragt: <b>'+FQ[k]+'</b>'});
  add({typ:'zuordnen',stufe:1,cats:[k],sent:'',prompt:'Zu welchem Fall gehört die Frage <b>«'+FQ[k]+'»</b>?',opts:names,answer:FN[k],why:'«'+FQ[k]+'» fragt nach dem '+FN[k]+'.'});
  add({typ:'zuordnen',stufe:1,cats:[k],sent:'',prompt:'Der wievielte Fall ist der <b>'+FN[k]+'</b>?',opts:['1. Fall','2. Fall','3. Fall','4. Fall'],answer:(ci+1)+'. Fall',why:'Die Reihenfolge: 1. Nominativ, 2. Genitiv, 3. Dativ, 4. Akkusativ.'});
  add({typ:'zuordnen',stufe:1,cats:[k],sent:'',prompt:'Wie heisst der <b>'+(ci+1)+'. Fall</b>?',opts:names,answer:FN[k],why:'Der '+(ci+1)+'. Fall ist der '+FN[k]+'.'});
});
[
 ['nom','Welcher Fall zeigt, <b>wer etwas macht</b> (der Hauptakteur)?','Der Nominativ fragt: Wer oder was?'],
 ['gen','Welcher Fall zeigt <b>Besitz und Zugehörigkeit</b> (das Haus <i>des Lehrers</i>)?','Der Genitiv fragt: Wessen?'],
 ['dat','Welcher Fall zeigt, <b>wem</b> etwas gegeben, gezeigt oder geholfen wird (der Empfänger)?','Der Dativ fragt: Wem?'],
 ['akk','Welcher Fall zeigt, <b>wen oder was</b> die Handlung trifft (das Ziel)?','Der Akkusativ fragt: Wen oder was?']
].forEach(r=>add({typ:'zuordnen',stufe:2,cats:[r[0]],sent:'',prompt:r[1],opts:FK.map(x=>FN[x]),answer:FN[r[0]],why:r[2]}));
add({typ:'zuordnen',stufe:2,cats:FK.slice(),sent:'',prompt:'Welche Reihenfolge der Fälle ist richtig?',
 opts:['Nominativ – Genitiv – Dativ – Akkusativ','Nominativ – Dativ – Genitiv – Akkusativ','Nominativ – Akkusativ – Dativ – Genitiv','Genitiv – Nominativ – Dativ – Akkusativ'],
 answer:'Nominativ – Genitiv – Dativ – Akkusativ',why:'1. Nominativ, 2. Genitiv, 3. Dativ, 4. Akkusativ.'});
/* Anmalen (B/C) */
[
 [2,[['Die Lehrerin','nom'],['schenkt'],['dem Schüler','dat'],['ein Buch','akk','.']]],
 [3,[['Der Hund','nom'],['meines Nachbarn','gen'],['jagt'],['die Katze','akk','.']]],
 [2,[['Heute gibt'],['der Vater','nom'],['dem Kind','dat'],['einen Apfel','akk','.']]],
 [3,[['Den Brief','akk'],['der Schülerin','gen'],['liest'],['der Lehrer','nom','.']]],
 [2,[['Mein Bruder','nom'],['zeigt'],['der Mutter','dat'],['das neue Handy','akk','.']]],
 [3,[['Die Katze','nom'],['meiner Schwester','gen'],['folgt'],['dem Kind','dat','.']]],
 [2,[['Nach der Pause','dat'],['gibt'],['die Lehrerin','nom'],['den Schülern','dat'],['die Hausaufgaben','akk','.']]],
 [2,[['Wir','nom'],['fahren'],['mit dem Bus','dat'],['durch den Tunnel','akk','.']]],
 [3,[['Wegen des Regens','gen'],['bleibt'],['die Klasse','nom'],['im Schulhaus','dat','.']]]
].forEach(r=>{
  const parts=r[1].map(p=>({t:p[0]+(p[2]||''),f:p[1]||null}));
  const cats=[...new Set(parts.filter(p=>p.f).map(p=>p.f))];
  add({typ:'anmalen',stufe:r[0],lv:r[0]===2?2:3,cats,parts,sent:'',
    why:parts.filter(p=>p.f).map(p=>p.t.replace(/\.$/,'')+' → '+FN[p.f]).join(' · ')});
});

/* ---- NEU: Präpositionen und ihre Fälle ---- */
const PR=[
 ['Wir gehen','durch','den Park','.','akk',1],
 ['Das Geschenk ist','für','die Lehrerin','.','akk',1],
 ['Er kämpft','gegen','den Gegner','.','akk',1],
 ['Sie kommt','ohne','ihren Bruder','.','akk',1],
 ['Wir laufen','um','das Schulhaus','.','akk',1],
 ['Ich fahre','mit','dem Velo',' zur Schule.','dat',1],
 ['','Nach','der Pause',' schreiben wir einen Test.','dat',1],
 ['Er wohnt','bei','seiner Tante','.','dat',1],
 ['Sie kommt','aus','der Schule','.','dat',1],
 ['Das Buch ist','von','meiner Schwester','.','dat',1],
 ['','Seit','dem Montag',' fehlt Tim.','dat',1],
 ['Wir gehen','zu','unserem Lehrer','.','dat',1],
 ['Das Kino liegt','gegenüber','dem Bahnhof','.','dat',2],
 ['','Wegen','des Regens',' fällt der Ausflug aus.','gen',2],
 ['','Während','der Pause',' spielen wir Fussball.','gen',2],
 ['','Trotz','des Verbots',' rennt er im Gang.','gen',3],
 ['','Statt','eines Heftes',' nimmt sie einen Block.','gen',3],
 ['Man darf','innerhalb','des Schulhauses',' nicht rennen.','gen',3],
 ['Das Dorf liegt','oberhalb','des Sees','.','gen',3]
];
PR.forEach(r=>{
  const why='«'+r[1].toLowerCase()+'» verlangt den '+FN[r[4]]+'. Ersatzprobe: '+r[1].toLowerCase()+' '+MAN[FK.indexOf(r[4])]+'.';
  add({typ:'praep',stufe:r[5],lv:r[5],cats:[r[4]],sent:(r[0]?r[0]+' ':'')+r[1]+' <span class="hl">'+r[2]+'</span>'+r[3],opts:FK.map(x=>FN[x]),answer:FN[r[4]],optCat:N2K,why:'<b>'+r[2]+'</b> steht im '+FN[r[4]]+'. '+why});
});
/* Wechselpräpositionen: Wo? oder Wohin? */
[
 ['Der Stift liegt','auf','dem Tisch','.','dat','Wo liegt der Stift?'],
 ['Die Katze schläft','unter','dem Bett','.','dat','Wo schläft die Katze?'],
 ['Wir sitzen','in','der Klasse','.','dat','Wo sitzen wir?'],
 ['Das Bild hängt','an','der Wand','.','dat','Wo hängt das Bild?'],
 ['Ich lege den Stift','auf','den Tisch','.','akk','Wohin lege ich den Stift?'],
 ['Die Katze springt','unter','das Bett','.','akk','Wohin springt die Katze?'],
 ['Wir gehen','in','die Klasse','.','akk','Wohin gehen wir?'],
 ['Sie hängt das Bild','an','die Wand','.','akk','Wohin hängt sie das Bild?']
].forEach(r=>add({typ:'praep',stufe:2,lv:2,cats:[r[4]],sent:r[0]+' '+r[1]+' <span class="hl">'+r[2]+'</span>'+r[3],opts:FK.map(x=>FN[x]),answer:FN[r[4]],optCat:N2K,
  why:'<b>'+r[5]+'</b> – «'+r[1]+'» ist eine Wechselpräposition. '+(r[4]==='dat'?'Wo? gibt den Dativ.':'Wohin? gibt den Akkusativ.')}));
/* Wissen: Welchen Fall verlangt die Präposition? */
[['mit','dat',1],['für','akk',1],['durch','akk',1],['nach','dat',1],['bei','dat',1],['ohne','akk',1],['gegen','akk',1],['aus','dat',1],['von','dat',1],['zu','dat',1],['wegen','gen',2],['während','gen',2],['trotz','gen',3],['statt','gen',3]].forEach(r=>
  add({typ:'praep',stufe:r[2],lv:r[2],cats:[r[1]],sent:'',prompt:'Welchen Fall verlangt die Präposition <b>«'+r[0]+'»</b>?',opts:FK.map(x=>FN[x]),answer:FN[r[1]],optCat:N2K,why:'«'+r[0]+'» verlangt den '+FN[r[1]]+': '+r[0]+' '+MAN[FK.indexOf(r[1])]+'.'}));
[['dat','Wo?','Wo steht der Stift? Auf dem Tisch.'],['akk','Wohin?','Wohin legst du den Stift? Auf den Tisch.']].forEach(r=>
  add({typ:'praep',stufe:2,lv:2,cats:[r[0]],sent:'',prompt:'Eine Wechselpräposition (in, auf, an …) antwortet auf die Frage <b>'+r[1]+'</b> Welchen Fall verlangt sie?',opts:FK.map(x=>FN[x]),answer:FN[r[0]],optCat:N2K,why:r[2]+' → '+FN[r[0]]+'.'}));

/* ---- NEU: Fallfehler finden und korrigieren ---- */
const FE=[
 ['Ich helfe','mein Freund',' bei den Hausaufgaben.','meinem Freund',['meinen Freund','meines Freundes'],'dat',1,'Wem helfe ich?'],
 ['Sie hat sich','ein neuer Rucksack',' gekauft.','einen neuen Rucksack',['einem neuen Rucksack','eines neuen Rucksacks'],'akk',1,'Was hat sie gekauft?'],
 ['Ich sehe','der Lehrer',' im Gang.','den Lehrer',['dem Lehrer','des Lehrers'],'akk',1,'Wen sehe ich?'],
 ['Er dankt','seinen Lehrer',' für die Hilfe.','seinem Lehrer',['seines Lehrers','seine Lehrer'],'dat',1,'Wem dankt er?'],
 ['Das Handy gehört','der Schüler','.','dem Schüler',['den Schüler','des Schülers'],'dat',1,'Wem gehört das Handy?'],
 ['Ich schenke','mein Bruder',' ein Buch.','meinem Bruder',['meinen Bruder','meines Bruders'],'dat',1,'Wem schenke ich ein Buch?'],
 ['Das Fahrrad','meine Schwester',' ist neu.','meiner Schwester',['meine Schwester','meinen Schwestern'],'gen',1,'Wessen Fahrrad? Ersatzprobe: das Fahrrad meines Vaters.'],
 ['Für','meinem Freund',' kaufe ich ein Geschenk.','meinen Freund',['meines Freundes','meine Freund'],'akk',1,'«für» verlangt den Akkusativ.'],
 ['Nach','die Pause',' schreiben wir einen Test.','der Pause',['die Pause','den Pausen'],'dat',2,'«nach» verlangt den Dativ.'],
 ['Wir spielen mit','unsere Freunde',' Fussball.','unseren Freunden',['unsere Freunde','unserer Freunde'],'dat',2,'«mit» verlangt den Dativ. Im Dativ Mehrzahl hat das Nomen ein -n.'],
 ['Wegen','dem schlechten Wetter',' fällt der Ausflug aus.','des schlechten Wetters',['dem schlechten Wetter','den schlechten Wetter'],'gen',2,'«wegen» verlangt den Genitiv. In der Mundart hört man «wegen dem», in der Schriftsprache gilt der Genitiv.'],
 ['Während','die Ferien',' arbeitet sie im Café.','der Ferien',['die Ferien','den Ferien'],'gen',2,'«während» verlangt den Genitiv.'],
 ['Ich gehe ohne','meinem Handy',' ins Kino.','mein Handy',['meinem Handy','meines Handys'],'akk',2,'«ohne» verlangt den Akkusativ.'],
 ['Die Katze springt auf','dem Tisch','.','den Tisch',['dem Tisch','des Tisches'],'akk',2,'Wohin springt die Katze? Wohin? gibt den Akkusativ.'],
 ['Der Stift liegt auf','den Tisch','.','dem Tisch',['den Tisch','des Tisches'],'dat',2,'Wo liegt der Stift? Wo? gibt den Dativ.'],
 ['Sie hängt das Bild an','der Wand','.','die Wand',['der Wand','den Wand'],'akk',2,'Wohin hängt sie das Bild? Wohin? gibt den Akkusativ.'],
 ['Wir sitzen in','die Klasse','.','der Klasse',['die Klasse','den Klasse'],'dat',2,'Wo sitzen wir? Wo? gibt den Dativ.'],
 ['Man darf innerhalb','dem Schulhaus',' nicht rennen.','des Schulhauses',['dem Schulhaus','den Schulhäusern'],'gen',3,'«innerhalb» verlangt den Genitiv.'],
 ['Das Dorf liegt oberhalb','dem See','.','des Sees',['dem See','den See'],'gen',3,'«oberhalb» verlangt den Genitiv.'],
 ['Er hat','ein kleiner Hund',' gekauft.','einen kleinen Hund',['einem kleinen Hund','eines kleinen Hundes'],'akk',3,'Was hat er gekauft? Der Akkusativ männlich endet auf -en: einen kleinen Hund.']
];
FE.forEach(r=>{
  const wrong=r[1];
  add({typ:'fehler',stufe:r[6],lv:r[6],cats:[r[5]],sent:(r[0]?r[0]+' ':'')+'<span class="hl">'+wrong+'</span>'+r[2],opts:[r[3],wrong].concat(r[4].filter(x=>x!==wrong&&x!==r[3]).slice(0,1)).concat(['Kein Fehler']),answer:r[3],
    why:'<b>'+r[7]+'</b> → '+r[3]+' ('+FN[r[5]]+'). Die Form «'+wrong+'» ist falsch.'});
});
/* Aufgaben ohne Fehler */
[
 ['Wir gehen mit','unserer Lehrerin',' ins Museum.',['unsere Lehrerin','unserem Lehrerin','unseren Lehrerin'],'dat',1,'«mit» verlangt den Dativ: mit unserer Lehrerin ist richtig.'],
 ['Während','der Pause',' spielen wir Fussball.',['die Pause','den Pausen','dem Pause'],'gen',2,'«während» verlangt den Genitiv: während der Pause ist richtig.'],
 ['Ich sehe','den Lehrer',' im Gang.',['dem Lehrer','der Lehrer','des Lehrers'],'akk',1,'Wen sehe ich? Den Lehrer. Der Satz ist richtig.']
].forEach(r=>add({typ:'fehler',stufe:r[5],lv:r[5],cats:[r[4]],sent:(r[0]?r[0]+' ':'')+'<span class="hl">'+r[1]+'</span>'+r[2],opts:['Kein Fehler'].concat(r[3]),answer:'Kein Fehler',why:r[6]}));

/* ---- NEU: Endungen bei «ein» und Adjektiv ---- */
FK.forEach((k,ci)=>{
  [1,2,3].forEach(level=>{for(let i=0;i<2;i++){
    const pool=level===1?POOL.m:level===2?NOUN.filter(n=>n.g==='f'||n.g==='n'):NOUN.filter(n=>n.g!=='p');
    const n=pool[(ci*3+i*2+level)%pool.length],adj=ADJ[(ci+i+level)%ADJ.length];
    const b=build(ci,n,'ein',adj,i+ci+level);
    const fx=x=>b.start?cap(x):x;
    const det=g=>FK.map((_,c)=>fx(EIN[g][c]+' '+adjF(adj,ADJEE[g][c])));
    const ans=det(n.g)[ci],opts=[ans];
    [].concat(det(n.g),det('m'),det('f'),det('n')).forEach(x=>{if(opts.length<4&&!opts.includes(x))opts.push(x);});
    add({typ:'endung',stufe:level,lv:level,cats:[k],sent:b.gapE,opts,answer:ans,why:'<b>'+b.q+'</b> → '+ans+' ('+FN[k]+').'});
  }});
});

/* ================= Lernen: Abschnitte ================= */
const tryW=t=>'<div class="try" data-w="try" data-types="'+t+'"></div>';
const REVEAL=(label,inner)=>'<div><button class="btn sm" data-a="rev" data-l="'+label+'">'+label+'</button><div class="sol" hidden>'+inner+'</div></div>';
function tabInner(kind,focus,same){
  const HEAD=['männlich','weiblich','sächlich','Mehrzahl'];
  const A={
   best:['der / die / das',{nom:['der Hund','die Katze','das Kind','die Kinder'],gen:['des Hundes','der Katze','des Kindes','der Kinder'],dat:['dem Hund','der Katze','dem Kind','den Kindern'],akk:['den Hund','die Katze','das Kind','die Kinder']},{nom:[1,2,3],akk:[1,2,3],gen:[1],dat:[1]}],
   unb:['ein / eine',{nom:['ein Hund','eine Katze','ein Kind','– (kein Artikel)'],gen:['eines Hundes','einer Katze','eines Kindes','– (kein Artikel)'],dat:['einem Hund','einer Katze','einem Kind','– (kein Artikel)'],akk:['einen Hund','eine Katze','ein Kind','– (kein Artikel)']},{nom:[1,2],akk:[1,2],gen:[1],dat:[1]}],
   dies:['dieser',{nom:['dieser Hund','diese Katze','dieses Kind','diese Kinder'],gen:['dieses Hundes','dieser Katze','dieses Kindes','dieser Kinder'],dat:['diesem Hund','dieser Katze','diesem Kind','diesen Kindern'],akk:['diesen Hund','diese Katze','dieses Kind','diese Kinder']},{nom:[1,2,3],akk:[1,2,3],gen:[1],dat:[1]},true],
   kein:['kein',{nom:['kein Hund','keine Katze','kein Kind','keine Kinder'],gen:['keines Hundes','keiner Katze','keines Kindes','keiner Kinder'],dat:['keinem Hund','keiner Katze','keinem Kind','keinen Kindern'],akk:['keinen Hund','keine Katze','kein Kind','keine Kinder']},{nom:[1,2,3],akk:[1,2,3],gen:[1],dat:[1]},true]
  };
  const t=A[kind];
  if(focus==='static')return '<div class="tw"><table><tr><th>Fall</th>'+HEAD.map(h=>'<th>'+h+'</th>').join('')+'</tr>'+FK.map(k=>'<tr><td class="rh f-'+k+'">'+FN[k]+'<br><span style="font-weight:400;font-size:.85em">'+FQ[k]+'</span></td>'+t[1][k].map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table></div>';
  return '<div class="btnrow">'+Object.keys(A).filter(k=>!A[k][3]||lv()>=2).map(k=>'<button data-a="wtab" data-kind="'+k+'" class="'+(kind===k?'on':'')+'">'+A[k][0]+'</button>').join('')+
   '</div><div class="btnrow">'+['all'].concat(FK).map(k=>'<button data-a="wtab" data-focus="'+k+'" class="'+(focus===k?'on':'')+'">'+(k==='all'?'Alle Fälle':FN[k])+'</button>').join('')+
   '<button data-a="wtab" data-same="1" class="'+(same==='1'?'on':'')+'">Gleiche Formen zeigen</button></div>'+
   '<div class="tw '+(same==='1'?'showsame':'')+'"><table><tr><th>Fall</th>'+HEAD.map(h=>'<th>'+h+'</th>').join('')+'</tr>'+
   FK.map(k=>'<tr class="'+(focus!=='all'&&focus!==k?'dim':'')+'"><td class="rh f-'+k+'">'+FN[k]+'<br><span style="font-weight:400;font-size:.85em">'+FQ[k]+'</span></td>'+
     t[1][k].map((c,i)=>'<td class="'+((t[2][k]||[]).includes(i)?'same':'')+'">'+c+'</td>').join('')+'</tr>').join('')+'</table></div>';
}
function umstellHTML(){
  const U=[
   ['<span class="u f-nom">Der Hund</span> beisst <span class="u f-akk">den Mann</span>.','<span class="u f-akk">Den Mann</span> beisst <span class="u f-nom">der Hund</span>.','Beisst <span class="u f-nom">der Hund</span> <span class="u f-akk">den Mann</span>?'],
   ['<span class="u f-nom">Ich</span> gebe <span class="u f-dat">dem Hund</span> <span class="u f-akk">einen Knochen</span>.','<span class="u f-dat">Dem Hund</span> gebe <span class="u f-nom">ich</span> <span class="u f-akk">einen Knochen</span>.','<span class="u f-akk">Einen Knochen</span> gebe <span class="u f-nom">ich</span> <span class="u f-dat">dem Hund</span>.']
  ];
  return '<div class="btnrow"><button data-a="uw">Fälle einfärben</button></div><div class="grid2 uw">'+U.map(g=>'<div class="card">'+g.map(s=>'<p>«'+s+'»</p>').join('')+'</div>').join('')+'</div>'+
   '<div class="callout info">Der Fall bleibt gleich, auch wenn ein Wort an einer anderen Stelle steht. Das Wer-Wort (Nominativ) steht nicht immer vorne. Achte auf die Form: <b>der</b> Hund = Nominativ, <b>den</b> Mann = Akkusativ.</div>';
}
const SEC={
 ziele:()=>'<div class="card"><h3>Das lernst du hier</h3><ul style="margin:.2rem 0 0;padding-left:1.2rem">'+
  '<li>Ich kenne die vier Fälle: Nominativ, Genitiv, Dativ, Akkusativ.</li>'+
  '<li>Ich kenne die Fragewörter zu den Fällen: Wer oder was? Wessen? Wem? Wen oder was?</li>'+
  '<li>Ich kann mit der Ersatzprobe (Maskulinprobe) den Fall eines Nomens bestimmen.</li>'+
  '<li>Ich kann Fälle in Sätzen erkennen und bestimmen (z. B. <i>Der Hund läuft.</i> → Nominativ; <i>Ich sehe den Hund.</i> → Akkusativ).</li>'+
  '<li>Ich weiss, welchen Fall eine Präposition verlangt, und kenne die Wechselpräpositionen (Wo? oder Wohin?).</li>'+
  '<li>Ich finde Fallfehler und korrigiere sie.</li>'+
  '<li>Ich setze bei «ein» und Adjektiv die richtigen Endungen.</li></ul></div>',
 wozu:()=>'<h2>Wozu gibt es Fälle?</h2><p class="sub" style="margin-top:0">Fälle zeigen, welche Rolle ein Wort im Satz spielt.</p>'+
  '<div class="grid2"><div class="card"><h3>Die Form verrät die Rolle</h3>'+
  '<p class="sent">«'+mk('nom','Der Hund')+' beisst '+mk('akk','den Mann')+'.»</p><p class="sent">«'+mk('akk','Den Mann')+' beisst '+mk('nom','der Hund')+'.»</p>'+
  '<p>Die Wörter stehen anders, die Bedeutung bleibt gleich: Der Hund beisst, der Mann wird gebissen. Das siehst du nur an der Form des Artikels: <b>der</b> oder <b>den</b>.</p></div>'+
  '<div class="card"><h3>Vergleich mit Englisch</h3><p class="sent">The dog bites the man.<br>The man bites the dog.</p>'+
  '<p>Im Englischen entscheidet die <b>Wortstellung</b>. Im Deutschen entscheidet die <b>Form</b> des Wortes. Darum dürfen wir im Deutschen freier umstellen.</p><p class="muted">Im Englischen gibt es Fälle nur noch bei Pronomen: <i>he sees him</i>.</p></div></div>'+
  '<div class="callout info"><b>Mundart und Schriftsprache:</b> In der Mundart sagen wir «s Velo vom Vater» (mit «von» und Dativ). In der Schrift steht der Genitiv: «das Velo '+mk('gen','des Vaters')+'». Wie zeigen andere Sprachen, wem etwas gehört?</div>'+
  '<div class="callout">Ein Fall sagt dir nicht, <b>wo</b> ein Wort steht, sondern <b>welche Rolle</b> es spielt.</div>',
 vier:()=>'<h2>Die vier Fälle und ihre Fragen</h2><div class="grid4">'+[
   ['nom','1. Fall','Wer macht es? Worum geht es?','«'+mk('nom','Der Hund')+' bellt.»'],
   ['gen','2. Fall','Besitz und Zugehörigkeit','«das Halsband '+mk('gen','des Hundes')+'»'],
   ['dat','3. Fall','Wem wird etwas gegeben, gezeigt, geholfen?','«Ich gebe '+mk('dat','dem Hund')+' Wasser.»'],
   ['akk','4. Fall','Wen oder was trifft die Handlung?','«Ich sehe '+mk('akk','den Hund')+'.»']
  ].map(d=>'<div class="fcard f-'+d[0]+'"><h3>'+d[1]+' · '+FN[d[0]]+'</h3><div class="q">'+FQ[d[0]]+'</div><div class="role">'+d[2]+'</div><div class="ex">'+d[3]+'</div></div>').join('')+'</div>'+
  '<div class="callout"><b>So fragst du:</b> Nominativ, Dativ und Akkusativ fragst du mit dem <b>Verb</b> (dem Tunwort): <i>Wer oder was bellt? Wem gebe ich Wasser? Wen oder was sehe ich?</i> Den Genitiv fragst du beim <b>Nomen</b>: <i>das Halsband – wessen?</i></div>'+tryW('zuordnen,bestimmen'),
 begriffe:()=>'<h2>Fachbegriffe</h2><div class="tw"><table><tr><th>Deutsch</th><th>Latein</th><th>Bedeutung</th></tr>'+
  '<tr><td><b>Kasus</b> (Fall)</td><td>lat. casus = Fall</td><td>Die vier Formen, die ein Nomen mit Begleiter im Satz annehmen kann.</td></tr>'+
  '<tr><td class="rh f-nom">Nominativ (1. Fall)</td><td>lat. casus nominativus = Nennfall</td><td><b>Wer oder was?</b></td></tr>'+
  '<tr><td class="rh f-gen">Genitiv (2. Fall)</td><td>lat. casus genitivus = Wesfall</td><td><b>Wessen?</b></td></tr>'+
  '<tr><td class="rh f-dat">Dativ (3. Fall)</td><td>lat. casus dativus = Wemfall</td><td><b>Wem?</b></td></tr>'+
  '<tr><td class="rh f-akk">Akkusativ (4. Fall)</td><td>lat. casus accusativus = Wenfall</td><td><b>Wen oder was?</b></td></tr>'+
  '<tr><td><b>deklinieren</b></td><td>lat. declinare = abwandeln, beugen (= die Form verändern)</td><td>Nomen und Begleiter nach Fall und Zahl verändern.</td></tr>'+
  '<tr><td><b>Präposition</b></td><td>lat. praepositio = Voranstellung</td><td>Verhältniswort (mit, für, wegen). Sie verlangt einen Fall.</td></tr>'+
  '<tr><td><b>Wechselpräposition</b></td><td></td><td>Verlangt Dativ (Wo?) oder Akkusativ (Wohin?): in, auf, an, unter …</td></tr>'+
  '<tr><td><b>Ersatzprobe</b> (Maskulinprobe)</td><td>lat. masculinum = männlich</td><td>Das Nomen durch «der Mann» ersetzen, damit man den Fall sieht.</td></tr></table></div>',
 tabelle:()=>'<h2>Die Artikel in den 4 Fällen</h2><div data-w="tab" data-kind="best" data-focus="all" data-same="0">'+tabInner('best','all','0')+'</div>'+
  '<p class="muted" style="margin-top:.6rem">Nur beim männlichen Nomen unterscheiden sich alle vier Fälle. Bei weiblichen und sächlichen Nomen und in der Mehrzahl sehen mehrere Fälle gleich aus. Im Dativ Mehrzahl hat das Nomen oft ein -n (den Kindern).</p>'+tryW('einsetzen'),
 proben:()=>'<h2>Die drei Proben</h2>'+
  '<h3 class="pr" id="p-frage">Probe 1: Die Frageprobe</h3><div class="card"><ol class="steps">'+
   '<li><b>Verb suchen</b> (das Tunwort: Was passiert?).</li><li><b>Frage bilden:</b> Fragewort + Verb + Rest des Satzes, zum Beispiel <i>Wem schenke ich ein Buch?</i></li>'+
   '<li><b>Antwort:</b> Die Gruppe, die antwortet, hat den Fall des Fragewortes.</li><li><b>Genitiv:</b> Frage beim Nomen: <i>die Mutter – wessen?</i></li></ol></div>'+
  '<div class="grid2" style="margin-top:.8rem">'+[
   ['Der Lehrer erklärt die Aufgabe.',[['nom','Wer erklärt?','Der Lehrer'],['akk','Was erklärt er?','die Aufgabe']]],
   ['Ich schenke meiner Schwester ein Buch.',[['nom','Wer schenkt?','Ich'],['dat','Wem schenke ich etwas?','meiner Schwester'],['akk','Was schenke ich?','ein Buch']]],
   ['Die Mutter des Mädchens kocht Tee.',[['nom','Wer kocht Tee?','Die Mutter des Mädchens'],['gen','Wessen Mutter?','des Mädchens'],['akk','Was kocht sie?','Tee']]],
   ['Heute hilft der Nachbar dem Grossvater.',[['nom','Wer hilft?','der Nachbar'],['dat','Wem hilft er?','dem Grossvater']]]
  ].map(x=>'<div class="card"><p class="sent">«'+x[0]+'»</p>'+REVEAL('Fragen stellen',x[1].map(r=>'<p>'+tag(r[0])+' <i>'+r[1]+'</i> → '+mk(r[0],r[2])+'</p>').join(''))+'</div>').join('')+'</div>'+
  tryW('frage')+'<h3 class="pr" id="p-ersatz">Probe 2: Die Ersatzprobe (Maskulinprobe)</h3><div class="grid2"><div class="card"><ol class="steps">'+
   '<li><b>Gruppe markieren</b> (Artikel + Nomen).</li><li><b>Ersetzen</b> durch «der Mann» (männlich, Einzahl). Passt das Verb nicht mehr, setze es in die Einzahl.</li>'+
   '<li><b>Form ablesen:</b> Bei männlichen Nomen sind alle vier Fälle verschieden.</li></ol></div>'+
   '<div class="card"><h3>Die vier Formen von «der Mann»</h3><p>'+tag('nom')+' <b>der</b> Mann</p><p>'+tag('gen')+' <b>des</b> Mannes</p><p>'+tag('dat')+' <b>dem</b> Mann</p><p>'+tag('akk')+' <b>den</b> Mann</p></div></div>'+
  '<div class="grid2" style="margin-top:.8rem">'+[
   ['Ich helfe <span class="grp">der Nachbarin</span>.','Ich helfe '+mk('dat','dem Mann')+'.','dat','dem'],
   ['Das Fahrrad <span class="grp">der Nachbarin</span> ist neu.','Das Fahrrad '+mk('gen','des Mannes')+' ist neu.','gen','des'],
   ['Wir besuchen <span class="grp">das Mädchen</span>.','Wir besuchen '+mk('akk','den Mann')+'.','akk','den'],
   ['<span class="grp">Die Kinder</span> lachen laut.',mk('nom','Der Mann')+' lacht laut.','nom','der'],
   ['Sie dankt <span class="grp">den Kindern</span>.','Sie dankt '+mk('dat','dem Mann')+'.','dat','dem'],
   ['Das Haus <span class="grp">der Eltern</span> ist gross.','Das Haus '+mk('gen','des Mannes')+' ist gross.','gen','des']
  ].map(x=>'<div class="card"><p class="sent">«'+x[0]+'»</p>'+REVEAL('Mit «der Mann» ersetzen','<p>«'+x[1]+'»</p><p>«'+x[3]+'» → '+tag(x[2])+'</p>')+'</div>').join('')+'</div>'+
  tryW('ersatz')+'<h3 class="pr" id="p-umstell">Probe 3: Die Umstellprobe</h3><div data-w="uw">'+umstellHTML()+'</div>',
 praep:()=>'<h2>Präpositionen und ihre Fälle</h2><p class="sub" style="margin-top:0">Eine Präposition (Verhältniswort) verlangt einen bestimmten Fall. Die Gruppe nach ihr steht in diesem Fall.</p>'+
  '<div class="grid3">'+[
   ['akk','Immer Akkusativ',['durch','für','gegen','ohne','um'],'«Wir gehen '+mk('akk','durch den Park')+'.»'],
   ['dat','Immer Dativ',['aus','ausser','bei','mit','nach','seit','von','zu','gegenüber'],'«Ich fahre '+mk('dat','mit dem Velo')+' zur Schule.»'],
   ['gen','Genitiv',['wegen','während','trotz','statt','innerhalb','ausserhalb','oberhalb','unterhalb'],'«'+mk('gen','Wegen des Regens')+' fällt der Ausflug aus.»']
  ].map(d=>'<div class="card f-'+d[0]+'" style="background:var(--b);border:2px solid var(--c);color:var(--t)"><h3 style="margin:0 0 .3rem">'+FN[d[0]]+'</h3><b>'+d[1]+'</b><p style="margin:.4rem 0">'+d[2].map(x=>'<span class="tag f-'+d[0]+'">'+x+'</span>').join(' ')+'</p><p class="sent" style="margin:.3rem 0 0">'+d[3]+'</p></div>').join('')+'</div>'+
  '<div class="card" style="margin-top:.8rem;border-top:5px solid #0d9488"><h3 style="margin:0 0 .3rem">🔀 Wechselpräpositionen: Wo? oder Wohin?</h3><p>'+['an','auf','hinter','in','neben','über','unter','vor','zwischen'].map(x=>'<span class="tag f-art">'+x+'</span>').join(' ')+'</p>'+
   '<div class="grid2"><div><p>'+tag('dat')+' <b>Wo?</b> – Der Stift liegt '+mk('dat','auf dem Tisch')+'.</p></div><div><p>'+tag('akk')+' <b>Wohin?</b> – Ich lege den Stift '+mk('akk','auf den Tisch')+'.</p></div></div></div>'+
  '<div class="callout info"><b>Zusammenziehungen:</b> am = an dem, im = in dem, beim = bei dem, vom = von dem, zum = zu dem, zur = zu der, ins = in das, ans = an das.</div>'+
  '<div class="callout"><b>Genitiv:</b> In der Mundart sagt man oft «wegen dem Regen». In der Schriftsprache steht der Genitiv: «wegen des Regens».</div>'+
  '<div class="callout info">📖 <b>Im Lehrmittel heisst das …</b> «Präpositionalgruppe». Mehr zur Präposition als Wortart findest du im Kapitel Partikel. Hier geht es nur um den Fall, den sie verlangt.</div>'+tryW('praep'),
 fehler:()=>'<h2>Fallfehler finden und korrigieren</h2><p class="sub" style="margin-top:0">Fallfehler passieren oft nach einer Präposition oder bei Verben wie helfen und danken. So findest du sie:</p>'+
  '<div class="card"><ol class="steps"><li><b>Gruppe markieren</b>, die falsch klingt (Artikel + Nomen).</li><li><b>Den Fall bestimmen:</b> Verb oder Präposition suchen, dann fragen. Oder die Ersatzprobe mit «der Mann» machen.</li><li><b>Form korrigieren</b> und den Satz laut lesen.</li></ol></div>'+
  '<div class="tw" style="margin-top:.8rem"><table><tr><th>Falsch</th><th>Richtig</th><th>Warum?</th></tr>'+
  [['Ich helfe <s>mein Freund</s>.','Ich helfe '+mk('dat','meinem Freund')+'.','helfen: Wem helfe ich? Dativ'],
   ['Sie sieht <s>der Lehrer</s>.','Sie sieht '+mk('akk','den Lehrer')+'.','Wen sieht sie? Akkusativ'],
   ['Wir spielen mit <s>unsere Freunde</s>.','Wir spielen mit '+mk('dat','unseren Freunden')+'.','mit: Dativ, Mehrzahl mit -n'],
   ['Wegen <s>dem Regen</s> bleiben wir da.',mk('gen','Wegen des Regens')+' bleiben wir da.','wegen: Genitiv'],
   ['Die Katze springt auf <s>dem Tisch</s>.','Die Katze springt auf '+mk('akk','den Tisch')+'.','Wohin? Akkusativ']].map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table></div>'+
  '<div class="callout"><b>Achtung:</b> Nicht jeder Satz hat einen Fehler. Prüfe zuerst, bevor du etwas änderst.</div>'+tryW('fehler'),
 endung:()=>'<h2>Endungen bei «ein» und Adjektiv</h2><p class="sub" style="margin-top:0">Ein Nomen mit Adjektiv ändert Artikel und Adjektiv. Zuerst den Fall bestimmen, dann die Endung setzen.</p>'+
  '<div class="tw"><table><tr><th>Fall</th><th>männlich</th><th>weiblich</th><th>sächlich</th></tr>'+
  FK.map((k,c)=>'<tr><td class="rh f-'+k+'">'+FN[k]+'<br><span style="font-weight:400;font-size:.85em">'+FQ[k]+'</span></td>'+['m','f','n'].map(g=>{const nf={m:['Hund','Hundes','Hund','Hund'],f:['Katze','Katze','Katze','Katze'],n:['Kind','Kindes','Kind','Kind']}[g];return '<td>'+EIN[g][c]+' <b>klein'+ADJEE[g][c]+'</b> '+nf[c]+'</td>';}).join('')+'</tr>').join('')+'</table></div>'+
  '<div class="grid2" style="margin-top:.8rem"><div class="card"><h3>Merke</h3><ul><li>Das Adjektiv endet meistens auf <b>-en</b>.</li><li>Ausnahmen: Nominativ männlich <b>-er</b>, Nominativ und Akkusativ weiblich <b>-e</b>, Nominativ und Akkusativ sächlich <b>-es</b>.</li></ul></div>'+
  '<div class="card"><h3>So gehst du vor</h3><ol class="steps"><li>Fall bestimmen (Frage oder Präposition).</li><li>Mit «der Mann» die Form des Artikels prüfen.</li><li>Endung des Adjektivs aus der Tabelle setzen.</li></ol></div></div>'+
  '<div class="callout info">Beispiel: «Sie hat '+mk('akk','einen kleinen Hund')+' gekauft.» (Wen oder was? Akkusativ, männlich: einen kleinen)</div>'+tryW('endung'),
 stolper:()=>'<h2>Stolpersteine</h2>'+GT.ui.vs({h:'Dativ',c:'#7c3aed',b:'#ede9fe',t:'#4c1d95',items:['«Ich helfe '+mk('dat','der Nachbarin')+'.» (Wem?)']},{h:'Genitiv',c:'#d97706',b:'#fef3c7',t:'#78350f',items:['«Das Fahrrad '+mk('gen','der Nachbarin')+'.» (Wessen?)']})+'<div style="height:.6rem"></div>'+GT.ui.vs({h:'Dativ',c:'#7c3aed',b:'#ede9fe',t:'#4c1d95',items:['«Ich helfe '+mk('dat','ihm')+'.» (Wem?)']},{h:'Akkusativ',c:'#16a34a',b:'#dcfce7',t:'#14532d',items:['«Ich sehe '+mk('akk','ihn')+'.» (Wen?)']})+'<div style="height:.8rem"></div><div class="grid3">'+[
   ['1 · Dativ und Genitiv bei weiblichen Nomen','«Ich helfe '+mk('dat','der Nachbarin')+'.» (Dativ)<br>«Das Fahrrad '+mk('gen','der Nachbarin')+'.» (Genitiv)','Hilfe: Ersatzprobe mit «dem Mann» und «des Mannes».'],
   ['2 · Nominativ und Akkusativ sehen gleich aus','«'+mk('nom','Die Katze')+' jagt '+mk('akk','die Maus')+'.»','Bei weiblich, sächlich und Mehrzahl gleich. Hilfe: Mit dem Verb fragen: Wer jagt? Wen jagt sie?'],
   ['3 · Das Wer-Wort steht nicht immer vorne','«'+mk('akk','Den Ball')+' wirft '+mk('nom','der Torwart')+'.»','Hilfe: Umstellprobe. Wer wirft? der Torwart.'],
   ['4 · Dativ Mehrzahl hat ein -n','«Sie dankt '+mk('dat','den Kindern')+'.»','Das -n am Nomen verrät den Dativ in der Mehrzahl.'],
   ['5 · Wem oder wen?','«Ich helfe '+mk('dat','ihm')+'.» (Wem?)<br>«Ich sehe '+mk('akk','ihn')+'.» (Wen?)','Bei «helfen» fragst du wem, bei «sehen» fragst du wen.'],
   ['6 · Mundart ist nicht Schriftsprache','Mundart: «s Velo vom Vater».<br>Schriftsprache: «das Velo '+mk('gen','des Vaters')+'».','In der Schrift verwenden wir den Genitiv.']
  ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>',
 check:()=>'<h2>Probier es aus</h2><p class="sub" style="margin-top:0">Gemischte Aufgaben zum Ausprobieren. Nach jeder Antwort siehst du die Lösung.</p>'+tryW('bestimmen,frage,ersatz,einsetzen,zuordnen'),
 erweiterung:()=>'<h2>Erweiterung <span class="pill">Niveau '+(lv()>=3?'A und B':'B')+'</span></h2><div class="grid2"><div class="card"><h3>Personalpronomen in allen Fällen</h3><div class="tw"><table>'+
  '<tr><th></th><th class="f-nom">Nom.</th><th class="f-gen">Gen.</th><th class="f-dat">Dat.</th><th class="f-akk">Akk.</th></tr>'+
  [['ich','ich','meiner','mir','mich'],['du','du','deiner','dir','dich'],['er','er','seiner','ihm','ihn'],['sie','sie','ihrer','ihr','sie'],['es','es','seiner','ihm','es'],['wir','wir','unser','uns','uns'],['ihr','ihr','euer','euch','euch'],['sie (Mz.)','sie','ihrer','ihnen','sie']].map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+
  '</table></div></div><div class="card"><h3>Nomen mit Adjektiv</h3><p>'+tag('nom')+' der kleine Hund · '+tag('gen')+' des kleinen Hundes</p><p>'+tag('dat')+' dem kleinen Hund · '+tag('akk')+' den kleinen Hund</p>'+
  '<p class="muted">Die Ersatzprobe funktioniert genauso: «dem kleinen Mädchen» → «dem kleinen Mann» → Dativ. Fast alle Adjektive enden auf -en.</p>'+
  (lv()>=3?'<h3 style="margin-top:1rem">Nur Niveau A: Nominativ nach «sein» und «werden»</h3><p>«Er ist '+mk('nom','ein guter Lehrer')+'.» «Sie wird '+mk('nom','Ärztin')+'.» Nach «sein», «werden» und «bleiben» steht wieder der Nominativ.</p>':'')+'</div></div>'
};
const TOC=[['ziele','Lernziele'],['wozu','Wozu Fälle?'],['vier','Die 4 Fälle'],['begriffe','Begriffe'],['tabelle','Artikel-Tabelle'],['proben','Proben'],['stolper','Stolpersteine'],['praep','Präpositionen'],['fehler','Fallfehler'],['endung','Endungen'],['check','Ausprobieren'],['erweiterung','Erweiterung',2]];

const PRESETS=[['Alles gemischt','Alle Aufgabentypen',['bestimmen','zuordnen','frage','ersatz','einsetzen','anmalen','praep','fehler','endung']],['Präpositionen und Fehler','Fall nach Präposition, Fallfehler',['praep','fehler']],['Endungen','Artikel und Adjektiv',['endung']],['Fälle bestimmen','Fall im Satz erkennen und anmalen',['bestimmen','anmalen']],['Proben','Frageprobe und Ersatzprobe',['frage','ersatz']],['Wissen und Formen','Fälle, Fragen, Artikel',['zuordnen','einsetzen']]];

/* ================= Lehrerteil: Folien aus denselben Bausteinen ================= */
const PARTS=()=>SEC.proben().split('<h3 class="pr" id="p-');
const probe=i=>()=>'<h3 class="pr" id="p-'+PARTS()[i];
const UEB=[
 ['Bestimme alle Fälle: «Der Lehrer erklärt den Schülern die Aufgabe.»','Der Lehrer '+tag('nom')+' (Wer erklärt?) · den Schülern '+tag('dat')+' (Wem?) · die Aufgabe '+tag('akk')+' (Was?)',1],
 ['Ersatzprobe: «Ich danke der Nachbarin.» Welcher Fall?','Ich danke dem Mann → '+tag('dat'),1],
 ['Ersatzprobe: «Das Fahrrad der Nachbarin ist neu.» Welcher Fall hat «der Nachbarin»?','Das Fahrrad des Mannes → '+tag('gen')+' (Wessen Fahrrad?)',1],
 ['Bestimme die Fälle: «Die Katze fängt die Maus.»','Die Katze '+tag('nom')+' (Wer fängt?) · die Maus '+tag('akk')+' (Wen fängt sie?)',1],
 ['Bestimme die Fälle: «Den Ball wirft der Torwart.»','Den Ball '+tag('akk')+' · der Torwart '+tag('nom')+' (Wer wirft?)',1],
 ['Setze in den richtigen Fall: «Ich gebe [der Mann] das Buch.»','<b>dem Mann</b> – '+tag('dat')+' (Wem gebe ich das Buch?)',1],
 ['Setze in den richtigen Fall: «Das ist das Auto [meine Mutter].»','<b>meiner Mutter</b> – '+tag('gen')+' (Wessen Auto? Ersatzprobe: das Auto meines Vaters)',1],
 ['Bestimme den Fall von «dem kleinen Mädchen»: «Er hilft dem kleinen Mädchen.» <span class="pill">B/A</span>',tag('dat')+' Wem hilft er? Ersatzprobe: dem kleinen Mann.',2],
 ['Welchen Fall verlangt «mit»? Setze ein: «Ich spiele mit [mein Bruder].»','<b>mit meinem Bruder</b> – '+tag('dat')+' («mit» verlangt immer den Dativ)',1],
 ['Korrigiere: «Wegen dem Regen fällt der Ausflug aus.»','<b>Wegen des Regens</b> – '+tag('gen')+' («wegen» verlangt den Genitiv)',2],
 ['Wo oder wohin? «Die Katze springt auf [der Tisch].» Setze in den richtigen Fall.','<b>auf den Tisch</b> – Wohin? '+tag('akk'),2]
];
const uebHTML=()=>'<div class="noprint"><div class="callout info" style="margin:0 0 .8rem">👩‍🏫 <b>Gemeinsam vorne lösen:</b> Drei Aufgaben zu den Fällen. Klasse antworten lassen, mit Frage oder Ersatzprobe begründen, dann «Nächste Aufgabe». Mit «Alle drei neu» kommen drei frische.</div>'+[1,2,3].map(()=>tryW('bestimmen,frage,ersatz,einsetzen,praep,fehler,endung')).join('')+'<div style="margin:.8rem 0"><button class="btn" data-a="tall">🔄 Alle drei neu</button></div><h3 style="margin-top:1.2rem">Zum Aufschreiben</h3></div>'+'<ol class="ex">'+UEB.filter(u=>u[2]<=lv()).map(u=>'<li>'+u[0]+'<div class="po wl"></div><div class="noprint">'+REVEAL('Lösung zeigen',u[1])+'</div></li>').join('')+'</ol>';
const MERKSLIDE=()=>'<div class="tw"><table><tr><th>Fall</th><th>Frage</th><th>Rolle</th><th>Ersatzprobe</th></tr>'+
 [['nom','Wer oder was?','Wer macht es? Worum geht es?','<b>der</b> Mann'],['gen','Wessen?','Besitz und Zugehörigkeit','<b>des</b> Mannes'],['dat','Wem?','Empfänger','<b>dem</b> Mann'],['akk','Wen oder was?','Ziel der Handlung','<b>den</b> Mann']]
 .map((r,i)=>'<tr><td class="rh f-'+r[0]+'">'+(i+1)+'. '+FN[r[0]]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>').join('')+'</table></div>'+
 '<div class="grid2" style="margin-top:1rem"><div class="card"><h3>Drei Proben</h3><ol><li><b>Frageprobe:</b> Fragewort + Verb stellen (Genitiv: beim Nomen fragen).</li><li><b>Ersatzprobe:</b> Nomen durch «der Mann» ersetzen und die Form ablesen.</li><li><b>Umstellprobe:</b> Satz umstellen. Der Fall bleibt gleich.</li></ol></div>'+
 '<div class="card"><h3>Merksätze</h3><ol><li>Fälle zeigen die Rolle im Satz, nicht die Stellung.</li><li>Das Wer-Wort steht nicht immer vorne.</li><li>Weiblich, sächlich und Mehrzahl: Nominativ und Akkusativ sehen gleich aus.</li><li>Weiblich: Dativ und Genitiv sehen gleich aus. Die Ersatzprobe entscheidet.</li><li>Dativ Mehrzahl: -n am Nomen (den Kindern).</li></ol></div></div>';
const SLIDES=[
{id:'titel',title:'Die 4 Fälle (Kasus)',min:3,p:'h',note:'Lernziele laut lesen. Sie entsprechen den Prüfungs-Lernzielen. Das Niveau oben bestimmt, wie viel Erweiterung eingeblendet wird.',
 html:()=>'<p class="kicker">I. Wortlehre · Kapitel 3</p><p class="big">Wer oder was? Wessen? Wem? Wen oder was?</p><div class="grid2">'+SEC.ziele()+
  '<div class="card noprint"><h3>Ablauf</h3><ol><li>Einstieg: Der Hund in vier Sätzen</li><li>Wozu gibt es Fälle?</li><li>Die vier Fälle und ihre Fragen</li><li>Fachbegriffe und Artikel-Tabelle</li><li>Proben: Frageprobe, Ersatzprobe, Umstellprobe</li><li>Stolpersteine und Üben</li><li>Merkblatt und Abschluss-Check</li></ol></div></div>'},
{id:'einstieg',title:'Ein Hund, vier Sätze',min:5,p:'',note:'Tippe die Sätze nacheinander an. Frage zuerst: Was fällt an «der Hund» auf? Noch nichts erklären, nur Beobachtungen sammeln. Die Kernfrage zum Schluss laut stellen.',
 html:()=>'<p class="lead">Tippe auf einen Satz, um die Form zu markieren und die Frage zu sehen.</p><div data-w="einstieg"></div><div class="callout"><b>Kernfrage:</b> Warum verändert sich «der Hund» – und woran erkenne ich, welche Form im Satz richtig ist?</div>'},
{id:'wozu',title:'Wozu gibt es Fälle?',min:8,p:'h',note:'Zuerst die beiden Hund-Mann-Sätze vorlesen: Wer beisst? Die Klasse merkt: Es ist beide Male der Hund. Dann den Vergleich mit Englisch. Hier noch keine Fachwörter wie Subjekt oder Prädikat verwenden.',html:()=>SEC.wozu()},
{id:'vier',title:'Die 4 Fälle und ihre Fragen',min:7,p:'h',note:'Fragen im Chor üben: Wer oder was? Wessen? Wem? Wen oder was? Nominativ, Dativ und Akkusativ fragt man mit dem Verb, den Genitiv beim Nomen.',html:()=>SEC.vier()},
{id:'begriffe',title:'Fachbegriffe',min:4,p:'h',note:'Begriffe laut sprechen lassen. Die Reihenfolge 1. bis 4. Fall lautet Nominativ, Genitiv, Dativ, Akkusativ.',html:()=>SEC.begriffe()},
{id:'tabelle',title:'Die Artikel in den 4 Fällen',min:7,p:'h',note:'Tabelle abschreiben lassen. «Gleiche Formen zeigen» bereitet die Stolpersteine vor. Nur beim männlichen Nomen unterscheiden sich alle vier Fälle.',html:()=>SEC.tabelle(),print:()=>tabInner('best','static')+'<div style="height:.6rem"></div>'+tabInner('unb','static')},
{id:'live',title:'Live-Beispiel: Schritt für Schritt',min:6,p:'',note:'Die Klasse nennt die Frage, bevor du den nächsten Schritt aufdeckst. Erst das Verb finden, dann fragen.',html:()=>'<div data-w="stepper"></div>'},
{id:'frage',title:'Probe 1: Die Frageprobe',min:10,p:'h',note:'Die Schülerinnen und Schüler stellen die Fragen selbst, bevor du die Lösung aufdeckst. Beim dritten Beispiel zeigen, dass der Genitiv beim Nomen gefragt wird.',html:probe(1)},
{id:'ersatz',title:'Probe 2: Die Ersatzprobe (Maskulinprobe)',min:10,p:'h',note:'Wichtigste Probe für weibliche und sächliche Nomen, weil dort Dativ und Genitiv oder Nominativ und Akkusativ gleich aussehen. Jedes Beispiel zuerst von der Klasse ersetzen lassen.',html:probe(2)},
{id:'umstell',title:'Probe 3: Die Umstellprobe',min:6,p:'h',note:'Zuerst die Sätze ohne Farbe lesen und fragen, wer was macht. Dann «Fälle einfärben». Das Wer-Wort steht nicht immer vorne, der Fall bleibt aber gleich.',html:probe(3)},
{id:'stolper',title:'Stolpersteine',min:6,p:'h',note:'Pro Stolperstein etwa eine Minute. Lass die Schülerinnen und Schüler ein eigenes Beispiel bilden.',html:()=>SEC.stolper()},
{id:'praep',title:'Präpositionen und ihre Fälle',min:10,p:'h',note:'Die Präposition verlangt den Fall. Zuerst die drei Gruppen im Chor lesen, dann die Wechselpräpositionen mit Wo? und Wohin? an der Tafel mit Gesten zeigen (Stift liegt / Stift legen). Die Präposition als Wortart gehört ins Kapitel Partikel.',html:()=>SEC.praep()},
{id:'fehler',title:'Fallfehler finden und korrigieren',min:10,p:'h',note:'Nicht jeder Satz hat einen Fehler. Die Klasse liest den Satz laut, bestimmt den Fall mit Frage oder Ersatzprobe und korrigiert die Form.',html:()=>SEC.fehler()},
{id:'endung',title:'Endungen bei «ein» und Adjektiv',min:8,p:'h',lv:2,note:'Erst den Fall bestimmen, dann die Endung aus der Tabelle. Ab Niveau B sichtbar.',html:()=>SEC.endung()},
{id:'tippen',title:'Fall antippen',min:8,p:'',note:'Variante: alle notieren zuerst auf dem Mini-Whiteboard, dann tippt eine Schülerin den Fall. Das Feedback nennt die Frage; sie von der Klasse wiederholen lassen.',html:()=>'<p class="lead">Bestimme den Fall der markierten Wörter. Tippe auf die richtige Antwort.</p>'+tryW('bestimmen')+tryW('bestimmen')},
{id:'uebungen',title:'Gemeinsame Übungen',min:12,p:'u',note:'Einzel- oder Partnerarbeit, danach Lösung einblenden. Jede Antwort mit der Frage oder der Ersatzprobe begründen lassen. Dieselbe Folie gibt es als Übungsblatt zum Drucken.',html:uebHTML},
{id:'erweiterung',title:'Erweiterung für Niveau A und B',min:8,lv:2,p:'h',note:'Nur ab Niveau B sichtbar. Der Nominativ nach «sein» erscheint nur auf Niveau A.',html:()=>SEC.erweiterung()},
{id:'merkblatt',title:'Merkblatt',min:4,p:'hm',note:'Als Merkblatt drucken (PDF-Menü, «Nur Merkblatt») oder abschreiben lassen.',html:MERKSLIDE},
{id:'check',title:'Abschluss-Check',min:5,p:'',note:'Als Exit-Ticket einzeln lösen lassen. Das Ergebnis zeigt, wer Dativ und Genitiv noch verwechselt: Das ist die Grundlage für die Differenzierung.',html:()=>'<p class="lead">Vier Aufgaben, tippe jeweils die richtige Antwort.</p>'+[1,2,3,4].map(()=>tryW('bestimmen,frage,ersatz')).join('')}
];

/* ================= Merkblatt für Schüler ================= */
function merk0(){
  return ''+
   '<h3>Die vier Fälle und ihre Fragen</h3><div class="tw"><table><tr><th>Fall</th><th>Frage</th><th>Rolle</th><th>Beispiel</th></tr>'+
   [['nom','Wer oder was?','Wer macht etwas?','Der Hund bellt.'],['gen','Wessen?','Besitz, Zugehörigkeit','das Halsband des Hundes'],['dat','Wem?','Empfänger','Ich gebe dem Hund Wasser.'],['akk','Wen oder was?','Ziel der Handlung','Ich sehe den Hund.']].map(r=>'<tr><td class="rh f-'+r[0]+'">'+(FK.indexOf(r[0])+1)+'. '+FN[r[0]]+'</td><td><b>'+r[1]+'</b></td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>').join('')+'</table></div>'+
   '<h3 style="margin-top:.9rem">Die Artikel</h3>'+tabInner('best','static')+'<div style="height:.5rem"></div>'+tabInner('unb','static')+
   '<h3 style="margin-top:.9rem">Die drei Proben</h3><ol><li><b>Frageprobe:</b> Verb suchen, dann fragen: Wer oder was …? Wem …? Wen oder was …? Genitiv: Nomen – wessen?</li>'+
   '<li><b>Ersatzprobe:</b> Gruppe durch «der Mann» ersetzen: '+MAN.map((m,i)=>FN[FK[i]]+' = '+m).join(' · ')+'.</li>'+
   '<li><b>Umstellprobe:</b> Der Fall bleibt gleich, auch wenn das Wort an einer anderen Stelle steht.</li></ol>'+
   '<h3>Stolpersteine</h3><ul><li>Weiblich, sächlich, Mehrzahl: Nominativ und Akkusativ sehen gleich aus. Mit dem Verb fragen.</li><li>Dativ und Genitiv bei weiblichen Nomen sehen gleich aus (der Nachbarin). Ersatzprobe: dem Mann oder des Mannes?</li><li>Dativ Mehrzahl hat ein -n (den Kindern).</li></ul>';
}

const merk=()=>merk0()+
 '<h3 style="margin-top:.9rem">Präpositionen und ihre Fälle</h3><div class="tw"><table><tr><th>Fall</th><th>Präpositionen</th></tr>'+
 '<tr><td class="rh f-akk">Akkusativ</td><td>durch, für, gegen, ohne, um</td></tr>'+
 '<tr><td class="rh f-dat">Dativ</td><td>aus, ausser, bei, mit, nach, seit, von, zu, gegenüber</td></tr>'+
 '<tr><td class="rh f-gen">Genitiv</td><td>wegen, während, trotz, statt, innerhalb, ausserhalb, oberhalb, unterhalb</td></tr>'+
 '<tr><td class="rh f-art">Wechsel</td><td>an, auf, hinter, in, neben, über, unter, vor, zwischen: <b>Wo?</b> = Dativ, <b>Wohin?</b> = Akkusativ</td></tr></table></div>'+
 '<h3>Fallfehler finden</h3><ol><li>Gruppe markieren.</li><li>Fall bestimmen (Präposition oder Verb, dann Frage oder Ersatzprobe).</li><li>Form korrigieren und laut lesen. Nicht jeder Satz hat einen Fehler.</li></ol>'+
 '<h3>Endungen bei «ein» und Adjektiv</h3><p>Das Adjektiv endet meistens auf <b>-en</b>. Ausnahmen: Nominativ männlich <b>-er</b> (ein kleiner Hund), Nominativ und Akkusativ weiblich <b>-e</b> (eine kleine Katze), Nominativ und Akkusativ sächlich <b>-es</b> (ein kleines Kind).</p>';

/* ================= Widgets des Lehrerteils ================= */
const widgets={
einstieg(el){
  const L=[
   {s:'«'+mk('nom','Der Hund')+' bellt.»',w:tag('nom')+' Wer oder was bellt? – der Hund.'},
   {s:'«Die Besitzerin '+mk('gen','des Hundes')+' lacht.»',w:tag('gen')+' Wessen Besitzerin? – des Hundes.'},
   {s:'«Sie gibt '+mk('dat','dem Hund')+' '+mk('akk','einen Knochen')+'.»',w:tag('dat')+' Wem gibt sie etwas? – dem Hund. '+tag('akk')+' Was gibt sie? – einen Knochen.'},
   {s:'«Sie streichelt '+mk('akk','den Hund')+'.»',w:tag('akk')+' Wen streichelt sie? – den Hund.'}
  ];
  const cls=['f-nom','f-gen','f-dat','f-akk'];
  el.innerHTML=L.map((l,i)=>'<button class="line '+cls[i]+'" aria-expanded="false"><span class="s">'+l.s+'</span><span class="why">'+l.w+'</span></button>').join('')+'<button class="btn sm" id="einAll">Alle aufdecken</button>';
  el.addEventListener('click',e=>{
    const b=e.target.closest('.line');
    if(b){b.classList.toggle('open');b.setAttribute('aria-expanded',b.classList.contains('open'));return;}
    if(e.target.id==='einAll'){el.querySelectorAll('.line').forEach(x=>{x.classList.add('open');x.setAttribute('aria-expanded','true');});}
  });
},
stepper(el){
  const toks=[{t:'Die Lehrerin',s:2,k:'nom'},{t:'gibt',s:1,k:'pred'},{t:'dem Schüler',s:3,k:'dat'},{t:'einen Stift.',s:4,k:'akk'}];
  const msgs=[
   'Der Satz: «Die Lehrerin gibt dem Schüler einen Stift.» Welche Fälle stecken darin?',
   '<b>Schritt 1 – Verb finden:</b> «gibt» ist das Tunwort. Von ihm aus stellen wir alle Fragen.',
   '<b>Schritt 2:</b> <i>Wer oder was gibt?</i> → «Die Lehrerin» = '+tag('nom')+'.',
   '<b>Schritt 3:</b> <i>Wem gibt sie etwas?</i> → «dem Schüler» = '+tag('dat')+'.',
   '<b>Schritt 4:</b> <i>Wen oder was gibt sie?</i> → «einen Stift» = '+tag('akk')+'.',
   '<b>Ergebnis:</b> '+tag('nom')+' – '+tag('dat')+' – '+tag('akk')+'. Bei Unsicherheit: Ersatzprobe mit «der Mann».'
  ];
  let st=0;
  function draw(){
    el.innerHTML='<div class="stp">'+toks.map(t=>'<span class="'+(st>=t.s?(t.k==='pred'?'pred':'f-'+t.k):'')+'" '+(st>=t.s&&t.k!=='pred'?'style="background:var(--b);box-shadow:inset 0 -3px 0 var(--c)"':'')+'>'+t.t+'</span>').join('')+'</div>'+
     '<div class="stepmsg">'+msgs[st]+'</div>'+
     '<div class="stbar"><button class="btn" id="sBack"'+(st===0?' disabled':'')+'>‹ Schritt zurück</button><button class="btn primary" id="sNext"'+(st===msgs.length-1?' disabled':'')+'>Nächster Schritt ›</button><button class="btn" id="sReset">Von vorn</button>'+
     '<div class="dotrow">'+msgs.map((_,i)=>'<i class="'+(i<=st?'on':'')+'"></i>').join('')+'</div></div>';
  }
  draw();
  el.addEventListener('click',e=>{
    const id=e.target.id;
    if(id==='sNext'&&st<msgs.length-1)st++;else if(id==='sBack'&&st>0)st--;else if(id==='sReset')st=0;else return;
    draw();
  });
}
};

const actions={
 wtab(b){const w=b.closest('[data-w="tab"]');if(b.dataset.kind)w.dataset.kind=b.dataset.kind;else if(b.dataset.focus)w.dataset.focus=b.dataset.focus;else if(b.dataset.same)w.dataset.same=w.dataset.same==='1'?'0':'1';w.innerHTML=tabInner(w.dataset.kind,w.dataset.focus,w.dataset.same);},
 uw(b){const w=b.closest('[data-w="uw"]').querySelector('.uw');w.classList.toggle('on');b.textContent=w.classList.contains('on')?'Farben ausblenden':'Fälle einfärben';}
};
const glance=()=>'<div class="glance">'+FK.map(k=>'<div class="gl f-'+k+'"><span>'+(FK.indexOf(k)+1)+'. '+FN[k]+'</span><b>'+FQ[k]+'</b></div>').join('')+'</div>';
GT.register({id:'faelle',teil:'wort',nr:3,writeAny:['bestimmen','einsetzen','endung','fehler'],title:'Die 4 Fälle',desc:'Nominativ, Genitiv, Dativ und Akkusativ bestimmen',ex:EXF,
  cats:FK,catName:FN,catTitle:'Welche Fälle?',TYPES,TASKS,SEC,TOC,PRESETS,REF:[['vier','Die 4 Fälle'],['tabelle','Tabelle'],['proben','Proben'],['praep','Präpositionen'],['fehler','Fallfehler'],['endung','Endungen']],
  merk,glance,SLIDES,widgets,actions});
})();
