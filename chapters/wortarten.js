/* Kapitel Wortlehre 1: Die fünf Wortarten. Registriert sich beim Trainer (GT). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,lv=GT.lv,tryW=GT.tryW,reveal=GT.reveal;
const N={nomen:'Nomen',verb:'Verb',adj:'Adjektiv',pron:'Pronomen',part:'Partikel'};
const K=Object.keys(N);
const tag=k=>'<span class="tag f-'+k+'">'+N[k]+'</span>';
const NAME2K={Nomen:'nomen',Verb:'verb',Adjektiv:'adj',Pronomen:'pron',Partikel:'part'};
const OPTS=K.map(k=>N[k]);

/* ---------- Aufgaben ---------- */
// [Satz mit [Wort], Wortart, Stufe, Begründung]
const B=[
['Der [Hund] bellt laut.','nomen',1,'Artikelprobe: «der Hund». Nomen schreibt man gross.'],
['Die Katze [schläft] auf dem Sofa.','verb',1,'Konjugationsprobe: ich schlafe, du schläfst, sie schläft.'],
['Das [kleine] Kind lacht.','adj',1,'Steigerungsprobe: klein – kleiner – am kleinsten.'],
['[Sie] liest ein Buch.','pron',1,'«Sie» steht stellvertretend für ein Nomen (zum Beispiel die Lehrerin).'],
['Wir gehen [in] die Schule.','part',1,'«in» verändert sich nie. Es ist eine Präposition und gehört zu den Partikeln.'],
['Ich esse einen [Apfel].','nomen',1,'Artikelprobe: «ein Apfel».'],
['Der Vater [kocht] das Essen.','verb',1,'Konjugationsprobe: ich koche, du kochst, er kocht.'],
['Ein [grosses] Haus steht am See.','adj',1,'Steigerungsprobe: gross – grösser – am grössten.'],
['[Wir] spielen Fussball.','pron',1,'«wir» ersetzt Nomen und Namen (Mia und ich).'],
['Die [Lehrerin] erklärt die Aufgabe.','nomen',1,'Artikelprobe: «die Lehrerin».'],
['Mia [singt] ein Lied.','verb',1,'Konjugationsprobe: ich singe, du singst, sie singt.'],
['Der [alte] Mann sitzt auf der Bank.','adj',1,'Steigerungsprobe: alt – älter – am ältesten.'],
['[Mein] Bruder spielt Gitarre.','pron',1,'«mein» ist ein Begleiter und gehört zu den Pronomen.'],
['Ich lese [und] schreibe gern.','part',1,'«und» ist eine Konjunktion. Sie verändert sich nie, also ein Partikel.'],
['Das Wasser ist [kalt].','adj',1,'Steigerungsprobe: kalt – kälter – am kältesten.'],
['Der Zug fährt [schnell].','adj',2,'«schnell» ist steigerbar (schneller, am schnellsten). Auch wenn es beim Verb steht, bleibt es ein Adjektiv.'],
['Er singt [schön].','adj',2,'Steigerungsprobe: schön – schöner – am schönsten. Also ein Adjektiv.'],
['[Der] Hund bellt.','pron',2,'Artikel sind Begleiter des Nomens und gehören zu den Pronomen.'],
['Sie wohnt [dort] seit einem Jahr.','part',2,'«dort» ist ein Adverb. Es lässt sich nicht verändern, also ein Partikel.'],
['Ich warte [auf] den Bus.','part',2,'«auf» ist eine Präposition und verändert sich nie.'],
['Er ist müde, [weil] er wenig geschlafen hat.','part',2,'«weil» ist eine Konjunktion und verändert sich nie.'],
['Wir haben [keinen] Hunger.','pron',2,'«kein» ist ein Begleiter und gehört zu den Pronomen.'],
['Heute [regnet] es.','verb',2,'Konjugationsprobe: ich regne gibt es nicht, aber es regnet, es regnete, es hat geregnet.'],
['Heute regnet [es].','pron',2,'«es» ist ein Pronomen.'],
['Sie [hat] einen Hund.','verb',2,'«haben» lässt sich konjugieren: ich habe, du hast, sie hat.'],
['Er hat den Ball [geworfen].','verb',2,'«geworfen» gehört zum Verb «werfen» (hat geworfen).'],
['Das ist ein [interessantes] Buch.','adj',2,'Steigerungsprobe: interessant – interessanter – am interessantesten.'],
['Die [Freude] war gross.','nomen',2,'Auch Gedanken und Gefühle sind Nomen. Artikelprobe: «die Freude».'],
['Ihr [Hund] ist krank.','nomen',2,'Artikelprobe: «ein Hund».'],
['[Ihr] Hund ist krank.','pron',2,'«ihr» steht als Begleiter vor dem Nomen und gehört zu den Pronomen.'],
['Wir freuen uns [sehr].','part',2,'«sehr» lässt sich nicht verändern. Es gehört zu den Partikeln.'],
['Er ist [nicht] da.','part',2,'«nicht» verändert sich nie, also ein Partikel.'],
['Du bist mein [bester] Freund.','adj',2,'«bester» ist die Steigerung von «gut» (gut – besser – am besten).'],
['Wir sind [gestern] angekommen.','part',2,'«gestern» ist ein Adverb. Es verändert sich nie.'],
['Das war ein [langer] Tag.','adj',2,'Steigerungsprobe: lang – länger – am längsten.'],
['Sie fährt [mit] dem Velo.','part',2,'«mit» ist eine Präposition.'],
['Ich [bin] müde.','verb',2,'«sein» lässt sich konjugieren: ich bin, du bist, er ist.'],
['Das [Lesen] macht mir Spass.','nomen',3,'«Lesen» steht hier mit dem Artikel «das». Es ist ein nominalisiertes Verb, also ein Nomen.'],
['Beim [Singen] vergisst sie alles.','nomen',3,'«beim» = «bei dem»: Das Verb ist nominalisiert und gross geschrieben.'],
['Er sagt, [dass] er müde ist.','part',3,'«dass» ist eine Konjunktion. Ersatzprobe mit «dieses» oder «welches» geht nicht.'],
['Das Buch, [das] ich lese, ist spannend.','pron',3,'«das» lässt sich durch «welches» ersetzen: Es ist ein Pronomen (Relativpronomen).'],
['Ich hoffe auf etwas [Schönes].','nomen',3,'Nach «etwas» wird das Adjektiv zum Nomen und gross geschrieben.'],
['[Morgen] gehe ich ins Kino.','part',3,'Hier ist «morgen» ein Adverb. Es verändert sich nicht und hat keinen Artikel.'],
['Am [Morgen] ist es kalt.','nomen',3,'«am» = «an dem». Mit dem Artikel ist «Morgen» ein Nomen.'],
['Er [arbeitet] am Wochenende.','verb',3,'Konjugationsprobe: ich arbeite, du arbeitest, er arbeitet.'],
['Die [Arbeit] ist anstrengend.','nomen',3,'Artikelprobe: «die Arbeit». Das Wort verändert sich nicht wie ein Verb.'],
['[Welche] Farbe magst du?','pron',3,'«welche» begleitet ein Nomen und gehört zu den Pronomen.'],
['Er läuft [schneller] als ich.','adj',3,'Komparativ von «schnell»: Das ist ein Adjektiv.']
];
const task=[];
B.forEach(b=>{
  const sent=b[0].replace(/\[(.+?)\]/,'<span class="hl">$1</span>');
  task.push({typ:'bestimmen',stufe:b[2],lv:b[2]===3?2:1,cats:[b[1]],sent,opts:OPTS,answer:N[b[1]],optCat:NAME2K,why:'<b>'+N[b[1]]+'.</b> '+b[3]});
});
// Markieren: Wörter mit * am Anfang sind Ziele
const M=[
['nomen','Der *Hund jagt die *Katze im *Garten.',1,'Nomen: Hund, Katze, Garten (Artikelprobe).'],
['verb','Mia *singt und *tanzt.',1,'Verben: singt, tanzt (Konjugationsprobe).'],
['adj','Das *kleine Kind trägt einen *roten Hut.',1,'Adjektive: kleine, roten (Steigerungsprobe).'],
['nomen','Meine *Schwester kauft *Brot und *Milch.',1,'Nomen: Schwester, Brot, Milch.'],
['verb','Wir *spielen draussen und *essen später ein Eis.',2,'Verben: spielen, essen. «draussen» und «später» verändern sich nicht (Adverbien).'],
['adj','Der *schnelle Zug fährt durch den *langen Tunnel.',2,'Adjektive: schnelle, langen.'],
['pron','*Ich zeige *dir *mein Zimmer.',2,'Pronomen: ich, dir, mein (Stellvertreter und Begleiter).'],
['part','Er bleibt *heute *zu Hause, *weil er krank ist.',2,'Partikel: heute (Adverb), zu (Präposition), weil (Konjunktion).'],
['part','Ich lese *gern *im Bett *und schlafe *dann.',2,'Partikel: gern, im, und, dann (verändern sich nie).'],
['nomen','Die *Freude über das *Geschenk war gross.',2,'Nomen: Freude (Gefühl), Geschenk.'],
['pron','*Der Hund gibt *seiner Besitzerin *die Pfote.',3,'Pronomen: der, seiner, die (Artikel und Begleiter gehören zu den Pronomen).'],
['verb','Sie *hat den Ball *geworfen und *ist *gerannt.',3,'Verben: hat, geworfen, ist, gerannt (Hilfsverben und Partizipien gehören zum Verb).']
];
const MI={nomen:'Nomen',verb:'Verben',adj:'Adjektive',pron:'Pronomen',part:'Partikel'};
M.forEach(m=>{
  const raw=m[1].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[2],lv:m[2]===3?2:1,cats:[m[0]],tokens,targets,instr:'Tippe alle '+MI[m[0]]+' an und prüfe.',why:m[3]});
});
// Wissen
const Z=[
['Welche Wortart verändert sich nie?',['Partikel','Nomen','Verb','Adjektiv'],'Partikel','Partikel sind unveränderlich: heute, auf, und.','part'],
['Mit welcher Probe erkennst du ein <b>Nomen</b>?',['Artikelprobe','Konjugationsprobe','Steigerungsprobe','Umstellprobe'],'Artikelprobe','Vor ein Nomen kann man einen Artikel setzen: der Hund, ein Haus.','nomen'],
['Mit welcher Probe erkennst du ein <b>Verb</b>?',['Konjugationsprobe','Artikelprobe','Steigerungsprobe','Ersatzprobe'],'Konjugationsprobe','Verben verändern sich nach Person und Zeit: ich lache, du lachst, sie lachte.','verb'],
['Mit welcher Probe erkennst du ein <b>Adjektiv</b>?',['Steigerungsprobe','Konjugationsprobe','Artikelprobe','Ersatzprobe'],'Steigerungsprobe','Adjektive kann man steigern: schön – schöner – am schönsten.','adj'],
['Welche Wortart steht <b>stellvertretend für ein Nomen</b>?',['Pronomen','Adjektiv','Partikel','Verb'],'Pronomen','Pronomen heissen auch Fürwörter: er, sie, es, wir.','pron'],
['Wie heisst das <b>Wiewort</b> in der Fachsprache?',['Adjektiv','Nomen','Verb','Pronomen'],'Adjektiv','Adjektive sagen, wie etwas ist: gross, rot, schnell.','adj'],
['Wie heisst das <b>Tunwort</b> in der Fachsprache?',['Verb','Nomen','Adjektiv','Partikel'],'Verb','Verben nennen Tätigkeiten, Vorgänge und Zustände.','verb'],
['Wie heisst das <b>Namenwort</b> in der Fachsprache?',['Nomen','Verb','Pronomen','Adjektiv'],'Nomen','Nomen benennen Lebewesen, Dinge und Gedanken.','nomen'],
['Welche Wortart schreibt man (fast) immer <b>gross</b>?',['Nomen','Verb','Adjektiv','Partikel'],'Nomen','Nomen schreibt man gross. Auch nominalisierte Wörter (das Lesen).','nomen'],
['Zu welcher Wortart gehören <b>der, die, das, ein, eine</b>?',['Pronomen','Nomen','Partikel','Adjektiv'],'Pronomen','Artikel sind Begleiter des Nomens. Sie gehören hier zu den Pronomen.','pron'],
['Zu welcher Wortart gehören <b>und, aber, weil</b>?',['Partikel','Pronomen','Adjektiv','Verb'],'Partikel','Konjunktionen sind unveränderlich, also Partikel.','part'],
['Zu welcher Wortart gehören <b>in, auf, mit, nach</b>?',['Partikel','Nomen','Adjektiv','Pronomen'],'Partikel','Präpositionen sind unveränderlich, also Partikel.','part'],
['Wie viele Wortarten unterscheiden wir hier?',['5','3','8','10'],'5','Nomen, Verb, Adjektiv, Pronomen und Partikel.','nomen'],
['Welche Wortarten sind <b>veränderbar</b>?',['Nomen, Verb, Adjektiv, Pronomen','Nur Nomen und Verb','Nur Verb und Adjektiv','Alle fünf'],'Nomen, Verb, Adjektiv, Pronomen','Nur die Partikel verändern sich nie.','part']
];
Z.forEach(z=>task.push({typ:'zuordnen',stufe:1,cats:[z[4]],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));

/* ---- NEU: Merkmale (Steckbriefe) ---- */
const SB=[
['Welche Wortart ist <b>konjugierbar</b>?',['Verb','Nomen','Adjektiv','Partikel'],'Verb','Verben werden konjugiert: ich lache, du lachst, sie lachte.','verb'],
['Welche Wortart ist <b>steigerbar</b>?',['Adjektiv','Nomen','Verb','Partikel'],'Adjektiv','Adjektive kann man steigern: schön, schöner, am schönsten.','adj'],
['Welche Wortart hat ein <b>festes Geschlecht</b> (der, die oder das)?',['Nomen','Verb','Adjektiv','Partikel'],'Nomen','Jedes Nomen hat ein festes Geschlecht: der Hund, die Katze, das Kind.','nomen'],
['Welche Wortart ist <b>Begleiter oder Stellvertreter</b>?',['Pronomen','Nomen','Verb','Adjektiv'],'Pronomen','Pronomen stehen für ein Nomen (sie) oder begleiten es (mein, der).','pron'],
['Welche Wortarten sind <b>deklinierbar</b>?',['Nomen, Adjektiv, Pronomen','Nomen, Verb, Partikel','Verb, Adjektiv, Partikel','nur Nomen'],'Nomen, Adjektiv, Pronomen','Deklinieren heisst in die Fälle setzen. Das geht bei Nomen, Adjektiven und Pronomen.','nomen'],
['Welche Wortarten gibt es in <b>Einzahl und Mehrzahl</b>?',['Nomen, Verb, Pronomen','Nomen, Adjektiv, Partikel','Verb, Adjektiv, Partikel','nur Nomen'],'Nomen, Verb, Pronomen','Nomen (Hund, Hunde), Verben (sie lacht, sie lachen) und Pronomen (er, wir) kennen Einzahl und Mehrzahl.','nomen'],
['Eine ___ umfasst alle Wörter mit den gleichen Merkmalen.',['Wortart','Satzart','Textart','Zeitform'],'Wortart','Nomen, Verben, Adjektive, Pronomen und Partikel sind Wortarten.','nomen'],
['Woran erkennst du die Wortart eines Wortes?',['an der Veränderbarkeit, nicht an der Bedeutung','nur an der Bedeutung','an der Länge des Wortes','an der Stelle im Satz'],'an der Veränderbarkeit, nicht an der Bedeutung','Die Bedeutung zählt nicht. Entscheidend ist, ob und wie sich ein Wort verändern lässt.','nomen']
];
SB.forEach(z=>task.push({typ:'zuordnen',stufe:1,cats:[z[4]],prompt:z[0],opts:z[1],answer:z[2],why:'<b>'+z[2]+'.</b> '+z[3]}));

/* ---- NEU: Fachbegriffe ---- */
const FB=[
['<b>Zeitwort</b> ist ein anderes Wort für ...',['Verb','Nomen','Adjektiv','Partikel'],'Verb','Zeitwort und Tunwort heissen beide Verb.','verb'],
['<b>Eigenschaftswort</b> ist ein anderes Wort für ...',['Adjektiv','Nomen','Verb','Pronomen'],'Adjektiv','Eigenschaftswort und Wiewort heissen beide Adjektiv.','adj'],
['<b>Hauptwort</b> ist ein anderes Wort für ...',['Nomen','Verb','Adjektiv','Pronomen'],'Nomen','Hauptwort, Namenwort und Substantiv heissen alle Nomen.','nomen'],
['<b>Fürwort</b> ist ein anderes Wort für ...',['Pronomen','Nomen','Partikel','Verb'],'Pronomen','Pronomen heissen auch Fürwörter.','pron'],
['Welche Wortart heisst auch <b>unveränderliches Wort</b>?',['Partikel','Pronomen','Adjektiv','Verb'],'Partikel','Partikel verändern sich nie.','part'],
['Wie heisst der <b>Begleiter</b> (der, die, das) in der Fachsprache?',['Artikel','Nomen','Verb','Partikel'],'Artikel','Der Artikel begleitet das Nomen. Er gehört zu den Pronomen.','pron']
];
FB.forEach(f=>task.push({typ:'begriff',stufe:1,cats:[f[4]],prompt:f[0],opts:f[1],answer:f[2],why:'<b>'+f[2]+'.</b> '+f[3]}));
const FI=[
['Anderes Wort für Verb: ___','Zeitwort',['Tunwort'],'Gültig sind: Zeitwort, Tunwort.','verb'],
['Anderes Wort für Adjektiv: ___','Eigenschaftswort',['Wiewort'],'Gültig sind: Eigenschaftswort, Wiewort.','adj'],
['Anderes Wort für Nomen: ___','Hauptwort',['Namenwort','Substantiv'],'Gültig sind: Hauptwort, Namenwort, Substantiv.','nomen'],
['Anderes Wort für Pronomen: ___','Fürwort',[],'Pronomen = Fürwort.','pron'],
['Die Wortart, die sich nie verändert: ___','Partikel',[],'Partikel sind unveränderliche Wörter.','part'],
['Anderes Wort für Artikel: ___','Begleiter',[],'Der Artikel ist der Begleiter des Nomens.','pron']
];
FI.forEach(f=>task.push({typ:'begriffin',stufe:2,cats:[f[4]],input:true,prompt:'Schreibe den Fachbegriff.',sent:f[0],answer:f[1],accept:f[2],strict:true,why:'<b>'+f[1]+'.</b> '+f[3]}));


task.forEach(t=>{if(t.typ==='bestimmen'&&t.answer==='Partikel')t.accept=['Adverb','Präposition','Konjunktion'];});
/* Alle Wortarten im Text bestimmen (anmalen) */
const AN=[
[1,"Die|pron Katze|nomen schläft|verb auf|part dem|pron Sofa|nomen."],
[1,"Ich|pron lese|verb ein|pron spannendes|adj Buch|nomen."],
[1,"Der|pron Hund|nomen bellt|verb laut|part."],
[2,"Meine|pron kleine|adj Schwester|nomen trinkt|verb gern|part warmen|adj Tee|nomen."],
[2,"Wir|pron spielen|verb heute|part draussen|part Fussball|nomen, weil|part die|pron Sonne|nomen scheint|verb."],
[3,"Gestern|part sah|verb ich|pron einen|pron alten|adj Mann|nomen. Er|pron fütterte|verb die|pron hungrigen|adj Tauben|nomen."],
[3,"Lena|nomen backt|verb einen|pron Kuchen|nomen, und|part ihr|pron Bruder|nomen deckt|verb den|pron Tisch|nomen."],
[1,"Mia|nomen hat|verb einen|pron neuen|adj Rucksack|nomen. Er|pron ist|verb sehr|part leicht|adj."],
[1,"Meine|pron Freundin|nomen spielt|verb heute|part Fussball|nomen. Sie|pron ist|verb schnell|adj."],
[2,"In|part der|pron Pause|nomen essen|verb wir|pron ein|pron grosses|adj Stück|nomen Kuchen|nomen, weil|part Lena|nomen Geburtstag|nomen hat|verb."],
[2,"Der|pron Lehrer|nomen erklärt|verb die|pron schwierige|adj Aufgabe|nomen, aber|part niemand|pron versteht|verb sie|pron."],
[3,"Gestern|part habe|verb ich|pron mit|part meinem|pron besten|adj Freund|nomen telefoniert|verb. Wir|pron planen|verb eine|pron lange|adj Wanderung|nomen."],
[3,"Nach|part dem|pron Training|nomen essen|verb alle|pron gern|part Pizza|nomen."]
];
AN.forEach(a=>{
  const parts=a[1].split(' ').map(w=>{const i=w.indexOf('|');if(i<0)return{t:w,f:null};const m=w.slice(i+1).match(/^([a-z]+)(.*)$/);return{t:w.slice(0,i)+m[2],f:m[1]};});
  const cats=[...new Set(parts.filter(p=>p.f).map(p=>p.f))];
  task.push({typ:'anmalen',stufe:a[0],lv:a[0]===3?2:1,cats,parts,sent:'',why:parts.filter(p=>p.f).map(p=>p.t.replace(/[.,]$/,'')+' → '+N[p.f]).join(' · ')});
});

/* ---------- Theorie (gemeinsam für Schüler und Lehrer) ---------- */
const FAM=GT.table(['Wortart','Auch genannt','Aufgabe','Beispiele','Verändert sich?'],[
 ['<span class="tag f-nomen">Nomen</span>','Namenwort, Hauptwort, Substantiv','nennt Lebewesen, Dinge und Gedachtes','Hund, Haus, Freude','ja: Fall und Zahl'],
 ['<span class="tag f-verb">Verb</span>','Tunwort, Zeitwort','Tätigkeit, Vorgang, Zustand','laufen, regnen, sein','ja: Person, Zahl, Zeit'],
 ['<span class="tag f-adj">Adjektiv</span>','Wiewort, Eigenschaftswort','sagt, wie etwas ist','klein, schnell, rot','ja: Steigerung, Endung'],
 ['<span class="tag f-pron">Pronomen</span>','Fürwort (Artikel: Begleiter)','steht für ein Nomen oder begleitet es (auch Artikel)','er, wir, mein, der, ein','ja: Fall, Zahl, Geschlecht'],
 ['<span class="tag f-part">Partikel</span>','unveränderliches Wort','unveränderliche Wörter (Adverb, Präposition, Konjunktion)','heute, auf, und, nicht','nein, nie']]);
const SECS=[
{id:'ueberblick',title:'Die fünf Wortarten im Überblick',short:'Überblick',min:8,note:'Zuerst die Frage stellen: Wie viele Wörter gibt es im Deutschen? Dann zeigen, dass man sie in fünf Gruppen ordnen kann. Die Beispielsätze laut vorlesen und die Farben zeigen.',
 html:()=>'<p class="lead">Jedes Wort gehört zu einer Wortart. Wortarten helfen dir, Sätze zu verstehen und richtig zu schreiben.</p>'+
 '<div class="card"><p class="sent" style="margin:.2rem 0">«'+mk('pron','Die')+' '+mk('adj','kleine')+' '+mk('nomen','Katze')+' '+mk('verb','schläft')+' '+mk('part','dort')+'.»</p></div><div style="height:.8rem"></div>'+FAM+
 '<div class="callout"><b>Merke:</b> Nomen, Verb, Adjektiv und Pronomen kann man verändern (flektieren). Partikel verändern sich nie.</div>'+
 '<div class="callout"><b>Wichtig:</b> Die Bedeutung eines Wortes zählt nicht. Entscheidend ist, ob und wie sich das Wort verändern lässt. Eine <b>Wortart</b> umfasst alle Wörter mit den gleichen Merkmalen.</div>'},
{id:'steckbriefe',title:'Steckbriefe der fünf Wortarten',short:'Steckbriefe',min:8,note:'Die Merkmale zuerst von der Klasse nennen lassen, dann die Tabelle aufdecken. Bei jedem Merkmal ein Beispielwort nennen. Die Tabelle ist die Grundlage für die Proben auf der Folie «So gehst du vor».',
 html:()=>'<p class="lead">Jede Wortart hat typische <b>Merkmale</b>. Daran erkennst du sie.</p>'+GT.table(['Merkmal','Nomen','Verb','Adjektiv','Pronomen','Partikel'],[['veränderbar','✓','✓','✓','✓','–'],['unveränderbar','–','–','–','–','✓'],['deklinierbar (in die Fälle setzen)','✓','–','✓','✓','–'],['konjugierbar (nach Person und Zeit)','–','✓','–','–','–'],['steigerbar','–','–','✓','–','–'],['Einzahl und Mehrzahl','✓','✓','–','✓','–'],['festes Geschlecht','✓','–','–','–','–'],['gross geschrieben','✓','–','–','–','–'],['Begleiter oder Stellvertreter','–','–','–','✓','–']])+'<div class="callout">Die Tabelle zeigt, was für die Wortart <b>typisch</b> ist. Beispiele: Nur Verben kann man konjugieren, nur Adjektive kann man steigern.</div>'},

{id:'nomen',title:'Nomen (Namenwörter)',short:'Nomen',min:6,note:'Beispiele sammeln lassen: Lebewesen, Dinge, Gedanken. Dann die Artikelprobe vormachen. Gross schreiben gehört zum Nomen, ist aber keine Probe.',
 html:()=>'<div class="grid2"><div class="card"><h3>Was sind Nomen?</h3><p>Nomen nennen <b>Lebewesen</b> (Hund, Lehrerin), <b>Dinge</b> (Tisch, Velo) und <b>Gedachtes</b> (Gedanken und Gefühle: Freude, Mut).</p><p>Nomen schreibt man <b>gross</b>.</p></div>'+
 '<div class="card"><h3>Die Artikelprobe</h3><p>Kannst du einen Artikel davor setzen (der, die, das, ein, eine)? Dann ist es ein Nomen.</p><p>der <b>Hund</b> · die <b>Freude</b> · ein <b>Haus</b></p><p class="muted">Auch Verben und Adjektive können zu Nomen werden: <i>das Lesen</i>, <i>etwas Schönes</i>.</p></div></div>'+
 '<div class="callout">Nomen verändern sich nach <b>Fall</b> (der Hund, des Hundes) und <b>Zahl</b> (der Hund, die Hunde). Sie haben ein festes <b>Geschlecht</b> (der, die oder das).</div>'},
{id:'verb',title:'Verb (Tunwörter)',short:'Verb',min:6,note:'Verben nicht nur als «Tätigkeit» einführen: regnen, sein, haben sind auch Verben. Konjugationsprobe mit zwei bis drei Wörtern gemeinsam durchführen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Was sind Verben?</h3><p>Verben nennen <b>Tätigkeiten</b> (laufen), <b>Vorgänge</b> (regnen) und <b>Zustände</b> (sein, schlafen).</p></div>'+
 '<div class="card"><h3>Die Konjugationsprobe</h3><p>Kannst du das Wort nach Person und Zeit verändern? Dann ist es ein Verb.</p>'+GT.table(['','lachen','sein'],[['ich','ich lache','ich bin'],['du','du lachst','du bist'],['sie','sie lacht','sie ist'],['Vergangenheit','sie lachte','sie war']])+'</div></div>'+
 '<div class="callout">Auch <b>sein</b>, <b>haben</b> und <b>werden</b> sind Verben. «hat geworfen» sind zwei Verbformen eines Verbs.</div>'},
{id:'adjektiv',title:'Adjektiv (Wiewörter)',short:'Adjektiv',min:6,note:'Wichtig: Das Adjektiv bleibt ein Adjektiv, auch wenn es beim Verb steht (Er singt schön). Steigerungsprobe an der Wandtafel mit drei Beispielen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Was sind Adjektive?</h3><p>Adjektive sagen, <b>wie</b> etwas ist: klein, rot, schnell, freundlich.</p><p>Sie stehen vor einem Nomen (<i>das kleine Kind</i>) oder beim Verb (<i>Er singt schön.</i>).</p></div>'+
 '<div class="card"><h3>Die Steigerungsprobe</h3><p>Kannst du das Wort steigern? Dann ist es ein Adjektiv.</p>'+GT.table(['Grundform','Vergleichsform','Höchstform'],[['klein','kleiner','am kleinsten'],['schön','schöner','am schönsten'],['gut','besser','am besten']])+'</div></div>'+
 '<div class="callout">Manche Adjektive kann man nicht steigern (tot, leer). Dann hilft die zweite Probe: Passt das Wort vor ein Nomen mit Endung (<i>ein leeres Glas</i>)?</div>'},
{id:'pronomen',title:'Pronomen (Fürwörter, auch Artikel)',short:'Pronomen',min:7,note:'Hier die Entscheidung des Lehrmittels klar sagen: Artikel gehören zu den Pronomen (Begleiter). Ersatzprobe: Pronomen ersetzt ein Nomen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Stellvertreter</h3><p>Sie stehen <b>für ein Nomen</b>.</p><p>«Die Lehrerin lacht.» → «<b>Sie</b> lacht.»</p><p class="muted">ich, du, er, sie, es, wir, ihr, sie</p></div>'+
 '<div class="card"><h3>Begleiter</h3><p>Sie stehen <b>vor einem Nomen</b>.</p><p><b>der</b> Hund · <b>ein</b> Haus · <b>mein</b> Bruder · <b>diese</b> Katze · <b>kein</b> Geld</p><p class="muted">Artikel gehören zu den Begleitern.</p></div></div>'+
 '<div class="callout"><b>Ersatzprobe:</b> Kann das Wort ein Nomen ersetzen (<i>sie</i>) oder es begleiten (<i>mein</i>)? Dann ist es ein Pronomen.</div>'},
{id:'partikel',title:'Partikel (unveränderliche Wörter)',short:'Partikel',min:7,note:'Betonen: Alle Wörter, die sich nie verändern. Die drei Gruppen reichen für diese Stufe. Die Satzbaustein-Funktion kommt später in der Satzlehre.',
 html:()=>'<p class="lead">Partikel verändern sich <b>nie</b>. Man kann sie nicht konjugieren und nicht deklinieren. Nur wenige Adverbien lassen sich steigern (gern – lieber), sie bleiben trotzdem Partikel.</p>'+
 GT.table(['Gruppe','Aufgabe','Beispiele'],[['Adverb','sagt Ort, Zeit, Art oder Grund','heute, dort, gern, sehr, nicht'],['Präposition','verbindet ein Nomen mit dem Satz','in, auf, mit, nach, von'],['Konjunktion','verbindet Wörter oder Sätze','und, aber, weil, dass']])+
 '<div class="callout">Hinweis: Die Partikel brauchst du oft in Sätzen. Die genaue Unterscheidung lernst du im Kapitel «Partikel».</div>'},
{id:'proben',title:'Wortarten bestimmen: so gehst du vor',short:'Bestimmen',min:10,note:'Den Entscheidungsweg Schritt für Schritt an drei Wörtern zeigen. Danach «Probier es aus» nutzen.',
 html:()=>'<div class="callout"><b>Merke:</b> Die Bedeutung zählt nicht. Du prüfst, wie sich das Wort verändern lässt.</div><div style="height:.6rem"></div><div class="card"><ol class="steps">'+
 '<li><b>Verändert sich das Wort?</b> Nein → <span class="tag f-part">Partikel</span></li>'+
 '<li><b>Steht ein Artikel davor?</b> Ja → <span class="tag f-nomen">Nomen</span> (<i>das Lesen</i>)</li>'+
 '<li><b>Lässt es sich konjugieren?</b> (ich lache, du lachst) Ja → <span class="tag f-verb">Verb</span></li>'+
 '<li><b>Lässt es sich steigern?</b> (klein, kleiner) Ja → <span class="tag f-adj">Adjektiv</span><br><span class="muted">Zweite Probe, die <b>Sandwichprobe</b>: Passt das Wort zwischen Artikel und Nomen? der <i>schöne</i> Hund</span></li>'+
 '<li><b>Ersetzt oder begleitet es ein Nomen?</b> (sie, mein, der) Ja → <span class="tag f-pron">Pronomen</span><br><span class="muted">Hilfe, die <b>Listenprobe</b>: Steht das Wort auf der Pronomenliste (ich, du, er, wir, mein, dein, der, die, das, dieser, wer, jemand)?</span></li></ol></div>'+
 '<div class="grid2" style="margin-top:.8rem">'+[
  ['Der alte Hund schläft dort.',[['Der','pron','Artikel (Begleiter)'],['alte','adj','alt – älter – am ältesten'],['Hund','nomen','der Hund'],['schläft','verb','ich schlafe, du schläfst'],['dort','part','verändert sich nie']]],
  ['Sie gibt ihm einen Apfel.',[['Sie','pron','Stellvertreter'],['gibt','verb','ich gebe, du gibst'],['ihm','pron','Stellvertreter'],['einen','pron','Artikel (Begleiter)'],['Apfel','nomen','ein Apfel']]]
 ].map(x=>'<div class="card"><p class="sent">«'+x[0]+'»</p>'+reveal('Wortarten aufdecken',x[1].map(r=>'<p>'+mk(r[1],r[0])+' → '+tag(r[1])+' <span class="muted">('+r[2]+')</span></p>').join(''))+'</div>').join('')+'</div>'+tryW('bestimmen')},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Die Begriffe laut sprechen lassen. Diese Wörter kommen in Prüfungen vor. Zuerst das deutsche Wort, dann das Fremdwort.',
 html:()=>'<p class="lead">Jede Wortart hat zwei Namen: ein Fremdwort und ein deutsches Wort.</p>'+GT.table(['Fachbegriff','Auf Deutsch','Beispiel'],[['Nomen / Substantiv','Namenwort, Hauptwort','der Hund, die Freude'],['Verb','Tunwort, Zeitwort','laufen, regnen, sein'],['Adjektiv','Wiewort, Eigenschaftswort','klein, schnell, rot'],['Pronomen','Fürwort','er, wir, mein'],['Artikel','Begleiter','der, die, das, ein'],['Partikel','unveränderliches Wort','heute, auf, und'],['Wortart','Gruppe von Wörtern mit gleichen Merkmalen','Nomen, Verb, Adjektiv …']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Pro Stolperstein ein bis zwei Beispiele von den Schülern bilden lassen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Verb oder Nomen?','«Sie <b>arbeitet</b>.» (Verb)<br>«Die <b>Arbeit</b> ist gut.» (Nomen)','Mit Artikel davor und grossgeschrieben ist es ein Nomen. Mit Person und Zeit ist es ein Verb.'],
  ['2 · Adjektiv beim Verb','«Er singt <b>schön</b>.»','Auch wenn es beim Verb steht: Wenn man es steigern kann (schöner), ist es ein Adjektiv.'],
  ['3 · Der Artikel gehört zum Pronomen','«<b>Der</b> Hund bellt.»','Artikel sind Begleiter und gehören hier zu den Pronomen.'],
  ['4 · Morgen oder morgen','«<b>Morgen</b> gehe ich.» (Partikel)<br>«Am <b>Morgen</b> ist es kalt.» (Nomen)','Mit Artikel ist es ein Nomen, ohne Artikel ein Adverb.'],
  ['5 · Verben werden zu Nomen','«Das <b>Lesen</b> macht Spass.»','Mit Artikel davor wird das Verb zum Nomen und wird gross geschrieben.'],
  ['6 · das oder dass?','«Ich weiss, <b>dass</b> du kommst.» (Partikel)<br>«Das Buch, <b>das</b> ich lese.» (Pronomen)','Ersatzprobe mit «welches»: Geht es? Dann «das». Geht es nicht? Dann «dass».']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'},
{id:'erweiterung',title:'Erweiterung',short:'Erweiterung',lv:2,min:6,note:'Nur ab Niveau B sichtbar.',
 html:()=>'<div class="grid2"><div class="card"><h3>Wörter ändern ihre Wortart</h3><p>Aus einem Verb wird ein Nomen: <i>lesen → das Lesen</i>.</p><p>Aus einem Adjektiv wird ein Nomen: <i>schön → etwas Schönes</i>.</p><p>Aus einem Nomen wird ein Adjektiv: <i>die Freude → freudig</i>.</p></div>'+
  '<div class="card"><h3>Wörter bilden</h3><p>Mit Endungen entstehen neue Wörter:</p><p><b>-ung</b>: wohnen → die Wohnung (Nomen)<br><b>-lich</b>: Freund → freundlich (Adjektiv)<br><b>-en</b>: Arbeit → arbeiten (Verb)</p></div></div>'+
  (lv()>=3?'<div class="callout"><b>Nur Niveau A:</b> Gleiche Wortform, verschiedene Wortart: <i>schnell</i> (Adjektiv: ein schneller Zug) und <i>bis</i> (Präposition: bis morgen) und <i>bis</i> (Konjunktion: bis du kommst).</div>':'')}
];
const EX=[
 ['Bestimme die Wortarten: «Die kleine Katze schläft auf dem Sofa.»',tag('pron')+' Die · '+tag('adj')+' kleine · '+tag('nomen')+' Katze · '+tag('verb')+' schläft · '+tag('part')+' auf · '+tag('pron')+' dem · '+tag('nomen')+' Sofa',1],
 ['Steigerungsprobe: Ist «schnell» ein Adjektiv? Steigere es.','schnell – schneller – am schnellsten → '+tag('adj'),1],
 ['Konjugiere «lachen» (ich, du, sie).','ich lache · du lachst · sie lacht → '+tag('verb'),1],
 ['Ersetze durch Pronomen: «Die Lehrerin gibt dem Schüler das Buch.»','«Sie gibt es ihm.» → '+tag('pron'),1],
 ['Warum ist «Lesen» in «Das Lesen macht Spass» ein Nomen?','Der Artikel «das» steht davor, und das Wort ist gross geschrieben. → '+tag('nomen'),1],
 ['Bestimme «weil» und «auf»: «Er bleibt zu Hause, weil er auf Besuch wartet.»','weil (Konjunktion) und auf (Präposition) verändern sich nie → '+tag('part'),1],
 ['Welche Wortart hat diese Merkmale? «konjugierbar» · «steigerbar» · «festes Geschlecht» · «unveränderbar»','Verb · Adjektiv · Nomen · Partikel',1],
 ['Schreibe die Fachbegriffe: anderes Wort für Verb, Adjektiv, Nomen, Pronomen, Artikel.','Zeitwort · Eigenschaftswort · Hauptwort · Fürwort · Begleiter',1],
 ['Schreibe je ein Nomen, ein Verb und ein Adjektiv zum Thema Schule.','Zum Beispiel: Lehrerin (Nomen), lernen (Verb), müde (Adjektiv)',1],
 ['Bestimme alle Wortarten: «Mein Bruder liest heute ein spannendes Buch.»','Mein (Pronomen/Begleiter) · Bruder (Nomen) · liest (Verb) · heute (Partikel) · ein (Artikel) · spannendes (Adjektiv) · Buch (Nomen)',2]
];
const merk=()=>FAM+'<p style="margin-top:.7rem"><b>Merke:</b> Die Bedeutung zählt nicht, nur wie sich ein Wort verändern lässt.</p><h3 style="margin-top:.9rem">So bestimmst du die Wortart</h3><ol><li>Verändert es sich? Nein → Partikel.</li><li>Artikel davor? → Nomen.</li><li>Konjugieren? → Verb.</li><li>Steigern? → Adjektiv (auch Sandwichprobe: der schöne Hund).</li><li>Ersetzt oder begleitet es ein Nomen? → Pronomen (auch Listenprobe).</li></ol>'+
 '<h3>Stolpersteine</h3><ul><li>Das Lesen, die Arbeit: Mit Artikel ist es ein Nomen.</li><li>Er singt schön: «schön» bleibt ein Adjektiv.</li><li>Artikel (der, die, das, ein) gehören zu den Pronomen.</li></ul>';
const UEM={'nomen':{types:'bestimmen'},'verb':{types:'bestimmen'},'adjektiv':{types:'bestimmen'},'pronomen':{types:'bestimmen'},'partikel':{types:'bestimmen'},'proben':{types:'bestimmen'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
GT.chapter({id:'wortarten',teil:'wort',nr:1,title:'Die fünf Wortarten',big:'Nomen, Verb, Adjektiv, Pronomen, Partikel',desc:'Nomen, Verb, Adjektiv, Pronomen und Partikel erkennen',
 ex:'«'+mk('pron','Die')+' '+mk('adj','kleine')+' '+mk('nomen','Katze')+' '+mk('verb','schläft')+' '+mk('part','dort')+'.»',
 goals:['Ich kenne die fünf Wortarten: Nomen, Verb, Adjektiv, Pronomen und Partikel.','Ich weiss, welche Wortarten sich verändern und welche nicht.','Ich kann Wortarten mit Proben bestimmen (Artikelprobe, Konjugationsprobe, Steigerungsprobe, Ersatzprobe).','Ich kann Wortarten in Sätzen erkennen und bestimmen.','Ich kenne die Merkmale der Wortarten (veränderbar, konjugierbar, deklinierbar, steigerbar).','Ich kenne die Fachbegriffe: Zeitwort, Eigenschaftswort, Hauptwort, Fürwort, Begleiter.'],
 writeAny:['bestimmen'], cats:N,catTitle:'Welche Wortarten?',catWord:'Wortart',
 types:{bestimmen:{label:'Wortart bestimmen',short:'Wort im Satz bestimmen',instr:'Welche Wortart hat das markierte Wort?',hint:'Mache die Proben: Verändert es sich? Artikel davor? Konjugieren? Steigern? Ersetzt es ein Nomen?',ref:'proben'},
  anmalen:{icon:'🎨',label:'Wortarten im Text',short:'Alle Wortarten in einem Text anmalen',instr:'Wähle eine Wortart und tippe die passenden Wörter an.',hint:'Wende bei jedem Wort die Probe an: Artikelprobe, Konjugationsprobe, Steigerung.',ref:'proben'},
  markieren:{label:'Wörter markieren',short:'Alle Wörter einer Wortart finden',instr:'Tippe die passenden Wörter an.',hint:'Wende bei jedem Wort die passende Probe an.',ref:'proben'},
  zuordnen:{label:'Wissen und Proben',short:'Begriffe, Proben und Merkmale',instr:'Wähle die richtige Antwort.',hint:'Schau in die Steckbriefe der fünf Wortarten.',ref:'steckbriefe'},
  begriff:{icon:'📚',label:'Fachbegriffe wählen',short:'Fremdwort und deutsches Wort',instr:'Wähle den richtigen Begriff.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  begriffin:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Achte auf Gross- und Kleinschreibung.',hint:'Nomen schreibt man gross, Verben klein.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
