/* Kapitel Satzlehre 1: Wortlehre und Satzlehre. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Wort oder Satz',sg2:'Wortart oder Satzglied',sg3:'Satz erkennen',sg4:'Fachbegriffe'};
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
['Wo gehört «Nebensatz» hin?',['Satzlehre','Wortlehre','beides','keines'],'Satzlehre','Nebensatz ist ein Teilsatz. Er gehört zur Satzlehre.','sg1',1],
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


/* ---- NEU: Morphologie und Syntax ---- */
const A2=[
['Wie heisst die <b>Wortlehre</b> mit dem Fachwort?',['Morphologie','Syntax','Phonetik','Etymologie'],'Morphologie','Morphologie = Lehre von den Wörtern und ihren Formen.','sg4',1],
['Wie heisst die <b>Satzlehre</b> mit dem Fachwort?',['Syntax','Morphologie','Phonetik','Semantik'],'Syntax','Syntax = Lehre vom Bau der Sätze.','sg4',1],
['Zu welchem Bereich gehört die Frage: «Welche <b>Wortart</b> ist «schnell»?»',['Wortlehre (Morphologie)','Satzlehre (Syntax)','beiden','keinem'],'Wortlehre (Morphologie)','Die Wortart bestimmt man beim einzelnen Wort.','sg1',1],
['Zu welchem Bereich gehört die Frage: «Welches <b>Satzglied</b> ist «dem Lehrer»?»',['Satzlehre (Syntax)','Wortlehre (Morphologie)','beiden','keinem'],'Satzlehre (Syntax)','Satzglieder bestimmt man im ganzen Satz.','sg1',1],
['Zu welchem Bereich gehört die Frage: «Welches <b>Geschlecht</b> hat das Nomen «Handy»?»',['Wortlehre (Morphologie)','Satzlehre (Syntax)','beiden','keinem'],'Wortlehre (Morphologie)','Geschlecht, Fall und Zahl gehören zur Form des Wortes.','sg1',2],
['Zu welchem Bereich gehört die Frage: «Wie viele <b>Satzglieder</b> hat der Satz?»',['Satzlehre (Syntax)','Wortlehre (Morphologie)','beiden','keinem'],'Satzlehre (Syntax)','Satzglieder zählt man im Satz.','sg1',1],
['Zu welchem Bereich gehört die Frage: «In welcher <b>Zeitform</b> steht das Verb?»',['Wortlehre (Morphologie)','Satzlehre (Syntax)','beiden','keinem'],'Wortlehre (Morphologie)','Die Zeitform ist eine Form des Wortes.','sg1',2],
['Zu welchem Bereich gehört die Frage: «Ist der Satz ein <b>Hauptsatz</b> oder ein <b>Nebensatz</b>?»',['Satzlehre (Syntax)','Wortlehre (Morphologie)','beiden','keinem'],'Satzlehre (Syntax)','Haupt- und Nebensatz sind Teile des Satzbaus.','sg1',2],
['Zu welchem Bereich gehört die Frage: «Welche <b>Steigerungsform</b> hat «gross»?»',['Wortlehre (Morphologie)','Satzlehre (Syntax)','beiden','keinem'],'Wortlehre (Morphologie)','Steigerung ist eine Formveränderung des Adjektivs.','sg1',2],
['Zu welchem Bereich gehört die Frage: «Steht das Prädikat an der <b>zweiten Stelle</b>?»',['Satzlehre (Syntax)','Wortlehre (Morphologie)','beiden','keinem'],'Satzlehre (Syntax)','Die Stellung im Satz gehört zum Satzbau.','sg1',2],
['Was untersucht die <b>Morphologie</b>?',['die Form und Wortart einzelner Wörter','den Bau von Sätzen','die Aussprache','die Rechtschreibung'],'die Form und Wortart einzelner Wörter','Morphologie = Wortlehre.','sg4',2],
['Was untersucht die <b>Syntax</b>?',['wie Wörter zu Sätzen zusammengebaut sind','wie Wörter klingen','woher Wörter kommen','wie Wörter geschrieben werden'],'wie Wörter zu Sätzen zusammengebaut sind','Syntax = Satzlehre.','sg4',2]
];
A2.forEach(a=>task.push({typ:'wissen',stufe:a[5],lv:a[5]===3?2:1,cats:[a[4]],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));
const FB2=[
["fach",1,"sg4","Wie heisst die Wortlehre mit dem Fachwort?","Die Wortlehre heisst auch …","Morphologie",[],true,"Morphologie = Lehre von den Wörtern und ihren Formen."],
["fach",1,"sg4","Wie heisst die Satzlehre mit dem Fachwort?","Die Satzlehre heisst auch …","Syntax",[],true,"Syntax = Lehre vom Satzbau."],
["fach",2,"sg4","Wie heisst die Einheit, die man beim Umstellen eines Satzes zusammen verschiebt?","Man nennt sie …","Satzglied",["Das Satzglied"],true,"Satzglieder bleiben beim Umstellen zusammen."]
];
FB2.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Der Hund bellt.", "2", [], false, "Der Hund | bellt."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Lena lacht.", "2", [], false, "Lena | lacht."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Tim liest ein Buch.", "3", [], false, "Tim | liest | ein Buch."], ["zaehlen", 1, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Die Katze schläft auf dem Sofa.", "3", [], false, "Die Katze | schläft | auf dem Sofa."], ["zaehlen", 2, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Am Morgen isst Lena ein Brot.", "4", [], false, "Am Morgen | isst | Lena | ein Brot."], ["zaehlen", 2, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Gestern habe ich meinen Freund besucht.", "4", [], false, "Gestern | habe besucht | ich | meinen Freund. «habe besucht» ist ein Satzglied."], ["zaehlen", 3, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Im Sommer fahren wir mit dem Zug nach Italien.", "5", [], false, "Im Sommer | fahren | wir | mit dem Zug | nach Italien."], ["zaehlen", 3, "sg2", "Wie viele Satzglieder hat der Satz? Schreibe die Zahl.", "Nach der Schule spielt Tim mit seinen Freunden Fussball.", "5", [], false, "Nach der Schule | spielt | Tim | mit seinen Freunden | Fussball."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---- NEU: Satz und Verb ---- */
const A3=[
['Welches Wort ist die <b>Personalform</b>? «Die Kinder spielen draussen.»',['spielen','Kinder','draussen','Die'],'spielen','«spielen» richtet sich nach «die Kinder» (Mehrzahl).','sg3',1],
['Welches Wort ist die <b>Personalform</b>? «Anna lacht laut.»',['lacht','Anna','laut'],'lacht','Zu «Anna» passt «lacht» (er/sie/es).','sg3',1],
['Welches Wort ist die <b>Personalform</b>? «Wir gehen heute ins Kino.»',['gehen','Wir','heute','Kino'],'gehen','Zu «wir» passt «gehen».','sg3',1],
['Welches Wort ist die <b>Personalform</b>? «Du hast gestern gewonnen.»',['hast','gewonnen','Du','gestern'],'hast','«hast» ändert sich mit der Person (ich habe, du hast). «gewonnen» ändert sich nicht.','sg3',2],
['Was ist der <b>Infinitiv</b> von «sie lacht»?',['lachen','gelacht','lacht','lachte'],'lachen','Der Infinitiv ist die Grundform, wie im Wörterbuch.','sg3',1],
['Was ist der <b>Infinitiv</b> von «wir spielten»?',['spielen','gespielt','spielte','spielst'],'spielen','Der Infinitiv endet meist auf -en.','sg3',1],
['Was ist der <b>Infinitiv</b> von «du liest»?',['lesen','gelesen','liest','las'],'lesen','Grundform: lesen.','sg3',2],
['Woran erkennst du die <b>Personalform</b>?',['Sie ändert sich mit der Person: ich lache, du lachst.','Sie endet immer auf -en.','Sie steht immer am Schluss.','Sie wird grossgeschrieben.'],'Sie ändert sich mit der Person: ich lache, du lachst.','Die Personalform passt sich der Person an. Der Infinitiv bleibt gleich.','sg3',1],
['Welcher Satz hat <b>keine Personalform</b>?',['Im grossen Garten','Es regnet.','Komm her!','Wir lachen.'],'Im grossen Garten','Ohne Personalform ist es kein vollständiger Satz.','sg3',1],
['Welche Wortgruppe ist <b>kein Satz</b>, weil das Verb fehlt?',['Der alte Mann im Park','Der alte Mann sitzt im Park.','Sitzt der alte Mann im Park?','Setz dich in den Park!'],'Der alte Mann im Park','Es fehlt die Personalform des Verbs.','sg3',1],
['Wie viele Personalformen hat der Satz? «Anna lacht und Tim weint.»',['2','1','3','4'],'2','lacht · weint. Jede Personalform gehört zu einem eigenen Satzteil.','sg3',3],
['«Anna <b>hat</b> gestern <b>gelacht</b>.» Welches Wort ist die Personalform?',['hat','gelacht','gestern','Anna'],'hat','«hat» ändert sich mit der Person (ich habe, du hast). «gelacht» bleibt gleich.','sg3',2],
['Was ist <b>kein</b> Merkmal eines Satzes?',['Er besteht aus nur einem Wort.','Er enthält eine Personalform.','Er beginnt mit einem Grossbuchstaben.','Er endet mit einem Satzzeichen.'],'Er besteht aus nur einem Wort.','Ein vollständiger Satz braucht mindestens eine Personalform und meist ein Subjekt.','sg3',2]
];
A3.forEach(a=>task.push({typ:'wissen',stufe:a[5],lv:a[5]===3?2:1,cats:[a[4]],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));
[
["fach",1,"sg4","Das konjugierte Verb heisst mit dem Fachwort …","Das Verb, das sich nach der Person richtet, heisst …","Personalform",["Die Personalform"],true,"Personalform = Verb, das sich nach Person und Zahl richtet."],
["fach",1,"sg4","Die Grundform des Verbs heisst …","Die Grundform des Verbs heisst …","Infinitiv",["Der Infinitiv"],true,"Infinitiv = Grundform (lachen, spielen)."]
].forEach(r=>task.push({typ:r[0],stufe:r[1],lv:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'unterschied',title:'Unterschied: Wortlehre und Satzlehre',short:'Unterschied',min:10,note:'Einstieg in die Satzlehre: Zwei Blickwinkel auf denselben Satz. Wortlehre (Morphologie) fragt nach dem einzelnen Wort und seiner Form. Satzlehre (Syntax) fragt nach dem Bau des Satzes und den Satzgliedern.',
 html:()=>'<div class="grid2"><div class="card"><h3>Wortlehre (Morphologie)</h3><p>Wir untersuchen <b>einzelne Wörter</b> und ihre Form: Was für ein Wort ist das?</p><p>Der kleine Hund bellt laut.</p><p class="muted">Wortart, Geschlecht, Fall, Zahl, Zeitform, Steigerung.</p></div>'+
 '<div class="card"><h3>Satzlehre (Syntax)</h3><p>Wir untersuchen den <b>Bau des Satzes</b>: Welche Aufgabe haben die Wortgruppen?</p><p>[Der kleine Hund] [bellt] [laut].</p><p class="muted">Satzglieder, Satzarten, Haupt- und Nebensatz.</p></div></div>'+
 T(['Frage','Gehört zur …'],[['Welche Wortart ist «schnell»?','Wortlehre'],['Welches Geschlecht hat «das Handy»?','Wortlehre'],['In welcher Zeitform steht «sie lachte»?','Wortlehre'],['Welches Satzglied ist «dem Lehrer»?','Satzlehre'],['Wie viele Satzglieder hat der Satz?','Satzlehre'],['Ist es ein Haupt- oder ein Nebensatz?','Satzlehre']])+
 '<div class="callout">Ein Satzglied kann aus <b>mehreren Wörtern</b> bestehen: «Der kleine Hund» ist <b>ein</b> Satzglied (aber drei Wörter).</div>'},
{id:'satz',title:'Was ist ein Satz?',short:'Satz',min:12,note:'Ein Satz teilt etwas Vollständiges mit. Vier Merkmale: Personalform, Subjekt (wer oder was handelt), sinnvolle Aussage, Grossbuchstabe und Satzzeichen. Das Verb ist das Herz des Satzes: Ohne Personalform gibt es keinen Satz. Ausnahmen sind Ausrufe («Hilfe!») und Wörter wie «Danke!». Gemeinsam mit Beispielen an der Tafel sammeln: Satz oder Nicht-Satz?',
 html:()=>'<div style="display:flex;gap:.8rem;align-items:center;padding:.8rem 1rem;border-radius:12px;background:#fef3c7;border:2px solid #d97706;color:#78350f"><span style="font-size:2.2rem">💬</span><div><b style="font-size:1.15rem">Ein Satz teilt etwas Vollständiges mit.</b><br>Man kann ihn verstehen, ohne etwas zu ergänzen.</div></div>'+
 '<h3 style="margin:1rem 0 .4rem">Vier Merkmale</h3><div class="grid2">'+[
  ['f-verb','❤️','1 · Eine Personalform','Das Verb ist das <b>Herz</b> des Satzes. Es sagt, was geschieht. Die Personalform richtet sich nach der Person: ich lache, du lachst, wir lachen.'],
  ['f-nomen','👤','2 · Wer oder was?','Im Satz steht, <b>wer oder was</b> etwas tut: «<b>Anna</b> lacht.» Dieser Teil heisst Subjekt. Bei Aufforderungen wie «Komm her!» ist er mitgedacht (du).'],
  ['f-adj','✅','3 · Ein vollständiger Sinn','Der Satz ist eine <b>Aussage</b>, eine <b>Frage</b> oder eine <b>Aufforderung</b>. Man braucht keine weiteren Wörter, um ihn zu verstehen.'],
  ['f-part','🔠','4 · Gross und Satzzeichen','Das erste Wort schreibt man <b>gross</b>. Am Schluss steht ein <b>Punkt</b>, ein <b>Fragezeichen</b> oder ein <b>Ausrufezeichen</b>.']
 ].map(x=>'<div class="card f-'+x[0].slice(2)+'" style="border-left:6px solid var(--c);background:var(--b);color:var(--t)"><h3 style="margin:0 0 .3rem;color:var(--t)">'+x[1]+' '+x[2]+'</h3><p style="margin:0">'+x[3]+'</p></div>').join('')+'</div>'+
 '<h3 style="margin:1rem 0 .4rem">Satz oder kein Satz?</h3>'+
 T(['Wortgruppe','Satz?','Warum?'],[
  ['Anna <b>lacht</b>.','✅ ja','Personalform «lacht» und wer lacht: Anna.'],
  ['Wir <b>spielen</b> Fussball.','✅ ja','Personalform «spielen», Subjekt «wir».'],
  ['<b>Spielst</b> du heute Fussball?','✅ ja','Auch eine Frage ist ein Satz.'],
  ['<b>Komm</b> her!','✅ ja','Aufforderung: Personalform «komm», gemeint ist «du».'],
  ['Im grossen Garten','❌ nein','Es fehlt das Verb in der Personalform.'],
  ['Der alte Mann im Park','❌ nein','Es fehlt das Verb: Was tut der Mann?'],
  ['Gestern Abend gelacht','❌ nein','«gelacht» ist keine Personalform: Es fehlt «hat» und wer gelacht hat.'],
  ['Hilfe!','⚠️ Ausnahme','Ausruf mit einem Wort. Er teilt etwas mit, ist aber kein vollständiger Satz.']])+
 '<div class="callout">🔎 <b>Merke:</b> Fehlt die Personalform, ist es kein Satz. Das Verb ist das Wichtigste.</div>'},
{id:'verb',title:'Das Verb im Satz',short:'Verb',min:12,note:'Das Verb genauer anschauen: Infinitiv (Grundform) und Personalform (richtet sich nach der Person). Personenprobe: Setze eine andere Person ein, das Wort, das sich verändert, ist die Personalform. Bei zusammengesetzten Formen (hat gelacht) ist nur der erste Teil die Personalform. Hier noch keine Satzglieder benennen.',
 html:()=>'<div style="display:flex;gap:.8rem;align-items:center;padding:.8rem 1rem;border-radius:12px;background:var(--b);border:2px solid var(--c);color:var(--t)" class="f-verb"><span style="font-size:2.2rem">⚙️</span><div><b style="font-size:1.15rem">Das Verb ist das Herz des Satzes.</b><br>Es sagt, was geschieht: eine Tätigkeit, ein Vorgang oder ein Zustand.</div></div>'+
 '<div class="grid3" style="margin-top:.8rem">'+[
  ['🏃','Tätigkeit','laufen, schreiben, lachen, spielen'],['🌧️','Vorgang','regnen, wachsen, schmelzen'],['🛋️','Zustand','sein, bleiben, liegen, wohnen']
 ].map(x=>'<div class="card f-verb" style="text-align:center;background:var(--b);color:var(--t)"><div style="font-size:1.8rem">'+x[0]+'</div><b>'+x[1]+'</b><p class="muted" style="margin:.2rem 0 0">'+x[2]+'</p></div>').join('')+'</div>'+
 '<h3 style="margin:1rem 0 .4rem">Infinitiv und Personalform</h3>'+
 '<div class="grid2"><div class="card"><h3>📖 Infinitiv (Grundform)</h3><p>So steht das Verb im Wörterbuch. Es ändert sich nie.</p><p><span class="tag f-part">lachen</span> <span class="tag f-part">spielen</span> <span class="tag f-part">lesen</span></p></div>'+
 '<div class="card"><h3>🎯 Personalform</h3><p>Sie <b>richtet sich nach der Person</b> (und der Zahl) und ändert sich.</p><p><span class="tag f-verb">lache</span> <span class="tag f-verb">lachst</span> <span class="tag f-verb">lacht</span></p></div></div>'+
 T(['Person','Infinitiv: lachen','Personalform'],[['ich','lachen','ich <b>lache</b>'],['du','lachen','du <b>lachst</b>'],['er / sie / es','lachen','sie <b>lacht</b>'],['wir','lachen','wir <b>lachen</b>'],['ihr','lachen','ihr <b>lacht</b>'],['sie (Mehrzahl)','lachen','sie <b>lachen</b>']])+
 '<h3 style="margin:1rem 0 .4rem">So findest du die Personalform</h3>'+
 '<ol class="steps"><li><b>Personenprobe:</b> Setze eine andere Person ein. «Die Kinder lachen.» → «Ich lache.» Das Wort, das sich ändert, ist die Personalform.</li><li><b>Zeitprobe:</b> Setze eine andere Zeit ein. «Anna lacht.» → «Anna lachte.» Auch hier ändert sich die Personalform.</li><li>Merke: Ein Verb in der Grundform («lachen») oder als Partizip («gelacht») ist <b>keine</b> Personalform.</li></ol>'+
 '<h3 style="margin:1rem 0 .4rem">Wenn das Verb aus mehreren Teilen besteht</h3>'+
 T(['Satz','Personalform','weiterer Verbteil'],[['Anna <b>lacht</b> laut.','lacht','–'],['Anna <b>hat</b> laut <b>gelacht</b>.','hat','gelacht (Partizip)'],['Anna <b>will</b> heute <b>lachen</b>.','will','lachen (Infinitiv)'],['Der Bus <b>fährt</b> früher <b>ab</b>.','fährt','ab (Verbzusatz)']])+
 '<div class="callout">🔎 <b>Merke:</b> Ein Satz hat mindestens eine <b>Personalform</b>. Weitere Verbteile stehen oft am Schluss. Alle gehören zum selben Verb.</div>'},
{id:'glieder',title:'Die Satzglieder im Überblick',short:'Satzglieder',min:10,note:'Hier nur ein Überblick. Details folgen in den Kapiteln «Die Verschiebeprobe» und «Die Satzglieder benennen». Farbcode (blau, rot, grün, orange, violett, türkis) wird dort eingeführt.',
 html:()=>T(['Satzglied','Frage','Beispiel'],[['Subjekt','Wer oder was?','<b>Der Hund</b> bellt.'],['Prädikat','Was geschieht?','Der Hund <b>bellt</b>.'],['Akkusativobjekt','Wen oder was?','Anna liest <b>ein Buch</b>.'],['Dativobjekt','Wem?','Er hilft <b>dem Freund</b>.'],['Präpositionalgefüge','beginnt mit einer Präposition','Sie spielen <b>im Garten</b>.'],['Adverbiale','einzelnes Wort: Wann? Wo?','Er kommt <b>heute</b>.']])},
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
 ['Gehört die Frage «Welche Wortart ist das Wort?» zur Wortlehre oder zur Satzlehre?','Zur Wortlehre (Morphologie).',1],
 ['Gehört die Frage «Wie ist der Satz gebaut?» zur Wortlehre oder zur Satzlehre?','Zur Satzlehre (Syntax).',1],
 ['Ist «Im Garten» ein Satz? Begründe.','Nein, es fehlt die Personalform des Verbs.',1],
 ['Unterstreiche die Personalform: «Die Kinder spielen draussen.»','spielen',1],
 ['Schreibe den Infinitiv: «sie lacht», «wir spielten», «du liest».','lachen · spielen · lesen',1],
 ['Setze ein: ich … , du … , wir … (lachen)','ich lache · du lachst · wir lachen',1],
 ['Warum ist «Der alte Mann im Park» kein Satz? Ergänze ihn zu einem Satz.','Es fehlt das Verb. Beispiel: Der alte Mann sitzt im Park.',2],
 ['Finde die Personalform und den weiteren Verbteil: «Anna hat gestern gelacht.»','Personalform: hat · weiterer Teil: gelacht',2],
 ['Schreibe selber drei Sätze: eine Aussage, eine Frage, eine Aufforderung. Markiere die Personalform.','Beispiel: Tim spielt Fussball. · Spielt Tim Fussball? · Spiel Fussball!',2]
];
const merk=()=>'<h3>🔤 Wortlehre und Satzlehre</h3>'+T(['Bereich','Fachwort','Frage','Beispiel'],[['Wortlehre','Morphologie','Was für ein Wort ist das? Welche Form hat es?','Wortart, Geschlecht, Fall, Zahl, Zeitform, Steigerung'],['Satzlehre','Syntax','Wie ist der Satz gebaut?','Satzglieder, Satzarten, Haupt- und Nebensatz']])+
 '<h3>💬 Was ist ein Satz?</h3><ul><li>Ein Satz hat eine <b>Personalform</b> (das Verb, das sich nach der Person richtet).</li><li>Es steht darin, <b>wer oder was</b> etwas tut (Subjekt).</li><li>Er ist eine <b>Aussage</b>, <b>Frage</b> oder <b>Aufforderung</b> mit vollständigem Sinn.</li><li>Das erste Wort schreibt man <b>gross</b>, am Schluss steht ein <b>Satzzeichen</b>.</li><li>Fehlt die Personalform, ist es <b>kein Satz</b> («Im grossen Garten»).</li></ul>'+
 T(['Wortgruppe','Satz?','Grund'],[['Anna lacht.','ja','Personalform «lacht»'],['Spielst du Fussball?','ja','Frage mit Personalform'],['Komm her!','ja','Aufforderung'],['Der alte Mann im Park','nein','Verb fehlt'],['Gestern Abend gelacht','nein','«gelacht» ist keine Personalform']])+
 '<h3>⚙️ Das Verb</h3>'+T(['Begriff','Bedeutung','Beispiel'],[['Infinitiv','Grundform, ändert sich nie','lachen, spielen'],['Personalform','richtet sich nach Person und Zahl','ich lache, du lachst, wir lachen'],['Partizip','Form für zusammengesetzte Zeiten','gelacht, gespielt'],['Verbzusatz','Teil, der am Schluss steht','Der Bus fährt früher <b>ab</b>.']])+
 '<h3>🔎 So findest du die Personalform</h3><ol><li>Personenprobe: Setze eine andere Person ein. Was sich ändert, ist die Personalform.</li><li>Zeitprobe: Setze eine andere Zeit ein. «lacht» wird «lachte».</li><li>Infinitiv und Partizip sind keine Personalformen.</li></ol>'+
 '<h3>⚠️ Satzglied und Wortart</h3><p>Die <b>Wortart</b> sagt, was für ein Wort es ist (Nomen, Verb …). Das <b>Satzglied</b> sagt, welche Aufgabe eine Wortgruppe im Satz hat. Ein Satzglied kann aus mehreren Wörtern bestehen: «Der kleine Hund» ist <b>ein</b> Satzglied.</p>';
GT.chapter({id:'wl-sl',teil:'satz',nr:1,title:'Wortlehre und Satzlehre',big:'Wörter und Sätze untersuchen',desc:'Wortart oder Satzglied: was ist der Unterschied?',
 ex:'«[Der kleine Hund] ['+mk('verb','bellt')+'] [laut].»',
 goals:['Ich erkläre, was die Wortlehre (Morphologie) und die Satzlehre (Syntax) untersuchen, und ordne Fragen dem richtigen Bereich zu.','Ich erkläre, was ein Satz ist: Er hat eine Personalform, sagt, wer oder was etwas tut, und endet mit einem Satzzeichen.','Ich erkenne die Personalform eines Verbs und unterscheide sie vom Infinitiv.','Ich entscheide, ob eine Wortgruppe ein Satz ist, und begründe es.'],
 liveCats:['sg1','sg3','sg4'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{
  zaehlen:{icon:'🔢',label:'Satzglieder zählen',short:'Wie viele Satzglieder hat der Satz?',instr:'Schreibe die Zahl.',hint:'Mache die Verschiebeprobe: Was lässt sich zusammen verschieben?',ref:'glieder'},
wissen:{label:'Wissen',short:'Wortlehre oder Satzlehre',instr:'Wähle die richtige Antwort.',hint:'Wortart = Was ist das Wort? Satzglied = Welche Aufgabe hat es?',ref:'unterschied'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Wortlehre = Morphologie, Satzlehre = Syntax.',ref:'unterschied'},
  wort:{label:'Wortart bestimmen',short:'Einzelne Wörter bestimmen',instr:'Tippe das richtige Wort an.',hint:'Wortarten: Nomen, Verb, Adjektiv, Pronomen, Partikel.',ref:'unterschied'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
