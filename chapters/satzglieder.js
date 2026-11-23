/* Kapitel Satzlehre 3: Die Satzglieder benennen. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg2:'Subjekt und Prädikat',sg3:'Objekte',sg4:'Präpositionalgefüge und Adverbiale',sg5:'Attribut',sg6:'Fachbegriffe'};
const task=[];
const G=['Subjekt','Prädikat','Akkusativobjekt','Dativobjekt','Präpositionalgefüge','Adverbiale','Genitivobjekt'];
const G6=G.slice(0,6);

/* Satzglied bestimmen: [Satz mit markiertem Glied, Antwort, Stufe, Hinweis] */
const Q=[
['<b>Der Hund</b> bellt laut.',0,1,'Wer bellt? – Der Hund: Subjekt.'],
['Der Hund <b>bellt</b> laut.',1,1,'Was tut der Hund? – bellt: Prädikat.'],
['Anna liest <b>ein Buch</b>.',2,1,'Was liest Anna? – ein Buch: Akkusativobjekt.'],
['Er hilft <b>dem Freund</b>.',3,1,'Wem hilft er? – dem Freund: Dativobjekt.'],
['Er kommt <b>heute</b>.',5,1,'Wann? – heute: Adverbiale (einzelnes Wort ohne Präposition).'],
['<b>Anna</b> liest ein Buch.',0,1,'Wer liest? – Anna: Subjekt.'],
['Anna <b>liest</b> ein Buch.',1,1,'Was tut Anna? – liest: Prädikat.'],
['Wir sehen <b>den Hund</b>.',2,1,'Wen sehen wir? – den Hund: Akkusativobjekt.'],
['Sie schenkt <b>ihrem Bruder</b> ein Buch.',3,1,'Wem schenkt sie? – ihrem Bruder: Dativobjekt.'],
['Sie spielen <b>im Garten</b>.',4,1,'Wo? – im Garten: Präpositionalgefüge (beginnt mit «in»).'],
['<b>Meine Schwester</b> kauft Brot.',0,1,'Wer kauft? – Meine Schwester: Subjekt.'],
['Meine Schwester kauft <b>Brot</b>.',2,1,'Was kauft sie? – Brot: Akkusativobjekt.'],
['Er <b>hat</b> gestern <b>gelacht</b>.',1,2,'Prädikat: hat … gelacht (zwei Teile).'],
['Gestern spielte <b>der kleine Junge</b> Fussball.',0,2,'Wer spielte? – der kleine Junge: Subjekt.'],
['<b>Gestern</b> spielte der kleine Junge Fussball.',5,2,'Wann? – Gestern: Adverbiale (einzelnes Wort ohne Präposition).'],
['Gestern spielte der kleine Junge <b>Fussball</b>.',2,2,'Was spielte er? – Fussball: Akkusativobjekt.'],
['Mein Vater gibt <b>mir</b> das Geld.',3,2,'Wem gibt er? – mir: Dativobjekt.'],
['Mein Vater gibt mir <b>das Geld</b>.',2,2,'Was gibt er? – das Geld: Akkusativobjekt.'],
['Sie fährt <b>mit dem Zug</b> nach Bern.',4,2,'Wie? – mit dem Zug: Präpositionalgefüge (beginnt mit «mit»).'],
['Sie fährt mit dem Zug <b>nach Bern</b>.',4,2,'Wohin? – nach Bern: Präpositionalgefüge (beginnt mit «nach»).'],
['Wir bleiben <b>wegen des Regens</b> zu Hause.',4,2,'Warum? – wegen des Regens: Präpositionalgefüge (beginnt mit «wegen»).'],
['<b>Der Lehrer</b> erklärt den Schülern die Aufgabe.',0,2,'Wer erklärt? – Der Lehrer: Subjekt.'],
['Der Lehrer erklärt <b>den Schülern</b> die Aufgabe.',3,2,'Wem erklärt er? – den Schülern: Dativobjekt.'],
['Der Lehrer erklärt den Schülern <b>die Aufgabe</b>.',2,2,'Was erklärt er? – die Aufgabe: Akkusativobjekt.'],
['Der Lehrer <b>erklärt</b> den Schülern die Aufgabe.',1,2,'Prädikat: erklärt.'],
['Sie <b>ruft</b> ihre Freundin <b>an</b>.',1,3,'Prädikat: ruft … an (trennbares Verb).'],
['Sie ruft <b>ihre Freundin</b> an.',2,3,'Wen ruft sie an? – ihre Freundin: Akkusativobjekt.'],
['<b>Gestern Abend</b> hat sie ihr geholfen.',5,3,'Wann? – Gestern Abend: Adverbiale (keine Präposition).'],
['Sie hat <b>ihr</b> geholfen.',3,3,'Wem hat sie geholfen? – ihr: Dativobjekt.']
];
Q.forEach(q=>task.push({typ:'glied',stufe:q[2],lv:q[2]===3?2:1,cats:[q[1]===0||q[1]===1?'sg2':(q[1]===4||q[1]===5)?'sg4':'sg3'],sent:q[0],opts:q[2]===3?G:G6,answer:G[q[1]],why:'<b>'+G[q[1]]+'.</b> '+q[3]}));

/* Zusatzaufgaben für die Übungsfolien pro Satzglied: [Satz, Antwort, Stufe, Hinweis, Kategorie, Optionen (optional), Niveau] */
const QN=[
['Im Park spielen <b>die Kinder</b> Fussball.','Subjekt',1,'Wer spielt? – die Kinder: Subjekt.','sg2'],
['<b>Die Lehrerin</b> korrigiert die Tests.','Subjekt',1,'Wer korrigiert? – Die Lehrerin: Subjekt.','sg2'],
['Heute Abend kocht <b>mein Vater</b> Spaghetti.','Subjekt',2,'Wer kocht? – mein Vater: Subjekt. Es steht nicht am Satzanfang.','sg2'],
['Dem Mädchen gefällt <b>das neue Lied</b>.','Subjekt',2,'Was gefällt? – das neue Lied: Subjekt (Nominativ).','sg2'],
['Nach der Pause beginnt <b>der Unterricht</b> wieder.','Subjekt',2,'Was beginnt? – der Unterricht: Subjekt.','sg2'],
['Auf dem Dach sitzen <b>drei Tauben</b>.','Subjekt',2,'Wer sitzt? – drei Tauben: Subjekt. Das Prädikat «sitzen» richtet sich nach der Mehrzahl.','sg2'],
['Gestern hat <b>unsere Klasse</b> den Wettbewerb gewonnen.','Subjekt',2,'Wer hat gewonnen? – unsere Klasse: Subjekt.','sg2'],
['Kommt <b>deine Schwester</b> auch mit?','Subjekt',2,'Wer kommt mit? – deine Schwester: Subjekt.','sg2'],
['<b>Es</b> schneit seit gestern.','Subjekt',3,'Was schneit? – Es: Subjekt (Ersatz ist nicht möglich, aber der Satz braucht es).','sg2'],
['Die Kinder <b>spielen</b> draussen.','Prädikat',1,'Was tun die Kinder? – spielen: Prädikat.','sg2'],
['Tim <b>isst</b> einen Apfel.','Prädikat',1,'Was tut Tim? – isst: Prädikat.','sg2'],
['Anna <b>hat</b> ein Lied <b>gesungen</b>.','Prädikat',2,'Prädikat: hat … gesungen (zwei Teile).','sg2'],
['Wir <b>müssen</b> heute früh <b>aufstehen</b>.','Prädikat',2,'Prädikat: müssen … aufstehen (Modalverb + Infinitiv).','sg2'],
['Der Zug <b>fährt</b> in fünf Minuten <b>ab</b>.','Prädikat',2,'Prädikat: fährt … ab (trennbares Verb).','sg2'],
['Er <b>wird</b> bald <b>kommen</b>.','Prädikat',2,'Prädikat: wird … kommen (Futur).','sg2'],
['Gestern <b>war</b> es sehr kalt.','Prädikat',2,'Prädikat: war.','sg2'],
['<b>Hast</b> du die Hausaufgaben <b>gemacht</b>?','Prädikat',3,'Prädikat: Hast … gemacht. Im Fragesatz steht die Personalform an erster Stelle.','sg2'],
['Wir gedenken <b>der Verstorbenen</b>.','Genitivobjekt',3,'Wessen gedenken wir? – der Verstorbenen: Genitivobjekt.','sg3'],
['Sie erinnert sich <b>ihrer Kindheit</b>.','Genitivobjekt',3,'Wessen erinnert sie sich? – ihrer Kindheit: Genitivobjekt.','sg3'],
['Er schämt sich <b>seiner Fehler</b>.','Genitivobjekt',3,'Wessen schämt er sich? – seiner Fehler: Genitivobjekt.','sg3'],
['Man beschuldigte ihn <b>des Betrugs</b>.','Genitivobjekt',3,'Wessen beschuldigte man ihn? – des Betrugs: Genitivobjekt.','sg3'],
['<b>Heute</b> schreiben wir einen Test.','Adverbiale',1,'Wann? – Heute: Adverbiale (Zeit).','sg4'],
['Die Kinder spielen <b>draussen</b>.','Adverbiale',1,'Wo? – draussen: Adverbiale (Ort).','sg4'],
['<b>Leider</b> regnet es.','Adverbiale',1,'Leider: Adverbiale, keine Präposition.','sg4'],
['Anna singt <b>laut</b>.','Adverbiale',1,'Wie singt sie? – laut: Adverbiale (Art und Weise).','sg4'],
['Wir treffen uns <b>nächste Woche</b>.','Adverbiale',2,'Wann? – nächste Woche: Adverbiale (Zeit, keine Präposition).','sg4'],
['Er trainiert <b>jeden Morgen</b>.','Adverbiale',2,'Wann? Wie oft? – jeden Morgen: Adverbiale.','sg4'],
['<b>Deshalb</b> bleiben wir zu Hause.','Adverbiale',2,'Warum? – Deshalb: Adverbiale (Grund).','sg4'],
['Sie wartet <b>dort</b> auf den Bus.','Adverbiale',2,'Wo? – dort: Adverbiale (Ort).','sg4'],
['Anna ist <b>Lehrerin</b>.','Gleichsetzungsnominativ',3,'Wer ist Anna? – Lehrerin: Gleichsetzungsnominativ (Nominativ nach «ist»).','sg2',['Subjekt','Prädikat','Akkusativobjekt','Gleichsetzungsnominativ']],
['Er wird <b>Pilot</b>.','Gleichsetzungsnominativ',3,'Was wird er? – Pilot: Gleichsetzungsnominativ (Nominativ nach «wird»).','sg2',['Subjekt','Prädikat','Akkusativobjekt','Gleichsetzungsnominativ']],
['Meine Schwester bleibt <b>meine beste Freundin</b>.','Gleichsetzungsnominativ',3,'Was bleibt sie? – meine beste Freundin: Gleichsetzungsnominativ.','sg2',['Subjekt','Prädikat','Akkusativobjekt','Gleichsetzungsnominativ']],
['Herr Meier ist <b>unser Nachbar</b>.','Gleichsetzungsnominativ',3,'Wer ist Herr Meier? – unser Nachbar: Gleichsetzungsnominativ.','sg2',['Subjekt','Prädikat','Akkusativobjekt','Gleichsetzungsnominativ']]
];
QN.forEach(q=>task.push({typ:'glied',stufe:q[2],lv:q[1]==='Gleichsetzungsnominativ'?3:(q[2]===3?2:1),cats:[q[4]],sent:q[0],opts:q[5]||(q[2]===3?G:G6),answer:q[1],why:'<b>'+q[1]+'.</b> '+q[3]}));

/* Fragen zum Attribut */
const AT=[
['Wie viele Satzglieder hat «Der freche Hund bellt laut.»?',['3','2','4','5'],'3','Der freche Hund · bellt · laut: drei Satzglieder. «freche» ist nur ein Attribut.',1],
['Wie viele Satzglieder hat «Mein grosser Bruder spielt Gitarre.»?',['3','2','4','5'],'3','Mein grosser Bruder · spielt · Gitarre: drei Satzglieder.',2],
['Was ist der Kern des Satzglieds «das alte Haus am See»?',['Haus','alte','See','das'],'Haus','Der Kern ist das Nomen, zu dem die Attribute gehören.',1],
['Was ist der Kern des Satzglieds «die laute Musik»?',['Musik','laute','die','Musik laute'],'Musik','Kern = Nomen. «die» und «laute» sind Attribute.',1],
['Welche Wortgruppe ist in «das Haus des Nachbarn» ein Attribut (Wessen Haus?)?',['des Nachbarn','Haus','das Haus des','Nachbarn des'],'des Nachbarn','«des Nachbarn» gehört zum Nomen «Haus»: Genitivattribut.',2],
['Warum ist «frech» in «der freche Hund» kein eigenes Satzglied?',['Es gehört zum Nomen «Hund» und bleibt beim Verschieben dabei.','Es ist ein Verb.','Es steht am Satzanfang.','Es hat keine Endung.'],'Es gehört zum Nomen «Hund» und bleibt beim Verschieben dabei.','Attribute sind keine eigenen Satzglieder.',2]
];
AT.forEach(a=>task.push({typ:'frage',stufe:a[4],lv:1,cats:['sg5'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

/* Fragen */
const F=[
['Mit welcher Frage findest du das <b>Subjekt</b>?',['Wer oder was?','Wen oder was?','Wem?','Wann?'],'Wer oder was?','Wer oder was tut etwas?','sg2',1],
['Mit welcher Frage findest du das <b>Akkusativobjekt</b>?',['Wen oder was?','Wer oder was?','Wem?','Wo?'],'Wen oder was?','Akkusativobjekt: Wen oder was?','sg3',1],
['Mit welcher Frage findest du das <b>Dativobjekt</b>?',['Wem?','Wen oder was?','Wer oder was?','Warum?'],'Wem?','Dativobjekt: Wem?','sg3',1],
['Mit welcher Frage findest du das <b>Prädikat</b>?',['Was geschieht? / Was tut …?','Wer oder was?','Wem?','Wo?'],'Was geschieht? / Was tut …?','Prädikat: Was tut jemand?','sg2',1],
['Mit welcher Frage findest du ein Adverbiale des <b>Ortes</b>?',['Wo? Wohin? Woher?','Wann?','Wie?','Warum?'],'Wo? Wohin? Woher?','Ort: Wo? Wohin? Woher?','sg4',1],
['Mit welcher Frage findest du eine adverbiale Bestimmung der <b>Zeit</b>?',['Wann? Wie lange?','Wo?','Wie?','Warum?'],'Wann? Wie lange?','Zeit: Wann? Wie lange? Wie oft?','sg4',1],
['Mit welcher Frage findest du eine adverbiale Bestimmung der <b>Art und Weise</b>?',['Wie? Womit?','Wo?','Wann?','Warum?'],'Wie? Womit?','Art und Weise: Wie? Womit?','sg4',2],
['Mit welcher Frage findest du ein Adverbiale des <b>Grundes</b>?',['Warum? Weshalb?','Wo?','Wann?','Wie?'],'Warum? Weshalb?','Grund: Warum? Weshalb? Weswegen?','sg4',2]
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


/* ---- NEU: weitere Satzglieder bestimmen (PG, Adverbiale, Genitivobjekt, AO/DO) ---- */
const Q2=[
['<b>Auf dem Pausenplatz</b> spielen die Kinder Fussball.',4,1,'Wo? – auf dem Pausenplatz: Präpositionalgefüge (beginnt mit «auf»).'],
['Wir treffen uns <b>am Freitag</b>.',4,1,'Wann? – am Freitag: Präpositionalgefüge («am» = «an dem»).'],
['Er lernt <b>für die Prüfung</b>.',4,1,'Wofür? – für die Prüfung: Präpositionalgefüge (beginnt mit «für»).'],
['Die Klasse wartet <b>auf den Bus</b>.',4,2,'Worauf wartet sie? – auf den Bus: Präpositionalgefüge. Das Verb «warten» verlangt «auf».'],
['Lena freut sich <b>auf die Ferien</b>.',4,2,'Worauf freut sie sich? – auf die Ferien: Präpositionalgefüge. Das Verb verlangt «auf».'],
['Die Schüler diskutieren <b>über das Handyverbot</b>.',4,3,'Worüber? – über das Handyverbot: Präpositionalgefüge.'],
['Der Lehrer verteilt <b>die Blätter</b>.',2,1,'Wen oder was verteilt er? – die Blätter: Akkusativobjekt.'],
['Mein Handy gehört <b>meiner Schwester</b>.',3,1,'Wem gehört es? – meiner Schwester: Dativobjekt.'],
['Die Schülerin zeigt <b>dem Lehrer</b> ihre Hausaufgaben.',3,1,'Wem zeigt sie sie? – dem Lehrer: Dativobjekt.'],
['Die Schülerin zeigt dem Lehrer <b>ihre Hausaufgaben</b>.',2,2,'Was zeigt sie? – ihre Hausaufgaben: Akkusativobjekt.'],
['Der Trainer lobt <b>die ganze Mannschaft</b>.',2,1,'Wen lobt er? – die ganze Mannschaft: Akkusativobjekt.'],
['Die Aufgabe gefällt <b>allen Schülern</b>.',3,2,'Wem gefällt sie? – allen Schülern: Dativobjekt.'],
['<b>Leider</b> hat der Bus heute Verspätung.',5,2,'«Leider» ist ein einzelnes Wort ohne Präposition: Adverbiale.'],
['Die Kinder warten <b>draussen</b>.',5,1,'Wo? – draussen: Adverbiale (einzelnes Wort).'],
['<b>Dann</b> ruft die Lehrerin die Eltern an.',5,2,'Wann? – dann: Adverbiale (einzelnes Wort ohne Präposition).'],
['<b>Die neue Mathelehrerin</b> verteilt die Blätter.',0,1,'Wer verteilt? – die neue Mathelehrerin: Subjekt.'],
['Nach der Pause <b>schreibt</b> die Klasse einen Test.',1,1,'Das Verb in der Personalform ist das Prädikat.'],
['Nach der Pause schreibt <b>die Klasse</b> einen Test.',0,2,'Wer schreibt? – die Klasse: Subjekt (steht nicht am Anfang).'],
['Nach der Pause schreibt die Klasse <b>einen Test</b>.',2,1,'Was schreibt sie? – einen Test: Akkusativobjekt.'],
['Der Bus <b>fährt</b> heute früher <b>ab</b>.',1,2,'«fährt … ab»: Alle verbalen Teile gehören zum Prädikat.'],
['Wir <b>haben</b> den Film <b>gesehen</b>.',1,2,'«haben … gesehen»: Das Prädikat besteht aus zwei Teilen.'],
['Wir gedenken <b>der Opfer</b>.',6,3,'Wessen gedenken wir? – der Opfer: Genitivobjekt.'],
['Der Richter bezichtigt <b>den Mann</b> des Diebstahls.',2,3,'Wen bezichtigt er? – den Mann: Akkusativobjekt.'],
['Der Richter bezichtigt den Mann <b>des Diebstahls</b>.',6,3,'Wessen bezichtigt er ihn? – des Diebstahls: Genitivobjekt.']
];
Q2.forEach(q=>task.push({typ:'glied',stufe:q[2],lv:q[2]===3?2:1,cats:[q[1]===0||q[1]===1?'sg2':(q[1]===4||q[1]===5)?'sg4':'sg3'],sent:q[0],opts:q[2]===3?G:G6,answer:G[q[1]],why:'<b>'+G[q[1]]+'.</b> '+q[3]}));

/* ---- NEU: Wissensfragen ---- */
const F2=[
['Mit welcher Frage findest du das <b>Genitivobjekt</b>?',['Wessen?','Wem?','Wen oder was?','Wer oder was?'],'Wessen?','Genitivobjekt: Wessen? (kommt selten vor).','sg3',2],
['Woran erkennst du ein <b>Präpositionalgefüge</b>?',['Es beginnt mit einer Präposition.','Es steht immer am Satzanfang.','Es besteht aus einem einzigen Wort.','Es steht im Nominativ.'],'Es beginnt mit einer Präposition.','Präposition (z. B. in, auf, mit, für) plus die Wörter, die dazugehören: auf dem Pausenplatz.','sg4',1],
['Welches ist ein <b>Präpositionalgefüge</b>?',['mit dem Fahrrad','das Fahrrad','gestern','fahren'],'mit dem Fahrrad','Es beginnt mit der Präposition «mit».','sg4',1],
['Welches ist ein <b>Präpositionalgefüge</b>?',['in der Pause','die Pause','heute','spielen'],'in der Pause','Es beginnt mit der Präposition «in».','sg4',1],
['Welches Wort ist eine <b>Präposition</b>?',['auf','Haus','laufen','schön'],'auf','Präpositionen: in, auf, mit, für, nach, von, zu, bei, aus …','sg4',1],
['Was leistet ein Präpositionalgefüge im Satz?',['Es wird vom Verb verlangt oder sagt etwas über Ort, Zeit oder Art.','Es ersetzt das Subjekt.','Es ist immer das Prädikat.','Es steht immer im Nominativ.'],'Es wird vom Verb verlangt oder sagt etwas über Ort, Zeit oder Art.','Beispiele: sich freuen auf die Ferien (vom Verb verlangt), in der Pause (Zeit).','sg4',2],
['Das <b>Subjekt</b> steht immer im …',['Nominativ','Genitiv','Dativ','Akkusativ'],'Nominativ','Subjekt: Wer oder was? Nominativ.','sg2',1],
['Ein <b>Objekt</b> steht nie im …',['Nominativ','Genitiv','Dativ','Akkusativ'],'Nominativ','Objekte stehen im Akkusativ, Dativ oder Genitiv.','sg3',1],
['Das Subjekt steht immer an erster Stelle im Satz.',['Falsch','Richtig','Nur im Fragesatz','Nur bei Verben'],'Falsch','Es kann auch später stehen: «Heute schreibt <b>die Klasse</b> einen Test.»','sg2',1],
['An welcher Stelle steht das Prädikat (die Personalform) im Aussagesatz?',['an zweiter Stelle','an erster Stelle','am Schluss','an dritter Stelle'],'an zweiter Stelle','Die Personalform bleibt im Hauptsatz immer an zweiter Stelle.','sg1',1],
['Was bedeutet das Kürzel <b>AO</b>?',['Akkusativobjekt','Adverbiale Ortsangabe','Attribut-Objekt','Aussageobjekt'],'Akkusativobjekt','AO = Akkusativobjekt (Wen oder was?).','sg3',1],
['Was bedeutet das Kürzel <b>DO</b>?',['Dativobjekt','Direktes Objekt','Doppelobjekt','Dativ-Ort'],'Dativobjekt','DO = Dativobjekt (Wem?).','sg3',1],
['Was kann ein Satz mindestens enthalten?',['Subjekt und Prädikat','nur ein Objekt','nur ein Attribut','nur ein Präpositionalgefüge'],'Subjekt und Prädikat','Jeder einfache Satz hat mindestens ein Subjekt und ein Prädikat.','sg2',1],
['Aus wie vielen Satzgliedern besteht das Prädikat «hat … gesehen»?',['eines','zwei','keines','drei'],'eines','Alle verbalen Teile zusammen sind <b>ein</b> Satzglied: das Prädikat.','sg2',2],
['Beim Verschieben bleibt das <b>Attribut</b> …',['beim Nomen, zu dem es gehört','allein stehen','am Satzanfang','beim Verb'],'beim Nomen, zu dem es gehört','Das Attribut ist kein eigenes Satzglied. Es ist ein Teil eines Satzglieds.','sg5',2],
['Mit welcher Frage findest du das <b>Attribut</b>?',['Was für ein …?','Wer oder was?','Wem?','Wo?'],'Was für ein …?','«Was für ein Hund?» – der <b>freche</b> Hund.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Der freche Hund bellt.»',['Der und freche','Hund und bellt','nur freche','nur Hund'],'Der und freche','Beide sind dem Nomen «Hund» beigefügt: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Wir lesen ein spannendes Buch.»',['ein und spannendes','lesen und Buch','nur spannendes','Wir und ein'],'ein und spannendes','Beide gehören zum Nomen «Buch»: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Die jungen Schülerinnen lachen.»',['Die und jungen','Schülerinnen und lachen','nur jungen','Die und lachen'],'Die und jungen','Zum Kern «Schülerinnen» gehören Artikel und Adjektiv.','sg5',2],
['Ein Satzglied besteht aus einem Kern und …',['Attributen (Beifügungen)','nur Verben','Satzzeichen','einem Nebensatz'],'Attributen (Beifügungen)','Kern: oft ein Nomen. Dazu kommen Attribute.','sg5',2],
['Welcher Satz ist die richtige Umstellung? «Ich habe gestern einen Film gesehen.»',['Gestern habe ich einen Film gesehen.','Gestern ich habe einen Film gesehen.','Habe ich gestern einen Film gesehen.','Einen Film gestern habe ich gesehen.'],'Gestern habe ich einen Film gesehen.','Die Personalform «habe» bleibt an zweiter Stelle.','sg1',2],
['Wie viele Satzglieder hat «Die neue Lehrerin erklärt den Schülern die Aufgabe.»?',['4','3','5','6'],'4','Die neue Lehrerin · erklärt · den Schülern · die Aufgabe.','sg1',2],
['Wie viele Satzglieder hat «Nach der Pause schreibt die Klasse einen Test.»?',['4','3','5','6'],'4','Nach der Pause · schreibt · die Klasse · einen Test.','sg1',2],
['Wie viele Satzglieder hat «Leider hat der Bus heute Verspätung.»?',['5','4','3','6'],'5','Leider · hat · der Bus · heute · Verspätung.','sg1',2],
['Wie viele Satzglieder hat «Ich habe mein Handy zu Hause vergessen.»?',['4','5','3','6'],'4','Ich · habe … vergessen · mein Handy · zu Hause.','sg1',2]
];
F2.forEach(f=>task.push({typ:'frage',stufe:f[5],lv:f[5]===3?2:1,cats:[f[4]],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));

/* ---- NEU: Satzglieder trennen (zwischen zwei Wörtern antippen) ---- */
const TR=[
['Anna | liest | ein Buch .',1,''],
['Der Hund | bellt | laut .',1,''],
['Gestern | spielte | der kleine Junge | Fussball .',1,''],
['Die Klasse | wartet | auf den Bus .',1,''],
['Meine Schwester | schenkt | mir | heute | ein Buch .',2,''],
['Nach der Pause | schreibt | die Klasse | einen Test .',2,''],
['Wir | treffen | uns | am Freitag | im Schwimmbad .',2,''],
['Der Lehrer | erklärt | den Schülern | die Aufgabe .',2,''],
['Leider | hat | der Bus | heute | Verspätung .',2,''],
['Mein Bruder | hat | gestern | sein Handy | verloren .',2,' «hat» und «verloren» gehören beide zum Prädikat.'],
['Die neue Schülerin | zeigt | dem Lehrer | ihre Hausaufgaben .',3,''],
['Der Bus | fährt | heute | wegen des Schnees | früher | ab .',3,' «fährt» und «ab» gehören beide zum Prädikat.'],
['Am Montag | hat | unsere Klasse | im Turnen | einen Wettkampf | gewonnen .',3,' «hat» und «gewonnen» gehören beide zum Prädikat.']
];
TR.forEach(t=>{
  const words=[],cuts=[];
  t[0].split(' ').forEach(w=>{if(w==='|'){cuts.push(words.length-1);}else if(w!=='.'){words.push(w);}});
  task.push({typ:'trenn',stufe:t[1],lv:t[1]===3?2:1,cats:['sg1'],tokens:words,cuts,instr:'Tippe zwischen zwei Wörter, wo eine Satzgliedgrenze liegt.',why:'Die Satzglieder: '+t[0].replace(' .','.')+t[2]});
});

/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Gestern».", "Tim spielt gestern Fussball.", "Gestern spielt Tim Fussball.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Gestern spielt Tim Fussball.»"], ["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Im Garten».", "Lena liest ein Buch im Garten.", "Im Garten liest Lena ein Buch.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Im Garten liest Lena ein Buch.»"], ["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Heute».", "Ich esse heute Pizza.", "Heute esse ich Pizza.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Heute esse ich Pizza.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Im Sommer».", "Wir fahren im Sommer nach Italien.", "Im Sommer fahren wir nach Italien.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Im Sommer fahren wir nach Italien.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Am Montag».", "Die Schüler schreiben am Montag einen Test.", "Am Montag schreiben die Schüler einen Test.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Am Montag schreiben die Schüler einen Test.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Seit einer Stunde».", "Sie wartet seit einer Stunde auf den Bus.", "Seit einer Stunde wartet sie auf den Bus.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Seit einer Stunde wartet sie auf den Bus.»"], ["umstellen", 3, "sg1", "Stelle den Satz um. Beginne mit «Gestern».", "Er hat gestern seinen Freund besucht.", "Gestern hat er seinen Freund besucht.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Gestern hat er seinen Freund besucht.»"], ["umstellen", 3, "sg1", "Stelle den Satz um. Beginne mit «Nach der Schule».", "Wir gehen nach der Schule ins Kino.", "Nach der Schule gehen wir ins Kino.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Nach der Schule gehen wir ins Kino.»"]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---- NEU: Markieren (Präpositionalgefüge, Attribut), Umstellen, Fachbegriffe ---- */
const M2=[
['Die Kinder spielen *auf *dem *Pausenplatz Fussball.',1,'Das Präpositionalgefüge beginnt mit «auf»: auf dem Pausenplatz.','pg'],
['Er schreibt *am *Montag einen Test.',1,'Das Präpositionalgefüge beginnt mit «an»: am Montag.','pg'],
['Wir lernen *für *die *Prüfung.',1,'Das Präpositionalgefüge beginnt mit «für»: für die Prüfung.','pg'],
['Die Schüler warten *auf *den *Bus.',2,'Das Präpositionalgefüge beginnt mit «auf»: auf den Bus.','pg'],
['Sie freut sich *auf *die *Ferien.',2,'Das Präpositionalgefüge beginnt mit «auf»: auf die Ferien.','pg'],
['*Nach *der *Pause schreibt die Klasse einen Test.',2,'Das Präpositionalgefüge beginnt mit «nach»: nach der Pause.','pg'],
['Der Bus fährt *wegen *des *Schnees später.',3,'Das Präpositionalgefüge beginnt mit «wegen»: wegen des Schnees.','pg'],
['*Der *freche Hund bellt.',1,'Der Artikel und das Adjektiv sind dem Nomen «Hund» beigefügt.','att'],
['Wir lesen ein *spannendes Buch.'.replace('ein *spannendes','*ein *spannendes'),1,'«ein» und «spannendes» gehören zum Nomen «Buch».','att'],
['*Die *neue Lehrerin ist freundlich.',2,'Artikel und Adjektiv gehören zum Nomen «Lehrerin».','att'],
['*Mein *grosser Bruder spielt Gitarre.',2,'Mein und grosser gehören zum Nomen «Bruder».','att'],
['Das Haus *am *See ist gross.',3,'«am See» ist ein Attribut zu «Haus» (Präpositionalgefüge als Attribut). Es gehört zu «Haus».','att3']
];
M2.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:[m[3]==='pg'?'sg4':'sg5'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:m[3]==='pg'?'Tippe alle Wörter des Präpositionalgefüges an.':'Tippe alle Attribute an (Was für ein …?). Auch der Artikel ist ein Attribut.',why:m[2]});
});

const INP2=[
["umstellen",1,"sg1","Stelle den Satz um. Beginne mit «Nach der Pause».","Die Klasse schreibt nach der Pause einen Test.","Nach der Pause schreibt die Klasse einen Test.",[],false,"Das Prädikat bleibt an zweiter Stelle: «Nach der Pause» ist ein Satzglied."],
["umstellen",1,"sg1","Stelle den Satz um. Beginne mit «Heute».","Wir schreiben einen Test heute.","Heute schreiben wir einen Test.",[],false,"Das Prädikat bleibt an zweiter Stelle."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Dem Lehrer».","Die Schülerin zeigt dem Lehrer ihre Hausaufgaben.","Dem Lehrer zeigt die Schülerin ihre Hausaufgaben.",[],false,"«Dem Lehrer» ist ein Satzglied. Das Prädikat bleibt an zweiter Stelle."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Auf den Bus».","Die Klasse wartet auf den Bus.","Auf den Bus wartet die Klasse.",[],false,"«Auf den Bus» bleibt zusammen: ein Präpositionalgefüge."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Gestern».","Ich habe gestern mein Handy verloren.","Gestern habe ich mein Handy verloren.",[],false,"Die Personalform «habe» bleibt an zweiter Stelle. «verloren» bleibt am Schluss."],
["fach",1,"sg6","Wie heisst das Verfahren zur Ermittlung der Satzglieder?","Das Verfahren heisst …","Verschiebeprobe",["Umstellprobe"],true,"Mit der Verschiebeprobe findest du die Satzglieder."],
["fach",1,"sg6","Das Subjekt steht immer im … (Fall).","Das Subjekt steht immer im …","Nominativ",[],true,"Subjekt: Wer oder was? Nominativ."],
["fach",1,"sg6","Ein Objekt steht nie im … (Fall).","Ein Objekt steht nie im …","Nominativ",[],true,"Objekte stehen im Akkusativ, Dativ oder Genitiv."],
["fach",1,"sg6","Satzglied, das mit einer Präposition beginnt (am Freitag, auf dem Pausenplatz).","Das Satzglied heisst …","Präpositionalgefüge",[],true,"Präposition und die Wörter, die dazugehören."],
["fach",1,"sg6","Wie heisst das Satzglied, das nach «Wen oder was?» fragt?","Das Satzglied heisst …","Akkusativobjekt",[],true,"Wen oder was? Akkusativobjekt, kurz AO."],
["fach",1,"sg6","Wie heisst das Satzglied, das nach «Wem?» fragt?","Das Satzglied heisst …","Dativobjekt",[],true,"Wem? Dativobjekt, kurz DO."],
["fach",2,"sg6","Wie heisst das Satzglied, das nach «Wessen?» fragt?","Das Satzglied heisst …","Genitivobjekt",[],true,"Wessen? Genitivobjekt (selten)."],
["fach",2,"sg6","Eine Beifügung zu einem Nomen (Was für ein …?) heisst …","Die Beifügung heisst …","Attribut",["Das Attribut"],true,"«Attribut» kommt vom lateinischen «attribuere» = beifügen."],
["fach",2,"sg6","Alle Teile des Verbs im Satz zusammen heissen …","Die verbalen Teile bilden das …","Prädikat",["Das Prädikat"],true,"Alle Teile, die zum Verb gehören: das Prädikat."],
["fach",2,"sg6","Wie heisst das Satzglied, das fragt «Wer oder was?»","Das Satzglied heisst …","Subjekt",["Das Subjekt"],true,"Wer oder was tut etwas? Das Subjekt."],
["fach",2,"sg6","An welcher Stelle steht die Personalform im Aussagesatz? (Schreibe: zweiter)","Die Personalform steht an … Stelle.","zweiter",["zweiten","2."],true,"Im Hauptsatz steht die Personalform an zweiter Stelle."]
];
INP2.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));


/* Aufgaben zur Verschiebeprobe selbst stehen im Kapitel «Die Verschiebeprobe» */
for(let i=task.length-1;i>=0;i--){const t=task[i];
  if(t.typ==='trenn'||t.typ==='probe'||t.typ==='umstellen'||(t.typ==='frage'&&t.cats[0]==='sg1')||(t.typ==='fach'&&t.answer==='Verschiebeprobe'))task.splice(i,1);
}
/* Neu: Satzglieder im Satz antippen */
const M3=[
['Die Katze *schläft auf dem Sofa.',1,'p','Prädikat: schläft.'],
['Lena *schreibt einen Brief.',1,'p','Prädikat: schreibt.'],
['Wir *haben gestern *gelacht.',2,'p','Das Prädikat besteht aus zwei Teilen: haben … gelacht.'],
['Der Bus *fährt heute früher *ab.',2,'p','Das Prädikat besteht aus zwei Teilen: fährt … ab.'],
['Sie *will morgen früh *aufstehen.',3,'p','Das Prädikat besteht aus zwei Teilen: will … aufstehen.'],
['Tim isst *einen *Apfel.',1,'ao','Wen oder was isst Tim? – einen Apfel: Akkusativobjekt.'],
['Der Trainer lobt *die *ganze *Mannschaft.',1,'ao','Wen lobt der Trainer? – die ganze Mannschaft: Akkusativobjekt.'],
['Ich sehe *den *Hund.',1,'ao','Wen sehe ich? – den Hund: Akkusativobjekt.'],
['Sie zeigt dem Lehrer *ihre *Hausaufgaben.',2,'ao','Was zeigt sie? – ihre Hausaufgaben: Akkusativobjekt.'],
['Er hilft *dem *Freund.',1,'do','Wem hilft er? – dem Freund: Dativobjekt.'],
['Mein Handy gehört *meiner *Schwester.',1,'do','Wem gehört das Handy? – meiner Schwester: Dativobjekt.'],
['Die Aufgabe gefällt *allen *Schülern.',2,'do','Wem gefällt die Aufgabe? – allen Schülern: Dativobjekt.'],
['Sie schenkt *ihrem *Bruder ein Buch.',2,'do','Wem schenkt sie etwas? – ihrem Bruder: Dativobjekt.'],
['Er kommt *heute.',1,'adv','Wann? – heute: Adverbiale.'],
['Die Kinder warten *draussen.',1,'adv','Wo? – draussen: Adverbiale.'],
['*Gestern spielte der Junge Fussball.',2,'adv','Wann? – gestern: Adverbiale.'],
['Wir treffen uns *morgen *Abend im Schwimmbad.',3,'adv','Wann? – morgen Abend: Adverbiale (ohne Präposition).']
];
const MI={p:['sg2','Tippe alle Wörter des Prädikats an (alle Teile des Verbs).'],ao:['sg3','Tippe alle Wörter des Akkusativobjekts an (Wen oder was?).'],do:['sg3','Tippe alle Wörter des Dativobjekts an (Wem?).'],adv:['sg4','Tippe das Adverbiale an (Wörter ohne Präposition: Wann? Wo?).']};
M3.forEach(m=>{const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:[MI[m[2]][0]],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:MI[m[2]][1],why:m[3]});});
const SGI=[
['nom','👤','Subjekt','Wer oder was?','Sagt, wer oder was etwas tut oder ist. Steht im Nominativ.'],
['verb','⚙️','Prädikat','Was geschieht?','Alle Teile des Verbs. Die Personalform steht an zweiter Stelle.'],
['akk','🎯','Akkusativobjekt (AO)','Wen oder was?','Wer oder was von der Handlung betroffen ist.'],
['dat','🤝','Dativobjekt (DO)','Wem?','Wem etwas gegeben, gezeigt oder geholfen wird.'],
['gen','🏛️','Genitivobjekt','Wessen?','Selten und gehoben: Wir gedenken der Opfer.'],
['art','🧭','Präpositionalgefüge','Präposition + Wörter','Beginnt mit in, auf, mit, nach, für … und sagt Ort, Zeit, Art oder Grund.'],
['adv','🧩','Adverbiale','Wann? Wo? Wie? Warum?','Wort oder Wortgruppe ohne Präposition: gestern, dort, leider.'],
['att','🏷️','Attribut (kein Satzglied)','Was für ein …?','Beifügung zu einem Nomen: der freche Hund.']];
const SL=(k,emo,name,frage,lead,steps,head,rows,callouts)=>
 '<div class="f-'+k+'" style="--sc:var(--c);--sb:var(--b);--st:var(--t)">'+
 '<div style="display:flex;gap:.9rem;align-items:center;padding:.8rem 1rem;border-radius:12px;background:var(--b);border:2px solid var(--c);color:var(--t)"><span style="font-size:2.4rem">'+emo+'</span><div><span class="tag f-'+k+'" style="font-size:1rem">'+name+'</span><div style="font-size:1.3rem;font-weight:800;margin-top:.15rem">'+frage+'</div></div></div>'+
 '<p class="lead" style="margin:.8rem 0">'+lead+'</p>'+
 '<div class="grid2"><div class="card" style="border-top:5px solid var(--c)"><h3 style="margin:0 0 .3rem">🔍 So findest du es</h3><ol class="steps" style="margin:0">'+steps.map(x=>'<li>'+x+'</li>').join('')+'</ol></div>'+
 '<div class="card" style="border-top:5px solid var(--c)"><h3 style="margin:0 0 .3rem">✏️ Beispiele</h3>'+rows.map(r=>'<p style="margin:.25rem 0">'+r+'</p>').join('')+'</div></div>'+
 (head?'<div style="margin-top:.8rem">'+head+'</div>':'')+
 callouts.map(c=>'<div class="callout" style="margin-top:.7rem;background:var(--b);border-color:var(--c);color:var(--t)">'+c+'</div>').join('')+'</div>';
const MKS=(k,t)=>mk(k,t);

/* ===== Satzgenerator für «Satzglied antippen» (Folien und Schüler): unbegrenzt viele Sätze aus Bausteinen ===== */
const GL_INSTR={'Subjekt':'Tippe alle Wörter des Subjekts an (Wer oder was?).','Prädikat':'Tippe alle Wörter des Prädikats an (alle Teile des Verbs).','Akkusativobjekt':'Tippe alle Wörter des Akkusativobjekts an (Wen oder was?).','Dativobjekt':'Tippe alle Wörter des Dativobjekts an (Wem?).','Präpositionalgefüge':'Tippe alle Wörter des Präpositionalgefüges an.','Adverbiale':'Tippe das Adverbiale an (Wörter ohne Präposition: Wann? Wo?).','Genitivobjekt':'Tippe alle Wörter des Genitivobjekts an (Wessen?).','Gleichsetzungsnominativ':'Tippe alle Wörter des Gleichsetzungsnominativs an (zweiter Nominativ nach sein, werden, bleiben).','Attribut':'Tippe alle Attribute an (Was für ein …?). Auch der Artikel zählt dazu.'};
const GL_Q={'Subjekt':'Frage: Wer oder was …?','Prädikat':'Das Prädikat besteht aus allen Verbteilen.','Akkusativobjekt':'Frage: Wen oder was …?','Dativobjekt':'Frage: Wem …?','Präpositionalgefüge':'Es beginnt mit einer Präposition.','Adverbiale':'Es hat keine Präposition und sagt wann, wo oder wie.','Genitivobjekt':'Frage: Wessen …? Es hängt am Verb.','Gleichsetzungsnominativ':'Nominativ nach sein, werden, bleiben. Es setzt das Subjekt gleich.','Attribut':'Frage: Was für ein …? Alle Wörter ausser dem Kern (Nomen) sind Attribute, auch der Artikel.'};
const GL_CAT={'Subjekt':'sg2','Prädikat':'sg2','Akkusativobjekt':'sg3','Dativobjekt':'sg3','Präpositionalgefüge':'sg4','Adverbiale':'sg4','Genitivobjekt':'sg3','Gleichsetzungsnominativ':'sg2','Attribut':'sg5'};
/* Alte Aufgaben «markieren»: Satzglied aus der Anweisung ableiten */
task.filter(t=>t.typ==='markieren'&&!t.gl).forEach(t=>{const i=t.instr||'';t.gl=/Subjekts/.test(i)?'Subjekt':/Prädikats/.test(i)?'Prädikat':/Akkusativobjekts/.test(i)?'Akkusativobjekt':/Dativobjekts/.test(i)?'Dativobjekt':/Präpositionalgefüges/.test(i)?'Präpositionalgefüge':/Adverbiale/.test(i)?'Adverbiale':/Attribut/.test(i)?'Attribut':'';});
const GP=(sg,pl)=>({sg:sg,pl:pl});
const LVG={'Genitivobjekt':2,'Gleichsetzungsnominativ':3};
/* Nominalgruppen: «^» trennt Kern und nachgestelltes Attribut: «das Haus ^des Nachbarn». Kern = letztes Wort vor «^». */
const npParse=s=>{const a=s.split(' ^'),pre=a[0].split(' '),post=a[1]?a[1].split(' '):[];const w=pre.concat(post),k=pre.length-1;return{w:w,at:w.map((_,i)=>i).filter(i=>i!==k)};};
const SUBP=[['Der Lehrer',0],['Meine Schwester',0],['Die Kinder',1],['Anna',0,1],['Mein Bruder',0],['Die Schülerin',0],['Der Nachbar',0],['Die Frau',0],['Unsere Eltern',1],['Die Mädchen',1],['Tim',0,1],['Die Schüler',1],['Der kleine Junge',0],['Die Trainerin',0],['Der freundliche Nachbar',0],['Die neue Lehrerin',0],['Die lauten Kinder',1],['Der Bruder ^der Lehrerin',0],['Die Freundin ^meines Bruders',0],['Die Eltern ^des Jungen',1],['Die Schwester ^des Nachbarn',0]];
const SUBA=[['Der Hund',0],['Die Katze',0],['Die Hunde',1],['Das Pferd',0],['Die Vögel',1],['Der kleine Hund',0],['Die freche Katze',0],['Das schwarze Pferd',0]];
const SUBD=[['Der Hund',0],['Die Hunde',1],['Der grosse Hund',0]];
const SUBT=[['Das Fahrrad',0],['Das Buch',0],['Die Jacke',0],['Der Ball',0],['Die Tasche',0],['Das alte Fahrrad',0],['Die rote Jacke',0],['Das Fahrrad ^des Nachbarn',0],['Das Buch ^der Lehrerin',0]];
/* Verben: [3.Sg, 3.Pl, Partizip, Hilfsverb(0=hat,1=ist), Subjektgruppe, AO-Liste, DO-Liste, nur Präsens, GO-Liste] */
const VB=[
['schläft','schlafen','geschlafen',0,'pa',null,null],['lacht','lachen','gelacht',0,'p',null,null],['arbeitet','arbeiten','gearbeitet',0,'p',null,null],
['singt','singen','gesungen',0,'p',null,null],['spielt','spielen','gespielt',0,'pa',null,null],['wartet','warten','gewartet',0,'p',null,null],
['bellt','bellen','gebellt',0,'d',null,null],['läuft','laufen','gelaufen',1,'pa',null,null],['kommt','kommen','gekommen',1,'p',null,null],
['liest','lesen','gelesen',0,'p',['ein Buch','die Zeitung','eine Geschichte','einen Brief','ein spannendes Buch','das Buch ^der Lehrerin'],null],
['isst','essen','gegessen',0,'p',['einen Apfel','eine Pizza','ein Brot','einen Kuchen','einen roten Apfel'],null],
['kauft','kaufen','gekauft',0,'p',['ein Fahrrad','einen Ball','ein Heft','eine Jacke','ein neues Fahrrad'],null],
['backt','backen','gebacken',0,'p',['einen Kuchen','ein Brot','einen Apfelkuchen','einen leckeren Kuchen'],null],
['malt','malen','gemalt',0,'p',['ein Bild','einen Baum','ein Haus','ein buntes Bild'],null],
['sucht','suchen','gesucht',0,'p',['den Schlüssel','ein Buch','die Brille','den alten Schlüssel','das Fahrrad ^des Nachbarn'],null],
['trägt','tragen','getragen',0,'p',['eine Tasche','einen Rucksack','die Kiste','eine schwere Tasche'],null],
['schreibt','schreiben','geschrieben',0,'p',['einen Brief','eine Geschichte','einen Text','einen langen Brief'],null],
['hört','hören','gehört',0,'p',['ein Lied','die Musik','das Radio','ein neues Lied'],null],
['lobt','loben','gelobt',0,'p',['den Schüler','die Klasse','den Hund','den fleissigen Schüler','den Hund ^des Nachbarn'],null],
['besucht','besuchen','besucht',0,'p',['die Oma','den Onkel','die Freundin','die alte Freundin','die Eltern ^der Freundin'],null],
['hilft','helfen','geholfen',0,'p',null,['dem Kind','der Lehrerin','meinem Freund','der Nachbarin','den Kindern','dem kleinen Kind','dem Bruder ^der Lehrerin']],
['dankt','danken','gedankt',0,'p',null,['der Lehrerin','dem Trainer','meiner Oma','den Eltern','der netten Lehrerin']],
['antwortet','antworten','geantwortet',0,'p',null,['dem Lehrer','der Frau','den Schülern','meinem Bruder','meinem besten Freund']],
['gehört','gehören','gehört',0,'t',null,['dem Kind','meiner Schwester','dem Nachbarn','den Eltern','dem kleinen Kind']],
['schenkt','schenken','geschenkt',0,'p',['ein Buch','einen Ball','eine Blume'],['dem Kind','der Oma','meinem Freund','den Eltern']],
['zeigt','zeigen','gezeigt',0,'p',['das Foto','den Weg','ein Bild'],['dem Kind','der Klasse','meinem Freund','den Gästen']],
['gibt','geben','gegeben',0,'p',['ein Heft','einen Stift','den Ball'],['dem Kind','der Schülerin','meinem Bruder','den Schülern']],
['bringt','bringen','gebracht',0,'p',['einen Tee','die Tasche','den Brief'],['der Oma','dem Lehrer','meiner Mutter','den Gästen']],
['gedenkt','gedenken','gedacht',0,'p',null,null,1,['der Opfer','der Toten','der Verstorbenen']],
['bedarf','bedürfen','bedurft',0,'p',null,null,1,['der Hilfe','der Ruhe','der Unterstützung']],
['beschuldigt','beschuldigen','beschuldigt',0,'p',['den Mann','die Frau','den Nachbarn'],null,0,['des Diebstahls','der Lüge']]
];
const SUBC=[['Anna','f',1],['Tim','m',1],['Mein Bruder','m'],['Meine Schwester','f'],['Der Nachbar','m'],['Die Nachbarin','f'],['Der Lehrer','m'],['Die Trainerin','f'],['Die Kinder','p'],['Unsere Eltern','p']];
const PNB={m:['Lehrer','Pilot','Arzt','Koch','Trainer','mein bester Freund','ein guter Schüler','ein netter Nachbar'],f:['Lehrerin','Pilotin','Ärztin','Köchin','Trainerin','meine beste Freundin','eine gute Schülerin','eine nette Nachbarin'],p:['Schüler','Freunde','gute Freunde','nette Nachbarn','Lehrer']};
const ADVP=['heute','oft','manchmal','leider','dort','hier','jeden Tag','immer','meistens'];
const ADVPAST=['gestern','gestern Abend','letzte Woche','vorhin'];
const ADVFUT=['bald','morgen','nächste Woche','später'];
const PGT=['nach dem Essen','am Abend','am Wochenende','im Sommer','in der Pause'];
const PGM=['im Garten','im Park','vor dem Haus','auf der Wiese'].concat(PGT);
const PGP=['in der Schule','in der Küche','auf dem Sportplatz'];
const rn=a=>a[Math.floor(Math.random()*a.length)];
const lowF=t=>/^(Der|Die|Das|Mein|Meine|Unsere|Unser)\b/.test(t)?t.charAt(0).toLowerCase()+t.slice(1):t;
const txt0=x=>Array.isArray(x)?x[0]:x;
/* Eintrag wählen; mit Attribut-Pinsel bevorzugt Nominalgruppen mit Beifügungen */
const pickNP=(list,attrOk)=>{const l=list.filter(x=>attrOk||txt0(x).indexOf(' ^')<0);if(attrOk&&Math.random()<.55){const r=l.filter(x=>txt0(x).replace(' ^',' ').split(' ').length>=3);if(r.length)return rn(r);}return rn(l);};
const NP=(r,s)=>{const n=npParse(s);return{r:r,w:n.w,at:n.at};};
const finish=(parts,proper,subj)=>{
  const toks=[],roles=[],attr=[];
  parts.forEach((p,pi)=>p.w.forEach((w,wi)=>{let x=w;if(p===subj&&!proper&&pi>0&&wi===0)x=lowF(x);toks.push(x);roles.push(p.r);attr.push(!!(p.at&&p.at.indexOf(wi)>=0));}));
  toks[0]=toks[0].charAt(0).toUpperCase()+toks[0].slice(1);
  toks[toks.length-1]+='.';
  return{toks:toks,roles:roles,attr:attr,present:[...new Set(roles)]};
};
function genCop(ok){
  const s=rn(SUBC),k=s[1],pl=k==='p',c=Math.floor(Math.random()*3);
  const sg=['ist','wird','bleibt'],pg=['sind','werden','bleiben'];
  const perfekt=c>0&&Math.random()<.3;
  const subj={r:'Subjekt',w:[s[0]],at:[]};
  const fin=perfekt?(pl?'sind':'ist'):(pl?pg[c]:sg[c]);
  const fv={r:'Prädikat',w:[fin]},pt=perfekt?{r:'Prädikat',w:[c===1?'geworden':'geblieben']}:null;
  let pn=rn(PNB[k].filter(x=>ok('Attribut')||x.split(' ').length===1||Math.random()<.2));
  const pnp=NP('Gleichsetzungsnominativ',pn);
  let adv=null;
  if(!perfekt&&ok('Adverbiale')&&Math.random()<.4)adv={r:'Adverbiale',w:[rn([['jetzt'],['bald','später'],['immer','weiterhin']][c])]};
  const front=adv&&Math.random()<.5;
  const parts=front?[adv,fv,subj,pnp]:adv?[subj,fv,adv,pnp]:[subj,fv,pnp];
  if(pt)parts.push(pt);
  const g=finish(parts,!!s[2],subj);
  g.stufe=(adv||perfekt)?2:1;g.perfekt=perfekt;return g;
}
function genSatz(allowed){
  const ok=r=>!allowed||allowed.has(r);
  if(ok('Gleichsetzungsnominativ')&&Math.random()<(allowed?.3:.1))return genCop(ok);
  const attrOk=ok('Attribut');
  const cand=VB.filter(v=>(!v[5]||ok('Akkusativobjekt'))&&(!v[6]||ok('Dativobjekt'))&&(!v[8]||ok('Genitivobjekt')));
  const v=rn(cand),grp=v[4];
  const sp=pickNP(grp==='p'?SUBP:grp==='a'?SUBA:grp==='d'?SUBD:grp==='t'?SUBT:SUBP.concat(SUBA),attrOk);
  const pl=!!sp[1],proper=!!sp[2];
  const advOk=ok('Adverbiale'),pgOk=ok('Präpositionalgefüge');
  const pastAdv=!v[7]&&advOk&&Math.random()<.25,futAdv=advOk&&!pastAdv&&Math.random()<.12;
  const perfekt=!v[7]&&(pastAdv||(!futAdv&&Math.random()<.35));
  const nAdv=advOk&&Math.random()<.55?1:0,nPg=pgOk&&Math.random()<.5?1:0;
  const subj=NP('Subjekt',sp[0]);
  const fin=perfekt?(v[3]?(pl?'sind':'ist'):(pl?'haben':'hat')):(pl?v[1]:v[0]);
  const fv={r:'Prädikat',w:[fin]},pt=perfekt?{r:'Prädikat',w:[v[2]]}:null;
  let adv=null,pg=null,ao=null,dob=null,gob=null;
  if(nAdv)adv={r:'Adverbiale',w:rn(pastAdv?ADVPAST:futAdv?ADVFUT:ADVP).split(' ')};
  if(nPg){const s=rn(v[3]?PGT:(grp==='p'||grp==='pa')?PGM.concat(PGP):PGM).split(' ');pg={r:'Präpositionalgefüge',w:s,at:attrOk?s.map((_,i)=>i).filter(i=>i>0&&i<s.length-1):[]};}
  if(v[6])dob=NP('Dativobjekt',pickNP(v[6],attrOk));
  if(v[5])ao=NP('Akkusativobjekt',pickNP(v[5],attrOk));
  if(v[8])gob=NP('Genitivobjekt',rn(v[8]));
  if(!attrOk){[subj,dob,ao,gob].forEach(p=>{if(p)p.at=[];});}
  if(!adv&&!pg&&!ao&&!dob&&!gob&&advOk){adv={r:'Adverbiale',w:rn(ADVP).split(' ')};}
  const opts=[subj,subj,subj];if(adv)opts.push(adv);if(pg)opts.push(pg);if(ao&&Math.random()<.3)opts.push(ao);if(dob&&Math.random()<.2)opts.push(dob);if(gob&&Math.random()<.25)opts.push(gob);
  const vf=rn(opts);
  const rest=[adv,dob,ao,gob,pg].filter(x=>x&&x!==vf);
  const parts=[];
  if(vf===subj){parts.push(subj,fv);rest.forEach(x=>parts.push(x));}
  else{parts.push(vf,fv,subj);rest.forEach(x=>parts.push(x));}
  if(pt)parts.push(pt);
  const g=finish(parts,proper,subj),present=g.present;
  g.stufe=(present.length>=5||(perfekt&&vf!==subj&&present.length>=4))?3:(present.length>=4||vf!==subj||perfekt)?2:1;
  g.perfekt=perfekt;return g;
}
const SGKEY={'Prädikat':'verb','Subjekt':'nom','Akkusativobjekt':'akk','Dativobjekt':'dat','Präpositionalgefüge':'art','Adverbiale':'adv','Genitivobjekt':'gen','Gleichsetzungsnominativ':'pn','Attribut':'att'};
/* Widget: mehrere Satzglieder im selben Satz anmalen (Pinsel oben, Wort antippen) */
const sgpaint=el=>{
  const known=(el.dataset.known||'').split(',').filter(Boolean).filter(k=>(LVG[k]||1)<=GT.lv()),allowed=new Set(known);
  const truth=i=>(allowed.has('Attribut')&&g.attr[i])?'Attribut':g.roles[i];
  let g,paint,brush,done;
  const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function draw(){
    el.innerHTML='<span class="pill">Probier es aus</span><div class="instr" style="margin-top:.5rem">Wähle oben ein Satzglied und tippe dann im Satz die Wörter an, die dazu gehören. Jedes Wort bekommt eine Farbe.'+(allowed.has('Attribut')?' Der Kern (das Nomen) bekommt die Farbe des Satzglieds, Artikel und Beifügungen sind Attribute.':'')+'</div>'+
     '<div class="brush">'+known.map(k=>'<button class="f-'+SGKEY[k]+(brush===k?' on':'')+'" data-k="'+k+'">'+k+'</button>').join('')+'</div>'+
     '<div class="flow">'+g.toks.map((x,i)=>{const pk=paint[i],cl=pk?' f-'+SGKEY[pk]+' p-'+SGKEY[pk]:'';return '<button class="chip tok'+cl+'" data-i="'+i+'"'+(pk?' style="background:var(--b);border-color:var(--c);color:var(--t)"':'')+'>'+esc(x)+'</button>';}).join('')+'</div>'+
     '<div class="tfb" role="status" aria-live="polite"></div><div class="actions" style="justify-content:flex-start;margin-top:.6rem;gap:.5rem"><button class="btn primary" data-x="chk">Überprüfen</button><button class="btn" data-x="new">🔄 Neuer Satz</button></div>';
  }
  function fresh(){g=genSatz(allowed);el._g=g;paint={};brush=brush&&known.includes(brush)?brush:known[0];done=false;draw();}
  el.onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.x==='new'){fresh();return;}
    if(done)return;
    if(b.dataset.k){brush=b.dataset.k;el.querySelectorAll('.brush button').forEach(x=>x.classList.toggle('on',x===b));return;}
    if(b.dataset.x==='chk'){
      if(!Object.keys(paint).length)return;
      done=true;let right=0;const ac=el.querySelector('.actions');if(ac)ac.remove();
      el.querySelectorAll('.flow .tok').forEach(x=>{const i=Number(x.dataset.i),tr=truth(i),ok=paint[i]===tr;if(ok)right++;
        x.disabled=true;x.className='chip tok f-'+SGKEY[tr]+' p-'+SGKEY[tr]+(ok?' right':' wrong');x.setAttribute('style','background:var(--b);border-color:var(--c);color:var(--t)'+(ok?'':';outline:3px solid var(--bad);outline-offset:1px'));});
      const n=g.toks.length,all=right===n;
      const list=known.filter(k=>g.toks.some((_,i)=>truth(i)===k)).map(k=>'<b>'+k+':</b> «'+g.toks.filter((_,i)=>truth(i)===k).map(x=>x.replace(/\.$/,'')).join(' … ')+'»').join('<br>');
      el.querySelector('.tfb').innerHTML='<div class="fb '+(all?'ok':'err')+'"><b>'+(all?'✓ Alles richtig!':'✗ '+right+' von '+n+' Wörtern richtig. Rot umrandet = falsch gemalt.')+'</b><div style="margin-top:.4rem">'+list+'</div></div><div style="margin-top:.7rem"><button class="btn primary" data-x="new">Nächster Satz →</button></div>';
      return;
    }
    const t=b.closest('.tok');if(t){const i=Number(t.dataset.i);if(paint[i]===brush)delete paint[i];else paint[i]=brush;
      const pk=paint[i];t.className='chip tok'+(pk?' f-'+SGKEY[pk]+' p-'+SGKEY[pk]:'');if(pk)t.setAttribute('style','background:var(--b);border-color:var(--c);color:var(--t)');else t.removeAttribute('style');}
  };
  fresh();
};
const SATZSEEN=new Set();
for(let i=0;i<420;i++){
  const g=genSatz(),key=g.toks.join(' ');if(SATZSEEN.has(key))continue;SATZSEEN.add(key);
  const lvS=Math.max(g.stufe===3?2:1,...g.present.map(r=>LVG[r]||1));
  g.present.forEach(r=>{
    const targets=[];g.roles.forEach((x,k)=>{if(x===r)targets.push(k);});
    let txt='';targets.forEach((k,j)=>{txt+=(j===0?'':(k===targets[j-1]+1?' ':' … '))+g.toks[k].replace(/\.$/,'');});
    task.push({typ:'markieren',stufe:g.stufe,lv:lvS,cats:[GL_CAT[r]],gl:r,tokens:g.toks.slice(),targets,instr:GL_INSTR[r],why:'<b>'+r+':</b> «'+txt+'». '+GL_Q[r]});
  });
  const at=[];g.attr.forEach((a,k)=>{if(a)at.push(k);});
  if(at.length&&Math.random()<.6){let txt='';at.forEach((k,j)=>{txt+=(j===0?'':(k===at[j-1]+1?' ':' … '))+g.toks[k].replace(/\.$/,'');});
    task.push({typ:'markieren',stufe:g.stufe,lv:lvS,cats:['sg5'],gl:'Attribut',tokens:g.toks.slice(),targets:at,instr:GL_INSTR['Attribut'],why:'<b>Attribut:</b> «'+txt+'». '+GL_Q['Attribut']});}
}
const TAPORD=['praedikat','subjekt','ao','do','go','pg','adverbiale','attribut','pradikativ'];
const TAPGL={praedikat:'Prädikat',subjekt:'Subjekt',ao:'Akkusativobjekt','do':'Dativobjekt',pg:'Präpositionalgefüge',adverbiale:'Adverbiale',go:'Genitivobjekt',attribut:'Attribut',pradikativ:'Gleichsetzungsnominativ'};

const SECS=[
{id:'farben',title:'Die Satzglieder und ihre Farben',short:'Farben',min:6,note:'Überblick mit Farbcode. Diese Farben verwenden wir auf allen Folien und im Merkblatt. Jedes Satzglied wird danach auf einer eigenen Folie genau erklärt. Das Attribut ist kein eigenes Satzglied, es gehört zu einem Nomen.',
 html:()=>'<p class="lead">Jedes Satzglied hat eine eigene <b>Farbe</b>, eine eigene <b>Frage</b> und ein eigenes Zeichen.</p>'+
 '<div class="grid2">'+SGI.map(x=>'<div class="card f-'+x[0]+'" style="border-left:6px solid var(--c);background:var(--b);color:var(--t)"><div style="display:flex;gap:.6rem;align-items:center"><span style="font-size:1.8rem">'+x[1]+'</span><div><span class="tag f-'+x[0]+'">'+x[2]+'</span><br><b>'+x[3]+'</b></div></div><p style="margin:.4rem 0 0">'+x[4]+'</p></div>').join('')+'</div>'+
 '<div class="callout info">🏷️ Das <b>Attribut</b> ist <b>kein</b> Satzglied. Es gehört zu einem Nomen und bleibt beim Verschieben bei ihm.</div>'},
{id:'praedikat',uebung:{types:'glied,frage',cats:'sg2',ans:'Prädikat|Was geschieht? / Was tut …?'},title:'Das Prädikat',short:'Prädikat',min:12,note:'Das Prädikat besteht aus allen Teilen des Verbs. Die Personalform steht im Aussagesatz an zweiter Stelle, weitere Teile stehen am Schluss. Ein mehrteiliges Prädikat ist trotzdem nur ein Satzglied. Zuerst das Prädikat suchen, weil es den festen Platz hat. Tipp: Satz in eine Frage umwandeln, das erste Wort ist die Personalform.',
 html:()=>SL('verb','⚙️','Prädikat','Was geschieht? Was tut jemand?',
 'Das <b>Prädikat</b> besteht aus <b>allen Teilen des Verbs</b>. Es ist das Herz des Satzes: Ohne Prädikat gibt es keinen Satz.',
 ['<b>Personalform</b> finden: Wandle den Satz in eine Frage um. Das erste Wort ist die Personalform. «Der Hund bellt laut.» → «<b>Bellt</b> der Hund laut?»','Weitere Verbteile suchen: Partizip, Infinitiv oder Verbzusatz stehen oft am <b>Schluss</b>.','Alle Teile zusammen sind <b>ein</b> Satzglied.'],
 T(['Satz','Prädikat','Aufbau'],[['Der Hund '+mk('verb','bellt')+' laut.','bellt','einteilig'],['Anna '+mk('verb','hat')+' gestern '+mk('verb','gelacht')+'.','hat … gelacht','Hilfsverb + Partizip'],['Sie '+mk('verb','will')+' früh '+mk('verb','aufstehen')+'.','will … aufstehen','Modalverb + Infinitiv'],['Der Bus '+mk('verb','fährt')+' heute früher '+mk('verb','ab')+'.','fährt … ab','Verb + Verbzusatz'],['Wir '+mk('verb','werden')+' morgen '+mk('verb','gewinnen')+'.','werden … gewinnen','Zukunft']]),
 ['Der Hund '+mk('verb','bellt')+'.','Tim '+mk('verb','spielt')+' Fussball.',mk('verb','Kommst')+' du mit?'],
 ['⚠️ <b>Achtung:</b> Es genügt nicht, nur «hat» zu markieren. Auch «gelacht» gehört zum Prädikat.','🔎 <b>Merke:</b> Die Personalform steht im Aussagesatz an <b>zweiter Stelle</b>, im Fragesatz an erster.'])},
{id:'subjekt',uebung:{types:'glied,frage',cats:'sg2',ans:'Subjekt|Wer oder was?'},title:'Das Subjekt',short:'Subjekt',min:12,note:'Das Subjekt steht im Nominativ. Frage: Wer oder was? Probe: Es lässt sich durch er, sie, es oder sie (Mehrzahl) ersetzen. Das Prädikat richtet sich nach dem Subjekt (Person und Zahl). Das Subjekt steht nicht immer am Satzanfang. Bei «Es regnet.» ist «es» das Subjekt.',
 html:()=>SL('nom','👤','Subjekt','Wer oder was?',
 'Das <b>Subjekt</b> sagt, <b>wer oder was</b> etwas tut oder ist. Es steht im <b>Nominativ</b>.',
 ['Zuerst das <b>Prädikat</b> suchen.','Frage: <b>Wer oder was</b> + Prädikat? «Wer bellt?» – der Hund.','<b>Ersatzprobe:</b> er, sie, es, sie (Mehrzahl) einsetzen. «<b>Er</b> bellt.»','<b>Kontrolle:</b> Das Prädikat richtet sich nach dem Subjekt: Der Hund bellt, die Hunde bellen.'],
 T(['Satz','Frage','Subjekt'],[['Der Hund bellt.','Wer bellt?',mk('nom','Der Hund')],['Gestern spielte der kleine Junge Fussball.','Wer spielte?',mk('nom','der kleine Junge')],['Im Garten blühen die roten Rosen.','Was blüht?',mk('nom','die roten Rosen')],['Es regnet.','Was regnet?',mk('nom','Es')],['Kommt Tim heute mit?','Wer kommt?',mk('nom','Tim')]]),
 [mk('nom','Der Hund')+' bellt.','Heute spielt '+mk('nom','mein Bruder')+' Gitarre.',mk('nom','Die Schüler')+' schreiben einen Test.'],
 ['⚠️ <b>Achtung:</b> Das Subjekt steht <b>nicht immer</b> am Satzanfang: «Gestern spielte <b>der Hund</b>.»','🔎 <b>Merke:</b> Das Subjekt steht immer im Nominativ. Ein Objekt steht nie im Nominativ.'])},
{id:'ao',uebung:{types:'glied,frage',cats:'sg3',ans:'Akkusativobjekt|Wen oder was?'},title:'Das Akkusativobjekt',short:'Akkusativobjekt (AO)',min:12,note:'Frage: Wen oder was? Ersatzprobe: ihn, sie, es. Kürzel AO wie in der Prüfung. Akkusativobjekte sind häufiger als Dativ- und Genitivobjekte. Es gibt Verben ohne Objekt (lachen, schlafen).',
 html:()=>SL('akk','🎯','Akkusativobjekt (AO)','Wen oder was?',
 'Das <b>Akkusativobjekt (AO)</b> sagt, <b>wen oder was</b> die Handlung betrifft. Es steht im <b>Akkusativ</b>.',
 ['<b>Prädikat</b> und <b>Subjekt</b> suchen.','Frage: <b>Wen oder was</b> + Subjekt + Prädikat? «Was liest Anna?» – ein Buch.','<b>Ersatzprobe:</b> ihn, sie, es einsetzen. «Anna liest <b>es</b>.»','Prüfe: Es ist <b>nicht</b> das Subjekt und beginnt <b>nicht</b> mit einer Präposition.'],
 T(['Satz','Frage','Akkusativobjekt'],[['Anna liest ein Buch.','Was liest Anna?',mk('akk','ein Buch')],['Ich sehe den Hund.','Wen sehe ich?',mk('akk','den Hund')],['Der Trainer lobt die ganze Mannschaft.','Wen lobt der Trainer?',mk('akk','die ganze Mannschaft')],['Den Ball wirft Tim.','Was wirft Tim?',mk('akk','Den Ball')]]),
 ['Anna liest '+mk('akk','ein Buch')+'.','Wir sehen '+mk('akk','den Film')+'.','Er kauft '+mk('akk','ein neues Handy')+'.'],
 ['⚠️ <b>Achtung:</b> Manche Verben haben <b>kein</b> Objekt: «Tim lacht.» «Anna schläft.»','🔎 <b>Merke:</b> Ein Objekt steht <b>nie im Nominativ</b>. Es kann auch am Satzanfang stehen: «<b>Den Ball</b> wirft Tim.»'])},
{id:'do',uebung:{types:'glied,frage',cats:'sg3',ans:'Dativobjekt|Wem?'},title:'Das Dativobjekt',short:'Dativobjekt (DO)',min:12,note:'Frage: Wem? Ersatzprobe: ihm, ihr, ihnen. Typische Verben: helfen, gehören, danken, gefallen, schenken, zeigen, antworten. Manche Verben haben zwei Objekte (Dativ und Akkusativ). Mit Präposition (mit dem Bus) ist es ein Präpositionalgefüge, kein Dativobjekt.',
 html:()=>SL('dat','🤝','Dativobjekt (DO)','Wem?',
 'Das <b>Dativobjekt (DO)</b> sagt, <b>wem</b> etwas gegeben, gezeigt oder geholfen wird. Es steht im <b>Dativ</b>.',
 ['<b>Prädikat</b> und <b>Subjekt</b> suchen.','Frage: <b>Wem</b> + Prädikat? «Wem hilft er?» – dem Freund.','<b>Ersatzprobe:</b> ihm, ihr, ihnen einsetzen. «Er hilft <b>ihm</b>.»','Prüfe: Es beginnt <b>nicht</b> mit einer Präposition.'],
 T(['Satz','Frage','Dativobjekt'],[['Er hilft dem Freund.','Wem hilft er?',mk('dat','dem Freund')],['Mein Handy gehört meiner Schwester.','Wem gehört das Handy?',mk('dat','meiner Schwester')],['Die Aufgabe gefällt allen Schülern.','Wem gefällt die Aufgabe?',mk('dat','allen Schülern')],['Anna gibt ihrem Bruder das Buch.','Wem gibt Anna das Buch?',mk('dat','ihrem Bruder')+' (und '+mk('akk','das Buch')+')']]),
 ['Er hilft '+mk('dat','dem Freund')+'.','Ich danke '+mk('dat','dir')+'.','Der Lehrer zeigt '+mk('dat','der Klasse')+' '+mk('akk','ein Video')+'.'],
 ['⚠️ <b>Achtung:</b> «mit <b>dem Bus</b>» steht auch im Dativ, beginnt aber mit einer Präposition. Das ist ein <b>Präpositionalgefüge</b>, kein Dativobjekt.','🔎 <b>Merke:</b> Manche Verben haben <b>zwei Objekte</b>: «Er gibt <b>dem Freund</b> (DO) <b>das Buch</b> (AO).»'])},
{id:'go',uebung:{lv:2,types:'glied,frage',cats:'sg3',ans:'Genitivobjekt|Wessen?'},title:'Das Genitivobjekt',short:'Genitivobjekt',min:8,note:'Frage: Wessen? Ersatzprobe: seiner, ihrer. Kommt selten vor und wirkt gehoben (gedenken, bedürfen). Achtung: «Wessen?» fragt auch nach Genitivattributen (das Haus des Nachbarn). Nur kurz behandeln.',
 html:()=>SL('gen','🏛️','Genitivobjekt','Wessen?',
 'Das <b>Genitivobjekt</b> antwortet auf die Frage <b>Wessen?</b> Es steht im <b>Genitiv</b> und kommt <b>selten</b> vor. Man hört es vor allem in gehobener Sprache.',
 ['<b>Prädikat</b> und <b>Subjekt</b> suchen.','Frage: <b>Wessen</b> + Subjekt + Prädikat? «Wessen gedenken wir?» – der Opfer.','Prüfe: Es hängt <b>am Verb</b>. Hängt es an einem Nomen, ist es ein Attribut.','Typische Verben: <b>gedenken, bedürfen, sich erinnern, beschuldigen</b>.'],
 T(['Satz','Frage','Genitivobjekt'],[['Wir gedenken der Opfer.','Wessen gedenken wir?',mk('gen','der Opfer')],['Er bedarf deiner Hilfe.','Wessen bedarf er?',mk('gen','deiner Hilfe')],['Der Richter bezichtigt den Mann des Diebstahls.','Wessen bezichtigt er ihn?',mk('gen','des Diebstahls')]]),
 ['Wir gedenken '+mk('gen','der Opfer')+'.','Er bedarf '+mk('gen','deiner Hilfe')+'.'],
 ['⚠️ <b>Achtung:</b> «Wessen?» fragt auch nach einem <b>Attribut</b>: «das Haus <b>des Nachbarn</b>» (Wessen Haus?). Das ist kein Objekt, sondern gehört zum Nomen «Haus».','🔎 <b>Merke:</b> Das Genitivobjekt ist selten. Meist ist ein Satzglied im Genitiv ein Attribut.'])},
{id:'pg',uebung:{types:'glied',cats:'sg4',ans:'Präpositionalgefüge'},title:'Präpositionalgefüge',short:'Präpositionalgefüge',min:14,note:'Ein Präpositionalgefüge beginnt mit einer Präposition und enthält alle Wörter, die dazugehören. Es sagt etwas über Ort, Zeit, Art oder Grund oder wird vom Verb verlangt (warten auf, sich freuen auf). Kontraktionen: am = an dem, im = in dem, zum = zu dem. Die Liste der Präpositionen auswendig kennen.',
 html:()=>SL('art','🧭','Präpositionalgefüge','Beginnt mit einer Präposition',
 'Ein <b>Präpositionalgefüge</b> beginnt mit einer <b>Präposition</b> und enthält <b>alle Wörter</b>, die dazugehören. Es bleibt beim Verschieben zusammen.',
 ['Präposition suchen (Liste unten).','Alle Wörter dazunehmen, bis das Nomen zu Ende ist: «in dem kleinen Park».','Fragen: <b>Wo? Wann? Wie? Warum?</b> – oder das Verb verlangt es (warten <b>auf</b> den Bus).','<b>Verschiebeprobe:</b> Das Ganze lässt sich zusammen verschieben.'],
 '<div class="card f-art" style="background:var(--b);color:var(--t);border:2px dashed var(--c)"><b>Häufige Präpositionen:</b> '+['an','auf','aus','bei','durch','für','gegen','in','mit','nach','ohne','seit','über','um','unter','von','vor','wegen','zu','zwischen'].map(x=>'<span class="tag f-art">'+x+'</span>').join(' ')+'</div>'+
 T(['Beispiel','Präposition','Aufgabe'],[[mk('art','auf dem Pausenplatz')+' spielen','auf','Ort (Wo?)'],[mk('art','am Freitag')+' treffen','an (am)','Zeit (Wann?)'],[mk('art','mit dem Bus')+' fahren','mit','Art und Weise (Wie?)'],[mk('art','wegen des Schnees')+' zu spät kommen','wegen','Grund (Warum?)'],['warten '+mk('art','auf den Bus'),'auf','vom Verb verlangt']]),
 [mk('art','Nach der Pause')+' schreibt die Klasse einen Test.','Wir fahren '+mk('art','mit dem Zug')+' '+mk('art','nach Zürich')+'.','Sie freut sich '+mk('art','auf die Ferien')+'.'],
 ['⚠️ <b>Achtung:</b> Eine Präposition allein ist kein Satzglied. Die dazugehörigen Wörter gehören mit: «<b>in dem kleinen Park</b>».','🔎 <b>Merke:</b> «am» = an dem, «im» = in dem, «zum» = zu dem, «beim» = bei dem. Sie beginnen mit einer Präposition.','📖 <b>Im Lehrmittel heisst das …</b> «Präpositionalgruppe». Gemeint ist dasselbe wie hier «Präpositionalgefüge».'])},
{id:'adverbiale',uebung:{types:'glied,frage',cats:'sg4',ans:'Adverbiale|Wann? Wie lange?|Wo? Wohin? Woher?|Warum? Weshalb?|Wie? Womit?'},title:'Adverbiale (Wörter und Wortgruppen ohne Präposition)',short:'Adverbiale',min:12,note:'Wörter oder Wortgruppen ohne Präposition wie gestern, heute, dort, leider, dann, gestern Abend, nächste Woche. In den Lösungen steht dafür «Adverb» (Partikel). Wichtig: Satzglied, aber kein Objekt und kein Präpositionalgefüge. Mit Präposition (am Freitag) ist es ein Präpositionalgefüge.',
 html:()=>SL('adv','🧩','Adverbiale','Wann? Wo? Wie? Warum?',
 'Ein <b>Adverbiale</b> ist ein Wort oder eine Wortgruppe <b>ohne Präposition</b>, die Ort, Zeit, Art oder Grund angibt.',
 ['<b>Prädikat</b>, <b>Subjekt</b> und Objekte suchen.','Wörter übrig? Frage: <b>Wann? Wo? Wie? Warum?</b>','Prüfe: Es beginnt <b>nicht</b> mit einer Präposition.','<b>Verschiebeprobe:</b> Das Adverbiale lässt sich leicht verschieben.'],
 T(['Frage','Art','Beispiele'],[['Wann?','Zeit',mk('adv','gestern')+' · '+mk('adv','dann')+' · '+mk('adv','nächste Woche')+' · '+mk('adv','jeden Morgen')],['Wo?','Ort',mk('adv','dort')+' · '+mk('adv','draussen')+' · '+mk('adv','hier')],['Wie?','Art und Weise',mk('adv','leider')+' · '+mk('adv','langsam')+' · '+mk('adv','plötzlich')],['Warum?','Grund',mk('adv','deshalb')+' · '+mk('adv','darum')]]),
 [mk('adv','Gestern')+' regnete es.','Die Kinder warten '+mk('adv','draussen')+'.',mk('adv','Leider')+' hat der Bus Verspätung.'],
 ['⚠️ <b>Achtung:</b> «gestern» ist ein Adverbiale, «am Freitag» ein <b>Präpositionalgefüge</b>. Mit Präposition = Präpositionalgefüge.','🔎 <b>Merke:</b> Ein Adverbiale kann man oft <b>weglassen</b>, der Satz bleibt vollständig. Subjekt und Prädikat braucht jeder Satz.'])},
{id:'attribut',uebung:{types:'frage',cats:'sg5'},title:'Das Attribut',short:'Attribut',min:12,note:'Das Attribut ist kein eigenes Satzglied. Es gehört immer zu einem Nomen und bleibt beim Verschieben bei ihm. Frage: Was für ein …? Der Artikel zählt hier auch als Attribut (wie im Unterrichtsblatt).',
 html:()=>SL('att','🏷️','Attribut (kein Satzglied)','Was für ein …?',
 'Ein Satzglied besteht aus einem <b>Kern</b> (oft ein Nomen) und <b>Attributen</b> (Beifügungen). Das Attribut sagt, <b>was für</b> ein Nomen es ist.',
 ['Kern suchen: das Nomen im Satzglied.','Frage: <b>Was für ein …?</b> (Welches? Wessen?)','Prüfe: Das Attribut lässt sich <b>nicht allein</b> verschieben.','Ein Satzglied kann <b>mehrere</b> Attribute haben.'],
 T(['Satzglied','Kern','Attribute'],[['der freche Hund','Hund','der, freche'],['ein spannendes Buch','Buch','ein, spannendes'],['das Haus am See','Haus','das, am See'],['das Haus des Nachbarn','Haus','das, des Nachbarn'],['die lauten Föhnstürme der letzten Nacht','Föhnstürme','die, lauten, der letzten Nacht']]),
 ['Der '+mk('att','freche')+' Hund bellt. (<b>2</b> Satzglieder)','Mein '+mk('att','grosser')+' Bruder spielt Gitarre.'],
 ['⚠️ <b>Achtung:</b> «Der freche Hund bellt.» hat <b>zwei</b> Satzglieder (Der freche Hund · bellt), nicht drei.','🔎 <b>Merke:</b> Das Attribut bleibt beim Nomen. Es zählt nie als eigenes Satzglied.','📖 <b>Im Lehrmittel heisst das …</b> «Nominalgruppe» für das ganze Satzglied (zum Beispiel «der freche Hund») und «Chef-Wort» für den Kern («Hund»). Wörter wie «der» und «freche» gehören zur Gruppe.'])},
{id:'pradikativ',uebung:{types:'glied',cats:'sg2',ans:'Gleichsetzungsnominativ'},title:'Gleichsetzungsnominativ (Prädikativ)',short:'Gleichsetzungsnominativ',lv:3,min:8,note:'Nur Niveau A. Nominativ nach «sein, werden, bleiben». Das ist kein Objekt, weil Objekte nie im Nominativ stehen.',
 html:()=>SL('nom','💡','Gleichsetzungsnominativ','Wer oder was ist Anna?',
 'Nach <b>sein, werden, bleiben</b> steht ein <b>zweiter Nominativ</b>. Er setzt das Subjekt mit etwas gleich.',
 ['Prädikat finden: <b>ist, wird, bleibt</b>.','Subjekt finden: Wer oder was?','Frage: <b>Wer oder was ist</b> das Subjekt?','Prüfe: Es ist ein <b>Nominativ</b>, also <b>kein</b> Objekt.'],
 T(['Satz','Frage','Gleichsetzungsnominativ'],[['Anna ist Lehrerin.','Wer ist Anna?',mk('nom','Lehrerin')],['Er wird Pilot.','Was wird er?',mk('nom','Pilot')],['Sie bleibt meine Freundin.','Was bleibt sie?',mk('nom','meine Freundin')]]),
 ['Anna ist '+mk('nom','Lehrerin')+'.','Er wird '+mk('nom','Pilot')+'.'],
 ['🔎 <b>Merke:</b> Objekte stehen <b>nie</b> im Nominativ. Darum ist der Gleichsetzungsnominativ kein Objekt.'])},
{id:'vorgehen',title:'So findest du die Satzglieder',short:'Vorgehen',min:8,note:'Immer in dieser Reihenfolge: Prädikat zuerst, weil es den festen Platz hat und die Stellen eröffnet. Dann Subjekt, dann Objekte.',
 html:()=>'<p class="lead">Suche die Satzglieder immer in dieser Reihenfolge:</p><ol class="steps"><li><b>Prädikat</b> suchen: alle Teile, die zum Verb gehören. Es hat einen festen Platz.</li><li><b>Subjekt</b> suchen: Wer oder was …? (Nominativ)</li><li><b>Akkusativobjekt</b> suchen: Wen oder was …?</li><li><b>Dativobjekt</b> suchen: Wem …?</li><li><b>Genitivobjekt</b> suchen: Wessen …? (selten)</li><li><b>Präpositionalgefüge</b> suchen: Präposition + die Wörter, die dazugehören.</li></ol><div class="callout">Zuerst prüfen: Was lässt sich beim Umstellen zusammen verschieben? Das sind die Satzglieder.</div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Ein kleiner Tippfehler zählt nicht als falsch, wird aber erwähnt.',
 html:()=>T(['Begriff','Bedeutung'],[['Verschiebeprobe','Verfahren, um Satzglieder zu finden (Umstellen)'],['Satzglied','Wort oder Wortgruppe, die beim Umstellen zusammenbleibt'],['Subjekt','Wer oder was? Immer im Nominativ'],['Prädikat','alle verbalen Teile; Personalform an zweiter Stelle'],['Objekt','Akkusativobjekt (AO), Dativobjekt (DO), Genitivobjekt; nie im Nominativ'],['Präpositionalgefüge','Präposition + die Wörter, die dazugehören'],['Adverbiale','Wort oder Wortgruppe ohne Präposition als Satzglied (gestern, leider, nächste Woche)'],['Attribut','Beifügung zu einem Nomen: Was für ein …?'],['Verbale Teile','Personalform, Infinitiv, Partizip, Verbzusatz']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Fehler: Satzglied zu klein abgrenzen; Ort/Zeit verwechseln; Subjekt nicht am Satzanfang.',
 html:()=>'<div class="grid3">'+[
  ['1 · Subjekt nicht am Anfang','«Gestern spielte <b>der Hund</b>.»','Das Subjekt steht nicht immer vorne.'],
  ['2 · Satzglied zu klein','«<b>Der kleine Hund</b>» ist ein Glied','Alles, was zusammen verschoben wird.'],
  ['3 · Ort oder Zeit?','«im Garten» (Wo?) · «am Morgen» (Wann?)','Mit der Frage prüfen.'],
  ['4 · Akkusativ oder Dativ?','«Er sieht <b>den Hund</b>.» / «Er hilft <b>dem Hund</b>.»','Wen oder was? / Wem?'],
  ['5 · Zwei Objekte','«Er gibt <b>dem Kind</b> <b>ein Buch</b>.»','Dativobjekt und Akkusativobjekt.'],
  ['6 · Verb bleibt an Position 2','«Heute <b>spielt</b> er.»','Die Personalform ändert die Position nicht.'],
  ['7 · Attribut ist kein Satzglied','«Der <b>freche</b> Hund bellt.» hat 2 Satzglieder.','Das Attribut bleibt beim Nomen.'],
  ['8 · Prädikat mit zwei Teilen','«Wir <b>haben</b> gestern <b>gelacht</b>.»','Beide verbalen Teile gehören zum Prädikat.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('glied,frage,probe')}
];
SECS.forEach(sc=>{const k=TAPORD.indexOf(sc.id);if(k>=0&&sc.uebung){sc.uebung.tap={own:TAPGL[sc.id],all:TAPORD.slice(0,k+1).map(x=>TAPGL[x])};}});
const EX=[
 ['Finde das Prädikat: «Anna hat gestern im Garten gelacht.»','hat … gelacht',1],
 ['Finde das Subjekt: «Gestern spielte der kleine Junge Fussball.»','der kleine Junge (Wer spielte?)',1],
 ['Finde die Satzglieder: «Anna liest heute im Garten ein Buch.»','Anna · liest · heute · im Garten · ein Buch',1],
 ['Bestimme: «Er hilft dem Freund.»','Er (Subjekt) · hilft (Prädikat) · dem Freund (Dativobjekt)',1],
 ['Bestimme: «Wir sehen den Film.»','Wir (Subjekt) · sehen (Prädikat) · den Film (Akkusativobjekt)',1],
 ['Unterstreiche die Präpositionalgefüge: «Nach der Pause schreibt die Klasse am Freitag einen Test für Mathe.»','nach der Pause · am Freitag · für Mathe',1],
 ['Wie viele Satzglieder hat der Satz? «Der freche Hund bellt heute im Garten.»','4 (Der freche Hund · bellt · heute · im Garten)',2],
 ['Welche Wörter sind Attribute? «Mein grosser Bruder spielt Gitarre.»','Mein · grosser',2],
 ['Schreibe einen Satz mit Subjekt, Prädikat, Dativobjekt und Akkusativobjekt.','Beispiel: Anna gibt dem Bruder ein Buch.',2]
];
const merk=()=>'<h3>🎨 Die Satzglieder auf einen Blick</h3>'+T(['Satzglied','Frage','Ersatzprobe','Beispiel'],[
 ['👤 Subjekt','Wer oder was?','er, sie, es',mk('nom','Der Hund')+' bellt.'],
 ['⚙️ Prädikat','Was geschieht?','–','Der Hund '+mk('verb','bellt')+'.'],
 ['🎯 Akkusativobjekt (AO)','Wen oder was?','ihn, sie, es','Er sieht '+mk('akk','den Hund')+'.'],
 ['🤝 Dativobjekt (DO)','Wem?','ihm, ihr, ihnen','Er hilft '+mk('dat','dem Hund')+'.'],
 ['🏛️ Genitivobjekt','Wessen?','seiner, ihrer','Wir gedenken '+mk('gen','der Opfer')+'.'],
 ['🧭 Präpositionalgefüge','Wo? Wann? Wie? Warum?','–','Er wartet '+mk('art','auf den Bus')+'.'],
 ['🧩 Adverbiale','Wann? Wo? Wie? Warum? (ohne Präposition)','–',mk('adv','Gestern')+' regnete es.'],
 ['🏷️ Attribut (kein Satzglied)','Was für ein …?','–','der '+mk('att','freche')+' Hund']])+
 '<h3>⚙️ Das Prädikat</h3>'+T(['Aufbau','Beispiel','Prädikat'],[['einteilig','Der Hund bellt.','bellt'],['Hilfsverb + Partizip','Anna hat gelacht.','hat … gelacht'],['Modalverb + Infinitiv','Sie will aufstehen.','will … aufstehen'],['Verb + Verbzusatz','Der Bus fährt ab.','fährt … ab']])+
 '<p>Die Personalform steht im Aussagesatz an <b>zweiter Stelle</b>. Alle Verbteile zusammen sind <b>ein</b> Satzglied.</p>'+
 '<h3>🔍 So gehst du vor</h3><ol><li><b>Verschiebeprobe:</b> Was bleibt beim Umstellen zusammen?</li><li><b>Prädikat</b> suchen (alle Verbteile).</li><li><b>Subjekt</b> suchen: Wer oder was + Prädikat?</li><li><b>Akkusativobjekt</b>: Wen oder was?</li><li><b>Dativobjekt</b>: Wem?</li><li><b>Genitivobjekt</b>: Wessen? (selten)</li><li><b>Präpositionalgefüge</b>: Präposition + zugehörige Wörter.</li><li><b>Adverbiale</b>: Was übrig bleibt, ohne Präposition: Wann? Wo? Wie? Warum?</li></ol>'+
 '<h3>🧭 Häufige Präpositionen</h3><p>an, auf, aus, bei, durch, für, gegen, in, mit, nach, ohne, seit, über, um, unter, von, vor, wegen, zu, zwischen. (am = an dem, im = in dem, zum = zu dem)</p>'+
 '<h3>⚠️ Stolpersteine</h3><ul><li>Das Subjekt steht <b>nicht immer</b> am Satzanfang.</li><li>Ein Objekt steht <b>nie im Nominativ</b>.</li><li>Das Attribut ist <b>kein</b> Satzglied: «Der freche Hund bellt.» hat 2 Satzglieder.</li><li>Mit Präposition (am Freitag, mit dem Bus) ist es ein <b>Präpositionalgefüge</b>, auch wenn der Fall Dativ ist.</li><li>Zweiteiliges Prädikat: «hat … gelacht» ist <b>ein</b> Satzglied.</li><li>«Wessen?» fragt auch nach einem Attribut (das Haus <b>des Nachbarn</b>).</li></ul>'+
 '<h3>🔤 Fachbegriffe</h3><p>Verschiebeprobe · Satzglied · Subjekt · Prädikat · Akkusativobjekt (AO) · Dativobjekt (DO) · Genitivobjekt · Präpositionalgefüge · Adverbiale · Attribut · Nominativ · Akkusativ · Dativ · Genitiv</p>';
GT.chapter({id:'satzglieder',teil:'satz',nr:3,title:'Die Satzglieder benennen',big:'[Der Hund] [bellt] [laut]',desc:'Prädikat, Subjekt, Objekte, Präpositionalgefüge, Adverbiale, Attribut',
 ex:'«[Der Hund] [bellt] [laut].»',
 goals:['Ich finde zuerst das Prädikat (alle Verbteile) und dann das Subjekt.','Ich bestimme Akkusativ-, Dativ- und Genitivobjekt mit den Fragen Wen oder was? / Wem? / Wessen? und mit der Ersatzprobe.','Ich erkenne ein Präpositionalgefüge an der Präposition und nehme alle zugehörigen Wörter dazu.','Ich erkenne Adverbiale und frage nach Zeit, Ort, Art und Weise und Grund.','Ich weiss, dass ein Attribut zu einem Nomen gehört und kein eigenes Satzglied ist.','Ich bestimme alle Satzglieder eines Satzes in der richtigen Reihenfolge.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  glied:{label:'Satzglied bestimmen',short:'Subjekt, Prädikat, Objekte, Präpositionalgefüge, Adverbiale',instr:'Welches Satzglied ist markiert?',hint:'Stelle die passende Frage: Wer? Was tut? Wen? Wem? Wo? Wann?',ref:'subjekt'},
  frage:{label:'Fragen zu den Satzgliedern',short:'Welche Frage passt?',instr:'Wähle die richtige Frage.',hint:'Schau in der Theorie nach.',ref:'ao'},
  markieren:{icon:'👆',label:'Satzglied antippen',short:'Wörter im Satz antippen',instr:'Tippe die gesuchten Wörter an.',hint:'Stelle die passende Frage: Wer? Was geschieht? Wen? Wem? Wann? Was für ein …? Beginnt es mit einer Präposition?',ref:'subjekt'}},
 sections:SECS,tasks:task,exercises:EX,merk,widgets:{sgpaint:sgpaint}});
})();
