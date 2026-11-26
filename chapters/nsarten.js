/* Kapitel Satzlehre 7: Arten der Nebensätze (Teil 3). */
(function(){
'use strict';
const GT=window.GT,T=GT.table;
const C={sg0:'Was ist ein Nebensatz?',sg1:'Formale Arten',sg2:'Umformen',sg3:'Relativsatz',sg4:'Infinitivsatz',sg5:'Bedeutung (Zeit, Grund …)',sg6:'Sätze umwandeln',sg7:'Fachbegriffe'};
const task=[];
const FO=['Konjunktionalsatz','Relativsatz','Indirekter Fragesatz','Uneingeleiteter Nebensatz','Infinitivsatz','Partizipialsatz'];
const FO5=FO.slice(0,5);
const HI=()=>GT.lv()>=3; /* Niveau A: Partizipialsatz und Fachnamen */

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
['Vom Regen durchnässt, kamen wir an.',5,3,'Das Partizip «durchnässt» steht ohne Personalform und ohne Subjekt: Partizipialsatz.']
];
A.forEach(a=>task.push({typ:'form',stufe:a[2],lv:a[1]===5?3:(a[2]===3?2:1),cats:['sg1'],prompt:'Welche Art Nebensatz liegt vor?<br>«'+a[0]+'»',opts:a[1]===5?FO:FO5,answer:FO[a[1]],why:'<b>'+FO[a[1]]+'.</b> '+a[3]}));

const W=[
['Wo steht die Personalform im Konjunktionalsatz?',['am Schluss','an erster Stelle','an zweiter Stelle','gar nicht'],'am Schluss','Eingeleitete Nebensätze haben das Verb am Schluss.','sg1',1],
['Wo steht die Personalform im uneingeleiteten Nebensatz?',['an erster oder zweiter Stelle','am Schluss','in der Mitte','nirgends'],'an erster oder zweiter Stelle','Ohne Einleitewort steht das Verb vorne: «Wäre ich reich …», «Ich glaube, er kommt.»','sg1',2],
['Welcher Nebensatz hat keine Personalform?',['Infinitivsatz und Partizipialsatz','Konjunktionalsatz','Relativsatz','indirekter Fragesatz'],'Infinitivsatz und Partizipialsatz','Sie enthalten nur Infinitiv bzw. Partizip.','sg1',2],
['Womit beginnt ein Relativsatz?',['mit einem Relativpronomen oder Relativadverb','mit «und»','mit einem Verb','mit einem Fragezeichen'],'mit einem Relativpronomen oder Relativadverb','der, die, das, welcher, wo …','sg1',1],
['Wann steht bei einer Infinitivgruppe immer ein Komma?',['bei «um … zu», «ohne … zu» und «statt … zu»','bei jedem Infinitiv mit «zu»','nie','nur nach dem Verb «hoffen»'],'bei «um … zu», «ohne … zu» und «statt … zu»','Mit «um, ohne, statt, anstatt, ausser, als» steht das Komma immer. Sonst ist es bei Infinitivgruppen meist freiwillig.','sg1',3]
];
W.forEach(w=>task.push({typ:'form',stufe:w[5],lv:/Partizipialsatz/.test(w[2]+w[1].join())?3:(w[5]===3?2:1),cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* 0 Was ist ein Nebensatz? */
const HN0=['Hauptsatz','Nebensatz'];
const N0=[
['Ich bleibe zu Hause, <b>weil ich krank bin</b>.',1,1,'Das Verb «bin» steht am Schluss: Nebensatz.'],
['<b>Ich bleibe zu Hause</b>, weil ich krank bin.',0,1,'Die Personalform «bleibe» steht an zweiter Stelle, der Satz kann allein stehen: Hauptsatz.'],
['<b>Wenn die Sonne scheint</b>, gehen wir schwimmen.',1,1,'Eingeleitet mit «wenn», Verb am Schluss: Nebensatz.'],
['Wenn die Sonne scheint, <b>gehen wir schwimmen</b>.',0,1,'Nach dem Nebensatz folgt sofort die Personalform: Hauptsatz.'],
['Ich weiss, <b>dass du recht hast</b>.',1,1,'«dass» leitet einen Nebensatz ein, das Verb steht am Schluss.'],
['<b>Ich weiss</b>, dass du recht hast.',0,1,'Hauptsatz, kann allein stehen.'],
['Der Hund, <b>der dort bellt</b>, gehört mir.',1,2,'Relativsatz mit «der» und Verb am Schluss: Nebensatz.'],
['Sie fragt, <b>ob der Bus schon gefahren ist</b>.',1,2,'«ob» leitet einen Nebensatz ein: Verb am Schluss.']
];
N0.forEach(n=>task.push({typ:'ns0',stufe:n[2],lv:1,cats:['sg0'],sent:n[0],opts:HN0,answer:HN0[n[1]],why:'<b>'+HN0[n[1]]+'.</b> '+n[3]}));
[
['Wo steht die Personalform in einem eingeleiteten Nebensatz?',['am Schluss','an zweiter Stelle','an erster Stelle','vor dem Einleitewort'],'am Schluss','Nach dem Einleitewort folgt das Verb ganz am Schluss.',1],
['Kann ein Nebensatz allein stehen?',['Nein, er braucht einen Hauptsatz.','Ja, immer.','Ja, wenn er ein Komma hat.','Nur am Satzanfang.'],'Nein, er braucht einen Hauptsatz.','Ein Nebensatz ist unselbständig. Er hängt an einem Hauptsatz.',1],
['Was steht zwischen Haupt- und Nebensatz?',['ein Komma','ein Punkt','ein Doppelpunkt','nichts'],'ein Komma','Haupt- und Nebensatz werden mit einem Komma getrennt.',1]
].forEach(w=>task.push({typ:'ns0',stufe:w[4],lv:1,cats:['sg0'],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* Zusätzliche Aufgaben pro Nebensatzart (für die Übungsfolien): [Satz, Art, Stufe, Hinweis] */
const FN=[
['Wir gehen schwimmen, wenn die Sonne scheint.',0,1,'«wenn» ist eine unterordnende Konjunktion, das Verb steht am Schluss.'],
['Obwohl er müde war, kam er mit.',0,1,'«obwohl» leitet einen Konjunktionalsatz ein.'],
['Ich bleibe zu Hause, weil ich krank bin.',0,1,'«weil» ist eine unterordnende Konjunktion.'],
['Sie lernt, damit sie die Prüfung besteht.',0,1,'«damit» leitet einen Konjunktionalsatz ein.'],
['Als wir ankamen, war das Essen fertig.',0,1,'«als» ist eine unterordnende Konjunktion.'],
['Er sagt, dass er keine Zeit hat.',0,1,'«dass» leitet einen Konjunktionalsatz ein.'],
['Das ist der Lehrer, der Mathe unterrichtet.',1,1,'«der» bezieht sich auf «Lehrer»: Relativpronomen.'],
['Die Aufgabe, die wir gestern lösten, war schwierig.',1,1,'«die» bezieht sich auf «Aufgabe»: Relativsatz.'],
['Das Handy, das ich gekauft habe, ist neu.',1,1,'«das» bezieht sich auf «Handy» und lässt sich durch «welches» ersetzen: Relativsatz.'],
['Der Ort, wo wir uns treffen, ist neu.',1,2,'«wo» bezieht sich auf «Ort»: Relativadverb.'],
['Die Schüler, die zu spät kamen, mussten warten.',1,2,'«die» bezieht sich auf «Schüler»: Relativsatz.'],
['Ich kenne den Jungen, dem du das Buch gegeben hast.',1,2,'«dem» bezieht sich auf «Jungen»: Relativpronomen im Dativ.'],
['Ich frage mich, warum er fehlt.',2,1,'«warum» ist ein Fragewort: indirekter Fragesatz.'],
['Weisst du, ob der Bus kommt?',2,1,'«ob» leitet einen indirekten Fragesatz ein.'],
['Erkläre mir, wie das funktioniert.',2,1,'«wie» ist hier ein Fragewort.'],
['Er fragt, wer das Fenster geöffnet hat.',2,1,'«wer» ist ein Fragewort: indirekter Fragesatz.'],
['Ich weiss nicht, was du meinst.',2,2,'«was» ist hier ein Fragewort («Was meinst du?»).'],
['Hättest du Zeit, könnten wir ins Kino gehen.',3,2,'Kein Einleitewort, die Personalform steht an erster Stelle: uneingeleiteter Nebensatz.'],
['Ich denke, es regnet bald.',3,2,'Kein Einleitewort, Verb an zweiter Stelle. Mit «dass» umformbar: Ich denke, dass es bald regnet.'],
['Wäre das Wetter besser, gingen wir wandern.',3,2,'Kein Einleitewort, die Personalform steht vorne. Mit «wenn» umformbar.'],
['Er glaubt, sie kommt morgen.',3,2,'Mit «dass» umformbar: Er glaubt, dass sie morgen kommt.'],
['Ich hoffe, du hast Zeit.',3,2,'Kein Einleitewort. Mit «dass» umformbar: Ich hoffe, dass du Zeit hast.'],
['Wir freuen uns, dich zu sehen.',4,1,'Infinitiv mit «zu» und ohne eigenes Subjekt: Infinitivsatz.'],
['Sie ging, ohne sich zu verabschieden.',4,2,'«ohne … zu» + Infinitiv: Infinitivsatz.'],
['Es macht Spass, Fussball zu spielen.',4,1,'Infinitiv mit «zu» ohne eigenes Subjekt: Infinitivsatz.'],
['Er versprach, pünktlich zu kommen.',4,1,'Infinitiv mit «zu»: Infinitivsatz.'],
['Vom Lärm geweckt, stand sie auf.',5,3,'Das Partizip «geweckt» steht ohne Personalform und ohne Subjekt: Partizipialsatz.'],
['Von allen Seiten bedrängt, gab er auf.',5,3,'Das Partizip «bedrängt» steht ohne Personalform und ohne eigenes Subjekt: Partizipialsatz.']
];
FN.forEach(f=>task.push({typ:'form',stufe:f[2],lv:f[1]===5?3:(f[2]===3?2:1),cats:['sg1'],prompt:'Welche Art Nebensatz liegt vor?<br>«'+f[0]+'»',opts:f[1]===5?FO:FO5,answer:FO[f[1]],why:'<b>'+FO[f[1]]+'.</b> '+f[3]}));

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
['Wie wird ein Relativsatz vom Hauptsatz abgetrennt?',['mit Komma (vorne und hinten, wenn er eingeschoben ist)','gar nicht','mit einem Doppelpunkt','mit einem Gedankenstrich'],'mit Komma (vorne und hinten, wenn er eingeschoben ist)','Der Relativsatz wird mit Komma abgetrennt. Steht er mitten im Satz, braucht es vorne und hinten ein Komma.',1],
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
const BDL=[['Zeit','Temporalsatz'],['Grund','Kausalsatz'],['Bedingung','Konditionalsatz'],['Folge','Konsekutivsatz'],['Zweck','Finalsatz'],['Einräumung','Konzessivsatz'],['Art und Weise','Modalsatz'],['Vergleich','Komparativsatz']];
const BD=BDL.map(x=>x[0]);
const NM=i=>HI()?BDL[i][0]+' ('+BDL[i][1]+')':BDL[i][0];
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
/* Niveau A: Fachnamen der Bedeutungsarten */
[['Als wir ankamen, war das Essen fertig.',0],['Ich bleibe zu Hause, weil ich krank bin.',1],['Falls es regnet, bleiben wir zu Hause.',2],['Er rannte so schnell, dass er ausser Atem war.',3],['Sie lernt, damit sie die Prüfung besteht.',4],['Obwohl es regnet, gehen wir hinaus.',5],['Er half mir, indem er die Tasche trug.',6],['Sie singt schöner, als ich gedacht hatte.',7]].forEach((b,k)=>{const idx=[b[1]];let j=1;while(idx.length<4){const c=(b[1]+j*(k%2?3:1))%8;if(!idx.includes(c))idx.push(c);j++;}
 const opts=idx.map(x=>BDL[x][1]);const off=k%4;const sh=opts.slice(off).concat(opts.slice(0,off));
 task.push({typ:'bedeut',stufe:3,lv:3,cats:['sg5'],prompt:'Wie heisst der Nebensatz mit seinem Fachnamen?<br>«'+b[0]+'»',opts:sh,answer:BDL[b[1]][1],why:'<b>'+BDL[b[1]][1]+'</b> = Nebensatz der Bedeutung «'+BDL[b[1]][0]+'».'});});

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
H.forEach(h=>task.push({typ:'fach',stufe:h[5],lv:/Partizipialsatz|Finalsatz|Subjunktion/.test(h[2])?3:1,cats:['sg7'],input:true,prompt:h[0],sent:h[1],answer:h[2],accept:h[3],strict:true,why:'<b>'+h[2]+'.</b> '+h[4]}));

const ART=o=>'<div class="grid2"><div class="card"><h3>Was ist das?</h3><p>'+o.was+'</p></div><div class="card"><h3>So erkennst du ihn</h3><ul style="margin:.2rem 0 0;padding-left:1.2rem">'+o.erk.map(x=>'<li>'+x+'</li>').join('')+'</ul></div></div>'+T(['Beispiel','Merkmal'],o.bsp)+'<div class="callout">⚠️ <b>Stolperstein:</b> '+o.stolper+'</div>'+(o.extra||'');
const SECS0=[
{id:'was',uebung:{types:'ns0',cats:'sg0'},title:'Was ist ein Nebensatz?',short:'Was ist ein Nebensatz?',min:10,note:'Zuerst klären, was ein Nebensatz überhaupt ist: Er ist ein Teilsatz, der nicht allein stehen kann und an einem Hauptsatz hängt. Er ersetzt oft ein Satzglied. Ein Beispiel mit Satzglied und Nebensatz nebeneinander zeigen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Hauptsatz</h3><p>Er kann <b>allein</b> stehen. Die Personalform steht an <b>zweiter Stelle</b>.</p><p>Ich <b>bleibe</b> zu Hause.</p></div><div class="card"><h3>Nebensatz</h3><p>Er kann <b>nicht allein</b> stehen. Er hängt an einem Hauptsatz. Meist beginnt er mit einem <b>Einleitewort</b>, das Verb steht am <b>Schluss</b>.</p><p>…, weil ich krank <b>bin</b>.</p></div></div>'+
 T(['Mit Satzglied','Als Nebensatz'],[['Ich bleibe <b>wegen meiner Krankheit</b> zu Hause.','Ich bleibe zu Hause, <b>weil ich krank bin</b>.'],['Wir gehen <b>bei Sonnenschein</b> schwimmen.','Wir gehen schwimmen, <b>wenn die Sonne scheint</b>.']])+
 '<div class="callout">Ein Nebensatz tritt oft an die Stelle eines <b>Satzglieds</b> (Grund, Zeit, Bedingung …). Haupt- und Nebensatz trennt man mit einem <b>Komma</b>.</div>'+
 '<div class="callout">Es gibt <b>sechs</b> Arten: Konjunktionalsatz, Relativsatz, indirekter Fragesatz, uneingeleiteter Nebensatz, Infinitivsatz und (ab Niveau A) Partizipialsatz. Auf den nächsten Folien kommt jede einzeln mit einer Übung.</div>'},
{id:'konj',uebung:{tap:{own:'Einleitewort',all:['Einleitewort']},types:'form',cats:'sg1',ans:'Konjunktionalsatz|Relativsatz|Indirekter Fragesatz'},title:'Der Konjunktionalsatz',short:'Konjunktionalsatz',min:8,note:'Konjunktionalsatz = Nebensatz mit unterordnender Konjunktion (Subjunktion). Verb am Schluss. Hier nur die Form erkennen. Die Bedeutung (Zeit, Grund …) kommt später.',
 html:()=>ART({was:'Ein <b>Konjunktionalsatz</b> ist ein Nebensatz, der mit einer <b>unterordnenden Konjunktion</b> beginnt.',erk:['Er beginnt mit <b>weil, dass, wenn, obwohl, damit, als, bevor, nachdem</b> …','Die Personalform steht am <b>Schluss</b>.','Er wird mit einem <b>Komma</b> abgetrennt.'],bsp:[['Ich weiss, <b>dass</b> er kommt.','Konjunktion «dass»'],['<b>Weil</b> es regnet, bleiben wir drinnen.','Konjunktion «weil»'],['Wir gehen schwimmen, <b>wenn</b> die Sonne scheint.','Konjunktion «wenn»']],stolper:'«dass» mit Doppel-s ist eine Konjunktion. «das» ist Artikel oder Pronomen. Probe: Lässt sich «dieses» oder «welches» einsetzen, schreibt man «das».'})},
{id:'relativ-neu',uebung:{types:'form',cats:'sg1',ans:'Relativsatz|Konjunktionalsatz|Indirekter Fragesatz'},title:'Der Relativsatz im Überblick',short:'Relativsatz (Merkmale)',min:6,note:'Kurzer Überblick über die formale Art. Der Relativsatz selbst wird danach noch genauer behandelt (Bezugswort, Komma).',
 html:()=>ART({was:'Ein <b>Relativsatz</b> beschreibt ein Nomen genauer. Er beginnt mit einem <b>Relativpronomen</b> (der, die, das, welcher) oder einem <b>Relativadverb</b> (wo).',erk:['Er hängt an einem <b>Bezugswort</b> im Hauptsatz.','Das Relativpronomen lässt sich oft durch <b>«welcher, welche, welches»</b> ersetzen.','Die Personalform steht am <b>Schluss</b>.'],bsp:[['Das ist der <b>Lehrer</b>, <b>der</b> Mathe unterrichtet.','Bezugswort «Lehrer»'],['Die <b>Aufgabe</b>, <b>die</b> wir lösten, war schwierig.','Bezugswort «Aufgabe»'],['Der <b>Ort</b>, <b>wo</b> wir uns treffen, ist neu.','Relativadverb «wo»']],stolper:'«das» kann Relativpronomen sein (Das Buch, <b>das</b> ich lese …) oder Artikel. «dass» ist nie ein Relativpronomen.'})},
{id:'frage',uebung:{types:'form',cats:'sg1',ans:'Indirekter Fragesatz|Konjunktionalsatz|Relativsatz'},title:'Der indirekte Fragesatz',short:'Indirekter Fragesatz',min:8,note:'Indirekter Fragesatz = eine Frage, die als Nebensatz wiedergegeben wird. Einleitung mit Fragewort oder «ob». Verb am Schluss. Das Fragezeichen steht nur, wenn der ganze Satz eine Frage ist.',
 html:()=>ART({was:'Ein <b>indirekter Fragesatz</b> gibt eine Frage wieder. Er hängt an einem Hauptsatz wie «Sag mir», «Ich frage mich», «Weisst du».',erk:['Er beginnt mit einem <b>Fragewort</b> (wer, was, wann, warum, wie, wo) oder mit <b>«ob»</b>.','Die Personalform steht am <b>Schluss</b>.','Es steht ein <b>Komma</b> davor.'],bsp:[['Sag mir, <b>wann</b> du kommst.','Fragewort «wann»'],['Ich frage mich, <b>warum</b> er fehlt.','Fragewort «warum»'],['Weisst du, <b>ob</b> der Bus kommt?','«ob» für Ja/Nein-Fragen']],stolper:'Direkte Frage: «Wann kommst du?» (Verb an zweiter Stelle, Fragezeichen). Indirekt: «Sag mir, wann du kommst.» (Verb am Schluss, hier ein Punkt).'})},
{id:'uneing',uebung:{types:'form',cats:'sg1',ans:'Uneingeleiteter Nebensatz|Konjunktionalsatz|Infinitivsatz'},title:'Der uneingeleitete Nebensatz',short:'Uneingeleiteter Nebensatz',min:8,note:'Uneingeleiteter Nebensatz = kein Einleitewort, Verb vorne (1. oder 2. Stelle). Man erkennt ihn, weil sich «dass» oder «wenn» einfügen lässt. Zwei Hauptsätze mit Komma sind dagegen eine Satzverbindung.',
 html:()=>ART({was:'Ein <b>uneingeleiteter Nebensatz</b> hat <b>kein Einleitewort</b>. Die Personalform steht an <b>erster oder zweiter Stelle</b>.',erk:['Es fehlt ein Einleitewort wie «dass» oder «wenn».','Probe: Mit <b>«dass»</b> oder <b>«wenn»</b> lässt er sich einleiten.','Er steht oft nach Verben wie <b>glauben, denken, hoffen, sagen</b>, oder als Bedingung mit Verb vorne.'],bsp:[['<b>Wäre</b> ich reich, würde ich reisen.','= Wenn ich reich wäre, …'],['Ich glaube, <b>er hat</b> recht.','= Ich glaube, dass er recht hat.'],['<b>Hättest</b> du Zeit, könnten wir ins Kino gehen.','= Wenn du Zeit hättest, …']],stolper:'«Es regnet, wir bleiben hier.» sind zwei Hauptsätze (Satzverbindung). Hier lässt sich «dass» nicht einfügen. Bei «Ich glaube, er hat recht.» geht es.'})},
{id:'formen',title:'Die sechs Arten der Nebensätze',short:'Formale Arten',min:15,note:'Formal unterscheidet man sechs Nebensatzarten. Entscheidend sind Einleitewort, Verbstellung und Komma. Infinitiv- und Partizipialsätze haben keine Personalform. Bei Infinitivgruppen mit um, ohne, statt, anstatt, ausser, als steht das Komma immer, sonst ist es meist freiwillig.',
 html:()=>[['Konjunktionalsatz','unterordnende Konjunktion','am Schluss','Ich weiss, <b>dass</b> er kommt.'],['Relativsatz','Relativpronomen / -adverb','am Schluss','Die Frau, <b>die</b> ich traf, …'],['Indirekter Fragesatz','Fragewort oder «ob»','am Schluss','Sag mir, <b>wann</b> du kommst.'],['Uneingeleiteter Nebensatz','kein Einleitewort','1. oder 2. Stelle','<b>Wäre</b> ich reich, würde ich reisen.'],['Infinitivsatz','«zu» + Infinitiv, kein Subjekt','keine Personalform','Sie hofft, die Prüfung <b>zu bestehen</b>.']].concat(HI()?[['Partizipialsatz','Partizip, kein Subjekt','keine Personalform','Von der Sonne <b>geblendet</b>, blieb er stehen.']]:[]).map((a,i)=>GT.ui.R(a[0],['bl','gr','or','vi','ro','bl'][i%6],a[1]+' · Verb: '+a[2],a[3])).join('')},
{id:'umformen',title:'Uneingeleitet und eingeleitet umformen',short:'Umformen',min:8,note:'Ein uneingeleiteter Nebensatz lässt sich mit Konjunktion umformen (und umgekehrt): Wäre ich reich = Wenn ich reich wäre. Ich glaube, er kommt = Ich glaube, dass er kommt.',
 html:()=>T(['Uneingeleitet','Eingeleitet'],[['<b>Wäre</b> ich reich, würde ich reisen.','<b>Wenn</b> ich reich wäre, würde ich reisen.'],['Ich glaube, er hat recht.','Ich glaube, <b>dass</b> er recht hat.']])+'<div class="callout">Beim Umformen wandert die Personalform ans <b>Satzende</b> (eingeleitet) oder nach <b>vorne</b> (uneingeleitet).</div>'},
{id:'relativ',title:'Der Relativsatz',short:'Relativsatz',min:8,note:'Relativsatz: Relativpronomen (der, die, das, welcher) oder Relativadverb (wo). Er bezieht sich auf ein Bezugswort im Hauptsatz und steht zwischen Kommas.',
 html:()=>T(['Teil','Beispiel'],[['Bezugswort','Das ist der <b>Lehrer</b>, …'],['Relativpronomen','… <b>der</b> Mathe unterrichtet.'],['Verb','am Schluss: … der Mathe <b>unterrichtet</b>.']])+'<div class="callout">Der Relativsatz kann auch <b>eingeschoben</b> sein: «Das Buch<b>,</b> das ich lese<b>,</b> ist spannend.»</div>'},
{id:'infinitiv',title:'Der Infinitivsatz und die Modalverb-Falle',short:'Infinitivsatz',min:8,note:'Infinitivsatz: Infinitiv mit «zu», kein eigenes Subjekt. Falle: Modalverb + Infinitiv ohne «zu» (will gehen, muss lernen) ist das Prädikat und kein Infinitivsatz.',
 html:()=>T(['Satz','Art'],[['Er hofft, früh <b>zu gehen</b>.','Infinitivsatz'],['Er kam, <b>um zu helfen</b>.','Infinitivsatz'],['Er <b>will</b> früh <b>gehen</b>.','Prädikat (Modalverb + Infinitiv), kein Infinitivsatz']])},
{id:'bedeutung',title:'Nebensätze nach ihrer Bedeutung',short:'Zeit, Grund, Bedingung …',min:12,note:'Die Bedeutung erkennt man an der Konjunktion und an der Frage: Wann? Warum? Unter welcher Bedingung? Mit welcher Folge? Zu welchem Zweck? Trotz welchem Umstand? Auf welche Art? Mit welchem Vergleich? Unterordnende Konjunktion = Subjunktion.',
 html:()=>T(['Bedeutung','Konjunktionen','Beispiel'],[[NM(0),'als, wenn, nachdem, bevor, bis, während, seit','<b>Als</b> wir ankamen, war das Essen fertig.'],[NM(1),'weil, da','Ich bleibe, <b>weil</b> ich krank bin.'],[NM(2),'wenn, falls','<b>Falls</b> es regnet, bleiben wir hier.'],[NM(3),'sodass, so … dass','Er rannte so schnell, <b>dass</b> er ausser Atem war.'],[NM(4),'damit, um … zu','Sie lernt, <b>damit</b> sie besteht.'],[NM(5),'obwohl, obgleich, auch wenn','<b>Obwohl</b> es regnet, gehen wir hinaus.'],[NM(6),'indem, ohne dass','Er half, <b>indem</b> er die Tasche trug.'],[NM(7),'als, wie, als ob, je … desto','Sie singt schöner, <b>als</b> ich dachte.']])},
{id:'umwandeln',title:'Überladene Sätze umwandeln',short:'Sätze umwandeln',lv:2,min:8,note:'Ab Niveau B. Ein überladener Satz mit langen Satzgliedern wird übersichtlicher als Satzgefüge: Aus «Wegen des Regens …» wird «Weil es regnete, …».',
 html:()=>T(['Überladen','Satzgefüge'],[['Wegen des starken Regens am Morgen fiel das Spiel aus.','<b>Weil</b> es am Morgen stark <b>regnete</b>, fiel das Spiel aus.'],['Vor der Abreise reinigten wir das Haus.','<b>Bevor</b> wir <b>abreisten</b>, reinigten wir das Haus.']])},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Ein kleiner Tippfehler zählt nicht als falsch, wird aber erwähnt.',
 html:()=>T(['Begriff','Bedeutung'],[['Konjunktionalsatz','Nebensatz mit unterordnender Konjunktion'+(HI()?' (Subjunktion)':'')],['Relativsatz','Nebensatz mit Relativpronomen'],['Indirekter Fragesatz','Nebensatz mit Fragewort oder «ob»'],['Uneingeleiteter Nebensatz','Nebensatz ohne Einleitewort'],['Infinitivsatz','Nebensatz mit «zu» + Infinitiv'],['Partizipialsatz','Nebensatz mit Partizip']].filter(x=>HI()||x[0]!=='Partizipialsatz'))}
];
const SECS_P=[{id:'partizip',lv:3,title:'Der Partizipialsatz',short:'Partizipialsatz',min:8,note:'Nur Niveau A. Partizipialsatz = Nebensatz mit Partizip, ohne Personalform und ohne eigenes Subjekt. Lässt sich in einen Konjunktionalsatz umformen. Das Komma ist bei Partizipialgruppen meist freiwillig, hier steht es zur Verdeutlichung.',
 html:()=>ART({was:'Ein <b>Partizipialsatz</b> ist ein Nebensatz mit einem <b>Partizip</b>. Er hat <b>keine Personalform</b> und <b>kein eigenes Subjekt</b>.',erk:['Es steht ein <b>Partizip</b> (geblendet, durchnässt, geweckt).','Es fehlt die Personalform. Das Subjekt ist das des Hauptsatzes.','Probe: Er lässt sich mit <b>«weil»</b> oder <b>«als»</b> als Konjunktionalsatz schreiben.'],bsp:[['Von der Sonne <b>geblendet</b>, blieb er stehen.','= Weil ihn die Sonne blendete, …'],['Vom Regen <b>durchnässt</b>, kamen wir an.','= Als wir vom Regen durchnässt waren, …'],['Vom Lärm <b>geweckt</b>, stand sie auf.','= Weil sie vom Lärm geweckt wurde, …']],stolper:'Ohne Partizip ist es kein Partizipialsatz. «Er blieb stehen.» ist ein Hauptsatz. Das Partizip muss einen Satzteil mit Bezug zum Subjekt einleiten.'})}];
const ORD=['was','formen','konj','relativ-neu','relativ','frage','uneing','umformen','infinitiv','partizip','bedeutung','umwandeln','fachbegriffe'];
const ALL=SECS0.concat(SECS_P);
const UE={formen:{types:'form',cats:'sg1'},umformen:{types:'umform',cats:'sg2'},relativ:{types:'relativ',cats:'sg3',title:'Relativsatz: Bezugswort und Komma'},infinitiv:{types:'form,inf',cats:'sg1,sg4',ans:'Infinitivsatz|Uneingeleiteter Nebensatz|Ja|Nein',title:'Infinitivsatz'},partizip:{types:'form',cats:'sg1',ans:'Partizipialsatz|Infinitivsatz|Uneingeleiteter Nebensatz'},bedeutung:{types:'bedeut',cats:'sg5',title:'Bedeutung der Nebensätze'},umwandeln:{types:'umwand',cats:'sg6',title:'Sätze umwandeln'}};
const SECS=ORD.map(id=>{const x=ALL.find(y=>y.id===id);if(!x)throw new Error('Abschnitt fehlt: '+id);if(UE[id])x.uebung=Object.assign({},UE[id]);return x;});
const EX=[
 ['Welche Art Nebensatz? «Sie hofft, die Prüfung zu bestehen.»','Infinitivsatz',1],
 ['Forme um: «Wäre ich reich, würde ich reisen.»','Wenn ich reich wäre, würde ich reisen.',2],
 ['Wandle um: «Vor der Abreise reinigten wir das Haus.»','Bevor wir abreisten, reinigten wir das Haus.',3]
];
const merk=()=>T(['Begriff','Merksatz'],[['6 Arten','Konjunktional-, Relativ-, indirekter Frage-, uneingeleiteter Nebensatz, Infinitiv- und Partizipialsatz.'],['Verb','Eingeleitet: am Schluss. Uneingeleitet: vorne. Infinitiv/Partizipialsatz: keine Personalform.'],['Falle','Modalverb + Infinitiv ohne «zu» ist kein Infinitivsatz.']]);
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{konj:4,rel:3},opt:{pron:.3,adj:.2,det:{def:.5,indef:.3,poss:.2}},classes:[{gl:'Nebensatz',cats:['sg0'],lv:1},{gl:'Einleitewort',cats:['sg1'],lv:1},{gl:'Relativsatz',cats:['sg3'],lv:3}],perClass:30});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Welche Art Nebensatz ist «weil es regnet»?',['Konjunktionalsatz','Relativsatz','Infinitivsatz','Indirekter Fragesatz'],'Konjunktionalsatz','«weil» ist eine unterordnende Konjunktion.','sg1',1],
['Welche Art Nebensatz ist «der dort steht» in «Der Mann, der dort steht, ist mein Onkel.»?',['Relativsatz','Konjunktionalsatz','Infinitivsatz','Indirekter Fragesatz'],'Relativsatz','Er beginnt mit einem Relativpronomen und bezieht sich auf «Mann».','sg1',1],
['Welche Art Nebensatz ist «wo du wohnst» in «Ich weiss, wo du wohnst.»?',['Indirekter Fragesatz','Relativsatz','Infinitivsatz','Konjunktionalsatz'],'Indirekter Fragesatz','Er beginnt mit einem Fragewort.','sg1',2],
['Welche Art Nebensatz ist «um gut zu lernen» in «Er übt, um gut zu lernen.»?',['Infinitivsatz','Konjunktionalsatz','Relativsatz','Indirekter Fragesatz'],'Infinitivsatz','Er hat «zu» + Infinitiv und keine Personalform.','sg1',1],
['Welche Art Nebensatz ist «er kommt» in «Ich glaube, er kommt.»?',['Uneingeleiteter Nebensatz','Konjunktionalsatz','Relativsatz','Infinitivsatz'],'Uneingeleiteter Nebensatz','Es gibt kein Einleitewort, das Verb steht an zweiter Stelle.','sg1',2],
['Was ist ein Nebensatz?',['ein Teilsatz, der von einem anderen Satz abhängt','ein Satz ohne Verb','ein Satz mit Ausrufezeichen','ein Satz, der immer allein stehen kann'],'ein Teilsatz, der von einem anderen Satz abhängt','Er gehört zu einem Hauptsatz und steht nicht allein.','sg0',1],
['Wie viele Personalformen hat «Ich bleibe zu Hause, weil es regnet.»?',['2','1','3','0'],'2','«bleibe» im Hauptsatz und «regnet» im Nebensatz.','sg0',1]
].forEach(w=>task.push({typ:'form',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
task.push=_p0;
})();

/* ---- Antipp-Aufgaben (24.11.2026) ---- */
[
['Ich bleibe zu Hause, *weil ich krank bin.',1,'Einleitewort: weil. Das Verb steht am Schluss.'],
['Sie weiss, *dass er kommt.',1,'Einleitewort: dass.'],
['*Obwohl es regnet, gehen wir hinaus.',1,'Einleitewort: Obwohl. Es leitet den vorangestellten Nebensatz ein.'],
['Sag mir, *wann du kommst.',2,'Einleitewort: wann (Fragewort im indirekten Fragesatz).']
].forEach(m=>{const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});task.push({typ:'markieren',stufe:m[1],lv:1,cats:['sg1'],gl:'Einleitewort',tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe das Einleitewort des Nebensatzes an.',why:m[2]});});
GT.chapter({id:'nsarten',teil:'satz',nr:9,title:'Arten der Nebensätze',big:'Ich weiss, dass er kommt',desc:'Formale Arten, Relativsatz, Infinitivsatz und Bedeutung',
 ex:'«Sie hofft, die Prüfung zu bestehen.»',
 goals:['Ich unterscheide die sechs formalen Nebensatzarten.','Ich forme uneingeleitete und eingeleitete Nebensätze um.','Ich erkenne Relativsätze und Infinitivsätze.','Ich bestimme die Bedeutung von Nebensätzen (Zeit, Grund, Bedingung …).','Ich wandle überladene Sätze um (ab B).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{ns0:{icon:'🧱',label:'Haupt- oder Nebensatz',short:'Was ist ein Nebensatz?',instr:'Wähle die richtige Antwort.',hint:'Wo steht das Verb? Kann der Satz allein stehen?',ref:'was'},
  form:{icon:'🧩',label:'Nebensatzart bestimmen',short:'Formale Art und Verbstellung',instr:'Wähle die richtige Antwort.',hint:'Einleitewort? Wo steht das Verb?',ref:'formen'},
  umform:{icon:'🔁',label:'Nebensatz umformen',short:'Uneingeleitet ⇄ eingeleitet',instr:'Welcher Satz sagt dasselbe?',hint:'Mit «wenn» oder «dass» einleiten, Verb ans Ende.',ref:'umformen'},
  relativ:{icon:'🔗',label:'Relativsatz',short:'Bezugswort und Komma',instr:'Wähle die richtige Antwort.',hint:'Das Relativpronomen verweist auf ein Wort davor.',ref:'relativ'},
  inf:{icon:'➡️',label:'Infinitivsatz erkennen',short:'«zu» + Infinitiv oder Modalverb?',instr:'Enthält der Satz einen Infinitivsatz?',hint:'Modalverb + Infinitiv ist das Prädikat.',ref:'infinitiv'},
  bedeut:{icon:'🕒',label:'Bedeutung des Nebensatzes',short:'Zeit, Grund, Bedingung …',instr:'Welche Bedeutung hat der Nebensatz?',hint:'Achte auf die Konjunktion.',ref:'bedeutung'},
  umwand:{icon:'🛠️',label:'Satz umwandeln',short:'Überladene Sätze als Satzgefüge',instr:'Welcher Satz ist die richtige Umwandlung?',hint:'Konjunktion wählen, Personalform ans Ende.',ref:'umwandeln'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
