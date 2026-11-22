/* Kapitel Satzlehre 4: Satzarten. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Satzarten bestimmen',sg2:'Satzzeichen',sg3:'Sätze umformen',sg4:'Einfacher und zusammengesetzter Satz',sg5:'Satzfragment',sg6:'Fachbegriffe'};
const task=[];
const Z=['Aussagesatz','Fragesatz','Aufforderungssatz','Ausrufesatz'];

/* Satzart bestimmen */
const Q=[
['Der Hund bellt laut.',0,1,'Er teilt etwas mit: Aussagesatz.'],
['Kommst du morgen mit?',1,1,'Er fragt etwas: Fragesatz.'],
['Komm bitte her!',2,1,'Er fordert auf: Aufforderungssatz.'],
['Wie schön das ist!',3,1,'Er drückt ein Gefühl aus: Ausrufesatz.'],
['Anna liest ein Buch.',0,1,'Aussagesatz.'],
['Wo wohnst du?',1,1,'Fragesatz mit Fragewort.'],
['Mach bitte das Fenster zu!',2,1,'Aufforderungssatz.'],
['Hilfe!',3,1,'Ausrufesatz.'],
['Heute ist es kalt.',0,1,'Aussagesatz.'],
['Hast du Hunger?',1,1,'Fragesatz (Ja/Nein-Frage).'],
['Bleib ruhig!',2,1,'Aufforderungssatz.'],
['Das ist ja toll!',3,2,'Ausrufesatz: drückt Begeisterung aus.'],
['Wann beginnt die Schule?',1,2,'Fragesatz mit Fragewort.'],
['Gib mir bitte das Salz.',2,2,'Aufforderungssatz; er kann mit Punkt oder Ausrufezeichen enden.'],
['Wir fahren morgen nach Bern.',0,2,'Aussagesatz.'],
['Warum bist du so spät?',1,2,'Fragesatz mit Fragewort.'],
['Setzt euch bitte hin.',2,2,'Aufforderungssatz.'],
['Das ist unglaublich!',3,2,'Ausrufesatz.'],
['Der Zug fährt um acht Uhr ab.',0,2,'Aussagesatz.'],
['Ob er wohl kommt?',1,3,'Fragesatz.'],
['Würdest du mir bitte helfen?',1,3,'Höfliche Aufforderung in Fragenform: Fragesatz.'],
['Ich möchte, dass du mir hilfst.',0,3,'Aussagesatz (mit Nebensatz).']
];
Q.forEach(q=>task.push({typ:'satzart',stufe:q[2],lv:q[2]===3?2:1,cats:['sg1'],sent:'«'+q[0]+'»',opts:Z,answer:Z[q[1]],why:'<b>'+Z[q[1]]+'.</b> '+q[3]}));

/* Satzzeichen */
const S=[
['Der Hund bellt___',['.','?','!',','],'.','Aussagesatz: Punkt.',1],
['Kommst du morgen___',['?','.','!',','],'?','Fragesatz: Fragezeichen.',1],
['Komm bitte her___',['!','.','?',','],'!','Aufforderung: Ausrufezeichen (oder Punkt bei freundlichem Ton).',1],
['Wie schön das ist___',['!','.','?',','],'!','Ausruf: Ausrufezeichen.',1],
['Wo wohnst du___',['?','.','!',','],'?','Fragesatz: Fragezeichen.',1],
['Heute ist es kalt___',['.','?','!',','],'.','Aussagesatz: Punkt.',1],
['Hilfe___',['!','.','?',','],'!','Ausruf: Ausrufezeichen.',1],
['Hast du Hunger___',['?','.','!',','],'?','Ja/Nein-Frage: Fragezeichen.',1],
['Ich frage mich, ob er kommt___',['.','?','!',','],'.','Es ist eine Aussage (indirekte Frage): Punkt.',2],
['Er fragte: «Kommst du mit___» ',['?','.','!',','],'?','Die direkte Frage endet mit einem Fragezeichen.',3]
];
S.forEach(s=>task.push({typ:'zeichen',stufe:s[4],lv:s[4]===3?2:1,cats:['sg2'],sent:s[0].replace('___','<span class="gap">__</span>'),opts:s[1],answer:s[2],why:'<b>'+s[2]+'</b> '+s[3]}));

/* Wissen */
const W=[
['Wie unterscheidet man einen <b>Aussagesatz</b>?',['Er teilt etwas mit und endet mit einem Punkt.','Er fragt etwas.','Er fordert auf.','Er endet mit einem Fragezeichen.'],'Er teilt etwas mit und endet mit einem Punkt.','Aussagesatz: Punkt.','sg1',1],
['Was ist eine <b>Ja-/Nein-Frage</b>?',['Das Verb steht am Satzanfang.','Das Verb steht am Satzende.','Es beginnt mit «Wer».','Sie endet mit einem Punkt.'],'Das Verb steht am Satzanfang.','«Kommst du mit?»','sg1',1],
['Was ist eine <b>Ergänzungsfrage</b>?',['Sie beginnt mit einem Fragewort.','Sie beginnt mit dem Verb.','Sie endet mit Punkt.','Sie braucht kein Verb.'],'Sie beginnt mit einem Fragewort.','«Wo wohnst du?»','sg1',2],
['Wie lautet die Satzart von «Komm!»?',['Aufforderungssatz','Aussagesatz','Fragesatz','Ausrufesatz'],'Aufforderungssatz','Ein Befehl oder Wunsch.','sg1',1],
['Wo steht das Verb in einer <b>Aufforderung</b>?',['am Satzanfang','an zweiter Stelle','am Satzende','überall'],'am Satzanfang','«<b>Komm</b> her!»','sg3',2],
['Aus «Du kommst morgen.» wird eine Frage:',['Kommst du morgen?','Du kommst morgen?','Morgen du kommst?','Du morgen kommst?'],'Kommst du morgen?','Verb und Subjekt tauschen.','sg3',1],
['Aus «Er hilft dir.» wird eine Frage:',['Hilft er dir?','Er hilft dir?','Hilft dir er?','Er dir hilft?'],'Hilft er dir?','Verb an den Satzanfang.','sg3',1],
['Aus «Du machst das Fenster zu.» wird eine Aufforderung:',['Mach das Fenster zu!','Du mach das Fenster zu!','Machst du das Fenster zu!','Zu mach das Fenster!'],'Mach das Fenster zu!','Befehlsform des Verbs ohne «du».','sg3',2],
['Aus «Das Wetter ist schön.» wird ein Ausruf:',['Wie schön das Wetter ist!','Wie das Wetter ist schön?','Ist das Wetter schön.','Das Wetter schön!'],'Wie schön das Wetter ist!','Ausruf mit «Wie …!»','sg3',2],
['Welcher Satz ist eine <b>höfliche Aufforderung</b>?',['Könnten Sie mir bitte helfen?','Hilf mir!','Ich brauche Hilfe.','Warum hilfst du nicht?'],'Könnten Sie mir bitte helfen?','Höfliche Bitte in Frageform.','sg1',3]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));


/* ---- NEU: Satzbau (einfacher Satz, zusammengesetzter Satz, Satzfragment) ---- */
const BAU=['Einfacher Satz','Zusammengesetzter Satz','Satzfragment'];
const B=[
['Die Klasse schreibt einen Test.',0,1,'Eine Personalform («schreibt»): einfacher Satz.'],
['Die Katze schläft.',0,1,'Eine Personalform: einfacher Satz.'],
['Kommst du morgen mit ins Schwimmbad?',0,1,'Eine Personalform («kommst»): einfacher Satz.'],
['Schreib endlich deine Hausaufgaben!',0,1,'Eine Personalform (Befehlsform): einfacher Satz.'],
['Wir haben gestern den ganzen Nachmittag Fussball gespielt.',0,2,'«haben … gespielt» ist <b>eine</b> verbale Wortkette mit einer Personalform: einfacher Satz.'],
['Sie wollte nach der Schule ihre Freundin besuchen.',0,2,'«wollte … besuchen»: eine Personalform. Einfacher Satz.'],
['Heute Morgen schrieb Lena zwei Stunden lang an einem Brief an ihre Tante.',0,2,'Lang, aber nur <b>eine</b> Personalform: einfacher Satz. Einfache Sätze müssen nicht kurz sein.'],
['Der neue Schüler aus der Parallelklasse sitzt heute zum ersten Mal neben mir im Mathematikunterricht.',0,3,'Sehr lang, aber nur eine Personalform («sitzt»): einfacher Satz.'],
['Ich lerne viel, weil ich eine gute Note schreiben will.',1,1,'Zwei Personalformen («lerne», «will»): zusammengesetzter Satz.'],
['Der Bus kommt spät, und wir warten im Regen.',1,1,'Zwei Personalformen («kommt», «warten»): zusammengesetzter Satz.'],
['Als wir ankamen, war die Pause schon vorbei.',1,1,'Zwei Personalformen («ankamen», «war»): zusammengesetzter Satz.'],
['Tim spielt Gitarre, und Mia singt dazu.',1,1,'Zwei Personalformen: zusammengesetzter Satz.'],
['Hast du gehört, dass morgen der Unterricht ausfällt?',1,2,'Zwei Personalformen («hast», «ausfällt»): zusammengesetzter Satz.'],
['Er sagte, er habe keine Zeit.',1,2,'Zwei Personalformen («sagte», «habe»): zusammengesetzter Satz.'],
['Das Handy, das ich gestern gekauft habe, funktioniert nicht mehr.',1,2,'Zwei Personalformen («habe», «funktioniert»): zusammengesetzter Satz.'],
['Lena ging nach Hause und machte ihre Hausaufgaben.',1,2,'Zwei Personalformen («ging», «machte»): zusammengesetzter Satz. Das Subjekt «Lena» wird nur einmal genannt.'],
['Wir assen, spielten und lachten.',1,3,'Drei Personalformen: zusammengesetzter Satz mit drei Teilsätzen.'],
['Taxi!',2,1,'Keine Personalform: Satzfragment.'],
['Pause!',2,1,'Keine Personalform: Satzfragment.'],
['Nicht schlecht.',2,1,'Keine Personalform: Satzfragment.'],
['Guten Morgen!',2,1,'Keine Personalform: Satzfragment.'],
['Danke!',2,1,'Ein Wort ohne Personalform: Satzfragment (Einwortsatz).'],
['Bis morgen!',2,1,'Keine Personalform: Satzfragment.'],
['Schule aus.',2,2,'Keine Personalform: Satzfragment.'],
['Eintritt frei.',2,2,'Keine Personalform: Satzfragment.']
];
B.forEach(b=>task.push({typ:'bau',stufe:b[2],lv:b[2]===3?2:1,cats:[b[1]===2?'sg5':'sg4'],sent:'«'+b[0]+'»',opts:BAU,answer:BAU[b[1]],why:'<b>'+BAU[b[1]]+'.</b> '+b[3]}));

const PF=[
['Wie viele Personalformen hat «Wir haben gestern Fussball gespielt.»?',['1','2','3','0'],'1','Nur «haben» ist die Personalform. «gespielt» ist ein Partizip.','sg4',2],
['Wie viele Personalformen hat «Die Katze schläft.»?',['1','2','3','0'],'1','«schläft».','sg4',1],
['Wie viele Personalformen hat «Ich lerne viel, weil ich eine gute Note schreiben will.»?',['2','1','3','0'],'2','«lerne» und «will».','sg4',1],
['Wie viele Personalformen hat «Der Bus kommt spät, und wir warten im Regen.»?',['2','1','3','0'],'2','«kommt» und «warten».','sg4',1],
['Wie viele Personalformen hat «Als wir ankamen, war die Pause vorbei, und wir gingen hinein.»?',['3','2','1','4'],'3','«ankamen», «war», «gingen».','sg4',2],
['Wie viele Personalformen hat «Taxi!»?',['0','1','2','3'],'0','Ein Satzfragment hat keine Personalform.','sg5',1],
['Wie viele Personalformen hat «Lena ging nach Hause und machte ihre Hausaufgaben.»?',['2','1','3','0'],'2','«ging» und «machte».','sg4',2],
['Wie viele Personalformen hat «Sie wollte ihre Freundin besuchen.»?',['1','2','3','0'],'1','«wollte». «besuchen» ist ein Infinitiv.','sg4',2],
['Wie viele Teilsätze hat «Tim spielt Gitarre, und Mia singt dazu.»?',['2','1','3','4'],'2','Tim spielt Gitarre · Mia singt dazu.','sg4',1],
['Wie viele Teilsätze hat «Wir assen, spielten und lachten.»?',['3','2','1','4'],'3','Jeder Teilsatz hat eine Personalform: assen, spielten, lachten.','sg4',3],
['Der einfache Satz hat genau …',['eine Personalform','zwei Personalformen','keine Personalform','drei Personalformen'],'eine Personalform','Einem einfachen Satz liegt eine verbale Wortkette zugrunde.','sg4',1],
['Ein zusammengesetzter Satz besteht aus mindestens …',['zwei Teilsätzen','einem Teilsatz','drei Teilsätzen','keinem Teilsatz'],'zwei Teilsätzen','Jedem Teilsatz liegt eine verbale Wortkette zugrunde.','sg4',1],
['Einfache Sätze sind immer kurz.',['Falsch','Richtig','Nur bei Aufforderungen','Nur bei Fragen'],'Falsch','Entscheidend ist nicht die Länge, sondern die Anzahl der Personalformen.','sg4',1],
['Was ist ein <b>Teilsatz</b>?',['ein Teil eines zusammengesetzten Satzes mit eigener verbaler Wortkette','ein einzelnes Wort','ein Satzglied','ein Satzzeichen'],'ein Teil eines zusammengesetzten Satzes mit eigener verbaler Wortkette','Teilsätze bestehen wie einfache Sätze aus verbalen Teilen und Satzgliedern.','sg4',2],
['Was ist ein <b>Satzfragment</b>?',['ein unvollständiger oder abgebrochener Satz ohne Personalform','ein sehr langer Satz','ein Satz mit zwei Personalformen','ein Satz mit Nebensatz'],'ein unvollständiger oder abgebrochener Satz ohne Personalform','Beispiele: «Taxi!», «Nicht schlecht.»','sg5',1],
['Welches ist ein <b>Satzfragment</b>?',['Gute Besserung!','Ich gehe nach Hause.','Er spielt Fussball.','Wir lernen.'],'Gute Besserung!','Keine Personalform: Satzfragment.','sg5',1],
['Welches ist <b>kein</b> Satzfragment?',['Wir gehen heim.','Taxi!','Pause!','Danke!'],'Wir gehen heim.','Hier gibt es eine Personalform («gehen»).','sg5',1],
['Welcher ganze Satz passt zum Fragment «Pause!»?',['Jetzt ist Pause.','Die Pause ist lang, weil wir spielen.','Pausen sind wichtig, aber anstrengend.','Wann ist Pause und wer kommt mit?'],'Jetzt ist Pause.','Aus dem Fragment wird ein einfacher Satz mit Personalform.','sg5',1],
['Welcher ganze Satz passt zum Fragment «Hausaufgaben vergessen?»?',['Hast du die Hausaufgaben vergessen?','Hausaufgaben sind Hausaufgaben.','Vergessen ist menschlich.','Die Hausaufgaben vergessen.'],'Hast du die Hausaufgaben vergessen?','Ein ganzer Satz braucht eine Personalform.','sg5',2],
['Wie kann man aus «Hast du deine Jacke vergessen?» ein Satzfragment machen?',['Jacke vergessen?','Hast du deine Jacke?','Du hast sie vergessen.','Vergiss die Jacke nicht!'],'Jacke vergessen?','Man lässt die Personalform weg.','sg5',2],
['Aus dem Fragment «Bus verpasst!» wird der Satz …',['Ich habe den Bus verpasst.','Der Bus ist ein Verkehrsmittel.','Bus und Bahn.','Bus!'],'Ich habe den Bus verpasst.','Jetzt gibt es eine Personalform («habe»).','sg5',2],
['Warum benutzt man Satzfragmente?',['Sie sind kurz und reichen oft aus.','Sie sind immer grammatisch falsch.','Sie haben mehrere Personalformen.','Sie sind nur Nebensätze.'],'Sie sind kurz und reichen oft aus.','Auf Schildern und im Gespräch genügen oft Fragmente.','sg5',2],
['Wie heissen die drei Grundfunktionen der menschlichen Rede?',['Aussage, Frage, Aufforderung','Nomen, Verb, Adjektiv','Subjekt, Prädikat, Objekt','Hauptsatz, Nebensatz, Satzfragment'],'Aussage, Frage, Aufforderung','Mit einem Satz teile ich etwas mit, frage oder fordere auf.','sg1',1],
['Was ist ein anderes Wort für «Befehl»?',['Aufforderung (Imperativ)','Aussage','Frage','Ausruf'],'Aufforderung (Imperativ)','Befehl, Aufforderung und Imperativ meinen dasselbe: «Komm her!».','sg1',1],
['Wie heissen die Fachwörter der drei Grundfunktionen?',['Aussage (Deklaration), Befehl (Imperativ), Frage (Interrogativ)','Nomen, Verb, Adjektiv','Subjekt, Prädikat, Objekt','Präsens, Präteritum, Futur'],'Aussage (Deklaration), Befehl (Imperativ), Frage (Interrogativ)','Merke: Deklaration, Imperativ, Interrogativ.','sg1',2]
];
PF.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
const FB=[
["fach",1,"sg6","Wie heisst die Befehlsform mit einem anderen Wort?","Die Befehlsform heisst auch …","Imperativ",["Der Imperativ"],true,"Imperativ = Befehlsform."],
["fach",1,"sg6","Unvollständiger oder abgebrochener Satz.","Ein unvollständiger Satz heisst …","Satzfragment",["Das Satzfragment"],true,"Satzfragment = Bruchstück eines Satzes ohne Personalform."],
["fach",1,"sg6","Ein Satz mit nur einer verbalen Wortkette.","Das ist ein … Satz.","einfacher",["einfacher Satz","Einfacher"],true,"Einfacher Satz: eine Personalform."],
["fach",2,"sg6","Ein Satz aus mindestens zwei Teilsätzen.","Das ist ein … Satz.","zusammengesetzter",["zusammengesetzter Satz","Zusammengesetzter"],true,"Zusammengesetzter Satz: mindestens zwei Teilsätze."],
["fach",2,"sg6","Jeder Teil eines zusammengesetzten Satzes heisst …","Man nennt ihn …","Teilsatz",["Der Teilsatz"],true,"Teilsätze bestehen wie einfache Sätze aus verbalen Teilen und Satzgliedern."],
["fach",2,"sg6","Wie heisst die Fragesatz-Funktion mit dem Fachwort?","Das Fachwort heisst …","Interrogativ",[],true,"Frage = Interrogativ."]
];
FB.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Tim kommt morgen.", "Kommt Tim morgen?", [], false, "So wird daraus ein Fragesatz: «Kommt Tim morgen?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Du hilfst mir.", "Hilfst du mir?", [], false, "So wird daraus ein Fragesatz: «Hilfst du mir?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Sie spielt Klavier.", "Spielt sie Klavier?", [], false, "So wird daraus ein Fragesatz: «Spielt sie Klavier?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Ihr habt Hunger.", "Habt ihr Hunger?", [], false, "So wird daraus ein Fragesatz: «Habt ihr Hunger?»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Wir gehen ins Kino.", "Gehen wir ins Kino?", [], false, "So wird daraus ein Fragesatz: «Gehen wir ins Kino?»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du räumst dein Zimmer auf.", "Räum dein Zimmer auf!", ["Räume dein Zimmer auf!"], false, "So wird daraus ein Aufforderungssatz: «Räum dein Zimmer auf!»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du machst die Hausaufgaben.", "Mach die Hausaufgaben!", ["Mache die Hausaufgaben!"], false, "So wird daraus ein Aufforderungssatz: «Mach die Hausaufgaben!»"], ["umformen", 3, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du bist leise.", "Sei leise!", [], false, "So wird daraus ein Aufforderungssatz: «Sei leise!»"]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'arten',title:'Die drei Grundfunktionen der Rede',short:'Grundfunktionen',min:10,note:'Mit Sätzen tun wir drei Dinge: mitteilen, fragen, auffordern. Fachwörter: Deklaration, Interrogativ, Imperativ. Der Ausruf ist ein Zusatz.',
 html:()=>T(['Grundfunktion','Fachwort','Satzzeichen','Beispiel'],[['Aussage','Deklaration','.','Der Hund bellt.'],['Frage','Interrogativ','?','Kommst du mit?'],['Aufforderung (Befehl)','Imperativ','! oder .','Komm her!']])+
 '<div class="callout"><b>Zusatz:</b> Mit einem Ausrufesatz zeigen wir ein Gefühl: «Wie schön das ist!»</div>'},
{id:'bau',title:'Der Satzbau: einfach, zusammengesetzt, Fragment',short:'Satzbau',min:12,note:'Entscheidend ist die Zahl der Personalformen. Eine = einfacher Satz. Mindestens zwei = zusammengesetzter Satz. Keine = Satzfragment. Einfache Sätze können lang sein.',
 html:()=>T(['Satzbau','Merkmal','Beispiel'],[['Einfacher Satz','genau eine verbale Wortkette (eine Personalform)','Sie schreibt. · Schreib endlich diesen Brief!'],['Zusammengesetzter Satz','mindestens zwei Teilsätze, jeder mit eigener verbaler Wortkette','Ich lerne, weil ich eine Note will.'],['Satzfragment','unvollständig oder abgebrochen, ohne Personalform','Taxi! · Nicht schlecht.']])+
 '<div class="callout">Einfache Sätze müssen <b>nicht kurz</b> sein: «Heute Morgen schrieb Lena zwei Stunden lang an einem Brief an ihre Tante.» (eine Personalform)</div>'+
 '<div class="callout"><b>Teilsatz:</b> Jeder Teil eines zusammengesetzten Satzes. Jedem Teilsatz liegt eine verbale Wortkette zugrunde.</div>'},
{id:'fragment',title:'Satzfragmente',short:'Satzfragmente',min:8,note:'Fragmente sind in vielen Fällen sinnvoller als ganze Sätze (Schilder, Gespräche). Fachwort aus der Wissenschaft: Ellipse.',
 html:()=>'<p class="lead">Ein <b>Satzfragment</b> ist ein unvollständiger oder abgebrochener Satz oder ein Einwortsatz. Es hat keine Personalform.</p>'+
 T(['Fragment','Ganzer Satz'],[['Taxi!','Ich brauche ein Taxi.'],['Pause!','Jetzt ist Pause.'],['Bus verpasst!','Ich habe den Bus verpasst.'],['Nicht schlecht.','Das ist nicht schlecht.']])+
 '<div class="callout">Auch Gespräche bestehen oft aus Fragmenten: «Morgen?» – «Morgen!» – «Gut.»</div>'},
{id:'frage',title:'Fragesätze',short:'Fragesätze',min:8,note:'Ja/Nein-Frage: Verb an erster Stelle. Ergänzungsfrage: Fragewort + Verb an zweiter Stelle.',
 html:()=>'<div class="grid2"><div class="card"><h3>Ja-/Nein-Frage</h3><p>Das Verb steht <b>vorne</b>.</p><p><b>Kommst</b> du morgen? – Ja. / Nein.</p></div>'+
 '<div class="card"><h3>Ergänzungsfrage</h3><p>Sie beginnt mit einem <b>Fragewort</b> (wer, was, wo, wann, wie, warum).</p><p><b>Wo</b> wohnst du?</p></div></div>'},
{id:'umformen',title:'Sätze umformen',short:'Umformen',min:8,note:'Aus Aussage wird Frage: Verb und Subjekt tauschen. Aus Aussage wird Aufforderung: Befehlsform.',
 html:()=>T(['Aussage','Frage','Aufforderung'],[['Du kommst her.','Kommst du her?','Komm her!'],['Er hilft mir.','Hilft er mir?','Hilf mir!'],['Du machst das Fenster zu.','Machst du das Fenster zu?','Mach das Fenster zu!']])},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Deklaration','Aussage'],['Interrogativ','Frage'],['Imperativ','Aufforderung, Befehl, Befehlsform'],['Einfacher Satz','ein Satz mit einer verbalen Wortkette'],['Zusammengesetzter Satz','mindestens zwei Teilsätze'],['Teilsatz','Teil eines zusammengesetzten Satzes'],['Satzfragment','unvollständiger oder abgebrochener Satz ohne Personalform (auch Ellipse)']])},
{id:'hoeflich',title:'Höfliche Aufforderungen',short:'Höflichkeit',lv:2,min:6,note:'Ab Niveau B. Höfliche Bitten mit «könnten, würden, bitte».',
 html:()=>'<div class="card"><p>Direkt: <b>Hilf mir!</b></p><p>Höflich: <b>Könntest du mir bitte helfen?</b> · <b>Würden Sie mir bitte helfen?</b></p><p class="muted">Höfliche Aufforderungen haben oft die Form einer Frage.</p></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Typische Fehler: Satzzeichen, indirekte Fragen, Aufforderung mit Punkt.',
 html:()=>'<div class="grid3">'+[
  ['1 · Indirekte Frage','«Ich frage mich, ob er kommt<b>.</b>»','Keine direkte Frage: Punkt statt Fragezeichen.'],
  ['2 · Aufforderung mit Punkt','«Gib mir bitte das Salz<b>.</b>»','Wenn der Ton freundlich ist, reicht der Punkt.'],
  ['3 · Fragewort oder Verb vorne','«Wo wohnst du?» / «Wohnst du hier?»','Beide sind Fragesätze.'],
  ['4 · Ausruf ≠ Aufforderung','«Wie schön!» (Ausruf) / «Komm!» (Aufforderung)','Ausruf: Gefühl. Aufforderung: Anweisung.'],
  ['5 · Verb an Position 1','«Kommst du?»','Ja-/Nein-Frage: Verb zuerst.'],
  ['6 · Doppeltes Zeichen','«Was?!»','In der Schule genügt ein Zeichen.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('satzart,zeichen')}
];
const EX=[
 ['Wie heissen die drei Grundfunktionen der Rede?','Aussage, Frage, Aufforderung',1],
 ['Einfacher oder zusammengesetzter Satz? «Wir lernen, weil morgen ein Test ist.»','zusammengesetzt (zwei Personalformen)',1],
 ['Mache aus «Pause!» einen ganzen Satz.','Jetzt ist Pause.',1],
 ['Bestimme die Satzart: «Das Wetter ist schön.»','Aussagesatz',1],
 ['Bestimme die Satzart: «Kommst du mit?»','Fragesatz',1],
 ['Bestimme die Satzart: «Sei bitte leise!»','Aufforderungssatz',1],
 ['Forme in eine Frage um: «Er spielt Fussball.»','Spielt er Fussball?',1],
 ['Forme in eine Aufforderung um: «Du schreibst deinen Namen.»','Schreib deinen Namen!',1],
 ['Schreibe einen Ausrufesatz zum Wetter.','Beispiel: Wie schön das Wetter heute ist!',2],
 ['Schreibe eine höfliche Aufforderung an die Lehrerin.','Beispiel: Könnten Sie mir bitte helfen?',2]
];
const merk=()=>T(['Satzart','Satzzeichen','Beispiel'],[['Aussagesatz','.','Der Hund bellt.'],['Fragesatz','?','Kommst du mit?'],['Aufforderungssatz','! oder .','Komm her!'],['Ausrufesatz (Zusatz)','!','Wie schön das ist!']])+T(['Satzbau','Merkmal'],[['Einfacher Satz','eine Personalform, kann lang sein'],['Zusammengesetzter Satz','mindestens zwei Teilsätze'],['Satzfragment','keine Personalform']])+
 '<ul><li>Ja-/Nein-Frage: Verb an erster Stelle.</li><li>Ergänzungsfrage: Fragewort + Verb an zweiter Stelle.</li><li>Aufforderung: Befehlsform, Verb vorne.</li></ul>';
const UEM={'arten':{types:'satzart',cats:'sg1'},'bau':{types:'bau',cats:'sg4'},'frage':{types:'zeichen',cats:'sg2'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
GT.chapter({id:'satzarten',teil:'satz',nr:5,title:'Satzarten und Satzbau',big:'Aussage, Frage, Aufforderung',desc:'Grundfunktionen, einfacher und zusammengesetzter Satz, Satzfragment',
 ex:'«Kommst du mit?» · «Komm mit!» · «Wie schön!»',
 goals:['Ich kenne die drei Grundfunktionen der Rede: Aussage, Frage, Aufforderung.','Ich setze das richtige Satzzeichen und forme Sätze um.','Ich erkenne einfache und zusammengesetzte Sätze und zähle die Personalformen.','Ich erkenne Satzfragmente und baue sie zu ganzen Sätzen aus.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{satzart:{label:'Satzart bestimmen',short:'Aussage, Frage, Aufforderung, Ausruf',instr:'Welche Satzart ist es?',hint:'Was will der Satz? Mitteilen, fragen, auffordern oder ein Gefühl zeigen?',ref:'arten'},
  zeichen:{label:'Satzzeichen',short:'. ? !',instr:'Welches Satzzeichen passt?',hint:'Satzart bestimmen, dann das passende Zeichen wählen.',ref:'arten'},
  umformen:{icon:'🔁',label:'Sätze umformen',short:'Aussagen zu Fragen und Aufforderungen machen',instr:'Schreibe den umgeformten Satz.',hint:'Frage: Das Prädikat steht an erster Stelle. Aufforderung: ohne «du».',ref:'umformen'},
  wissen:{label:'Wissen',short:'Grundfunktionen, Satzbau und Umformen',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'bau'},
  bau:{icon:'🏗️',label:'Satzbau bestimmen',short:'Einfacher Satz, zusammengesetzter Satz, Satzfragment',instr:'Welcher Satzbau liegt vor?',hint:'Zähle die Personalformen: 1 = einfacher Satz, 2 oder mehr = zusammengesetzter Satz, 0 = Satzfragment.',ref:'bau'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
