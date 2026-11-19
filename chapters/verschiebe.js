/* Kapitel Satzlehre 3: Verschiebeprobe und Satzglieder. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Verschiebeprobe',sg2:'Subjekt und Prädikat',sg3:'Objekte',sg4:'Adverbiale Bestimmungen'};
const task=[];
const G=['Subjekt','Prädikat','Akkusativobjekt','Dativobjekt','Adverbiale Bestimmung'];

/* Satzglied bestimmen: [Satz mit markiertem Glied, Antwort, Stufe, Hinweis] */
const Q=[
['<b>Der Hund</b> bellt laut.',0,1,'Wer bellt? – Der Hund: Subjekt.'],
['Der Hund <b>bellt</b> laut.',1,1,'Was tut der Hund? – bellt: Prädikat.'],
['Anna liest <b>ein Buch</b>.',2,1,'Was liest Anna? – ein Buch: Akkusativobjekt.'],
['Er hilft <b>dem Freund</b>.',3,1,'Wem hilft er? – dem Freund: Dativobjekt.'],
['Er kommt <b>heute</b>.',4,1,'Wann? – heute: Adverbiale Bestimmung der Zeit.'],
['<b>Anna</b> liest ein Buch.',0,1,'Wer liest? – Anna: Subjekt.'],
['Anna <b>liest</b> ein Buch.',1,1,'Was tut Anna? – liest: Prädikat.'],
['Wir sehen <b>den Hund</b>.',2,1,'Wen sehen wir? – den Hund: Akkusativobjekt.'],
['Sie schenkt <b>ihrem Bruder</b> ein Buch.',3,1,'Wem schenkt sie? – ihrem Bruder: Dativobjekt.'],
['Sie spielen <b>im Garten</b>.',4,1,'Wo? – im Garten: Adverbiale Bestimmung des Ortes.'],
['<b>Meine Schwester</b> kauft Brot.',0,1,'Wer kauft? – Meine Schwester: Subjekt.'],
['Meine Schwester kauft <b>Brot</b>.',2,1,'Was kauft sie? – Brot: Akkusativobjekt.'],
['Er <b>hat</b> gestern <b>gelacht</b>.',1,2,'Prädikat: hat … gelacht (zwei Teile).'],
['Gestern spielte <b>der kleine Junge</b> Fussball.',0,2,'Wer spielte? – der kleine Junge: Subjekt.'],
['<b>Gestern</b> spielte der kleine Junge Fussball.',4,2,'Wann? – Gestern: Adverbiale Bestimmung der Zeit.'],
['Gestern spielte der kleine Junge <b>Fussball</b>.',2,2,'Was spielte er? – Fussball: Akkusativobjekt.'],
['Mein Vater gibt <b>mir</b> das Geld.',3,2,'Wem gibt er? – mir: Dativobjekt.'],
['Mein Vater gibt mir <b>das Geld</b>.',2,2,'Was gibt er? – das Geld: Akkusativobjekt.'],
['Sie fährt <b>mit dem Zug</b> nach Bern.',4,2,'Wie? – mit dem Zug: Adverbiale Bestimmung der Art und Weise.'],
['Sie fährt mit dem Zug <b>nach Bern</b>.',4,2,'Wohin? – nach Bern: Adverbiale Bestimmung des Ortes.'],
['Wir bleiben <b>wegen des Regens</b> zu Hause.',4,2,'Warum? – wegen des Regens: Adverbiale Bestimmung des Grundes.'],
['<b>Der Lehrer</b> erklärt den Schülern die Aufgabe.',0,2,'Wer erklärt? – Der Lehrer: Subjekt.'],
['Der Lehrer erklärt <b>den Schülern</b> die Aufgabe.',3,2,'Wem erklärt er? – den Schülern: Dativobjekt.'],
['Der Lehrer erklärt den Schülern <b>die Aufgabe</b>.',2,2,'Was erklärt er? – die Aufgabe: Akkusativobjekt.'],
['Der Lehrer <b>erklärt</b> den Schülern die Aufgabe.',1,2,'Prädikat: erklärt.'],
['Sie <b>ruft</b> ihre Freundin <b>an</b>.',1,3,'Prädikat: ruft … an (trennbares Verb).'],
['Sie ruft <b>ihre Freundin</b> an.',2,3,'Wen ruft sie an? – ihre Freundin: Akkusativobjekt.'],
['<b>Gestern Abend</b> hat sie ihr geholfen.',4,3,'Wann? – Gestern Abend: Adverbiale Bestimmung der Zeit.'],
['Sie hat <b>ihr</b> geholfen.',3,3,'Wem hat sie geholfen? – ihr: Dativobjekt.']
];
Q.forEach(q=>task.push({typ:'glied',stufe:q[2],lv:q[2]===3?2:1,cats:[q[1]===0||q[1]===1?'sg2':q[1]===4?'sg4':'sg3'],sent:q[0],opts:G,answer:G[q[1]],why:'<b>'+G[q[1]]+'.</b> '+q[3]}));

/* Fragen */
const F=[
['Mit welcher Frage findest du das <b>Subjekt</b>?',['Wer oder was?','Wen oder was?','Wem?','Wann?'],'Wer oder was?','Wer oder was tut etwas?','sg2',1],
['Mit welcher Frage findest du das <b>Akkusativobjekt</b>?',['Wen oder was?','Wer oder was?','Wem?','Wo?'],'Wen oder was?','Akkusativobjekt: Wen oder was?','sg3',1],
['Mit welcher Frage findest du das <b>Dativobjekt</b>?',['Wem?','Wen oder was?','Wer oder was?','Warum?'],'Wem?','Dativobjekt: Wem?','sg3',1],
['Mit welcher Frage findest du das <b>Prädikat</b>?',['Was geschieht? / Was tut …?','Wer oder was?','Wem?','Wo?'],'Was geschieht? / Was tut …?','Prädikat: Was tut jemand?','sg2',1],
['Mit welcher Frage findest du eine adverbiale Bestimmung des <b>Ortes</b>?',['Wo? Wohin? Woher?','Wann?','Wie?','Warum?'],'Wo? Wohin? Woher?','Ort: Wo? Wohin? Woher?','sg4',1],
['Mit welcher Frage findest du eine adverbiale Bestimmung der <b>Zeit</b>?',['Wann? Wie lange?','Wo?','Wie?','Warum?'],'Wann? Wie lange?','Zeit: Wann? Wie lange? Wie oft?','sg4',1],
['Mit welcher Frage findest du eine adverbiale Bestimmung der <b>Art und Weise</b>?',['Wie? Womit?','Wo?','Wann?','Warum?'],'Wie? Womit?','Art und Weise: Wie? Womit?','sg4',2],
['Mit welcher Frage findest du eine adverbiale Bestimmung des <b>Grundes</b>?',['Warum? Weshalb?','Wo?','Wann?','Wie?'],'Warum? Weshalb?','Grund: Warum? Weshalb? Weswegen?','sg4',2]
];
F.forEach(f=>task.push({typ:'frage',stufe:f[5],lv:1,cats:[f[4]],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));

/* Verschiebeprobe */
const V=[
['Welche Umstellung ist richtig? «Der Hund bellt laut.»',['Laut bellt der Hund.','Bellt laut Hund der.','Der bellt Hund laut.','Hund der laut bellt.'],'Laut bellt der Hund.','Ganze Satzglieder verschieben: «Der Hund» bleibt zusammen.','sg1',1],
['Welche Umstellung ist richtig? «Anna liest ein Buch.»',['Ein Buch liest Anna.','Liest ein Anna Buch.','Anna ein liest Buch.','Buch ein Anna liest.'],'Ein Buch liest Anna.','«ein Buch» ist ein Satzglied.','sg1',1],
['Wie viele Satzglieder hat «Heute spielt der Hund im Garten.»?',['4','3','5','2'],'4','Heute · spielt · der Hund · im Garten.','sg1',1],
['Wie viele Satzglieder hat «Der kleine Junge liest ein spannendes Buch.»?',['3','4','5','2'],'3','Der kleine Junge · liest · ein spannendes Buch.','sg1',1],
['Wie viele Satzglieder hat «Wir fahren morgen mit dem Zug nach Bern.»?',['5','4','6','3'],'5','Wir · fahren · morgen · mit dem Zug · nach Bern.','sg1',2],
['Welches Wort bleibt beim Verschieben <b>immer an zweiter Stelle</b>?',['die Personalform des Verbs','das Subjekt','das Objekt','die Adverbiale'],'die Personalform des Verbs','Im Aussagesatz steht die Personalform an Position 2.','sg1',1],
['Welches ist ein <b>Satzglied</b>?',['der kleine Hund','der kleine','kleine Hund','Hund der'],'der kleine Hund','Beim Verschieben bleibt die ganze Gruppe zusammen.','sg1',1],
['Wozu dient die Verschiebeprobe?',['um Satzglieder zu finden','um Wörter zu zählen','um die Zeit zu bestimmen','um Nomen zu finden'],'um Satzglieder zu finden','Was zusammen verschoben wird, ist ein Satzglied.','sg1',1],
['Welche Umstellung ist <b>falsch</b>? «Gestern habe ich den Film gesehen.»',['Gestern ich habe den Film gesehen.','Ich habe gestern den Film gesehen.','Den Film habe ich gestern gesehen.','Gesehen habe ich gestern den Film.'],'Gestern ich habe den Film gesehen.','Das Verb muss an zweiter Stelle bleiben.','sg1',2],
['Wie viele Satzglieder hat «Ich habe gestern den Film gesehen.»?',['4','5','3','6'],'4','Ich · habe … gesehen · gestern · den Film.','sg1',3]
];
V.forEach(v=>task.push({typ:'probe',stufe:v[5],lv:v[5]===3?2:1,cats:[v[4]],prompt:v[0],opts:v[1],answer:v[2],why:v[3]}));

/* Markieren: Subjekt antippen */
const M=[
['*Der *Hund bellt laut.',1,'Subjekt: Der Hund.'],
['*Anna liest ein Buch.',1,'Subjekt: Anna.'],
['Gestern spielte *der *kleine *Junge Fussball.',2,'Subjekt: der kleine Junge.'],
['Im Garten blühen *die *roten *Rosen.',2,'Subjekt: die roten Rosen.'],
['Heute backt *meine *Mutter einen Kuchen.',2,'Subjekt: meine Mutter.'],
['Nach der Schule trifft *Tim *und *Mia ihre Freunde.',3,'Subjekt: Tim und Mia (ein zusammengesetztes Subjekt).']
];
M.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg2'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Wörter des Subjekts an (Wer oder was?).',why:m[2]});
});

const SECS=[
{id:'probe',title:'Die Verschiebeprobe',short:'Verschiebeprobe',min:10,note:'Beispielsatz mit Kärtchen an der Wandtafel umstellen. Die Personalform bleibt immer an zweiter Stelle (Aussagesatz).',
 html:()=>'<p class="lead">Mit der <b>Verschiebeprobe</b> findest du die Satzglieder: Was beim Umstellen zusammenbleibt, ist <b>ein</b> Satzglied.</p>'+
 '<div class="card"><p>Der kleine Hund bellt laut.</p><p>Laut bellt der kleine Hund.</p><p>Bellt der kleine Hund laut? <span class="muted">(Frage)</span></p></div>'+
 '<div class="callout"><b>Regeln:</b> 1. Die Personalform des Verbs bleibt an zweiter Stelle. 2. Wörter, die zusammenbleiben, sind <b>ein</b> Satzglied. 3. Der Satz muss danach noch Sinn ergeben.</div>'},
{id:'subjekt',title:'Subjekt und Prädikat',short:'Subjekt und Prädikat',min:8,note:'Subjekt und Prädikat bilden das Gerüst jedes Satzes. Das Subjekt steht im Nominativ.',
 html:()=>'<div class="grid2"><div class="card f-sg1" style="border-color:var(--c)"><h3 style="color:var(--t)">Subjekt</h3><p><b>Wer oder was?</b></p><p>[Der Hund] bellt. · [Anna] liest.</p></div>'+
 '<div class="card f-sg2" style="border-color:var(--c)"><h3 style="color:var(--t)">Prädikat</h3><p><b>Was geschieht? Was tut jemand?</b></p><p>Der Hund [bellt]. · Anna [hat] gelacht.</p></div></div>'+
 '<div class="callout">Das Subjekt steht im <b>Nominativ</b>. Das Prädikat richtet sich nach dem Subjekt: <i>Ich lache, du lachst, die Kinder lachen.</i></div>'},
{id:'objekte',title:'Objekte',short:'Objekte',min:10,note:'Akkusativobjekt (Wen/Was?) und Dativobjekt (Wem?) auf die Fälle-Probe zurückführen. Genitivobjekt nur Niveau A.',
 html:()=>'<div class="grid2"><div class="card f-sg3" style="border-color:var(--c)"><h3 style="color:var(--t)">Akkusativobjekt</h3><p><b>Wen oder was?</b></p><p>Anna liest [ein Buch]. · Ich sehe [den Hund].</p></div>'+
 '<div class="card f-sg4" style="border-color:var(--c)"><h3 style="color:var(--t)">Dativobjekt</h3><p><b>Wem?</b></p><p>Er hilft [dem Freund]. · Sie gibt [mir] das Buch.</p></div></div>'+
 '<div class="callout">Manche Verben haben zwei Objekte: «Er gibt <b>dem Freund</b> (Dat.) <b>das Buch</b> (Akk.).»</div>'},
{id:'adverbiale',title:'Adverbiale Bestimmungen',short:'Adverbiale',min:10,note:'Vier Arten: Ort, Zeit, Art und Weise, Grund. Mit W-Fragen erfragen.',
 html:()=>T(['Art','Frage','Beispiel'],[['Ort','Wo? Wohin? Woher?','Wir spielen <b>im Garten</b>.'],['Zeit','Wann? Wie lange? Wie oft?','<b>Gestern</b> regnete es.'],['Art und Weise','Wie? Womit?','Er fährt <b>mit dem Zug</b>.'],['Grund','Warum? Weshalb?','<b>Wegen des Regens</b> bleiben wir hier.']])+
 '<div class="callout">Adverbiale Bestimmungen kann man oft <b>weglassen</b>, der Satz bleibt vollständig. Subjekt, Prädikat und Objekt sind meist nötig.</div>'},
{id:'pradikativ',title:'Prädikativ (Ergänzung zu «sein»)',short:'Prädikativ',lv:3,min:6,note:'Nur Niveau A. Nominativ nach «sein, werden, bleiben».',
 html:()=>'<div class="card"><h3>Prädikativ</h3><p>Nach <b>sein, werden, bleiben</b> steht ein zweiter Nominativ.</p><p>Anna <b>ist</b> [Lehrerin]. · Er <b>wird</b> [müde]. · Sie <b>bleibt</b> [freundlich].</p><p class="muted">Frage: Wer oder was ist Anna? – Lehrerin.</p></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Fehler: Satzglied zu klein abgrenzen; Ort/Zeit verwechseln; Subjekt nicht am Satzanfang.',
 html:()=>'<div class="grid3">'+[
  ['1 · Subjekt nicht am Anfang','«Gestern spielte <b>der Hund</b>.»','Das Subjekt steht nicht immer vorne.'],
  ['2 · Satzglied zu klein','«<b>Der kleine Hund</b>» ist ein Glied','Alles, was zusammen verschoben wird.'],
  ['3 · Ort oder Zeit?','«im Garten» (Wo?) · «am Morgen» (Wann?)','Mit der Frage prüfen.'],
  ['4 · Akkusativ oder Dativ?','«Er sieht <b>den Hund</b>.» / «Er hilft <b>dem Hund</b>.»','Wen oder was? / Wem?'],
  ['5 · Zwei Objekte','«Er gibt <b>dem Kind</b> <b>ein Buch</b>.»','Dativobjekt und Akkusativobjekt.'],
  ['6 · Verb bleibt an Position 2','«Heute <b>spielt</b> er.»','Die Personalform ändert die Position nicht.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('glied,frage,probe')}
];
const EX=[
 ['Stelle den Satz zweimal um: «Der Hund bellt laut.»','Laut bellt der Hund. · Bellt der Hund laut?',1],
 ['Finde die Satzglieder: «Anna liest heute im Garten ein Buch.»','Anna · liest · heute · im Garten · ein Buch',1],
 ['Bestimme: «Er hilft dem Freund.»','Er (Subjekt) · hilft (Prädikat) · dem Freund (Dativobjekt)',1],
 ['Bestimme: «Wir sehen den Film.»','Wir (Subjekt) · sehen (Prädikat) · den Film (Akkusativobjekt)',1],
 ['Welche Art von Adverbiale? «im Garten», «gestern», «mit dem Zug», «wegen des Regens»','Ort · Zeit · Art und Weise · Grund',2],
 ['Schreibe einen Satz mit Subjekt, Prädikat, Dativobjekt und Akkusativobjekt.','Beispiel: Anna gibt dem Bruder ein Buch.',2],
 ['Wie viele Satzglieder: «Meine Schwester schenkt mir heute ein Buch.»?','5 (Meine Schwester · schenkt · mir · heute · ein Buch)',2]
];
const merk=()=>T(['Satzglied','Frage','Beispiel'],[['Subjekt','Wer oder was?','<b>Der Hund</b> bellt.'],['Prädikat','Was geschieht?','Der Hund <b>bellt</b>.'],['Akkusativobjekt','Wen oder was?','Er sieht <b>den Hund</b>.'],['Dativobjekt','Wem?','Er hilft <b>dem Hund</b>.'],['Adverbiale Bestimmung','Wo? Wann? Wie? Warum?','Er kommt <b>heute</b>.']])+
 '<ul><li>Verschiebeprobe: Was zusammenbleibt, ist <b>ein</b> Satzglied.</li><li>Die Personalform steht im Aussagesatz an zweiter Stelle.</li></ul>';
GT.chapter({id:'verschiebe',teil:'satz',nr:3,title:'Verschiebeprobe und Satzglieder',big:'[Der Hund] [bellt] [laut]',desc:'Satzglieder durch Umstellen finden und bestimmen',
 ex:'«[Der Hund] [bellt] [laut].»',
 goals:['Ich finde Satzglieder mit der Verschiebeprobe.','Ich bestimme Subjekt und Prädikat.','Ich bestimme Akkusativ- und Dativobjekt.','Ich erkenne adverbiale Bestimmungen (Ort, Zeit, Art und Weise, Grund).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{glied:{label:'Satzglied bestimmen',short:'Subjekt, Prädikat, Objekt, Adverbiale',instr:'Welches Satzglied ist markiert?',hint:'Stelle die passende Frage: Wer? Was tut? Wen? Wem? Wo? Wann?',ref:'subjekt'},
  frage:{label:'Fragen zu den Satzgliedern',short:'Welche Frage passt?',instr:'Wähle die richtige Frage.',hint:'Schau in der Theorie nach.',ref:'objekte'},
  probe:{label:'Verschiebeprobe',short:'Umstellen und Zählen',instr:'Wähle die richtige Antwort.',hint:'Was beim Umstellen zusammenbleibt, ist ein Satzglied.',ref:'probe'},
  markieren:{label:'Subjekt markieren',short:'Wer oder was?',instr:'Tippe alle Wörter des Subjekts an.',hint:'Frage: Wer oder was tut etwas?',ref:'subjekt'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
