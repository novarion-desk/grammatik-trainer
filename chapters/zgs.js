/* Kapitel Satzlehre 6: Zusammengezogener Satz (Teil 2). */
(function(){
'use strict';
const GT=window.GT,T=GT.table;
const C={sg1:'Zusammengezogenen Satz erkennen',sg2:'Sätze zusammenziehen',sg3:'Falsche Zusammenziehungen',sg4:'Fachbegriffe'};
const task=[];
const SG=['Subjekt','Objekt','Prädikat','Hilfsverb'];

/* Erkennen: welches Satzglied wird nur einmal genannt? */
const E=[
['Anna kocht und deckt den Tisch.',0,1,'«Anna» ist Subjekt beider Teile, wird aber nur einmal genannt.'],
['Tim liest ein Buch und schreibt eine Geschichte.',0,1,'«Tim» ist das gemeinsame Subjekt.'],
['Wir kochen Pasta und essen sie gemeinsam.',0,1,'«Wir» ist das gemeinsame Subjekt.'],
['Lena kocht und Tim isst die Suppe.',1,2,'«die Suppe» ist das gemeinsame Objekt. Die Subjekte und die Verben sind verschieden.'],
['Tim holt den Ball und Mia den Schläger.',2,2,'Das Prädikat «holt» steht nur einmal: Mia [holt] den Schläger.'],
['Anna spielt Gitarre und Lena Klavier.',2,2,'Das Prädikat «spielt» wird im zweiten Teil weggelassen.'],
['Anna hat gestern gelacht und Tim geweint.',3,3,'Das Hilfsverb «hat» steht nur einmal: …und Tim [hat] geweint. Die Subjekte sind verschieden.']
];
E.forEach(e=>task.push({typ:'erkenne',stufe:e[2],lv:e[2]===3?2:1,cats:['sg1'],prompt:'Welches Satzglied wird nur einmal genannt?<br>«'+e[0]+'»',opts:SG,answer:SG[e[1]],why:'<b>'+SG[e[1]]+'.</b> '+e[3]}));

const W=[
['Welcher Satz ist ein zusammengezogener Satz?',['Anna kocht und deckt den Tisch.','Anna kocht, und Mia deckt den Tisch.','Anna kocht, weil sie Hunger hat.','Anna kocht.'],'Anna kocht und deckt den Tisch.','Das Subjekt «Anna» gehört zu beiden Teilen, wird aber nur einmal genannt.','sg1',1],
['Ist das ein zusammengezogener Satz? «Tim spielt Gitarre, und Mia singt.»',['Nein, jeder Teil hat ein eigenes Subjekt','Ja, «und» verbindet zwei Sätze','Ja, das Komma zieht zusammen','Nein, es ist ein Satzgefüge'],'Nein, jeder Teil hat ein eigenes Subjekt','Hier steht in jedem Teil ein eigenes Subjekt: normale Satzverbindung.','sg1',2],
['Wozu zieht man Sätze zusammen?',['um Wiederholungen zu vermeiden','um Nebensätze zu bilden','um Fragen zu stellen','um Satzglieder zu verschieben'],'um Wiederholungen zu vermeiden','Was in beiden Teilen gleich ist, nennt man nur einmal.','sg1',1],
['Aus welchen Teilen besteht ein zusammengezogener Satz?',['aus mindestens zwei Hauptsätzen mit gemeinsamem Satzglied','aus einem Hauptsatz und einem Nebensatz','aus einem Satzfragment','aus einem einzigen Wort'],'aus mindestens zwei Hauptsätzen mit gemeinsamem Satzglied','Er ist eine verkürzte Satzverbindung.','sg1',2]
];
W.forEach(w=>task.push({typ:'erkenne',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* Zusammenziehen */
const Z=[
['Tim spielt Gitarre. Tim singt dazu.','Tim spielt Gitarre und singt dazu.',['Tim spielt Gitarre, und singt dazu.'],1,'Das Subjekt «Tim» steht nur einmal.'],
['Mia öffnet das Fenster. Mia lüftet den Raum.','Mia öffnet das Fenster und lüftet den Raum.',[],1,'Das Subjekt «Mia» steht nur einmal.'],
['Wir räumen auf. Wir putzen die Tafel.','Wir räumen auf und putzen die Tafel.',[],1,'Das Subjekt «Wir» steht nur einmal.'],
['Anna holt Brot. Tim holt Milch.','Anna holt Brot und Tim Milch.',['Anna holt Brot, Tim Milch.','Anna holt Brot, und Tim Milch.'],2,'Das Prädikat «holt» steht nur einmal.'],
['Ich habe das Heft vergessen. Ich habe den Stift vergessen.','Ich habe das Heft und den Stift vergessen.',[],2,'Subjekt, Hilfsverb und Partizip werden nur einmal genannt.'],
['Lea mag Pizza. Noah mag Pasta.','Lea mag Pizza und Noah Pasta.',['Lea mag Pizza, Noah Pasta.','Lea mag Pizza, und Noah Pasta.'],2,'Das Prädikat «mag» steht nur einmal.']
];
Z.forEach(z=>task.push({typ:'zieh',stufe:z[3],lv:1,cats:['sg2'],input:true,prompt:'Ziehe die beiden Sätze zu einem Satz zusammen.',sent:z[0],answer:z[1],accept:z[2],why:'<b>'+z[1]+'</b> '+z[4]}));

/* Falsch zusammengezogen (ab Niveau B) */
const F=[
['Welcher Satz ist richtig?',['Er hilft seinem Freund und unterstützt ihn.','Er hilft und unterstützt seinen Freund.','Er hilft und unterstützt seinem Freund.','Er hilft seinen Freund und unterstützt seinem Freund.'],'Er hilft seinem Freund und unterstützt ihn.','«helfen» verlangt den Dativ, «unterstützen» den Akkusativ. Ein gemeinsames Objekt geht darum nicht.'],
['Welcher Satz ist richtig?',['Sie liebt ihren Vater und dankt ihm.','Sie liebt und dankt ihrem Vater.','Sie liebt und dankt ihren Vater.','Sie liebt ihrem Vater und dankt ihm.'],'Sie liebt ihren Vater und dankt ihm.','«lieben» verlangt den Akkusativ, «danken» den Dativ.'],
['Welcher Satz ist richtig?',['Sie ist aufgestanden und hat geduscht.','Sie ist aufgestanden und geduscht.','Sie hat aufgestanden und geduscht.','Sie ist aufgestanden und duschen.'],'Sie ist aufgestanden und hat geduscht.','«aufstehen» bildet das Perfekt mit «sein», «duschen» mit «haben». Das Hilfsverb muss wiederholt werden.'],
['Wann ist eine Zusammenziehung falsch?',['wenn das gemeinsame Satzglied in den Teilen nicht gleich ist (z. B. Dativ und Akkusativ)','wenn das Subjekt nur einmal steht','wenn ein «und» im Satz steht','wenn der Satz kurz ist'],'wenn das gemeinsame Satzglied in den Teilen nicht gleich ist (z. B. Dativ und Akkusativ)','Das gemeinsame Satzglied muss für beide Verben die gleiche Form haben.']
];
F.forEach(f=>task.push({typ:'falsch',stufe:3,lv:2,cats:['sg3'],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));

const H=[
['Ein Satz, in dem ein gemeinsames Satzglied nur einmal genannt wird, heisst …','Das ist ein …','zusammengezogener Satz',['Zusammengezogener Satz','zusammengezogener','Zusammengezogener'],'Zusammengezogener Satz (ZGS).',1],
['Die Abkürzung für «zusammengezogener Satz» lautet …','Die Abkürzung lautet …','ZGS',['zgs'],'ZGS.',1],
['Anna kocht und deckt den Tisch. Welches Satzglied wird nur einmal genannt?','Das gemeinsame Satzglied ist das …','Subjekt',['Das Subjekt'],'Das Subjekt «Anna».',1],
['Tim holt den Ball und Mia den Schläger. Welches Satzglied wird nur einmal genannt?','Das gemeinsame Satzglied ist das …','Prädikat',['Das Prädikat'],'Das Prädikat «holt».',2]
];
H.forEach(h=>task.push({typ:'fach',stufe:h[5],lv:1,cats:['sg4'],input:true,prompt:h[0],sent:h[1],answer:h[2],accept:h[3],strict:true,why:'<b>'+h[2]+'.</b> '+h[4]}));

const SECS=[
{id:'was',title:'Der zusammengezogene Satz',short:'Zusammengezogener Satz',min:10,note:'Zusammengezogener Satz (ZGS): Ein gemeinsames Satzglied wird nur einmal genannt. Er ist eine verkürzte Satzverbindung. Gemeinsam sein kann Subjekt, Objekt, Prädikat oder Hilfsverb.',
 html:()=>'<p class="lead">Ein <b>zusammengezogener Satz (ZGS)</b> ist eine <b>verkürzte Satzverbindung</b>. Was in beiden Teilen gleich ist, wird nur <b>einmal</b> genannt.</p>'+
 T(['Satzverbindung','Zusammengezogener Satz'],[['Anna kocht, und Anna deckt den Tisch.','Anna kocht und deckt den Tisch.'],['Tim holt den Ball, und Mia holt den Schläger.','Tim holt den Ball und Mia den Schläger.']])+
 '<div class="callout">Das Komma vor «und» entfällt meistens: «Anna kocht und deckt den Tisch.»</div>'},
{id:'erkennen',title:'Das gemeinsame Satzglied',short:'Gemeinsames Satzglied',min:8,note:'Vier Möglichkeiten: Subjekt, Objekt, Prädikat, Hilfsverb. Zum Erkennen: Fehlt in einem Teil das Subjekt (oder ein anderes Glied), das man aus dem anderen Teil ergänzen kann?',
 html:()=>T(['Gemeinsam','Beispiel'],[['Subjekt','<b>Anna</b> kocht und deckt den Tisch.'],['Objekt','Lena kocht und Tim isst <b>die Suppe</b>.'],['Prädikat','Tim <b>holt</b> den Ball und Mia den Schläger.'],['Hilfsverb','Anna <b>hat</b> gelacht und Tim geweint.']])+
 '<div class="callout"><b>Probe:</b> Ergänze das fehlende Glied im zweiten Teil. Ergibt sich ein vollständiger Satz, liegt ein ZGS vor.</div>'},
{id:'falsch',title:'Falsche Zusammenziehungen',short:'Falsche Zusammenziehungen',lv:2,min:8,note:'Ab Niveau B. Das gemeinsame Satzglied muss für beide Verben formal passen: helfen + Dativ, unterstützen + Akkusativ; Hilfsverb sein/haben.',
 html:()=>GT.ui.oops([['Er hilft und unterstützt seinen Freund.','Er hilft seinem Freund und unterstützt ihn.'],['Sie ist aufgestanden und geduscht.','Sie ist aufgestanden und hat geduscht.']])+'<div class="grid2">'+GT.ui.R('Fall','bl','helfen + Dativ, unterstützen + Akkusativ','verschiedene Fälle')+GT.ui.R('Hilfsverb','gr','sein und haben: Hilfsverb wiederholen','verschiedene Hilfsverben')+'</div><div class="callout">Verlangen die Verben <b>verschiedene Fälle</b> oder <b>verschiedene Hilfsverben</b>, darf man nicht zusammenziehen.</div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:4,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Ein kleiner Tippfehler zählt nicht als falsch, wird aber erwähnt.',
 html:()=>T(['Begriff','Bedeutung'],[['Zusammengezogener Satz (ZGS)','verkürzte Satzverbindung mit gemeinsamem Satzglied'],['Satzverbindung (SV)','mindestens zwei Hauptsätze'],['Satzgefüge (SG)','Hauptsatz + Nebensatz'],['gemeinsames Satzglied','Subjekt, Objekt, Prädikat oder Hilfsverb']])}
];
const EX=[
 ['Ziehe zusammen: «Tim spielt Gitarre. Tim singt dazu.»','Tim spielt Gitarre und singt dazu.',1],
 ['Welches Satzglied ist gemeinsam? «Tim holt den Ball und Mia den Schläger.»','Das Prädikat «holt».',2],
 ['Berichtige: «Er hilft und unterstützt seinen Freund.»','Er hilft seinem Freund und unterstützt ihn.',3]
];
const merk=()=>T(['Begriff','Merksatz'],[['ZGS','Ein gemeinsames Satzglied wird nur einmal genannt.'],['Gemeinsam','Subjekt, Objekt, Prädikat oder Hilfsverb.'],['Achtung','Verschiedene Fälle oder Hilfsverben: nicht zusammenziehen.']]);
const UEM={'erkennen':{types:'erkenne',cats:'sg1'},'falsch':{types:'falsch',cats:'sg3'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
const E2=[
['Mia singt und tanzt gern.',0,1,'«Mia» ist Subjekt beider Teile.'],
['Der Hund bellt und beisst nicht.',0,1,'«Der Hund» ist das gemeinsame Subjekt.'],
['Ich esse einen Apfel und trinke Wasser.',0,1,'«Ich» ist das gemeinsame Subjekt.'],
['Die Schüler schreiben und rechnen.',0,1,'«Die Schüler» sind das gemeinsame Subjekt.'],
['Wir singen ein Lied und spielen Gitarre.',0,1,'«Wir» ist das gemeinsame Subjekt.'],
['Er ruft an und fragt nach den Hausaufgaben.',0,1,'«Er» ist das gemeinsame Subjekt.'],
['Tim isst eine Banane und Lena einen Apfel.',2,2,'Das Prädikat «isst» steht nur einmal: Lena [isst] einen Apfel.'],
['Mia liest ein Buch und Tim eine Zeitung.',2,2,'Das Prädikat «liest» steht nur einmal.'],
['Max isst den Kuchen und Mia den Salat.',2,2,'Das Prädikat «isst» steht nur einmal.'],
['Mia spült und Tim trocknet das Geschirr.',1,2,'«das Geschirr» ist das gemeinsame Objekt beider Teile.'],
['Lena hat gelesen und Tim geschrieben.',3,3,'Das Hilfsverb «hat» steht nur einmal: …und Tim [hat] geschrieben.'],
['Anna ist gekommen und Tim gegangen.',3,3,'Das Hilfsverb «ist» steht nur einmal: …und Tim [ist] gegangen.']
];
E2.forEach(e=>task.push({typ:'erkenne',stufe:e[2],lv:e[2]===3?2:1,cats:['sg1'],prompt:'Welches Satzglied wird nur einmal genannt?<br>«'+e[0]+'»',opts:SG,answer:SG[e[1]],why:'<b>'+SG[e[1]]+'.</b> '+e[3]}));
const W2=[
['Welcher Satz ist ein zusammengezogener Satz?',['Mia lacht und winkt.','Mia lacht, weil Tim winkt.','Mia lacht, und Tim winkt.','Lacht Mia?'],'Mia lacht und winkt.','Das Subjekt «Mia» steht nur einmal und gehört zu beiden Prädikaten.','sg1',1],
['Warum ist «Tim kocht und isst.» besser als «Tim kocht, und Tim isst.»?',['Das Subjekt wird nicht unnötig wiederholt.','Es hat weniger Wörter, aber mehr Subjekte.','Es ist eine Frage.','Es hat einen Nebensatz.'],'Das Subjekt wird nicht unnötig wiederholt.','Im zusammengezogenen Satz nennt man «Tim» nur einmal.','sg1',1],
['In «Anna holt Brot und Tim Milch.» fehlt im zweiten Teil das …',['Prädikat','Subjekt','Objekt','Adjektiv'],'Prädikat','Das Prädikat «holt» wird nicht wiederholt.','sg1',2],
['Was bleibt in «Mia spielt Klavier und Lena Gitarre.» im zweiten Teil weg?',['das Prädikat «spielt»','das Subjekt «Lena»','das Objekt «Gitarre»','das Wort «und»'],'das Prädikat «spielt»','Es steht nur einmal, gilt aber für beide Teile.','sg1',2],
['Wie viele Verben in der Personalform hat «Er steht auf, wäscht sich und putzt die Zähne.»?',['3','1','2','4'],'3','«steht … auf», «wäscht», «putzt» mit dem gemeinsamen Subjekt «Er».','sg1',2],
['Welcher Satz ist <b>kein</b> zusammengezogener Satz?',['Tim spielt, und Mia singt.','Tim spielt und singt.','Tim und Mia spielen.','Tim isst Pizza und Mia Salat.'],'Tim spielt, und Mia singt.','Hier hat jeder Teil ein eigenes Subjekt und ein eigenes Prädikat. Nichts wird zusammengezogen.','sg1',2],
['Was wird in «Tim isst Pizza und Mia Salat.» zusammengezogen?',['das Prädikat','das Subjekt','das Objekt','der Artikel'],'das Prädikat','«isst» steht nur im ersten Teil.','sg1',2],
['Wann kann man zwei Sätze zusammenziehen?',['wenn sie ein gleiches Satzglied haben','wenn sie gleich lang sind','wenn sie beide Fragen sind','wenn sie mit «weil» beginnen'],'wenn sie ein gleiches Satzglied haben','Das gleiche Satzglied lässt man beim zweiten Mal weg.','sg2',1]
];
W2.forEach(w=>task.push({typ:'erkenne',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
const Z2=[
['Anna liest ein Buch. Anna trinkt Tee.','Anna liest ein Buch und trinkt Tee.',[],1,'Das Subjekt «Anna» steht nur einmal.'],
['Der Hund rennt los. Der Hund bellt laut.','Der Hund rennt los und bellt laut.',[],1,'Das Subjekt «Der Hund» steht nur einmal.'],
['Wir singen ein Lied. Wir tanzen dazu.','Wir singen ein Lied und tanzen dazu.',[],1,'Das Subjekt «Wir» steht nur einmal.'],
['Mia steht auf. Mia putzt sich die Zähne.','Mia steht auf und putzt sich die Zähne.',[],1,'Das Subjekt «Mia» steht nur einmal.'],
['Tim holt den Ball. Tim wirft ihn weit.','Tim holt den Ball und wirft ihn weit.',[],1,'Das Subjekt «Tim» steht nur einmal.'],
['Lena malt ein Bild. Tim malt ein Haus.','Lena malt ein Bild und Tim ein Haus.',['Lena malt ein Bild, Tim ein Haus.','Lena malt ein Bild, und Tim ein Haus.'],2,'Das Prädikat «malt» steht nur einmal.'],
['Max isst Pizza. Mia isst Salat.','Max isst Pizza und Mia Salat.',['Max isst Pizza, Mia Salat.','Max isst Pizza, und Mia Salat.'],2,'Das Prädikat «isst» steht nur einmal.'],
['Anna fährt nach Bern. Tim fährt nach Zürich.','Anna fährt nach Bern und Tim nach Zürich.',['Anna fährt nach Bern, Tim nach Zürich.','Anna fährt nach Bern, und Tim nach Zürich.'],2,'Das Prädikat «fährt» steht nur einmal.'],
['Ich habe Hunger. Ich habe Durst.','Ich habe Hunger und Durst.',[],2,'Subjekt und Prädikat stehen nur einmal.'],
['Er hat den Brief gelesen. Er hat den Brief beantwortet.','Er hat den Brief gelesen und beantwortet.',[],3,'Subjekt, Hilfsverb und Objekt stehen nur einmal.'],
['Mia hat gesungen. Tim hat getanzt.','Mia hat gesungen und Tim getanzt.',['Mia hat gesungen, Tim getanzt.','Mia hat gesungen, und Tim getanzt.'],3,'Das Hilfsverb «hat» steht nur einmal.'],
['Lea ist gestern angekommen. Lea ist heute abgereist.','Lea ist gestern angekommen und heute abgereist.',[],3,'Subjekt und Hilfsverb «ist» stehen nur einmal.']
];
Z2.forEach(z=>task.push({typ:'zieh',stufe:z[3],lv:1,cats:['sg2'],input:true,prompt:'Ziehe die beiden Sätze zu einem Satz zusammen.',sent:z[0],answer:z[1],accept:z[2],why:'<b>'+z[1]+'</b> '+z[4]}));
const F2=[
['Welcher Satz ist richtig?',['Er sieht den Freund und hilft ihm.','Er sieht und hilft dem Freund.','Er sieht und hilft den Freund.','Er sieht dem Freund und hilft ihm.'],'Er sieht den Freund und hilft ihm.','«sehen» verlangt den Akkusativ, «helfen» den Dativ. Ein gemeinsames Objekt passt nicht zu beiden.'],
['Welcher Satz ist richtig?',['Er ist nach Hause gegangen und hat geschlafen.','Er ist nach Hause gegangen und geschlafen.','Er hat nach Hause gegangen und geschlafen.','Er ist nach Hause gegangen und geschlafen ist.'],'Er ist nach Hause gegangen und hat geschlafen.','«gehen» bildet das Perfekt mit «ist», «schlafen» mit «hat». Das Hilfsverb darf nicht gemeinsam stehen.'],
['Welcher Satz ist richtig?',['Er besucht und begrüsst seine Oma.','Er besucht und hilft seine Oma.','Er besucht und hilft seiner Oma.','Er besucht seiner Oma und hilft ihr.'],'Er besucht und begrüsst seine Oma.','«besuchen» und «begrüssen» verlangen beide den Akkusativ, darum darf «seine Oma» gemeinsam stehen.'],
['Welcher Satz ist falsch zusammengezogen?',['Ich frage und danke dir.','Ich frage dich und danke dir.','Ich rufe und besuche dich.','Ich begrüsse und umarme dich.'],'Ich frage und danke dir.','«fragen» verlangt den Akkusativ («dich»), «danken» den Dativ («dir»). Das Objekt kann nicht gemeinsam stehen.']
];
F2.forEach(f=>task.push({typ:'falsch',stufe:3,lv:2,cats:['sg3'],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));
const H2=[
['Mia singt und tanzt. Welches Satzglied ist gemeinsam?','Das gemeinsame Satzglied ist das …','Subjekt',['Das Subjekt'],'Das Subjekt «Mia».',1],
['Tim isst Pizza und Lena Salat. Welches Satzglied wird im zweiten Teil weggelassen?','Das weggelassene Satzglied ist das …','Prädikat',['Das Prädikat'],'«isst» steht nur einmal.',2],
['Tim spielt, und Mia singt. Wie heisst diese Verbindung zweier vollständiger Hauptsätze?','Das ist eine …','Satzverbindung',['eine Satzverbindung','Eine Satzverbindung'],'Satzverbindung: zwei vollständige Hauptsätze, nichts wird zusammengezogen.',2]
];
H2.forEach(h=>task.push({typ:'fach',stufe:h[5],lv:1,cats:['sg4'],input:true,prompt:h[0],sent:h[1],answer:h[2],accept:h[3],strict:true,why:'<b>'+h[2]+'.</b> '+h[4]}));
task.push=_p0;
})();

/* ---- Erweiterung 2 (23.11.2026, Ausbau dünner Themen und Stufe 3) ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
const E3=[
['Jonas spielt Fussball und trainiert dreimal pro Woche.',0,1,'«Jonas» ist das gemeinsame Subjekt.'],
['Die Katze schläft und träumt.',0,1,'«Die Katze» ist das gemeinsame Subjekt.'],
['Sara packt ihre Tasche und geht zur Schule.',0,1,'«Sara» ist das gemeinsame Subjekt.'],
['Ben trinkt Tee und Lisa Kaffee.',2,2,'Das Prädikat «trinkt» steht nur einmal: Lisa [trinkt] Kaffee.'],
['Paul liest einen Krimi und Nina einen Roman.',2,2,'Das Prädikat «liest» steht nur einmal.'],
['Tom wäscht das Auto und Eva das Velo.',2,2,'Das Prädikat «wäscht» steht nur einmal.'],
['Der Lehrer korrigiert die Tests und die Lehrerin die Aufsätze.',2,2,'Das Prädikat «korrigiert» steht nur einmal.'],
['Lena liest und Tim schreibt einen Brief.',1,2,'«einen Brief» ist das gemeinsame Objekt beider Teile.'],
['Mia backt und Noah verziert den Kuchen.',1,2,'«den Kuchen» ist das gemeinsame Objekt beider Teile.'],
['Max hat gelacht und Lea gewunken.',3,3,'Das Hilfsverb «hat» steht nur einmal: …und Lea [hat] gewunken.'],
['Der Zug ist angekommen und der Bus abgefahren.',3,3,'Das Hilfsverb «ist» steht nur einmal: …und der Bus [ist] abgefahren.'],
['Sie haben gespielt und wir gesungen.',3,3,'Das Hilfsverb «haben» steht nur einmal: …und wir [haben] gesungen.']
];
E3.forEach(e=>task.push({typ:'erkenne',stufe:e[2],lv:e[2]===3?2:1,cats:['sg1'],prompt:'Welches Satzglied wird nur einmal genannt?<br>«'+e[0]+'»',opts:SG,answer:SG[e[1]],why:'<b>'+SG[e[1]]+'.</b> '+e[3]}));
const W3=[
['Welcher Satz ist ein zusammengezogener Satz?',['Sara schreibt und zeichnet.','Sara schreibt, und Tim zeichnet.','Sara schreibt, weil sie Zeit hat.','Schreibt Sara?'],'Sara schreibt und zeichnet.','Das Subjekt «Sara» steht nur einmal und gehört zu beiden Prädikaten.','sg1',1],
['Welcher Satz ist <b>kein</b> zusammengezogener Satz?',['Ben kocht, und Eva deckt den Tisch.','Ben kocht und deckt den Tisch.','Ben isst Reis und Eva Fisch.','Ben steht auf und kocht Tee.'],'Ben kocht, und Eva deckt den Tisch.','Jeder Teil hat ein eigenes Subjekt und ein eigenes Prädikat. Es wird nichts zusammengezogen.','sg1',2],
['Wie oft steht das Subjekt in «Nina packt ein und geht los.»?',['einmal','zweimal','dreimal','gar nicht'],'einmal','«Nina» steht nur einmal und gilt für «packt … ein» und «geht … los».','sg1',2],
['Muss in «Tim isst und trinkt.» vor «und» ein Komma stehen?',['Nein, «und» verbindet zwei Prädikate und keine ganzen Sätze.','Ja, vor «und» steht immer ein Komma.','Ja, weil zwei Verben im Satz stehen.','Nur wenn der Satz lang ist.'],'Nein, «und» verbindet zwei Prädikate und keine ganzen Sätze.','Im zusammengezogenen Satz steht vor «und» kein Komma, weil keine zwei vollständigen Sätze verbunden werden.','sg1',2],
['Welcher Satz hat ein gemeinsames Objekt?',['Mia backt und Noah verziert den Kuchen.','Mia backt den Kuchen, und Noah geht heim.','Mia backt den Kuchen. Noah isst ihn.','Mia backt, weil Noah Hunger hat.'],'Mia backt und Noah verziert den Kuchen.','«den Kuchen» gehört zu «backt» und zu «verziert» und steht nur einmal.','sg1',3],
['Wie wird «Lea spielt Geige. Lea singt dazu.» richtig zusammengezogen?',['Lea spielt Geige und singt dazu.','Lea spielt Geige und Lea singt dazu.','Lea spielt und singt Geige dazu.','Lea spielt Geige, singt Lea dazu.'],'Lea spielt Geige und singt dazu.','Das Subjekt «Lea» steht nur einmal. Beide Prädikate folgen auf «Lea».','sg2',1],
['Was bleibt in «Ben trinkt Tee und Lisa Kaffee.» im zweiten Teil weg?',['das Prädikat «trinkt»','das Subjekt «Lisa»','das Objekt «Kaffee»','das Wort «und»'],'das Prädikat «trinkt»','«trinkt» steht nur im ersten Teil und gilt auch für den zweiten.','sg2',2]
];
W3.forEach(w=>task.push({typ:'erkenne',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
const Z3=[
['Sara packt die Tasche. Sara geht zur Schule.','Sara packt die Tasche und geht zur Schule.',[],1,'Das Subjekt «Sara» steht nur einmal.'],
['Die Katze schläft. Die Katze träumt.','Die Katze schläft und träumt.',[],1,'Das Subjekt «Die Katze» steht nur einmal.'],
['Jonas spielt Fussball. Jonas trainiert dreimal pro Woche.','Jonas spielt Fussball und trainiert dreimal pro Woche.',[],1,'Das Subjekt «Jonas» steht nur einmal.'],
['Mein Bruder isst Reis. Meine Schwester isst Fisch.','Mein Bruder isst Reis und meine Schwester Fisch.',['Mein Bruder isst Reis, meine Schwester Fisch.','Mein Bruder isst Reis, und meine Schwester Fisch.'],2,'Das Prädikat «isst» steht nur einmal.'],
['Ben trinkt Tee. Lisa trinkt Kaffee.','Ben trinkt Tee und Lisa Kaffee.',['Ben trinkt Tee, Lisa Kaffee.','Ben trinkt Tee, und Lisa Kaffee.'],2,'Das Prädikat «trinkt» steht nur einmal.'],
['Tom wäscht das Auto. Eva wäscht das Velo.','Tom wäscht das Auto und Eva das Velo.',['Tom wäscht das Auto, Eva das Velo.','Tom wäscht das Auto, und Eva das Velo.'],2,'Das Prädikat «wäscht» steht nur einmal.'],
['Wir haben gelacht. Wir haben gespielt.','Wir haben gelacht und gespielt.',[],2,'Subjekt und Hilfsverb «haben» stehen nur einmal.'],
['Der Zug ist angekommen. Der Bus ist abgefahren.','Der Zug ist angekommen und der Bus abgefahren.',['Der Zug ist angekommen, der Bus abgefahren.','Der Zug ist angekommen, und der Bus abgefahren.'],3,'Das Hilfsverb «ist» steht nur einmal.'],
['Mia hat den Kuchen gebacken. Mia hat den Kuchen verziert.','Mia hat den Kuchen gebacken und verziert.',[],3,'Subjekt, Hilfsverb und Objekt stehen nur einmal.'],
['Lea ist aufgestanden. Lea hat geduscht.','Lea ist aufgestanden und hat geduscht.',[],3,'Das Subjekt «Lea» steht nur einmal. Die Hilfsverben sind verschieden («ist» und «hat»), darum werden beide genannt.']
];
Z3.forEach(z=>task.push({typ:'zieh',stufe:z[3],lv:1,cats:['sg2'],input:true,prompt:'Ziehe die beiden Sätze zu einem Satz zusammen.',sent:z[0],answer:z[1],accept:z[2],why:'<b>'+z[1]+'</b> '+z[4]}));
const F3=[
['Welcher Satz ist richtig?',['Sie hilft ihrem Bruder und tröstet ihn.','Sie hilft und tröstet ihrem Bruder.','Sie hilft und tröstet ihren Bruder.','Sie hilft ihren Bruder und tröstet ihm.'],'Sie hilft ihrem Bruder und tröstet ihn.','«helfen» verlangt den Dativ, «trösten» den Akkusativ. Ein gemeinsames Objekt passt nicht zu beiden.'],
['Welcher Satz ist richtig?',['Er trifft seine Freundin und gratuliert ihr.','Er trifft und gratuliert seine Freundin.','Er trifft und gratuliert seiner Freundin.','Er trifft seiner Freundin und gratuliert sie.'],'Er trifft seine Freundin und gratuliert ihr.','«treffen» verlangt den Akkusativ, «gratulieren» den Dativ.'],
['Welcher Satz ist richtig?',['Sie ist gerannt und hat gelacht.','Sie ist gerannt und gelacht.','Sie hat gerannt und gelacht.','Sie ist gerannt und lachen.'],'Sie ist gerannt und hat gelacht.','«rennen» bildet das Perfekt mit «ist», «lachen» mit «hat». Die Hilfsverben sind verschieden, darum muss man beide nennen.'],
['Welcher Satz ist richtig?',['Das Kind ist gefallen und hat geweint.','Das Kind ist gefallen und geweint.','Das Kind hat gefallen und geweint.','Das Kind ist gefallen und weint hat.'],'Das Kind ist gefallen und hat geweint.','«fallen» bildet das Perfekt mit «ist», «weinen» mit «hat».'],
['Welcher Satz ist falsch zusammengezogen?',['Wir loben und danken unserer Lehrerin.','Wir danken und helfen unserer Lehrerin.','Wir loben und tadeln unsere Lehrerin.','Wir besuchen und fragen unsere Lehrerin.'],'Wir loben und danken unserer Lehrerin.','«loben» verlangt den Akkusativ, «danken» den Dativ. Das Objekt kann nicht gemeinsam stehen. Bei den anderen Sätzen haben beide Verben den gleichen Fall.']
];
F3.forEach(f=>task.push({typ:'falsch',stufe:3,lv:2,cats:['sg3'],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));
const H3=[
['Sara schreibt und zeichnet. Was haben beide Teile gemeinsam?','Das gemeinsame Satzglied ist das …','Subjekt',['Das Subjekt'],'«Sara» ist das gemeinsame Subjekt.',1],
['Ben isst Reis und Eva Fisch. Welches Satzglied wird im zweiten Teil weggelassen?','Das weggelassene Satzglied ist das …','Prädikat',['Das Prädikat'],'«isst» steht nur einmal.',2],
['Ben kocht, und Eva deckt den Tisch. Wie heisst diese Verbindung zweier vollständiger Hauptsätze?','Das ist eine …','Satzverbindung',['eine Satzverbindung','Eine Satzverbindung'],'Satzverbindung: zwei vollständige Hauptsätze, nichts wird zusammengezogen.',2],
['Max hat gelacht und Lea gewunken. Welches Wort steht nur einmal?','Es steht nur das …','Hilfsverb',['Das Hilfsverb'],'«hat» ist ein Hilfsverb und gehört zu beiden Teilen.',3]
];
H3.forEach(h=>task.push({typ:'fach',stufe:h[5],lv:1,cats:['sg4'],input:true,prompt:h[0],sent:h[1],answer:h[2],accept:h[3],strict:true,why:'<b>'+h[2]+'.</b> '+h[4]}));
task.push=_p0;
})();

GT.chapter({id:'zgs',teil:'satz',nr:8,title:'Zusammengezogener Satz',big:'Anna kocht und deckt den Tisch',desc:'Gemeinsames Satzglied erkennen und Sätze zusammenziehen',
 ex:'«Anna kocht und deckt den Tisch.»',
 goals:['Ich erkenne den zusammengezogenen Satz.','Ich nenne das gemeinsame Satzglied.','Ich ziehe Sätze zusammen.','Ich berichtige falsche Zusammenziehungen (ab B).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{erkenne:{icon:'🔎',label:'Zusammengezogenen Satz erkennen',short:'Gemeinsames Satzglied finden',instr:'Wähle die richtige Antwort.',hint:'Was wird nur einmal genannt?',ref:'erkennen'},
  zieh:{icon:'🪢',label:'Sätze zusammenziehen',short:'Gemeinsames Satzglied nur einmal nennen',instr:'Schreibe den zusammengezogenen Satz.',hint:'Was in beiden Sätzen gleich ist, nennst du nur einmal.',ref:'was'},
  falsch:{icon:'🛠️',label:'Falsche Zusammenziehung berichtigen',short:'Fall und Hilfsverb prüfen',instr:'Welcher Satz ist richtig?',hint:'Prüfe den Fall und das Hilfsverb.',ref:'falsch'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
