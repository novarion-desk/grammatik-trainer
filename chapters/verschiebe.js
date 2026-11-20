/* Kapitel Satzlehre 3: Verschiebeprobe und Satzglieder. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Verschiebeprobe',sg2:'Subjekt und Prädikat',sg3:'Objekte',sg4:'Präpositionalgefüge und Adverbiale',sg5:'Attribut',sg6:'Fachbegriffe'};
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
['Wie viele Satzglieder ist das Prädikat «hat … gesehen»?',['eines','zwei','keines','drei'],'eines','Alle verbalen Teile zusammen sind <b>ein</b> Satzglied: das Prädikat.','sg2',2],
['Beim Verschieben bleibt das <b>Attribut</b> …',['beim Nomen, zu dem es gehört','allein stehen','am Satzanfang','beim Verb'],'beim Nomen, zu dem es gehört','Das Attribut ist kein eigenes Satzglied. Es ist ein Teil eines Satzglieds.','sg5',2],
['Mit welcher Frage findest du das <b>Attribut</b>?',['Was für ein …?','Wer oder was?','Wem?','Wo?'],'Was für ein …?','«Was für ein Hund?» – der <b>freche</b> Hund.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Der freche Hund bellt.»',['Der und freche','Hund und bellt','nur freche','nur Hund'],'Der und freche','Beide sind dem Nomen «Hund» beigefügt: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Wir lesen ein spannendes Buch.»',['ein und spannendes','lesen und Buch','nur spannendes','Wir und ein'],'ein und spannendes','Beide gehören zum Nomen «Buch»: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Die jungen Schülerinnen lachen.»',['Die und jungen','Schülerinnen und lachen','nur jungen','Die und lachen'],'Die und jungen','Zum Kern «Schülerinnen» gehören Artikel und Adjektiv.','sg5',2],
['Ein Satzglied besteht aus einem Kern und …',['Attributen (Beifügungen)','nur Verben','Satzzeichen','einem Nebensatz'],'Attributen (Beifügungen)','Kern: oft ein Nomen. Dazu kommen Attribute.','sg5',2],
['Welcher Satz ist die richtige Umstellung? «Ich habe gestern einen Film gesehen.»',['Gestern habe ich einen Film gesehen.','Gestern ich habe einen Film gesehen.','Gesehen habe ich gestern einen Film.','Einen Film gestern habe ich gesehen.'],'Gestern habe ich einen Film gesehen.','Die Personalform «habe» bleibt an zweiter Stelle.','sg1',2],
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

const SECS=[
{id:'probe',title:'Die Verschiebeprobe',short:'Verschiebeprobe',min:10,note:'Beispielsatz mit Kärtchen an der Wandtafel umstellen. Die Personalform bleibt immer an zweiter Stelle (Aussagesatz).',
 html:()=>'<p class="lead">Mit der <b>Verschiebeprobe</b> findest du die Satzglieder: Was beim Umstellen zusammenbleibt, ist <b>ein</b> Satzglied.</p>'+
 '<div class="card"><p>Der kleine Hund bellt laut.</p><p>Laut bellt der kleine Hund.</p><p>Bellt der kleine Hund laut? <span class="muted">(Frage)</span></p></div>'+
 '<div class="callout"><b>Regeln:</b> 1. Die Personalform des Verbs bleibt an zweiter Stelle. 2. Wörter, die zusammenbleiben, sind <b>ein</b> Satzglied. 3. Der Satz muss danach noch Sinn ergeben.</div>'},
{id:'subjekt',title:'Subjekt und Prädikat',short:'Subjekt und Prädikat',min:8,note:'Subjekt und Prädikat bilden das Gerüst jedes Satzes. Das Subjekt steht im Nominativ.',
 html:()=>'<div class="grid2"><div class="card f-sg1" style="border-color:var(--c)"><h3 style="color:var(--t)">Subjekt</h3><p><b>Wer oder was?</b></p><p>[Der Hund] bellt. · [Anna] liest.</p></div>'+
 '<div class="card f-sg2" style="border-color:var(--c)"><h3 style="color:var(--t)">Prädikat</h3><p><b>Was geschieht? Was tut jemand?</b></p><p>Der Hund [bellt]. · Anna [hat] gelacht.</p></div></div>'+
 '<div class="callout">Das Subjekt steht im <b>Nominativ</b>. Das Prädikat richtet sich nach dem Subjekt: <i>Ich lache, du lachst, die Kinder lachen.</i></div>'},
{id:'vorgehen',title:'So findest du die Satzglieder',short:'Vorgehen',min:8,note:'Immer in dieser Reihenfolge: Prädikat zuerst, weil es den festen Platz hat und die Stellen eröffnet. Dann Subjekt, dann Objekte.',
 html:()=>'<p class="lead">Suche die Satzglieder immer in dieser Reihenfolge:</p><ol class="steps"><li><b>Prädikat</b> suchen: alle Teile, die zum Verb gehören. Es hat einen festen Platz.</li><li><b>Subjekt</b> suchen: Wer oder was …? (Nominativ)</li><li><b>Akkusativobjekt</b> suchen: Wen oder was …?</li><li><b>Dativobjekt</b> suchen: Wem …?</li><li><b>Genitivobjekt</b> suchen: Wessen …? (selten)</li><li><b>Präpositionalgefüge</b> suchen: Präposition + die Wörter, die dazugehören.</li></ol><div class="callout">Zuerst prüfen: Was lässt sich beim Umstellen zusammen verschieben? Das sind die Satzglieder.</div>'},
{id:'objekte',title:'Objekte',short:'Objekte',min:10,note:'Akkusativobjekt (Wen/Was?) und Dativobjekt (Wem?) auf die Fälle-Probe zurückführen. Kürzel AO und DO wie in der Prüfung. Genitivobjekt nur kurz (selten).',
 html:()=>'<div class="grid3"><div class="card f-sg3" style="border-color:var(--c)"><h3 style="color:var(--t)">Akkusativobjekt (AO)</h3><p><b>Wen oder was?</b></p><p>Anna liest [ein Buch]. · Ich sehe [den Hund].</p></div>'+
 '<div class="card f-sg4" style="border-color:var(--c)"><h3 style="color:var(--t)">Dativobjekt (DO)</h3><p><b>Wem?</b></p><p>Er hilft [dem Freund]. · Sie gibt [mir] das Buch.</p></div>'+
 '<div class="card"><h3>Genitivobjekt</h3><p><b>Wessen?</b></p><p>Wir gedenken [der Opfer].</p><p class="muted">Kommt selten vor.</p></div></div>'+
 '<div class="callout">Ein Objekt steht <b>nie im Nominativ</b>. Der Nominativ gehört dem Subjekt. Akkusativobjekte kommen häufiger vor als Dativ- und Genitivobjekte.</div>'+
 '<div class="callout">Manche Verben haben zwei Objekte: «Er gibt <b>dem Freund</b> (DO) <b>das Buch</b> (AO).»</div>'},
{id:'pg',title:'Präpositionalgefüge',short:'Präpositionalgefüge',min:10,note:'Ein Präpositionalgefüge beginnt mit einer Präposition und enthält alle Wörter, die dazugehören. Es wird entweder vom Verb verlangt (warten auf, sich freuen auf) oder sagt etwas über Ort, Zeit, Art oder Grund.',
 html:()=>'<p class="lead">Ein <b>Präpositionalgefüge</b> beginnt mit einer <b>Präposition</b> (in, auf, mit, für, nach, am …) und enthält alle Wörter, die dazugehören.</p>'+
 T(['Beispiel','Präposition','Aufgabe im Satz'],[['<b>auf dem Pausenplatz</b> spielen','auf','Ort (Wo?)'],['<b>am Freitag</b> treffen','an (am)','Zeit (Wann?)'],['<b>mit dem Bus</b> fahren','mit','Art und Weise (Wie?)'],['<b>wegen des Schnees</b>','wegen','Grund (Warum?)'],['warten <b>auf den Bus</b>','auf','vom Verb verlangt (Präpositionalobjekt)']])+
 '<div class="callout">Das Präpositionalgefüge gehört zu den Satzgliedern. Es bleibt beim Verschieben zusammen: «<b>Nach der Pause</b> schreibt die Klasse einen Test.»</div>'},
{id:'adverbiale',title:'Adverbiale (einzelne Wörter)',short:'Adverbiale',min:8,note:'Einzelne Wörter ohne Präposition wie gestern, heute, dort, leider, dann. In deinen Lösungen steht dafür «Adverb» (Partikel). Wichtig: Satzglied, aber kein Objekt und kein Präpositionalgefüge.',
 html:()=>'<p class="lead">Auch <b>einzelne Wörter</b> ohne Präposition können ein Satzglied sein: <b>Adverbiale</b> (Adverb, Partikel).</p>'+
 T(['Frage','Beispiel'],[['Wann?','<b>Gestern</b> regnete es. · <b>Dann</b> ruft sie an.'],['Wo?','Die Kinder warten <b>draussen</b>.'],['Wie? (Einstellung)','<b>Leider</b> hat der Bus Verspätung.']])+
 '<div class="callout">Ein Adverbiale kann man oft <b>weglassen</b>, der Satz bleibt vollständig. Subjekt und Prädikat braucht jeder Satz.</div>'},
{id:'attribut',title:'Das Attribut',short:'Attribut',min:10,note:'Das Attribut ist kein eigenes Satzglied. Es gehört immer zu einem Nomen und bleibt beim Verschieben bei ihm. Frage: Was für ein …? Der Artikel zählt hier auch als Attribut (wie in deinem Blatt).',
 html:()=>'<p class="lead">Ein Satzglied besteht aus einem <b>Kern</b> (oft ein Nomen) und <b>Attributen</b> (Beifügungen). Frage: <b>Was für ein …?</b></p>'+
 T(['Satzglied','Kern','Attribute'],[['der freche Hund','Hund','der, freche'],['ein spannendes Buch','Buch','ein, spannendes'],['das Haus am See','Haus','das, am See'],['die lauten Föhnstürme der letzten Nacht','Föhnstürme','die, lauten, der letzten Nacht']])+
 '<div class="callout">Das Attribut lässt sich <b>nicht allein verschieben</b>. Es zählt darum nie als eigenes Satzglied: «Der freche Hund bellt.» hat <b>zwei</b> Satzglieder.</div>'+
 '<p class="muted">Ein Satzglied kann mehrere Attribute haben. Ein Attribut kann aus einem Wort oder aus mehreren Wörtern bestehen.</p>'},
{id:'pradikativ',title:'Gleichsetzungsnominativ (Prädikativ)',short:'Gleichsetzungsnominativ',lv:3,min:6,note:'Nur Niveau A. Nominativ nach «sein, werden, bleiben». Das ist kein Objekt, weil Objekte nie im Nominativ stehen.',
 html:()=>'<div class="card"><h3>Gleichsetzungsnominativ (Prädikativ)</h3><p>Nach <b>sein, werden, bleiben</b> steht ein zweiter Nominativ.</p><p>Anna <b>ist</b> [Lehrerin]. · Er <b>wird</b> [müde]. · Sie <b>bleibt</b> [freundlich].</p><p class="muted">Frage: Wer oder was ist Anna? – Lehrerin. Das ist kein Objekt: Objekte stehen nie im Nominativ.</p></div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Verschiebeprobe','Verfahren, um Satzglieder zu finden (Umstellen)'],['Satzglied','Wort oder Wortgruppe, die beim Umstellen zusammenbleibt'],['Subjekt','Wer oder was? Immer im Nominativ'],['Prädikat','alle verbalen Teile; Personalform an zweiter Stelle'],['Objekt','Akkusativobjekt (AO), Dativobjekt (DO), Genitivobjekt; nie im Nominativ'],['Präpositionalgefüge','Präposition + die Wörter, die dazugehören'],['Adverbiale','einzelnes Wort ohne Präposition als Satzglied (gestern, leider)'],['Attribut','Beifügung zu einem Nomen: Was für ein …?'],['Verbale Teile','Personalform, Infinitiv, Partizip, Verbzusatz']])},
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
const EX=[
 ['Stelle den Satz zweimal um: «Der Hund bellt laut.»','Laut bellt der Hund. · Bellt der Hund laut?',1],
 ['Finde die Satzglieder: «Anna liest heute im Garten ein Buch.»','Anna · liest · heute · im Garten · ein Buch',1],
 ['Bestimme: «Er hilft dem Freund.»','Er (Subjekt) · hilft (Prädikat) · dem Freund (Dativobjekt)',1],
 ['Bestimme: «Wir sehen den Film.»','Wir (Subjekt) · sehen (Prädikat) · den Film (Akkusativobjekt)',1],
 ['Unterstreiche die Präpositionalgefüge: «Nach der Pause schreibt die Klasse am Freitag einen Test für Mathe.»','nach der Pause · am Freitag · für Mathe',1],
 ['Wie viele Satzglieder hat der Satz? «Der freche Hund bellt heute im Garten.»','4 (Der freche Hund · bellt · heute · im Garten)',2],
 ['Welche Wörter sind Attribute? «Mein grosser Bruder spielt Gitarre.»','Mein · grosser',2],
 ['Schreibe einen Satz mit Subjekt, Prädikat, Dativobjekt und Akkusativobjekt.','Beispiel: Anna gibt dem Bruder ein Buch.',2]
];
const merk=()=>T(['Satzglied','Frage','Beispiel'],[['Subjekt','Wer oder was? (Nominativ)','<b>Der Hund</b> bellt.'],['Prädikat','alle verbalen Teile, Personalform an zweiter Stelle','Der Hund <b>bellt</b>.'],['Akkusativobjekt (AO)','Wen oder was?','Er sieht <b>den Hund</b>.'],['Dativobjekt (DO)','Wem?','Er hilft <b>dem Hund</b>.'],['Genitivobjekt','Wessen?','Wir gedenken <b>der Opfer</b>.'],['Präpositionalgefüge','beginnt mit einer Präposition','Er wartet <b>auf den Bus</b>.'],['Adverbiale','einzelnes Wort: Wann? Wo?','<b>Gestern</b> regnete es.'],['Attribut','Was für ein …? (kein Satzglied)','der <b>freche</b> Hund']])+
 '<ul><li>Verschiebeprobe: Was zusammenbleibt, ist <b>ein</b> Satzglied.</li><li>Die Personalform steht im Aussagesatz an zweiter Stelle.</li><li>Ein Objekt steht nie im Nominativ.</li><li>Das Subjekt steht nicht immer an erster Stelle.</li></ul>';
GT.chapter({id:'verschiebe',teil:'satz',nr:3,title:'Verschiebeprobe und Satzglieder',big:'[Der Hund] [bellt] [laut]',desc:'Satzglieder durch Umstellen finden und bestimmen',
 ex:'«[Der Hund] [bellt] [laut].»',
 goals:['Ich finde Satzglieder mit der Verschiebeprobe und trenne sie im Satz.','Ich bestimme Subjekt und Prädikat.','Ich bestimme Akkusativ-, Dativ- und Genitivobjekt.','Ich erkenne Präpositionalgefüge und Adverbiale.','Ich erkenne Attribute und weiss, dass sie kein eigenes Satzglied sind.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{trenn:{icon:'✂️',label:'Satzglieder trennen',short:'Zwischen zwei Wörtern antippen',instr:'Tippe zwischen zwei Wörter, wo eine Satzgliedgrenze liegt.',hint:'Verschiebeprobe: Was beim Umstellen zusammenbleibt, ist ein Satzglied. Das Prädikat besteht manchmal aus zwei Teilen.',ref:'probe'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  glied:{label:'Satzglied bestimmen',short:'Subjekt, Prädikat, Objekte, Präpositionalgefüge, Adverbiale',instr:'Welches Satzglied ist markiert?',hint:'Stelle die passende Frage: Wer? Was tut? Wen? Wem? Wo? Wann?',ref:'subjekt'},
  frage:{label:'Fragen zu den Satzgliedern',short:'Welche Frage passt?',instr:'Wähle die richtige Frage.',hint:'Schau in der Theorie nach.',ref:'objekte'},
  probe:{label:'Verschiebeprobe',short:'Umstellen und Zählen',instr:'Wähle die richtige Antwort.',hint:'Was beim Umstellen zusammenbleibt, ist ein Satzglied.',ref:'probe'},
  umstellen:{icon:'🔀',label:'Satz umstellen',short:'Mit einem anderen Satzglied beginnen',instr:'Schreibe den umgestellten Satz.',hint:'Das Prädikat bleibt immer an zweiter Stelle.',ref:'probe'},
  markieren:{label:'Satzglied markieren',short:'Subjekt, Präpositionalgefüge, Attribut',instr:'Tippe die gesuchten Wörter an.',hint:'Stelle die passende Frage: Wer oder was? Was für ein …? Beginnt es mit einer Präposition?',ref:'subjekt'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
