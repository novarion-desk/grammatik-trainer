/* Kapitel Satzlehre 2: Verbale Teile und Rohform. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Rohform (Infinitiv)',sg2:'Verbale Teile im Satz',sg3:'Prädikat und Satzklammer',sg4:'Verbale Wortkette',sg5:'Verbale Teile benennen',sg6:'Fachbegriffe'};
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
['Was bilden die Teile des Verbs bei «Er hat gestern gelacht.»?',['die Satzklammer','die Satzverbindung','den Nebensatz','das Subjekt'],'die Satzklammer','Das Prädikat umschliesst die anderen Satzglieder wie eine Klammer.','sg3',2],
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


/* ---- NEU: Rohform des Satzes (verbale Wortkette) ---- */
const WK=[
['Welche verbale Wortkette gehört zu «Wir räumen den Klassenraum auf.»?',['Den Klassenraum aufräumen.','Wir den Klassenraum aufräumen.','Räumen den Klassenraum auf.','Den Klassenraum aufräumt.'],'Den Klassenraum aufräumen.','Subjekt weglassen, die Personalform in den Infinitiv setzen und die abgetrennte Vorsilbe wieder anhängen: aufräumen.','sg4',1],
['Welche verbale Wortkette gehört zu «Sie ruft ihre Freundin an.»?',['Ihre Freundin anrufen.','Sie ihre Freundin anrufen.','Ruft ihre Freundin an.','Ihre Freundin anruft.'],'Ihre Freundin anrufen.','Subjekt weg, Verb in den Infinitiv: anrufen.','sg4',1],
['Welche verbale Wortkette gehört zu «Er steht heute früh auf.»?',['Heute früh aufstehen.','Er heute früh aufstehen.','Steht heute früh auf.','Heute früh aufsteht.'],'Heute früh aufstehen.','Das Verb steht in der Rohform am Schluss: aufstehen.','sg4',1],
['Welche verbale Wortkette gehört zu «Die Schüler schalten ihre Handys aus.»?',['Die Handys ausschalten.','Die Schüler die Handys ausschalten.','Ausschalten die Handys.','Die Handys ausschaltet.'],'Die Handys ausschalten.','Subjekt weglassen, Infinitiv ans Ende.','sg4',2],
['Welche verbale Wortkette gehört zu «Ich habe das Heft zu Hause vergessen.»?',['Das Heft zu Hause vergessen haben.','Das Heft zu Hause vergessen.','Ich das Heft vergessen haben.','Vergessen das Heft zu Hause haben.'],'Das Heft zu Hause vergessen haben.','Die verbalen Teile werden zu einer Rohform: vergessen haben.','sg4',3],
['Welche verbale Wortkette gehört zu «Wir müssen heute früher gehen.»?',['Heute früher gehen müssen.','Heute früher müssen gehen.','Wir heute früher gehen müssen.','Müssen heute früher gehen.'],'Heute früher gehen müssen.','Modalverb und Rohform: «gehen müssen» am Schluss.','sg4',3],
['Welche verbale Wortkette gehört zu «Der Zug wird in Zürich kontrolliert.»?',['In Zürich kontrolliert werden.','In Zürich kontrollieren.','Der Zug in Zürich kontrolliert werden.','Wird in Zürich kontrolliert.'],'In Zürich kontrolliert werden.','Hilfsverb «werden» und Partizip bleiben als Teile erhalten.','sg4',3],
['Wozu braucht man verbale Wortketten oft?',['für Anleitungen und Hinweise','für Fragen','für Briefe an Freunde','für Nebensätze'],'für Anleitungen und Hinweise','Zum Beispiel «Vor Gebrauch schütteln.» Sie sind kurz und neutral.','sg4',1],
['Welches Satzglied lässt man weg, wenn man die verbale Wortkette bildet?',['das Subjekt','die Objekte','die Adverbiale','das Verb'],'das Subjekt','Man lässt das Subjekt weg und setzt das Verb in den Infinitiv.','sg4',1],
['Wie heisst die verbale Wortkette noch?',['Rohform des Satzes','Verschiebeprobe','Ersatzprobe','Artikelprobe'],'Rohform des Satzes','Die verbale Wortkette ist die Rohform eines Satzes: Infinitiv am Ende, ohne Subjekt.','sg4',1]
];
WK.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
const WI=[
["wortkette",1,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Wir räumen den Klassenraum auf.","Den Klassenraum aufräumen",[],false,"Subjekt weglassen, Personalform in den Infinitiv, Vorsilbe wieder anhängen."],
["wortkette",1,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Er steht heute früh auf.","Heute früh aufstehen",[],false,"Das Verb steht in der Rohform am Ende."],
["wortkette",1,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Sie ruft ihre Freundin an.","Ihre Freundin anrufen",[],false,"Subjekt weg, Verb in den Infinitiv."],
["wortkette",1,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Man bringt die Lehrbücher am Freitag zurück.","Die Lehrbücher am Freitag zurückbringen",["Am Freitag die Lehrbücher zurückbringen"],false,"Das Subjekt «man» entfällt. Der Infinitiv steht am Schluss."],
["wortkette",2,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Sie wartet vor dem Schulhaus auf den Bus.","Vor dem Schulhaus auf den Bus warten",["Auf den Bus vor dem Schulhaus warten"],false,"Subjekt weg, Infinitiv am Schluss."],
["wortkette",2,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Im Schulhaus rennt man nicht.","Im Schulhaus nicht rennen",[],false,"Auch das Wort «nicht» bleibt in der Wortkette."],
["wortkette",2,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Die Schüler schalten ihre Handys aus.","Die Handys ausschalten",["Ihre Handys ausschalten"],false,"Subjekt weglassen, Vorsilbe anhängen: ausschalten."],
["wortkette",3,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Wir müssen heute früher gehen.","Heute früher gehen müssen",[],false,"Beide verbalen Teile stehen am Ende: gehen müssen."],
["wortkette",3,"sg4","Bilde die verbale Wortkette (Rohform des Satzes).","Der Zug wird in Zürich kontrolliert.","In Zürich kontrolliert werden",[],false,"Partizip und «werden» bleiben: kontrolliert werden."],
["fach",1,"sg6","Rohform eines Satzes, zum Beispiel «den Hörer abnehmen».","Das heisst …","verbale Wortkette",["Verbale Wortkette","Die verbale Wortkette","Rohform des Satzes","Rohform eines Satzes"],true,"Die Rohform eines Satzes heisst verbale Wortkette oder Rohform des Satzes."],
["fach",1,"sg6","Anderes Wort für die verbale Wortkette.","Das andere Wort heisst …","Rohform des Satzes",["Rohform eines Satzes","Satzrohform","Die Rohform des Satzes"],true,"Rohform des Satzes = verbale Wortkette."],
["fach",1,"sg6","Anderes Wort für die Grundform des Verbs.","Das andere Wort heisst …","Infinitiv",["Der Infinitiv","Rohform"],true,"Infinitiv = Grundform = Rohform."],
["fach",1,"sg6","Beim Verb «fortfahren» ist «fort» ein …","«fort» ist ein …","Verbzusatz",["Der Verbzusatz"],true,"Der abgetrennte Teil heisst Verbzusatz: Er fährt fort."],
["fach",2,"sg6","Das konjugierte Verb heisst auch …","Das andere Wort heisst …","Personalform",["die Personalform","finites Verb","finite Form","finite Verbform"],true,"Personalform = konjugiertes Verb = finites Verb."],
["fach",2,"sg6","Verbale Teile sind: Personalform, Infinitiv, Verbzusatz und …","Das fehlende Wort heisst …","Partizip",["das Partizip","Partizip II"],true,"Verbale Teile: Personalform, Infinitiv, Partizip, Verbzusatz."]
];
WI.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'.</b> '+r[8]}));

const RS=[
['Wo steht das Verb in der Rohform eines Satzes?',['am Ende, in der Grundform','an zweiter Stelle, in der Personalform','an erster Stelle','es fehlt ganz'],'am Ende, in der Grundform','In der Rohform stehen alle Satzglieder lose beieinander, das Verb steht in der Grundform am Schluss.','sg4',1],
['Was ist in der Rohform eines Satzes noch <b>nicht</b> festgelegt?',['Zeitform, Person und Satzart','die Satzglieder','das Verb','der Inhalt'],'Zeitform, Person und Satzart','Erst durch das Konjugieren und das Verschieben entsteht ein Satz.','sg4',2],
['Aus der Rohform «mein Bruder – gestern – ein neues Fahrrad – kaufen» wird ein Aussagesatz im Präteritum:',['Mein Bruder kaufte gestern ein neues Fahrrad.','Mein Bruder gestern kaufte ein neues Fahrrad.','Mein Bruder kauft gestern ein neues Fahrrad.','Mein Bruder kaufen gestern ein neues Fahrrad.'],'Mein Bruder kaufte gestern ein neues Fahrrad.','Verb in die Personalform setzen (kaufte) und an die zweite Stelle stellen.','sg4',2],
['Aus derselben Rohform wird ein Fragesatz:',['Kaufte mein Bruder gestern ein neues Fahrrad?','Mein Bruder kaufte gestern ein neues Fahrrad.','Gestern mein Bruder kaufte ein neues Fahrrad?','Kaufen mein Bruder gestern ein neues Fahrrad?'],'Kaufte mein Bruder gestern ein neues Fahrrad?','Bei der Ja-Nein-Frage steht die Personalform an erster Stelle.','sg4',2],
['Aus derselben Rohform wird ein Nebensatz:',['…, weil mein Bruder gestern ein neues Fahrrad kaufte.','…, weil mein Bruder kaufte gestern ein neues Fahrrad.','…, weil kaufte mein Bruder gestern ein neues Fahrrad.','…, weil mein Bruder gestern kaufen ein neues Fahrrad.'],'…, weil mein Bruder gestern ein neues Fahrrad kaufte.','Im Nebensatz steht die Personalform am Schluss.','sg4',3],
['Wozu braucht man die Rohform eines Satzes?',['um alle Verbteile zu finden und die Grundform des Verbs herzuleiten','um Nomen zu zählen','um Satzzeichen zu setzen','um Fälle zu bestimmen'],'um alle Verbteile zu finden und die Grundform des Verbs herzuleiten','Sie hilft, den verbalen Teil eindeutig zu bestimmen.','sg4',2]
];
RS.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
[
["rohsatz",1,"sg4","Bilde aus der Rohform einen Aussagesatz im Präsens.","der Bus – heute – früher – abfahren","Der Bus fährt heute früher ab.",["Heute fährt der Bus früher ab."],false,"Personalform bilden (fährt), an die zweite Stelle setzen. «ab» bleibt am Schluss."],
["rohsatz",1,"sg4","Bilde aus der Rohform einen Aussagesatz im Präteritum.","mein Bruder – gestern – ein neues Fahrrad – kaufen","Mein Bruder kaufte gestern ein neues Fahrrad.",["Gestern kaufte mein Bruder ein neues Fahrrad."],false,"Personalform «kaufte» an zweiter Stelle."],
["rohsatz",2,"sg4","Bilde aus der Rohform einen Fragesatz im Präsens.","du – morgen – mitkommen","Kommst du morgen mit?",[],false,"Ja-Nein-Frage: Personalform an erster Stelle, «mit» bleibt am Schluss."],
["rohsatz",2,"sg4","Bilde aus der Rohform einen Aussagesatz im Perfekt.","wir – gestern – ins Kino – gehen","Wir sind gestern ins Kino gegangen.",["Gestern sind wir ins Kino gegangen."],false,"Perfekt: «sind» an zweiter Stelle, «gegangen» am Schluss."]
].forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---- NEU: verbale Teile benennen ---- */
const VB=[
['Welches Wort ist die <b>Personalform</b>? «Wir haben gestern gespielt.»',['haben','gestern','gespielt','Wir'],'haben','Die Personalform (das konjugierte Verb) ist «haben».','sg5',1],
['Welches Wort ist das <b>Partizip</b>? «Wir haben gestern gespielt.»',['gespielt','haben','gestern','Wir'],'gespielt','Das Partizip ist «gespielt».','sg5',1],
['Welches Wort ist der <b>Infinitiv</b>? «Sie will heute kommen.»',['kommen','will','heute','Sie'],'kommen','Der Infinitiv ist «kommen».','sg5',1],
['Welches Wort ist die <b>Personalform</b>? «Sie will heute kommen.»',['will','kommen','heute','Sie'],'will','Die Personalform ist «will».','sg5',1],
['Welches Wort ist der <b>Verbzusatz</b>? «Er steht früh auf.»',['auf','steht','früh','Er'],'auf','Der Verbzusatz «auf» gehört zum Verb «aufstehen».','sg5',1],
['Welches Wort ist der <b>Verbzusatz</b>? «Die Schüler schalten die Handys aus.»',['aus','schalten','Handys','Schüler'],'aus','«aus» gehört zum Verb «ausschalten».','sg5',2],
['Welches Wort ist die <b>Personalform</b>? «Der Bus fährt heute früher ab.»',['fährt','ab','früher','Bus'],'fährt','Die Personalform ist «fährt». «ab» ist der Verbzusatz.','sg5',2],
['Welches Wort ist das <b>Partizip</b>? «Er hat sein Heft vergessen.»',['vergessen','hat','Heft','sein'],'vergessen','Das Partizip ist «vergessen».','sg5',2],
['Welche verbalen Teile hat «Der Zug wird kontrolliert.»?',['Personalform «wird» und Partizip «kontrolliert»','nur «kontrolliert»','nur «wird»','Infinitiv und Verbzusatz'],'Personalform «wird» und Partizip «kontrolliert»','Beide Teile gehören zum Prädikat.','sg5',3],
['Verbale Teile haben einen festen Platz im Satz.',['Richtig','Falsch','Nur im Fragesatz','Nur im Nebensatz'],'Richtig','Die Personalform steht im Hauptsatz an zweiter Stelle, die anderen Teile am Schluss.','sg5',1],
['Was gehört zu den verbalen Teilen?',['Personalform, Infinitiv, Partizip, Verbzusatz','Nomen, Artikel, Adjektiv','Subjekt, Objekt, Attribut','Haupt- und Nebensatz'],'Personalform, Infinitiv, Partizip, Verbzusatz','Das sind die Teile des Prädikats.','sg5',1]
];
VB.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));

/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Er hat gestern gelacht.", "hat gelacht", [], false, "Zum Prädikat gehören alle Verbteile: «hat gelacht»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Sie steht früh auf.", "steht auf", [], false, "Zum Prädikat gehören alle Verbteile: «steht auf»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Wir haben Pizza gegessen.", "haben gegessen", [], false, "Zum Prädikat gehören alle Verbteile: «haben gegessen»."], ["praedikat", 1, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Tim ist gestern nach Bern gefahren.", "ist gefahren", [], false, "Zum Prädikat gehören alle Verbteile: «ist gefahren»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Sie ruft ihre Freundin an.", "ruft an", [], false, "Zum Prädikat gehören alle Verbteile: «ruft an»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Er kann gut singen.", "kann singen", [], false, "Zum Prädikat gehören alle Verbteile: «kann singen»."], ["praedikat", 2, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Ich will heute Fussball spielen.", "will spielen", [], false, "Zum Prädikat gehören alle Verbteile: «will spielen»."], ["praedikat", 3, "sg2", "Schreibe das ganze Prädikat (alle Verbteile).", "Das Kind wird morgen abgeholt.", "wird abgeholt", [], false, "Zum Prädikat gehören alle Verbteile: «wird abgeholt»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'rohform',title:'Rohform (Infinitiv)',short:'Rohform',min:8,note:'Rohform = Infinitiv = Grundform des Verbs. Bildung: Stamm + -en. Achtung: Die «Rohform eines Satzes» heisst verbale Wortkette (siehe eigene Folie).',
 html:()=>'<p class="lead">Die <b>Rohform</b> (Infinitiv) ist die Grundform des Verbs. So steht es im Wörterbuch.</p>'+T(['Satz','Rohform'],[['Sie lacht.','lachen'],['Er spielte.','spielen'],['Wir sind gegangen.','gehen'],['Er steht früh auf.','aufstehen'],['Du liest.','lesen']])+
 '<div class="callout">Die Rohform endet fast immer auf <b>-en</b> (oder -n). Bei trennbaren Verben schreibt man sie <b>zusammen</b>: aufstehen.</div>'},
{id:'begriffe',title:'Die verbalen Teile und ihre Namen',short:'Verbale Teile benennen',min:8,note:'Vier Namen für die Verbteile. Personalform = konjugiertes Verb = finites Verb. Die Personalform hat im Hauptsatz einen festen Platz (zweite Stelle).',
 html:()=>T(['Verbaler Teil','Auch genannt','Beispiel'],[['Personalform','konjugiertes Verb, finites Verb','Wir <b>haben</b> gespielt.'],['Infinitiv','Rohform, Grundform','Sie will <b>kommen</b>.'],['Partizip','Mittelwort','Wir haben <b>gespielt</b>.'],['Verbzusatz','abgetrennte Vorsilbe','Er steht früh <b>auf</b>.']])+
 '<div class="callout">Verbale Teile haben einen <b>festen Platz</b>: Die Personalform steht an zweiter Stelle, die übrigen Teile stehen am Schluss.</div>'},
{id:'teile',title:'Verbale Teile im Satz',short:'Verbale Teile',min:10,note:'Das Prädikat kann aus einem, zwei oder drei Teilen bestehen. Alle Teile gehören zum Prädikat und zusammen.',
 html:()=>'<p class="lead">Das Prädikat besteht aus <b>einem oder mehreren verbalen Teilen</b>.</p>'+
 T(['Fall','Beispiel','Teile'],[['Einfaches Verb','Anna <b>lacht</b>.','1'],['Hilfsverb + Partizip II','Anna <b>hat</b> gestern <b>gelacht</b>.','2'],['Trennbares Verb','Er <b>steht</b> früh <b>auf</b>.','2'],['Modalverb + Rohform','Sie <b>will</b> heute <b>kommen</b>.','2'],['werden + Rohform','Es <b>wird</b> regnen.','2'],['Hilfsverb + Rohform + Rohform','Sie <b>hat</b> <b>kommen</b> <b>wollen</b>.','3']])+
 '<div class="callout"><b>Achtung:</b> Zwischen den Teilen können andere Satzglieder stehen: «Er <b>hat</b> gestern im Park Fussball <b>gespielt</b>.»</div>'},
{id:'wortkette',title:'Die Rohform des Satzes (verbale Wortkette)',short:'Rohform des Satzes',min:12,note:'Rohform eines Satzes (Satzrohform): die noch nicht ausformulierte Grundstruktur. Alle Satzglieder stehen lose beieinander, das Verb steht in der Grundform am Ende. Zeitform, Person und Satzart sind noch nicht festgelegt. Lässt man das Subjekt weg, entsteht die verbale Wortkette (Anleitungen, Hinweise). Nutzen: verbale Teile bestimmen, Grundform herleiten, zeigen, dass die Personalform die Wortstellung steuert.',
 html:()=>'<p class="lead">Die <b>Rohform eines Satzes</b> ist die Grundstruktur: Alle Satzglieder stehen lose beieinander, das Verb steht in der <b>Grundform am Ende</b>. Zeitform, Person und Satzart sind noch nicht festgelegt.</p>'+
 '<div class="card"><p><b>Rohform:</b> mein Bruder – gestern – ein neues Fahrrad – kaufen</p></div>'+
 T(['Satzart','Satz'],[['Aussagesatz (Präteritum)','Mein Bruder <b>kaufte</b> gestern ein neues Fahrrad.'],['Aussagesatz (umgestellt)','Gestern <b>kauft</b> mein Bruder ein neues Fahrrad.'],['Fragesatz','<b>Kaufte</b> mein Bruder gestern ein neues Fahrrad?'],['Nebensatz','…, weil mein Bruder gestern ein neues Fahrrad <b>kaufte</b>.']])+
 '<div class="callout">Erst durch das <b>Konjugieren</b> (Personalform bilden) und das <b>Verschieben</b> an die richtige Stelle entsteht ein vollständiger Satz. Die Position der Personalform steuert die Wortstellung: 1., 2. oder letzte Stelle.</div>'+
 '<h3>Die verbale Wortkette</h3><p>Lässt du das <b>Subjekt</b> weg und setzt das Verb in den <b>Infinitiv</b>, erhältst du die <b>verbale Wortkette</b> (auch hier: Rohform des Satzes). Man braucht sie für <b>Anleitungen und Hinweise</b>.</p>'+
 T(['Satz','Verbale Wortkette'],[['Der Hausmeister rollte den Teppich aus.','Den Teppich ausrollen.'],['Wir räumen den Klassenraum auf.','Den Klassenraum aufräumen.'],['Der Zug wird in Zürich kontrolliert.','In Zürich kontrolliert werden.']])},
{id:'klammer',title:'Die Satzklammer',short:'Satzklammer',lv:2,min:8,note:'Ab Niveau B. Die Satzklammer ist ein Bild: Der erste Teil des Prädikats steht an Position 2, der zweite am Ende. Dazwischen das Mittelfeld.',
 html:()=>'<p class="lead">Die Teile des Prädikats bilden eine <b>Klammer</b> um den Rest des Satzes.</p>'+
 '<div class="card"><p style="font-size:1.1rem">Er <b>hat</b> gestern im Park mit seinem Freund Fussball <b>gespielt</b>.</p><p class="muted">Erster Teil an Position 2 · Mittelfeld · zweiter Teil am Satzende</p></div>'+
 T(['Satzart','Wo steht das Verb?'],[['Aussagesatz','Personalform an zweiter Stelle, weitere Teile am Ende'],['Ja-/Nein-Frage','Personalform am Satzanfang'],['Nebensatz (weil, dass …)','Alle Verbteile am Satzende']])},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:6,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Ein kleiner Tippfehler zählt nicht als falsch, wird aber erwähnt.',
 html:()=>T(['Begriff','Bedeutung'],[['Personalform','konjugiertes (finites) Verb'],['Infinitiv','Grundform, Rohform des Verbs'],['Partizip','Verbform wie gespielt, gesehen'],['Verbzusatz','abgetrennte Vorsilbe (fortfahren: fort)'],['Rohform des Satzes','Satz mit allen Satzgliedern und dem Verb in der Grundform am Ende; ohne Subjekt: verbale Wortkette']])},
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
 ['Bilde die verbale Wortkette (Rohform ohne Subjekt): «Wir räumen den Klassenraum auf.»','Den Klassenraum aufräumen.',1],
 ['Nenne die verbalen Teile: «Er hat gestern gelacht.»','Personalform: hat · Partizip: gelacht',1],
 ['Schreibe die Rohform: sie lacht, wir gingen, er hat gelesen, du fährst.','lachen · gehen · lesen · fahren',1],
 ['Unterstreiche alle Teile des Prädikats: «Er hat gestern lange geschlafen.»','hat · geschlafen',1],
 ['Unterstreiche das Prädikat: «Sie steht jeden Morgen um sechs Uhr auf.»','steht · auf',1],
 ['Unterstreiche das Prädikat: «Wir wollen morgen ins Kino gehen.»','wollen · gehen',1],
 ['Wie viele Teile hat das Prädikat? «Sie hat gestern kommen wollen.»','3 Teile',2],
 ['Bilde einen Satz mit dem Verb «aufstehen» im Präsens.','Beispiel: Ich stehe um sieben Uhr auf.',2],
 ['Wo steht die Personalform? «Gestern hat mein Bruder lange geschlafen.»','An zweiter Stelle: hat. Der weitere Verbteil «geschlafen» steht am Schluss.',2]
];
const merk=()=>T(['Thema','Merksatz'],[['Rohform','Grundform des Verbs: lachen, gehen, aufstehen. Endet meist auf -en.'],['Rohform des Satzes','Alle Satzglieder lose, Verb in der Grundform am Ende. Ohne Subjekt: verbale Wortkette (Den Teppich ausrollen).'],['Verbale Teile','Personalform, Infinitiv, Partizip, Verbzusatz. Sie haben einen festen Platz.'],['Prädikat','Sagt, was geschieht. Besteht aus einem oder mehreren verbalen Teilen.'],['Mehrere Teile','haben/sein + Partizip II · Modalverb + Rohform · trennbares Verb · werden + Rohform'],['Satzklammer','Die Teile des Prädikats umschliessen den Rest des Satzes.'],['Stellung','Aussagesatz: Verb an Position 2 · Nebensatz: Verb am Ende']]);
const UEM={'rohform':{types:'rohform',cats:'sg1'},'teile':{types:'zaehlen',cats:'sg2'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{basic:6,konj:1},opt:{pron:.3,adj:.2,det:{def:.5,indef:.3,poss:.2}},classes:[{gl:'Verbale Teile',cats:['sg2'],lv:1}],perClass:34});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Wie lautet die Rohform von «wir sind gegangen»?',['gehen','gegangen','gingen','geht'],'gehen','Die Rohform (Infinitiv) lautet «gehen».',1],
['Wie lautet die Rohform von «ihr habt gelesen»?',['lesen','gelesen','last','liest'],'lesen','Die Rohform (Infinitiv) lautet «lesen».',1],
['Wie lautet die Rohform von «du kommst an»?',['ankommen','kommen','angekommen','an'],'ankommen','Das Verb heisst «ankommen». Die Vorsilbe «an» gehört dazu.',2],
['Wie lautet die Rohform von «sie ruft an»?',['anrufen','rufen','angerufen','ruft'],'anrufen','Das Verb heisst «anrufen».',2],
['Wie lautet die Rohform von «er steht auf»?',['aufstehen','stehen','aufgestanden','steht'],'aufstehen','Das Verb heisst «aufstehen».',2],
['Wie lautet die Rohform von «ich habe gewonnen»?',['gewinnen','gewonnen','gewann','gewinne'],'gewinnen','Die Rohform lautet «gewinnen».',2],
['Wie lautet die Rohform von «wir fahren ab»?',['abfahren','fahren','abgefahren','fuhren'],'abfahren','Das Verb heisst «abfahren».',2],
['Wie lautet die Rohform von «sie wird kommen»?',['kommen','werden','gekommen','kommt'],'kommen','«wird» ist das Hilfsverb. Das Verb heisst «kommen».',3]
].forEach(r=>task.push({typ:'rohform',stufe:r[4],lv:r[4]===3?2:1,cats:['sg1'],prompt:r[0],opts:r[1],answer:r[2],why:r[3]}));
[
['Wie viele Teile hat das Prädikat? «Anna hat gelacht.»',['2','1','3'],'2','Zwei Teile: hat … gelacht.',1],
['Wie viele Teile hat das Prädikat? «Tim steht früh auf.»',['2','1','3'],'2','Zwei Teile: steht … auf.',2],
['Wie viele Teile hat das Prädikat? «Wir spielen Fussball.»',['1','2','3'],'1','Ein Teil: spielen.',1],
['Wie viele Teile hat das Prädikat? «Mia hat das Buch gelesen.»',['2','1','3'],'2','Zwei Teile: hat … gelesen.',1],
['Wie viele Teile hat das Prädikat? «Der Zug fährt pünktlich ab.»',['2','1','3'],'2','Zwei Teile: fährt … ab.',2],
['Wie viele Teile hat das Prädikat? «Du musst heute früh aufstehen.»',['2','1','3'],'2','Zwei Teile: musst … aufstehen.',2],
['Wie viele Teile hat das Prädikat? «Ich werde morgen kommen.»',['2','1','3'],'2','Zwei Teile: werde … kommen.',2],
['Wie viele Teile hat das Prädikat? «Es regnet.»',['1','2','3'],'1','Ein Teil: regnet.',1]
].forEach(z=>task.push({typ:'zaehlen',stufe:z[4],lv:z[4]===3?2:1,cats:['sg2'],prompt:z[0],opts:z[1],answer:z[2],why:z[3]}));
[
['Mia *hat gestern ein Buch *gelesen.',1,'Das Prädikat: «hat … gelesen».'],
['Der Zug *fährt pünktlich *ab.',1,'Das Prädikat: «fährt … ab».'],
['Tim *steht früh *auf.',1,'Das Prädikat: «steht … auf».'],
['Wir *haben im Park *gespielt.',1,'Das Prädikat: «haben … gespielt».'],
['Ich *werde morgen *kommen.',2,'Das Prädikat: «werde … kommen».'],
['Er *kann gut *schwimmen.',2,'Das Prädikat: «kann … schwimmen».']
].forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg2'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Teile des Prädikats an.',why:m[2]});
});
[
['Wie nennt man die Rohform eines Verbs noch?',['Infinitiv','Partizip','Personalform','Imperativ'],'Infinitiv','Rohform und Infinitiv sind dasselbe: «lachen».','sg1',1],
['Welcher Teil des Prädikats steht im Aussagesatz an zweiter Stelle?',['die Personalform','das Partizip','der Infinitiv','die Vorsilbe'],'die Personalform','Beispiel: «Mia <b>hat</b> gestern gelacht.»','sg3',1],
['Wo steht das Partizip II im Aussagesatz mit «haben»?',['am Satzende','an zweiter Stelle','am Satzanfang','direkt nach dem Subjekt'],'am Satzende','Satzklammer: «Mia hat gestern ein Buch gelesen.»','sg3',2],
['Wie nennt man «hat … gelesen» zusammen?',['das Prädikat (verbale Wortkette)','das Subjekt','das Objekt','die Adverbiale'],'das Prädikat (verbale Wortkette)','Beide Teile bilden zusammen das Prädikat.','sg4',2],
['Was ist bei «Der Zug fährt ab.» der abgetrennte Teil?',['ab','fährt','Zug','der'],'ab','Das Verb «abfahren» trennt sich: «fährt … ab».','sg2',2],
['Welche Wortart ist «hat» in «Mia hat gelacht.»?',['Hilfsverb','Nomen','Adjektiv','Pronomen'],'Hilfsverb','«hat» hilft, die Vergangenheit (Perfekt) zu bilden.','sg5',1]
].forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));
task.push=_p0;
})();

GT.chapter({id:'verbale',teil:'satz',nr:4,title:'Verbale Teile und Rohform des Satzes',big:'Er hat gestern gelacht',desc:'Verbale Teile benennen, Rohform des Satzes und verbale Wortkette bilden',
 ex:'«Er '+mk('verb','hat')+' gestern '+mk('verb','gelacht')+'.»',
 goals:['Ich bilde die Rohform eines Verbs.','Ich nenne die verbalen Teile: Personalform, Infinitiv, Partizip, Verbzusatz.','Ich finde alle verbalen Teile im Satz.','Ich weiss, was die Rohform eines Satzes ist, und kann sie bilden (auch als verbale Wortkette).','Ich erkenne die Satzklammer.'],
  write:['rohform'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{rohform:{winstr:'Schreibe die Rohform.',label:'Rohform bilden',short:'Infinitiv',instr:'Wähle die richtige Rohform.',hint:'Die Rohform endet auf -en. Bei trennbaren Verben zusammenschreiben.',ref:'rohform'},
  zaehlen:{label:'Verbale Teile zählen',short:'Wie viele Teile hat das Prädikat?',instr:'Wähle die richtige Zahl.',hint:'Suche Hilfsverb, Modalverb, Partizip, Rohform und abgetrennte Vorsilbe.',ref:'teile'},
  praedikat:{icon:'✏️',label:'Prädikat schreiben',short:'Alle Verbteile im Satz notieren',instr:'Schreibe alle Verbteile in der Reihenfolge des Satzes.',hint:'Suche Hilfsverb, Modalverb, Partizip, Infinitiv und abgetrennte Vorsilbe.',ref:'teile'},
  rohsatz:{icon:'🧩',label:'Aus der Rohform einen Satz bilden',short:'Personalform bilden und verschieben',instr:'Bilde den Satz.',hint:'Verb konjugieren und an die richtige Stelle setzen.',ref:'wortkette'},
  wortkette:{icon:'⛓️',label:'Verbale Wortkette bilden',short:'Rohform des Satzes',instr:'Schreibe die verbale Wortkette.',winstr:'Schreibe die verbale Wortkette.',hint:'Subjekt weglassen, Verb in den Infinitiv, ans Ende stellen, Vorsilbe anhängen.',ref:'wortkette'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'},
  wissen:{label:'Wissen',short:'Verbale Teile, Wortkette und Satzklammer',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'klammer'},
  markieren:{label:'Prädikat markieren',short:'Alle Verbteile finden',instr:'Tippe alle Teile des Prädikats an.',hint:'Suche alle Verbformen im Satz.',ref:'teile'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
