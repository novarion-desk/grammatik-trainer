/* Kapitel Wortlehre 2: Nomen. Registriert sich beim Trainer (GT). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,lv=GT.lv,tryW=GT.tryW,reveal=GT.reveal,T=GT.table;
const C={sg1:'Artikel und Geschlecht',sg2:'Mehrzahl',sg3:'Gross- und Kleinschreibung',sg4:'Nomenarten',sg5:'Zusammensetzung und Homonyme',sg6:'Fachbegriffe'};
const task=[];
const hl=s=>'<span class="hl">'+s+'</span>';

/* Artikel und Geschlecht: [Nomen, Artikel, Stufe, Hinweis] */
const G=[
['Hund','der',1],['Katze','die',1],['Kind','das',1],['Baum','der',1],['Blume','die',1],['Haus','das',1],['Tisch','der',1],['Lampe','die',1],['Buch','das',1],['Stuhl','der',1],['Schule','die',1],['Auto','das',1],['Lehrer','der',1],['Lehrerin','die',1,'Die Endung -in zeigt weibliche Personen: immer «die».'],
['Mädchen','das',2,'Die Endung -chen macht Nomen sächlich: das Mädchen, das Häuschen.'],['Kätzchen','das',2,'Die Endung -chen macht Nomen sächlich.'],['Wohnung','die',2,'Die Endung -ung ist immer weiblich: die Wohnung, die Zeitung.'],['Zeitung','die',2,'Die Endung -ung ist immer weiblich.'],['Freiheit','die',2,'Die Endung -heit ist immer weiblich.'],['Schwierigkeit','die',2,'Die Endung -keit ist immer weiblich.'],['Freundschaft','die',2,'Die Endung -schaft ist immer weiblich.'],['Ergebnis','das',2,'Die Endung -nis ist meist sächlich: das Ergebnis, das Erlebnis.'],
['Computer','der',2],['Handy','das',2],['Tastatur','die',2,'Die Endung -ur ist meist weiblich: die Tastatur, die Natur.'],['Sofa','das',2],['Löffel','der',2],['Gabel','die',2],['Messer','das',2],['Banane','die',2],['Salat','der',2],['Milch','die',2],['Wasser','das',2],['Brot','das',2],['Sommer','der',2,'Jahreszeiten sind männlich: der Frühling, der Sommer, der Herbst, der Winter.'],['Sonne','die',2],['Mond','der',2],['Wetter','das',2],['Fenster','das',2],['Tür','die',2],['Zimmer','das',2],['Garten','der',2],
['Meer','das',3],['Mut','der',3],['Angst','die',3],['Glück','das',3],['Gewissen','das',3],['Ziel','das',3],['Zweifel','der',3],['Liebe','die',3],['Ende','das',3],['Gedanke','der',3]
];
G.forEach(g=>task.push({typ:'artikel',stufe:g[2],lv:g[2]===3?2:1,cats:['sg1'],sent:'<span class="hl">___ '+g[0]+'</span>',opts:['der','die','das'],answer:g[1],
  why:'<b>'+g[1]+' '+g[0]+'.</b> '+(g[3]||'Das Geschlecht lernst du am besten mit dem Artikel zusammen.')}));

/* Mehrzahl: [Einzahl, Mehrzahl, falsche Formen, Stufe, Hinweis] */
const P=[
['Hund','Hunde',['Hunds','Hunden','Hunder'],1,'Endung -e.'],['Katze','Katzen',['Katzes','Katze','Katzer'],1,'Endung -n oder -en.'],['Kind','Kinder',['Kinde','Kinden','Kinds'],1,'Endung -er.'],['Auto','Autos',['Autoe','Autoen','Autoer'],1,'Fremdwörter bekommen oft -s.'],['Blume','Blumen',['Blumes','Blumer','Blume'],1,'Endung -n.'],['Tag','Tage',['Tagen','Täge','Tager'],1,'Endung -e.'],['Frau','Frauen',['Fraue','Fräue','Frauer'],1,'Endung -en.'],
['Haus','Häuser',['Hause','Hausen','Hauser'],2,'Endung -er mit Umlaut.'],['Baum','Bäume',['Baume','Baumen','Bäumer'],2,'Umlaut und -e.'],['Buch','Bücher',['Buche','Buchen','Büche'],2,'Umlaut und -er.'],['Apfel','Äpfel',['Apfels','Apfeln','Apfele'],2,'Nur Umlaut, keine Endung.'],['Stadt','Städte',['Stadte','Städten','Städter'],2,'Umlaut und -e.'],['Mutter','Mütter',['Mutter','Muttern','Mütters'],2,'Nur Umlaut.'],['Lehrer','Lehrer',['Lehrers','Lehrern','Lehrere'],2,'Nomen auf -er bleiben in der Mehrzahl gleich.'],['Mädchen','Mädchen',['Mädchens','Mädchenen','Mädchener'],2,'Nomen auf -chen bleiben gleich.'],['Computer','Computer',['Computers','Computeren','Computere'],2,'Nomen auf -er bleiben gleich.'],['Handy','Handys',['Handyen','Handyer','Handye'],2,'Fremdwörter bekommen oft -s.'],['Zahl','Zahlen',['Zahle','Zähle','Zahler'],2,'Endung -en.'],['Mann','Männer',['Manne','Männen','Männe'],2,'Umlaut und -er.'],['Fuss','Füsse',['Fusse','Fussen','Füssen'],2,'Umlaut und -e.'],['Vogel','Vögel',['Vogels','Vogeln','Vögeler'],2,'Nur Umlaut.'],['Kuh','Kühe',['Kuhe','Kuhen','Kühen'],2,'Umlaut und -e.'],['Hand','Hände',['Hande','Händen','Händer'],2,'Umlaut und -e.'],
['Museum','Museen',['Museums','Museume','Museumen'],3,'Fremdwort auf -um: Museen.'],['Thema','Themen',['Themas','Thema','Themaen'],3,'Fremdwort auf -a: Themen.'],['Bus','Busse',['Buse','Busen','Buss'],3,'Endung -se.'],['Herz','Herzen',['Herze','Herzer','Herzes'],3,'Endung -en.'],['Auge','Augen',['Auge','Auger','Auges'],3,'Endung -n.'],['Junge','Jungen',['Junge','Junger','Jungel'],3,'Endung -n.'],['Praktikum','Praktika',['Praktikums','Praktikume','Praktikumen'],3,'Fremdwort auf -um: oft Mehrzahl auf -a.'],
['Taxi','Taxis',['Taxie','Taxien','Taxier'],1,'Wörter auf -i, -o, -a und viele englische Fremdwörter bekommen -s.'],['Foto','Fotos',['Fotoe','Fotoen','Foter'],1,'Wörter auf -o bekommen oft -s: die Fotos, die Kinos.'],
['Ergebnis','Ergebnisse',['Ergebnisen','Ergebnis','Ergebniss'],2,'Bei -nis wird das s verdoppelt: Ergebnis → Ergebnisse.'],['Erlebnis','Erlebnisse',['Erlebnisen','Erlebnis','Erlebniss'],2,'Bei -nis wird das s verdoppelt: Erlebnis → Erlebnisse.'],['Lehrerin','Lehrerinnen',['Lehrerine','Lehrerins','Lehrerinen'],2,'Bei -in wird das n verdoppelt: Lehrerin → Lehrerinnen.'],['Schülerin','Schülerinnen',['Schülerine','Schülerins','Schülerinen'],2,'Bei -in wird das n verdoppelt: Schülerin → Schülerinnen.'],['Sofa','Sofas',['Sofae','Sofaen','Sofaer'],2,'Wörter auf -a bekommen oft -s: die Sofas.'],['Team','Teams',['Teame','Teamen','Teamer'],2,'Englische Fremdwörter bekommen oft -s: die Teams.'],
['Album','Alben',['Albums','Albume','Albumen'],3,'Fremdwort auf -um: Album → Alben.'],['Datum','Daten',['Datums','Datume','Datumen'],3,'Fremdwort auf -um: Datum → Daten.'],['Risiko','Risiken',['Risikos','Risikoen','Risikoe'],3,'Fremdwort auf -o: Risiko → Risiken.'],['Kaktus','Kakteen',['Kaktuse','Kaktusen','Kaktusse'],3,'Fremdwort auf -us: Kaktus → Kakteen.']
];
P.forEach(p=>{
  const opts=[p[1]].concat(p[2]);
  task.push({typ:'mehrzahl',stufe:p[3],lv:p[3]===3?2:1,cats:['sg2'],prompt:'Wie lautet die Mehrzahl von <b>'+p[0]+'</b>?',opts:opts,answer:p[1],why:'Einzahl «'+p[0]+'», Mehrzahl <b>«'+p[1]+'»</b>. '+p[4]});
});

/* Gross oder klein */
const S=[
['Das ___ macht mir Spass.','Lesen','lesen','Mit dem Artikel «das» wird das Verb zum Nomen.',1],
['Das ist ein ___ Problem.','grosses','Grosses','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Das ___ Wetter gefällt mir.','schöne','Schöne','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Ich esse ___ Brot.','frisches','Frisches','Vor einem Nomen bleibt das Adjektiv klein.',1],
['Im ___ blühen die Blumen.','Frühling','frühling','Frühling ist ein Nomen. «im» = in dem.',1],
['Beim ___ vergisst sie alles.','Singen','singen','«beim» = bei dem. Das Verb wird zum Nomen.',2],
['Zum ___ braucht man Geduld.','Lernen','lernen','«zum» = zu dem. Das Verb wird zum Nomen.',2],
['Ich freue mich auf das ___.','Wiedersehen','wiedersehen','Nach dem Artikel «das» wird das Verb zum Nomen.',2],
['Wir gehen morgen ___.','schwimmen','Schwimmen','Nach «gehen» steht ein Verb. Es hat keinen Artikel.',2],
['Wir wollen heute ___ gehen.','wandern','Wandern','Hier ist «wandern» ein Verb. Es hat keinen Artikel.',2],
['Ich habe etwas ___ gekauft.','Neues','neues','Nach «etwas» wird das Adjektiv zum Nomen.',2],
['Er wünscht dir alles ___.','Gute','gute','Nach «alles» wird das Adjektiv zum Nomen.',2],
['Sie hat nichts ___ gesehen.','Besonderes','besonderes','Nach «nichts» wird das Adjektiv zum Nomen.',2],
['Das ___ der Kinder war laut.','Lachen','lachen','Nach dem Artikel «das» wird das Verb zum Nomen.',2],
['Sie ist im ___ am besten.','Rechnen','rechnen','«im» = in dem. Das Verb wird zum Nomen.',2],
['Er hat viel ___ gelernt.','Neues','neues','Nach «viel» wird das Adjektiv zum Nomen.',3],
['Das ___ der Zeitung ist spannend.','Lesen','lesen','Nach dem Artikel «das» wird das Verb zum Nomen.',3],
['Nach der ___ gehe ich zum Training.','Schule','schule','«Schule» ist ein Nomen: Der Artikel «der» steht davor.',1],
['Wir spielen in der Pause ___.','Fussball','fussball','«Fussball» ist ein Nomen. Man kann «der Fussball» sagen.',1],
['Meine ___ heisst Lena.','Freundin','freundin','«Freundin» ist ein Nomen. Der Artikel steht vor «meine»: meine Freundin.',1],
['Am ___ habe ich frei.','Mittwoch','mittwoch','Wochentage sind Nomen: der Mittwoch.',1],
['Sie ist sehr ___.','freundlich','Freundlich','«freundlich» ist ein Adjektiv. Es beschreibt, wie sie ist, und bleibt klein.',1],
['Der Lehrer ___ die Aufgabe.','erklärt','Erklärt','«erklärt» ist ein Verb. Es sagt, was der Lehrer tut, und bleibt klein.',1],
['Der ___ überquert die Strasse.','Blinde','blinde','«Der Blinde» ist ein Mensch. Das Adjektiv wird zum Nomen und gross geschrieben.',2],
['Der ___ Mann überquert die Strasse.','blinde','Blinde','Hier folgt das Nomen «Mann». Das Adjektiv «blinde» bleibt klein.',2],
['Beim ___ schmerzt mein Knie.','Joggen','joggen','«beim» = bei dem. Das Verb wird zum Nomen.',2],
['Das ___ im Unterricht ist verboten.','Spielen','spielen','Nach dem Artikel «das» wird das Verb zum Nomen.',1],
['Er sucht etwas ___ zum Anziehen.','Warmes','warmes','Nach «etwas» wird das Adjektiv zum Nomen.',2],
['Das ___ Wetter macht mich müde.','warme','Warme','Vor dem Nomen «Wetter» bleibt das Adjektiv klein.',1]
];
S.forEach(s=>{
  const opts=[s[1],s[2]];
  task.push({typ:'gross',stufe:s[4],lv:s[4]===3?2:1,cats:['sg3'],sent:s[0].replace('___','<span class="gap">_____</span>'),opts,answer:s[1],why:'<b>'+s[1]+'.</b> '+s[3]});
});

/* Wissen */
const Z=[
['Wie heisst die Einzahl in der Fachsprache?',['Singular','Plural','Genus','Kasus'],'Singular','Singular heisst Einzahl.','sg2'],
['Wie heisst die Mehrzahl in der Fachsprache?',['Plural','Singular','Genus','Kasus'],'Plural','Plural heisst Mehrzahl.','sg2'],
['Wie heisst das Geschlecht von «der Hund»?',['männlich (Maskulinum)','weiblich (Femininum)','sächlich (Neutrum)','Mehrzahl'],'männlich (Maskulinum)','Mit «der» ist ein Nomen männlich.','sg1'],
['Wie heisst das Geschlecht von «die Katze»?',['weiblich (Femininum)','männlich (Maskulinum)','sächlich (Neutrum)','Mehrzahl'],'weiblich (Femininum)','Mit «die» (Einzahl) ist ein Nomen weiblich.','sg1'],
['Wie heisst das Geschlecht von «das Kind»?',['sächlich (Neutrum)','männlich (Maskulinum)','weiblich (Femininum)','Mehrzahl'],'sächlich (Neutrum)','Mit «das» ist ein Nomen sächlich.','sg1'],
['Welches Wort ist ein <b>Eigenname</b>?',['Anna','Mädchen','Stadt','Lehrerin'],'Anna','Eigennamen bezeichnen ein einziges Lebewesen oder einen Ort mit Namen: Anna, Zürich, Rhein.','sg4'],
['Welches Wort ist ein <b>Eigenname</b>?',['Zürich','Stadt','Dorf','Fluss'],'Zürich','Eigennamen sind Namen von Personen, Orten, Ländern und Flüssen.','sg4'],
['Welches Nomen nennt ein <b>Lebewesen</b>?',['Lehrerin','Tisch','Mut','Haus'],'Lehrerin','Nomen nennen Lebewesen, Dinge oder Gedachtes. Eine Lehrerin ist ein Lebewesen.','sg4'],
['Welches Nomen nennt <b>Gedachtes</b> (Gedanken, Gefühle)?',['Freude','Hund','Löffel','Haus'],'Freude','Freude ist ein Gefühl. Gefühle und Gedanken gehören zum Gedachten.','sg4'],
['Welches Nomen nennt ein <b>Ding</b>?',['Löffel','Angst','Idee','Mutter'],'Löffel','Ein Löffel ist ein Ding. Angst und Idee sind Gedachtes, Mutter ist ein Lebewesen.','sg4'],
['Welches Nomen nennt <b>Gedachtes</b>?',['Mut','Tisch','Apfel','Katze'],'Mut','Mut ist ein Gefühl und gehört zum Gedachten.','sg4'],
['Welches Wort ist der Name eines <b>Flusses</b>?',['Rhein','Fluss','Brücke','See'],'Rhein','Eigennamen bezeichnen etwas Bestimmtes: der Rhein, die Aare. «Fluss» ist ein Gattungsname.','sg4'],
['Welches Wort ist der Name eines <b>Tieres</b>?',['Bello','Hund','Katze','Pferd'],'Bello','Bello ist ein Eigenname. «Hund» ist ein Gattungsname für viele Tiere.','sg4'],
['Welches Geschlecht hat «das Mädchen» in der Grammatik?',['sächlich (Neutrum)','weiblich (Femininum)','männlich (Maskulinum)','Mehrzahl'],'sächlich (Neutrum)','Das grammatische Geschlecht zeigt der Artikel: «das» = sächlich. Das natürliche Geschlecht ist weiblich.','sg1'],
['Welchen Artikel haben alle Nomen in der Mehrzahl?',['die','der','das','den'],'die','In der Mehrzahl heisst der Artikel immer «die»: die Hunde, die Katzen, die Kinder.','sg2'],
['Welchen Artikel hat «Schulhaus»?',['das','die','der','kein'],'das','Der Artikel kommt vom letzten Wort (Grundwort): das Haus, also das Schulhaus.','sg1'],
['Welchen Artikel hat «Handtasche»?',['die','der','das','kein'],'die','Das letzte Wort entscheidet: die Tasche, also die Handtasche.','sg1'],
['Welchen Artikel hat «Gartentisch»?',['der','die','das','kein'],'der','Das letzte Wort entscheidet: der Tisch, also der Gartentisch.','sg1'],
['Welches Wort bestimmt den Artikel eines zusammengesetzten Nomens?',['das letzte Wort (Grundwort)','das erste Wort','beide Wörter','keines'],'das letzte Wort (Grundwort)','Bei Zusammensetzungen gilt der Artikel des letzten Wortes.','sg1']
];
Z.forEach(z=>task.push({typ:'wissen',stufe:1,cats:[z[4]],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));

/* Markieren */
const M=[
['Der *Hund jagt die *Katze im *Garten.',1,'Nomen: Hund, Katze, Garten.'],
['Meine *Schwester kauft *Brot und *Milch.',1,'Nomen: Schwester, Brot, Milch.'],
['Die *Freude über das *Geschenk war gross.',2,'Nomen: Freude (Gefühl), Geschenk.'],
['Beim *Singen vergisst *Mia ihre *Sorgen.',2,'Nomen: Singen (nominalisiert, Artikel in «beim»), Mia (Eigenname), Sorgen.'],
['Wir wünschen dir *Glück und alles *Gute für den *Neuanfang.',3,'Nomen: Glück, Gute (nominalisiert nach «alles»), Neuanfang.'],
['Der *Lärm im *Zimmer störte das *Lesen.',3,'Nomen: Lärm, Zimmer, Lesen (nominalisiert, Artikel «das»).']
];
M.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Nomen an (auch nominalisierte).',why:m[2]});
});


/* Wortart im Text erkennen */
const TX=[
["Der *Hund spielt mit dem *Ball im *Garten.",1,"Nomen: Hund, Ball, Garten."],
["Meine *Schwester liest ein *Buch über *Pferde.",1,"Nomen: Schwester, Buch, Pferde."],
["Am *Montag kauft die *Lehrerin frisches *Brot in der *Stadt.",2,"Nomen: Montag, Lehrerin, Brot, Stadt. «frisches» ist ein Adjektiv."],
["Das *Lachen der *Kinder macht den *Tag schöner.",2,"«Das Lachen» ist ein nominalisiertes Verb. Dazu Kinder und Tag."],
["Beim *Schwimmen hat *Tim viel *Spass und trifft seine *Freunde.",3,"Schwimmen (nominalisiert), Tim (Name), Spass, Freunde."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Nomen im Text an (auch nominalisierte).',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["bilden", 1, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "streiten → ___", "der Streit", ["Streit"], true, "Aus «streiten» wird das Nomen «der Streit»."], ["bilden", 1, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "fahren → ___", "die Fahrt", ["Fahrt"], true, "Aus «fahren» wird das Nomen «die Fahrt»."], ["bilden", 2, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "schön → ___", "die Schönheit", ["Schönheit"], true, "Aus «schön» wird das Nomen «die Schönheit»."], ["bilden", 2, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "frei → ___", "die Freiheit", ["Freiheit"], true, "Aus «frei» wird das Nomen «die Freiheit»."], ["bilden", 2, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "lesen → ___", "das Lesen", ["Lesen"], true, "Aus «lesen» wird das Nomen «das Lesen»."], ["bilden", 1, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "lachen → ___", "das Lachen", ["Lachen"], true, "Aus «lachen» wird das Nomen «das Lachen»."], ["bilden", 2, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "arbeiten → ___", "die Arbeit", ["Arbeit"], true, "Aus «arbeiten» wird das Nomen «die Arbeit»."], ["bilden", 2, "sg3", "Bilde das Nomen. Schreibe es mit Artikel und gross.", "gesund → ___", "die Gesundheit", ["Gesundheit"], true, "Aus «gesund» wird das Nomen «die Gesundheit»."], ["einzahl", 1, "sg2", "Schreibe die Einzahl mit Artikel.", "Häuser → ___", "das Haus", ["Haus"], true, "Einzahl von «Häuser»: «das Haus»."], ["einzahl", 2, "sg2", "Schreibe die Einzahl mit Artikel.", "Mäuse → ___", "die Maus", ["Maus"], true, "Einzahl von «Mäuse»: «die Maus»."], ["einzahl", 1, "sg2", "Schreibe die Einzahl mit Artikel.", "Bücher → ___", "das Buch", ["Buch"], true, "Einzahl von «Bücher»: «das Buch»."], ["einzahl", 2, "sg2", "Schreibe die Einzahl mit Artikel.", "Städte → ___", "die Stadt", ["Stadt"], true, "Einzahl von «Städte»: «die Stadt»."], ["einzahl", 1, "sg2", "Schreibe die Einzahl mit Artikel.", "Tage → ___", "der Tag", ["Tag"], true, "Einzahl von «Tage»: «der Tag»."], ["einzahl", 1, "sg2", "Schreibe die Einzahl mit Artikel.", "Frauen → ___", "die Frau", ["Frau"], true, "Einzahl von «Frauen»: «die Frau»."], ["einzahl", 2, "sg2", "Schreibe die Einzahl mit Artikel.", "Gärten → ___", "der Garten", ["Garten"], true, "Einzahl von «Gärten»: «der Garten»."], ["einzahl", 2, "sg2", "Schreibe die Einzahl mit Artikel.", "Wörter → ___", "das Wort", ["Wort"], true, "Einzahl von «Wörter»: «das Wort»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---- NEU: Fachbegriffe (auswählen und schreiben) ---- */
const FB=[
['Welches Wort bedeutet dasselbe wie <b>Artikel</b>?',['Begleiter','Hauptwort','Zeitwort','Fürwort'],'Begleiter','Der Artikel begleitet das Nomen. Darum heisst er auch Begleiter.'],
['Nomen heissen auch ...',['Namenwörter','Tunwörter','Wiewörter','Fürwörter'],'Namenwörter','Nomen nennen Namen von Lebewesen, Dingen und Gedachtem. Darum: Namenwörter (auch Hauptwörter, Substantive).'],
['<b>Substantiv</b> bedeutet dasselbe wie ...',['Nomen','Verb','Adjektiv','Artikel'],'Nomen','Nomen, Substantiv, Hauptwort und Namenwort sind vier Namen für dieselbe Wortart.'],
['Das Fachwort für <b>Geschlecht</b> heisst ...',['Genus','Numerus','Kasus','Tempus'],'Genus','Genus = Geschlecht (männlich, weiblich, sächlich).'],
['Das Fachwort für <b>Einzahl und Mehrzahl</b> heisst ...',['Numerus','Genus','Kasus','Modus'],'Numerus','Numerus = Zahl (Singular oder Plural).'],
['<b>Kasus</b> heisst auf Deutsch ...',['Fall','Zahl','Geschlecht','Zeit'],'Fall','Kasus = Fall (Nominativ, Genitiv, Dativ, Akkusativ).'],
['«Nomen in die Fälle setzen» heisst ...',['deklinieren','konjugieren','steigern','bilden'],'deklinieren','Nomen werden dekliniert. Verben werden konjugiert, Adjektive gesteigert.'],
['Zusammengesetzte Nomen heissen in der Fachsprache ...',['Komposita','Homonyme','Eigennamen','Gattungsnamen'],'Komposita','Komposita (Einzahl: Kompositum) sind zusammengesetzte Nomen: Schulhaus, Handtasche.'],
['Die Teile eines zusammengesetzten Nomens heissen ...',['Bestimmungswort und Grundwort','Stamm und Endung','Vorsilbe und Nachsilbe','Artikel und Nomen'],'Bestimmungswort und Grundwort','Schul + Haus: «Schul» ist das Bestimmungswort, «Haus» das Grundwort.'],
['Nomen mit gleicher Schreibung oder Aussprache, aber anderer Bedeutung heissen ...',['Homonyme','Komposita','Eigennamen','Plural'],'Homonyme','Beispiel: die Bank (Sitzbank) und die Bank (Geldinstitut).']
];
FB.forEach(f=>task.push({typ:'begriff',stufe:1,lv:1,cats:['sg6'],prompt:f[0],opts:f[1],answer:f[2],why:'<b>'+f[2]+'.</b> '+f[3]}));
const FI=[
['Anderes Wort für Artikel: ___','Begleiter',[],'Der Artikel begleitet das Nomen.'],
['Anderes Wort für Einzahl: ___','Singular',[],'Singular = Einzahl.'],
['Anderes Wort für Mehrzahl: ___','Plural',[],'Plural = Mehrzahl.'],
['Anderes Wort für Geschlecht: ___','Genus',[],'Genus = Geschlecht.'],
['Anderes Wort für Zahl (Einzahl oder Mehrzahl): ___','Numerus',[],'Numerus = Zahl.'],
['Lateinisches Wort für «Fall»: ___','Kasus',[],'Kasus = Fall.'],
['Nomen in die Fälle setzen heisst: ___','deklinieren',[],'«deklinieren» ist ein Verb und wird kleingeschrieben.'],
['Nomen heissen auch (ein Wort in der Einzahl): ___','Substantiv',['Namenwort','Hauptwort'],'Gültig sind: Substantiv, Hauptwort, Namenwort.'],
['Zusammengesetzte Nomen heissen: ___','Komposita',['Kompositum'],'Komposita (Einzahl: Kompositum).'],
['Das letzte Wort eines zusammengesetzten Nomens heisst: ___','Grundwort',[],'Das Grundwort bestimmt den Artikel.'],
['Das erste Wort eines zusammengesetzten Nomens heisst: ___','Bestimmungswort',[],'Das Bestimmungswort sagt genauer, um was es geht.'],
['Nomen mit gleicher Schreibung, aber anderer Bedeutung: ___','Homonyme',['Homonym'],'Homonyme: gleiche Schreibung oder Aussprache, andere Bedeutung.']
];
FI.forEach(f=>task.push({typ:'begriffin',stufe:2,lv:1,cats:['sg6'],input:true,prompt:'Schreibe den Fachbegriff.',sent:f[0],answer:f[1],accept:f[2],strict:true,why:'<b>'+f[1]+'.</b> '+f[3]}));

/* ---- NEU: Zwei Artikel möglich ---- */
const MA=[['Virus','der und das','Man sagt der Virus und das Virus. Beide sind richtig.'],['Joghurt','der und das','Man sagt der Joghurt und das Joghurt. Beide sind richtig.'],['Sellerie','der und die','Man sagt der Sellerie und die Sellerie. Beide sind richtig.'],['E-Mail','die und das','Man sagt die E-Mail und das E-Mail. Beide sind richtig.']];
MA.forEach(m=>task.push({typ:'mehrart',stufe:2,lv:1,cats:['sg1'],prompt:'Welche Artikel sind bei «<b>'+m[0]+'</b>» richtig?',opts:['der und das','der und die','die und das','nur ein Artikel'].filter((x,i,a)=>true),answer:m[1],why:'<b>'+m[1]+'.</b> '+m[2]}));

/* ---- NEU: Eigennamen markieren ---- */
const EN=[
['Mia fährt mit Leon im Tram nach *Zürich.'.replace('Mia','*Mia').replace('Leon','*Leon'),1,'Eigennamen: Mia, Leon (Personen), Zürich (Ort). «Tram» ist ein Gattungsname.'],
['Im Sommer wandert *Noah mit seinem Hund *Bello auf den *Säntis.',1,'Eigennamen: Noah (Mensch), Bello (Tier), Säntis (Berg). Sommer, Hund sind Gattungsnamen.'],
['Das Schiff *Titanic fuhr über den *Atlantik. Der *Rhein fliesst durch *Basel.',2,'Eigennamen: Titanic (Schiff), Atlantik (Meer), Rhein (Fluss), Basel (Ort).']
];
EN.forEach(m=>{const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:1,cats:['sg4'],tokens,targets,instr:'Tippe alle Eigennamen an.',why:m[2]});});

/* ---- NEU: Homonyme ---- */
const HO=[
['Was bedeutet «Bank» im Satz: «Wir sitzen auf der <b>Bank</b> im Park.»?',['Sitzgelegenheit','Geldinstitut','Schulfach','Spiel'],'Sitzgelegenheit','Die Bank im Park ist zum Sitzen. Dasselbe Wort kann auch ein Geldinstitut sein.',1],
['Was bedeutet «Bank» im Satz: «Sie bringt das Geld zur <b>Bank</b>.»?',['Geldinstitut','Sitzgelegenheit','Werkzeug','Schule'],'Geldinstitut','Hier ist ein Geldinstitut gemeint. Das Wort ist ein Homonym.',1],
['Was bedeutet «Hahn» im Satz: «Der <b>Hahn</b> tropft.»?',['Wasserhahn','Tier','Spielzeug','Haus'],'Wasserhahn','Ein Hahn tropft nur, wenn es der Wasserhahn ist. Der Hahn kann auch ein Tier sein.',1],
['Welcher Artikel passt? «Wir baden im See.» Gemeint ist ein Binnengewässer: ___ See',['der','die','das'],'der','Der See ist ein Gewässer an Land. «Die See» bedeutet das Meer.',1],
['Welcher Artikel passt, wenn das Meer gemeint ist? «Das Schiff fährt auf ___ See.»',['die','der','das'],'die','Die See = das Meer. Der See = Gewässer an Land. Der Artikel ändert die Bedeutung.',1],
['Wer ist «<b>der Leiter</b>»?',['eine Person, die etwas leitet','ein Gerät zum Hochsteigen','ein Fluss','ein Tier'],'eine Person, die etwas leitet','Der Leiter ist eine Person. Die Leiter ist ein Gerät zum Hochsteigen.',2],
['Welches Wort passt? «Auf der Gitarre ist eine ___ gerissen.»',['Saite','Seite'],'Saite','Die Saite gehört zu einem Instrument. Die Seite gehört zu einem Buch. Die Wörter klingen gleich.',2],
['Welches Wort passt? «Im Bleistift steckt eine ___.»',['Mine','Miene'],'Mine','Die Mine schreibt. Die Miene ist der Gesichtsausdruck. Die Wörter klingen gleich.',2]
];
HO.forEach(h=>task.push({typ:'homonym',stufe:h[4],lv:1,cats:['sg5'],prompt:h[0],opts:h[1],answer:h[2],why:'<b>'+h[2]+'.</b> '+h[3]}));

/* ---- NEU: Nur Einzahl / nur Mehrzahl ---- */
const SP=[
['Welches Nomen gibt es nur in der <b>Mehrzahl</b>?',['Ferien','Pause','Woche','Stunde'],'Ferien','Man sagt «die Ferien», aber nicht «die Ferie».',1],
['Welches Nomen gibt es nur in der <b>Mehrzahl</b>?',['Eltern','Vater','Mutter','Bruder'],'Eltern','«Eltern» hat keine Einzahl. Vater und Mutter haben eine.',1],
['Welches Nomen gibt es nur in der <b>Mehrzahl</b>?',['Leute','Mensch','Kind','Person'],'Leute','Die Einzahl «Leut» gibt es nicht.',2],
['Welches Nomen gibt es nur in der <b>Mehrzahl</b>?',['Kosten','Rechnung','Summe','Betrag'],'Kosten','Man sagt «die Kosten».',2],
['Welches Nomen gibt es nur in der <b>Einzahl</b>?',['Durst','Tisch','Stuhl','Heft'],'Durst','Man sagt «der Durst», aber nicht «die Dürste».',1],
['Welches Nomen gibt es nur in der <b>Einzahl</b>?',['Geduld','Zahl','Stunde','Hand'],'Geduld','Man sagt «die Geduld», aber nicht «die Geduld(en)».',1],
['Welches Nomen gibt es nur in der <b>Einzahl</b>?',['Lärm','Lied','Lampe','Lehrer'],'Lärm','Man sagt «der Lärm», aber nicht «die Lärme».',2],
['Welcher Satz ist richtig?',['Die Ferien sind schön.','Der Ferien ist schön.','Das Ferien ist schön.','Eine Ferien ist schön.'],'Die Ferien sind schön.','«Ferien» gibt es nur in der Mehrzahl. Darum «die».',2]
];
SP.forEach(x=>task.push({typ:'singpl',stufe:x[4],lv:1,cats:['sg2'],prompt:x[0],opts:x[1],answer:x[2],why:'<b>'+x[2]+'.</b> '+x[3]}));

/* ---- NEU: Zusammengesetzte Nomen bilden ---- */
const KP=[
['Kaffee + Maschine','die Kaffeemaschine','Kaffeemaschine','Das letzte Wort entscheidet: die Maschine, also die Kaffeemaschine.',1],
['Kinder + Wagen','der Kinderwagen','Kinderwagen','Das letzte Wort entscheidet: der Wagen, also der Kinderwagen.',1],
['Handy + Hülle','die Handyhülle','Handyhülle','Das letzte Wort entscheidet: die Hülle, also die Handyhülle.',1],
['Sport + Platz','der Sportplatz','Sportplatz','Das letzte Wort entscheidet: der Platz, also der Sportplatz.',1],
['Wasser + Flasche','die Wasserflasche','Wasserflasche','Das letzte Wort entscheidet: die Flasche, also die Wasserflasche.',1],
['Schul + Weg','der Schulweg','Schulweg','Das letzte Wort entscheidet: der Weg, also der Schulweg.',1],
['Winter + Jacke','die Winterjacke','Winterjacke','Das letzte Wort entscheidet: die Jacke, also die Winterjacke.',1],
['falsch (Adjektiv) + Spieler','der Falschspieler','Falschspieler','Auch ein Adjektiv kann Bestimmungswort sein. Das Grundwort «der Spieler» gibt den Artikel.',2],
['bedenk (Verb) + Zeit','die Bedenkzeit','Bedenkzeit','Auch ein Verbstamm kann Bestimmungswort sein. Das Grundwort «die Zeit» gibt den Artikel.',2],
['Pause + n + Brot','das Pausenbrot','Pausenbrot','Manchmal steht ein Fugen-n dazwischen: Pause-n-Brot. «Das Brot» gibt den Artikel.',3],
['Sonne + n + Brille','die Sonnenbrille','Sonnenbrille','Manchmal steht ein Fugen-n dazwischen. «Die Brille» gibt den Artikel.',3]
];
KP.forEach(k=>task.push({typ:'kompo',stufe:k[4],lv:1,cats:['sg5'],input:true,prompt:'Setze zusammen. Schreibe das Nomen mit Artikel und gross.',sent:k[0]+' → ___',answer:k[1],accept:[k[2]],strict:true,why:'<b>'+k[1]+'.</b> '+k[3]}));

/* ---- NEU: Artikel im Satz (Nominativ) ---- */
const AS=[
['Pause','die',1],['Handy','das',1],['Lehrer','der',1],['Hausaufgabe','die',1],['Training','das',1],['Rucksack','der',1],
['Klasse','die',2],['Velo','das',2],['Bus','der',2],['Mensa','die',2],['Zeugnis','das',2],['Stundenplan','der',2]
];
const AST={Pause:'___ Pause dauert zehn Minuten.',Handy:'___ Handy liegt auf dem Pult.',Lehrer:'___ Lehrer erklärt die Aufgabe.',Hausaufgabe:'___ Hausaufgabe ist schwierig.',Training:'___ Training beginnt um fünf Uhr.',Rucksack:'___ Rucksack ist schwer.',Klasse:'___ Klasse schreibt eine Prüfung.',Velo:'___ Velo steht vor der Schule.',Bus:'___ Bus kommt zu spät.',Mensa:'___ Mensa öffnet um zwölf Uhr.',Zeugnis:'___ Zeugnis ist da.',Stundenplan:'___ Stundenplan hängt an der Tür.'};
AS.forEach(a=>task.push({typ:'artikel',stufe:a[2],lv:1,cats:['sg1'],sent:AST[a[0]].replace('___ '+a[0],'<span class="hl">___ '+a[0]+'</span>'),opts:['der','die','das'],answer:a[1],why:'<b>'+a[1]+' '+a[0]+'.</b> Lerne das Nomen immer mit Artikel.'}));

/* ---------- Theorie ---------- */
const SECS=[
{id:'merkmale',title:'Was ist ein Nomen?',short:'Merkmale',min:6,note:'An die Wortarten anknüpfen: Nomen sind Namenwörter (auch Hauptwort, Substantiv). Der Artikel heisst auch Begleiter. Beispiele aus dem Klassenzimmer sammeln. Die Artikelprobe nochmals zeigen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nomen nennen …</h3><p><b>Lebewesen:</b> Hund, Lehrerin, Kind</p><p><b>Dinge:</b> Tisch, Velo, Haus</p><p><b>Gedachtes</b> (Gedanken und Gefühle): Mut, Freude, Idee</p></div>'+
 '<div class="card"><h3>So erkennst du ein Nomen</h3><ol class="steps"><li>Man kann einen <b>Artikel</b> davor setzen: der Hund, ein Haus.</li><li>Man schreibt es <b>gross</b>.</li><li>Es hat ein festes <b>Geschlecht</b> (der, die, das) und eine <b>Einzahl</b> und <b>Mehrzahl</b>.</li></ol></div></div>'+
 '<div class="callout"><b>Andere Wörter für Nomen:</b> Hauptwort, Namenwort, Substantiv. Der Artikel heisst auch <b>Begleiter</b>, weil er das Nomen begleitet.</div>'+
 '<div class="callout">Nomen verändern sich nach <b>Fall</b> (der Hund, des Hundes) und <b>Zahl</b> (der Hund, die Hunde). Die Fälle lernst du im nächsten Kapitel.</div>'},
{id:'genus',title:'Geschlecht und Artikel',short:'Geschlecht',min:8,note:'Wichtig: Das Geschlecht der Nomen hat meist nichts mit dem Geschlecht der Lebewesen zu tun (das Mädchen). Nur die Endungen-Regeln üben, nicht alles auswendig lernen.',
 html:()=>'<div class="grid3">'+[['der','männlich (Maskulinum)','der Hund, der Tisch'],['die','weiblich (Femininum)','die Katze, die Tür'],['das','sächlich (Neutrum)','das Kind, das Haus']].map(a=>'<div class="card"><h3 style="font-size:1.6em">'+a[0]+'</h3><p><b>'+a[1]+'</b></p><p>'+a[2]+'</p></div>').join('')+'</div>'+
 '<div class="card" style="margin-top:.8rem"><h3>Hilfen durch die Endung</h3>'+T(['Endung','Geschlecht','Beispiele'],[['-ung, -heit, -keit, -schaft, -in','die (weiblich)','die Wohnung, die Freiheit, die Freundschaft, die Lehrerin'],['-chen, -lein','das (sächlich)','das Mädchen, das Häuschen'],['-nis (meist)','das (sächlich)','das Ergebnis, das Erlebnis'],['Jahreszeiten, Monate, Wochentage','der (männlich)','der Sommer, der Mai, der Montag']])+'</div>'+
 '<div class="grid2" style="margin-top:.8rem"><div class="card"><h3>Grammatisch oder natürlich?</h3><p>Das <b>grammatische Geschlecht</b> (Genus) zeigt der Artikel: <b>das</b> Mädchen = sächlich.</p><p>Das <b>natürliche Geschlecht</b> ist das des Lebewesens: ein Mädchen ist weiblich.</p></div>'+
 '<div class="card"><h3>Zwei Artikel sind möglich</h3><p>Bei manchen Nomen sind beide Artikel richtig: <b>der</b> oder <b>das</b> Virus, <b>der</b> oder <b>das</b> Joghurt, <b>der</b> oder <b>die</b> Sellerie.</p></div></div>'+
 '<div class="callout">Lerne neue Nomen immer <b>mit Artikel</b>: «der Löffel», nicht nur «Löffel».</div>'},
{id:'zahl',title:'Einzahl und Mehrzahl',short:'Mehrzahl',min:8,note:'Die Pluralendungen mit Beispielen an der Wandtafel sammeln lassen. Nomen auf -er und -chen bleiben gleich. Nur Einzahl und nur Mehrzahl kurz mit Beispielen zeigen. Die Fremdwörter sind Zusatz.',
 html:()=>'<p class="lead">Fast jedes Nomen gibt es in der <b>Einzahl (Singular)</b> und in der <b>Mehrzahl (Plural)</b>.</p>'+
 T(['Endung','Einzahl → Mehrzahl'],[['-e','der Hund → die Hunde, der Tag → die Tage'],['-e mit Umlaut','der Baum → die Bäume, die Stadt → die Städte'],['-er (mit Umlaut)','das Kind → die Kinder, das Haus → die Häuser'],['-n oder -en','die Katze → die Katzen, die Frau → die Frauen'],['-s','das Auto → die Autos, das Handy → die Handys, das Sofa → die Sofas'],['-se (bei -nis)','das Ergebnis → die Ergebnisse'],['-nen (bei -in)','die Lehrerin → die Lehrerinnen'],['nur Umlaut','der Apfel → die Äpfel, die Mutter → die Mütter'],['gleich','der Lehrer → die Lehrer, das Mädchen → die Mädchen']])+
 '<div class="callout">Merke: <b>Alle Nomen haben in der Mehrzahl den Artikel «die»</b>: die Hunde, die Katzen, die Kinder.</div>'+
 '<div class="grid2" style="margin-top:.8rem"><div class="card"><h3>Nur Einzahl</h3><p>der <b>Durst</b>, die <b>Geduld</b>, der <b>Lärm</b>, das <b>Glück</b></p></div><div class="card"><h3>Nur Mehrzahl</h3><p>die <b>Ferien</b>, die <b>Eltern</b>, die <b>Kosten</b>, die <b>Leute</b></p></div></div>'+
 '<details class="more" style="margin-top:.8rem"><summary><b>Mehr wissen:</b> Fremdwörter</summary><p>Manche Fremdwörter behalten eine besondere Mehrzahl: das Museum → die Museen, das Thema → die Themen, das Album → die Alben, der Kaktus → die Kakteen.</p></details>'},
{id:'gross',title:'Nomen und Grossschreibung',short:'Grossschreibung',min:10,note:'Das ist der wichtigste Rechtschreibteil. Die Signalwörter an der Wandtafel sammeln. Gegenbeispiele zeigen: «Wir gehen schwimmen».',
 html:()=>'<div class="grid2"><div class="card"><h3>Nomen schreibt man gross</h3><p>der <b>Hund</b>, die <b>Freude</b>, ein <b>Haus</b></p><p>Hilfe: Artikelprobe oder die Probe mit einem Adjektiv davor: <i>der kleine Hund</i>.</p></div>'+
 '<div class="card"><h3>Auch andere Wörter werden zu Nomen</h3><p>Verben: das <b>Lesen</b>, beim <b>Singen</b>, zum <b>Lernen</b></p><p>Adjektive: etwas <b>Neues</b>, alles <b>Gute</b>, nichts <b>Besonderes</b></p></div></div>'+
 '<div class="card" style="margin-top:.8rem"><h3>Signalwörter vor einem Nomen</h3><p>Artikel (<i>das</i> Lesen), Artikel in kurzen Wörtern (<i>beim, zum, im, am, vom</i>), Mengenwörter (<i>etwas, nichts, viel, alles</i>), Adjektive davor (<i>das laute Lachen</i>).</p></div>'+
 '<div class="callout"><b>Achtung:</b> Ohne Signalwort bleibt das Verb klein: «Wir gehen <b>schwimmen</b>.» Vor einem Nomen bleibt das Adjektiv klein: «ein <b>grosses</b> Problem».</div>'+
 '<div class="callout"><b>Vergleiche:</b> «Der <b>Blinde</b> überquert die Strasse.» (Nomen: ein Mensch) – «Der <b>blinde</b> Mann überquert die Strasse.» (Adjektiv vor dem Nomen «Mann»: klein)</div>'},
{id:'arten',title:'Arten von Nomen',short:'Nomenarten',min:6,note:'Beispiele von den Schülerinnen und Schülern sammeln. Zuerst die drei Gruppen Lebewesen, Dinge, Gedachtes, dann die Eigennamen mit je einem Beispiel pro Zeile.',
 html:()=>'<div class="grid2"><div class="card"><h3>Was Nomen nennen</h3><p><b>Lebewesen:</b> Lehrerin, Hund, Kind</p><p><b>Dinge:</b> Tisch, Löffel, Haus</p><p><b>Gedachtes:</b> Mut, Freude, Idee</p></div>'+
 '<div class="card"><h3>Eigennamen</h3><p>Sie nennen etwas ganz Bestimmtes:</p>'+T(['Gruppe','Beispiel'],[['Menschen','Anna, Leon'],['Tiere','Bello'],['Flüsse, Berge','der Rhein, der Säntis'],['Ortschaften','Zürich, Basel'],['Schiffe','die Titanic']])+'</div></div>'+
 '<div class="callout"><b>Gattungsnamen</b> gelten für viele: Mädchen, Stadt, Fluss, Hund. <b>Eigennamen</b> gelten nur für eines: Anna, Zürich, Rhein, Bello.</div>'},
{id:'zusammen',title:'Zusammengesetzte Nomen',short:'Zusammensetzung',min:8,note:'Der Artikel kommt vom Grundwort (letztes Wort). Auch Adjektive und Verbstämme können Bestimmungswort sein.',
 html:()=>'<div class="grid2"><div class="card"><h3>Bestimmungswort + Grundwort</h3><p><b>Schul</b>·<b>haus</b> = ein Haus für die Schule.</p><p>Das <b>letzte Wort</b> (Grundwort) bestimmt den Artikel: <b>das</b> Haus → <b>das</b> Schulhaus.</p><p class="muted">Fachwort: zusammengesetzte Nomen heissen auch <b>Komposita</b>.</p></div>'+
 '<div class="card"><h3>Beispiele</h3>'+T(['Bestimmungswort','Grundwort','Nomen'],[['Hand','die Tasche','die Handtasche'],['Garten','der Tisch','der Gartentisch'],['Kaffee','die Mühle','die Kaffeemühle'],['Sonne + n','die Brille','die Sonnenbrille'],['falsch (Adjektiv)','der Spieler','der Falschspieler'],['bedenk (Verb)','die Zeit','die Bedenkzeit']])+'<p class="muted">Manchmal steht ein Fugenzeichen dazwischen: Sonne<b>n</b>brille, Liebe<b>s</b>brief.</p></div></div>'},
{id:'homonyme',title:'Homonyme',short:'Homonyme',min:6,note:'Gleiche Schreibung oder Aussprache, aber andere Bedeutung. Zuerst Bank, Hahn und See, dann die gleichklingenden Wörter. Die Schüler bilden zu jedem Wort zwei Sätze.',
 html:()=>'<p class="lead"><b>Homonyme</b> sind Nomen mit <b>gleicher Schreibung</b> oder <b>gleicher Aussprache</b>, aber mit <b>anderer Bedeutung</b>.</p>'+
 '<div class="grid2"><div class="card"><h3>Gleich geschrieben</h3>'+T(['Nomen','Bedeutungen'],[['die Bank','Sitzgelegenheit · Geldinstitut'],['der Hahn','Tier · Wasserhahn'],['der See / die See','Gewässer an Land · das Meer'],['der Leiter / die Leiter','Person · Gerät zum Hochsteigen']])+'<p class="muted">Bei See und Leiter ändert der Artikel die Bedeutung.</p></div>'+
 '<div class="card"><h3>Gleich ausgesprochen</h3>'+T(['Wort 1','Wort 2'],[['die Saite (Gitarre)','die Seite (Buch)'],['der Laib (Brot)','der Leib (Körper)'],['das Lid (Auge)','das Lied (Musik)'],['die Mine (Bleistift)','die Miene (Gesicht)']])+'<p class="muted">Hier hilft nur die Schreibweise.</p></div></div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Die Begriffe laut sprechen lassen. Diese Wörter kommen in Prüfungen vor. Zuerst das deutsche Wort, dann das Fremdwort.',
 html:()=>'<p class="lead">Diese Fachbegriffe brauchst du für Nomen.</p>'+T(['Fachbegriff','Auf Deutsch','Beispiel'],[['Nomen / Substantiv','Hauptwort, Namenwort','der Hund, die Freude'],['Artikel','Begleiter','der, die, das, ein, eine'],['Genus','Geschlecht','männlich, weiblich, sächlich'],['Numerus','Zahl','Singular (Einzahl), Plural (Mehrzahl)'],['Kasus','Fall','Nominativ, Genitiv, Dativ, Akkusativ'],['deklinieren','in die Fälle setzen','der Hund, des Hundes'],['Kompositum (Mz. Komposita)','zusammengesetztes Nomen','das Schulhaus'],['Bestimmungswort / Grundwort','erstes Wort / letztes Wort','Schul + Haus'],['Homonyme','gleiche Schreibung, andere Bedeutung','die Bank']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Pro Stolperstein ein Beispiel von den Schülern bilden lassen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Das Geschlecht ist nicht das natürliche','«das Mädchen» (sächlich), «die Person» (weiblich)','Merke: Das Geschlecht steht im Artikel, nicht im Lebewesen.'],
  ['2 · Verb oder Nomen?','«Wir gehen <b>schwimmen</b>.» (Verb)<br>«Das <b>Schwimmen</b> macht Spass.» (Nomen)','Mit Signalwort (Artikel, beim, zum) gross, sonst klein.'],
  ['3 · Adjektiv oder Nomen?','«Ein <b>grosses</b> Problem.» (Adjektiv)<br>«Etwas <b>Grosses</b>.» (Nomen)','Vor einem Nomen bleibt das Adjektiv klein.'],
  ['4 · Mehrzahl bei -er und -chen','«die Lehrer», «die Mädchen»','Diese Nomen bleiben in der Mehrzahl gleich.'],
  ['5 · Mehrzahl mit Umlaut','«Haus → Häuser», «Baum → Bäume»','Der Umlaut verrät oft die Mehrzahl.'],
  ['6 · Nomen in Mundart und Schrift','Mundart: «s Velo»; Schriftsprache: «das Velo»','In der Schrift gilt der Artikel der Standardsprache.'],
  ['7 · Zeitangaben: gross oder klein?','«heute <b>A</b>bend», «gestern <b>N</b>achmittag» / «<b>a</b>bends», «<b>m</b>ontags» / «am <b>M</b>ontag»','Nach «heute, gestern, morgen» und nach «am» wird die Tageszeit gross. Mit «-s» am Ende (abends, montags) ist es ein Adverb und klein.'],,
  ['8 · Nomen mit -n / -en (n-Deklination)','«der Junge – des <b>Jungen</b> – dem <b>Jungen</b> – den <b>Jungen</b>» / «der Student – den <b>Studenten</b>» / «der Mensch – dem <b>Menschen</b>»','Einige männliche Nomen haben in allen Fällen ausser dem Nominativ die Endung -n oder -en. Nicht: «den Student», «dem Junge».'],,
  ['9 · Zusammengesetzte Nomen','«Käse<b>kuchen</b>» (nicht «Käse Kuchen») / «Arbeit<b>s</b>zeit», «Geburt<b>s</b>tag» / «Schulhaus», «Blume<b>n</b>vase»','Zusammengesetzte Nomen schreibt man zusammen. Dazwischen steht manchmal ein Fugenelement (-s, -n, -es). Das Geschlecht bestimmt das letzte Wort: die Zeit → die Arbeitszeit.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('artikel,mehrzahl,gross')}
];
const EX=[
 ['Setze den Artikel ein: ___ Löffel, ___ Gabel, ___ Messer.','der Löffel · die Gabel · das Messer',1],
 ['Schreibe die Mehrzahl: Hund, Haus, Kind, Apfel, Lehrer.','Hunde · Häuser · Kinder · Äpfel · Lehrer',1],
 ['Gross oder klein? «Das (lesen) macht mir Spass.»','Lesen: mit Artikel «das» wird das Verb zum Nomen.',1],
 ['Gross oder klein? «Wir gehen (schwimmen).»','schwimmen: kein Signalwort, es bleibt ein Verb.',1],
 ['Gross oder klein? «Ich habe etwas (neues) gekauft.»','Neues: nach «etwas» wird das Adjektiv zum Nomen.',1],
 ['Lebewesen, Ding oder Gedachtes? Mut, Tisch, Freude, Lehrerin.','Gedachtes: Mut, Freude · Ding: Tisch · Lebewesen: Lehrerin',1],
 ['Schreibe zwei Sätze mit dem Wort «Bank». Das Wort hat in jedem Satz eine andere Bedeutung.','Zum Beispiel: Wir sitzen auf der Bank. – Sie bringt das Geld zur Bank.',1],
 ['Nur Einzahl oder nur Mehrzahl? Ferien, Durst, Eltern, Geduld.','Nur Mehrzahl: Ferien, Eltern · Nur Einzahl: Durst, Geduld',1],
 ['Bilde zusammengesetzte Nomen mit Artikel: Schule + Haus, Hand + Tasche, Garten + Tisch.','das Schulhaus · die Handtasche · der Gartentisch',1],
 ['Wähle ein Nomen mit -ung, -heit oder -keit und schreibe einen Satz.','Zum Beispiel: Die Wohnung ist hell. (-ung → die)',2],
 ['Schreibe richtig: heute (abend), (montags), am (montag).','heute Abend · montags · am Montag',1],
 ['Setze den Fall ein: Ich helfe dem (Student).','Ich helfe dem Studenten.',2],
 ['Bilde den Akkusativ: Wir besuchen den (Junge).','Wir besuchen den Jungen.',2],
 ['Schreibe zusammen: Käse + Kuchen, Arbeit + Zeit, Schule + Haus.','Käsekuchen · Arbeitszeit · Schulhaus',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Erkennen','Artikelprobe: der, die, das, ein, eine. Nomen schreibt man gross.'],['Geschlecht','männlich der · weiblich die · sächlich das. Lerne Nomen mit Artikel.'],['Endungen','-ung, -heit, -keit, -schaft, -in → die · -chen, -lein → das'],['Mehrzahl','-e, -e mit Umlaut, -er, -n/-en, -s, nur Umlaut, gleich'],['Gross','Verben und Adjektive werden nach Artikel, beim/zum/im, etwas, nichts, viel, alles zu Nomen.'],['Arten','Nomen nennen Lebewesen, Dinge, Gedachtes · Eigennamen und Gattungsnamen'],['Zusammensetzung','Das letzte Wort bestimmt den Artikel: das Haus → das Schulhaus.'],['Homonyme','Gleiche Schreibung oder Aussprache, andere Bedeutung: die Bank, der See / die See'],['Nur Einzahl / Mehrzahl','Durst, Geduld · Ferien, Eltern'],['Fachwörter','Nomen = Hauptwort · Artikel = Begleiter · Genus = Geschlecht · Numerus = Zahl · Kasus = Fall · deklinieren']]);
const UEM={'genus':{types:'artikel',cats:'sg1'},'zahl':{types:'mehrzahl,singpl',cats:'sg2'},'gross':{types:'gross',cats:'sg3'},'homonyme':{types:'homonym',cats:'sg5'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{basic:5,konj:1,pers:1},opt:{pron:.2,adj:.4,det:{def:.55,indef:.35,poss:.1}},classes:[{gl:'Nomen',cats:['sg3'],lv:1},{gl:'Artikel',cats:['sg1'],lv:1,instr:'Tippe alle Artikel an.'}],perClass:34});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Welcher Artikel gehört zu «Mädchen»?',['das','die','der','den'],'das','Wörter auf -chen sind sächlich: das Mädchen.','sg1'],
['Wie lautet die Mehrzahl von «das Kind»?',['die Kinder','die Kinde','die Kinds','die Kindern'],'die Kinder','Einzahl «das Kind», Mehrzahl «die Kinder».','sg2'],
['Wie lautet die Mehrzahl von «der Apfel»?',['die Äpfel','die Apfel','die Apfels','die Äpfeln'],'die Äpfel','Einzahl «der Apfel», Mehrzahl «die Äpfel».','sg2'],
['Wie lautet die Mehrzahl von «das Auto»?',['die Autos','die Auten','die Autoen','die Äuter'],'die Autos','Einzahl «das Auto», Mehrzahl «die Autos».','sg2'],
['Welches Wort ist ein Nomen?',['Freude','freuen','froh','sehr'],'Freude','«Freude» ist ein Nomen (ein Gefühl).','sg4'],
['Wie nennt man Namen von Personen und Orten wie «Anna» oder «Bern»?',['Eigennamen','Sammelnamen','Abstrakta','Konkreta'],'Eigennamen','Eigennamen bezeichnen eine bestimmte Person oder einen bestimmten Ort.','sg4'],
['Welches Nomen kann man <b>nicht</b> anfassen?',['Mut','Tisch','Hund','Buch'],'Mut','«Mut» ist ein Gedanke oder Gefühl (Abstraktum). Tisch, Hund und Buch kann man anfassen.','sg4'],
['Wie schreibt man «das Laufen» in «Das ___ macht Spass.»?',['Laufen','laufen','Läufen','läufen'],'Laufen','Verben werden zu Nomen, wenn ein Artikel davorsteht: das Laufen.','sg3']
].forEach(z=>task.push({typ:'wissen',stufe:1,cats:[z[4]],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));
task.push=_p0;
})();

GT.chapter({id:'nomen',teil:'wort',nr:2,title:'Nomen',big:'Der Hund, die Katze, das Kind',desc:'Wörter für Lebewesen, Dinge und Gedanken',
 ex:'«'+mk('nomen','Der Hund')+', '+mk('nomen','die Katze')+', '+mk('nomen','das Kind')+'»',
 goals:['Ich erkenne Nomen mit der Artikelprobe.','Ich kenne das Geschlecht (männlich, weiblich, sächlich) und setze den richtigen Artikel.','Ich bilde die Mehrzahl von Nomen und kenne Nomen ohne Einzahl oder Mehrzahl.','Ich schreibe Nomen und nominalisierte Wörter richtig gross.','Ich unterscheide Eigennamen und Gattungsnamen und weiss, ob ein Nomen ein Lebewesen, ein Ding oder Gedachtes nennt.','Ich bilde zusammengesetzte Nomen und erkenne Homonyme.','Ich kenne die Fachbegriffe zum Nomen (Begleiter, Genus, Numerus, Kasus, deklinieren).'],
  write:['artikel','mehrzahl','gross'],strict:['gross'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{artikel:{winstr:'Schreibe den passenden Artikel.',label:'Artikel einsetzen',short:'der, die oder das',instr:'Welcher Artikel passt?',hint:'Prüfe die Endung (-ung, -chen …) und denke an die Hilfen in der Theorie.',ref:'genus'},
  mehrzahl:{winstr:'Schreibe die Mehrzahl.',label:'Mehrzahl bilden',short:'Einzahl und Mehrzahl',instr:'Wähle die richtige Mehrzahl.',hint:'Denke an die Pluralendungen: -e, -er, -en, -s, Umlaut.',ref:'zahl'},
  gross:{winstr:'Schreibe das Wort richtig: gross oder klein.',label:'Gross oder klein',short:'Nominalisierung',instr:'Welche Schreibweise ist richtig?',hint:'Suche ein Signalwort: Artikel, beim, zum, etwas, nichts, viel, alles.',ref:'gross'},
  text:{icon:'🔍',label:'Nomen im Text',short:'Alle Nomen in einem Text finden',instr:'Tippe alle Nomen im Text an (auch nominalisierte).',hint:'Artikelprobe: Kann ein Artikel davor stehen?',ref:'merkmale'},
  bilden:{icon:'🛠️',label:'Nomen bilden',short:'Aus Verben und Adjektiven Nomen machen',instr:'Schreibe das Nomen.',hint:'Nomen enden oft auf -ung, -heit, -keit oder entstehen aus dem Verb.',ref:'gross'},
  einzahl:{icon:'1️⃣',label:'Einzahl bilden',short:'Von der Mehrzahl zur Einzahl',instr:'Schreibe die Einzahl.',hint:'Wie heisst das Wort, wenn es nur ein Ding ist?',ref:'zahl'},
  markieren:{label:'Nomen markieren',short:'Alle Nomen finden',instr:'Tippe alle Nomen an.',hint:'Artikelprobe: Kann ein Artikel davor stehen?',ref:'merkmale'},
  wissen:{label:'Wissen',short:'Begriffe und Regeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'arten'},
  begriff:{icon:'📚',label:'Fachbegriffe wählen',short:'Fremdwort und deutsches Wort',instr:'Wähle den richtigen Begriff.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  begriffin:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Achte auf Gross- und Kleinschreibung.',hint:'Nomen schreibt man gross, Verben klein.',ref:'fachbegriffe'},
  mehrart:{icon:'🔀',label:'Zwei Artikel möglich',short:'Nomen mit zwei Artikeln',instr:'Welche Artikel sind richtig?',hint:'Manche Nomen haben zwei richtige Artikel.',ref:'genus'},
  homonym:{icon:'🪞',label:'Homonyme',short:'Gleiches Wort, andere Bedeutung',instr:'Wähle die richtige Antwort.',hint:'Lies den ganzen Satz. Er zeigt die Bedeutung.',ref:'homonyme'},
  singpl:{icon:'🔢',label:'Nur Einzahl oder nur Mehrzahl',short:'Nomen ohne Mehrzahl oder Einzahl',instr:'Wähle die richtige Antwort.',hint:'Kann man das Wort in der Einzahl und Mehrzahl sagen?',ref:'zahl'},
  kompo:{icon:'🧱',label:'Nomen zusammensetzen',short:'Zusammengesetzte Nomen mit Artikel',instr:'Schreibe das zusammengesetzte Nomen mit Artikel.',hint:'Das letzte Wort bestimmt den Artikel.',ref:'zusammen'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
