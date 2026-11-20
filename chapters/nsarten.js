/* Kapitel Satzlehre 7: Arten der Nebensätze (Teil 3). */
(function(){
'use strict';
const GT=window.GT,T=GT.table;
const C={sg1:'Formale Arten',sg2:'Umformen',sg3:'Relativsatz',sg4:'Infinitivsatz',sg5:'Bedeutung (Zeit, Grund …)',sg6:'Sätze umwandeln',sg7:'Fachbegriffe'};
const task=[];
const FO=['Konjunktionalsatz','Relativsatz','Indirekter Fragesatz','Uneingeleiteter Nebensatz','Infinitivsatz','Partizipialsatz'];

/* 1 Formale Arten */
const A=[
['Ich weiss, dass er kommt.',0,1,'«dass» ist eine unterordnende Konjunktion.'],
['Das ist die Frau, die ich gestern traf.',1,1,'«die» ist ein Relativpronomen und bezieht sich auf «Frau».'],
['Sag mir, wann du kommst.',2,1,'«wann» ist ein Fragewort: indirekter Fragesatz.'],
['Weil es regnet, bleiben wir drinnen.',0,1,'«weil» ist eine unterordnende Konjunktion.'],
['Das Buch, das ich lese, ist spannend.',1,1,'«das» bezieht sich auf «Buch»: Relativsatz.'],
['Er fragt, ob der Bus kommt.',2,2,'«ob» leitet einen indirekten Fragesatz ein.'],
['Wäre ich reich, würde ich reisen.',3,2,'Kein Einleitewort: Die Personalform steht an erster Stelle. Der Satz lässt sich mit «wenn» umformen.'],
['Ich glaube, er hat recht.',3,2,'Kein Einleitewort: Die Personalform steht an zweiter Stelle.'],
['Sie hofft, die Prüfung zu bestehen.',4,2,'Es gibt keine Personalform und kein Subjekt: Infinitiv mit «zu».'],
['Er ging weg, ohne ein Wort zu sagen.',4,2,'Infinitiv mit «zu», ohne eigenes Subjekt.'],
['Von der Sonne geblendet, blieb er stehen.',5,3,'Das Partizip «geblendet» steht ohne Personalform: Partizipialsatz.'],
['Müde von der Arbeit, ging er heim.',5,3,'Partizipialsatz ohne Personalform.']
];
A.forEach(a=>task.push({typ:'form',stufe:a[2],lv:a[2]===3?2:1,cats:['sg1'],prompt:'Welche Art Nebensatz liegt vor?<br>«'+a[0]+'»',opts:FO,answer:FO[a[1]],why:'<b>'+FO[a[1]]+'.</b> '+a[3]}));

const W=[
['Wo steht die Personalform im Konjunktionalsatz?',['am Schluss','an erster Stelle','an zweiter Stelle','gar nicht'],'am Schluss','Eingeleitete Nebensätze haben das Verb am Schluss.','sg1',1],
['Wo steht die Personalform im uneingeleiteten Nebensatz?',['an erster oder zweiter Stelle','am Schluss','in der Mitte','nirgends'],'an erster oder zweiter Stelle','Ohne Einleitewort steht das Verb vorne: «Wäre ich reich …», «Ich glaube, er kommt.»','sg1',2],
['Welcher Nebensatz hat keine Personalform?',['Infinitivsatz und Partizipialsatz','Konjunktionalsatz','Relativsatz','indirekter Fragesatz'],'Infinitivsatz und Partizipialsatz','Sie enthalten nur Infinitiv bzw. Partizip.','sg1',2],
['Womit beginnt ein Relativsatz?',['mit einem Relativpronomen oder Relativadverb','mit «und»','mit einem Verb','mit einem Fragezeichen'],'mit einem Relativpronomen oder Relativadverb','der, die, das, welcher, wo …','sg1',1],
['Bei welchen Nebensätzen ist das Komma grundsätzlich freiwillig?',['Infinitivsatz und Partizipialsatz','Konjunktionalsatz','Relativsatz','indirekter Fragesatz'],'Infinitivsatz und Partizipialsatz','Bei Infinitiv- und Partizipialsätzen ist das Komma meist freiwillig, ausser es hilft beim Lesen.','sg1',3]
];
W.forEach(w=>task.push({typ:'form',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* 2 Umformen */
const U=[
['Wäre ich reich, würde ich reisen.',['Wenn ich reich wäre, würde ich reisen.','Weil ich reich wäre, würde ich reisen.','Obwohl ich reich wäre, würde ich reisen.','Dass ich reich wäre, würde ich reisen.'],0,2],
['Hättest du Zeit, könnten wir ins Kino gehen.',['Wenn du Zeit hättest, könnten wir ins Kino gehen.','Weil du Zeit hättest, könnten wir ins Kino gehen.','Damit du Zeit hättest, könnten wir ins Kino gehen.','Als du Zeit hättest, könnten wir ins Kino gehen.'],0,2],
['Ich glaube, er hat recht.',['Ich glaube, dass er recht hat.','Ich glaube, weil er recht hat.','Ich glaube, damit er recht hat.','Ich glaube, obwohl er recht hat.'],0,2],
['Ich denke, es regnet bald.',['Ich denke, dass es bald regnet.','Ich denke, wenn es bald regnet.','Ich denke, weil es bald regnet.','Ich denke, ob es bald regnet.'],0,2],
['Wenn ich reich wäre, würde ich reisen.',['Wäre ich reich, würde ich reisen.','Ich wäre reich, würde ich reisen.','Reich wäre ich, würde ich reisen.','Würde ich reich wäre, reisen.'],0,3]
];
U.forEach(u=>task.push({typ:'umform',stufe:u[3],lv:u[3]===3?2:1,cats:['sg2'],prompt:'Welcher Satz sagt dasselbe, aber mit anderem Nebensatz?<br>«'+u[0]+'»',opts:u[1],answer:u[1][u[2]],why:'<b>'+u[1][u[2]]+'</b> Der uneingeleitete Nebensatz und der Konjunktionalsatz lassen sich ineinander umformen.'}));

/* 3 Relativsatz */
const R=[
['Das ist der Lehrer, der Mathe unterrichtet.',['Lehrer','Mathe','Das','unterrichtet'],'Lehrer'],
['Die Aufgabe, die wir gestern lösten, war schwierig.',['Aufgabe','wir','gestern','schwierig'],'Aufgabe'],
['Ich kenne die Schüler, deren Eltern hier arbeiten.',['Schüler','Eltern','kenne','arbeiten'],'Schüler'],
['Das Handy, das ich gekauft habe, ist neu.',['Handy','ich','gekauft','neu'],'Handy']
];
R.forEach((r,i)=>task.push({typ:'relativ',stufe:i<2?1:2,lv:1,cats:['sg3'],prompt:'Auf welches Wort bezieht sich das Relativpronomen?<br>«'+r[0]+'»',opts:r[1],answer:r[2],why:'<b>'+r[2]+'.</b> Das Relativpronomen verweist auf das Bezugswort im Hauptsatz.'}));
[
['Wie wird ein Relativsatz vom Hauptsatz abgetrennt?',['mit Komma (vorne und hinten, wenn er eingeschoben ist)','gar nicht','mit einem Doppelpunkt','mit einem Gedankenstrich'],'mit Komma (vorne und hinten, wenn er eingeschoben ist)','Der Relativsatz steht immer zwischen Kommas.',1],
['Wo steht im Relativsatz die Personalform?',['am Schluss','an zweiter Stelle','an erster Stelle','vor dem Relativpronomen'],'am Schluss','Relativsätze sind eingeleitete Nebensätze.',1]
].forEach(w=>task.push({typ:'relativ',stufe:w[4],lv:1,cats:['sg3'],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* 4 Infinitivsatz */
const I=[
['Er hofft, früh zu gehen.',1,1,'Infinitiv mit «zu» und ohne eigenes Subjekt: Infinitivsatz.'],
['Er will heute früh gehen.',0,1,'«will gehen» ist Modalverb + Infinitiv ohne «zu»: Das ist das Prädikat, kein Infinitivsatz.'],
['Sie versucht, die Aufgabe zu lösen.',1,1,'Infinitiv mit «zu»: Infinitivsatz.'],
['Wir müssen lernen.',0,1,'Modalverb + Infinitiv: Prädikat, kein Nebensatz.'],
['Er kam, um zu helfen.',1,2,'«um … zu» + Infinitiv: Infinitivsatz.'],
['Sie darf nach Hause gehen.',0,2,'«darf gehen» ist Modalverb + Infinitiv: Prädikat.']
];
I.forEach(i=>task.push({typ:'inf',stufe:i[2],lv:i[2]===3?2:1,cats:['sg4'],prompt:'Enthält der Satz einen Infinitivsatz?<br>«'+i[0]+'»',opts:['Ja','Nein'],answer:i[1]?'Ja':'Nein',why:'<b>'+(i[1]?'Ja':'Nein')+'.</b> '+i[3]}));

/* 5 Bedeutung */
const BD=['Zeit (Temporalsatz)','Grund (Kausalsatz)','Bedingung (Konditionalsatz)','Folge (Konsekutivsatz)','Zweck (Finalsatz)','Einräumung (Konzessivsatz)','Art und Weise (Modalsatz)','Vergleich (Komparativsatz)'];
const B=[
['Als wir ankamen, war das Essen fertig.',0,1],
['Ich bleibe zu Hause, weil ich krank bin.',1,1],
['Falls es regnet, bleiben wir zu Hause.',2,1],
['Sie lernt, damit sie die Prüfung besteht.',4,1],
['Obwohl es regnet, gehen wir hinaus.',5,1],
['Nachdem wir gegessen hatten, spülten wir ab.',0,1],
['Da er krank war, blieb er im Bett.',1,2],
['Wenn du Hilfe brauchst, ruf mich an.',2,2],
['Er rannte so schnell, dass er ausser Atem war.',3,2],
['Er übt viel, um besser zu werden.',4,2],
['Wir gehen spazieren, auch wenn es kalt ist.',5,2],
['Er half mir, indem er die Tasche trug.',6,2],
['Sie singt schöner, als ich gedacht hatte.',7,3],
['Er tat so, als ob nichts gewesen wäre.',7,3]
];
B.forEach((b,k)=>{const o=[b[1]];let j=1;while(o.length<4){const c=(b[1]+j*(k%2?3:1))%8;if(!o.includes(c))o.push(c);j++;}
 const opts=o.map(x=>BD[x]);const off=k%4;const sh=opts.slice(off).concat(opts.slice(0,off));
 task.push({typ:'bedeut',stufe:b[2],lv:b[2]===3?2:1,cats:['sg5'],prompt:'Welche Bedeutung hat der Nebensatz?<br>«'+b[0]+'»',opts:sh,answer:BD[b[1]],why:'<b>'+BD[b[1]]+'.</b> Frage nach der Bedeutung: Wann? Warum? Unter welcher Bedingung? Mit welchem Ziel? Trotz welchem Umstand?'});});

/* 6 Umwandeln (ab B) */
const V=[
['Wegen des starken Regens am Morgen fiel das Spiel aus.',['Weil es am Morgen stark regnete, fiel das Spiel aus.','Obwohl es am Morgen stark regnete, fiel das Spiel aus.','Damit es am Morgen stark regnete, fiel das Spiel aus.','Als es am Morgen stark regnete, ausfiel das Spiel.']],
['Vor der Abreise reinigten wir das Haus.',['Bevor wir abreisten, reinigten wir das Haus.','Weil wir abreisten, reinigten wir das Haus.','Obwohl wir abreisten, reinigten wir das Haus.','Damit wir abreisten, reinigten wir das Haus.']],
['Trotz seiner Müdigkeit ging er noch zum Training.',['Obwohl er müde war, ging er noch zum Training.','Weil er müde war, ging er noch zum Training.','Damit er müde war, ging er noch zum Training.','Nachdem er müde war, ging er noch zum Training.']],
['Zur Verbesserung ihrer Note lernte sie jeden Abend.',['Damit sie ihre Note verbesserte, lernte sie jeden Abend.','Weil sie ihre Note verbesserte, lernte sie jeden Abend.','Obwohl sie ihre Note verbesserte, lernte sie jeden Abend.','Nachdem sie ihre Note verbesserte, lernte sie jeden Abend.']]
];
V.forEach(v=>task.push({typ:'umwand',stufe:3,lv:2,cats:['sg6'],prompt:'Wandle die Satzglieder in einen Nebensatz um (Satzgefüge).<br>«'+v[0]+'»',opts:v[1],answer:v[1][0],why:'<b>'+v[1][0]+'</b> Ein überladenes Satzglied wird zum Nebensatz mit Konjunktion und Personalform am Schluss.'}));

/* 7 Fachbegriffe */
const H=[
['Ein Nebensatz mit unterordnender Konjunktion heisst …','Er heisst …','Konjunktionalsatz',['konjunktionalsatz'],'Konjunktionalsatz.',1],
['Ein Nebensatz mit Relativpronomen heisst …','Er heisst …','Relativsatz',['relativsatz'],'Relativsatz.',1],
['Ein Nebensatz ohne Einleitewort heisst …','Er heisst … Nebensatz','uneingeleiteter',['Uneingeleiteter','uneingeleiteter Nebensatz','Uneingeleiteter Nebensatz'],'Uneingeleiteter Nebensatz.',2],
['Ein Nebensatz mit «zu» + Infinitiv ohne Subjekt heisst …','Er heisst …','Infinitivsatz',['infinitivsatz'],'Infinitivsatz.',1],
['Ein Nebensatz mit Partizip ohne Personalform heisst …','Er heisst …','Partizipialsatz',['partizipialsatz'],'Partizipialsatz.',2],
['Ein Nebensatz, der einen Zweck ausdrückt, heisst …','Er heisst …','Finalsatz',['Zwecksatz'],'Finalsatz (Zwecksatz).',2],
['Ein anderes Wort für unterordnende Konjunktion lautet …','Das andere Wort heisst …','Subjunktion',['die Subjunktion','Die Subjunktion'],'Subjunktion.',2]
];
H.forEach(h=>task.push({typ:'fach',stufe:h[5],lv:1,cats:['sg7'],input:true,prompt:h[0],sent:h[1],answer:h[2],accept:h[3],strict:true,why:'<b>'+h[2]+'.</b> '+h[4]}));

const SECS=[
{id:'formen',title:'Die sechs Arten der Nebensätze',short:'Formale Arten',min:15,note:'Formal unterscheidet man sechs Nebensatzarten. Entscheidend sind Einleitewort, Verbstellung und Komma. Infinitiv- und Partizipialsätze haben keine Personalform; das Komma ist dort grundsätzlich freiwillig.',
 html:()=>T(['Art','Merkmal','Verb','Beispiel'],[['Konjunktionalsatz','unterordnende Konjunktion','am Schluss','Ich weiss, <b>dass</b> er kommt.'],['Relativsatz','Relativpronomen / -adverb','am Schluss','Die Frau, <b>die</b> ich traf, …'],['Indirekter Fragesatz','Fragewort oder «ob»','am Schluss','Sag mir, <b>wann</b> du kommst.'],['Uneingeleiteter Nebensatz','kein Einleitewort','1. oder 2. Stelle','<b>Wäre</b> ich reich, würde ich reisen.'],['Infinitivsatz','«zu» + Infinitiv, kein Subjekt','keine Personalform','Sie hofft, die Prüfung <b>zu bestehen</b>.'],['Partizipialsatz','Partizip, kein Subjekt','keine Personalform','Von der Sonne <b>geblendet</b>, blieb er stehen.']])},
{id:'umformen',title:'Uneingeleitet und eingeleitet umformen',short:'Umformen',min:8,note:'Ein uneingeleiteter Nebensatz lässt sich mit Konjunktion umformen (und umgekehrt): Wäre ich reich = Wenn ich reich wäre. Ich glaube, er kommt = Ich glaube, dass er kommt.',
 html:()=>T(['Uneingeleitet','Eingeleitet'],[['<b>Wäre</b> ich reich, würde ich reisen.','<b>Wenn</b> ich reich wäre, würde ich reisen.'],['Ich glaube, er hat recht.','Ich glaube, <b>dass</b> er recht hat.']])+'<div class="callout">Beim Umformen wandert die Personalform ans <b>Satzende</b> (eingeleitet) oder nach <b>vorne</b> (uneingeleitet).</div>'},
{id:'relativ',title:'Der Relativsatz',short:'Relativsatz',min:8,note:'Relativsatz: Relativpronomen (der, die, das, welcher) oder Relativadverb (wo). Er bezieht sich auf ein Bezugswort im Hauptsatz und steht zwischen Kommas.',
 html:()=>T(['Teil','Beispiel'],[['Bezugswort','Das ist der <b>Lehrer</b>, …'],['Relativpronomen','… <b>der</b> Mathe unterrichtet.'],['Verb','am Schluss: … der Mathe <b>unterrichtet</b>.']])+'<div class="callout">Der Relativsatz kann auch <b>eingeschoben</b> sein: «Das Buch<b>,</b> das ich lese<b>,</b> ist spannend.»</div>'},
{id:'infinitiv',title:'Der Infinitivsatz und die Modalverb-Falle',short:'Infinitivsatz',min:8,note:'Infinitivsatz: Infinitiv mit «zu», kein eigenes Subjekt. Falle: Modalverb + Infinitiv ohne «zu» (will gehen, muss lernen) ist das Prädikat und kein Infinitivsatz.',
 html:()=>T(['Satz','Art'],[['Er hofft, früh <b>zu gehen</b>.','Infinitivsatz'],['Er kam, <b>um zu helfen</b>.','Infinitivsatz'],['Er <b>will</b> früh <b>gehen</b>.','Prädikat (Modalverb + Infinitiv), kein Infinitivsatz']])},
{id:'bedeutung',title:'Nebensätze nach ihrer Bedeutung',short:'Zeit, Grund, Bedingung …',min:12,note:'Die Bedeutung erkennt man an der Konjunktion und an der Frage: Wann? Warum? Unter welcher Bedingung? Mit welcher Folge? Zu welchem Zweck? Trotz welchem Umstand? Auf welche Art? Mit welchem Vergleich? Unterordnende Konjunktion = Subjunktion.',
 html:()=>T(['Bedeutung','Konjunktionen','Beispiel'],[['Zeit','als, wenn, nachdem, bevor, bis, während, seit','<b>Als</b> wir ankamen, war das Essen fertig.'],['Grund','weil, da','Ich bleibe, <b>weil</b> ich krank bin.'],['Bedingung','wenn, falls','<b>Falls</b> es regnet, bleiben wir hier.'],['Folge','sodass, so … dass','Er rannte so schnell, <b>dass</b> er ausser Atem war.'],['Zweck','damit, um … zu','Sie lernt, <b>damit</b> sie besteht.'],['Einräumung','obwohl, obgleich, auch wenn','<b>Obwohl</b> es regnet, gehen wir hinaus.'],['Art und Weise','indem, ohne dass','Er half, <b>indem</b> er die Tasche trug.'],['Vergleich','als, wie, als ob, je … desto','Sie singt schöner, <b>als</b> ich dachte.']])},
{id:'umwandeln',title:'Überladene Sätze umwandeln',short:'Sätze umwandeln',lv:2,min:8,note:'Ab Niveau B. Ein überladener Satz mit langen Satzgliedern wird übersichtlicher als Satzgefüge: Aus «Wegen des Regens …» wird «Weil es regnete, …».',
 html:()=>T(['Überladen','Satzgefüge'],[['Wegen des starken Regens am Morgen fiel das Spiel aus.','<b>Weil</b> es am Morgen stark <b>regnete</b>, fiel das Spiel aus.'],['Vor der Abreise reinigten wir das Haus.','<b>Bevor</b> wir <b>abreisten</b>, reinigten wir das Haus.']])},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Konjunktionalsatz','Nebensatz mit unterordnender Konjunktion (Subjunktion)'],['Relativsatz','Nebensatz mit Relativpronomen'],['Indirekter Fragesatz','Nebensatz mit Fragewort oder «ob»'],['Uneingeleiteter Nebensatz','Nebensatz ohne Einleitewort'],['Infinitivsatz','Nebensatz mit «zu» + Infinitiv'],['Partizipialsatz','Nebensatz mit Partizip']])}
];
const EX=[
 ['Welche Art Nebensatz? «Sie hofft, die Prüfung zu bestehen.»','Infinitivsatz',1],
 ['Forme um: «Wäre ich reich, würde ich reisen.»','Wenn ich reich wäre, würde ich reisen.',2],
 ['Wandle um: «Vor der Abreise reinigten wir das Haus.»','Bevor wir abreisten, reinigten wir das Haus.',3]
];
const merk=()=>T(['Begriff','Merksatz'],[['6 Arten','Konjunktional-, Relativ-, indirekter Frage-, uneingeleiteter Nebensatz, Infinitiv- und Partizipialsatz.'],['Verb','Eingeleitet: am Schluss. Uneingeleitet: vorne. Infinitiv/Partizipialsatz: keine Personalform.'],['Falle','Modalverb + Infinitiv ohne «zu» ist kein Infinitivsatz.']]);
GT.chapter({id:'nsarten',teil:'satz',nr:7,title:'Arten der Nebensätze',big:'Ich weiss, dass er kommt',desc:'Formale Arten, Relativsatz, Infinitivsatz und Bedeutung',
 ex:'«Sie hofft, die Prüfung zu bestehen.»',
 goals:['Ich unterscheide die sechs formalen Nebensatzarten.','Ich forme uneingeleitete und eingeleitete Nebensätze um.','Ich erkenne Relativsätze und Infinitivsätze.','Ich bestimme die Bedeutung von Nebensätzen (Zeit, Grund, Bedingung …).','Ich wandle überladene Sätze um (ab B).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{form:{icon:'🧩',label:'Nebensatzart bestimmen',short:'Formale Art und Verbstellung',instr:'Wähle die richtige Antwort.',hint:'Einleitewort? Wo steht das Verb?',ref:'formen'},
  umform:{icon:'🔁',label:'Nebensatz umformen',short:'Uneingeleitet ⇄ eingeleitet',instr:'Welcher Satz sagt dasselbe?',hint:'Mit «wenn» oder «dass» einleiten, Verb ans Ende.',ref:'umformen'},
  relativ:{icon:'🔗',label:'Relativsatz',short:'Bezugswort und Komma',instr:'Wähle die richtige Antwort.',hint:'Das Relativpronomen verweist auf ein Wort davor.',ref:'relativ'},
  inf:{icon:'➡️',label:'Infinitivsatz erkennen',short:'«zu» + Infinitiv oder Modalverb?',instr:'Enthält der Satz einen Infinitivsatz?',hint:'Modalverb + Infinitiv ist das Prädikat.',ref:'infinitiv'},
  bedeut:{icon:'🕒',label:'Bedeutung des Nebensatzes',short:'Zeit, Grund, Bedingung …',instr:'Welche Bedeutung hat der Nebensatz?',hint:'Achte auf die Konjunktion.',ref:'bedeutung'},
  umwand:{icon:'🛠️',label:'Satz umwandeln',short:'Überladene Sätze als Satzgefüge',instr:'Welcher Satz ist die richtige Umwandlung?',hint:'Konjunktion wählen, Personalform ans Ende.',ref:'umwandeln'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
