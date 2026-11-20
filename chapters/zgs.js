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
['Ich kenne und mag diesen Sänger.',1,2,'«diesen Sänger» ist das gemeinsame Objekt (Akkusativobjekt).'],
['Tim holt den Ball und Mia den Schläger.',2,2,'Das Prädikat «holt» steht nur einmal: Mia [holt] den Schläger.'],
['Anna spielt Gitarre und Lena Klavier.',2,2,'Das Prädikat «spielt» wird im zweiten Teil weggelassen.'],
['Er hat das Buch gelesen und die Notizen geschrieben.',3,3,'Das Hilfsverb «hat» steht nur einmal: …und [hat] die Notizen geschrieben.']
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
['Lea malt ein Bild. Noah malt ein Bild.','Lea und Noah malen ein Bild.',[],2,'Das Objekt steht nur einmal, die Personalform wird zu «malen».']
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
 html:()=>T(['Gemeinsam','Beispiel'],[['Subjekt','<b>Anna</b> kocht und deckt den Tisch.'],['Objekt','Ich kenne und mag <b>diesen Sänger</b>.'],['Prädikat','Tim <b>holt</b> den Ball und Mia den Schläger.'],['Hilfsverb','Er <b>hat</b> das Buch gelesen und die Notizen geschrieben.']])+
 '<div class="callout"><b>Probe:</b> Ergänze das fehlende Glied im zweiten Teil. Ergibt sich ein vollständiger Satz, liegt ein ZGS vor.</div>'},
{id:'falsch',title:'Falsche Zusammenziehungen',short:'Falsche Zusammenziehungen',lv:2,min:8,note:'Ab Niveau B. Das gemeinsame Satzglied muss für beide Verben formal passen: helfen + Dativ, unterstützen + Akkusativ; Hilfsverb sein/haben.',
 html:()=>T(['Falsch','Richtig','Grund'],[['Er hilft und unterstützt seinen Freund.','Er hilft seinem Freund und unterstützt ihn.','helfen + Dativ, unterstützen + Akkusativ'],['Sie ist aufgestanden und geduscht.','Sie ist aufgestanden und hat geduscht.','sein und haben: Hilfsverb wiederholen']])+
 '<div class="callout">Verlangen die Verben <b>verschiedene Fälle</b> oder <b>verschiedene Hilfsverben</b>, darf man nicht zusammenziehen.</div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:4,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Zusammengezogener Satz (ZGS)','verkürzte Satzverbindung mit gemeinsamem Satzglied'],['Satzverbindung (SV)','mindestens zwei Hauptsätze'],['Satzgefüge (SG)','Hauptsatz + Nebensatz'],['gemeinsames Satzglied','Subjekt, Objekt, Prädikat oder Hilfsverb']])}
];
const EX=[
 ['Ziehe zusammen: «Tim spielt Gitarre. Tim singt dazu.»','Tim spielt Gitarre und singt dazu.',1],
 ['Welches Satzglied ist gemeinsam? «Tim holt den Ball und Mia den Schläger.»','Das Prädikat «holt».',2],
 ['Berichtige: «Er hilft und unterstützt seinen Freund.»','Er hilft seinem Freund und unterstützt ihn.',3]
];
const merk=()=>T(['Begriff','Merksatz'],[['ZGS','Ein gemeinsames Satzglied wird nur einmal genannt.'],['Gemeinsam','Subjekt, Objekt, Prädikat oder Hilfsverb.'],['Achtung','Verschiedene Fälle oder Hilfsverben: nicht zusammenziehen.']]);
GT.chapter({id:'zgs',teil:'satz',nr:6,title:'Zusammengezogener Satz',big:'Anna kocht und deckt den Tisch',desc:'Gemeinsames Satzglied erkennen und Sätze zusammenziehen',
 ex:'«Anna kocht und deckt den Tisch.»',
 goals:['Ich erkenne den zusammengezogenen Satz.','Ich nenne das gemeinsame Satzglied.','Ich ziehe Sätze zusammen.','Ich berichtige falsche Zusammenziehungen (ab B).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{erkenne:{icon:'🔎',label:'Zusammengezogenen Satz erkennen',short:'Gemeinsames Satzglied finden',instr:'Wähle die richtige Antwort.',hint:'Was wird nur einmal genannt?',ref:'erkennen'},
  zieh:{icon:'🪢',label:'Sätze zusammenziehen',short:'Gemeinsames Satzglied nur einmal nennen',instr:'Schreibe den zusammengezogenen Satz.',hint:'Was in beiden Sätzen gleich ist, nennst du nur einmal.',ref:'was'},
  falsch:{icon:'🛠️',label:'Falsche Zusammenziehung berichtigen',short:'Fall und Hilfsverb prüfen',instr:'Welcher Satz ist richtig?',hint:'Prüfe den Fall und das Hilfsverb.',ref:'falsch'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
