/* Kapitel Wortlehre 7: Partikel (Adverb, Präposition, Konjunktion). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Präpositionen',sg2:'Konjunktionen',sg3:'Adverbien',sg4:'Partikelarten erkennen'};
const task=[];
const gap=s=>s.replace('___','<span class="gap">_____</span>');

/* Präpositionen: Fall und Wahl */
const P=[
['Ich gehe ___ die Schule.','in',['von','mit','aus'],1,'«in die Schule» (Wohin? Akkusativ).'],
['Das Buch liegt ___ dem Tisch.','auf',['durch','mit','für'],1,'«auf dem Tisch» (Wo? Dativ).'],
['Wir fahren ___ dem Bus.','mit',['durch','für','ohne'],1,'«mit dem Bus»: mit + Dativ.'],
['Sie wartet ___ ihren Freund.','auf',['mit','von','zu'],2,'«warten auf» + Akkusativ.'],
['Ich komme ___ Hause.','nach',['mit','für','von'],1,'«nach Hause» (Richtung zum Zuhause).'],
['Er geht ___ Arzt.','zum',['nach','im','ins'],1,'«zum Arzt» = zu dem Arzt.'],
['Wir spielen ___ Garten.','im',['zum','vom','ans'],1,'«im Garten» = in dem Garten.'],
['Das Geschenk ist ___ dich.','für',['mit','von','zu'],1,'«für dich»: für + Akkusativ.'],
['Er kommt ___ Schule.','von der',['mit der','in der','aus die'],2,'«von der Schule» (Woher? Dativ).'],
['Wir gehen ___ den Park.','durch',['mit','von','nach'],2,'«durch den Park»: durch + Akkusativ.'],
['Sie schreibt ___ Bleistift.','mit',['von','durch','für'],1,'«mit einem Bleistift»: mit + Dativ.'],
['Ich warte ___ dem Bahnhof.','vor',['mit','für','durch'],2,'«vor dem Bahnhof» (Wo? Dativ).'],
['___ des Regens bleiben wir zu Hause.','Wegen',['Mit','Für','Nach'],3,'«wegen» verlangt den Genitiv: wegen des Regens.'],
['___ des Winters tragen wir Jacken.','Während',['Mit','Zu','Von'],3,'«während» + Genitiv.'],
['Er ist ___ dem Zug gestiegen.','aus',['durch','für','ohne'],2,'«aus dem Zug» (Woher? Dativ).']
];
P.forEach(p=>task.push({typ:'praep',stufe:p[3],lv:p[3]===3?2:1,cats:['sg1'],sent:gap(p[0]),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> '+p[4]}));

/* Konjunktionen */
const K=[
['Ich bleibe zu Hause, ___ ich krank bin.','weil',['dass','damit','aber'],1,'«weil» gibt einen Grund an.'],
['Wir gehen ohne Jacke hinaus, ___ es kalt ist.','obwohl',['weil','damit','denn'],2,'«obwohl» zeigt einen Gegensatz.'],
['Er spielt Fussball ___ sie liest.','und',['sondern','dass','ob'],1,'«und» verbindet.'],
['Ich möchte kommen, ___ ich habe keine Zeit.','aber',['dass','obwohl','damit'],1,'«aber» zeigt einen Gegensatz.'],
['Willst du Tee ___ Kaffee?','oder',['dass','weil','damit'],1,'«oder» zeigt eine Wahl.'],
['Ich weiss, ___ er kommt.','dass',['das','weil','aber'],1,'«dass» leitet einen Inhaltssatz ein.'],
['Wir üben, ___ wir die Prüfung bestehen.','damit',['obwohl','weil','aber'],2,'«damit» nennt einen Zweck.'],
['___ er müde war, ging er noch aus.','Obwohl',['Weil','Damit','Denn'],2,'«obwohl» zeigt einen Gegensatz.'],
['___ ich gegessen hatte, ging ich spazieren.','Nachdem',['Damit','Dass','Ob'],2,'«nachdem» beschreibt, was vorher geschah.'],
['Ich lerne, ___ ich bessere Noten möchte.','weil',['obwohl','aber','oder'],1,'«weil» gibt den Grund an.'],
['Ich komme, ___ du mich einlädst.','wenn',['dass','obwohl','damit'],2,'«wenn» nennt eine Bedingung.'],
['Er ist müde, ___ er hat wenig geschlafen.','denn',['weil','dass','obwohl'],3,'«denn» verbindet zwei Hauptsätze (Verb bleibt an zweiter Stelle).'],
['Entweder bleibst du hier, ___ du kommst mit.','oder',['und','aber','weil'],2,'«entweder … oder».'],
['Sowohl Anna ___ Tim kommen mit.','als auch',['oder auch','und auch','aber auch'],3,'«sowohl … als auch».']
];
K.forEach(k=>task.push({typ:'konj',stufe:k[3],lv:k[3]===3?2:1,cats:['sg2'],sent:gap(k[0]),opts:[k[1]].concat(k[2]),answer:k[1],why:'<b>'+k[1]+'.</b> '+k[4]}));

/* Adverbien */
const A=[
['Welche Frage beantwortet «gestern»?',['Wann?','Wo?','Wie?','Warum?'],'Wann?','Temporaladverb: gestern, heute, morgen, bald, oft.',1],
['Welche Frage beantwortet «dort»?',['Wo?','Wann?','Wie?','Warum?'],'Wo?','Lokaladverb: hier, dort, oben, unten, draussen.',1],
['Welche Frage beantwortet «gern»?',['Wie?','Wann?','Wo?','Warum?'],'Wie?','Modaladverb: gern, so, leider, vielleicht.',1],
['Welche Frage beantwortet «deshalb»?',['Warum?','Wann?','Wo?','Wohin?'],'Warum?','Kausaladverb: deshalb, darum, deswegen.',2],
['Welches Wort ist ein <b>Temporaladverb</b>?',['heute','dort','gern','deshalb'],'heute','Temporaladverbien antworten auf «Wann?».',1],
['Welches Wort ist ein <b>Lokaladverb</b>?',['hier','heute','gern','deshalb'],'hier','Lokaladverbien antworten auf «Wo?».',1],
['Welches Wort ist ein <b>Modaladverb</b>?',['leider','gestern','oben','darum'],'leider','Modaladverbien antworten auf «Wie?».',2],
['Welches Wort ist ein <b>Kausaladverb</b>?',['deswegen','morgen','draussen','schnell'],'deswegen','Kausaladverbien antworten auf «Warum?».',2],
['Welches Wort ist ein Adverb?',['oft','Hund','schreiben','schön'],'oft','Adverbien bekommen keine Endungen und stehen nicht vor einem Nomen.',1],
['Was gilt für Adverbien?',['Sie bekommen keine Endungen.','Sie werden dekliniert.','Sie werden gross geschrieben.','Sie haben einen Artikel.'],'Sie bekommen keine Endungen.','Adverbien bleiben gleich: hier, heute, dort.',1],
['Welches Wort ist ein Adverb?',['draussen','Garten','spielen','kalt'],'draussen','Lokaladverb: Wo? draussen.',1],
['Welche Frage beantwortet «hinauf»?',['Wohin?','Woher?','Wo?','Wann?'],'Wohin?','Direktionaladverb: hinauf, hinunter, hinaus.',3]
];
A.forEach(a=>task.push({typ:'adverb',stufe:a[4],lv:a[4]===3?2:1,cats:['sg3'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

/* Partikelart bestimmen */
const Z=['Adverb','Präposition','Konjunktion'];
const Q=[
['Wir spielen <b>draussen</b>.',0,1,'«draussen» sagt, wo: Adverb.'],
['Ich gehe <b>in</b> die Schule.',1,1,'«in» steht vor einem Nomen: Präposition.'],
['Ich komme, <b>weil</b> ich Zeit habe.',2,1,'«weil» verbindet Sätze: Konjunktion.'],
['Er kommt <b>heute</b>.',0,1,'«heute» sagt, wann: Adverb.'],
['Sie wohnt <b>bei</b> ihrer Oma.',1,1,'«bei» + Nomen: Präposition.'],
['Anna <b>und</b> Tim spielen.',2,1,'«und» verbindet: Konjunktion.'],
['Das Buch liegt <b>auf</b> dem Tisch.',1,1,'«auf» + dem Tisch: Präposition.'],
['Wir fahren <b>mit</b> dem Zug.',1,2,'«mit» + Dativ: Präposition.'],
['Ich gehe nach Hause, <b>denn</b> ich bin müde.',2,2,'«denn» verbindet zwei Hauptsätze: Konjunktion.'],
['Er singt <b>gern</b>.',0,2,'«gern» sagt, wie: Adverb.'],
['<b>Obwohl</b> es regnet, gehen wir hinaus.',2,2,'«obwohl» leitet einen Nebensatz ein: Konjunktion.'],
['Sie hat <b>leider</b> keine Zeit.',0,2,'«leider» ist ein Modaladverb.'],
['Er bleibt <b>wegen</b> des Regens zu Hause.',1,3,'«wegen» + Genitiv: Präposition.'],
['Sie ist müde, <b>deshalb</b> geht sie früh ins Bett.',0,3,'«deshalb» ist ein Kausaladverb: Es steht im Satz und kann verschoben werden.']
];
Q.forEach(q=>task.push({typ:'art',stufe:q[2],lv:q[2]===3?2:1,cats:['sg4'],sent:q[0],opts:Z,answer:Z[q[1]],why:'<b>'+Z[q[1]]+'.</b> '+q[3]}));

/* Markieren */
const M=[
['Ich gehe *in die Schule *und Tim bleibt *zu Hause.',1,'Partikel: in, und, zu.'],
['Wir spielen *draussen *und singen *gern.',1,'Partikel: draussen, und, gern.'],
['*Obwohl es regnet, gehen wir *ohne Jacke *hinaus.',2,'Partikel: Obwohl, ohne, hinaus.'],
['Er kommt *heute *mit dem Zug, *denn sein Auto ist kaputt.',2,'Partikel: heute, mit, denn.'],
['*Wegen des Regens bleiben wir *drinnen, *aber *vielleicht kommen wir *später.',3,'Partikel: Wegen, drinnen, aber, vielleicht, später.']
];
M.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Partikel an (Präpositionen, Konjunktionen, Adverbien).',why:m[2]});
});


/* Wortart im Text erkennen */
const TX=[
["Der Hund liegt *unter dem Tisch.",1,"unter ist eine Präposition."],
["Wir bleiben *heute *zu Hause, *weil es regnet.",2,"heute (Adverb), zu (Präposition), weil (Konjunktion)."],
["Tim spielt *gern Fussball, *und Lena liest *oft *in ihrem Zimmer.",2,"gern, oft (Adverbien), und (Konjunktion), in (Präposition)."],
["*Gestern war ich *mit meiner Familie *draussen, *aber es war kalt.",3,"Gestern, draussen (Adverbien), mit (Präposition), aber (Konjunktion)."],
["Er lernt *heute, *denn er schreibt *morgen eine Prüfung.",3,"heute, morgen (Adverbien), denn (Konjunktion)."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens,targets,instr:'Tippe alle Partikel im Text an.',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "oben ↔ ___", "unten", [], false, "Gegenteil des Adverbs «oben»: «unten»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "drinnen ↔ ___", "draussen", [], false, "Gegenteil des Adverbs «drinnen»: «draussen»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "vorne ↔ ___", "hinten", [], false, "Gegenteil des Adverbs «vorne»: «hinten»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "links ↔ ___", "rechts", [], false, "Gegenteil des Adverbs «links»: «rechts»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "hier ↔ ___", "dort", ["da"], false, "Gegenteil des Adverbs «hier»: «dort»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "immer ↔ ___", "nie", ["niemals"], false, "Gegenteil des Adverbs «immer»: «nie»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "gestern ↔ ___", "morgen", [], false, "Gegenteil des Adverbs «gestern»: «morgen»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "vorher ↔ ___", "nachher", ["danach"], false, "Gegenteil des Adverbs «vorher»: «nachher»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'merkmale',title:'Was sind Partikel?',short:'Merkmale',min:6,note:'Partikel = unveränderliche Wörter. Veränderungsprobe: Kann man das Wort konjugieren oder deklinieren? Wenn nein: Partikel.',
 html:()=>'<div class="grid2"><div class="card"><h3>Partikel verändern sich nicht</h3><p>Sie haben keine Endungen und keine Zeitformen: <b>und, in, heute, aber, dort</b>.</p></div>'+
 '<div class="card"><h3>Drei Arten</h3><p><b>Präpositionen:</b> in, auf, mit, für</p><p><b>Konjunktionen:</b> und, aber, weil, dass</p><p><b>Adverbien:</b> heute, hier, dort, gern</p></div></div>'+
 '<div class="callout"><b>Probe:</b> Kann man das Wort beugen (Endungen) oder mit einem Artikel verbinden? Wenn nicht, ist es ein Partikel. Wenige Adverbien lassen sich steigern (gern – lieber, oft – öfter), bleiben aber Partikel.</div>'},
{id:'praep',title:'Präpositionen',short:'Präpositionen',min:12,note:'Präpositionen verlangen einen Fall. Wechselpräpositionen (an, auf, in, über, unter, vor, hinter, neben, zwischen): Wo? → Dativ. Wohin? → Akkusativ.',
 html:()=>'<p class="lead">Präpositionen stehen vor einem Nomen und zeigen Ort, Zeit, Weg oder Grund.</p>'+
 T(['Fall','Beispiele','Merkhilfe'],[['Akkusativ','durch, für, gegen, ohne, um','«durch den Park»'],['Dativ','aus, bei, mit, nach, seit, von, zu','«mit dem Bus»'],['Genitiv (nur Niveau A)','wegen, während, trotz','«wegen des Regens»'],['Wechsel: Wo? Dativ · Wohin? Akkusativ','an, auf, in, über, unter, vor, hinter, neben, zwischen','«im Haus» / «ins Haus»']])+
 '<div class="callout">Kurzformen: im = in dem, zum = zu dem, vom = von dem, beim = bei dem, ins = in das.</div>'},
{id:'konj',title:'Konjunktionen',short:'Konjunktionen',min:10,note:'Konjunktionen verbinden Wörter und Sätze. Unterscheidung nebenordnend (und, aber, oder, denn) und unterordnend (weil, dass, obwohl, damit, wenn, nachdem) kommt bei Haupt- und Nebensatz.',
 html:()=>'<div class="grid2"><div class="card"><h3>Verbinden</h3><p><b>und</b> (Aufzählung) · <b>oder</b> (Wahl) · <b>aber</b> (Gegensatz) · <b>denn</b> (Grund)</p></div>'+
 '<div class="card"><h3>Nebensatz einleiten</h3><p><b>weil</b> (Grund) · <b>obwohl</b> (Gegensatz) · <b>damit</b> (Zweck) · <b>dass</b> (Inhalt) · <b>wenn</b> (Bedingung) · <b>nachdem</b> (Zeit)</p></div></div>'+
 '<div class="callout">Nach «weil, obwohl, dass …» steht das Verb am <b>Satzende</b>: «Ich bleibe, weil ich krank <b>bin</b>.»</div>'},
{id:'adverb',title:'Adverbien',short:'Adverbien',min:10,note:'Adverbien beantworten Fragen: Wann? Wo? Wie? Warum? Wohin? Sie bekommen keine Endungen.',
 html:()=>T(['Art','Frage','Beispiele'],[['Temporal','Wann? Wie oft?','gestern, heute, bald, oft, nie, immer'],['Lokal','Wo? Wohin? Woher?','hier, dort, oben, draussen, links'],['Modal','Wie?','gern, leider, vielleicht, so, sehr'],['Kausal','Warum?','deshalb, darum, deswegen, trotzdem']])+
 '<div class="callout">Adverbien bekommen keine Endungen. Sie bestimmen das Verb, ein Adjektiv oder den ganzen Satz näher.</div>'},
{id:'abgrenzung',title:'Adjektiv oder Adverb?',short:'Abgrenzung',lv:2,min:8,note:'Ab Niveau B. Adjektiv: steigerbar und mit Endung vor dem Nomen. Adverb: unveränderlich.',
 html:()=>'<div class="grid2"><div class="card"><h3>Adjektiv</h3><p>Das <b>schnelle</b> Auto. (vor dem Nomen, mit Endung)</p><p>Das Auto ist <b>schnell</b>. (nach «sein»)</p><p>Er rennt <b>schnell</b>. (beim Verb, bleibt unverändert)</p></div>'+
 '<div class="card"><h3>Adverb</h3><p>Er kommt <b>heute</b>. (keine Endung)</p><p>Sie wohnt <b>dort</b>. (nicht steigerbar)</p></div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Verwechslungen: das/dass, seit/seid, wieder/wider.',
 html:()=>'<div class="grid3">'+[
  ['1 · Präposition oder Adverb?','«Das Buch liegt <b>auf</b> dem Tisch.» (Präposition)<br>«Mach die Tür <b>auf</b>.» (Vorsilbe/Adverb)','Eine Präposition braucht ein Nomen danach.'],
  ['2 · das oder dass?','«Ich weiss, <b>dass</b> er kommt.»','dass: leitet einen Nebensatz ein. Probe: dieses/welches → das.'],
  ['3 · seit oder seid?','«<b>Seit</b> gestern regnet es.» / «Ihr <b>seid</b> müde.»','seit = Präposition, seid = Verb (sein).'],
  ['4 · Verb am Ende','«Ich gehe, weil ich müde <b>bin</b>.»','Nach weil, obwohl, dass … steht das Verb am Ende.'],
  ['5 · Fall nach der Präposition','«mit <b>dem</b> Bus», «für <b>den</b> Bus»','Dativ nach mit, Akkusativ nach für.'],
  ['6 · Kurzformen','«im, zum, vom, beim»','im = in dem. Nicht «in dem» schreiben, wenn es gleich klingt.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('praep,konj,art')}
];
const EX=[
 ['Setze eine Präposition ein: Ich fahre ___ dem Bus ___ Schule.','mit … zur',1],
 ['Welcher Fall folgt auf «mit»?','Dativ: mit dem Bus.',1],
 ['Setze eine Konjunktion ein: Ich bleibe zu Hause, ___ ich krank bin.','weil',1],
 ['Verbinde mit «obwohl»: Es regnet. Wir gehen hinaus.','Obwohl es regnet, gehen wir hinaus.',1],
 ['Unterstreiche alle Partikel: «Heute gehe ich mit dir ins Kino, denn ich habe Zeit.»','Heute · mit · ins · denn',1],
 ['Ordne zu: oft, in, aber, hier, für.','Adverb: oft, hier · Präposition: in, für · Konjunktion: aber',2],
 ['Wie lauten die Kurzformen? in dem, zu dem, von dem, bei dem','im · zum · vom · beim',2],
 ['Schreibe einen Satz mit «wegen» (Genitiv).','Wegen des Regens bleiben wir hier.',2]
];
const merk=()=>T(['Art','Beispiele','Merksatz'],[['Partikel','und, in, heute, aber','Sie verändern sich nicht.'],['Präposition','in, auf, mit, für, wegen','Steht vor einem Nomen und verlangt einen Fall.'],['Konjunktion','und, aber, weil, dass, obwohl','Verbindet Wörter und Sätze. Nach weil, dass, obwohl steht das Verb am Ende.'],['Adverb','heute, hier, gern, deshalb','Beantwortet Wann? Wo? Wie? Warum?']])+
 T(['Fall','Präpositionen'],[['Akkusativ','durch, für, gegen, ohne, um'],['Dativ','aus, bei, mit, nach, seit, von, zu'],['Genitiv','wegen, während, trotz'],['Wechsel (Wo? Dat. · Wohin? Akk.)','an, auf, in, über, unter, vor, hinter, neben, zwischen']]);
const UEM={'praep':{types:'praep',cats:'sg1'},'konj':{types:'konj',cats:'sg2'},'adverb':{types:'adverb',cats:'sg3'},'abgrenzung':{types:'art',cats:'sg4'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
GT.chapter({id:'partikel',teil:'wort',nr:7,title:'Partikel',big:'Und, in, heute, aber',desc:'Präpositionen, Konjunktionen und Adverbien',
 ex:'«'+mk('part','Heute')+' gehe ich '+mk('part','mit')+' dir ins Kino, '+mk('part','denn')+' ich habe Zeit.»',
 goals:['Ich erkenne unveränderliche Wörter (Partikel).','Ich wähle die richtige Präposition und den richtigen Fall.','Ich verbinde Sätze mit Konjunktionen.','Ich erkenne Adverbien und bestimme sie mit Fragen.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{praep:{label:'Präposition einsetzen',short:'in, auf, mit, für, wegen',instr:'Welche Präposition passt?',hint:'Wo? Wohin? Womit? Wegen wem oder was?',ref:'praep'},
  konj:{label:'Konjunktion einsetzen',short:'und, aber, weil, obwohl',instr:'Welche Konjunktion passt?',hint:'Grund (weil), Gegensatz (obwohl, aber), Zweck (damit), Bedingung (wenn).',ref:'konj'},
  adverb:{label:'Adverbien',short:'Wann? Wo? Wie? Warum?',instr:'Wähle die richtige Antwort.',hint:'Stelle die passende Frage.',ref:'adverb'},
  art:{label:'Partikelart bestimmen',short:'Adverb, Präposition oder Konjunktion',instr:'Welche Partikelart ist das markierte Wort?',hint:'Vor einem Nomen: Präposition. Verbindet Sätze: Konjunktion. Beantwortet Wann/Wo/Wie: Adverb.',ref:'merkmale'},
  text:{icon:'🔍',label:'Partikel im Text',short:'Alle Partikel in einem Text finden',instr:'Tippe alle Partikel im Text an.',hint:'Partikel verändern sich nicht.',ref:'merkmale'},
  adverbgeg:{icon:'↔️',label:'Adverbien: Gegenteile',short:'Adverbien mit gegenteiliger Bedeutung',instr:'Schreibe das Gegenteil.',hint:'Adverbien nennen Ort, Zeit oder Art. Welches Wort passt als Gegensatz?',ref:'adverb'},
  markieren:{label:'Partikel markieren',short:'Alle Partikel finden',instr:'Tippe alle Partikel an.',hint:'Partikel verändern sich nicht.',ref:'merkmale'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
