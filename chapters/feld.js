/* Kapitel Satzlehre 6: Das Feldermodell und die Satzklammer. */
(function(){
'use strict';
const GT=window.GT,T=GT.table;
const FN={v:'Vorfeld',l:'linke Satzklammer',m:'Mittelfeld',r:'rechte Satzklammer',n:'Nachfeld'};
const FK=['v','l','m','r','n'];
const C={fm1:'Felder erkennen',fm2:'Satzklammer',fm3:'Vorfeld und Satzarten',fm4:'Fachbegriffe'};

/* Sätze: [Vorfeld, linke Klammer, Mittelfeld (Liste), rechte Klammer, Nachfeld, Niveau, Satzart] */
const S=[
['Anna','liest',['ein Buch'],'','',1,'a'],
['Tim','spielt',['heute','Fussball'],'','',1,'a'],
['Nach der Pause','schreibt',['die Klasse','einen Test'],'','',1,'a'],
['Wir','treffen',['uns','am Freitag','im Schwimmbad'],'','',1,'a'],
['Mein Bruder','hat',['gestern','sein Handy'],'verloren','',1,'a'],
['Gestern','habe',['ich','mein Handy'],'verloren','',1,'a'],
['Die Lehrerin','hat',['der Klasse','die Aufgabe'],'erklärt','',1,'a'],
['Wir','haben',['gestern','Fussball'],'gespielt','',1,'a'],
['Der Bus','fährt',['um 7 Uhr'],'ab','',1,'a'],
['Sie','ruft',['ihre Freundin'],'an','',1,'a'],
['Tim','will',['heute','ins Kino'],'gehen','',2,'a'],
['Im Winter','muss',['man','eine Jacke'],'tragen','',2,'a'],
['Die Klasse','kann',['morgen','den Ausflug'],'machen','',2,'a'],
['Am Montag','wird',['die Klasse','einen Test'],'schreiben','',2,'a'],
['Heute','kommt',['mein Cousin','zu Besuch'],'','',2,'a'],
['','Hast',['du','die Aufgabe'],'gemacht','',2,'f'],
['','Kommt',['Anna','heute'],'mit','',2,'f'],
['Wann','schreibt',['die Klasse','den Test'],'','',2,'w'],
['Wer','hat',['das Fenster'],'geöffnet','',2,'w'],
['Ich','weiss',[],'','dass er morgen kommt',3,'a'],
['Anna','hat',['mir'],'gesagt','dass sie krank ist',3,'a']
];
const sentText=s=>[s[0],s[1]].concat(s[2],[s[3],s[4]]).filter(x=>x).join(' ')+(s[6]==='f'||s[6]==='w'?'?':'.');
const chunksOf=s=>{const c=[];if(s[0])c.push({t:s[0],f:'v'});c.push({t:s[1],f:'l'});s[2].forEach(x=>c.push({t:x,f:'m'}));if(s[3])c.push({t:s[3],f:'r'});if(s[4])c.push({t:s[4],f:'n'});return c;};
const fmt=x=>x.charAt(0).toUpperCase()+x.slice(1);

/* ---- Tabellen ---- */
const row=s=>FK.map((k,i)=>{const v=i===0?s[0]:i===1?s[1]:i===2?s[2].join(' | '):i===3?s[3]:s[4];return '<td class="fc fc-'+k+'">'+(v||'<span class="muted">–</span>')+'</td>';}).join('');
const FH='<tr>'+FK.map(k=>'<th class="fh fh-'+k+'">'+fmt(FN[k])+'</th>').join('')+'</tr>';
const fmTable=(sents,note)=>'<div class="tw"><table class="fmt">'+FH+sents.map(s=>'<tr>'+row(s)+'</tr>').join('')+'</table></div>'+(note?'<p class="muted" style="margin:.3rem 0 0">'+note+'</p>':'');
const blank=(sents)=>'<div class="tw"><table class="fmt fmblank">'+FH+sents.map(()=>'<tr>'+FK.map(k=>'<td class="fc fc-'+k+'">&nbsp;<br>&nbsp;</td>').join('')+'</tr>').join('')+'</table></div>';

/* ---- Aufgaben ---- */
const task=[];
const FIELDS=['Vorfeld','linke Satzklammer','Mittelfeld','rechte Satzklammer','Nachfeld'];
const add=(q,opts,ans,why,cat,st)=>task.push({typ:'probe',stufe:st,lv:st,cats:[cat],prompt:q,opts,answer:ans,why});
/* automatisch: In welchem Feld steht … ? */
S.forEach((s,si)=>{
  const st=s[5];if(st===3)return;
  const text=sentText(s);
  const pick=(f)=>{const ans=FN[f];const others=FIELDS.filter(x=>x!==ans);return [others.slice(si%2,si%2+3).length===3?others.slice(si%2,si%2+3):others.slice(0,3),ans];};
  const ch=chunksOf(s);
  /* Vorfeld */
  if(s[0]){const p=pick('v');add('In welchem Feld steht «<b>'+s[0]+'</b>»? Satz: «'+text+'»',p[0].concat([p[1]]),p[1],'Das Vorfeld steht vor der Personalform. Dort steht genau ein Satzglied.','fm1',st);}
  /* linke Klammer */
  {const p=pick('l');add('In welchem Feld steht die Personalform «<b>'+s[1]+'</b>»? Satz: «'+text+'»',p[0].concat([p[1]]),p[1],'Die Personalform steht in der linken Satzklammer.','fm2',st);}
  /* rechte Klammer */
  if(s[3]){const p=pick('r');add('In welchem Feld steht «<b>'+s[3]+'</b>»? Satz: «'+text+'»',p[0].concat([p[1]]),p[1],'Der zweite Verbteil steht in der rechten Satzklammer.','fm2',st);}
  /* Mittelfeld */
  if(s[2].length){const m=s[2][s.length%s[2].length];const p=pick('m');add('In welchem Feld steht «<b>'+m+'</b>»? Satz: «'+text+'»',p[0].concat([p[1]]),p[1],'Alle weiteren Satzglieder stehen im Mittelfeld, zwischen den beiden Klammern.','fm1',st);}
});
/* Wissensfragen */
[
['Wie heisst das Feld ganz vorn im Satz, vor der Personalform?',['Vorfeld','Mittelfeld','Nachfeld','Klammerfeld'],'Vorfeld','Das Vorfeld steht vor der linken Satzklammer.','fm4',1],
['Wie heisst das Feld zwischen den beiden Satzklammern?',['Mittelfeld','Vorfeld','Nachfeld','Zwischenfeld'],'Mittelfeld','Das Mittelfeld liegt zwischen linker und rechter Satzklammer.','fm4',1],
['Was steht in der <b>linken Satzklammer</b>?',['die Personalform','das Subjekt','das Objekt','der Punkt'],'die Personalform','Die Personalform steht im Aussagesatz immer an zweiter Stelle, in der linken Klammer.','fm2',1],
['Was steht in der <b>rechten Satzklammer</b>?',['die übrigen Verbteile','das Subjekt','die Adverbiale','das Attribut'],'die übrigen Verbteile','Zum Beispiel «verloren» in «Er hat sein Handy verloren.»','fm2',1],
['Warum heisst es «Satzklammer»?',['Die beiden Verbteile umklammern die anderen Satzglieder.','Weil der Satz in Klammern steht.','Weil ein Satz zwei Klammern braucht.','Weil das Subjekt klammert.'],'Die beiden Verbteile umklammern die anderen Satzglieder.','Links steht die Personalform, rechts der zweite Verbteil. Dazwischen liegt das Mittelfeld.','fm2',1],
['Wie viele Satzglieder stehen im <b>Vorfeld</b> eines Aussagesatzes?',['genau eines','zwei','beliebig viele','keines'],'genau eines','Die Verschiebeprobe zeigt es: Nur ein Satzglied kann vor der Personalform stehen.','fm3',1],
['Welcher Satz ist richtig im Feldermodell? «Er hat gestern gelacht.»',['Vorfeld: Er · links: hat · Mittelfeld: gestern · rechts: gelacht','Vorfeld: Er hat · links: gestern · rechts: gelacht','Vorfeld: Er · links: gestern · rechts: hat gelacht','Vorfeld: gestern · links: Er · rechts: hat gelacht'],'Vorfeld: Er · links: hat · Mittelfeld: gestern · rechts: gelacht','Die Personalform «hat» steht links, «gelacht» rechts, «gestern» im Mittelfeld.','fm2',1],
['Welche Satzglieder stehen im Mittelfeld von «Anna hat gestern ihr Handy verloren.»?',['gestern, ihr Handy','Anna, hat','verloren','Anna, verloren'],'gestern, ihr Handy','Vorfeld: Anna · links: hat · rechts: verloren. Dazwischen: gestern, ihr Handy.','fm1',1],
['Der Satz «Anna liest ein Buch.» hat nur einen Verbteil. Was steht in der rechten Satzklammer?',['nichts','liest','Buch','Anna'],'nichts','Hat das Verb nur einen Teil, bleibt die rechte Klammer leer.','fm2',1],
['Bei welchem Satz ist die rechte Satzklammer <b>leer</b>?',['Tim spielt heute Fussball.','Tim hat heute Fussball gespielt.','Tim will heute Fussball spielen.','Tim fängt heute an.'],'Tim spielt heute Fussball.','Das Verb «spielt» besteht nur aus einem Teil.','fm2',1],
['Welches Verb bildet eine <b>Satzklammer</b>? «Der Zug fährt pünktlich ab.»',['fährt … ab','pünktlich … ab','Der Zug … fährt','Zug … ab'],'fährt … ab','«abfahren» wird getrennt: fährt links, ab rechts.','fm2',1],
['Wo steht «ab» in «Der Zug fährt um 7 Uhr ab.»?',['in der rechten Satzklammer','im Vorfeld','im Mittelfeld','im Nachfeld'],'in der rechten Satzklammer','Der Verbzusatz «ab» bildet zusammen mit «fährt» die Satzklammer.','fm2',1],
['Welches Wort steht in «Wir haben gestern Fussball gespielt.» in der linken Satzklammer?',['haben','Wir','gespielt','gestern'],'haben','Die Personalform «haben» steht links.','fm2',1],
['Wie viele Satzglieder darf das Vorfeld höchstens enthalten?',['eines','zwei','drei','vier'],'eines','Beim Umstellen rückt immer nur ein Satzglied nach vorn.','fm3',1],
['Mit welcher Probe findest du heraus, was ins Vorfeld gehört?',['Verschiebeprobe','Ersatzprobe','Frageprobe','Zeitprobe'],'Verschiebeprobe','Was beim Verschieben vor die Personalform rückt, steht im Vorfeld. Im Lehrmittel heisst sie auch Vorfeldprobe.','fm3',1],
['Was gehört in die <b>linke Satzklammer</b> von «Gestern habe ich mein Handy verloren.»?',['habe','Gestern','ich','verloren'],'habe','Das Vorfeld ist «Gestern», aber die Personalform bleibt links in der Klammer.','fm2',1],
['Welches Satzglied steht im Vorfeld von «Nach der Pause schreibt die Klasse einen Test.»?',['Nach der Pause','die Klasse','einen Test','schreibt'],'Nach der Pause','Das erste Satzglied vor der Personalform bildet das Vorfeld.','fm1',1],
['Bei einer Entscheidungsfrage («Hast du die Aufgabe gemacht?») ist das Vorfeld …',['leer','mit «du» besetzt','mit «Hast» besetzt','mit «gemacht» besetzt'],'leer','Die Personalform steht ganz vorn, links in der Klammer. Das Vorfeld bleibt frei.','fm3',2],
['Welcher Satz ist eine Entscheidungsfrage? (Antwort Ja oder Nein)',['Hast du dein Heft dabei?','Wann kommst du?','Du hast dein Heft dabei.','Wo ist dein Heft?'],'Hast du dein Heft dabei?','Entscheidungsfragen beginnen mit der Personalform. Das Vorfeld bleibt leer.','fm3',2],
['Was steht im Vorfeld einer W-Frage? «Wann schreibt die Klasse den Test?»',['das Fragewort «Wann»','die Personalform','das Subjekt','nichts'],'das Fragewort «Wann»','Das Fragewort ist ein Satzglied (Adverbiale) und steht im Vorfeld.','fm3',2],
['Wo steht die Personalform in einer W-Frage?',['in der linken Satzklammer, an zweiter Stelle','im Vorfeld','im Nachfeld','in der rechten Satzklammer'],'in der linken Satzklammer, an zweiter Stelle','W-Frage: Fragewort im Vorfeld, danach die Personalform.','fm3',2],
['Was steht bei einer Aufforderung wie «Mach die Hausaufgaben!» im Vorfeld?',['nichts','Mach','die Hausaufgaben','das Ausrufezeichen'],'nichts','Die Personalform steht an erster Stelle, das Vorfeld bleibt leer.','fm3',2],
['In welcher Satzart bleibt das Vorfeld leer?',['Entscheidungsfrage und Aufforderung','Aussagesatz','W-Frage','kein Satz'],'Entscheidungsfrage und Aufforderung','Dort beginnt der Satz direkt mit der Personalform.','fm3',2],
['Welche Satzart hat ein besetztes Vorfeld?',['Aussagesatz und W-Frage','Entscheidungsfrage','Aufforderung','keine'],'Aussagesatz und W-Frage','Im Vorfeld steht ein Satzglied oder das Fragewort.','fm3',2],
['Welcher Satz zeigt eine Satzklammer mit Modalverb? ',['Tim will heute ins Kino gehen.','Tim geht heute ins Kino.','Tim ging heute ins Kino.','Heute Tim Kino.'],'Tim will heute ins Kino gehen.','«will» steht links, «gehen» rechts. Dazwischen liegt das Mittelfeld.','fm2',2],
['Welche Verbform steht bei «Die Klasse wird morgen einen Test schreiben.» in der rechten Satzklammer?',['schreiben','wird','morgen','Test'],'schreiben','Das Futur bildet eine Klammer: wird … schreiben.','fm2',2],
['Wie viele Satzglieder hat das Mittelfeld in «Wir treffen uns am Freitag im Schwimmbad.»?',['3','1','2','4'],'3','Mittelfeld: uns · am Freitag · im Schwimmbad. Vorfeld: Wir. Links: treffen.','fm1',2],
['Wie viele Satzglieder hat das Mittelfeld in «Die Lehrerin hat der Klasse die Aufgabe erklärt.»?',['2','1','3','4'],'2','Mittelfeld: der Klasse · die Aufgabe. Vorfeld: Die Lehrerin.','fm1',2],
['Wenn du «Heute» ins Vorfeld stellst, wo steht dann das Subjekt in «Heute kommt mein Cousin zu Besuch.»?',['im Mittelfeld','im Vorfeld','in der linken Satzklammer','im Nachfeld'],'im Mittelfeld','Das Subjekt «mein Cousin» steht hinter der Personalform im Mittelfeld.','fm3',2],
['Was steht im <b>Nachfeld</b> von «Ich weiss, dass er morgen kommt.»?',['dass er morgen kommt','Ich','weiss','nichts'],'dass er morgen kommt','Nebensätze stehen oft im Nachfeld, hinter der rechten Klammer.','fm1',3],
['Wo steht in «Anna hat mir gesagt, dass sie krank ist.» der Nebensatz?',['im Nachfeld','im Mittelfeld','im Vorfeld','in der linken Satzklammer'],'im Nachfeld','Der Nebensatz steht hinter «gesagt», also im Nachfeld.','fm1',3],
['Welches Feld steht ganz am Schluss des Satzes?',['das Nachfeld','das Vorfeld','das Mittelfeld','die linke Satzklammer'],'das Nachfeld','Reihenfolge: Vorfeld · linke Klammer · Mittelfeld · rechte Klammer · Nachfeld.','fm4',2]
].forEach(f=>add(f[0],f[1],f[2],f[3],f[4],f[5]));

/* Eintippaufgaben */
[
["fach",1,"fm4","Das Feld ganz vorn im Satz heisst …","Das Feld heisst …","Vorfeld",["Das Vorfeld"],true,"Vor der Personalform steht das Vorfeld."],
["fach",1,"fm4","Das Feld zwischen den beiden Klammern heisst …","Das Feld heisst …","Mittelfeld",["Das Mittelfeld"],true,"Zwischen den Klammern liegt das Mittelfeld."],
["fach",1,"fm4","Links steht die Personalform, rechts der zweite Verbteil. Zusammen bilden sie die …","Das nennt man …","Satzklammer",["Die Satzklammer"],true,"Die beiden Verbteile umklammern das Mittelfeld."],
["fach",2,"fm4","Das Feld ganz am Schluss heisst …","Das Feld heisst …","Nachfeld",["Das Nachfeld"],true,"Hinter der rechten Klammer steht das Nachfeld."],
["fach",2,"fm4","Wie heisst die Verbform, die im Aussagesatz an zweiter Stelle steht?","Die Form heisst …","Personalform",["Die Personalform"],true,"Sie steht in der linken Satzklammer."],
["fach",2,"fm4","Satzglieder durch Verschieben vor die Personalform finden. Das ist die …","Die Probe heisst …","Verschiebeprobe",["Vorfeldprobe","Umstellprobe"],true,"Im Lehrmittel heisst sie auch Vorfeldprobe."]
].forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1],cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'.</b> '+r[8]}));

/* ---- Widget: Felder füllen ---- */
const widgets={
 felder(el){
  const L=GT.lv();
  const pool=S.filter(s=>s[5]<=L&&s[5]>=1);
  let i=Math.floor(Math.random()*pool.length),st=null;
  const load=()=>{const s=pool[i];st={s,ch:chunksOf(s),pl:{},sel:null,done:false};};
  const draw=()=>{
    const {s,ch,pl,sel,done}=st;
    const chBtn=(c,idx,inField)=>'<button type="button" class="fmchip'+(sel===idx?' sel':'')+(done?(pl[idx]===c.f?' ok':' err'):'')+'" data-i="'+idx+'" data-fm="chip">'+c.t+'</button>';
    const cell=k=>'<div class="fmcell fc-'+k+'" data-f="'+k+'" data-fm="cell"><div class="fmh fh-'+k+'">'+fmt(FN[k])+'</div><div class="fmbody">'+ch.map((c,idx)=>pl[idx]===k?chBtn(c,idx,true):'').join('')+'</div></div>';
    const unplaced=ch.map((c,idx)=>pl[idx]?'':chBtn(c,idx,false)).join('');
    el.innerHTML='<div class="fmw"><div class="instr">Tippe ein Satzglied an und dann das Feld, in das es gehört. Tippe auf ein gesetztes Satzglied, um es zurückzulegen.</div>'+
     '<div class="fmsent"><span class="pill">Satz</span> '+(s[6]==='a'?'':'<span class="pill" style="background:#fef3c7;color:#92400e">'+(s[6]==='f'?'Entscheidungsfrage':'W-Frage')+'</span> ')+'<b>'+sentText(s)+'</b></div>'+
     '<div class="fmpool" data-fm="pool">'+(unplaced||'<span class="muted">Alle Satzglieder sind gesetzt.</span>')+'</div>'+
     '<div class="fmgrid">'+FK.map(cell).join('')+'</div>'+
     '<div class="fmfb">'+(done?(fb()):'')+'</div>'+
     '<div class="actions"><button type="button" class="btn sm" data-fm="reset">Zurücksetzen</button>'+(done?'':'<button type="button" class="btn primary sm" data-fm="chk">Prüfen</button>')+'<button type="button" class="btn sm" data-fm="next">Anderer Satz</button></div></div>';
  };
  const fb=()=>{
    const {s,ch,pl}=st;const ok=ch.every((c,idx)=>pl[idx]===c.f);
    return '<div class="fb '+(ok?'ok':'err')+'"><b>'+(ok?'✓ Alles richtig!':'✗ Nicht ganz richtig.')+'</b> '+(ok?'':'Richtig wäre: ')+(ok?'':'Vorfeld: '+(s[0]||'leer')+' · linke Klammer: '+s[1]+' · Mittelfeld: '+(s[2].join(' | ')||'leer')+' · rechte Klammer: '+(s[3]||'leer')+(s[4]?' · Nachfeld: '+s[4]:''))+'</div>';
  };
  el.addEventListener('click',e=>{
    const b=e.target.closest('[data-fm]');if(!b||!el.contains(b))return;
    const a=b.dataset.fm;
    if(a==='chip'){if(st.done)return;const idx=Number(b.dataset.i);if(st.pl[idx]){delete st.pl[idx];st.sel=null;}else{st.sel=st.sel===idx?null:idx;}draw();}
    else if(a==='cell'){if(st.done||st.sel===null)return;st.pl[st.sel]=b.dataset.f;st.sel=null;draw();}
    else if(a==='reset'){load();st.s=st.s;draw();}
    else if(a==='next'){let j=i;if(pool.length>1)while(j===i)j=Math.floor(Math.random()*pool.length);i=j;load();draw();}
    else if(a==='chk'){if(st.ch.some((c,idx)=>!st.pl[idx])){const f=el.querySelector('.fmfb');f.innerHTML='<div class="fb err">Setze zuerst alle Satzglieder in ein Feld.</div>';return;}st.done=true;draw();}
    e.stopPropagation();
  });
  load();draw();
 }
};

/* ---- Folien ---- */
const card=(h,p,k)=>'<div class="card fcard fc-'+k+'"><b class="fh-'+k+'">'+h+'</b><p style="margin:.25rem 0 0">'+p+'</p></div>';
const SECS=[
{id:'idee',title:'Das Feldermodell: Der Satz als Regal',short:'Das Feldermodell',min:8,note:'Mit dem Regal-Bild einsteigen: Der Satz hat fünf Fächer. Beispielsatz an der Tafel in die Felder übertragen. Die Verschiebeprobe aus dem Kapitel 2 wird hier wieder gebraucht: Was ins Vorfeld rückt, ist ein Satzglied.',
 html:()=>'<div style="display:flex;gap:.8rem;align-items:center;padding:.8rem 1rem;border-radius:12px;background:#dbeafe;border:2px solid #2563eb;color:#1e3a8a"><span style="font-size:2.2rem">🗄️</span><div><b style="font-size:1.15rem">Jeder Satz hat fünf Felder. Die Verbteile bilden die Klammer.</b></div></div>'+
  '<p class="lead" style="margin-top:.8rem">Das <b>Feldermodell</b> zeigt, wo die Wörter im Satz stehen. Du kannst jeden Satz in dieses Raster übertragen.</p>'+
  fmTable([['Gestern','hat',['Anna','ihr Handy'],'verloren','']],'Gestern hat Anna ihr Handy verloren.')+
  '<div class="grid3" style="margin-top:.8rem">'+card('Vorfeld','Genau ein Satzglied. Es steht vor der Personalform.','v')+card('Linke Satzklammer','Die Personalform des Verbs.','l')+card('Mittelfeld','Alle weiteren Satzglieder.','m')+card('Rechte Satzklammer','Die übrigen Verbteile (zum Beispiel «verloren»).','r')+card('Nachfeld','Ganz am Schluss. Hier steht oft ein Nebensatz.','n')+'</div>'+
  '<div class="callout info"><b>Im Lehrmittel heisst das …</b> «Vorfeldprobe» für die Verschiebeprobe. Gemeint ist dasselbe: Du verschiebst ein Satzglied ins Vorfeld.</div>'},
{id:'klammer',title:'Die Satzklammer',short:'Die Satzklammer',min:8,note:'Wichtig: Nicht alle Sätze haben eine rechte Klammer. «Anna liest ein Buch» hat nur einen Verbteil. Zweiteilige Verben aus Kapitel 4 wieder aufgreifen. Die Klasse nennt zuerst die Verbteile, dann zeigt man die Felder.',
 html:()=>'<p class="lead">Wenn das Verb aus <b>zwei Teilen</b> besteht, stehen die Teile <b>links und rechts</b>. Dazwischen liegt das Mittelfeld. So entsteht eine <b>Klammer</b> um den Rest des Satzes.</p>'+
  fmTable([['Mein Bruder','hat',['gestern','sein Handy'],'verloren',''],['Tim','will',['heute','ins Kino'],'gehen',''],['Der Bus','fährt',['um 7 Uhr'],'ab',''],['Die Klasse','wird',['morgen','einen Test'],'schreiben','']])+
  T(['Verb','Beispiel','Links','Rechts'],[['Perfekt','Mein Bruder hat gestern sein Handy verloren.','hat','verloren'],['Modalverb','Tim will heute ins Kino gehen.','will','gehen'],['Trennbares Verb','Der Bus fährt um 7 Uhr ab.','fährt','ab'],['Futur','Die Klasse wird morgen einen Test schreiben.','wird','schreiben']])+
  '<div class="callout"><b>Achtung:</b> Besteht das Verb nur aus einem Teil («Anna <b>liest</b> ein Buch»), bleibt die rechte Klammer <b>leer</b>.</div>'},
{id:'vorfeld',title:'Das Vorfeld: Genau ein Satzglied',short:'Das Vorfeld',min:8,note:'Verschiebeprobe als Vorfeldprobe: Die Klasse stellt denselben Satz mehrmals um. Immer steht nur ein Satzglied im Vorfeld, die Personalform bleibt in der linken Klammer.',
 html:()=>'<p class="lead">Vor der Personalform steht <b>genau ein Satzglied</b>. Mit der Verschiebeprobe kannst du es wechseln.</p>'+
  fmTable([['Mein Bruder','hat',['gestern','sein Handy'],'verloren',''],['Gestern','hat',['mein Bruder','sein Handy'],'verloren',''],['Sein Handy','hat',['mein Bruder','gestern'],'verloren','']])+
  '<div class="grid2" style="margin-top:.8rem"><div class="card"><b>✅ Richtig</b><p style="margin:.3rem 0 0">Gestern hat mein Bruder sein Handy verloren.</p></div><div class="card"><b>❌ Falsch</b><p style="margin:.3rem 0 0">Gestern mein Bruder hat sein Handy verloren.</p><p class="muted" style="margin:.2rem 0 0">Zwei Satzglieder im Vorfeld: Die Personalform rutscht an die dritte Stelle.</p></div></div>'+
  '<div class="callout info"><b>Tipp:</b> Findest du mehrere Wörter vor der Personalform, gehören sie zu <b>einem</b> Satzglied (zum Beispiel «Nach der Pause»).</div>'},
{id:'schritte',title:'So überträgst du einen Satz ins Feldermodell',short:'Satz übertragen',min:7,note:'Schrittfolge am Beispiel an der Tafel durchgehen. Immer zuerst die Verbteile suchen, dann das Vorfeld, am Schluss den Rest ins Mittelfeld.',
 html:()=>'<ol class="steps"><li><b>Personalform</b> suchen (Personenprobe) und in die <b>linke Klammer</b> setzen.</li><li>Weitere <b>Verbteile</b> suchen und in die <b>rechte Klammer</b> setzen.</li><li>Das <b>Vorfeld</b> bestimmen: Es ist das Satzglied, das vor der Personalform steht.</li><li>Alle übrigen Satzglieder in das <b>Mittelfeld</b> setzen, in der Reihenfolge des Satzes.</li><li>Steht ein <b>Nebensatz</b> hinten, kommt er ins <b>Nachfeld</b>.</li></ol>'+
  '<p class="lead" style="margin-top:.8rem">Beispiel: «Am Freitag haben wir im Schwimmbad Fussball gespielt.»</p>'+
  fmTable([['Am Freitag','haben',['wir','im Schwimmbad','Fussball'],'gespielt','']])},
{id:'fragen',title:'Die Satzarten im Feldermodell',short:'Fragen und Aufforderungen',min:8,lv:2,note:'Vergleich der Satzarten: Bei Entscheidungsfrage und Aufforderung bleibt das Vorfeld leer. Bei der W-Frage steht das Fragewort im Vorfeld.',
 html:()=>'<p class="lead">Nicht jeder Satz beginnt im Vorfeld. Das Feldermodell zeigt den Unterschied der Satzarten.</p>'+
  fmTable([['Anna','hat',['die Aufgabe'],'gemacht',''],['','Hat',['Anna','die Aufgabe'],'gemacht',''],['Wer','hat',['die Aufgabe'],'gemacht',''],['','Mach',['die Aufgabe'],'','']])+
  T(['Satzart','Beispiel','Vorfeld'],[['Aussagesatz','Anna hat die Aufgabe gemacht.','besetzt'],['Entscheidungsfrage','Hat Anna die Aufgabe gemacht?','leer'],['W-Frage','Wer hat die Aufgabe gemacht?','besetzt (Fragewort)'],['Aufforderung','Mach die Aufgabe!','leer']])},
{id:'nachfeld',title:'Das Nachfeld',short:'Das Nachfeld',min:5,lv:3,note:'Das Nachfeld wird nur im Niveau A besprochen. Beispiele mit Nebensatz: Er steht hinter der rechten Klammer.',
 html:()=>'<p class="lead">Hinter der rechten Klammer kann ein <b>Nachfeld</b> stehen. Oft steht hier ein <b>Nebensatz</b>.</p>'+
  fmTable([['Ich','weiss',[],'','dass er morgen kommt'],['Anna','hat',['mir'],'gesagt','dass sie krank ist']])+
  '<div class="callout info"><b>Merke:</b> Das Nachfeld ist selten besetzt. Der Nebensatz zählt im Hauptsatz als ein Satzglied.</div>'},
{id:'felder',title:'Probier es aus: Felder füllen',short:'Felder füllen',min:10,p:'',note:'Als Wettbewerb in der Klasse: Satz erscheint, Klasse nennt Feld und Satzglied. Danach einzeln am Gerät. Auf Papier gibt es dieselbe Aufgabe als leeres Feldermodell.',
 html:()=>'<div class="noprint"><div data-w="felder"></div></div><div class="po" style="display:none">'+blank([1,2,3,4])+'</div>',
 print:()=>'<p class="lead">Übertrage die Sätze in das Feldermodell.</p><ol><li>Gestern habe ich mein Handy verloren.</li><li>Nach der Pause schreibt die Klasse einen Test.</li><li>Der Bus fährt um 7 Uhr ab.</li><li>Tim will heute ins Kino gehen.</li></ol>'+blank([1,2,3,4])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:5,note:'Typische Fehler: zwei Satzglieder im Vorfeld; Personalform ins Mittelfeld; rechte Klammer vergessen; zweiteilige Satzglieder auseinandergerissen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Zwei im Vorfeld','«Gestern <b>ich habe</b> …» ist falsch.','Im Vorfeld steht nur ein Satzglied.'],
  ['2 · Personalform bleibt links','«Heute <b>hat</b> er gelacht.»','Die Personalform wandert nicht ins Mittelfeld.'],
  ['3 · Rechte Klammer vergessen','«Er hat gestern <b>gelacht</b>.»','«gelacht» gehört in die rechte Klammer, nicht ins Mittelfeld.'],
  ['4 · Trennbares Verb','«Der Bus fährt um 7 Uhr <b>ab</b>.»','«fährt» links, «ab» rechts: beide gehören zum Verb.'],
  ['5 · Satzglied bleibt zusammen','«<b>Nach der Pause</b> schreibt …»','Alle Wörter eines Satzglieds stehen im selben Feld.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0">'+x[2]+'</p></div>').join('')+'</div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:4,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Feldermodell','Raster mit fünf Feldern, das zeigt, wo die Teile des Satzes stehen'],['Vorfeld','Feld vor der Personalform: genau ein Satzglied'],['Linke Satzklammer','Feld für die Personalform'],['Mittelfeld','Feld zwischen den Klammern: alle weiteren Satzglieder'],['Rechte Satzklammer','Feld für die übrigen Verbteile'],['Nachfeld','Feld ganz am Schluss, oft mit Nebensatz'],['Vorfeldprobe','anderer Name für die Verschiebeprobe']])}
];
const EX=[
 ['Übertrage in das Feldermodell: «Gestern habe ich mein Handy verloren.»','Vorfeld: Gestern · linke Klammer: habe · Mittelfeld: ich | mein Handy · rechte Klammer: verloren',1],
 ['Welches Feld bleibt leer? «Anna liest ein Buch.»','Die rechte Satzklammer (das Verb hat nur einen Teil).',1],
 ['Übertrage: «Der Bus fährt um 7 Uhr ab.»','Vorfeld: Der Bus · links: fährt · Mittelfeld: um 7 Uhr · rechts: ab',1],
 ['Stelle um, sodass «Nach der Pause» im Vorfeld steht: «Die Klasse schreibt nach der Pause einen Test.»','Nach der Pause schreibt die Klasse einen Test.',2],
 ['Übertrage die Frage: «Hat Anna die Aufgabe gemacht?»','Vorfeld: leer · links: Hat · Mittelfeld: Anna | die Aufgabe · rechts: gemacht',2]
];
const merk=()=>'<h3>🗄️ Das Feldermodell</h3><p>Das <b>Feldermodell</b> zeigt, wo die Teile des Satzes stehen. Es hat fünf Felder.</p>'+
 fmTable([['Gestern','hat',['Anna','ihr Handy'],'verloren','']])+
 T(['Feld','Was steht dort?'],[['Vorfeld','genau ein Satzglied'],['Linke Satzklammer','die Personalform'],['Mittelfeld','alle weiteren Satzglieder'],['Rechte Satzklammer','die übrigen Verbteile (kann leer sein)'],['Nachfeld','selten: oft ein Nebensatz']])+
 '<h3>📋 So überträgst du einen Satz</h3><ol><li>Personalform suchen: linke Klammer.</li><li>Weitere Verbteile suchen: rechte Klammer.</li><li>Das Satzglied vor der Personalform: Vorfeld.</li><li>Alle übrigen Satzglieder: Mittelfeld.</li><li>Nebensatz hinten: Nachfeld.</li></ol>'+
 '<h3>🔀 Satzarten</h3>'+T(['Satzart','Vorfeld'],[['Aussagesatz','ein Satzglied'],['Entscheidungsfrage','leer'],['W-Frage','Fragewort'],['Aufforderung','leer']])+
 '<h3>⚠️ Stolpersteine</h3><ul><li>Im Vorfeld steht nur <b>ein</b> Satzglied.</li><li>Die Personalform bleibt immer links in der Klammer.</li><li>Trennbare Verben: «fährt … ab» bilden eine Klammer.</li><li>Ohne zweiten Verbteil bleibt die rechte Klammer leer.</li></ul>'+
 '<h3>🔤 Fachbegriffe</h3>'+T(['Begriff','Bedeutung'],[['Vorfeld','Feld vor der Personalform'],['Satzklammer','Personalform links, restliche Verbteile rechts'],['Mittelfeld','Felder zwischen den Klammern'],['Nachfeld','Feld hinter der rechten Klammer'],['Vorfeldprobe','andere Bezeichnung für Verschiebeprobe']]);

const css='.fmt{width:100%;table-layout:fixed;border-collapse:separate;border-spacing:3px}.fmt th,.fmt td{border-radius:8px;padding:.45rem .5rem;text-align:center;font-size:.95rem}.fh-v,.fh.fh-v{background:#2563eb;color:#fff}.fh-l,.fh.fh-l,.fh-r,.fh.fh-r{background:#dc2626;color:#fff}.fh-m,.fh.fh-m{background:#16a34a;color:#fff}.fh-n,.fh.fh-n{background:#7c3aed;color:#fff}.fc-v{background:#dbeafe}.fc-l,.fc-r{background:#fee2e2}.fc-m{background:#dcfce7}.fc-n{background:#ede9fe}.fcard b{display:inline-block;padding:.1rem .5rem;border-radius:6px;color:#fff}.fcard.fc-v{border-color:#2563eb}.fcard.fc-l,.fcard.fc-r{border-color:#dc2626}.fcard.fc-m{border-color:#16a34a}.fcard.fc-n{border-color:#7c3aed}.fmblank td{height:3.2rem}'+
 '.fmw{display:grid;gap:.7rem}.fmsent{font-size:1.15rem}.fmpool{display:flex;flex-wrap:wrap;gap:.5rem;min-height:3rem;padding:.6rem;border:2px dashed var(--line2);border-radius:12px}.fmgrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.4rem}.fmcell{border-radius:12px;min-height:7rem;border:2px solid transparent;cursor:pointer}.fmcell.fc-v{border-color:#2563eb}.fmcell.fc-l,.fmcell.fc-r{border-color:#dc2626}.fmcell.fc-m{border-color:#16a34a}.fmcell.fc-n{border-color:#7c3aed}.fmh{padding:.35rem .3rem;font-weight:700;font-size:.8rem;text-align:center;border-radius:9px 9px 0 0}.fmbody{display:flex;flex-direction:column;gap:.3rem;padding:.4rem}.fmchip{min-height:44px;border:2px solid #4f46e5;background:#eef2ff;color:#312e81;border-radius:10px;padding:.35rem .6rem;font-size:1rem;font-weight:700;cursor:pointer}.fmchip.sel{background:#4f46e5;color:#fff}.fmchip.ok{border-color:#16a34a;background:#dcfce7;color:#14532d}.fmchip.err{border-color:#dc2626;background:#fee2e2;color:#7f1d1d}@media (max-width:760px){.fmgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.fmt th,.fmt td{font-size:.8rem;padding:.3rem}}';

const UEM={'klammer':{types:'probe',cats:'fm2'},'vorfeld':{types:'probe',cats:'fm3'},'felder':{types:'probe',cats:'fm1'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
GT.chapter({id:'feld',teil:'satz',nr:6,title:'Das Feldermodell und die Satzklammer',big:'Vorfeld | Klammer | Mittelfeld | Klammer',desc:'Sätze ins Feldermodell übertragen: Vorfeld, Satzklammer, Mittelfeld, Nachfeld',
 ex:'«Gestern | hat | Anna ihr Handy | verloren.»',
 goals:['Ich nenne die fünf Felder des Feldermodells in der richtigen Reihenfolge.','Ich finde die Personalform und setze sie in die linke Satzklammer.','Ich erkenne zweiteilige Verben und setze den zweiten Teil in die rechte Klammer.','Ich bestimme mit der Verschiebeprobe das Vorfeld: genau ein Satzglied.','Ich übertrage einen Satz in das Feldermodell und trenne die Satzglieder.','Ich schreibe die Fachbegriffe richtig.'],
 liveCats:['fm1','fm2','fm3'],css,widgets,
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{probe:{label:'Felder und Klammer bestimmen',short:'Das richtige Feld wählen',instr:'Wähle die richtige Antwort.',hint:'Reihenfolge: Vorfeld, linke Klammer, Mittelfeld, rechte Klammer, Nachfeld.',ref:'idee'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
