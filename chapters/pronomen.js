/* Kapitel Wortlehre 6: Pronomen (inkl. Artikel). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Artikel',sg2:'Personalpronomen',sg3:'Possessivpronomen',sg4:'Weitere Pronomen'};
const task=[];
const gap=s=>s.replace('___','<span class="gap">_____</span>');

/* Artikel: bestimmt / unbestimmt */
const A=[
['Welches Wort ist ein <b>bestimmter Artikel</b>?',['der','ein','mein','dieser'],'der','Bestimmte Artikel: der, die, das.',1],
['Welches Wort ist ein <b>unbestimmter Artikel</b>?',['ein','der','die','das'],'ein','Unbestimmte Artikel: ein, eine.',1],
['Welches Wort ist ein <b>bestimmter Artikel</b>?',['die','eine','keine','meine'],'die','Bestimmte Artikel: der, die, das.',1],
['Welches Wort ist ein <b>unbestimmter Artikel</b>?',['eine','das','dem','den'],'eine','Unbestimmte Artikel: ein, eine.',1],
['Welcher Satz enthält einen <b>unbestimmten</b> Artikel?',['Ich sehe einen Hund.','Ich sehe den Hund.','Ich sehe diesen Hund.','Ich sehe meinen Hund.'],'Ich sehe einen Hund.','«einen» ist die Akkusativform von «ein».',2],
['Welcher Satz enthält einen <b>bestimmten</b> Artikel?',['Das Kind lacht.','Ein Kind lacht.','Kein Kind lacht.','Mein Kind lacht.'],'Das Kind lacht.','«das» ist ein bestimmter Artikel.',2]
];
A.forEach(a=>task.push({typ:'artikel',stufe:a[4],lv:1,cats:['sg1'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

/* Personalpronomen ersetzen */
const P=[
['<b>Anna</b> spielt Klavier. → ___ spielt Klavier.','Sie',['Er','Es','Ihr'],1,'Anna ist weiblich: sie.'],
['<b>Der Hund</b> bellt. → ___ bellt.','Er',['Sie','Es','Ihm'],1,'Der Hund ist männlich: er.'],
['<b>Das Kind</b> lacht. → ___ lacht.','Es',['Er','Sie','Ihm'],1,'Das Kind ist sächlich: es.'],
['<b>Tim und ich</b> spielen. → ___ spielen.','Wir',['Ihr','Sie','Uns'],1,'Tim und ich: wir.'],
['<b>Du und Mia</b> kommt. → ___ kommt.','Ihr',['Wir','Sie','Euch'],1,'Du und Mia: ihr.'],
['<b>Die Kinder</b> singen. → ___ singen.','Sie',['Er','Es','Ihnen'],1,'Mehrzahl: sie.'],
['Ich sehe <b>den Hund</b>. → Ich sehe ___.','ihn',['er','ihm','sie'],2,'Akkusativ männlich: ihn.'],
['Ich sehe <b>die Katze</b>. → Ich sehe ___.','sie',['ihr','er','ihn'],2,'Akkusativ weiblich: sie.'],
['Ich sehe <b>das Kind</b>. → Ich sehe ___.','es',['ihm','ihn','sie'],2,'Akkusativ sächlich: es.'],
['Ich helfe <b>dem Mann</b>. → Ich helfe ___.','ihm',['ihn','er','ihr'],2,'Dativ männlich: ihm.'],
['Ich helfe <b>der Frau</b>. → Ich helfe ___.','ihr',['sie','ihm','ihnen'],2,'Dativ weiblich: ihr.'],
['Ich helfe <b>den Kindern</b>. → Ich helfe ___.','ihnen',['sie','ihm','ihr'],2,'Dativ Mehrzahl: ihnen.'],
['Er gibt <b>mir</b> das Buch. Wer bekommt das Buch? → ___.','Ich',['Mich','Mir','Meine'],2,'Der Empfänger ist «ich» (Dativ: mir).'],
['Sie ruft <b>uns</b> an. → Wen ruft sie an? ___','Uns',['Wir','Unser','Euch'],3,'«uns» ist Akkusativ von «wir».'],
['Er dankt <b>dir</b>. → Wem dankt er? ___','Dir',['Dich','Du','Dein'],3,'«dir» ist Dativ von «du».']
];
P.forEach(p=>task.push({typ:'personal',stufe:p[3],lv:p[3]===3?2:1,cats:['sg2'],sent:p[0].replace('___','<span class="gap">_____</span>'),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> '+p[4]}));

/* Possessiv */
const B=[
['Das ist <b>meine</b> Tasche. Wem gehört sie?',['mir (ich)','dir (du)','ihm (er)','uns (wir)'],'mir (ich)','«mein» gehört zu «ich».',1],
['Das ist <b>dein</b> Hund. Wem gehört er?',['dir (du)','mir (ich)','ihr (sie)','uns (wir)'],'dir (du)','«dein» gehört zu «du».',1],
['Das ist <b>sein</b> Buch. Wem gehört es?',['ihm (er)','ihr (sie)','mir (ich)','dir (du)'],'ihm (er)','«sein» gehört zu «er».',1],
['Das ist <b>ihr</b> Heft (Anna). Wem gehört es?',['ihr (sie)','ihm (er)','uns (wir)','dir (du)'],'ihr (sie)','«ihr» gehört zu «sie».',1],
['Das ist <b>unser</b> Haus. Wem gehört es?',['uns (wir)','euch (ihr)','ihnen (sie)','mir (ich)'],'uns (wir)','«unser» gehört zu «wir».',1],
['Ich liebe ___ Familie.',['meine','mein','meiner','meinen'],'meine','«Familie» ist weiblich: meine Familie.',1],
['Er sucht ___ Hund.',['seinen','seine','seiner','sein'],'seinen','Akkusativ männlich: seinen Hund.',2],
['Sie besucht ___ Grossmutter.',['ihre','ihr','ihren','ihrem'],'ihre','«Grossmutter» ist weiblich: ihre Grossmutter.',2],
['Wir feiern ___ Geburtstag.',['unseren','unsere','unser','unseres'],'unseren','Akkusativ männlich: unseren Geburtstag.',2],
['Hast du ___ Buch dabei?',['dein','deine','deiner','deinen'],'dein','Akkusativ sächlich: dein Buch.',2],
['Er hilft ___ Freund.',['seinem','seinen','seine','sein'],'seinem','Dativ männlich: seinem Freund.',3],
['Das ist das Haus ___ Eltern.',['meiner','meine','meinen','mein'],'meiner','Genitiv Mehrzahl: meiner Eltern.',3]
];
B.forEach(b=>task.push({typ:'possessiv',stufe:b[4],lv:b[4]===3?2:1,cats:['sg3'],prompt:b[0].replace('___','<span class="gap">_____</span>'),opts:b[1],answer:b[2],why:'<b>'+b[2]+'.</b> '+b[3]}));

/* Weitere Pronomen */
const W=[
['Welches Wort ist ein <b>Demonstrativpronomen</b> (zeigt auf etwas)?',['dieser','mein','man','wer'],'dieser','Demonstrativpronomen: dieser, diese, dieses, jener, derjenige.','sg4',2],
['Welches Wort ist ein <b>Fragepronomen</b>?',['wer','er','mein','dieser'],'wer','Fragepronomen: wer, was, welcher, wessen.','sg4',2],
['Welches Wort ist ein <b>Reflexivpronomen</b>?',['sich','sie','ihr','ihm'],'sich','Reflexivpronomen: mich, dich, sich, uns, euch, sich.','sg4',2],
['Welches Wort ist ein <b>Indefinitpronomen</b> (unbestimmt)?',['man','er','mein','dieser'],'man','Indefinitpronomen: man, jemand, niemand, alle, etwas.','sg4',2],
['Welches Wort ist ein <b>Relativpronomen</b>?',['der (Der Mann, der dort steht, …)','er','mein','sich'],'der (Der Mann, der dort steht, …)','Relativpronomen leiten einen Nebensatz ein: der, die, das, welcher.','sg4',3],
['Ergänze: Ich wasche ___.',['mich','mir','ich','mein'],'mich','Reflexiv: ich wasche mich.','sg4',2],
['Ergänze: Er freut ___ auf die Ferien.',['sich','ihn','ihm','er'],'sich','«sich freuen» ist ein reflexives Verb.','sg4',2],
['Ergänze: ___ kommt zur Party? (Frage nach einer Person)',['Wer','Was','Wem','Wessen'],'Wer','Nach Personen fragt man mit «wer».','sg4',2],
['Wofür steht das Pronomen?',['für ein Nomen','für ein Verb','für ein Adjektiv','für einen Satz'],'für ein Nomen','Pronomen stehen für ein Nomen: «Anna kommt. Sie lacht.»','sg2',1],
['Wie nennt man «ich, du, er, sie, es, wir, ihr, sie»?',['Personalpronomen','Possessivpronomen','Artikel','Reflexivpronomen'],'Personalpronomen','Sie ersetzen Personen und Dinge.','sg2',1],
['Wie nennt man «mein, dein, sein, ihr, unser, euer»?',['Possessivpronomen','Personalpronomen','Artikel','Fragepronomen'],'Possessivpronomen','Possessivpronomen zeigen, wem etwas gehört.','sg3',1]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0].replace('___','<span class="gap">_____</span>'),opts:w[1],answer:w[2],why:w[3]}));

/* Markieren */
const M=[
['*Er gibt *ihr *seinen Stift.',1,'Pronomen: Er, ihr, seinen.'],
['*Wir besuchen *unsere Grossmutter.',1,'Pronomen: Wir, unsere.'],
['*Ich sehe *dich und *du siehst *mich.',2,'Pronomen: Ich, dich, du, mich.'],
['Anna sagt, *sie habe *ihre Tasche vergessen.',2,'Pronomen: sie, ihre.'],
['Der Mann, *der dort steht, kennt *mich.',3,'Relativpronomen «der» und Personalpronomen «mich».']
];
M.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'').replace(/,$/,m=>m)),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg2'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Pronomen an.',why:m[2]});
});

const SECS=[
{id:'merkmale',title:'Was ist ein Pronomen?',short:'Merkmale',min:6,note:'Pronomen stehen für ein Nomen oder begleiten es. Hier: Artikel gehören in der Schule zu den Pronomen (Artikelwörter). Vorwissen zu Wortarten wiederholen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Pronomen ersetzen oder begleiten</h3><p><b>Anna</b> kommt. → <b>Sie</b> lacht. (ersetzt)</p><p><b>Mein</b> Hund bellt. (begleitet)</p></div>'+
 '<div class="card"><h3>Warum Pronomen?</h3><p>Ohne Pronomen klingt es seltsam:</p><p class="muted">«Anna sagt, dass Anna Annas Tasche vergessen hat.»</p><p>Mit Pronomen: «Anna sagt, dass <b>sie ihre</b> Tasche vergessen hat.»</p></div></div>'+
 '<div class="callout">Pronomen verändern sich nach <b>Fall</b>, <b>Geschlecht</b> und <b>Zahl</b>: er – ihn – ihm – sein.</div>'},
{id:'artikel',title:'Artikel',short:'Artikel',min:6,note:'Hier zählen die Artikel zu den Pronomen (Begleiter). Bestimmt: der, die, das. Unbestimmt: ein, eine.',
 html:()=>'<div class="grid2"><div class="card"><h3>Bestimmter Artikel</h3><p><b>der</b> Hund · <b>die</b> Katze · <b>das</b> Kind</p><p class="muted">Man meint etwas Bestimmtes.</p></div>'+
 '<div class="card"><h3>Unbestimmter Artikel</h3><p><b>ein</b> Hund · <b>eine</b> Katze · <b>ein</b> Kind</p><p class="muted">Man meint etwas Beliebiges.</p></div></div>'+
 '<div class="callout">Der Artikel zeigt <b>Geschlecht</b>, <b>Zahl</b> und <b>Fall</b> des Nomens.</div>'},
{id:'personal',title:'Personalpronomen',short:'Personalpronomen',min:10,note:'Tabelle an die Wandtafel. Fälle vorerst nur Nominativ, Akkusativ, Dativ. Erst dann Genitiv (nur Niveau A).',
 html:()=>T(['','Nominativ','Akkusativ','Dativ'],[['ich','ich','mich','mir'],['du','du','dich','dir'],['er','er','ihn','ihm'],['sie','sie','sie','ihr'],['es','es','es','ihm'],['wir','wir','uns','uns'],['ihr','ihr','euch','euch'],['sie (Mz.)','sie','sie','ihnen']])+
 '<div class="callout">Beispiel: <b>Er</b> (Nom.) sieht <b>mich</b> (Akk.) und gibt <b>mir</b> (Dat.) das Buch.</div>'},
{id:'possessiv',title:'Possessivpronomen',short:'Possessiv',min:8,note:'Possessivpronomen werden wie «ein» dekliniert. Vorsicht bei «ihr» (sie / Mehrzahl) und «Ihr» (Höflichkeitsform).',
 html:()=>'<div class="grid2"><div class="card"><h3>Wem gehört es?</h3>'+T(['Person','Possessivpronomen'],[['ich','mein'],['du','dein'],['er / es','sein'],['sie','ihr'],['wir','unser'],['ihr','euer'],['sie (Mz.)','ihr']])+'</div>'+
 '<div class="card"><h3>Endungen wie bei «ein»</h3><p>mein Hund · mein<b>e</b> Katze · mein Kind</p><p>Ich sehe mein<b>en</b> Hund. (Akkusativ)</p><p>Ich helfe mein<b>em</b> Freund. (Dativ)</p></div></div>'},
{id:'weitere',title:'Weitere Pronomen',short:'Weitere',lv:2,min:8,note:'Ab Niveau B. Nicht alle auswendig lernen, nur erkennen. Relativpronomen später bei Nebensätzen vertiefen.',
 html:()=>T(['Art','Beispiele','Verwendung'],[['Reflexivpronomen','mich, dich, sich, uns, euch','Ich wasche <b>mich</b>.'],['Demonstrativpronomen','dieser, diese, dieses','<b>Diese</b> Jacke gefällt mir.'],['Fragepronomen','wer, was, welcher, wessen','<b>Wer</b> kommt?'],['Indefinitpronomen','man, jemand, niemand, alle','<b>Man</b> darf hier nicht rauchen.'],['Relativpronomen','der, die, das, welcher','Der Mann, <b>der</b> dort steht …']])},
{id:'genitiv',title:'Genitivformen',short:'Genitiv',lv:3,min:6,note:'Nur Niveau A. Genitiv der Personalpronomen wird selten gebraucht (meiner, deiner, seiner); in der Praxis Possessiv.',
 html:()=>'<div class="card"><h3>Genitiv</h3><p>Das Haus <b>meiner</b> Eltern.</p><p>Wegen <b>seines</b> Fehlers.</p><p class="muted">Der Genitiv der Personalpronomen (meiner, deiner, seiner …) ist selten; häufiger ist das Possessiv.</p></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Verwechslungen: ihr/Ihr, seine/seins, dass/das.',
 html:()=>'<div class="grid3">'+[
  ['1 · sie oder Sie?','«<b>Sie</b> kommt.» (sie, Einzahl) / «<b>Sie</b> kommen.» (sie, Mehrzahl) / «Kommen <b>Sie</b>?» (höflich)','Höflichkeitsform immer gross.'],
  ['2 · ihn oder ihm?','«Ich sehe <b>ihn</b>.» / «Ich helfe <b>ihm</b>.»','Akkusativ: ihn. Dativ: ihm. Hilfe: wen? / wem?'],
  ['3 · ihr als Pronomen','«<b>Ihr</b> kommt.» (Personalpronomen)<br>«<b>Ihr</b> Hund bellt.» (Possessiv)','Ein Wort, zwei Rollen.'],
  ['4 · das oder dass?','«<b>Das</b> Buch» (Artikel/Pronomen)<br>«Ich weiss, <b>dass</b> er kommt.» (Konjunktion)','Probe: dieses / welches ersetzt → das.'],
  ['5 · seine Endung','«Er sucht <b>seinen</b> Hund.»','Possessiv richtet sich nach Nomen: seinen Hund, seine Katze.'],
  ['6 · mich oder mir?','«Er sieht <b>mich</b>.» / «Er gibt <b>mir</b> das Buch.»','Akkusativ: mich. Dativ: mir.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('personal,possessiv')}
];
const EX=[
 ['Ersetze durch ein Pronomen: «Der Hund bellt.»','Er bellt.',1],
 ['Ersetze durch ein Pronomen: «Ich sehe die Katze.»','Ich sehe sie.',1],
 ['Ersetze durch ein Pronomen: «Ich helfe dem Mann.»','Ich helfe ihm.',1],
 ['Setze ein Possessivpronomen ein: Er sucht (er) ___ Stift.','seinen',1],
 ['Setze ein Possessivpronomen ein: Wir feiern (wir) ___ Fest.','unser',1],
 ['Unterstreiche alle Pronomen: «Ich gebe ihr mein Buch.»','Ich · ihr · mein',1],
 ['Nenne zwei Reflexivpronomen und bilde je einen Satz.','Zum Beispiel: Ich wasche mich. Er freut sich.',2],
 ['Schreibe die Höflichkeitsform: «Kommst du morgen?» (an eine fremde Person)','Kommen Sie morgen?',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Pronomen','Sie ersetzen ein Nomen oder begleiten es.'],['Artikel','bestimmt: der, die, das · unbestimmt: ein, eine'],['Personalpronomen','ich, du, er, sie, es, wir, ihr, sie – ändern sich nach Fall: er – ihn – ihm'],['Possessiv','mein, dein, sein, ihr, unser, euer – Endungen wie bei «ein»'],['Weitere','Reflexiv: sich · Demonstrativ: dieser · Frage: wer · Indefinit: man · Relativ: der']])+
 T(['Person','Nom.','Akk.','Dat.'],[['ich','ich','mich','mir'],['du','du','dich','dir'],['er','er','ihn','ihm'],['sie','sie','sie','ihr'],['es','es','es','ihm'],['wir','wir','uns','uns'],['ihr','ihr','euch','euch'],['sie (Mz.)','sie','sie','ihnen']]);
GT.chapter({id:'pronomen',teil:'wort',nr:6,title:'Pronomen',big:'Er gibt ihr sein Buch',desc:'Artikel und Pronomen: ersetzen und begleiten',
 ex:'«'+mk('pron','Er')+' gibt '+mk('pron','ihr')+' '+mk('pron','sein')+' Buch.»',
 goals:['Ich erkenne bestimmte und unbestimmte Artikel.','Ich ersetze Nomen durch Personalpronomen in der richtigen Form.','Ich wähle das richtige Possessivpronomen.','Ich kenne weitere Pronomen (reflexiv, demonstrativ, Frage, unbestimmt).'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{artikel:{label:'Artikel erkennen',short:'bestimmt oder unbestimmt',instr:'Wähle die richtige Antwort.',hint:'bestimmt: der, die, das · unbestimmt: ein, eine.',ref:'artikel'},
  personal:{label:'Personalpronomen',short:'Nomen ersetzen',instr:'Welches Pronomen passt?',hint:'Geschlecht, Zahl und Fall des Nomens beachten. Wen? → Akk. Wem? → Dat.',ref:'personal'},
  possessiv:{label:'Possessivpronomen',short:'Wem gehört es?',instr:'Welche Form passt?',hint:'Wer ist der Besitzer? Welches Geschlecht und welchen Fall hat das Nomen?',ref:'possessiv'},
  wissen:{label:'Wissen',short:'Pronomenarten',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'weitere'},
  markieren:{label:'Pronomen markieren',short:'Alle Pronomen finden',instr:'Tippe alle Pronomen an.',hint:'Pronomen ersetzen oder begleiten ein Nomen.',ref:'merkmale'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
