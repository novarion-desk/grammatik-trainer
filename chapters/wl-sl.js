/* Kapitel Satzlehre 1: Wortlehre und Satzlehre. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Wort oder Satz',sg2:'Wortart oder Satzglied',sg3:'Satz erkennen'};
const task=[];

const A=[
['Was untersucht die <b>Wortlehre</b>?',['einzelne Wörter und ihre Wortart','ganze Sätze und ihre Glieder','Satzzeichen','Aufsätze'],'einzelne Wörter und ihre Wortart','Wortlehre: Nomen, Verb, Adjektiv, Pronomen, Partikel.','sg1',1],
['Was untersucht die <b>Satzlehre</b>?',['wie Wörter zu Sätzen werden','wie man Wörter schreibt','wie man Gedichte liest','wie man Geschichten erzählt'],'wie Wörter zu Sätzen werden','Satzlehre: Satzglieder, Satzarten, Haupt- und Nebensatz.','sg1',1],
['Wo gehört «Nomen» hin?',['Wortlehre','Satzlehre','beides','keines'],'Wortlehre','Nomen ist eine Wortart.','sg1',1],
['Wo gehört «Subjekt» hin?',['Satzlehre','Wortlehre','beides','keines'],'Satzlehre','Subjekt ist ein Satzglied.','sg1',1],
['Wo gehört «Verb» hin?',['Wortlehre','Satzlehre','beides','keines'],'Wortlehre','Verb ist eine Wortart.','sg1',1],
['Wo gehört «Prädikat» hin?',['Satzlehre','Wortlehre','beides','keines'],'Satzlehre','Prädikat ist ein Satzglied.','sg1',1],
['Wo gehört «Adjektiv» hin?',['Wortlehre','Satzlehre','beides','keines'],'Wortlehre','Adjektiv ist eine Wortart.','sg1',1],
['Wo gehört «Objekt» hin?',['Satzlehre','Wortlehre','beides','keines'],'Satzlehre','Objekt ist ein Satzglied.','sg1',1],
['Wo gehört «Nebensatz» hin?',['Satzlehre','Wortlehre','beides','keines'],'Satzlehre','Nebensatz ist eine Satzart.','sg1',1],
['Wo gehört «Pronomen» hin?',['Wortlehre','Satzlehre','beides','keines'],'Wortlehre','Pronomen ist eine Wortart.','sg1',1],
['Ein Satzglied kann aus <b>einem oder mehreren</b> Wörtern bestehen.<br>Wie viele Satzglieder hat: «Der kleine Hund bellt laut.»?',['3','4','2','5'],'3','Der kleine Hund · bellt · laut.','sg2',1],
['Wie viele Satzglieder hat: «Anna liest ein Buch.»?',['3','4','2','1'],'3','Anna · liest · ein Buch.','sg2',1],
['Wie viele Satzglieder hat: «Gestern spielte Tim im Garten Fussball.»?',['5','4','3','6'],'5','Gestern · spielte · Tim · im Garten · Fussball.','sg2',2],
['Wie viele Satzglieder hat: «Mein Bruder schenkt mir heute ein Buch.»?',['5','4','6','3'],'5','Mein Bruder · schenkt · mir · heute · ein Buch.','sg2',2],
['Wie viele Satzglieder hat: «Es regnet.»?',['2','1','3','4'],'2','Es · regnet.','sg2',1],
['Wie viele <b>Wörter</b> hat: «Der kleine Hund bellt laut.»?',['5','3','4','6'],'5','Der · kleine · Hund · bellt · laut.','sg2',1],
['Was ist ein <b>Satzglied</b>?',['ein Wort oder eine Wortgruppe, die man im Satz zusammen verschiebt','ein einzelnes Wort','ein Satzzeichen','ein Buchstabe'],'ein Wort oder eine Wortgruppe, die man im Satz zusammen verschiebt','Mit der Verschiebeprobe findest du die Satzglieder.','sg2',2],
['Was braucht ein vollständiger Satz?',['Wortgruppe mit Verb in der Personalform und Subjekt','Wortgruppe ohne Verb','ein einzelnes Wort','eine Überschrift'],'Wortgruppe mit Verb in der Personalform und Subjekt','Ein vollständiger Satz hat ein Prädikat und ein Subjekt.','sg3',2],
['Welche Wortgruppe ist ein <b>vollständiger Satz</b>?',['Anna lacht.','Der grosse Hund','Auf dem Tisch','Gestern Abend'],'Anna lacht.','Subjekt «Anna» und Prädikat «lacht».','sg3',1],
['Welche Wortgruppe ist ein <b>vollständiger Satz</b>?',['Wir spielen Fussball.','Der alte Mann','Im Park','Mit dem Bus'],'Wir spielen Fussball.','Hier gibt es Subjekt und Prädikat.','sg3',1],
['Welche Wortgruppe ist <b>kein</b> Satz?',['Im grossen Garten','Es regnet.','Komm her!','Hilfe!'],'Im grossen Garten','Es fehlt das Verb in der Personalform.','sg3',2],
['Welches Satzzeichen steht am Ende eines Aussagesatzes?',['Punkt','Fragezeichen','Ausrufezeichen','Komma'],'Punkt','Aussagesätze enden mit einem Punkt.','sg3',1],
['Welches Wort ist die <b>Wortart</b>, welches das <b>Satzglied</b>? «Hund» ist …',['Wortart: Nomen · Satzglied: z. B. Subjekt','Wortart: Subjekt','Wortart: Prädikat','Wortart: Objekt'],'Wortart: Nomen · Satzglied: z. B. Subjekt','Eine Wortart sagt, was ein Wort ist. Ein Satzglied sagt, welche Aufgabe es im Satz hat.','sg2',2],
['Bei «Der Hund bellt.» ist «bellt» …',['Wortart: Verb · Satzglied: Prädikat','Wortart: Nomen · Satzglied: Subjekt','Wortart: Adjektiv · Satzglied: Objekt','Wortart: Partikel · Satzglied: Subjekt'],'Wortart: Verb · Satzglied: Prädikat','Das Verb bildet das Prädikat.','sg2',2],
['Der Satz «Anna liest ein Buch.» hat welche Teile?',['Subjekt · Prädikat · Objekt','Subjekt · Subjekt · Prädikat','Prädikat · Prädikat · Objekt','Objekt · Objekt · Subjekt'],'Subjekt · Prädikat · Objekt','Anna (Subjekt) · liest (Prädikat) · ein Buch (Objekt).','sg2',2]
];
A.forEach(a=>task.push({typ:'wissen',stufe:a[5],lv:1,cats:[a[4]],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

const Z=[
['Tippe das <b>Verb</b> an: «Anna liest ein Buch.»',['Anna','liest','ein','Buch'],'liest','«liest» ist das Verb (Prädikat).',1],
['Tippe das <b>Nomen</b> an: «Der Hund bellt laut.»',['Der','Hund','bellt','laut'],'Hund','«Hund» ist ein Nomen.',1],
['Tippe das <b>Adjektiv</b> an: «Das rote Auto fährt schnell.»',['Das','rote','Auto','fährt'],'rote','«rote» beschreibt das Auto.',2],
['Tippe das <b>Partikel</b> an: «Wir spielen draussen.»',['Wir','spielen','draussen','–'],'draussen','«draussen» ist ein Adverb (Partikel).',2],
['Tippe das <b>Pronomen</b> an: «Er kauft Brot.»',['Er','kauft','Brot'],'Er','«Er» ersetzt ein Nomen.',1]
];
Z.forEach(z=>task.push({typ:'wort',stufe:z[4],lv:1,cats:['sg2'],prompt:z[0],opts:z[1].filter(x=>x!=='–'),answer:z[2],why:z[3]}));


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Der Hund bellt.", "2", [], false, "Der Hund | bellt."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Lena lacht.", "2", [], false, "Lena | lacht."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Tim liest ein Buch.", "3", [], false, "Tim | liest | ein Buch."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Die Katze schläft auf dem Sofa.", "3", [], false, "Die Katze | schläft | auf dem Sofa."], ["zaehlen", 2, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Am Morgen isst Lena ein Brot.", "4", [], false, "Am Morgen | isst | Lena | ein Brot."], ["zaehlen", 2, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Gestern habe ich meinen Freund besucht.", "4", [], false, "Gestern | habe besucht | ich | meinen Freund. «habe besucht» ist ein Satzglied."], ["zaehlen", 3, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Im Sommer fahren wir mit dem Zug nach Italien.", "5", [], false, "Im Sommer | fahren | wir | mit dem Zug | nach Italien."], ["zaehlen", 3, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Nach der Schule spielt Tim mit seinen Freunden Fussball.", "5", [], false, "Nach der Schule | spielt | Tim | mit seinen Freunden | Fussball."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'unterschied',title:'Wortlehre und Satzlehre',short:'Unterschied',min:8,note:'Zwei Blickwinkel auf denselben Satz: Wortlehre = einzelne Wörter, Satzlehre = Wortgruppen und ihre Aufgabe. Beispielsatz an die Wandtafel und zweimal bestimmen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Wortlehre</h3><p>Wir untersuchen <b>einzelne Wörter</b>: Was für ein Wort ist das?</p><p>Der kleine Hund bellt laut.</p><p>Artikel · Adjektiv · Nomen · Verb · Adverb</p></div>'+
 '<div class="card"><h3>Satzlehre</h3><p>Wir untersuchen <b>Satzglieder</b>: Welche Aufgabe hat die Wortgruppe im Satz?</p><p>[Der kleine Hund] [bellt] [laut].</p><p>Subjekt · Prädikat · Adverbiale</p></div></div>'+
 '<div class="callout">Ein Satzglied kann aus <b>mehreren Wörtern</b> bestehen: «Der kleine Hund» ist <b>ein</b> Satzglied (aber vier Wörter).</div>'},
{id:'satz',title:'Was ist ein Satz?',short:'Satz',min:6,note:'Ein Satz hat mindestens ein Subjekt und ein Prädikat, ausser bei Ausrufen (Hilfe!) und Aufforderungen (Komm!).',
 html:()=>'<div class="card"><h3>Ein Satz …</h3><ul class="steps"><li>hat ein <b>Prädikat</b> (Verb in der Personalform),</li><li>meist auch ein <b>Subjekt</b> (Wer oder was?),</li><li>beginnt <b>gross</b> und endet mit einem <b>Satzzeichen</b>.</li></ul></div>'+
 '<div class="grid2" style="margin-top:.8rem"><div class="card"><h3>Ein Satz</h3><p>Anna lacht.</p><p>Wir spielen Fussball.</p></div><div class="card"><h3>Kein Satz</h3><p>Im grossen Garten</p><p>Der alte Mann</p></div></div>'},
{id:'glieder',title:'Die Satzglieder im Überblick',short:'Satzglieder',min:10,note:'Hier nur ein Überblick. Details folgen im Kapitel «Verschiebeprobe». Farbcode (blau, rot, grün, orange, violett, türkis) wird dort eingeführt.',
 html:()=>T(['Satzglied','Frage','Beispiel'],[['Subjekt','Wer oder was?','<b>Der Hund</b> bellt.'],['Prädikat','Was geschieht?','Der Hund <b>bellt</b>.'],['Akkusativobjekt','Wen oder was?','Anna liest <b>ein Buch</b>.'],['Dativobjekt','Wem?','Er hilft <b>dem Freund</b>.'],['Adverbiale Bestimmung','Wo? Wann? Wie? Warum?','Er kommt <b>heute</b>.']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Verwechslung Wortart/Satzglied häufig. Zwei Fragen stellen: Was für ein Wort? Welche Aufgabe im Satz?',
 html:()=>'<div class="grid3">'+[
  ['1 · Wortart ≠ Satzglied','Hund ist ein Nomen (Wortart) und kann Subjekt sein (Satzglied).','Zwei verschiedene Fragen.'],
  ['2 · Mehrere Wörter, ein Glied','«Der kleine Hund» ist ein Satzglied.','Beim Verschieben bleibt es zusammen.'],
  ['3 · Prädikat nicht immer ein Wort','«Er hat gestern gelacht.» Prädikat: hat … gelacht.','Zwei Teile des Verbs.'],
  ['4 · Kein Satz ohne Verb','«Im Garten» ist kein Satz.','Es fehlt ein Prädikat.'],
  ['5 · Satzzeichen','Aussage: Punkt · Frage: ? · Aufforderung: !','Der Satz endet immer mit einem Satzzeichen.'],
  ['6 · Gross am Satzanfang','«Der Hund bellt.»','Das erste Wort eines Satzes schreibt man gross.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('wissen,wort')}
];
const EX=[
 ['Wie viele Wörter und wie viele Satzglieder hat: «Der kleine Hund bellt laut.»?','5 Wörter · 3 Satzglieder',1],
 ['Ist «Im Garten» ein Satz?','Nein, es fehlt ein Prädikat.',1],
 ['Gehört «Subjekt» zur Wortlehre oder zur Satzlehre?','Zur Satzlehre.',1],
 ['Gib bei «Anna liest ein Buch.» Wortart und Satzglied von «liest» an.','Wortart: Verb · Satzglied: Prädikat',1],
 ['Schreibe einen Satz mit drei Satzgliedern.','Beispiel: Tim spielt Fussball.',2],
 ['Erkläre den Unterschied zwischen Wortart und Satzglied.','Wortart: Was ist das Wort? Satzglied: Welche Aufgabe hat es im Satz?',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Wortlehre','Wortarten: Nomen, Verb, Adjektiv, Pronomen, Partikel.'],['Satzlehre','Satzglieder: Subjekt, Prädikat, Objekte, Adverbiale.'],['Satzglied','Ein Wort oder mehrere Wörter, die beim Umstellen zusammenbleiben.'],['Satz','Hat ein Prädikat, meist ein Subjekt und ein Satzzeichen am Ende.']]);
GT.chapter({id:'wl-sl',teil:'satz',nr:1,title:'Wortlehre und Satzlehre',big:'Wörter und Sätze untersuchen',desc:'Wortart oder Satzglied: was ist der Unterschied?',
 ex:'«[Der kleine Hund] ['+mk('verb','bellt')+'] [laut].»',
 goals:['Ich unterscheide Wortlehre und Satzlehre.','Ich erkenne, wann eine Wortgruppe ein Satz ist.','Ich zähle Wörter und Satzglieder.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{
  zaehlen:{icon:'🔢',label:'Satzglieder zählen',short:'Wie viele Satzglieder hat der Satz?',instr:'Schreibe die Zahl.',hint:'Mache die Verschiebeprobe: Was lässt sich zusammen verschieben?',ref:'glieder'},
wissen:{label:'Wissen',short:'Wortlehre oder Satzlehre',instr:'Wähle die richtige Antwort.',hint:'Wortart = Was ist das Wort? Satzglied = Welche Aufgabe hat es?',ref:'unterschied'},
  wort:{label:'Wortart bestimmen',short:'Einzelne Wörter bestimmen',instr:'Tippe das richtige Wort an.',hint:'Wortarten: Nomen, Verb, Adjektiv, Pronomen, Partikel.',ref:'unterschied'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
