/* Kapitel Satzlehre 5: Hauptsatz und Nebensatz. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Hauptsatz und Nebensatz',sg2:'Satzreihe und Satzgefüge',sg3:'Nebensatzarten',sg4:'Konjunktionen im Satz'};
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
['Er sagt, <b>er habe keine Zeit</b>.',1,3,'Indirekte Rede ohne «dass»: Nebensatz.'],
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

/* Nebensatzarten */
const N=['Kausalsatz (Grund)','Konzessivsatz (Gegensatz)','Finalsatz (Zweck)','Temporalsatz (Zeit)','Konditionalsatz (Bedingung)','Relativsatz','Inhaltssatz (dass)'];
const NN=[
['Ich bleibe zu Hause, <b>weil ich krank bin</b>.',0,1,'«weil» nennt den Grund: Kausalsatz. Frage: Warum?'],
['<b>Obwohl es regnet</b>, gehen wir hinaus.',1,2,'«obwohl» nennt einen Gegensatz: Konzessivsatz.'],
['Sie lernt, <b>damit sie die Prüfung besteht</b>.',2,2,'«damit» nennt den Zweck: Finalsatz. Frage: Wozu?'],
['<b>Als wir ankamen</b>, war das Essen fertig.',3,2,'«als» nennt die Zeit: Temporalsatz. Frage: Wann?'],
['<b>Wenn du Hilfe brauchst</b>, ruf mich an.',4,2,'«wenn» nennt eine Bedingung: Konditionalsatz.'],
['Der Mann, <b>der dort steht</b>, ist mein Onkel.',5,2,'«der» bezieht sich auf «Mann»: Relativsatz.'],
['Ich weiss, <b>dass er kommt</b>.',6,2,'«dass» leitet den Inhalt ein: Inhaltssatz.'],
['Er ging nach Hause, <b>nachdem er gegessen hatte</b>.',3,3,'«nachdem» nennt die Zeit: Temporalsatz.'],
['Wir bleiben hier, <b>weil es regnet</b>.',0,1,'«weil» nennt den Grund: Kausalsatz.'],
['<b>Falls es regnet</b>, bleiben wir zu Hause.',4,3,'«falls» nennt eine Bedingung: Konditionalsatz.'],
['Er übt viel, <b>um besser zu werden</b>.',2,3,'«um … zu» nennt den Zweck: Finalsatz (Infinitivgruppe).'],
['Die Frau, <b>die neben mir wohnt</b>, ist Ärztin.',5,3,'Relativsatz: «die» bezieht sich auf «Frau».']
];
NN.forEach(n=>task.push({typ:'nsart',stufe:n[2],lv:n[2]===3?2:1,cats:['sg3'],sent:n[0],opts:N,answer:N[n[1]],why:'<b>'+N[n[1]]+'.</b> '+n[3]}));

/* Satzreihe / Satzgefüge */
const R=[
['Der Hund bellt, und die Katze schläft.','Satzreihe',1,'Zwei Hauptsätze mit «und»: Satzreihe.'],
['Ich bleibe zu Hause, weil ich krank bin.','Satzgefüge',1,'Hauptsatz + Nebensatz: Satzgefüge.'],
['Es regnet, aber wir gehen hinaus.','Satzreihe',1,'Zwei Hauptsätze mit «aber»: Satzreihe.'],
['Ich weiss, dass er kommt.','Satzgefüge',1,'Hauptsatz + Nebensatz: Satzgefüge.'],
['Anna lacht.','einfacher Satz',1,'Nur ein Hauptsatz: einfacher Satz.'],
['Wir spielen Fussball, denn es ist schön.','Satzreihe',2,'Zwei Hauptsätze mit «denn»: Satzreihe.'],
['Obwohl es regnet, gehen wir hinaus.','Satzgefüge',1,'Nebensatz + Hauptsatz: Satzgefüge.'],
['Tim kocht, Anna deckt den Tisch und Mia holt die Getränke.','Satzreihe',2,'Mehrere Hauptsätze: Satzreihe.'],
['Der Mann, der dort steht, ist mein Onkel.','Satzgefüge',2,'Hauptsatz mit eingeschobenem Relativsatz: Satzgefüge.']
];
R.forEach(r=>task.push({typ:'gefuege',stufe:r[2],lv:1,cats:['sg2'],sent:'«'+r[0]+'»',opts:['einfacher Satz','Satzreihe','Satzgefüge'],answer:r[1],why:'<b>'+r[1]+'.</b> '+r[3]}));

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

const SECS=[
{id:'haupt',title:'Hauptsatz und Nebensatz',short:'Haupt- und Nebensatz',min:10,note:'Entscheidend ist die Stellung des Verbs: Hauptsatz = Personalform an Position 2, Nebensatz = Verb am Ende. Nebensatz allein ist kein vollständiger Satz.',
 html:()=>'<div class="grid2"><div class="card"><h3>Hauptsatz</h3><p>Kann <b>allein</b> stehen. Die Personalform steht an <b>zweiter Stelle</b>.</p><p>Ich <b>bleibe</b> zu Hause.</p></div>'+
 '<div class="card"><h3>Nebensatz</h3><p>Kann <b>nicht allein</b> stehen. Er beginnt mit einer Konjunktion, das Verb steht am <b>Satzende</b>.</p><p>…, weil ich krank <b>bin</b>.</p></div></div>'+
 '<div class="callout">Hauptsatz und Nebensatz werden durch ein <b>Komma</b> getrennt: «Ich bleibe zu Hause<b>,</b> weil ich krank bin.»</div>'},
{id:'verbindung',title:'Satzreihe und Satzgefüge',short:'Satzreihe und Satzgefüge',min:10,note:'Satzreihe = mehrere Hauptsätze. Satzgefüge = Haupt- + Nebensatz.',
 html:()=>T(['Begriff','Aufbau','Beispiel'],[['Einfacher Satz','ein Hauptsatz','Anna lacht.'],['Satzreihe','Hauptsatz + Hauptsatz','Der Hund bellt, <b>und</b> die Katze schläft.'],['Satzgefüge','Hauptsatz + Nebensatz','Ich bleibe zu Hause, <b>weil</b> ich krank bin.']])+
 '<div class="callout">Hauptsätze verbindet man mit <b>und, aber, oder, denn</b>. Nebensätze leitet man mit <b>weil, dass, obwohl, wenn, damit …</b> ein.</div>'},
{id:'arten',title:'Nebensatzarten',short:'Nebensatzarten',min:12,note:'Nach der Aufgabe des Nebensatzes: Warum? Wann? Wozu? Obwohl? Unter welcher Bedingung? Relativsatz bezieht sich auf ein Nomen.',
 html:()=>T(['Nebensatz','Konjunktion','Frage','Beispiel'],[['Kausalsatz (Grund)','weil, da','Warum?','Ich bleibe, <b>weil ich krank bin</b>.'],['Konzessivsatz (Gegensatz)','obwohl','Trotz?','<b>Obwohl es regnet</b>, gehen wir.'],['Finalsatz (Zweck)','damit, um … zu','Wozu?','Sie lernt, <b>damit sie besteht</b>.'],['Temporalsatz (Zeit)','als, wenn, nachdem, bevor, bis','Wann?','<b>Als wir kamen</b>, …'],['Konditionalsatz (Bedingung)','wenn, falls','Unter welcher Bedingung?','<b>Wenn du Hilfe brauchst</b>, ruf an.'],['Inhaltssatz','dass','Was?','Ich weiss, <b>dass er kommt</b>.'],['Relativsatz','der, die, das, welcher','Was für ein?','Der Mann, <b>der dort steht</b>, …']])},
{id:'stellung',title:'Wortstellung',short:'Wortstellung',min:8,note:'Wichtigste Fehlerquelle: Verb im Nebensatz. Vorangestellter Nebensatz zählt als erstes Satzglied: Danach folgt das Verb des Hauptsatzes.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nebensatz nachgestellt</h3><p>Ich bleibe zu Hause, weil ich krank <b>bin</b>.</p></div>'+
 '<div class="card"><h3>Nebensatz vorangestellt</h3><p>Weil ich krank bin, <b>bleibe</b> ich zu Hause.</p><p class="muted">Der Nebensatz ist das erste Satzglied. Darum folgt das Verb des Hauptsatzes sofort.</p></div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Verbstellung, Komma, «denn» ≠ «weil», dass/das.',
 html:()=>'<div class="grid3">'+[
  ['1 · Verb am Ende','«…, weil ich krank <b>bin</b>.»','Im Nebensatz steht das Verb zuletzt.'],
  ['2 · denn ≠ weil','«Ich gehe, <b>denn</b> ich bin müde.» (Verb an Position 2)','«denn» verbindet Hauptsätze.'],
  ['3 · Komma zwischen den Sätzen','«…, weil …»','Nebensätze trennt man immer mit einem Komma.'],
  ['4 · dass oder das?','«Ich weiss, <b>dass</b> er kommt.»','Probe: dieses/welches → das.'],
  ['5 · Vorangestellter Nebensatz','«Weil ich müde bin, <b>gehe</b> ich schlafen.»','Das Verb des Hauptsatzes folgt gleich nach dem Komma.'],
  ['6 · Nebensatz allein','«Weil ich müde bin.»','Das ist kein vollständiger Satz.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('teilsatz,nsart,gefuege')}
];
const EX=[
 ['Unterstreiche den Nebensatz: «Ich bleibe zu Hause, weil ich krank bin.»','weil ich krank bin',1],
 ['Verbinde mit «weil»: Es regnet. Wir bleiben zu Hause.','Wir bleiben zu Hause, weil es regnet.',1],
 ['Verbinde mit «obwohl»: Er ist müde. Er geht noch aus.','Er geht noch aus, obwohl er müde ist.',1],
 ['Stelle den Nebensatz voran: «Wir gehen hinaus, obwohl es regnet.»','Obwohl es regnet, gehen wir hinaus.',1],
 ['Welche Art Nebensatz? «Als wir ankamen, war das Essen fertig.»','Temporalsatz (Zeit)',2],
 ['Bilde einen Satz mit «damit».','Beispiel: Ich lerne, damit ich die Prüfung bestehe.',2],
 ['Satzreihe oder Satzgefüge? «Der Hund bellt, und die Katze schläft.»','Satzreihe',2]
];
const merk=()=>T(['Begriff','Merksatz'],[['Hauptsatz','Kann allein stehen. Verb an zweiter Stelle.'],['Nebensatz','Beginnt mit einer Konjunktion. Verb am Ende. Kommt nicht allein vor.'],['Satzreihe','Hauptsatz + Hauptsatz (und, aber, oder, denn).'],['Satzgefüge','Hauptsatz + Nebensatz (weil, dass, obwohl, wenn, damit …).'],['Komma','Zwischen Haupt- und Nebensatz steht immer ein Komma.']])+
 T(['Nebensatzart','Konjunktion'],[['Grund','weil, da'],['Gegensatz','obwohl'],['Zweck','damit, um … zu'],['Zeit','als, wenn, nachdem, bevor, bis'],['Bedingung','wenn, falls'],['Inhalt','dass'],['Relativ','der, die, das']]);
GT.chapter({id:'hs-ns',teil:'satz',nr:5,title:'Hauptsatz und Nebensatz',big:'Ich bleibe, weil ich müde bin',desc:'Satzreihe, Satzgefüge und Nebensatzarten',
 ex:'«Ich bleibe zu Hause, weil ich krank bin.»',
 goals:['Ich unterscheide Hauptsatz und Nebensatz.','Ich erkenne Satzreihe und Satzgefüge.','Ich bestimme Nebensatzarten (Grund, Gegensatz, Zweck, Zeit, Bedingung, Inhalt, Relativ).','Ich stelle das Verb im Nebensatz richtig.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{teilsatz:{label:'Haupt- oder Nebensatz',short:'Teilsatz bestimmen',instr:'Ist der markierte Teil ein Hauptsatz oder ein Nebensatz?',hint:'Wo steht das Verb? An zweiter Stelle: Hauptsatz. Am Ende: Nebensatz.',ref:'haupt'},
  konj:{label:'Konjunktionen und Verbstellung',short:'weil, dass, denn …',instr:'Wähle die richtige Antwort.',hint:'Nach weil, dass, obwohl … steht das Verb am Ende.',ref:'stellung'},
  nsart:{label:'Nebensatzart',short:'Grund, Zeit, Zweck …',instr:'Welche Nebensatzart ist markiert?',hint:'Welche Konjunktion? Welche Frage beantwortet der Nebensatz?',ref:'arten'},
  gefuege:{label:'Satzreihe oder Satzgefüge',short:'Satzbau',instr:'Welcher Satzbau liegt vor?',hint:'Hauptsatz + Hauptsatz = Satzreihe. Hauptsatz + Nebensatz = Satzgefüge.',ref:'verbindung'},
  markieren:{label:'Nebensatz markieren',short:'Nebensatz finden',instr:'Tippe alle Wörter des Nebensatzes an.',hint:'Der Nebensatz beginnt mit einer Konjunktion.',ref:'haupt'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
