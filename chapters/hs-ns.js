/* Kapitel Satzlehre 5: Hauptsatz und Nebensatz. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Hauptsatz und Nebensatz',sg2:'Satzverbindung und Satzgefüge',sg3:'Einleitewörter',sg4:'Konjunktionen im Satz',sg5:'Fachbegriffe'};
const task=[];
const HN=['Hauptsatz','Nebensatz'];

/* Teilsatz bestimmen */
const Q=[
['Ich bleibe zu Hause, <b>weil ich krank bin</b>.',1,1,'Das Verb «bin» steht am Ende: Nebensatz.'],
['<b>Ich bleibe zu Hause</b>, weil ich krank bin.',0,1,'Das Verb «bleibe» steht an zweiter Stelle: Hauptsatz.'],
['<b>Der Hund bellt</b>, wenn jemand klingelt.',0,1,'Hauptsatz.'],
['Der Hund bellt, <b>wenn jemand klingelt</b>.',1,1,'Nebensatz mit «wenn», Verb am Ende.'],
['Ich weiss, <b>dass er kommt</b>.',1,1,'Nebensatz mit «dass».'],
['<b>Ich weiss</b>, dass er kommt.',0,1,'Hauptsatz.'],
['<b>Obwohl es regnet</b>, gehen wir hinaus.',1,1,'Nebensatz mit «obwohl».'],
['Obwohl es regnet, <b>gehen wir hinaus</b>.',0,1,'Hauptsatz.'],
['Sie lernt, <b>damit sie die Prüfung besteht</b>.',1,2,'Nebensatz mit «damit».'],
['<b>Sie lernt</b>, damit sie die Prüfung besteht.',0,2,'Hauptsatz.'],
['<b>Als wir ankamen</b>, war das Essen fertig.',1,2,'Nebensatz mit «als».'],
['Als wir ankamen, <b>war das Essen fertig</b>.',0,2,'Hauptsatz.'],
['Der Mann, <b>der dort steht</b>, ist mein Onkel.',1,2,'Relativsatz: Nebensatz.'],
['<b>Er ist mein Onkel</b>.',0,1,'Einfacher Hauptsatz.'],
['Ich gehe schlafen, <b>nachdem ich gegessen habe</b>.',1,2,'Nebensatz mit «nachdem».'],
['<b>Weil er müde war</b>, ging er früh ins Bett.',1,2,'Nebensatz mit «weil».'],
['Weil er müde war, <b>ging er früh ins Bett</b>.',0,2,'Hauptsatz: Verb steht an zweiter Stelle.'],
['Er sagt, <b>er habe keine Zeit</b>.',1,3,'Indirekte Rede ohne «dass»: Nebensatz. Hier steht das Verb ausnahmsweise nicht am Ende.'],
['Ich bleibe hier, <b>bis du kommst</b>.',1,2,'Nebensatz mit «bis».'],
['<b>Ich bleibe hier</b>, bis du kommst.',0,2,'Hauptsatz.']
];
Q.forEach(q=>task.push({typ:'teilsatz',stufe:q[2],lv:q[2]===3?2:1,cats:['sg1'],sent:q[0],opts:HN,answer:HN[q[1]],why:'<b>'+HN[q[1]]+'.</b> '+q[3]}));

/* Konjunktion erkennen */
const K=[
['Welches Wort leitet einen <b>Nebensatz</b> ein?',['weil','und','aber','oder'],'weil','weil, dass, obwohl, wenn, damit, als, nachdem leiten Nebensätze ein.','sg4',1],
['Welches Wort leitet einen <b>Nebensatz</b> ein?',['dass','denn','und','aber'],'dass','Auch «dass» leitet einen Nebensatz ein.','sg4',1],
['Welches Wort verbindet zwei <b>Hauptsätze</b>?',['und','weil','obwohl','damit'],'und','und, aber, oder, denn verbinden Hauptsätze.','sg4',1],
['Welches Wort verbindet zwei <b>Hauptsätze</b>?',['denn','weil','dass','wenn'],'denn','«denn» verbindet Hauptsätze (Verb bleibt an zweiter Stelle).','sg4',2],
['Wo steht das Verb nach «weil»?',['am Satzende','an zweiter Stelle','am Satzanfang','nach dem Subjekt'],'am Satzende','Im Nebensatz steht das Verb am Ende.','sg4',1],
['Wo steht das Verb nach «denn»?',['an zweiter Stelle','am Satzende','am Satzanfang','gar nicht'],'an zweiter Stelle','Nach «denn» folgt ein Hauptsatz.','sg4',2],
['Welcher Satz ist richtig?',['Ich bleibe, weil ich müde bin.','Ich bleibe, weil ich bin müde.','Ich bleibe, weil bin ich müde.','Ich bleibe, weil müde ich bin.'],'Ich bleibe, weil ich müde bin.','Das Verb steht im Nebensatz am Ende.','sg4',1],
['Welcher Satz ist richtig?',['Er sagt, dass er kommt.','Er sagt, dass kommt er.','Er sagt, dass er kommt er.','Er sagt dass er kommt.'],'Er sagt, dass er kommt.','Das Komma trennt den Nebensatz. Das Verb steht am Ende.','sg4',1],
['Welcher Satz ist richtig?',['Obwohl es regnet, gehen wir spazieren.','Obwohl es regnet, wir gehen spazieren.','Obwohl regnet es, gehen wir spazieren.','Obwohl es regnet gehen wir spazieren.'],'Obwohl es regnet, gehen wir spazieren.','Nebensatz (Verb am Ende), dann Hauptsatz (Verb vor dem Subjekt).','sg4',2],
['Aus «Ich bin müde. Ich gehe schlafen.» wird mit «weil» …',['Ich gehe schlafen, weil ich müde bin.','Ich gehe schlafen, weil bin ich müde.','Weil ich müde bin ich gehe schlafen.','Ich bin müde, weil ich gehe schlafen.'],'Ich gehe schlafen, weil ich müde bin.','Der Grund steht im Nebensatz.','sg4',2],
['Aus «Es regnet. Wir bleiben zu Hause.» wird mit «weil» …',['Wir bleiben zu Hause, weil es regnet.','Wir bleiben zu Hause, weil regnet es.','Weil es regnet wir bleiben zu Hause.','Es regnet, weil wir zu Hause bleiben.'],'Wir bleiben zu Hause, weil es regnet.','Der Grund steht im Nebensatz.','sg4',2]
];
K.forEach(k=>task.push({typ:'konj',stufe:k[5],lv:1,cats:[k[4]],prompt:k[0],opts:k[1],answer:k[2],why:k[3]}));


/* Satzverbindung / Satzgefüge */
const R=[
['Der Hund bellt, und die Katze schläft.','Satzverbindung',1,'Zwei Hauptsätze mit «und»: Satzverbindung.'],
['Ich bleibe zu Hause, weil ich krank bin.','Satzgefüge',1,'Hauptsatz + Nebensatz: Satzgefüge.'],
['Es regnet, aber wir gehen hinaus.','Satzverbindung',1,'Zwei Hauptsätze mit «aber»: Satzverbindung.'],
['Ich weiss, dass er kommt.','Satzgefüge',1,'Hauptsatz + Nebensatz: Satzgefüge.'],
['Anna lacht.','einfacher Satz',1,'Nur ein Hauptsatz: einfacher Satz.'],
['Wir spielen Fussball, denn es ist schön.','Satzverbindung',2,'Zwei Hauptsätze mit «denn»: Satzverbindung.'],
['Obwohl es regnet, gehen wir hinaus.','Satzgefüge',1,'Nebensatz + Hauptsatz: Satzgefüge.'],
['Tim kocht, Anna deckt den Tisch und Mia holt die Getränke.','Satzverbindung',2,'Mehrere Hauptsätze: Satzverbindung.'],
['Der Mann, der dort steht, ist mein Onkel.','Satzgefüge',2,'Hauptsatz mit eingeschobenem Relativsatz: Satzgefüge.']
];
R.forEach(r=>task.push({typ:'gefuege',stufe:r[2],lv:1,cats:['sg2'],sent:'«'+r[0]+'»',opts:['einfacher Satz','Satzverbindung','Satzgefüge'],answer:r[1],why:'<b>'+r[1]+'.</b> '+r[3]}));

/* Markieren: Nebensatz */
const M=[
['Ich bleibe zu Hause, *weil *ich *krank *bin.',1,'Nebensatz: weil ich krank bin.'],
['Ich weiss, *dass *er *kommt.',1,'Nebensatz: dass er kommt.'],
['*Obwohl *es *regnet, gehen wir hinaus.',1,'Nebensatz: Obwohl es regnet.'],
['Sie lernt, *damit *sie *die *Prüfung *besteht.',2,'Nebensatz: damit sie die Prüfung besteht.'],
['Der Mann, *der *dort *steht, ist mein Onkel.',2,'Relativsatz: der dort steht.'],
['Ich gehe schlafen, *nachdem *ich *gegessen *habe.',2,'Nebensatz: nachdem ich gegessen habe.']
];
M.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:1,cats:['sg1'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Wörter des Nebensatzes an.',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["verbinden", 1, "sg2", "Verbinde die Sätze mit «weil». Setze das Komma.", "Ich bleibe zu Hause. Es regnet.", "Ich bleibe zu Hause, weil es regnet.", [], false, "Nebensatz mit «weil»: Das Verb steht am Schluss."], ["verbinden", 2, "sg2", "Verbinde die Sätze mit «weil». Setze das Komma.", "Er lacht. Er hat einen Witz gehört.", "Er lacht, weil er einen Witz gehört hat.", [], false, "Nebensatz mit «weil»: Das Verb steht am Schluss."], ["verbinden", 1, "sg2", "Verbinde die Sätze mit «wenn». Setze das Komma.", "Wir gehen spazieren. Die Sonne scheint.", "Wir gehen spazieren, wenn die Sonne scheint.", [], false, "Nebensatz mit «wenn»: Das Verb steht am Schluss."], ["verbinden", 2, "sg2", "Verbinde die Sätze mit «weil». Setze das Komma.", "Sie lernt viel. Sie will die Prüfung bestehen.", "Sie lernt viel, weil sie die Prüfung bestehen will.", [], false, "Nebensatz mit «weil»: Das Verb steht am Schluss."], ["verbinden", 2, "sg2", "Verbinde die Sätze mit «dass». Setze das Komma.", "Ich weiss. Du hast recht.", "Ich weiss, dass du recht hast.", [], false, "Nebensatz mit «dass»: Das Verb steht am Schluss."], ["verbinden", 2, "sg2", "Verbinde die Sätze mit «weil». Setze das Komma.", "Tim ist müde. Er hat schlecht geschlafen.", "Tim ist müde, weil er schlecht geschlafen hat.", [], false, "Nebensatz mit «weil»: Das Verb steht am Schluss."], ["verbinden", 3, "sg2", "Verbinde die Sätze mit «sobald». Setze das Komma.", "Ich rufe dich an. Ich bin zu Hause.", "Ich rufe dich an, sobald ich zu Hause bin.", [], false, "Nebensatz mit «sobald»: Das Verb steht am Schluss."], ["verbinden", 1, "sg2", "Verbinde die Sätze mit «weil». Setze das Komma.", "Sie bleibt im Bett. Sie ist krank.", "Sie bleibt im Bett, weil sie krank ist.", [], false, "Nebensatz mit «weil»: Das Verb steht am Schluss."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---- NEU: Einleitewörter ---- */
const EW=['unterordnende Konjunktion','Relativpronomen oder Relativadverb','Fragewort'];
const E=[
['Ich weiss, <b>dass</b> du recht hast.',0,1,'«dass» ist eine unterordnende Konjunktion.'],
['Wir bleiben, <b>weil</b> es regnet.',0,1,'«weil» ist eine unterordnende Konjunktion.'],
['<b>Obwohl</b> er müde war, kam er mit.',0,1,'«obwohl» ist eine unterordnende Konjunktion.'],
['Das ist der Lehrer, <b>der</b> Mathe unterrichtet.',1,1,'«der» bezieht sich auf «Lehrer»: Relativpronomen.'],
['Das Buch, <b>das</b> ich lese, ist spannend.',1,1,'«das» bezieht sich auf «Buch»: Relativpronomen.'],
['Die Schüler, <b>die</b> zu spät kamen, mussten warten.',1,2,'«die» bezieht sich auf «Schüler»: Relativpronomen.'],
['Der Ort, <b>wo</b> wir uns treffen, ist neu.',1,2,'«wo» bezieht sich auf «Ort»: Relativadverb.'],
['Sag mir, <b>wann</b> du kommst.',2,1,'«wann» ist ein Fragewort. Der Nebensatz ist ein indirekter Fragesatz.'],
['Ich frage mich, <b>warum</b> er fehlt.',2,1,'«warum» ist ein Fragewort.'],
['Erkläre mir, <b>wie</b> das funktioniert.',2,2,'«wie» ist hier ein Fragewort.'],
['Weisst du, <b>ob</b> der Bus kommt?',0,2,'«ob» ist eine unterordnende Konjunktion (indirekte Ja-Nein-Frage).'],
['<b>Wenn</b> die Sonne scheint, gehen wir schwimmen.',0,1,'«wenn» ist eine unterordnende Konjunktion.'],
['Er fragt, <b>wer</b> das Fenster geöffnet hat.',2,2,'«wer» ist ein Fragewort.'],
['Die Aufgabe, <b>die</b> wir gestern lösten, war schwierig.',1,2,'«die» bezieht sich auf «Aufgabe»: Relativpronomen.'],
['Sie lernt, <b>damit</b> sie die Prüfung besteht.',0,2,'«damit» ist eine unterordnende Konjunktion.'],
['Ich weiss nicht, <b>was</b> du meinst.',2,3,'«was» ist hier ein Fragewort: «Was meinst du?»']
];
E.forEach(e=>task.push({typ:'einleit',stufe:e[2],lv:e[2]===3?2:1,cats:['sg3'],sent:e[0],opts:EW,answer:EW[e[1]],why:'<b>'+EW[e[1]]+'.</b> '+e[3]}));

const NS=[
['Wir gehen schwimmen, wenn die Sonne scheint.',1,1,'Nebensatz «wenn die Sonne scheint»: Verb am Ende.'],
['Die Geigen sind gestimmt, der Tanz kann losgehen.',0,1,'Zwei Hauptsätze (Satzverbindung): kein Nebensatz.'],
['Ich freue mich auf die Reise und bin schon ganz aufgeregt.',0,1,'Kein Einleitewort, beide Verbformen sind Personalformen: zwei Hauptsätze, zusammengezogen.'],
['Wir können heute nicht zur Schule kommen.',0,1,'Nur ein Hauptsatz: einfacher Satz.'],
['Der Mann, der dort steht, ist mein Onkel.',1,1,'Relativsatz «der dort steht» ist ein Nebensatz.'],
['Sie lernt viel und besteht die Prüfung.',0,1,'Zwei Hauptsätze mit gemeinsamem Subjekt: kein Nebensatz.'],
['Er fragt, wer das Fenster geöffnet hat.',1,1,'«wer das Fenster geöffnet hat» ist ein Nebensatz.'],
['Es regnet, aber wir gehen hinaus.',0,1,'Zwei Hauptsätze mit «aber»: kein Nebensatz.'],
['Weil es regnet, bleiben wir zu Hause.',1,1,'«Weil es regnet» ist ein Nebensatz.'],
['Der Bus kommt spät, denn der Verkehr ist dicht.',0,2,'«denn» verbindet Hauptsätze: kein Nebensatz.'],
['Falls es kalt wird, nimm die Jacke, die dort liegt.',1,3,'Zwei Nebensätze: «Falls es kalt wird» und «die dort liegt».'],
['Tim spielt Gitarre, Mia singt.',0,1,'Zwei Hauptsätze: kein Nebensatz.']
];
NS.forEach(n=>task.push({typ:'hatns',stufe:n[2],lv:n[2]===3?2:1,cats:['sg1'],sent:'«'+n[0]+'»',opts:['Ja','Nein'],answer:n[1]?'Ja':'Nein',why:'<b>'+(n[1]?'Ja':'Nein')+'.</b> '+n[3]}));

const WS=[
['Jeder einfache Satz ist ein …',['Hauptsatz','Nebensatz','Satzfragment','Teilsatz mit Einleitewort'],'Hauptsatz','Jeder einfache Satz ist ein Hauptsatz.','sg1',1],
['Der Nebensatz kommt nur vor im …',['zusammengesetzten Satz','einfachen Satz','Satzfragment','Ausruf'],'zusammengesetzten Satz','Der Nebensatz kann nur im zusammengesetzten Satz auftreten.','sg1',1],
['Ein Nebensatz ist …',['unselbständig und hat in der Regel eine eigene Personalform','selbständig und hat kein Prädikat','ein einzelnes Wort','immer ein Satzglied ohne Verb'],'unselbständig und hat in der Regel eine eigene Personalform','Auch der Nebensatz weist Prädikat, Subjekt und andere Satzglieder auf.','sg1',2],
['Wo steht die Personalform im Nebensatz?',['am Schluss','an zweiter Stelle','an erster Stelle','in der Mitte'],'am Schluss','Im Nebensatz steht das konjugierte Verb am Schluss.','sg1',1],
['Wo steht die Personalform im Aussage-Hauptsatz?',['an zweiter Stelle','am Schluss','an erster Stelle','an dritter Stelle'],'an zweiter Stelle','Im Hauptsatz steht sie an zweiter Stelle.','sg1',1],
['Ein Nebensatz ist meistens ein zum Satz erweitertes …',['Satzglied','Wort','Komma','Verb'],'Satzglied','Er hat im Satz die Aufgabe eines Satzglieds (z. B. Zeit oder Grund).','sg1',3],
['Wie viele Hauptsätze hat ein Satzgefüge mindestens?',['einen','keinen','zwei','drei'],'einen','Ein Satzgefüge besteht aus einem Hauptsatz und einem oder mehreren Nebensätzen.','sg2',2],
['Woraus besteht eine Satzverbindung?',['aus mindestens zwei Hauptsätzen','aus einem Hauptsatz und einem Nebensatz','aus einem Satzfragment','aus einem einfachen Satz'],'aus mindestens zwei Hauptsätzen','Satzverbindung: H + H.','sg2',1],
['Woraus besteht ein Satzgefüge?',['aus einem Hauptsatz und mindestens einem Nebensatz','aus zwei Hauptsätzen','aus einem Satzfragment','aus einem einfachen Satz'],'aus einem Hauptsatz und mindestens einem Nebensatz','Satzgefüge: H + N.','sg2',1],
['Welche Wörter leiten einen <b>Hauptsatz</b> ein (nebenordnende Konjunktionen)?',['und, aber, oder, denn','weil, dass, obwohl','der, die, das','wer, wann, warum'],'und, aber, oder, denn','Hauptsätze verbindet man mit nebenordnenden Konjunktionen.','sg4',1],
['Welche Wörter leiten einen <b>Nebensatz</b> ein?',['weil, dass, obwohl, wenn','und, aber, oder','denn, aber','sondern, doch'],'weil, dass, obwohl, wenn','Das sind unterordnende Konjunktionen.','sg4',1],
['Zwischen Haupt- und Nebensatz steht …',['ein Komma','ein Punkt','ein Doppelpunkt','nichts'],'ein Komma','Haupt- und Nebensatz trennt man mit einem Komma.','sg2',1],
['Ein Nebensatz beginnt meist mit einem …',['Einleitewort','Nomen','Verb','Ausrufezeichen'],'Einleitewort','Einleitewörter: Konjunktion, Relativpronomen, Fragewort.','sg3',1]
];
WS.forEach(w=>task.push({typ:'konj',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

const SV=[
["verbinden",1,"sg2","Verbinde die Sätze mit «und» zu einer Satzverbindung. Setze das Komma.","Tim spielt Gitarre. Mia singt.","Tim spielt Gitarre, und Mia singt.",["Tim spielt Gitarre und Mia singt."],false,"Zwei Hauptsätze mit «und»: Das Verb bleibt an zweiter Stelle."],
["verbinden",1,"sg2","Verbinde die Sätze mit «aber» zu einer Satzverbindung. Setze das Komma.","Ich wollte schwimmen. Das Wasser war zu kalt.","Ich wollte schwimmen, aber das Wasser war zu kalt.",[],false,"Vor «aber» steht ein Komma. Das Verb bleibt an zweiter Stelle."],
["verbinden",1,"sg2","Verbinde die Sätze mit «denn» zu einer Satzverbindung. Setze das Komma.","Wir bleiben zu Hause. Es regnet.","Wir bleiben zu Hause, denn es regnet.",[],false,"Nach «denn» folgt ein Hauptsatz: Das Verb steht an zweiter Stelle."],
["verbinden",2,"sg2","Verbinde die Sätze mit «oder» zu einer Satzverbindung. Setze das Komma.","Wir gehen ins Kino. Wir bleiben zu Hause.","Wir gehen ins Kino, oder wir bleiben zu Hause.",["Wir gehen ins Kino oder wir bleiben zu Hause."],false,"Zwei Hauptsätze mit «oder»."],
["verbinden",2,"sg2","Verbinde die Sätze mit «denn» zu einer Satzverbindung. Setze das Komma.","Der Bus kommt spät. Der Verkehr ist dicht.","Der Bus kommt spät, denn der Verkehr ist dicht.",[],false,"Das Verb steht nach «denn» an zweiter Stelle."]
];
SV.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));
const FH=[
["fach",1,"sg5","Hans geht und ich komme. Dies ist eine …","Das ist eine …","Satzverbindung",["Satzverbindung (SV)","Satzreihe"],true,"Zwei Hauptsätze: Satzverbindung (SV)."],
["fach",1,"sg5","Ein Hauptsatz und ein Nebensatz bilden ein …","Das ist ein …","Satzgefüge",["Satzgefüge (SG)"],true,"Hauptsatz + Nebensatz: Satzgefüge (SG)."],
["fach",1,"sg5","Im Nebensatz steht das konjugierte Verb am …","Das Verb steht am …","Schluss",["Satzende","Ende"],true,"Im Nebensatz steht die Personalform am Schluss."],
["fach",2,"sg5","Jeder einfache Satz ist ein …","Er ist ein …","Hauptsatz",["Der Hauptsatz"],true,"Jeder einfache Satz ist ein Hauptsatz."],
["fach",2,"sg5","Jeder Teil eines zusammengesetzten Satzes heisst …","Er heisst …","Teilsatz",["Der Teilsatz"],true,"Teilsatz."],
["fach",2,"sg5","Unterordnende Konjunktionen wie «weil» leiten einen … ein.","Sie leiten einen … ein.","Nebensatz",["Der Nebensatz"],true,"Unterordnende Konjunktionen leiten Nebensätze ein."]
];
FH.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'.</b> '+r[8]}));

const SECS=[
{id:'haupt',title:'Hauptsatz und Nebensatz',short:'Haupt- und Nebensatz',min:10,note:'Entscheidend ist die Stellung des Verbs: Hauptsatz = Personalform an Position 2, Nebensatz = Verb am Ende. Jeder einfache Satz ist ein Hauptsatz. Der Nebensatz kommt nur im zusammengesetzten Satz vor und ist meist ein zum Satz erweitertes Satzglied.',
 html:()=>GT.ui.vs({h:'Hauptsatz',c:'#2563eb',b:'#dbeafe',t:'#1e3a8a',items:['Jeder einfache Satz ist ein Hauptsatz. Er kann <b>allein</b> stehen.','Die Personalform steht im Aussagesatz an <b>zweiter Stelle</b>.','Ich <b>bleibe</b> zu Hause.']},{h:'Nebensatz',c:'#d97706',b:'#fef3c7',t:'#78350f',items:['Er kommt nur im <b>zusammengesetzten Satz</b> vor und ist <b>unselbständig</b>.','Das Verb steht am <b>Satzende</b>. Meist hat auch er Subjekt und Prädikat (Ausnahmen: Infinitiv- und Partizipialsätze, Teil 3).','…, weil ich krank <b>bin</b>.']})+
 '<div class="callout">Der Nebensatz ist meist ein zum Satz erweitertes <b>Satzglied</b>: «Vor der Abreise reinigten wir …» wird zu «Bevor wir abreisten, reinigten wir …».</div>'+
 '<div class="callout">Hauptsatz und Nebensatz werden durch ein <b>Komma</b> getrennt: «Ich bleibe zu Hause<b>,</b> weil ich krank bin.»</div>'},
{id:'verbindung',title:'Satzverbindung und Satzgefüge',short:'Satzverbindung und Satzgefüge',min:10,note:'Satzverbindung (SV) = mehrere Hauptsätze, auch Satzreihe genannt. Satzgefüge (SG) = Haupt- und Nebensatz. Beides sind zusammengesetzte Sätze. Der zusammengezogene Satz folgt im nächsten Kapitel.',
 html:()=>GT.ui.R('Einfacher Satz','bl','ein Hauptsatz (H)','Anna lacht.')+GT.ui.R('Satzverbindung','gr','SV: H + H (+ H …)','Der Hund bellt, <b>und</b> die Katze schläft.')+GT.ui.R('Satzgefüge','or','SG: H + N (+ N …)','Ich bleibe zu Hause, <b>weil</b> ich krank bin.')+
 '<div class="callout">Satzverbindung und Satzgefüge heissen zusammen <b>zusammengesetzter Satz</b>. Hauptsätze verbindet man mit <b>und, aber, oder, denn</b>. Nebensätze leitet man mit <b>weil, dass, obwohl, wenn, damit …</b> ein.</div>'},
{id:'einleite',title:'Einleitewörter des Nebensatzes',short:'Einleitewörter',min:10,note:'Drei Gruppen: unterordnende Konjunktionen, Relativpronomen/Relativadverbien, Fragewörter. Wichtig: denn, aber, und, oder leiten Hauptsätze ein.',
 html:()=>GT.ui.R('Konjunktion','bl','unterordnende Konjunktion: weil, dass, obwohl, wenn, als, ob, damit, bevor','Ich weiss, <b>dass</b> du recht hast.')+GT.ui.R('Relativpronomen','gr','der, die, das, welcher','Das ist der Lehrer, <b>der</b> Mathe unterrichtet.')+GT.ui.R('Relativadverb','or','wo, woher, wohin','Der Ort, <b>wo</b> wir uns treffen, ist neu.')+GT.ui.R('Fragewort','vi','wer, was, wann, warum, wie','Sag mir, <b>wann</b> du kommst.')+
 '<div class="callout"><b>Achtung:</b> «denn» und «aber» leiten <b>Hauptsätze</b> ein. Danach steht das Verb an zweiter Stelle: «Wir bleiben, <b>denn</b> es regnet.»</div>'},
{id:'stellung',title:'Wortstellung',short:'Wortstellung',min:8,note:'Wichtigste Fehlerquelle: Verb im Nebensatz. Vorangestellter Nebensatz zählt als erstes Satzglied: Danach folgt das Verb des Hauptsatzes.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nebensatz nachgestellt</h3><p>Ich bleibe zu Hause, weil ich krank <b>bin</b>.</p></div>'+
 '<div class="card"><h3>Nebensatz vorangestellt</h3><p>Weil ich krank bin, <b>bleibe</b> ich zu Hause.</p><p class="muted">Der Nebensatz ist das erste Satzglied. Darum folgt das Verb des Hauptsatzes sofort.</p></div></div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Ein kleiner Tippfehler zählt nicht als falsch, wird aber erwähnt.',
 html:()=>T(['Begriff','Bedeutung'],[['Hauptsatz (H)','selbständiger Teilsatz, Personalform an zweiter Stelle'],['Nebensatz (N)','unselbständiger Teilsatz, Personalform am Schluss'],['Teilsatz','Teil eines zusammengesetzten Satzes'],['Satzverbindung (SV)','H + H, auch Satzreihe'],['Satzgefüge (SG)','H + N'],['Einleitewort','leitet den Nebensatz ein (Konjunktion, Relativpronomen, Fragewort)']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Verbstellung, Komma, «denn» ≠ «weil», dass/das.',
 html:()=>'<div class="grid3">'+[
  ['1 · Verb am Ende','«…, weil ich krank <b>bin</b>.»','Im Nebensatz steht das Verb zuletzt.'],
  ['2 · denn ≠ weil','«Ich gehe, <b>denn</b> ich bin müde.» (Verb an Position 2)','«denn» verbindet Hauptsätze.'],
  ['3 · Komma zwischen den Sätzen','«…, weil …»','Nebensätze trennt man immer mit einem Komma.'],
  ['4 · dass oder das?','«Ich weiss, <b>dass</b> er kommt.»','Probe: dieses/welches → das.'],
  ['5 · Vorangestellter Nebensatz','«Weil ich müde bin, <b>gehe</b> ich schlafen.»','Das Verb des Hauptsatzes folgt gleich nach dem Komma.'],
  ['6 · Nebensatz allein','«Weil ich müde bin.»','Das ist kein vollständiger Satz.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('teilsatz,gefuege,einleit')}
];
const EX=[
 ['Unterstreiche den Nebensatz: «Ich bleibe zu Hause, weil ich krank bin.»','weil ich krank bin',1],
 ['Verbinde mit «weil»: Es regnet. Wir bleiben zu Hause.','Wir bleiben zu Hause, weil es regnet.',1],
 ['Verbinde mit «obwohl»: Er ist müde. Er geht noch aus.','Er geht noch aus, obwohl er müde ist.',1],
 ['Stelle den Nebensatz voran: «Wir gehen hinaus, obwohl es regnet.»','Obwohl es regnet, gehen wir hinaus.',1],
 ['Bilde einen Satz mit «damit».','Beispiel: Ich lerne, damit ich die Prüfung bestehe.',2],
 ['Satzverbindung oder Satzgefüge? «Der Hund bellt, und die Katze schläft.»','Satzverbindung',2]
];
const merk=()=>T(['Begriff','Merksatz'],[['Hauptsatz','Kann allein stehen. Verb an zweiter Stelle.'],['Nebensatz','Beginnt meist mit einem Einleitewort. Verb am Ende. Kommt nicht allein vor.'],['Satzverbindung','Hauptsatz + Hauptsatz (und, aber, oder, denn).'],['Satzgefüge','Hauptsatz + Nebensatz (weil, dass, obwohl, wenn, damit …).'],['Komma','Zwischen Haupt- und Nebensatz steht immer ein Komma.'],['Teilsatz','Jeder Teil eines zusammengesetzten Satzes.'],['Einleitewort','Relativpronomen (der, die, das), Fragewort (wer, wann, warum) oder unterordnende Konjunktion (weil, dass, obwohl, wenn).']]);
const UEM={'haupt':{types:'teilsatz,hatns',cats:'sg1'},'verbindung':{types:'gefuege',cats:'sg2'},'einleite':{types:'einleit',cats:'sg3'},'stellung':{types:'konj',cats:'sg4'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{konj:6},opt:{pron:.3,adj:.2,det:{def:.5,indef:.3,poss:.2}},classes:[{gl:'Hauptsatz',cats:['sg1'],lv:1},{gl:'Nebensatz',cats:['sg1'],lv:1},{gl:'Einleitewort',cats:['sg3'],lv:1}],perClass:30});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Wir gehen nach Hause, <b>wenn es dunkel wird</b>.',1,1,'Das Verb «wird» steht am Ende: Nebensatz.'],
['<b>Wir gehen nach Hause</b>, wenn es dunkel wird.',0,1,'Das Verb «gehen» steht an zweiter Stelle: Hauptsatz.'],
['<b>Als die Pause begann</b>, rannten alle hinaus.',1,1,'Das Verb «begann» steht am Ende: Nebensatz.'],
['Als die Pause begann, <b>rannten alle hinaus</b>.',0,2,'Hauptsatz: Die Personalform «rannten» steht an zweiter Stelle. Der Nebensatz davor zählt als erstes Satzglied.'],
['Ich weiss, <b>dass du recht hast</b>.',1,1,'Das Verb «hast» steht am Ende: Nebensatz.'],
['<b>Ich weiss</b>, dass du recht hast.',0,1,'Das Verb «weiss» steht an zweiter Stelle: Hauptsatz.'],
['Mia lernt, <b>damit sie eine gute Note schreibt</b>.',1,1,'Das Verb «schreibt» steht am Ende: Nebensatz.'],
['Das ist der Hund, <b>der mich gebissen hat</b>.',1,2,'Relativsatz: Das Verb «hat» steht am Ende.'],
['<b>Obwohl es regnet</b>, gehen wir spazieren.',1,1,'Das Verb «regnet» steht am Ende: Nebensatz.'],
['Obwohl es regnet, <b>gehen wir spazieren</b>.',0,2,'Hauptsatz: Die Personalform «gehen» steht an zweiter Stelle.']
].forEach(q=>task.push({typ:'teilsatz',stufe:q[2],lv:q[2]===3?2:1,cats:['sg1'],sent:q[0],opts:HN,answer:HN[q[1]],why:'<b>'+HN[q[1]]+'.</b> '+q[3]}));
[
['Welches Wort leitet einen <b>Nebensatz</b> ein?',['obwohl','und','sondern','denn'],'obwohl','obwohl leitet einen Nebensatz ein.','sg4',1],
['Welches Wort leitet einen <b>Nebensatz</b> ein?',['damit','aber','oder','sondern'],'damit','damit leitet einen Nebensatz ein.','sg4',1],
['Welches Wort leitet einen <b>Nebensatz</b> ein?',['nachdem','und','aber','oder'],'nachdem','nachdem leitet einen Nebensatz ein.','sg4',1],
['Welches Wort verbindet zwei <b>Hauptsätze</b>?',['denn','weil','dass','obwohl'],'denn','«denn» verbindet Hauptsätze. Das Verb bleibt an zweiter Stelle.','sg4',2],
['Wo steht die Personalform nach «weil»?',['am Satzende','an zweiter Stelle','an erster Stelle','vor dem Subjekt'],'am Satzende','Im Nebensatz steht die Personalform am Schluss.','sg4',1],
['Wo steht die Personalform nach «denn»?',['an zweiter Stelle','am Satzende','an erster Stelle','nirgends'],'an zweiter Stelle','«denn» leitet einen Hauptsatz ein.','sg4',2]
].forEach(k=>task.push({typ:'konj',stufe:k[5],lv:1,cats:[k[4]],prompt:k[0],opts:k[1],answer:k[2],why:k[3]}));
[
['Tim spielt Fussball, und Mia liest ein Buch.','Satzverbindung',1,'Zwei Hauptsätze mit «und».'],
['Wir bleiben drinnen, weil es regnet.','Satzgefüge',1,'Hauptsatz und Nebensatz mit «weil».'],
['Der Hund schläft auf dem Sofa.','einfacher Satz',1,'Nur ein Teilsatz.'],
['Ich glaube, dass er kommt.','Satzgefüge',1,'Hauptsatz und Nebensatz mit «dass».'],
['Es regnet, aber wir gehen hinaus.','Satzverbindung',1,'«aber» verbindet zwei Hauptsätze.'],
['Als wir ankamen, war das Spiel schon vorbei.','Satzgefüge',2,'Nebensatz mit «als» und Hauptsatz.'],
['Mia lacht, denn der Film ist lustig.','Satzverbindung',2,'«denn» verbindet zwei Hauptsätze.'],
['Das Mädchen, das neben mir sitzt, heisst Lena.','Satzgefüge',2,'Der Relativsatz ist ein Nebensatz.']
].forEach(r=>task.push({typ:'gefuege',stufe:r[2],lv:1,cats:['sg2'],sent:'«'+r[0]+'»',opts:['einfacher Satz','Satzverbindung','Satzgefüge'],answer:r[1],why:'<b>'+r[1]+'.</b> '+r[3]}));
[
['Wir gehen heim, weil es spät ist.',true,1,'Nebensatz «weil es spät ist»: Verb am Ende.'],
['Anna kocht, und Tim deckt den Tisch.',false,1,'Zwei Hauptsätze: kein Nebensatz.'],
['Ich hoffe, dass du kommst.',true,1,'Nebensatz «dass du kommst»: Verb am Ende.'],
['Der Bus fährt ab, und wir winken.',false,1,'Zwei Hauptsätze: kein Nebensatz.']
].forEach(n=>task.push({typ:'hatns',stufe:n[2],lv:1,cats:['sg1'],sent:'«'+n[0]+'»',opts:['Ja','Nein'],answer:n[1]?'Ja':'Nein',why:'<b>'+(n[1]?'Ja':'Nein')+'.</b> '+n[3]}));
task.push=_p0;
})();

GT.chapter({id:'hs-ns',teil:'satz',nr:7,title:'Hauptsatz, Nebensatz und Satzgefüge',big:'Ich bleibe, weil ich müde bin',desc:'Satzverbindung, Satzgefüge, Einleitewörter und Verbstellung',
 ex:'«Ich bleibe zu Hause, weil ich krank bin.»',
 goals:['Ich unterscheide Hauptsatz und Nebensatz.','Ich erkenne Satzverbindung und Satzgefüge.','Ich erkenne Einleitewörter von Nebensätzen.','Ich bilde Satzverbindungen und Satzgefüge aus zwei einfachen Sätzen.','Ich stelle das Verb im Nebensatz richtig.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{teilsatz:{label:'Haupt- oder Nebensatz',short:'Teilsatz bestimmen',instr:'Ist der markierte Teil ein Hauptsatz oder ein Nebensatz?',hint:'Wo steht das Verb? An zweiter Stelle: Hauptsatz. Am Ende: Nebensatz.',ref:'haupt'},
  konj:{label:'Konjunktionen und Verbstellung',short:'weil, dass, denn …',instr:'Wähle die richtige Antwort.',hint:'Nach weil, dass, obwohl … steht das Verb am Ende.',ref:'stellung'},
  einleit:{icon:'🚪',label:'Einleitewort bestimmen',short:'Konjunktion, Relativpronomen, Fragewort',instr:'Welche Art Einleitewort leitet den Nebensatz ein?',hint:'Konjunktion: weil, dass, obwohl. Relativpronomen: der, die, das. Fragewort: wer, wann, warum.',ref:'einleite'},
  hatns:{icon:'🔍',label:'Hat der Satz einen Nebensatz?',short:'Nebensatz erkennen oder ausschliessen',instr:'Hat der Satz einen Nebensatz?',hint:'Suche ein Einleitewort. Steht das Verb am Ende, ist es ein Nebensatz. Zwei Hauptsätze sind keine Nebensätze.',ref:'haupt'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  gefuege:{label:'Satzverbindung oder Satzgefüge',short:'Satzbau',instr:'Welcher Satzbau liegt vor?',hint:'Hauptsatz + Hauptsatz = Satzverbindung. Hauptsatz + Nebensatz = Satzgefüge.',ref:'verbindung'},
  verbinden:{icon:'🪢',label:'Sätze verbinden',short:'Zwei Sätze zu einem Satzgefüge machen',instr:'Schreibe den neuen Satz mit Komma.',hint:'Die Konjunktion leitet den Nebensatz ein. Das Verb rückt ans Ende.',ref:'verbindung'},
  markieren:{label:'Nebensatz markieren',short:'Nebensatz finden',instr:'Tippe alle Wörter des Nebensatzes an.',hint:'Der Nebensatz beginnt mit einer Konjunktion.',ref:'haupt'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
