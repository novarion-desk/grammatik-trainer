/* Kapitel Satzlehre 2: Verbale Teile und Rohform. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Rohform (Infinitiv)',sg2:'Verbale Teile im Satz',sg3:'Prädikat und Satzklammer'};
const task=[];

/* Rohform bilden */
const R=[
['Wie lautet die Rohform von «sie lacht»?',['lachen','lachte','gelacht','lach'],'lachen','Die Rohform (Infinitiv) endet meist auf -en.',1],
['Wie lautet die Rohform von «er spielte»?',['spielen','spielt','gespielt','spiel'],'spielen','Rohform: spielen.',1],
['Wie lautet die Rohform von «wir sind gegangen»?',['gehen','gegangen','ging','geh'],'gehen','Rohform: gehen (nicht das Partizip).',1],
['Wie lautet die Rohform von «du liest»?',['lesen','liesen','lest','lies'],'lesen','Rohform: lesen.',1],
['Wie lautet die Rohform von «ich bin»?',['sein','bin','ist','gewesen'],'sein','Rohform: sein.',1],
['Wie lautet die Rohform von «sie hat»?',['haben','hatte','gehabt','hab'],'haben','Rohform: haben.',1],
['Wie lautet die Rohform von «er fährt»?',['fahren','fähren','fuhr','gefahren'],'fahren','Rohform: fahren.',2],
['Wie lautet die Rohform von «sie nahm»?',['nehmen','nahmen','genommen','nimmt'],'nehmen','Rohform: nehmen.',2],
['Wie lautet die Rohform von «er steht auf»?',['aufstehen','stehen auf','aufsteht','auf stehen'],'aufstehen','Trennbare Verben werden in der Rohform zusammengeschrieben: aufstehen.',2],
['Wie lautet die Rohform von «ich rufe dich an»?',['anrufen','rufen an','anrufe','anrufst'],'anrufen','Rohform: anrufen.',2],
['Wie lautet die Rohform von «sie hat gesungen»?',['singen','sungen','sang','singt'],'singen','Rohform: singen.',2],
['Wie lautet die Rohform von «du wirst kommen»?',['kommen','wirst','werden','gekommen'],'kommen','Das Vollverb steht in der Rohform: kommen. «wirst» gehört zum Hilfsverb «werden».',3],
['Woran erkennt man die Rohform?',['sie endet meist auf -en','sie hat die Endung -st','sie steht immer am Satzanfang','sie ist grossgeschrieben'],'sie endet meist auf -en','Auch sein, tun, wandern, … auf -n oder -en.',1],
['Wie nennt man die Rohform noch?',['Infinitiv','Partizip II','Imperativ','Präteritum'],'Infinitiv','Rohform = Infinitiv = Grundform.',1]
];
R.forEach(r=>task.push({typ:'rohform',stufe:r[4],lv:r[4]===3?2:1,cats:['sg1'],prompt:r[0],opts:r[1],answer:r[2],why:r[3]}));

/* Verbale Teile zählen */
const Z=[
['Wie viele Teile hat das Prädikat? «Anna lacht.»',['1','2','3'],'1','Ein Teil: lacht.',1],
['Wie viele Teile hat das Prädikat? «Anna hat gelacht.»',['2','1','3'],'2','hat + gelacht.',1],
['Wie viele Teile hat das Prädikat? «Er steht früh auf.»',['2','1','3'],'2','steht + auf.',1],
['Wie viele Teile hat das Prädikat? «Sie will heute kommen.»',['2','1','3'],'2','will + kommen.',1],
['Wie viele Teile hat das Prädikat? «Er will früh aufstehen.»',['2','1','3'],'2','will + aufstehen.',2],
['Wie viele Teile hat das Prädikat? «Sie hat gestern kommen wollen.»',['3','2','1'],'3','hat + kommen + wollen.',3],
['Wie viele Teile hat das Prädikat? «Es wird bald regnen.»',['2','1','3'],'2','wird + regnen.',1],
['Wie viele Teile hat das Prädikat? «Er ist gestern gelaufen.»',['2','1','3'],'2','ist + gelaufen.',1],
['Wie viele Teile hat das Prädikat? «Wir haben das Buch gelesen.»',['2','1','3'],'2','haben + gelesen.',1],
['Wie viele Teile hat das Prädikat? «Ich muss heute früh aufstehen.»',['2','1','3'],'2','muss + aufstehen.',2],
['Wie viele Teile hat das Prädikat? «Der Hund bellt.»',['1','2','3'],'1','Nur bellt.',1],
['Wie viele Teile hat das Prädikat? «Sie hatte das Buch gelesen.»',['2','1','3'],'2','hatte + gelesen.',2]
];
Z.forEach(z=>task.push({typ:'zaehlen',stufe:z[4],lv:z[4]===3?2:1,cats:['sg2'],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));

/* Wissen zu Prädikat und Satzklammer */
const W=[
['Wo steht in einem <b>Aussagesatz</b> die Personalform des Verbs?',['an zweiter Stelle','am Satzanfang','am Satzende','an dritter Stelle'],'an zweiter Stelle','Aussagesatz: Verb an Position 2.','sg3',1],
['Wo steht in einer <b>Ja-/Nein-Frage</b> die Personalform?',['am Satzanfang','an zweiter Stelle','am Satzende','in der Mitte'],'am Satzanfang','«Kommst du mit?»','sg3',1],
['Was bilden die Teile des Verbs bei «Er hat gestern gelacht.»?',['die Satzklammer','die Satzreihe','den Nebensatz','das Subjekt'],'die Satzklammer','Das Prädikat umschliesst die anderen Satzglieder wie eine Klammer.','sg3',2],
['Welches Wort gehört zum Prädikat? «Er steht früh auf.»',['steht und auf','früh','Er','nur steht'],'steht und auf','Trennbares Verb: aufstehen.','sg3',2],
['Welches Wort gehört zum Prädikat? «Sie will heute kommen.»',['will und kommen','heute','Sie','nur will'],'will und kommen','Modalverb + Rohform.','sg3',2],
['Was ist das <b>Prädikat</b>?',['der Teil des Satzes, der sagt, was geschieht','der Teil, der sagt, wer etwas tut','der Teil, der sagt, wo etwas geschieht','ein Satzzeichen'],'der Teil des Satzes, der sagt, was geschieht','Prädikat = Verb (mit allen Teilen).','sg3',1],
['Welche Frage hilft, das Prädikat zu finden?',['Was geschieht? / Was tut jemand?','Wer oder was?','Wem?','Wann?'],'Was geschieht? / Was tut jemand?','Was tut Anna? – Sie liest.','sg3',1],
['Wo steht der zweite Teil des Prädikats im Aussagesatz?',['am Satzende','am Satzanfang','an zweiter Stelle','überall'],'am Satzende','«Er hat gestern im Park Fussball gespielt.»','sg3',2],
['Wo steht im <b>Nebensatz</b> (mit weil, dass …) das Verb?',['am Satzende','an zweiter Stelle','am Satzanfang','überall'],'am Satzende','«…, weil er müde ist.»','sg3',3]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* Markieren */
const M=[
['Die Katze *schläft.',1,'Prädikat: schläft.'],
['Anna *hat gestern *gelacht.',1,'Prädikat: hat … gelacht.'],
['Er *steht früh *auf.',1,'Prädikat: steht … auf.'],
['Sie *will heute *kommen.',1,'Prädikat: will … kommen.'],
['Wir *haben im Garten Fussball *gespielt.',2,'Prädikat: haben … gespielt (Satzklammer).'],
['Er *muss morgen früh *aufstehen.',2,'Prädikat: muss … aufstehen.'],
['Sie *hat gestern nicht *kommen *wollen.',3,'Prädikat: hat … kommen … wollen.'],
['Es *wird heute Abend *regnen.',2,'Prädikat: wird … regnen.'],
['Ich *bin schon lange *gelaufen.',2,'Prädikat: bin … gelaufen.']
];
M.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg2'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Teile des Prädikats an.',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Er hat gestern gelacht.", "hat gelacht", [], false, "Zum Prädikat gehören alle Verbteile: «hat gelacht»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Sie steht früh auf.", "steht auf", [], false, "Zum Prädikat gehören alle Verbteile: «steht auf»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Wir haben Pizza gegessen.", "haben gegessen", [], false, "Zum Prädikat gehören alle Verbteile: «haben gegessen»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Tim ist gestern nach Bern gefahren.", "ist gefahren", [], false, "Zum Prädikat gehören alle Verbteile: «ist gefahren»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Sie ruft ihre Freundin an.", "ruft an", [], false, "Zum Prädikat gehören alle Verbteile: «ruft an»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Er kann gut singen.", "kann singen", [], false, "Zum Prädikat gehören alle Verbteile: «kann singen»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Ich will heute Fussball spielen.", "will spielen", [], false, "Zum Prädikat gehören alle Verbteile: «will spielen»."], ["praedikat", 3, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Das Kind wird morgen abgeholt.", "wird abgeholt", [], false, "Zum Prädikat gehören alle Verbteile: «wird abgeholt»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'rohform',title:'Rohform (Infinitiv)',short:'Rohform',min:8,note:'Rohform = Infinitiv = Grundform. Kevin: Falls im Lehrmittel andere Bezeichnung, hier anpassen. Bildung: Stamm + -en.',
 html:()=>'<p class="lead">Die <b>Rohform</b> (Infinitiv) ist die Grundform des Verbs. So steht es im Wörterbuch.</p>'+T(['Satz','Rohform'],[['Sie lacht.','lachen'],['Er spielte.','spielen'],['Wir sind gegangen.','gehen'],['Er steht früh auf.','aufstehen'],['Du liest.','lesen']])+
 '<div class="callout">Die Rohform endet fast immer auf <b>-en</b> (oder -n). Bei trennbaren Verben schreibt man sie <b>zusammen</b>: aufstehen.</div>'},
{id:'teile',title:'Verbale Teile im Satz',short:'Verbale Teile',min:10,note:'Das Prädikat kann aus einem, zwei oder drei Teilen bestehen. Alle Teile gehören zum Prädikat und zusammen.',
 html:()=>'<p class="lead">Das Prädikat besteht aus <b>einem oder mehreren verbalen Teilen</b>.</p>'+
 T(['Fall','Beispiel','Teile'],[['Einfaches Verb','Anna <b>lacht</b>.','1'],['Hilfsverb + Partizip II','Anna <b>hat</b> gestern <b>gelacht</b>.','2'],['Trennbares Verb','Er <b>steht</b> früh <b>auf</b>.','2'],['Modalverb + Rohform','Sie <b>will</b> heute <b>kommen</b>.','2'],['werden + Rohform','Es <b>wird</b> regnen.','2'],['Hilfsverb + Rohform + Rohform','Sie <b>hat</b> <b>kommen</b> <b>wollen</b>.','3']])+
 '<div class="callout"><b>Achtung:</b> Zwischen den Teilen können andere Satzglieder stehen: «Er <b>hat</b> gestern im Park Fussball <b>gespielt</b>.»</div>'},
{id:'klammer',title:'Die Satzklammer',short:'Satzklammer',lv:2,min:8,note:'Ab Niveau B. Die Satzklammer ist ein Bild: Der erste Teil des Prädikats steht an Position 2, der zweite am Ende. Dazwischen das Mittelfeld.',
 html:()=>'<p class="lead">Die Teile des Prädikats bilden eine <b>Klammer</b> um den Rest des Satzes.</p>'+
 '<div class="card"><p style="font-size:1.1rem">Er <b>hat</b> gestern im Park mit seinem Freund Fussball <b>gespielt</b>.</p><p class="muted">Erster Teil an Position 2 · Mittelfeld · zweiter Teil am Satzende</p></div>'+
 T(['Satzart','Wo steht das Verb?'],[['Aussagesatz','Personalform an zweiter Stelle, weitere Teile am Ende'],['Ja-/Nein-Frage','Personalform am Satzanfang'],['Nebensatz (weil, dass …)','Alle Verbteile am Satzende']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Fehler: Teile vergessen, Verbpartikel nicht erkennen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Ein Teil vergessen','«Er <b>hat</b> gestern <b>gelacht</b>.»','Beide Teile unterstreichen.'],
  ['2 · Abgetrennte Vorsilbe','«Er <b>steht</b> früh <b>auf</b>.»','Die Rohform ist «aufstehen».'],
  ['3 · Modalverb + Rohform','«Sie <b>will</b> heute <b>kommen</b>.»','Beide Teile gehören zum Prädikat.'],
  ['4 · Rohform ≠ Personalform','«lachen» ↔ «lacht»','Die Personalform hat eine Endung für die Person.'],
  ['5 · Verbteil im Nebensatz','«…, weil er müde <b>ist</b>.»','Im Nebensatz steht das Verb am Ende.'],
  ['6 · Rohform von sein','«ich bin, du bist → sein»','Unregelmässige Verben fallen auf.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('rohform,zaehlen')}
];
const EX=[
 ['Schreibe die Rohform: sie lacht, wir gingen, er hat gelesen, du fährst.','lachen · gehen · lesen · fahren',1],
 ['Unterstreiche alle Teile des Prädikats: «Er hat gestern lange geschlafen.»','hat · geschlafen',1],
 ['Unterstreiche das Prädikat: «Sie steht jeden Morgen um sechs Uhr auf.»','steht · auf',1],
 ['Unterstreiche das Prädikat: «Wir wollen morgen ins Kino gehen.»','wollen · gehen',1],
 ['Wie viele Teile hat das Prädikat? «Sie hat gestern kommen wollen.»','3 Teile',2],
 ['Bilde einen Satz mit dem Verb «aufstehen» im Präsens.','Beispiel: Ich stehe um sieben Uhr auf.',2],
 ['Wo steht das Verb? «Ich weiss, dass er morgen kommt.»','Im Nebensatz am Satzende: kommt.',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Rohform','Grundform des Verbs: lachen, gehen, aufstehen. Endet meist auf -en.'],['Prädikat','Sagt, was geschieht. Besteht aus einem oder mehreren verbalen Teilen.'],['Mehrere Teile','haben/sein + Partizip II · Modalverb + Rohform · trennbares Verb · werden + Rohform'],['Satzklammer','Die Teile des Prädikats umschliessen den Rest des Satzes.'],['Stellung','Aussagesatz: Verb an Position 2 · Nebensatz: Verb am Ende']]);
GT.chapter({id:'verbale',teil:'satz',nr:2,title:'Verbale Teile und Rohform',big:'Er hat gestern gelacht',desc:'Prädikat mit mehreren Teilen erkennen',
 ex:'«Er '+mk('verb','hat')+' gestern '+mk('verb','gelacht')+'.»',
 goals:['Ich bilde die Rohform eines Verbs.','Ich finde alle verbalen Teile im Satz.','Ich erkenne die Satzklammer.'],
  write:['rohform'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{rohform:{winstr:'Schreibe die Rohform.',label:'Rohform bilden',short:'Infinitiv',instr:'Wähle die richtige Rohform.',hint:'Die Rohform endet auf -en. Bei trennbaren Verben zusammenschreiben.',ref:'rohform'},
  zaehlen:{label:'Verbale Teile zählen',short:'Wie viele Teile hat das Prädikat?',instr:'Wähle die richtige Zahl.',hint:'Suche Hilfsverb, Modalverb, Partizip, Rohform und abgetrennte Vorsilbe.',ref:'teile'},
  praedikat:{icon:'✏️',label:'Prädikat schreiben',short:'Alle Verbteile im Satz notieren',instr:'Schreibe alle Verbteile in der Reihenfolge des Satzes.',hint:'Suche Hilfsverb, Modalverb, Partizip, Infinitiv und abgetrennte Vorsilbe.',ref:'teile'},
  wissen:{label:'Wissen',short:'Prädikat und Satzklammer',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'klammer'},
  markieren:{label:'Prädikat markieren',short:'Alle Verbteile finden',instr:'Tippe alle Teile des Prädikats an.',hint:'Suche alle Verbformen im Satz.',ref:'teile'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
