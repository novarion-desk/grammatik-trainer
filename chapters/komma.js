/* Kapitel Satzlehre 8: Kommasetzung. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Aufzählung',sg2:'Haupt- und Nebensatz',sg3:'Relativsatz und Einschub',sg4:'Anrede, Ausruf, Infinitivgruppe'};
const task=[];

/* Welcher Satz ist richtig? [Richtig, Falsche1-3, Stufe, Kategorie, Hinweis] */
const R=[
['Ich kaufe Äpfel, Birnen und Bananen.',['Ich kaufe Äpfel Birnen und Bananen.','Ich kaufe Äpfel, Birnen, und Bananen.','Ich kaufe, Äpfel, Birnen und Bananen.'],1,'sg1','Aufzählung: Komma zwischen den Gliedern, vor «und» kein Komma.'],
['Wir spielen Fussball, Tennis und Basketball.',['Wir spielen Fussball Tennis und Basketball.','Wir spielen, Fussball, Tennis und Basketball.','Wir spielen Fussball, Tennis, und Basketball.'],1,'sg1','Aufzählung: vor «und» kein Komma.'],
['Er ist gross, stark und freundlich.',['Er ist gross stark und freundlich.','Er ist gross, stark, und freundlich.','Er ist, gross, stark und freundlich.'],1,'sg1','Aufzählung von Adjektiven.'],
['Sie singt laut, schön und lange.',['Sie singt laut schön und lange.','Sie singt laut, schön, und lange.','Sie singt, laut schön und lange.'],1,'sg1','Aufzählung.'],
['Ich bleibe zu Hause, weil ich krank bin.',['Ich bleibe zu Hause weil ich krank bin.','Ich bleibe zu Hause weil, ich krank bin.','Ich bleibe, zu Hause weil ich krank bin.'],1,'sg2','Vor einem Nebensatz steht ein Komma.'],
['Ich weiss, dass er kommt.',['Ich weiss dass er kommt.','Ich weiss dass, er kommt.','Ich, weiss dass er kommt.'],1,'sg2','Vor «dass» steht immer ein Komma.'],
['Obwohl es regnet, gehen wir hinaus.',['Obwohl es regnet gehen wir hinaus.','Obwohl, es regnet gehen wir hinaus.','Obwohl es regnet gehen, wir hinaus.'],1,'sg2','Nach einem vorangestellten Nebensatz steht ein Komma.'],
['Wenn du Hilfe brauchst, ruf mich an.',['Wenn du Hilfe brauchst ruf mich an.','Wenn, du Hilfe brauchst ruf mich an.','Wenn du Hilfe brauchst ruf, mich an.'],1,'sg2','Nach dem Nebensatz steht ein Komma.'],
['Es regnet, aber wir gehen hinaus.',['Es regnet aber wir gehen hinaus.','Es regnet aber, wir gehen hinaus.','Es, regnet aber wir gehen hinaus.'],1,'sg2','Vor «aber» steht ein Komma.'],
['Ich gehe nach Hause, denn ich bin müde.',['Ich gehe nach Hause denn ich bin müde.','Ich gehe nach Hause denn, ich bin müde.','Ich gehe, nach Hause denn ich bin müde.'],2,'sg2','Vor «denn» steht ein Komma.'],
['Ich lerne, damit ich die Prüfung bestehe.',['Ich lerne damit ich die Prüfung bestehe.','Ich lerne damit, ich die Prüfung bestehe.','Ich, lerne damit ich die Prüfung bestehe.'],1,'sg2','Vor «damit» steht ein Komma.'],
['Als wir ankamen, war das Essen fertig.',['Als wir ankamen war das Essen fertig.','Als, wir ankamen war das Essen fertig.','Als wir ankamen war, das Essen fertig.'],2,'sg2','Nach dem vorangestellten Nebensatz steht ein Komma.'],
['Der Mann, der dort steht, ist mein Onkel.',['Der Mann der dort steht ist mein Onkel.','Der Mann, der dort steht ist mein Onkel.','Der Mann der dort steht, ist mein Onkel.'],2,'sg3','Ein Relativsatz in der Mitte wird auf beiden Seiten mit Komma abgetrennt.'],
['Das Buch, das ich lese, ist spannend.',['Das Buch das ich lese ist spannend.','Das Buch, das ich lese ist spannend.','Das Buch das ich lese, ist spannend.'],2,'sg3','Relativsatz: Komma davor und danach.'],
['Anna, meine Schwester, wohnt in Bern.',['Anna meine Schwester wohnt in Bern.','Anna, meine Schwester wohnt in Bern.','Anna meine Schwester, wohnt in Bern.'],3,'sg3','Eingeschobene Erklärung (Apposition): Komma davor und danach.'],
['Lukas, komm bitte her!',['Lukas komm bitte her!','Lukas, komm, bitte her!','Lukas komm, bitte her!'],1,'sg4','Die Anrede wird durch ein Komma abgetrennt.'],
['Ja, ich komme mit.',['Ja ich komme mit.','Ja ich, komme mit.','Ja, ich, komme mit.'],1,'sg4','Nach «ja», «nein», «danke» steht ein Komma.'],
['Ach, das ist schade!',['Ach das ist schade!','Ach das, ist schade!','Ach, das, ist schade!'],2,'sg4','Nach einem Ausruf (ach, oh) steht ein Komma.'],
['Sie lernt viel, um die Prüfung zu bestehen.',['Sie lernt viel um die Prüfung zu bestehen.','Sie lernt, viel um die Prüfung zu bestehen.','Sie lernt viel um, die Prüfung zu bestehen.'],3,'sg4','Vor «um … zu» steht ein Komma.']
];
R.forEach(r=>task.push({typ:'komma',stufe:r[2],lv:r[2]===3?2:1,cats:[r[3]],prompt:'Welcher Satz ist richtig geschrieben?',opts:[r[0]].concat(r[1]),answer:r[0],why:'<b>'+r[0]+'</b> '+r[4]}));

/* Komma ja oder nein */
const J=[
['Ich kaufe Brot___ Milch und Käse.',true,1,'sg1','In einer Aufzählung trennt man mit Komma.'],
['Ich kaufe Brot, Milch ___ Käse.',false,1,'sg1','Vor «und» steht in der Aufzählung kein Komma.'],
['Ich weiss___ dass er kommt.',true,1,'sg2','Vor «dass» steht ein Komma.'],
['Sie ist müde___ weil sie wenig geschlafen hat.',true,1,'sg2','Vor «weil» steht ein Komma.'],
['Wir spielen___ aber es regnet.',true,1,'sg2','Vor «aber» steht ein Komma.'],
['Ich bleibe hier ___ bis du kommst.',true,2,'sg2','Vor «bis» im Nebensatz steht ein Komma.'],
['Ich esse einen Apfel ___ und eine Birne.',false,1,'sg1','«und» verbindet zwei Wörter: kein Komma.'],
['Der Hund___ der dort steht___ gehört mir.',true,2,'sg3','Relativsatz in der Mitte: Komma davor und danach.'],
['Nina___ komm bitte her!',true,1,'sg4','Die Anrede wird abgetrennt.'],
['Sie gibt sich Mühe___ um die Prüfung zu bestehen.',true,3,'sg4','Vor «um … zu» steht ein Komma.']
];
J.forEach(j=>task.push({typ:'ja',stufe:j[2],lv:j[2]===3?2:1,cats:[j[3]],sent:j[0].replace(/___ ?/g,'<span class="gap">_</span> ').replace(/ ___ /g,' <span class="gap">_</span> '),opts:['Komma setzen','Kein Komma'],answer:j[1]?'Komma setzen':'Kein Komma',why:'<b>'+(j[1]?'Komma setzen.':'Kein Komma.')+'</b> '+j[4]}));

/* Wissen */
const W=[
['Wann steht in einer Aufzählung <b>kein</b> Komma?',['vor «und» und «oder»','zwischen den Gliedern','nach dem ersten Wort','nie'],'vor «und» und «oder»','«Äpfel, Birnen und Bananen.»','sg1',1],
['Vor welchen Wörtern steht <b>immer</b> ein Komma?',['dass, weil, obwohl, damit','und, oder','der, die, das','ich, du, er'],'dass, weil, obwohl, damit','Nebensätze trennt man mit Komma.','sg2',1],
['Welche Konjunktion verlangt <b>kein</b> Komma zwischen zwei Hauptsätzen?',['und','aber','denn','sondern'],'und','Vor «und» und «oder» ist das Komma nicht Pflicht.','sg2',2],
['Wo stehen die Kommas im Relativsatz mitten im Satz?',['davor und danach','nur davor','nur danach','nirgends'],'davor und danach','«Der Mann, der dort steht, ist mein Onkel.»','sg3',2],
['Warum setzt man ein Komma vor «dass»?',['weil ein Nebensatz beginnt','weil «dass» ein Nomen ist','weil «dass» ein Verb ist','es gibt keinen Grund'],'weil ein Nebensatz beginnt','Haupt- und Nebensatz werden durch Komma getrennt.','sg2',1],
['Wie wird eine Anrede abgetrennt?',['durch ein Komma','durch einen Punkt','gar nicht','durch ein Fragezeichen'],'durch ein Komma','«Lukas, komm her!»','sg4',1],
['Was trennt man mit Kommas ab?',['Anrede, Ausruf und eingeschobene Erklärung','Nur Aufzählungen','Nur Nebensätze','Nur Hauptsätze'],'Anrede, Ausruf und eingeschobene Erklärung','Alle diese Teile sind vom Satz abgetrennt.','sg4',2],
['Was tun, wenn du dir bei einem Komma unsicher bist?',['Prüfen, ob ein Nebensatz beginnt (Verb am Ende)','Nie ein Komma setzen','Immer ein Komma setzen','Nach jedem dritten Wort ein Komma setzen'],'Prüfen, ob ein Nebensatz beginnt (Verb am Ende)','Das Verb am Ende zeigt den Nebensatz.','sg2',2]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["setzen", 2, "sg2", "Schreibe den Satz mit den richtigen Kommas ab.", "Ich hoffe dass es morgen schönes Wetter gibt.", "Ich hoffe, dass es morgen schönes Wetter gibt.", [], false, "Richtig gesetzt: «Ich hoffe, dass es morgen schönes Wetter gibt.»"], ["setzen", 1, "sg1", "Schreibe den Satz mit den richtigen Kommas ab.", "Tim kauft Äpfel Birnen und Bananen.", "Tim kauft Äpfel, Birnen und Bananen.", [], false, "Richtig gesetzt: «Tim kauft Äpfel, Birnen und Bananen.»"], ["setzen", 1, "sg2", "Schreibe den Satz mit den richtigen Kommas ab.", "Wir bleiben zu Hause weil es regnet.", "Wir bleiben zu Hause, weil es regnet.", [], false, "Richtig gesetzt: «Wir bleiben zu Hause, weil es regnet.»"], ["setzen", 2, "sg2", "Schreibe den Satz mit den richtigen Kommas ab.", "Sie ist müde aber sie spielt weiter.", "Sie ist müde, aber sie spielt weiter.", [], false, "Richtig gesetzt: «Sie ist müde, aber sie spielt weiter.»"], ["setzen", 3, "sg3", "Schreibe den Satz mit den richtigen Kommas ab.", "Der Hund der im Garten spielt gehört mir.", "Der Hund, der im Garten spielt, gehört mir.", [], false, "Richtig gesetzt: «Der Hund, der im Garten spielt, gehört mir.»"], ["setzen", 2, "sg2", "Schreibe den Satz mit den richtigen Kommas ab.", "Wenn die Sonne scheint gehen wir schwimmen.", "Wenn die Sonne scheint, gehen wir schwimmen.", [], false, "Richtig gesetzt: «Wenn die Sonne scheint, gehen wir schwimmen.»"], ["setzen", 1, "sg2", "Schreibe den Satz mit den richtigen Kommas ab.", "Lena sagt dass sie krank ist.", "Lena sagt, dass sie krank ist.", [], false, "Richtig gesetzt: «Lena sagt, dass sie krank ist.»"], ["setzen", 1, "sg1", "Schreibe den Satz mit den richtigen Kommas ab.", "Ich mag Pizza Pasta und Salat.", "Ich mag Pizza, Pasta und Salat.", [], false, "Richtig gesetzt: «Ich mag Pizza, Pasta und Salat.»"]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'auf',title:'Aufzählung',short:'Aufzählung',min:6,note:'Einfachste Regel zuerst: Aufzählung. «und» und «oder» ersetzen das Komma.',
 html:()=>'<div class="card"><p>Ich kaufe Äpfel<b>,</b> Birnen <b>und</b> Bananen.</p><p>Er ist gross<b>,</b> stark <b>und</b> freundlich.</p></div>'+
 '<div class="callout"><b>Merke:</b> Zwischen den Gliedern einer Aufzählung steht ein Komma. Vor <b>und</b> und <b>oder</b> steht <b>kein</b> Komma.</div>'},
{id:'haupt-neben',title:'Hauptsatz und Nebensatz',short:'Nebensatz',min:10,note:'Wichtigste Regel: Nebensatz = Komma. Nebensatz an Satzanfang → Komma nach dem Nebensatz. Nebensatz am Satzende → Komma davor.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nebensatz nachgestellt</h3><p>Ich bleibe zu Hause<b>,</b> weil ich krank bin.</p><p>Ich weiss<b>,</b> dass er kommt.</p></div>'+
 '<div class="card"><h3>Nebensatz vorangestellt</h3><p>Weil ich krank bin<b>,</b> bleibe ich zu Hause.</p><p>Obwohl es regnet<b>,</b> gehen wir hinaus.</p></div></div>'+
 '<div class="callout"><b>Merke:</b> Ein Nebensatz wird <b>immer</b> mit einem Komma vom Hauptsatz getrennt.</div>'},
{id:'hs-hs',title:'Zwei Hauptsätze',short:'Zwei Hauptsätze',min:8,note:'Vor aber, denn, sondern steht ein Komma. Vor und/oder darf es fehlen.',
 html:()=>T(['Konjunktion','Komma?','Beispiel'],[['aber, sondern, denn','ja','Es regnet<b>,</b> aber wir gehen hinaus.'],['und, oder','nicht nötig','Der Hund bellt <b>und</b> die Katze schläft.']])},
{id:'relativ',title:'Relativsatz und Einschub',short:'Relativsatz',lv:2,min:8,note:'Ab Niveau B. Ein eingeschobener Relativsatz wird mit zwei Kommas eingeschlossen.',
 html:()=>'<div class="card"><p>Der Mann<b>,</b> der dort steht<b>,</b> ist mein Onkel.</p><p>Anna<b>,</b> meine Schwester<b>,</b> wohnt in Bern.</p></div>'+
 '<div class="callout">Eingeschobenes steht <b>zwischen zwei Kommas</b>.</div>'},
{id:'sonst',title:'Anrede, Ausruf, Infinitivgruppe',short:'Weitere Regeln',min:8,note:'Infinitivgruppen: Komma ist teilweise Pflicht (um … zu, ohne … zu), sonst freiwillig.',
 html:()=>T(['Fall','Beispiel'],[['Anrede','Lukas<b>,</b> komm bitte her!'],['Ausruf','Ach<b>,</b> das ist schade!'],['Ja/Nein/Danke','Ja<b>,</b> ich komme mit.'],['Infinitivgruppe (um … zu)','Sie lernt viel<b>,</b> um die Prüfung zu bestehen.']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Fehler: Komma vor «und», fehlendes Komma vor «dass».',
 html:()=>'<div class="grid3">'+[
  ['1 · Komma vor «und»?','«Äpfel, Birnen <b>und</b> Bananen»','In einer Aufzählung kein Komma vor «und».'],
  ['2 · Komma vor «dass»','«Ich weiss<b>,</b> dass er kommt.»','Immer ein Komma.'],
  ['3 · Zwei Kommas beim Einschub','«Der Mann<b>,</b> der dort steht<b>,</b> …»','Wer einmal anfängt, muss auch schliessen.'],
  ['4 · Komma vor «aber»','«Ich will<b>,</b> aber ich kann nicht.»','Vor aber immer ein Komma.'],
  ['5 · Komma nach vorangestelltem Nebensatz','«Weil ich müde bin<b>,</b> gehe ich.»','Nicht vergessen.'],
  ['6 · Komma im falschen Satz','«Ich gehe, nach Hause.»','Kein Komma ohne Grund.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('komma,ja')}
];
const EX=[
 ['Setze die Kommas: «Ich kaufe Brot Milch Käse und Butter.»','Ich kaufe Brot, Milch, Käse und Butter.',1],
 ['Setze das Komma: «Ich weiss dass er kommt.»','Ich weiss, dass er kommt.',1],
 ['Setze das Komma: «Weil es regnet bleiben wir zu Hause.»','Weil es regnet, bleiben wir zu Hause.',1],
 ['Setze das Komma: «Es regnet aber wir gehen hinaus.»','Es regnet, aber wir gehen hinaus.',1],
 ['Setze die Kommas: «Der Hund der dort steht gehört mir.»','Der Hund, der dort steht, gehört mir.',2],
 ['Setze das Komma: «Lukas komm bitte her!»','Lukas, komm bitte her!',2],
 ['Schreibe einen Satz mit Aufzählung und einen mit «weil».','Beispiel: Ich esse Äpfel, Birnen und Trauben. Ich bleibe, weil ich müde bin.',2]
];
const merk=()=>T(['Regel','Beispiel'],[['Aufzählung (nicht vor und/oder)','Äpfel<b>,</b> Birnen <b>und</b> Bananen'],['Nebensatz','Ich weiss<b>,</b> dass er kommt.<br>Weil ich müde bin<b>,</b> gehe ich.'],['aber, denn, sondern','Ich will<b>,</b> aber ich kann nicht.'],['Relativsatz / Einschub','Der Mann<b>,</b> der dort steht<b>,</b> …'],['Anrede, Ausruf','Lukas<b>,</b> komm! · Ach<b>,</b> schade!'],['Infinitiv mit um … zu','Sie lernt<b>,</b> um zu bestehen.']]);
GT.chapter({id:'komma',teil:'satz',nr:9,title:'Kommasetzung',big:'Ich weiss, dass er kommt',desc:'Kommaregeln anwenden',
 ex:'«Ich weiss, dass er kommt.»',
 goals:['Ich setze das Komma in Aufzählungen.','Ich setze das Komma zwischen Haupt- und Nebensatz.','Ich setze Kommas beim Relativsatz, bei der Anrede und beim Ausruf.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{komma:{label:'Richtigen Satz wählen',short:'Welcher Satz ist richtig?',instr:'Welcher Satz ist richtig geschrieben?',hint:'Suche den Nebensatz, die Aufzählung oder den Einschub.',ref:'haupt-neben'},
  ja:{label:'Komma oder nicht',short:'Komma setzen?',instr:'Muss ein Komma stehen?',hint:'Beginnt ein Nebensatz? Ist es eine Aufzählung?',ref:'haupt-neben'},
  setzen:{icon:'✂️',label:'Kommas setzen',short:'Den Satz richtig abschreiben',instr:'Schreibe den Satz mit Kommas.',hint:'Suche Aufzählungen, Nebensätze und Einschübe.',ref:'haupt-neben'},
  wissen:{label:'Wissen',short:'Kommaregeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'auf'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
