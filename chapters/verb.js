/* Kapitel Wortlehre 4: Verb. Registriert sich beim Trainer (GT). Konjunktiv folgt als eigenes Thema. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,lv=GT.lv,tryW=GT.tryW,reveal=GT.reveal,T=GT.table;
const C={sg1:'Personalformen',sg2:'Zeitformen',sg3:'Stammformen',sg4:'Verbarten und Befehlsform'};
const task=[];
const brk=s=>s.replace(/\[(.+?)\]/g,'<span class="hl">$1</span>');
const ZN=['Präsens','Präteritum','Perfekt','Plusquamperfekt','Futur I'];

/* Zeitformen bestimmen: [Satz, Zeitform, Stufe, Hinweis] */
const Z=[
['Ich [lache] laut.',0,1,'Gegenwart: ich lache.'],['Sie [lachte] laut.',1,1,'Stamm + -te: lachte.'],['Er [hat gelacht].',2,1,'haben + Partizip II.'],['Wir [werden lachen].',4,1,'werden + Infinitiv.'],['Es [regnet].',0,1,'Gegenwart.'],['Gestern [regnete] es.',1,1,'Vergangenheit mit Stamm + -te.'],['Ich [habe gegessen].',2,1,'haben + Partizip II.'],['Sie [wird kommen].',4,1,'werden + Infinitiv.'],['Er [spielt] Fussball.',0,1,'Gegenwart.'],['Wir [spielten] Fussball.',1,1,'Stamm + -ten.'],['Wir [haben gespielt].',2,1,'haben + Partizip II.'],['Du [singst] schön.',0,1,'Gegenwart.'],['Ihr [sangt] im Chor.',1,1,'Ablaut: singen – sang.'],['Sie [sind gelaufen].',2,1,'sein + Partizip II.'],
['Er [hatte gegessen], bevor wir ankamen.',3,2,'hatte + Partizip II: Es war schon vorher passiert.'],['Ich [bin] gestern [gerannt].',2,2,'sein + Partizip II ist ein Perfekt.'],['Sie [ist] schon [abgereist].',2,2,'sein + Partizip II.'],['Er [wird] bald [schlafen].',4,2,'werden + Infinitiv.'],['Wir [assen] Pizza.',1,2,'Ablaut: essen – ass.'],['Sie [hatten] das Haus [gebaut].',3,2,'hatten + Partizip II.'],['Es [hatte] stark [geschneit].',3,2,'hatte + Partizip II.'],['Ich [werde] dich morgen [anrufen].',4,2,'werden + Infinitiv.'],['Du [hast] das Buch [gelesen].',2,2,'haben + Partizip II.'],['Wir [fuhren] nach Bern.',1,2,'Ablaut: fahren – fuhr.'],['Sie [kamen] spät.',1,2,'Ablaut: kommen – kam.'],['Er [steht] früh [auf].',0,2,'Gegenwart: aufstehen, getrennt.'],['Er [stand] früh [auf].',1,2,'Vergangenheit: aufstehen – stand auf.'],
['Nachdem er [gegessen hatte], ging er hinaus.',3,3,'hatte + Partizip II: früher als «ging».'],['Morgen [fahren] wir nach Bern.',0,3,'Das Präsens kann auch Zukünftiges ausdrücken. «morgen» zeigt die Zukunft.'],['Nächste Woche [habe] ich Geburtstag.',0,3,'Präsens mit Zukunftsbedeutung.'],['Er [wird] jetzt wohl zu Hause [sein].',4,3,'werden + Infinitiv. Hier drückt es eine Vermutung aus.'],['Als wir ankamen, [hatte] es schon [aufgehört].',3,3,'hatte + Partizip II.']
];
Z.forEach(z=>task.push({typ:'zeit',stufe:z[2],lv:z[2]===3?2:1,cats:['sg2'],sent:brk(z[0]),opts:ZN,answer:ZN[z[1]],why:'<b>'+ZN[z[1]]+'.</b> '+z[3]}));

/* Personalformen: [Satz, Antwort, falsch, Stufe] */
const P=[
['Ich ___ (lachen) laut.','lache',['lachst','lacht','lachen'],1],['Du ___ (lachen) laut.','lachst',['lache','lacht','lachen'],1],['Er ___ (lachen) laut.','lacht',['lache','lachst','lachen'],1],['Wir ___ (spielen) Fussball.','spielen',['spiele','spielst','spielt'],1],['Ihr ___ (spielen) Fussball.','spielt',['spiele','spielst','spielen'],1],['Die Kinder ___ (singen).','singen',['singe','singst','singt'],1],['Du ___ (gehen) nach Hause.','gehst',['gehe','geht','gehen'],1],
['Ich ___ (sein) müde.','bin',['bist','ist','sind'],1],['Du ___ (sein) müde.','bist',['ist','bin','sind'],1],['Wir ___ (sein) müde.','sind',['seid','bin','ist'],1],['Ihr ___ (sein) müde.','seid',['sind','bist','ist'],2],['Er ___ (haben) Hunger.','hat',['habt','hast','haben'],1],['Du ___ (haben) Hunger.','hast',['hat','habe','habt'],1],['Ihr ___ (haben) Hunger.','habt',['hat','hast','haben'],2],
['Er ___ (lesen) ein Buch.','liest',['lest','lesst','lesen'],2],['Du ___ (lesen) ein Buch.','liest',['lest','lesst','lesen'],2],['Er ___ (fahren) nach Bern.','fährt',['fahrt','fahrst','fähren'],2],['Du ___ (fahren) nach Bern.','fährst',['fahrst','fährt','fahren'],2],['Du ___ (essen) Pizza.','isst',['esst','essen','isse'],2],['Er ___ (sehen) den Hund.','sieht',['sehe','seht','siehst'],2],['Meine Schwester ___ (werden) Ärztin.','wird',['werde','wirst','werden'],2],['Du ___ (werden) müde.','wirst',['wird','werde','werdet'],2],['Er ___ (nehmen) den Zug.','nimmt',['nehmt','nehme','nehmst'],2],['Du ___ (nehmen) den Zug.','nimmst',['nimmt','nehmst','nehme'],2],
['Er ___ (können) schwimmen.','kann',['kannt','könnt','können'],3],['Du ___ (müssen) lernen.','musst',['muss','müsst','müssen'],3],['Ich ___ (wollen) gehen.','will',['willst','wollt','wollen'],3]
];
P.forEach(p=>task.push({typ:'person',stufe:p[3],lv:p[3]===3?2:1,cats:['sg1'],sent:p[0].replace('___','<span class="gap">_____</span>'),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> Die Personalform richtet sich nach der Person (ich, du, er …) und der Zahl.'}));

/* Stammformen: [Infinitiv, Präteritum, Partizip II, falsche Prät., falsche PII, Stufe] */
const S=[
['spielen','spielte','gespielt',['spielt','spielete','spiel'],['gespielen','gespielet','gespiel'],1],['lachen','lachte','gelacht',['lacht','lachete','lach'],['gelachen','gelachet','gelach'],1],['kaufen','kaufte','gekauft',['kauft','kaufete','kauf'],['gekaufen','gekaufet','gekauf'],1],
['gehen','ging','gegangen',['gehte','gangte','ginget'],['gegeht','gegangt','gegehen'],1],['singen','sang','gesungen',['singte','sung','sangte'],['gesingt','gesang','gesangen'],1],['kommen','kam','gekommen',['kommte','kamte','kamm'],['gekommt','gekam','gekamt'],1],['essen','ass','gegessen',['esste','asste','ase'],['gegesst','gegass','geessen'],2],['schreiben','schrieb','geschrieben',['schreibte','schriebte','schribe'],['geschreibt','geschrieb','geschriebt'],2],['lesen','las','gelesen',['leste','laste','lasste'],['gelest','gelas','geliesen'],2],['fahren','fuhr','gefahren',['fahrte','fahr','fuhrte'],['gefahrt','gefuhr','gefahrte'],2],['nehmen','nahm','genommen',['nehmte','nam','nahmte'],['genehmt','genahm','genommt'],2],['sehen','sah','gesehen',['sehte','siehte','sahte'],['gesehnt','gesah','gesieht'],2],['trinken','trank','getrunken',['trinkte','trunk','trankte'],['getrinkt','getrank','getrinken'],2],['laufen','lief','gelaufen',['laufte','lauf','liefte'],['gelauft','gelief','geloffen'],2],['schwimmen','schwamm','geschwommen',['schwimmte','schwomm','schwammte'],['geschwimmt','geschwamm','geschwammen'],2],['geben','gab','gegeben',['gebte','gabte','gib'],['gegebt','gegab','gegaben'],2],['helfen','half','geholfen',['helfte','halfte','hilfte'],['gehelft','gehalf','gehilft'],2],
['besuchen','besuchte','besucht',['besuchet','gebesuchte','besuchete'],['gebesucht','gebesuchen','besuchen'],3],['aufstehen','stand auf','aufgestanden',['aufstand','stehte auf','aufstehte'],['aufgestehen','gestandenauf','aufgestandt'],3],['anrufen','rief an','angerufen',['anrief','rufte an','anrufte'],['geanrufen','angerufte','angerufet'],3]
];
const SEIN={gehen:1,kommen:1,fahren:1,laufen:1,schwimmen:1,aufstehen:1};
S.forEach(s=>{
  task.push({typ:'stamm',stufe:s[5],lv:s[5]===3?2:1,cats:['sg3'],prompt:'Wie lautet das <b>Präteritum</b> von «'+s[0]+'»? (er/sie/es …)',opts:[s[1]].concat(s[3]),answer:s[1],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b> Präteritum: «er '+s[1]+'».'});
  task.push({typ:'stamm',stufe:s[5],lv:s[5]===3?2:1,cats:['sg3'],prompt:'Wie lautet das <b>Partizip II</b> von «'+s[0]+'»?',opts:[s[2]].concat(s[4]),answer:s[2],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b> Perfekt: «er '+(SEIN[s[0]]?'ist ':'hat ')+s[2]+'».'});
});

/* Verbteile markieren */
const M=[
['Die Katze *schläft.',1,'Ein einziges Verb: schläft.'],['Wir *spielen draussen.',1,'Verb: spielen. «draussen» ist kein Verb.'],['Wir *haben gestern Fussball *gespielt.',1,'Zwei Teile des Verbs: haben + gespielt (Perfekt).'],
['Er *steht früh *auf.',2,'Trennbares Verb «aufstehen»: steht + auf.'],['Sie *will heute nicht *kommen.',2,'Modalverb «will» + Infinitiv «kommen».'],['Ich *bin gestern nach Bern *gefahren.',2,'sein + gefahren (Perfekt).'],['Er *wird bald *schlafen.',2,'werden + schlafen (Futur I).'],
['Sie *hatte das Buch schon *gelesen.',3,'hatte + gelesen (Plusquamperfekt).'],['Wir *müssen morgen früh *aufstehen.',3,'Modalverb «müssen» + Infinitiv «aufstehen».']
];
M.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens,targets,instr:'Tippe alle Teile des Verbs an.',why:m[2]});
});

/* Einsetzen: Verb in Klammer in die verlangte Zeitform setzen (selber schreiben). [Satz mit ___, Infinitiv, Zeit, Antwort, Stufe, Hinweis, accept[]] */
const E=[
['Gestern ___ wir im Garten. (spielen)','Präteritum','spielten',1,'Stamm spiel- + -ten.'],
['Er ___ gern Fussball. (spielen)','Präsens','spielt',1,'er spielt.'],
['Sie ___ gestern einen Kuchen. (backen)','Präteritum','backte',1,'backen – backte (auch: buk).',['buk']],
['Wir ___ morgen nach Bern ___. (fahren)','Futur I','werden fahren',1,'werden + Infinitiv.'],
['Ich ___ gestern lange ___. (schlafen)','Perfekt','habe geschlafen',1,'haben + Partizip II.'],
['Du ___ heute sehr früh ___. (aufstehen)','Präsens','stehst auf',2,'Trennbares Verb: du stehst … auf.'],
['Sie ___ schon nach Hause ___. (gehen)','Perfekt','ist gegangen',2,'gehen bildet das Perfekt mit sein.'],
['Er ___ das Buch schon ___, bevor der Film begann. (lesen)','Plusquamperfekt','hatte gelesen',2,'hatte + Partizip II.'],
['Gestern ___ es den ganzen Tag. (regnen)','Präteritum','regnete',1,'Stamm regn- + -ete.'],
['Wir ___ Pizza. (essen)','Präteritum','assen',2,'essen – ass – gegessen.'],
['Nächstes Jahr ___ ich in die Lehre ___. (gehen)','Futur I','werde gehen',2,'werden + Infinitiv.'],
['Sie ___ ein Lied ___. (singen)','Perfekt','hat gesungen',2,'singen – sang – gesungen.'],
['Als ich ankam, ___ der Zug schon ___. (abfahren)','Plusquamperfekt','war abgefahren',3,'war + Partizip II: Der Zug fuhr früher ab.'],
['Nachdem sie gegessen ___, gingen sie hinaus. (haben)','Plusquamperfekt','hatten',3,'Nachdem sie gegessen hatten …: Plusquamperfekt von essen.'],
['Er ___ mir gestern den Weg. (zeigen)','Präteritum','zeigte',1,'Stamm zeig- + -te.'],
['Ihr ___ das Spiel gewonnen. (haben)','Perfekt','habt',1,'Hilfsverb haben: ihr habt gewonnen.'],
['Der Hund ___ im Garten. (bellen)','Präteritum','bellte',1,'Stamm bell- + -te.'],
['Sie ___ gestern spät nach Hause. (kommen)','Präteritum','kam',1,'kommen – kam – gekommen.']
];
E.forEach(e=>{
  // Sätze mit zwei Lücken: Antwort ist beide Wörter, wir zeigen eine Lücke
  const sent=e[0].replace(/\((.+?)\)/,'<i class="muted">($1)</i>').replace(/___/g,'<span class="gap">_____</span>');
  const ev=e[0].match(/___/g).length;
  let ans=e[2],pr=e[1];
  task.push({typ:'einsetzen',stufe:e[3],lv:e[3]===3?2:1,cats:['sg2'],input:true,accept:e[5]||[],prompt:'Setze das Verb in die Zeitform <b>'+pr+'</b>. '+(ev>1||/ /.test(ans)?'Schreibe alle fehlenden Wörter.':''),sent:sent,answer:ans,why:'<b>'+ans+'.</b> '+e[4]});
});

/* Umformen: ganzen Satz in andere Zeit schreiben. [Satz, Zielzeit, Lösung, Stufe, Hinweis, accept[]] */
const U=[
['Ich spiele Fussball.','Präteritum','Ich spielte Fussball.',1,'spielen: Stamm + -te.'],
['Sie lacht laut.','Perfekt','Sie hat laut gelacht.',1,'haben + Partizip II.'],
['Wir gehen nach Hause.','Präteritum','Wir gingen nach Hause.',1,'gehen – ging.'],
['Er kocht Suppe.','Perfekt','Er hat Suppe gekocht.',1,'haben + gekocht.'],
['Der Hund bellt.','Futur I','Der Hund wird bellen.',1,'werden + Infinitiv.'],
['Ich lese ein Buch.','Perfekt','Ich habe ein Buch gelesen.',1,'haben + Partizip II.'],
['Sie fahren nach Zürich.','Perfekt','Sie sind nach Zürich gefahren.',2,'fahren bildet das Perfekt mit sein.'],
['Er isst einen Apfel.','Präteritum','Er ass einen Apfel.',2,'essen – ass.'],
['Wir schreiben einen Brief.','Perfekt','Wir haben einen Brief geschrieben.',2,'schreiben – geschrieben.'],
['Sie kommt zu spät.','Präteritum','Sie kam zu spät.',2,'kommen – kam.'],
['Ich sehe den Film.','Futur I','Ich werde den Film sehen.',2,'werden + Infinitiv.'],
['Er steht früh auf.','Präteritum','Er stand früh auf.',3,'Trennbares Verb: stand … auf.'],
['Sie fährt mit dem Bus.','Plusquamperfekt','Sie war mit dem Bus gefahren.',3,'war + Partizip II.'],
['Wir spielen draussen.','Plusquamperfekt','Wir hatten draussen gespielt.',3,'hatten + Partizip II.'],
['Er bringt das Buch zurück.','Perfekt','Er hat das Buch zurückgebracht.',3,'zurückbringen – zurückgebracht.']
];
U.forEach(u=>task.push({typ:'umformen',stufe:u[3],lv:u[3]===3?2:1,cats:['sg2'],input:true,accept:u[5]||[],prompt:'Schreibe den Satz im <b>'+u[1]+'</b>.',sent:u[0],answer:u[2],why:'<b>'+u[2]+'</b> '+u[4]}));

/* Zeit wählen: Welche Zeitform passt zur Situation? */
const ZW=[
['Du erzählst deiner Kollegin mündlich, was du gestern gemacht hast.',['Perfekt','Präsens','Futur I','Plusquamperfekt'],'Perfekt','Mündlich nehmen wir fürs Vergangene meist das Perfekt.',1],
['Du schreibst eine Geschichte für den Deutschunterricht.',['Präteritum','Perfekt','Futur I','Präsens'],'Präteritum','In Geschichten steht die Handlung meist im Präteritum.',1],
['Du sagst, was du am Wochenende vorhast.',['Futur I','Präteritum','Plusquamperfekt','Perfekt'],'Futur I','Zukünftiges: werden + Infinitiv. (Oft reicht auch das Präsens mit «morgen».)',1],
['Du beschreibst, was gerade passiert.',['Präsens','Perfekt','Präteritum','Futur I'],'Präsens','Das Präsens beschreibt die Gegenwart.',1],
['Etwas ist <b>vor</b> einem anderen Geschehen in der Vergangenheit passiert. Welche Zeitform zeigt das?',['Plusquamperfekt','Präsens','Futur I','Präteritum'],'Plusquamperfekt','«Nachdem er gegessen hatte, ging er.»',2],
['Ein Bericht über einen Unfall in der Zeitung (schriftlich, Vergangenheit).',['Präteritum','Futur I','Präsens','Plusquamperfekt'],'Präteritum','Schriftliche Berichte über Vergangenes: meist Präteritum.',2],
['Du schreibst eine Nachricht an eine Freundin: «Ich ___ gestern im Kino.»',['war','bin','werde sein','wäre'],'war','Hilfsverb sein im Präteritum: ich war. (Auch möglich: ich bin gewesen.)',2],
['Welche Zeitform passt am besten? «Morgen ___ ich meine Grosseltern.»',['besuche','besuchte','habe besucht','hatte besucht'],'besuche','Das Präsens mit «morgen» drückt die Zukunft aus.',3]
];
ZW.forEach(z=>task.push({typ:'zeitwahl',stufe:z[4],lv:z[4]===3?2:1,cats:['sg2'],prompt:z[0],opts:z[1],answer:z[2],why:'<b>'+z[2]+'.</b> '+z[3]}));

/* Verben im Text erkennen */
const TX=[
['Gestern *ging Lena in die Stadt. Sie *kaufte ein Geschenk und *traf eine Freundin.',1,'Drei Verben: ging, kaufte, traf.'],
['Der Hund *rennt durch den Garten und *bellt laut. Die Kinder *lachen.',1,'Drei Verben: rennt, bellt, lachen.'],
['Wir *haben gestern Fussball *gespielt und *sind danach nach Hause *gegangen.',2,'haben + gespielt, sind + gegangen: je zwei Teile.'],
['Am Morgen *steht Tim früh *auf. Er *isst Brot und *trinkt Tee.',2,'steht … auf, isst, trinkt.'],
['Sie *will heute Abend ins Kino *gehen, weil sie den Film *sehen *möchte.',3,'will + gehen, sehen + möchte.']
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens,targets,instr:'Tippe alle Verben im Text an.',why:m[2]});
});

/* Wissen */
const W=[
['Wie heisst die Grundform des Verbs (zum Beispiel «lachen») in der Fachsprache?',['Infinitiv (Rohform)','Partizip II','Imperativ','Präteritum'],'Infinitiv (Rohform)','Die Grundform endet meist auf -en: lachen, gehen, sein.','sg4',1],
['Welche drei Verben sind <b>Hilfsverben</b>?',['sein, haben, werden','gehen, kommen, laufen','können, müssen, wollen','essen, trinken, schlafen'],'sein, haben, werden','Mit Hilfsverben bildet man zusammengesetzte Zeitformen (hat gelacht, wird kommen).','sg4',1],
['Welches Verb ist ein <b>Modalverb</b>?',['können','laufen','werden','schlafen'],'können','Modalverben: können, müssen, dürfen, wollen, sollen, mögen.','sg4',2],
['Wie bildet man das <b>Perfekt</b>?',['haben oder sein + Partizip II','werden + Infinitiv','Stamm + -te','hatte + Partizip II'],'haben oder sein + Partizip II','Beispiele: er hat gelacht, sie ist gelaufen.','sg2',1],
['Wie bildet man das <b>Plusquamperfekt</b>?',['hatte oder war + Partizip II','haben oder sein + Partizip II','werden + Infinitiv','Stamm + -te'],'hatte oder war + Partizip II','Beispiele: er hatte gegessen, sie war gegangen.','sg2',2],
['Wie bildet man das <b>Futur I</b>?',['werden + Infinitiv','haben + Partizip II','hatte + Partizip II','Stamm + -te'],'werden + Infinitiv','Beispiel: er wird kommen.','sg2',1],
['Welche Zeitform beschreibt, was <b>vor</b> einem anderen Geschehen passiert ist?',['Plusquamperfekt','Präsens','Futur I','Präteritum'],'Plusquamperfekt','«Nachdem er gegessen hatte, ging er.» Das Essen passierte zuerst.','sg2',2],
['Welche Zeitform braucht man oft beim mündlichen Erzählen von Vergangenem?',['Perfekt','Futur I','Plusquamperfekt','Imperativ'],'Perfekt','Mündlich sagen wir meist «ich habe gelacht», schriftlich eher «ich lachte».','sg2',1],
['Welche Zeitform verwendet man oft beim <b>schriftlichen Erzählen</b> in der Vergangenheit?',['Präteritum','Futur I','Perfekt','Präsens'],'Präteritum','In Geschichten schreiben wir meist im Präteritum: «Sie ging nach Hause.»','sg2',2],
['Wie lautet die <b>Befehlsform</b> (Imperativ) von «lesen» für «du»?',['Lies!','Lese!','Liest!','Lesen!'],'Lies!','Der Imperativ von «lesen» hat -ie-: Lies!','sg4',2],
['Wie lautet die Befehlsform von «fahren» für «du»?',['Fahr!','Fähr!','Fährst!','Fährt!'],'Fahr!','Der Imperativ hat keinen Umlaut: Fahr!','sg4',2],
['Wie lautet die Befehlsform von «geben» für «du»?',['Gib!','Gebe!','Gibst!','Geb!'],'Gib!','Wie bei «lesen» wechselt das e zu i: Gib!','sg4',2],
['Wie lautet die Befehlsform von «kommen» für «ihr»?',['Kommt!','Kommen!','Komm!','Kommst!'],'Kommt!','Der Imperativ Mehrzahl endet auf -t: Kommt!','sg4',1],
['Welcher Satz ist eine <b>Aufforderung</b> (Imperativ)?',['Komm bitte her!','Er kommt.','Sie kam gestern.','Wir werden kommen.'],'Komm bitte her!','Der Imperativ verlangt etwas: Komm! Geh! Lies!','sg4',1],
['Welcher Satz steht im <b>Passiv</b>?',['Das Buch wird gelesen.','Er liest das Buch.','Sie hat gelesen.','Wir lesen.'],'Das Buch wird gelesen.','Passiv: werden + Partizip II. Der Täter ist nicht wichtig.','sg4',3],
['Wie bildet man das <b>Passiv</b>?',['werden + Partizip II','haben + Partizip II','werden + Infinitiv','sein + Infinitiv'],'werden + Partizip II','Beispiel: Das Haus wird gebaut.','sg4',3]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5]===3?3:(w[5]),lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "lesen → ___!", "Lies", [], false, "Befehlsform von «lesen»."], ["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "fahren → ___!", "Fahr", ["Fahre"], false, "Befehlsform von «fahren»."], ["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "geben → ___!", "Gib", [], false, "Befehlsform von «geben»."], ["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "nehmen → ___!", "Nimm", [], false, "Befehlsform von «nehmen»."], ["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "sehen → ___!", "Sieh", [], false, "Befehlsform von «sehen»."], ["befehl", 2, "sg4", "Schreibe die Befehlsform (du).", "essen → ___!", "Iss", [], false, "Befehlsform von «essen»."], ["befehl", 1, "sg4", "Schreibe die Befehlsform (du).", "laufen → ___!", "Lauf", ["Laufe"], false, "Befehlsform von «laufen»."], ["befehl", 1, "sg4", "Schreibe die Befehlsform (du).", "spielen → ___!", "Spiel", ["Spiele"], false, "Befehlsform von «spielen»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* ---------- Theorie ---------- */
const SECS=[
{id:'merkmale',title:'Was ist ein Verb?',short:'Merkmale',min:6,note:'Verben nicht nur als Tätigkeiten: regnen, sein, schlafen. Konjugationsprobe wiederholen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Verben nennen …</h3><p><b>Tätigkeiten:</b> laufen, schreiben, kochen</p><p><b>Vorgänge:</b> regnen, wachsen, schmelzen</p><p><b>Zustände:</b> sein, schlafen, wohnen</p></div>'+
 '<div class="card"><h3>Die Konjugationsprobe</h3><p>Kannst du das Wort nach Person und Zeit verändern? Dann ist es ein Verb.</p>'+T(['','lachen','gehen'],[['ich','ich lache','ich gehe'],['du','du lachst','du gehst'],['er/sie/es','er lacht','er geht'],['Vergangenheit','er lachte','er ging']])+'</div></div>'},
{id:'formen',title:'Grundform und Personalform',short:'Personalformen',min:8,note:'Die Begriffe Grundform (Rohform, Infinitiv) und Personalform klar trennen. Wichtig für die Satzlehre. Unregelmässige Verben: du liest, er fährt, ich bin.',
 html:()=>'<div class="grid2"><div class="card"><h3>Grundform (Infinitiv, Rohform)</h3><p>So steht das Verb im Wörterbuch: <b>lachen, gehen, sein</b>.</p><p class="muted">Sie hat keine Person: «Ich will lachen.»</p></div>'+
 '<div class="card"><h3>Personalform (konjugierte Form)</h3><p>Sie ist angepasst an Person, Zahl, Zeit und Modus: <b>ich lache, du lachst, wir lachen</b>. Ein anderes Wort dafür ist «konjugierte Form».</p></div></div>'+
 '<div class="card" style="margin-top:.8rem">'+T(['Person','Endung','lachen','sein','haben'],[['ich','-e','ich lache','ich bin','ich habe'],['du','-st','du lachst','du bist','du hast'],['er/sie/es','-t','er lacht','er ist','er hat'],['wir','-en','wir lachen','wir sind','wir haben'],['ihr','-t','ihr lacht','ihr seid','ihr habt'],['sie (Mz.)','-en','sie lachen','sie sind','sie haben']])+'</div>'+
 '<div class="callout">Bei einigen Verben ändert sich der Stamm: du l<b>ie</b>st, er f<b>ä</b>hrt, du n<b>imm</b>st. Lerne sie mit.</div>'},
{id:'zeiten',title:'Die Zeitformen',short:'Zeitformen',min:12,note:'Zeitstrahl an die Wandtafel zeichnen. Zuerst Präsens, Präteritum, Perfekt; dann Plusquamperfekt und Futur. Wichtig: Perfekt ist die Form fürs Sprechen.',
 html:()=>GT.ui.tline([['Plusquamperfekt','er hatte gelacht','#7c3aed'],['Präteritum / Perfekt','er lachte · er hat gelacht','#dc2626'],['Präsens','er lacht','#16a34a'],['Futur I','er wird lachen','#2563eb']])+T(['Zeitform','Beispiel (lachen)','Bildung','Wann'],[
  ['Präsens','er lacht','Stamm + Endung','jetzt; auch Zukunft (Morgen fahre ich.)'],
  ['Präteritum','er lachte','Stamm + -te (oder Ablaut: ging)','schriftliches Erzählen'],
  ['Perfekt','er hat gelacht','haben oder sein + Partizip II','mündliches Erzählen von Vergangenem'],
  ['Plusquamperfekt','er hatte gelacht','hatte oder war + Partizip II','Geschehen, das schon vorher passiert ist'],
  ['Futur I','er wird lachen','werden + Infinitiv','Zukunft; auch Vermutung (Er wird wohl krank sein.)']])+
 '<div class="callout"><b>Merke:</b> Bei <b>haben/sein + Partizip II</b> stehen zwei Teile eines Verbs im Satz: «Er <b>hat</b> gestern <b>gelacht</b>.»</div>'},
{id:'bildung',title:'Partizip II und Stammformen',short:'Stammformen',min:10,note:'Starke (unregelmässige) und schwache (regelmässige) Verben vergleichen. Die Stammformen lernt man am besten laut.',
 html:()=>'<div class="grid2"><div class="card"><h3>Regelmässige Verben</h3><p>Stamm + <b>-te</b> im Präteritum, <b>ge- … -t</b> im Partizip II.</p><p>lachen – lachte – <b>ge</b>lach<b>t</b></p></div>'+
 '<div class="card"><h3>Unregelmässige Verben</h3><p>Der Vokal wechselt (Ablaut). Das Partizip II endet auf <b>-en</b>.</p><p>singen – sang – <b>ge</b>sung<b>en</b></p></div></div>'+
 '<div class="card" style="margin-top:.8rem"><h3>Wichtige Stammformen</h3>'+T(['Grundform','Präteritum','Partizip II'],[['gehen','ging','gegangen'],['kommen','kam','gekommen'],['essen','ass','gegessen'],['lesen','las','gelesen'],['fahren','fuhr','gefahren'],['sehen','sah','gesehen'],['nehmen','nahm','genommen'],['schreiben','schrieb','geschrieben']])+'</div>'+
 '<div class="callout">Trennbare Verben: <b>auf</b>stehen → ich stehe <b>auf</b>, ich bin <b>auf</b>gestanden. Verben mit be-, ver-, er- haben im Partizip II kein ge-: be<b>sucht</b>.</div>'},
{id:'arten',title:'Vollverb, Hilfsverb und Modalverb',short:'Verbarten',lv:2,min:8,note:'Ab Niveau B. Modalverben immer mit Infinitiv am Satzende zeigen.',
 html:()=>'<div class="grid3"><div class="card"><h3>Vollverb</h3><p>Hat eine eigene Bedeutung.</p><p>Er <b>lacht</b>. Sie <b>geht</b> nach Hause.</p></div>'+
 '<div class="card"><h3>Hilfsverb</h3><p><b>sein, haben, werden</b> bilden zusammengesetzte Zeitformen.</p><p>Er <b>hat</b> gelacht. Sie <b>wird</b> kommen.</p></div>'+
 '<div class="card"><h3>Modalverb</h3><p><b>können, müssen, dürfen, wollen, sollen, mögen</b> – mit Infinitiv.</p><p>Ich <b>muss</b> gehen. Sie <b>will</b> lachen.</p></div></div>'},
{id:'modi',title:'Aussagen und Aufforderungen',short:'Befehlsform',min:7,note:'Nur Indikativ (Wirklichkeit) und Imperativ (Befehlsform) behandeln. Der Konjunktiv folgt später als eigenes Thema.',
 html:()=>'<div class="grid2"><div class="card"><h3>Indikativ (Wirklichkeitsform)</h3><p>Er sagt, wie etwas ist: «Du <b>kommst</b>.»</p></div>'+
 '<div class="card"><h3>Imperativ (Befehlsform)</h3><p>Er fordert auf: «<b>Komm</b>!» «<b>Kommt</b>!»</p>'+T(['Grundform','du','ihr'],[['kommen','Komm!','Kommt!'],['lesen','Lies!','Lest!'],['fahren','Fahr!','Fahrt!'],['geben','Gib!','Gebt!']])+'</div></div>'+
 '<div class="callout">Den <b>Konjunktiv</b> (Möglichkeitsform: «Er sagte, er sei müde.») lernst du in einem späteren Thema.</div>'},
{id:'passiv',title:'Aktiv und Passiv',short:'Passiv',lv:3,min:8,note:'Nur Niveau A. Zeigen, dass im Passiv der Handelnde nicht genannt werden muss.',
 html:()=>'<div class="grid2"><div class="card"><h3>Aktiv</h3><p>Der Handelnde steht im Vordergrund.</p><p>«Der Bäcker <b>backt</b> das Brot.»</p></div>'+
 '<div class="card"><h3>Passiv</h3><p><b>werden + Partizip II</b>. Das Geschehen steht im Vordergrund.</p><p>«Das Brot <b>wird gebacken</b>.»</p></div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Pro Stolperstein ein Beispiel von den Schülern bilden lassen.',
 html:()=>GT.ui.oops([['Ich tue lesen.','Ich lese.'],['gebringt','gebracht']])+'<div class="grid3">'+[
  ['1 · Zwei Teile, ein Verb','«Er <b>hat</b> gestern <b>gelacht</b>.»','Hilfsverb und Partizip II gehören zusammen. Dazwischen können andere Wörter stehen.'],
  ['2 · Trennbare Verben','«Er <b>steht</b> früh <b>auf</b>.»','«aufstehen»: Die Vorsilbe steht am Satzende.'],
  ['3 · Perfekt mit sein','«Ich <b>bin</b> gelaufen.»','Bei Bewegung und Zustandsänderung: sein + Partizip II.'],
  ['4 · Präsens für die Zukunft','«Morgen <b>fahre</b> ich nach Bern.»','Das Präsens kann Zukünftiges ausdrücken, wenn eine Zeitangabe da ist.'],
  ['5 · Unregelmässige Personalformen','«du <b>liest</b>, er <b>fährt</b>»','Der Stamm ändert sich. Das erkennt man nur beim Konjugieren.'],
  ['6 · «würde» ist kein Präsens','«Ich <b>würde</b> kommen.»','Das ist der Konjunktiv. Der kommt in einem späteren Thema.'],
  ['7 · Partizip II richtig bilden','«aufstehen → <b>auf</b>ge<b>standen</b>» / «verlieren → <b>ver</b>loren» / «besuchen → besucht» / «bringen → gebracht»','Bei trennbaren Verben steht «ge» in der Mitte. Bei Vorsilben wie ver-, be-, er-, ent-, zer- gibt es kein «ge». Unregelmässige Verben ändern den Stamm (nicht «gebringt»).'],,
  ['8 · Perfekt mit «sein» (Schweizer Standardsprache)','«Ich <b>bin</b> gesessen.» / «Er <b>ist</b> gestanden.» / «Sie <b>ist</b> gelegen.»','In der Schweiz sind diese Formen mit «sein» richtig. In Deutschland sagt man oft «habe gesessen». Beides ist in Ordnung, nicht anstreichen.'],,
  ['9 · Nicht «tun» + Verb','Nicht: «Ich tue lesen.» Sondern: «Ich lese.»','Die Umschreibung mit «tun» gehört zur Mundart. In der Schriftsprache braucht man die normale Personalform.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('zeit,person,stamm')}
];
const EX=[
 ['Konjugiere «gehen» im Präsens: ich, du, er, wir, ihr, sie.','ich gehe · du gehst · er geht · wir gehen · ihr geht · sie gehen',1],
 ['Bestimme die Zeitform: «Sie hat gelacht.»','Perfekt: hat + gelacht (Partizip II).',1],
 ['Schreibe den Satz im Präteritum: «Wir spielen Fussball.»','Wir spielten Fussball.',1],
 ['Schreibe den Satz im Perfekt: «Er liest ein Buch.»','Er hat ein Buch gelesen.',1],
 ['Schreibe den Satz im Futur I: «Ich rufe dich an.»','Ich werde dich anrufen.',1],
 ['Gib die Stammformen an: gehen, essen, sehen.','gehen – ging – gegangen · essen – ass – gegessen · sehen – sah – gesehen',1],
 ['Unterstreiche alle Teile des Verbs: «Sie hat gestern früh aufstehen müssen.»','hat · aufstehen · müssen (drei Teile)',2],
 ['Bilde die Befehlsform für «du»: lesen, fahren, geben.','Lies! · Fahr! · Gib!',2],
 ['Schreibe im Plusquamperfekt: «Er isst. Dann geht er.» («Nachdem …»)','Nachdem er gegessen hatte, ging er.',2],
 ['Bilde das Partizip II: aufstehen, verlieren, besuchen, bringen.','aufgestanden · verloren · besucht · gebracht',2],
 ['Schreibe im Perfekt: «Sie räumt das Zimmer auf.»','Sie hat das Zimmer aufgeräumt.',2],
 ['Korrigiere: «Ich tue lesen.»','Ich lese.',2]
];
const merk=()=>T(['Zeitform','Beispiel','Bildung'],[['Präsens','er lacht','Stamm + Endung'],['Präteritum','er lachte','Stamm + -te oder Ablaut'],['Perfekt','er hat gelacht','haben/sein + Partizip II'],['Plusquamperfekt','er hatte gelacht','hatte/war + Partizip II'],['Futur I','er wird lachen','werden + Infinitiv']])+
 '<h3 style="margin-top:.9rem">Personalformen</h3>'+T(['','Endung','lachen'],[['ich','-e','lache'],['du','-st','lachst'],['er/sie/es','-t','lacht'],['wir','-en','lachen'],['ihr','-t','lacht'],['sie','-en','lachen']])+
 '<ul><li>Grundform (Infinitiv, Rohform): lachen, gehen, sein.</li><li>Hilfsverben: sein, haben, werden.</li><li>Befehlsform: Komm! Lies! Fahr!</li></ul>';
const UEM={'formen':{types:'person',cats:'sg1'},'zeiten':{types:'zeit,zeitwahl',cats:'sg2'},'bildung':{types:'einsetzen,zeit',cats:'sg2'},'arten':{types:'stamm',cats:'sg3'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{basic:5,konj:2},opt:{pron:.3,adj:.2,det:{def:.5,indef:.3,poss:.2}},classes:[{gl:'Verb',cats:['sg4'],lv:1}],perClass:34});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Du ___ gern Fussball.','spielst',['spielt','spiele','spielen'],1],['Ihr ___ heute früh.','kommt',['kommst','komme','kommen'],1],['Wir ___ ins Kino.','gehen',['geht','gehst','gehe'],1],
['Ich ___ müde.','bin',['bist','ist','sind'],1],['Die Kinder ___ Hunger.','haben',['hat','habt','hast'],1],['Ihr ___ zu spät.','seid',['bist','ist','sind'],1],
['Er ___ das Buch.','liest',['lest','lesen','lese'],2],['Du ___ den Ball.','wirfst',['wirft','werfe','werfen'],2],['Mia ___ schnell.','läuft',['laufe','laufst','laufen'],2],['Du ___ mir.','hilfst',['hilft','helfe','helfen'],2]
].forEach(p=>task.push({typ:'person',stufe:p[3],lv:p[3]===3?2:1,cats:['sg1'],sent:p[0].replace('___','<span class="gap">_____</span>'),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> Die Personalform richtet sich nach der Person (ich, du, er …) und der Zahl.'}));
[
['singen','sang','gesungen',['singte','sing','sung'],['gesingt','gesang','gesingen'],1],
['trinken','trank','getrunken',['trinkte','trunk','trinkt'],['getrinkt','getrank','getrinken'],1],
['fliegen','flog','geflogen',['fliegte','flug','flieg'],['gefliegt','geflogt','geflug'],2],
['helfen','half','geholfen',['helfte','hilft','halfte'],['gehelft','gehalfen','gehilft'],2],
['nehmen','nahm','genommen',['nehmte','nehm','nahmt'],['genehmt','genahmen','genomm'],2],
['finden','fand','gefunden',['findete','fund','findte'],['gefindet','gefand','gefundet'],1]
].forEach(s=>{
  task.push({typ:'stamm',stufe:s[5],lv:s[5]===3?2:1,cats:['sg3'],prompt:'Wie lautet das <b>Präteritum</b> von «'+s[0]+'»? (er/sie/es …)',opts:[s[1]].concat(s[3]),answer:s[1],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b> Präteritum: «er '+s[1]+'».'});
  task.push({typ:'stamm',stufe:s[5],lv:s[5]===3?2:1,cats:['sg3'],prompt:'Wie lautet das <b>Partizip II</b> von «'+s[0]+'»?',opts:[s[2]].concat(s[4]),answer:s[2],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b> Perfekt: «er '+((SEIN[s[0]]||s[0]==='fliegen')?'ist ':'hat ')+s[2]+'».'});
});
task.push=_p0;
})();

GT.chapter({id:'verb',teil:'wort',nr:4,title:'Verb',big:'Er lacht. Er lachte. Er hat gelacht.',desc:'Formen, Zeitformen und Befehlsform',
 ex:'«Er '+mk('verb','lacht')+'. Er '+mk('verb','lachte')+'. Er '+mk('verb','hat gelacht')+'.»',
 goals:['Ich erkenne Verben mit der Konjugationsprobe.','Ich kenne die Grundform (Rohform) und bilde die Personalformen.','Ich kenne die Zeitformen Präsens, Präteritum, Perfekt, Plusquamperfekt und Futur I und erkenne sie im Satz.','Ich bilde Stammformen und das Partizip II.','Ich bilde die Befehlsform (Imperativ).'],
  write:['person','stamm','zeitwahl'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{zeit:{label:'Zeitform bestimmen',short:'Zeitform im Satz',instr:'In welcher Zeitform steht das markierte Verb?',hint:'Achte auf die Bildung: -te? haben/sein + Partizip? hatte/war + Partizip? werden + Infinitiv?',ref:'zeiten'},
  person:{winstr:'Schreibe die passende Form des Verbs.',label:'Personalform',short:'Verb richtig konjugieren',instr:'Welche Form passt in die Lücke?',hint:'Welche Person? Denke an die Endungen -e, -st, -t, -en, -t, -en.',ref:'formen'},
  stamm:{winstr:'Schreibe die richtige Form.',label:'Stammformen',short:'Präteritum und Partizip II',instr:'Wähle die richtige Form.',hint:'Regelmässig: -te und ge-…-t. Unregelmässig: Ablaut und ge-…-en.',ref:'bildung'},
  einsetzen:{icon:'✏️',label:'Einsetzen',short:'Verb in die verlangte Zeitform schreiben',instr:'Schreibe die Verbform.',hint:'Welche Zeitform? Zuerst Hilfsverb oder Stammform überlegen.',ref:'zeiten'},
  umformen:{icon:'🔁',label:'Umformen',short:'Satz in eine andere Zeitform schreiben',instr:'Schreibe den ganzen Satz in der verlangten Zeitform.',hint:'Setze nur das Verb um. Achte auf haben/sein und das Partizip II.',ref:'zeiten'},
  zeitwahl:{icon:'🕒',label:'Zeit wählen',short:'Welche Zeitform passt zur Situation?',instr:'Welche Zeitform passt?',hint:'Mündlich oder schriftlich? Vorher, jetzt oder später?',ref:'zeiten'},
  text:{icon:'🔍',label:'Verben im Text',short:'Alle Verben in einem Text finden',instr:'Tippe alle Verben im Text an.',hint:'Konjugationsprobe: Kann ich das Wort nach der Person verändern?',ref:'merkmale'},
  befehl:{icon:'❗',label:'Befehlsform',short:'Aufforderungen mit «du» bilden',instr:'Schreibe die Befehlsform.',hint:'Bei einigen Verben wechselt das e zu i: Lies! Gib!',ref:'modi'},
  markieren:{label:'Verbteile markieren',short:'Alle Teile des Verbs finden',instr:'Tippe alle Teile des Verbs an.',hint:'Suche Hilfsverb, Modalverb, Partizip, Infinitiv und abgetrennte Vorsilbe.',ref:'zeiten'},
  wissen:{label:'Wissen',short:'Zeitformen, Verbarten, Befehlsform',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'zeiten'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
