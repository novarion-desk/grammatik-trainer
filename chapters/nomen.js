/* Kapitel Wortlehre 2: Nomen. Registriert sich beim Trainer (GT). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,lv=GT.lv,tryW=GT.tryW,reveal=GT.reveal,T=GT.table;
const C={sg1:'Artikel und Geschlecht',sg2:'Mehrzahl',sg3:'Gross- und Kleinschreibung',sg4:'Nomenarten'};
const task=[];
const hl=s=>'<span class="hl">'+s+'</span>';

/* Artikel und Geschlecht: [Nomen, Artikel, Stufe, Hinweis] */
const G=[
['Hund','der',1],['Katze','die',1],['Kind','das',1],['Baum','der',1],['Blume','die',1],['Haus','das',1],['Tisch','der',1],['Lampe','die',1],['Buch','das',1],['Stuhl','der',1],['Schule','die',1],['Auto','das',1],['Lehrer','der',1],['Lehrerin','die',1,'Die Endung -in zeigt weibliche Personen: immer «die».'],
['Mädchen','das',2,'Die Endung -chen macht Nomen sächlich: das Mädchen, das Häuschen.'],['Kätzchen','das',2,'Die Endung -chen macht Nomen sächlich.'],['Wohnung','die',2,'Die Endung -ung ist immer weiblich: die Wohnung, die Zeitung.'],['Zeitung','die',2,'Die Endung -ung ist immer weiblich.'],['Freiheit','die',2,'Die Endung -heit ist immer weiblich.'],['Schwierigkeit','die',2,'Die Endung -keit ist immer weiblich.'],['Freundschaft','die',2,'Die Endung -schaft ist immer weiblich.'],['Ergebnis','das',2,'Die Endung -nis ist meist sächlich: das Ergebnis, das Erlebnis.'],
['Computer','der',2],['Handy','das',2],['Tastatur','die',2,'Die Endung -ur ist meist weiblich: die Tastatur, die Natur.'],['Sofa','das',2],['Löffel','der',2],['Gabel','die',2],['Messer','das',2],['Banane','die',2],['Salat','der',2],['Milch','die',2],['Wasser','das',2],['Brot','das',2],['Sommer','der',2,'Jahreszeiten sind männlich: der Frühling, der Sommer, der Herbst, der Winter.'],['Sonne','die',2],['Mond','der',2],['Wetter','das',2],['Fenster','das',2],['Tür','die',2],['Zimmer','das',2],['Garten','der',2],
['Meer','das',3],['Mut','der',3],['Angst','die',3],['Glück','das',3],['Gewissen','das',3],['Ziel','das',3],['Zweifel','der',3],['Liebe','die',3],['Ende','das',3],['Gedanke','der',3]
];
G.forEach(g=>task.push({typ:'artikel',stufe:g[2],lv:g[2]===3?2:1,cats:['sg1'],sent:'<span class="hl">___ '+g[0]+'</span>',opts:['der','die','das'],answer:g[1],
  why:'<b>'+g[1]+' '+g[0]+'.</b> '+(g[3]||'Das Geschlecht lernst du am besten mit dem Artikel zusammen.')}));

/* Mehrzahl: [Einzahl, Mehrzahl, falsche Formen, Stufe, Hinweis] */
const P=[
['Hund','Hunde',['Hunds','Hunden','Hunder'],1,'Endung -e.'],['Katze','Katzen',['Katzes','Katze','Katzer'],1,'Endung -n oder -en.'],['Kind','Kinder',['Kinde','Kinden','Kinds'],1,'Endung -er.'],['Auto','Autos',['Autoe','Autoen','Autoer'],1,'Fremdwörter bekommen oft -s.'],['Blume','Blumen',['Blumes','Blumer','Blume'],1,'Endung -n.'],['Tag','Tage',['Tagen','Täge','Tager'],1,'Endung -e.'],['Frau','Frauen',['Fraue','Fräue','Frauer'],1,'Endung -en.'],
['Haus','Häuser',['Hause','Hausen','Hauser'],2,'Endung -er mit Umlaut.'],['Baum','Bäume',['Baume','Baumen','Bäumer'],2,'Umlaut und -e.'],['Buch','Bücher',['Buche','Buchen','Büche'],2,'Umlaut und -er.'],['Apfel','Äpfel',['Apfels','Apfeln','Apfele'],2,'Nur Umlaut, keine Endung.'],['Stadt','Städte',['Stadte','Städten','Städter'],2,'Umlaut und -e.'],['Mutter','Mütter',['Mutter','Muttern','Mütters'],2,'Nur Umlaut.'],['Lehrer','Lehrer',['Lehrers','Lehrern','Lehrere'],2,'Nomen auf -er bleiben in der Mehrzahl gleich.'],['Mädchen','Mädchen',['Mädchens','Mädchenen','Mädchener'],2,'Nomen auf -chen bleiben gleich.'],['Computer','Computer',['Computers','Computeren','Computere'],2,'Nomen auf -er bleiben gleich.'],['Handy','Handys',['Handyen','Handyer','Handye'],2,'Fremdwörter bekommen oft -s.'],['Zahl','Zahlen',['Zahle','Zähle','Zahler'],2,'Endung -en.'],['Mann','Männer',['Manne','Männen','Männe'],2,'Umlaut und -er.'],['Fuss','Füsse',['Fusse','Fussen','Füssen'],2,'Umlaut und -e.'],['Vogel','Vögel',['Vogels','Vogeln','Vögeler'],2,'Nur Umlaut.'],['Kuh','Kühe',['Kuhe','Kuhen','Kühen'],2,'Umlaut und -e.'],['Hand','Hände',['Hande','Händen','Händer'],2,'Umlaut und -e.'],
['Museum','Museen',['Museums','Museume','Museumen'],3,'Fremdwort auf -um: Museen.'],['Thema','Themen',['Themas','Thema','Themaen'],3,'Fremdwort auf -a: Themen.'],['Bus','Busse',['Buse','Busen','Buss'],3,'Endung -se.'],['Herz','Herzen',['Herze','Herzer','Herzes'],3,'Endung -en.'],['Auge','Augen',['Auge','Auger','Auges'],3,'Endung -n.'],['Junge','Jungen',['Junge','Junger','Jungel'],3,'Endung -n.'],['Praktikum','Praktika',['Praktikums','Praktikume','Praktikumen'],3,'Fremdwort auf -um: oft Mehrzahl auf -a.']
];
P.forEach(p=>{
  const opts=[p[1]].concat(p[2]);
  task.push({typ:'mehrzahl',stufe:p[3],lv:p[3]===3?2:1,cats:['sg2'],prompt:'Wie lautet die Mehrzahl von <b>'+p[0]+'</b>?',opts:opts,answer:p[1],why:'Einzahl «'+p[0]+'», Mehrzahl <b>«'+p[1]+'»</b>. '+p[4]});
});

/* Gross oder klein */
const S=[
['Das ___ macht mir Spass.','Lesen','lesen','Mit dem Artikel «das» wird das Verb zum Nomen.',1],
['Das ist ein ___ Problem.','grosses','Grosses','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Das ___ Wetter gefällt mir.','schöne','Schöne','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Ich esse ___ Brot.','frisches','Frisches','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Im ___ blühen die Blumen.','Frühling','frühling','Frühling ist ein Nomen. «im» = in dem.',1],
['Beim ___ vergisst sie alles.','Singen','singen','«beim» = bei dem. Das Verb wird zum Nomen.',2],
['Zum ___ braucht man Geduld.','Lernen','lernen','«zum» = zu dem. Das Verb wird zum Nomen.',2],
['Ich freue mich auf das ___.','Wiedersehen','wiedersehen','Nach dem Artikel «das» wird das Verb zum Nomen.',2],
['Wir gehen morgen ___.','schwimmen','Schwimmen','Nach «gehen» steht ein Verb. Es hat keinen Artikel.',2],
['Wir wollen heute ___ gehen.','wandern','Wandern','Hier ist «wandern» ein Verb. Es hat keinen Artikel.',2],
['Ich habe etwas ___ gekauft.','Neues','neues','Nach «etwas» wird das Adjektiv zum Nomen.',2],
['Er wünscht dir alles ___.','Gute','gute','Nach «alles» wird das Adjektiv zum Nomen.',2],
['Sie hat nichts ___ gesehen.','Besonderes','besonderes','Nach «nichts» wird das Adjektiv zum Nomen.',2],
['Das ___ der Kinder war laut.','Lachen','lachen','Nach dem Artikel «das» wird das Verb zum Nomen.',2],
['Sie ist im ___ am besten.','Rechnen','rechnen','«im» = in dem. Das Verb wird zum Nomen.',2],
['Er hat viel ___ gelernt.','Neues','neues','Nach «viel» wird das Adjektiv zum Nomen.',3],
['Das ___ der Zeitung ist spannend.','Lesen','lesen','Nach dem Artikel «das» wird das Verb zum Nomen.',3]
];
S.forEach(s=>{
  const opts=[s[1],s[2]];
  task.push({typ:'gross',stufe:s[4],lv:s[4]===3?2:1,cats:['sg3'],sent:s[0].replace('___','<span class="gap">_____</span>'),opts,answer:s[1],why:'<b>'+s[1]+'.</b> '+s[3]});
});

/* Wissen */
const Z=[
['Wie heisst die Einzahl in der Fachsprache?',['Singular','Plural','Genus','Kasus'],'Singular','Singular heisst Einzahl.','sg2'],
['Wie heisst die Mehrzahl in der Fachsprache?',['Plural','Singular','Genus','Kasus'],'Plural','Plural heisst Mehrzahl.','sg2'],
['Wie heisst das Geschlecht von «der Hund»?',['männlich (Maskulinum)','weiblich (Femininum)','sächlich (Neutrum)','Mehrzahl'],'männlich (Maskulinum)','Mit «der» ist ein Nomen männlich.','sg1'],
['Wie heisst das Geschlecht von «die Katze»?',['weiblich (Femininum)','männlich (Maskulinum)','sächlich (Neutrum)','Mehrzahl'],'weiblich (Femininum)','Mit «die» (Einzahl) ist ein Nomen weiblich.','sg1'],
['Wie heisst das Geschlecht von «das Kind»?',['sächlich (Neutrum)','männlich (Maskulinum)','weiblich (Femininum)','Mehrzahl'],'sächlich (Neutrum)','Mit «das» ist ein Nomen sächlich.','sg1'],
['Welches Wort ist ein <b>Eigenname</b>?',['Anna','Mädchen','Stadt','Lehrerin'],'Anna','Eigennamen bezeichnen ein einziges Lebewesen oder einen Ort mit Namen: Anna, Zürich, Rhein.','sg4'],
['Welches Wort ist ein <b>Eigenname</b>?',['Zürich','Stadt','Dorf','Fluss'],'Zürich','Eigennamen sind Namen von Personen, Orten, Ländern und Flüssen.','sg4'],
['Welches Nomen ist ein <b>Abstraktum</b> (man kann es nicht anfassen)?',['Mut','Tisch','Hund','Apfel'],'Mut','Abstrakta sind Gedanken, Gefühle und Eigenschaften: Mut, Freude, Angst.','sg4'],
['Welches Nomen ist ein <b>Abstraktum</b>?',['Freude','Haus','Katze','Buch'],'Freude','Gefühle sind Abstrakta.','sg4'],
['Welches Nomen ist ein <b>Konkretum</b> (man kann es anfassen)?',['Haus','Freude','Angst','Mut'],'Haus','Konkreta sind Lebewesen und Dinge: Haus, Hund, Tisch.','sg4'],
['Welches Nomen ist ein <b>Konkretum</b>?',['Löffel','Liebe','Glück','Zweifel'],'Löffel','Dinge, die man anfassen kann, sind Konkreta.','sg4'],
['Welchen Artikel hat «Schulhaus»?',['das','die','der','kein'],'das','Der Artikel kommt vom letzten Wort (Grundwort): das Haus, also das Schulhaus.','sg1'],
['Welchen Artikel hat «Handtasche»?',['die','der','das','kein'],'die','Das letzte Wort entscheidet: die Tasche, also die Handtasche.','sg1'],
['Welchen Artikel hat «Gartentisch»?',['der','die','das','kein'],'der','Das letzte Wort entscheidet: der Tisch, also der Gartentisch.','sg1'],
['Welches Wort bestimmt den Artikel eines zusammengesetzten Nomens?',['das letzte Wort (Grundwort)','das erste Wort','beide Wörter','keines'],'das letzte Wort (Grundwort)','Bei Zusammensetzungen gilt der Artikel des letzten Wortes.','sg1']
];
Z.forEach(z=>task.push({typ:'wissen',stufe:1,cats:[z[4]],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));

/* Markieren */
const M=[
['Der *Hund jagt die *Katze im *Garten.',1,'Nomen: Hund, Katze, Garten.'],
['Meine *Schwester kauft *Brot und *Milch.',1,'Nomen: Schwester, Brot, Milch.'],
['Die *Freude über das *Geschenk war gross.',2,'Nomen: Freude (Gefühl), Geschenk.'],
['Beim *Singen vergisst *Mia ihre *Sorgen.',2,'Nomen: Singen (nominalisiert, Artikel in «beim»), Mia (Eigenname), Sorgen.'],
['Wir wünschen dir *Glück und alles *Gute für den *Neuanfang.',3,'Nomen: Glück, Gute (nominalisiert nach «alles»), Neuanfang.'],
['Der *Lärm im *Zimmer störte das *Lesen.',3,'Nomen: Lärm, Zimmer, Lesen (nominalisiert, Artikel «das»).']
];
M.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Nomen an (auch nominalisierte).',why:m[2]});
});


/* Wortart im Text erkennen */
const TX=[
["Der *Hund spielt mit dem *Ball im *Garten.",1,"Nomen: Hund, Ball, Garten."],
["Meine *Schwester liest ein *Buch über *Pferde.",1,"Nomen: Schwester, Buch, Pferde."],
["Am *Montag kauft die *Lehrerin frisches *Brot in der *Stadt.",2,"Nomen: Montag, Lehrerin, Brot, Stadt. «frisches» ist ein Adjektiv."],
["Das *Lachen der *Kinder macht den *Tag schöner.",2,"«Das Lachen» ist ein nominalisiertes Verb. Dazu Kinder und Tag."],
["Beim *Schwimmen hat *Tim viel *Spass und trifft seine *Freunde.",3,"Schwimmen (nominalisiert), Tim (Name), Spass, Freunde."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Nomen im Text an (auch nominalisierte).',why:m[2]});
});

/* ---------- Theorie ---------- */
const SECS=[
{id:'merkmale',title:'Was ist ein Nomen?',short:'Merkmale',min:6,note:'An die Wortarten anknüpfen: Nomen sind Namenwörter. Beispiele aus dem Klassenzimmer sammeln. Die Artikelprobe nochmals zeigen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nomen nennen …</h3><p><b>Lebewesen:</b> Hund, Lehrerin, Kind</p><p><b>Dinge:</b> Tisch, Velo, Haus</p><p><b>Gedanken und Gefühle:</b> Mut, Freude, Idee</p></div>'+
 '<div class="card"><h3>So erkennst du ein Nomen</h3><ol class="steps"><li>Man kann einen <b>Artikel</b> davor setzen: der Hund, ein Haus.</li><li>Man schreibt es <b>gross</b>.</li><li>Es hat ein festes <b>Geschlecht</b> (der, die, das) und eine <b>Einzahl</b> und <b>Mehrzahl</b>.</li></ol></div></div>'+
 '<div class="callout">Nomen verändern sich nach <b>Fall</b> (der Hund, des Hundes) und <b>Zahl</b> (der Hund, die Hunde). Die Fälle lernst du im nächsten Kapitel.</div>'},
{id:'genus',title:'Geschlecht und Artikel',short:'Geschlecht',min:8,note:'Wichtig: Das Geschlecht der Nomen hat meist nichts mit dem Geschlecht der Lebewesen zu tun (das Mädchen). Nur die Endungen-Regeln üben, nicht alles auswendig lernen.',
 html:()=>'<div class="grid3">'+[['der','männlich (Maskulinum)','der Hund, der Tisch'],['die','weiblich (Femininum)','die Katze, die Tür'],['das','sächlich (Neutrum)','das Kind, das Haus']].map(a=>'<div class="card"><h3 style="font-size:1.6em">'+a[0]+'</h3><p><b>'+a[1]+'</b></p><p>'+a[2]+'</p></div>').join('')+'</div>'+
 '<div class="card" style="margin-top:.8rem"><h3>Hilfen durch die Endung</h3>'+T(['Endung','Geschlecht','Beispiele'],[['-ung, -heit, -keit, -schaft, -in','die (weiblich)','die Wohnung, die Freiheit, die Freundschaft, die Lehrerin'],['-chen, -lein','das (sächlich)','das Mädchen, das Häuschen'],['-nis (meist)','das (sächlich)','das Ergebnis, das Erlebnis'],['Jahreszeiten, Monate, Wochentage','der (männlich)','der Sommer, der Mai, der Montag']])+'</div>'+
 '<div class="callout">Lerne neue Nomen immer <b>mit Artikel</b>: «der Löffel», nicht nur «Löffel».</div>'},
{id:'zahl',title:'Einzahl und Mehrzahl',short:'Mehrzahl',min:8,note:'Die Pluralendungen mit Beispielen an der Wandtafel sammeln lassen. Nomen auf -er und -chen bleiben gleich.',
 html:()=>'<p class="lead">Fast jedes Nomen gibt es in der <b>Einzahl (Singular)</b> und in der <b>Mehrzahl (Plural)</b>.</p>'+
 T(['Endung','Einzahl → Mehrzahl'],[['-e','der Hund → die Hunde, der Tag → die Tage'],['-e mit Umlaut','der Baum → die Bäume, die Stadt → die Städte'],['-er (mit Umlaut)','das Kind → die Kinder, das Haus → die Häuser'],['-n oder -en','die Katze → die Katzen, die Frau → die Frauen'],['-s','das Auto → die Autos, das Handy → die Handys'],['nur Umlaut','der Apfel → die Äpfel, die Mutter → die Mütter'],['gleich','der Lehrer → die Lehrer, das Mädchen → die Mädchen']])+
 '<div class="callout">In der Mehrzahl gibt es nur <b>einen</b> Artikel für alle Geschlechter: <b>die</b> Hunde, <b>die</b> Katzen, <b>die</b> Kinder.</div>'},
{id:'gross',title:'Nomen und Grossschreibung',short:'Grossschreibung',min:10,note:'Das ist der wichtigste Rechtschreibteil. Die Signalwörter an der Wandtafel sammeln. Gegenbeispiele zeigen: «Wir gehen schwimmen».',
 html:()=>'<div class="grid2"><div class="card"><h3>Nomen schreibt man gross</h3><p>der <b>Hund</b>, die <b>Freude</b>, ein <b>Haus</b></p><p>Hilfe: Artikelprobe oder die Probe mit einem Adjektiv davor: <i>der kleine Hund</i>.</p></div>'+
 '<div class="card"><h3>Auch andere Wörter werden zu Nomen</h3><p>Verben: das <b>Lesen</b>, beim <b>Singen</b>, zum <b>Lernen</b></p><p>Adjektive: etwas <b>Neues</b>, alles <b>Gute</b>, nichts <b>Besonderes</b></p></div></div>'+
 '<div class="card" style="margin-top:.8rem"><h3>Signalwörter vor einem Nomen</h3><p>Artikel (<i>das</i> Lesen), Artikel in kurzen Wörtern (<i>beim, zum, im, am, vom</i>), Mengenwörter (<i>etwas, nichts, viel, alles</i>), Adjektive davor (<i>das laute Lachen</i>).</p></div>'+
 '<div class="callout"><b>Achtung:</b> Ohne Signalwort bleibt das Verb klein: «Wir gehen <b>schwimmen</b>.» Vor einem Nomen bleibt das Adjektiv klein: «ein <b>grosses</b> Problem».</div>'},
{id:'arten',title:'Arten von Nomen',short:'Nomenarten',min:6,note:'Beispiele von den Schülerinnen und Schülern sammeln. Die Unterscheidung Konkretum und Abstraktum ist Prüfungsstoff.',
 html:()=>'<div class="grid2"><div class="card"><h3>Eigennamen</h3><p>Namen von Personen, Orten und Ländern: <b>Anna</b>, <b>Zürich</b>, <b>Schweiz</b>, <b>Rhein</b>.</p><h3 style="margin-top:.8rem">Gattungsnamen</h3><p>Allgemeine Bezeichnungen: Mädchen, Stadt, Land, Fluss.</p></div>'+
 '<div class="card"><h3>Konkreta</h3><p>Man kann sie sehen oder anfassen: Hund, Tisch, Apfel.</p><h3 style="margin-top:.8rem">Abstrakta</h3><p>Gedanken, Gefühle, Eigenschaften: Mut, Freude, Idee, Angst.</p></div></div>'},
{id:'zusammen',title:'Zusammengesetzte Nomen',short:'Zusammensetzung',lv:2,min:6,note:'Nur ab Niveau B. Der Artikel kommt vom Grundwort (letztes Wort).',
 html:()=>'<div class="grid2"><div class="card"><h3>Bestimmungswort + Grundwort</h3><p><b>Schul</b>·<b>haus</b> = ein Haus für die Schule.</p><p>Das <b>letzte Wort</b> (Grundwort) bestimmt den Artikel: <b>das</b> Haus → <b>das</b> Schulhaus.</p></div>'+
 '<div class="card"><h3>Beispiele</h3>'+T(['Bestimmungswort','Grundwort','Nomen'],[['Hand','die Tasche','die Handtasche'],['Garten','der Tisch','der Gartentisch'],['Zahn','die Bürste','die Zahnbürste'],['Sonne + n','die Brille','die Sonnenbrille']])+'<p class="muted">Manchmal steht ein Fugenzeichen dazwischen: Sonne<b>n</b>brille, Liebe<b>s</b>brief.</p></div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Pro Stolperstein ein Beispiel von den Schülern bilden lassen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Das Geschlecht ist nicht das natürliche','«das Mädchen» (sächlich), «die Person» (weiblich)','Merke: Das Geschlecht steht im Artikel, nicht im Lebewesen.'],
  ['2 · Verb oder Nomen?','«Wir gehen <b>schwimmen</b>.» (Verb)<br>«Das <b>Schwimmen</b> macht Spass.» (Nomen)','Mit Signalwort (Artikel, beim, zum) gross, sonst klein.'],
  ['3 · Adjektiv oder Nomen?','«Ein <b>grosses</b> Problem.» (Adjektiv)<br>«Etwas <b>Grosses</b>.» (Nomen)','Vor einem Nomen bleibt das Adjektiv klein.'],
  ['4 · Mehrzahl bei -er und -chen','«die Lehrer», «die Mädchen»','Diese Nomen bleiben in der Mehrzahl gleich.'],
  ['5 · Mehrzahl mit Umlaut','«Haus → Häuser», «Baum → Bäume»','Der Umlaut verrät oft die Mehrzahl.'],
  ['6 · Nomen in Mundart und Schrift','Mundart: «s Velo»; Schriftsprache: «das Velo»','In der Schrift gilt der Artikel der Standardsprache.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('artikel,mehrzahl,gross')}
];
const EX=[
 ['Setze den Artikel ein: ___ Löffel, ___ Gabel, ___ Messer.','der Löffel · die Gabel · das Messer',1],
 ['Schreibe die Mehrzahl: Hund, Haus, Kind, Apfel, Lehrer.','Hunde · Häuser · Kinder · Äpfel · Lehrer',1],
 ['Gross oder klein? «Das (lesen) macht mir Spass.»','Lesen: mit Artikel «das» wird das Verb zum Nomen.',1],
 ['Gross oder klein? «Wir gehen (schwimmen).»','schwimmen: kein Signalwort, es bleibt ein Verb.',1],
 ['Gross oder klein? «Ich habe etwas (neues) gekauft.»','Neues: nach «etwas» wird das Adjektiv zum Nomen.',1],
 ['Konkretum oder Abstraktum? Mut, Tisch, Freude, Apfel.','Abstrakta: Mut, Freude · Konkreta: Tisch, Apfel',1],
 ['Bilde zusammengesetzte Nomen mit Artikel: Schule + Haus, Hand + Tasche, Garten + Tisch.','das Schulhaus · die Handtasche · der Gartentisch',2],
 ['Wähle ein Nomen mit -ung, -heit oder -keit und schreibe einen Satz.','Zum Beispiel: Die Wohnung ist hell. (-ung → die)',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Erkennen','Artikelprobe: der, die, das, ein, eine. Nomen schreibt man gross.'],['Geschlecht','männlich der · weiblich die · sächlich das. Lerne Nomen mit Artikel.'],['Endungen','-ung, -heit, -keit, -schaft, -in → die · -chen, -lein → das'],['Mehrzahl','-e, -e mit Umlaut, -er, -n/-en, -s, nur Umlaut, gleich'],['Gross','Verben und Adjektive werden nach Artikel, beim/zum/im, etwas, nichts, viel, alles zu Nomen.'],['Arten','Eigennamen und Gattungsnamen · Konkreta und Abstrakta'],['Zusammensetzung','Das letzte Wort bestimmt den Artikel: das Haus → das Schulhaus.']]);
GT.chapter({id:'nomen',teil:'wort',nr:2,title:'Nomen',big:'Der Hund, die Katze, das Kind',desc:'Wörter für Lebewesen, Dinge und Gedanken',
 ex:'«'+mk('nomen','Der Hund')+', '+mk('nomen','die Katze')+', '+mk('nomen','das Kind')+'»',
 goals:['Ich erkenne Nomen mit der Artikelprobe.','Ich kenne das Geschlecht (männlich, weiblich, sächlich) und setze den richtigen Artikel.','Ich bilde die Mehrzahl von Nomen.','Ich schreibe Nomen und nominalisierte Wörter richtig gross.','Ich unterscheide Eigennamen, Gattungsnamen, Konkreta und Abstrakta.'],
  write:['artikel','mehrzahl','gross'],strict:['gross'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{artikel:{winstr:'Schreibe den passenden Artikel.',label:'Artikel einsetzen',short:'der, die oder das',instr:'Welcher Artikel passt?',hint:'Prüfe die Endung (-ung, -chen …) und denke an die Hilfen in der Theorie.',ref:'genus'},
  mehrzahl:{winstr:'Schreibe die Mehrzahl.',label:'Mehrzahl bilden',short:'Einzahl und Mehrzahl',instr:'Wähle die richtige Mehrzahl.',hint:'Denke an die Pluralendungen: -e, -er, -en, -s, Umlaut.',ref:'zahl'},
  gross:{winstr:'Schreibe das Wort richtig: gross oder klein.',label:'Gross oder klein',short:'Nominalisierung',instr:'Welche Schreibweise ist richtig?',hint:'Suche ein Signalwort: Artikel, beim, zum, etwas, nichts, viel, alles.',ref:'gross'},
  text:{icon:'🔍',label:'Nomen im Text',short:'Alle Nomen in einem Text finden',instr:'Tippe alle Nomen im Text an (auch nominalisierte).',hint:'Artikelprobe: Kann ein Artikel davor stehen?',ref:'merkmale'},
  markieren:{label:'Nomen markieren',short:'Alle Nomen finden',instr:'Tippe alle Nomen an.',hint:'Artikelprobe: Kann ein Artikel davor stehen?',ref:'merkmale'},
  wissen:{label:'Wissen',short:'Begriffe und Regeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'arten'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
