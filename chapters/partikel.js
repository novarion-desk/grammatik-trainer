/* Kapitel Wortlehre 7: Partikel (Adverb, Präposition, Konjunktion). */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Präpositionen',sg2:'Konjunktionen',sg3:'Adverbien',sg5:'Interjektionen',sg4:'Partikelarten erkennen'};
const task=[];
const gap=s=>s.replace('___','<span class="gap">_____</span>');

/* Präpositionen: Fall und Wahl */
const P=[
['Ich gehe ___ die Schule.','in',['von','mit','aus'],1,'«in die Schule» (Wohin? Akkusativ).'],
['Das Buch liegt ___ dem Tisch.','auf',['durch','mit','für'],1,'«auf dem Tisch» (Wo? Dativ).'],
['Wir fahren ___ dem Bus.','mit',['durch','für','ohne'],1,'«mit dem Bus»: mit + Dativ.'],
['Sie wartet ___ ihren Freund.','auf',['mit','von','zu'],2,'«warten auf» + Akkusativ.'],
['Ich komme ___ Hause.','nach',['mit','für','von'],1,'«nach Hause» (Richtung zum Zuhause).'],
['Er geht ___ Arzt.','zum',['nach','im','ins'],1,'«zum Arzt» = zu dem Arzt.'],
['Wir spielen ___ Garten.','im',['zum','vom','ans'],1,'«im Garten» = in dem Garten.'],
['Das Geschenk ist ___ dich.','für',['mit','von','zu'],1,'«für dich»: für + Akkusativ.'],
['Er kommt ___ Schule.','von der',['mit der','in der','aus die'],2,'«von der Schule» (Woher? Dativ).'],
['Wir gehen ___ den Park.','durch',['mit','von','nach'],2,'«durch den Park»: durch + Akkusativ.'],
['Sie schreibt ___ Bleistift.','mit',['von','durch','für'],1,'«mit einem Bleistift»: mit + Dativ.'],
['Ich warte ___ dem Bahnhof.','vor',['mit','für','durch'],2,'«vor dem Bahnhof» (Wo? Dativ).'],
['___ des Regens bleiben wir zu Hause.','Wegen',['Mit','Für','Nach'],3,'«wegen» verlangt den Genitiv: wegen des Regens.'],
['___ des Winters tragen wir Jacken.','Während',['Mit','Zu','Von'],3,'«während» + Genitiv.'],
['Er ist ___ dem Zug gestiegen.','aus',['durch','für','ohne'],2,'«aus dem Zug» (Woher? Dativ).'],
['Wir gehen ___ Kino. (in das)','ins',['im','zum','vom'],1,'Kurzform: in das = ins.'],
['Sie wohnt ___ Haus. (in dem)','im',['ins','zum','am'],1,'Kurzform: in dem = im.'],
['Er kommt ___ Training. (von dem)','vom',['zum','im','am'],1,'Kurzform: von dem = vom.'],
['Ich warte ___ Bahnhof. (an dem)','am',['im','vom','beim'],2,'Kurzform: an dem = am.'],
['Wir sind ___ Bäcker. (bei dem)','beim',['zum','vom','im'],2,'Kurzform: bei dem = beim.']
];
P.forEach(p=>task.push({typ:'praep',stufe:p[3],lv:p[3]===3?2:1,cats:['sg1'],sent:gap(p[0]),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> '+p[4]}));

/* Konjunktionen */
const K=[
['Ich bleibe zu Hause, ___ ich krank bin.','weil',['dass','damit','aber'],1,'«weil» gibt einen Grund an.'],
['Wir gehen ohne Jacke hinaus, ___ es kalt ist.','obwohl',['weil','damit','denn'],2,'«obwohl» zeigt einen Gegensatz.'],
['Er spielt Fussball ___ sie liest.','und',['sondern','dass','ob'],1,'«und» verbindet.'],
['Ich möchte kommen, ___ ich habe keine Zeit.','aber',['dass','obwohl','damit'],1,'«aber» zeigt einen Gegensatz.'],
['Willst du Tee ___ Kaffee?','oder',['dass','weil','damit'],1,'«oder» zeigt eine Wahl.'],
['Ich weiss, ___ er kommt.','dass',['das','weil','aber'],1,'«dass» leitet einen Inhaltssatz ein.'],
['Wir üben, ___ wir die Prüfung bestehen.','damit',['obwohl','weil','aber'],2,'«damit» nennt einen Zweck.'],
['___ er müde war, ging er noch aus.','Obwohl',['Weil','Damit','Denn'],2,'«obwohl» zeigt einen Gegensatz.'],
['___ ich gegessen hatte, ging ich spazieren.','Nachdem',['Damit','Dass','Ob'],2,'«nachdem» beschreibt, was vorher geschah.'],
['Ich lerne, ___ ich bessere Noten möchte.','weil',['obwohl','aber','oder'],1,'«weil» gibt den Grund an.'],
['Ich komme, ___ du mich einlädst.','wenn',['dass','obwohl','damit'],2,'«wenn» nennt eine Bedingung.'],
['Er ist müde, ___ er hat wenig geschlafen.','denn',['weil','dass','obwohl'],3,'«denn» verbindet zwei Hauptsätze (das konjugierte Verb bleibt an zweiter Stelle).'],
['Entweder bleibst du hier, ___ du kommst mit.','oder',['und','aber','weil'],2,'«entweder … oder».'],
['Sowohl Anna ___ Tim kommen mit.','als auch',['oder auch','und auch','aber auch'],3,'«sowohl … als auch».']
];
K.forEach(k=>task.push({typ:'konj',stufe:k[3],lv:k[3]===3?2:1,cats:['sg2'],sent:gap(k[0]),opts:[k[1]].concat(k[2]),answer:k[1],why:'<b>'+k[1]+'.</b> '+k[4]}));

/* Konjunktionen: nebenordnend oder unterordnend */
const KA=['nebenordnend','unterordnend'];
const KJ=[
['Anna lacht, <b>und</b> Tim winkt.',0,1,'«und» verbindet zwei Hauptsätze. Die Verben bleiben an zweiter Stelle.'],
['Ich bleibe zu Hause, <b>weil</b> ich krank bin.',1,1,'«weil» leitet einen Nebensatz ein. Das konjugierte Verb steht am Ende.'],
['Willst du Tee <b>oder</b> Kaffee?',0,1,'«oder» verbindet gleichwertige Teile.'],
['Ich weiss, <b>dass</b> du müde bist.',1,1,'«dass» leitet einen Nebensatz ein. Das konjugierte Verb steht am Ende.'],
['Er ist krank, <b>aber</b> er kommt zur Schule.',0,1,'«aber» verbindet zwei Hauptsätze.'],
['<b>Obwohl</b> es regnet, gehen wir hinaus.',1,2,'«obwohl» leitet einen Nebensatz ein. Das Verb «regnet» steht am Ende.'],
['Ich gehe früh ins Bett, <b>denn</b> ich bin müde.',0,2,'«denn» verbindet zwei Hauptsätze. Das konjugierte Verb bleibt an zweiter Stelle.'],
['Wir üben, <b>damit</b> wir die Prüfung bestehen.',1,2,'«damit» leitet einen Nebensatz ein. Das konjugierte Verb steht am Ende.'],
['Er geht nicht ins Kino, <b>sondern</b> er bleibt zu Hause.',0,2,'«sondern» verbindet zwei Hauptsätze.'],
['Ich rufe dich an, <b>wenn</b> ich zu Hause bin.',1,2,'«wenn» leitet einen Nebensatz ein. Das konjugierte Verb steht am Ende.'],
['Ich weiss nicht, <b>ob</b> er kommt.',1,2,'«ob» leitet einen Nebensatz ein. Das konjugierte Verb steht am Ende.'],
['Sie lernt, <b>nachdem</b> sie gegessen hat.',1,3,'«nachdem» leitet einen Nebensatz ein. Das Verb «hat» steht am Ende.'],
['Entweder bleibst du hier, <b>oder</b> du kommst mit.',0,3,'«oder» verbindet zwei Hauptsätze.']
];
KJ.forEach(k=>task.push({typ:'konjart',stufe:k[2],lv:k[2]===3?2:1,cats:['sg2'],sent:k[0],opts:KA,answer:KA[k[1]],why:'<b>'+KA[k[1]]+'.</b> '+k[3]}));
/* Verbstellung nach der Konjunktion */
const KS=[
['Ich bleibe zu Hause, weil ich krank bin.','Ich bleibe zu Hause, weil ich bin krank.',1,'Nach «weil» steht das konjugierte Verb am Ende des Nebensatzes.'],
['Er sagt, dass er müde ist.','Er sagt, dass er ist müde.',1,'Nach «dass» steht das konjugierte Verb am Ende.'],
['Obwohl es regnet, gehen wir hinaus.','Obwohl es regnet, wir gehen hinaus.',2,'Nach dem Nebensatz kommt im Hauptsatz zuerst das Verb: «gehen wir».'],
['Ich gehe heim, denn ich bin müde.','Ich gehe heim, denn ich müde bin.',2,'Nach «denn» bleibt das konjugierte Verb an zweiter Stelle.'],
['Wir üben, damit wir besser werden.','Wir üben, damit wir werden besser.',2,'Nach «damit» steht das konjugierte Verb am Ende.'],
['Ich rufe dich an, wenn ich zu Hause bin.','Ich rufe dich an, wenn ich bin zu Hause.',2,'Nach «wenn» steht das konjugierte Verb am Ende.']
];
KS.forEach(k=>task.push({typ:'konjstellung',stufe:k[2],lv:1,cats:['sg2'],prompt:'Welcher Satz ist richtig?',opts:[k[0],k[1]],answer:k[0],why:'<b>'+k[0]+'</b> '+k[3]}));

/* Adverbien */
const A=[
['Welche Frage beantwortet «gestern»?',['Wann?','Wo?','Wie?','Warum?'],'Wann?','Temporaladverb: gestern, heute, morgen, bald, oft.',1],
['Welche Frage beantwortet «dort»?',['Wo?','Wann?','Wie?','Warum?'],'Wo?','Lokaladverb: hier, dort, oben, unten, draussen.',1],
['Welche Frage beantwortet «gern»?',['Wie?','Wann?','Wo?','Warum?'],'Wie?','Modaladverb: gern, so, leider, vielleicht.',1],
['Welche Frage beantwortet «deshalb»?',['Warum?','Wann?','Wo?','Wohin?'],'Warum?','Kausaladverb: deshalb, darum, deswegen.',2],
['Welches Wort ist ein <b>Temporaladverb</b>?',['heute','dort','gern','deshalb'],'heute','Temporaladverbien antworten auf «Wann?».',1],
['Welches Wort ist ein <b>Lokaladverb</b>?',['hier','heute','gern','deshalb'],'hier','Lokaladverbien antworten auf «Wo?».',1],
['Welches Wort ist ein <b>Modaladverb</b>?',['leider','gestern','oben','darum'],'leider','Modaladverbien antworten auf «Wie?».',2],
['Welches Wort ist ein <b>Kausaladverb</b>?',['deswegen','morgen','draussen','schnell'],'deswegen','Kausaladverbien antworten auf «Warum?».',2],
['Welches Wort ist ein Adverb?',['oft','Hund','schreiben','schön'],'oft','Adverbien bekommen keine Endungen und stehen nicht vor einem Nomen.',1],
['Was gilt für Adverbien?',['Sie bekommen keine Endungen.','Sie werden dekliniert.','Sie werden gross geschrieben.','Sie haben einen Artikel.'],'Sie bekommen keine Endungen.','Adverbien bleiben gleich: hier, heute, dort.',1],
['Welches Wort ist ein Adverb?',['draussen','Garten','spielen','kalt'],'draussen','Lokaladverb: Wo? draussen.',1],
['Welche Frage beantwortet «hinauf»?',['Wohin?','Woher?','Wo?','Wann?'],'Wohin?','Direktionaladverb: hinauf, hinunter, hinaus.',3]
];
A.forEach(a=>task.push({typ:'adverb',stufe:a[4],lv:a[4]===3?2:1,cats:['sg3'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));

/* Adverbarten zuordnen */
const AD=['Lokaladverb (Wo?)','Temporaladverb (Wann?)','Modaladverb (Wie?)','Kausaladverb (Warum?)'];
const ADZ=[
['Wir treffen uns <b>morgen</b>.',1,1,'«morgen» antwortet auf «Wann?»: Temporaladverb.'],
['Der Ball liegt <b>unten</b>.',0,1,'«unten» antwortet auf «Wo?»: Lokaladverb.'],
['Sie singt <b>gern</b>.',2,1,'«gern» antwortet auf «Wie?»: Modaladverb.'],
['Ich war <b>gestern</b> im Kino.',1,1,'«gestern» antwortet auf «Wann?»: Temporaladverb.'],
['Die Katze schläft <b>draussen</b>.',0,1,'«draussen» antwortet auf «Wo?»: Lokaladverb.'],
['Wir wohnen <b>dort</b>.',0,1,'«dort» antwortet auf «Wo?»: Lokaladverb.'],
['Der Zug kommt <b>bald</b>.',1,1,'«bald» antwortet auf «Wann?»: Temporaladverb.'],
['Er ist müde, <b>deshalb</b> geht er früh ins Bett.',3,2,'«deshalb» antwortet auf «Warum?»: Kausaladverb.'],
['Es regnet, <b>darum</b> bleiben wir zu Hause.',3,2,'«darum» antwortet auf «Warum?»: Kausaladverb.'],
['Er hat <b>leider</b> keine Zeit.',2,2,'«leider» antwortet auf «Wie?»: Modaladverb.'],
['Sie kommt <b>oft</b> zu spät.',1,2,'«oft» antwortet auf «Wie oft?» oder «Wann?»: Temporaladverb.'],
['Sie geht die Treppe <b>hinauf</b>.',0,3,'«hinauf» gibt die Richtung an (Wohin?): Lokaladverb.']
];
ADZ.forEach(a=>task.push({typ:'adverbzu',stufe:a[2],lv:a[2]===3?2:1,cats:['sg3'],sent:a[0],opts:AD,answer:AD[a[1]],why:'<b>'+AD[a[1]]+'.</b> '+a[3]}));

/* Interjektionen */
const IJ=[
['Welches Wort ist eine Interjektion?',['hurra','Haus','schnell','weil'],'hurra','«hurra» drückt ein Gefühl aus: Interjektion.',1],
['Welches Wort ist eine Interjektion?',['aua','laufen','dort','mit'],'aua','«aua» drückt Schmerz aus: Interjektion.',1],
['Welches Wort ist eine Interjektion?',['oh','oben','Tisch','denn'],'oh','«oh» drückt Überraschung aus: Interjektion.',1],
['Welches Wort ist eine Interjektion?',['igitt','gern','Schule','und'],'igitt','«igitt» drückt Ekel aus: Interjektion.',1],
['Welches Wort ist eine Interjektion?',['pst','heute','Auto','für'],'pst','«pst» fordert zur Ruhe auf: Interjektion.',2],
['Welches Wort ist eine Interjektion?',['hey','aber','Lehrer','schön'],'hey','«hey» ruft jemanden an: Interjektion.',2],
['Welche Interjektion passt? Du verbrennst dich am heissen Herd.',['Aua!','Hurra!','Pst!','Igitt!'],'Aua!','Schmerz: «Aua!»',1],
['Welche Interjektion passt? Du hast die Prüfung bestanden.',['Hurra!','Aua!','Pst!','Igitt!'],'Hurra!','Freude: «Hurra!»',1],
['Welche Interjektion passt? Im Kino redet jemand zu laut.',['Pst!','Hurra!','Aua!','Igitt!'],'Pst!','Aufforderung zur Ruhe: «Pst!»',1],
['Welche Interjektion passt? Du siehst etwas Ekliges auf dem Teller.',['Igitt!','Hurra!','Pst!','Hey!'],'Igitt!','Ekel: «Igitt!»',2],
['Welche Interjektion passt? Du rufst einem Freund auf dem Pausenhof zu.',['Hey!','Aua!','Igitt!','Pst!'],'Hey!','Anruf: «Hey!»',2]
];
IJ.forEach(a=>task.push({typ:'interj',stufe:a[4],lv:1,cats:['sg5'],prompt:a[0],opts:a[1],answer:a[2],why:'<b>'+a[2]+'</b> '+a[3]}));
const IJI=[
['Du verbrennst dich am Herd. Schreibe eine passende Interjektion.','___!','aua',['au','autsch'],'Schmerz: «Aua!» oder «Autsch!»',1],
['Du hast gewonnen. Schreibe eine passende Interjektion.','___!','hurra',['juhu','yes'],'Freude: «Hurra!» oder «Juhu!»',1],
['Du siehst etwas Ekliges. Schreibe eine passende Interjektion.','___!','igitt',['bäh','pfui'],'Ekel: «Igitt!», «Bäh!» oder «Pfui!»',2]
];
IJI.forEach(a=>task.push({typ:'interjein',stufe:a[5],lv:1,cats:['sg5'],input:true,prompt:a[0],sent:a[1],answer:a[2],accept:a[3],strict:false,why:'<b>'+a[2]+'.</b> '+a[4]}));

/* Wechselpräpositionen: Wo? Dativ, Wohin? Akkusativ */
const WE=[
['Ich lege das Buch ___ Tisch.','auf den',['auf dem','auf das','auf der'],1,'Wohin? Akkusativ: auf den Tisch.'],
['Das Buch liegt ___ Tisch.','auf dem',['auf den','auf das','auf der'],1,'Wo? Dativ: auf dem Tisch.'],
['Wir gehen ___ Garten.','in den',['in dem','im','in der'],1,'Wohin? Akkusativ: in den Garten.'],
['Wir spielen ___ Garten.','im',['in den','ins','in die'],1,'Wo? Dativ: im Garten (in dem Garten).'],
['Er hängt das Bild ___ Wand.','an die',['an der','an dem','an das'],2,'Wohin? Akkusativ: an die Wand.'],
['Das Bild hängt ___ Wand.','an der',['an die','an den','an das'],2,'Wo? Dativ: an der Wand.'],
['Der Hund springt ___ Sofa.','aufs',['auf dem','auf der','auf den'],2,'Wohin? Akkusativ: aufs Sofa (auf das Sofa).'],
['Die Katze schläft ___ Sofa.','auf dem',['aufs','auf den','auf die'],2,'Wo? Dativ: auf dem Sofa.'],
['Sie stellt das Fahrrad ___ Haus.','vor das',['vor dem','vor der','vor den'],3,'Wohin? Akkusativ: vor das Haus.'],
['Das Fahrrad steht ___ Haus.','vor dem',['vor das','vor den','vor die'],3,'Wo? Dativ: vor dem Haus.']
];
WE.forEach(w=>task.push({typ:'wechsel',stufe:w[3],lv:w[3]===3?2:1,cats:['sg1'],sent:gap(w[0]),opts:[w[1]].concat(w[2]),answer:w[1],why:'<b>'+w[1]+'.</b> '+w[4]}));
const WF=['Akkusativ (Wohin?)','Dativ (Wo?)'];
const WFQ=[
['Wir fahren <b>in die Stadt</b>.',0,1,'Wohin? Akkusativ.'],
['Wir wohnen <b>in der Stadt</b>.',1,1,'Wo? Dativ.'],
['Sie hängt die Jacke <b>an den Haken</b>.',0,2,'Wohin? Akkusativ.'],
['Die Jacke hängt <b>an dem Haken</b>.',1,2,'Wo? Dativ.'],
['Er läuft <b>über die Strasse</b>.',0,2,'Wohin? Akkusativ.'],
['Das Flugzeug fliegt <b>über der Stadt</b>.',1,3,'Wo? Dativ.']
];
WFQ.forEach(w=>task.push({typ:'wechselfall',stufe:w[2],lv:w[2]===3?2:1,cats:['sg1'],sent:w[0],opts:WF,answer:WF[w[1]],why:'<b>'+WF[w[1]]+'.</b> '+w[3]}));

/* Partikelart bestimmen */
const Z=['Adverb','Präposition','Konjunktion','Interjektion'];
const Q=[
['Wir spielen <b>draussen</b>.',0,1,'«draussen» sagt, wo: Adverb.'],
['Ich gehe <b>in</b> die Schule.',1,1,'«in» steht vor einem Nomen: Präposition.'],
['Ich komme, <b>weil</b> ich Zeit habe.',2,1,'«weil» verbindet Sätze: Konjunktion.'],
['Er kommt <b>heute</b>.',0,1,'«heute» sagt, wann: Adverb.'],
['Sie wohnt <b>bei</b> ihrer Oma.',1,1,'«bei» + Nomen: Präposition.'],
['Anna <b>und</b> Tim spielen.',2,1,'«und» verbindet: Konjunktion.'],
['Das Buch liegt <b>auf</b> dem Tisch.',1,1,'«auf» + dem Tisch: Präposition.'],
['Wir fahren <b>mit</b> dem Zug.',1,2,'«mit» + Dativ: Präposition.'],
['Ich gehe nach Hause, <b>denn</b> ich bin müde.',2,2,'«denn» verbindet zwei Hauptsätze: Konjunktion.'],
['Er singt <b>gern</b>.',0,2,'«gern» sagt, wie: Adverb.'],
['<b>Obwohl</b> es regnet, gehen wir hinaus.',2,2,'«obwohl» leitet einen Nebensatz ein: Konjunktion.'],
['Sie hat <b>leider</b> keine Zeit.',0,2,'«leider» ist ein Modaladverb.'],
['Er bleibt <b>wegen</b> des Regens zu Hause.',1,3,'«wegen» + Genitiv: Präposition.'],
['Sie ist müde, <b>deshalb</b> geht sie früh ins Bett.',0,3,'«deshalb» ist ein Kausaladverb: Es steht im Satz und kann verschoben werden.'],
['<b>Hurra</b>, wir haben gewonnen!',3,1,'«hurra» drückt ein Gefühl aus: Interjektion.'],
['<b>Aua</b>, das tut weh!',3,1,'«aua» drückt Schmerz aus: Interjektion.'],
['<b>Hey</b>, warte auf mich!',3,2,'«hey» ruft jemanden an: Interjektion.']
];
Q.forEach(q=>task.push({typ:'art',stufe:q[2],lv:q[2]===3?2:1,cats:['sg4'],sent:q[0],opts:Z,answer:Z[q[1]],why:'<b>'+Z[q[1]]+'.</b> '+q[3]}));

/* Markieren */
const M=[
['Ich gehe *in die Schule *und Tim bleibt *zu Hause.',1,'Partikel: in, und, zu.'],
['Wir spielen *draussen *und singen *gern.',1,'Partikel: draussen, und, gern.'],
['*Obwohl es regnet, gehen wir *ohne Jacke *hinaus.',2,'Partikel: Obwohl, ohne, hinaus.'],
['Er kommt *heute *mit dem Zug, *denn sein Auto ist kaputt.',2,'Partikel: heute, mit, denn.'],
['*Wegen des Regens bleiben wir *drinnen, *aber *vielleicht kommen wir *später.',3,'Partikel: Wegen, drinnen, aber, vielleicht, später.']
];
M.forEach(m=>{
  const raw=m[0].split(' '),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens:raw.map(w=>w.replace(/^\*/,'')),targets,instr:'Tippe alle Partikel an (Präpositionen, Konjunktionen, Adverbien).',why:m[2]});
});


/* Wortart im Text erkennen */
const TX=[
["Der Hund liegt *unter dem Tisch.",1,"unter ist eine Präposition."],
["Wir bleiben *heute *zu Hause, *weil es regnet.",2,"heute (Adverb), zu (Präposition), weil (Konjunktion)."],
["Tim spielt *gern Fussball, *und Lena liest *oft *in ihrem Zimmer.",2,"gern, oft (Adverbien), und (Konjunktion), in (Präposition)."],
["*Gestern war ich *mit meiner Familie *draussen, *aber es war kalt.",3,"Gestern, draussen (Adverbien), mit (Präposition), aber (Konjunktion)."],
["Er lernt *heute, *denn er schreibt *morgen eine Prüfung.",3,"heute, morgen (Adverbien), denn (Konjunktion)."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg4'],tokens,targets,instr:'Tippe alle Partikel im Text an.',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "oben ↔ ___", "unten", [], false, "Gegenteil des Adverbs «oben»: «unten»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "drinnen ↔ ___", "draussen", [], false, "Gegenteil des Adverbs «drinnen»: «draussen»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "vorne ↔ ___", "hinten", [], false, "Gegenteil des Adverbs «vorne»: «hinten»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "links ↔ ___", "rechts", [], false, "Gegenteil des Adverbs «links»: «rechts»."], ["adverbgeg", 1, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "hier ↔ ___", "dort", ["da"], false, "Gegenteil des Adverbs «hier»: «dort»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "immer ↔ ___", "nie", ["niemals"], false, "Gegenteil des Adverbs «immer»: «nie»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "gestern ↔ ___", "morgen", [], false, "Gegenteil des Adverbs «gestern»: «morgen»."], ["adverbgeg", 2, "sg3", "Schreibe das Adverb mit dem gegenteiligen Sinn.", "vorher ↔ ___", "nachher", ["danach"], false, "Gegenteil des Adverbs «vorher»: «nachher»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));


/* Grafiken für Theorie und Folien (gleiche Farben wie beim Anmalen: Präposition blau, Konjunktion pink, Adverb grün, Interjektion orange) */
const PVCSS='.pvg{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem;margin:.7rem 0}.pvk{border:2px solid var(--c);background:var(--b);color:var(--t);border-radius:14px;padding:.6rem .7rem;text-align:center}.pvk .ic{font-size:1.9rem;line-height:1.2}.pvk b.n{display:block;font-size:1.05rem}.pvk small{display:block;opacity:.9;margin-top:.15rem}.pvroot{width:fit-content;margin:.4rem auto 0;background:#7c3aed;color:#fff;border-radius:999px;padding:.45rem 1.2rem;font-weight:800;text-align:center}.pvroot small{display:block;font-weight:600;opacity:.9}.pvarrow{text-align:center;font-size:1.5rem;line-height:1;color:#7c3aed}.pvs{display:flex;flex-wrap:wrap;gap:.3rem;align-items:flex-end;margin:1rem 0 .5rem}.pvw{border:2px solid #cbd5e1;border-radius:8px;padding:.2rem .55rem;background:#fff;color:#0f172a;position:relative}.pvw.v{border-color:#dc2626;background:#fee2e2;color:#7f1d1d;font-weight:800}.pvw.k{border-color:#db2777;background:#fce7f3;color:#831843;font-weight:800}.pvw i{position:absolute;top:-1rem;left:50%;transform:translateX(-50%);font-size:.7rem;font-style:normal;font-weight:800;color:#64748b;white-space:nowrap}.pvcomma{align-self:flex-end;font-weight:800}.pvb{display:inline-block;border:2px solid #d97706;background:#fef3c7;color:#78350f;border-radius:20px 20px 20px 4px;padding:.35rem .8rem;font-weight:800;margin:.2rem .3rem .2rem 0}.pvb span{margin-right:.3rem}.pvsvg{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:.6rem;margin:.7rem 0}.pvsvg>div{border:1px solid #e2e8f0;border-radius:14px;background:#fff;padding:.4rem;text-align:center}.pvsvg svg{width:100%;height:auto;max-height:190px}.pvsvg b{display:block;margin-top:.1rem}';
const pvk=(c,ic,n,sm)=>'<div class="pvk f-'+c+'"><div class="ic">'+ic+'</div><b class="n">'+n+'</b><small>'+sm+'</small></div>';
const PV={
 tree:()=>'<div class="pvroot">Partikel<small>Teilchen · verändern sich nie</small></div><div class="pvarrow">↓</div><div class="pvg">'+pvk('praep','📍','Präposition','Verhältniswort<br>in, auf, mit, für')+pvk('konj','🔗','Konjunktion','Bindewort<br>und, aber, weil')+pvk('adv','🧭','Adverb','Umstandswort<br>heute, hier, gern')+pvk('interj','💬','Interjektion','Ausrufewort<br>ach, aua, hurra')+'</div>',
 praep:()=>'<div class="pvg">'+pvk('praep','📍','Ort','in, auf, unter, neben, bei')+pvk('praep','⏰','Zeit','nach, vor, seit, während')+pvk('praep','🛤️','Weg','durch, über, um, gegen')+pvk('praep','❓','Grund','wegen, trotz, für')+'</div>',
 wo:()=>'<div class="pvsvg"><div><svg viewBox="0 0 220 150" role="img" aria-label="Das Buch liegt auf dem Tisch"><rect x="30" y="86" width="160" height="10" rx="3" fill="#b45309"/><rect x="44" y="96" width="10" height="26" fill="#92400e"/><rect x="166" y="96" width="10" height="26" fill="#92400e"/><rect x="85" y="64" width="50" height="22" rx="3" fill="#2563eb"/><rect x="85" y="64" width="6" height="22" fill="#1e3a8a"/><text x="110" y="146" text-anchor="middle" font-size="22" font-weight="800" fill="#1e3a8a">Wo?</text><text x="110" y="40" text-anchor="middle" font-size="13" fill="#334155">Ruhe, kein Ziel</text></svg><b style="color:#1e3a8a">Dativ: auf <u>dem</u> Tisch</b></div>'+
  '<div><svg viewBox="0 0 220 150" role="img" aria-label="Ich lege das Buch auf den Tisch"><rect x="30" y="86" width="160" height="10" rx="3" fill="#b45309"/><rect x="44" y="96" width="10" height="26" fill="#92400e"/><rect x="166" y="96" width="10" height="26" fill="#92400e"/><rect x="20" y="40" width="50" height="22" rx="3" fill="#2563eb" opacity=".45"/><rect x="125" y="64" width="50" height="22" rx="3" fill="#2563eb"/><rect x="125" y="64" width="6" height="22" fill="#1e3a8a"/><path d="M72 46 Q110 10 140 58" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 4"/><path d="M140 58 l-9 -3 m9 3 l1 -10" stroke="#dc2626" stroke-width="3" fill="none"/><text x="110" y="146" text-anchor="middle" font-size="22" font-weight="800" fill="#991b1b">Wohin?</text></svg><b style="color:#991b1b">Akkusativ: auf <u>den</u> Tisch</b></div></div>',
 konj:()=>'<div class="pvs"><span class="pvw">Ich<i>1</i></span><span class="pvw v">gehe<i>2</i></span><span class="pvw">heim</span><span class="pvcomma">,</span><span class="pvw k">denn</span><span class="pvw">ich</span><span class="pvw v">bin<i>2</i></span><span class="pvw">müde.</span></div><p class="muted" style="margin:0 0 .6rem"><b>nebenordnend:</b> Nach «denn» bleibt das konjugierte Verb an zweiter Stelle.</p>'+
  '<div class="pvs"><span class="pvw">Ich</span><span class="pvw v">gehe</span><span class="pvw">heim</span><span class="pvcomma">,</span><span class="pvw k">weil</span><span class="pvw">ich</span><span class="pvw">müde</span><span class="pvw v">bin<i>Ende</i></span><span class="pvw">.</span></div><p class="muted" style="margin:0 0 .6rem"><b>unterordnend:</b> Nach «weil» rutscht das konjugierte Verb ans Ende.</p>',
 adv:()=>'<div class="pvg">'+pvk('adv','⏰','Temporal','Wann? Wie oft?<br>gestern, oft')+pvk('adv','📍','Lokal','Wo? Wohin?<br>hier, oben')+pvk('adv','🎯','Modal','Wie?<br>gern, leider')+pvk('adv','❓','Kausal','Warum?<br>deshalb, darum')+'</div>',
 interj:()=>'<div><span class="pvb"><span>🎉</span>Hurra!</span><span class="pvb"><span>😢</span>Ach!</span><span class="pvb"><span>🤕</span>Aua!</span><span class="pvb"><span>🤫</span>Pst!</span><span class="pvb"><span>🤢</span>Igitt!</span><span class="pvb"><span>👋</span>Hey!</span></div>'
};

const SECS=[
{id:'merkmale',title:'Was sind Partikel?',short:'Merkmale',min:6,note:'Partikel = unveränderliche Wörter. Veränderungsprobe: Kann man das Wort konjugieren oder deklinieren? Wenn nein: Partikel.',
 html:()=>PV.tree()+'<div class="grid2"><div class="card"><h3>Partikel verändern sich nicht</h3><p>Sie haben keine Endungen und keine Zeitformen: <b>und, in, heute, aber, dort</b>.</p></div>'+
 '<div class="card"><h3>Vier Arten</h3><p><b>Präpositionen</b> (Verhältniswörter): in, auf, mit, für</p><p><b>Konjunktionen</b> (Bindewörter): und, aber, weil, dass</p><p><b>Adverbien</b> (Umstandswörter): heute, hier, dort, gern</p><p><b>Interjektionen</b> (Ausrufewörter): ach, aua, hurra, hey</p></div></div>'+
 '<div class="callout"><b>Probe:</b> Kann man das Wort beugen (= die Form verändern, z. B. mit Endungen) oder mit einem Artikel verbinden? Wenn nicht, ist es ein Partikel. Wenige Adverbien lassen sich steigern (gern – lieber, oft – öfter). Sie bekommen dabei aber keine Endungen und bleiben Partikel.</div>'},
{id:'praep',title:'Präpositionen (Verhältniswörter)',short:'Präpositionen',min:12,note:'Präpositionen verlangen einen Fall. Wechselpräpositionen (an, auf, in, über, unter, vor, hinter, neben, zwischen): Wo? → Dativ. Wohin? → Akkusativ.',
 html:()=>'<p class="lead">Präpositionen stehen vor einem Nomen und zeigen Ort, Zeit, Weg oder Grund.</p>'+PV.praep()+
 T(['Fall','Beispiele','Merkhilfe'],[['Akkusativ','durch, für, gegen, ohne, um','«durch den Park»'],['Dativ','aus, bei, mit, nach, seit, von, zu','«mit dem Bus»'],['Genitiv (nur Niveau A)','wegen, während, trotz','«wegen des Regens»'],['Wechsel: Wo? Dativ · Wohin? Akkusativ','an, auf, in, über, unter, vor, hinter, neben, zwischen','«im Haus» / «ins Haus»']])+
 '<div class="callout">Kurzformen: im = in dem, zum = zu dem, vom = von dem, beim = bei dem, ins = in das. Im Alltag nimmt man meist die Kurzform. Die lange Form betont das Wort: «im Haus» (normal), «in dem Haus» (dieses bestimmte Haus).</div>'},
{id:'wechsel',title:'Wechselpräpositionen: Wo? oder Wohin?',short:'Wechselpräpositionen',min:8,note:'Neun Präpositionen verlangen je nach Frage Dativ oder Akkusativ. Wo? = Dativ (Ruhe). Wohin? = Akkusativ (Bewegung zu einem Ziel).',
 html:()=>'<p class="lead">Neun Präpositionen sind «Wechsler»: an, auf, hinter, in, neben, über, unter, vor, zwischen.</p>'+PV.wo()+
 T(['Frage','Fall','Beispiel','Merkhilfe'],[['Wo?','Dativ','Das Buch liegt <b>auf dem</b> Tisch.','Ruhe, kein Ziel'],['Wohin?','Akkusativ','Ich lege das Buch <b>auf den</b> Tisch.','Bewegung zu einem Ziel']])+
 '<div class="callout info">Kurzformen: <b>im Garten</b> (Wo?) / <b>in den Garten</b> oder <b>ins</b> Haus (Wohin?). Frage zuerst: Wo oder Wohin? Dann setzt du den Fall ein.</div>',
 uebung:{types:'wechsel,wechselfall',cats:'sg1'}},
{id:'konj',title:'Konjunktionen (Bindewörter)',short:'Konjunktionen',min:10,note:'Konjunktionen verbinden Wörter und Sätze. Nebenordnend (und, oder, aber, denn, sondern): verbindet gleichwertige Teile, das konjugierte Verb (Personalform) bleibt an zweiter Stelle. Unterordnend (weil, dass, obwohl, damit, wenn, ob, nachdem): leitet einen Nebensatz ein, das konjugierte Verb (Personalform) steht am Ende. Das Kapitel Haupt- und Nebensatz kommt später und vertieft das.',
 html:()=>PV.konj()+'<div class="grid2"><div class="card"><h3>Nebenordnend: gleichwertig verbinden</h3><p><b>und</b> (Aufzählung) · <b>oder</b> (Wahl) · <b>aber</b> (Gegensatz) · <b>denn</b> (Grund) · <b>sondern</b> (Ersatz)</p><p>Das konjugierte Verb (Personalform) bleibt an <b>zweiter Stelle</b>: «Ich gehe heim, denn ich <b>bin</b> müde.»</p></div>'+
 '<div class="card"><h3>Unterordnend: Nebensatz einleiten</h3><p><b>weil</b> (Grund) · <b>obwohl</b> (Gegensatz) · <b>damit</b> (Zweck) · <b>dass</b> (Inhalt) · <b>wenn</b> (Bedingung) · <b>ob</b> (Frage) · <b>nachdem</b> (Zeit)</p><p>Das konjugierte Verb (Personalform) steht am <b>Ende</b>: «Ich gehe heim, weil ich müde <b>bin</b>.»</p></div></div>'+
 '<div class="callout">Merkhilfe: Nach <b>und, oder, aber, denn, sondern</b> bleibt die Wortstellung gleich. Nach <b>weil, dass, obwohl …</b> rutscht das konjugierte Verb ans Satzende.</div>',
 uebung:{types:'konjart,konjstellung,konj',cats:'sg2'}},
{id:'adverb',title:'Adverbien (Umstandswörter)',short:'Adverbien',min:10,note:'Adverbien beantworten Fragen: Wann? Wo? Wie? Warum? Wohin? Sie bekommen keine Endungen.',
 html:()=>PV.adv()+T(['Art','Frage','Beispiele'],[['Temporal','Wann? Wie oft?','gestern, heute, bald, oft, nie, immer'],['Lokal','Wo? Wohin? Woher?','hier, dort, oben, draussen, links'],['Modal','Wie?','gern, leider, vielleicht, so, sehr'],['Kausal','Warum?','deshalb, darum, deswegen, trotzdem']])+
 '<div class="callout">Adverbien bekommen keine Endungen. Sie bestimmen das Verb, ein Adjektiv oder den ganzen Satz näher.</div>',
 uebung:{types:'adverbzu,adverb',cats:'sg3'}},
{id:'interj',title:'Interjektionen (Ausrufewörter)',short:'Interjektionen',min:6,note:'Interjektionen drücken ein Gefühl aus oder rufen jemanden an. Sie verändern sich nicht und gehören zu keinem Satzglied. Nach ihnen steht ein Komma oder ein Ausrufezeichen.',
 html:()=>'<p class="lead">Interjektionen sind kurze Ausrufe. Sie stehen oft am Satzanfang.</p>'+PV.interj()+
 T(['Was sie ausdrücken','Beispiele'],[['Gefühle','ach, oh, hurra, igitt, juhu'],['Schmerz','aua, autsch'],['Aufforderung oder Anruf','pst, hey, he']])+
 '<div class="grid2"><div class="card"><h3>Satzzeichen</h3><p>«<b>Hurra</b>, wir haben gewonnen!»</p><p>«<b>Hurra</b>! Wir haben gewonnen.»</p><p>Nach einer Interjektion steht ein Komma oder ein Ausrufezeichen.</p></div>'+
 '<div class="card"><h3>Probe</h3><p>Interjektionen verändern sich nie und passen in keinen Satzbau. Du kannst sie weglassen, der Satz bleibt vollständig.</p></div></div>',
 uebung:{types:'interj,interjein',cats:'sg5'}},
{id:'abgrenzung',title:'Adjektiv oder Adverb?',short:'Abgrenzung',lv:2,min:8,note:'Ab Niveau B. Adjektiv: steigerbar und mit Endung vor dem Nomen. Adverb: unveränderlich.',
 html:()=>'<div class="grid2"><div class="card"><h3>Adjektiv</h3><p>Das <b>schnelle</b> Auto. (vor dem Nomen, mit Endung)</p><p>Das Auto ist <b>schnell</b>. (nach «sein»)</p><p>Er rennt <b>schnell</b>. (beim Verb, bleibt unverändert)</p></div>'+
 '<div class="card"><h3>Adverb</h3><p>Er kommt <b>heute</b>. (keine Endung)</p><p>Sie wohnt <b>dort</b>. (nicht steigerbar)</p></div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Verwechslungen: das/dass, seit/seid, wieder/wider, als/wenn/wann.',
 html:()=>'<div class="grid3">'+[
  ['1 · Präposition oder Verbzusatz?','«Das Buch liegt <b>auf</b> dem Tisch.» (Präposition)<br>«Mach die Tür <b>auf</b>.» («aufmachen» ist ein trennbares Verb, «auf» ist der Verbzusatz.)','Eine Präposition braucht ein Nomen danach.'],
  ['2 · das oder dass?','«Ich weiss, <b>dass</b> er kommt.»','dass: leitet einen Nebensatz ein. Probe: dieses/welches → das.'],
  ['3 · seit oder seid?','«<b>Seit</b> gestern regnet es.» / «Ihr <b>seid</b> müde.»','seit = Präposition, seid = Verb (sein).'],
  ['4 · Verb am Ende','«Ich gehe, weil ich müde <b>bin</b>.»','Nach weil, obwohl, dass … steht das Verb am Ende.'],
  ['5 · Fall nach der Präposition','«mit <b>dem</b> Bus», «für <b>den</b> Bus»','Dativ nach mit, Akkusativ nach für.'],
  ['6 · Kurzformen','«im, zum, vom, beim»','im = in dem, zum = zu dem. Die Kurzform ist alltäglich, die lange Form betont das Wort.'],
  ['7 · als, wenn oder wann?','«<b>Als</b> ich klein war, wohnten wir in Bern.» (einmalig) / «Jedes Mal, <b>wenn</b> es regnet, nehme ich den Schirm.» (wiederholt) / «<b>Wann</b> kommst du?» (Frage)','als = einmal in der Vergangenheit. wenn = immer wieder oder in der Zukunft. wann = Frage nach der Zeit.'],,
  ['8 · deshalb oder weil?','«Ich bin krank, <b>deshalb</b> bleibe ich zu Hause.» / «Ich bleibe zu Hause, <b>weil</b> ich krank <b>bin</b>.»','Nach «deshalb, darum, trotzdem» (Adverbien) steht das Verb an zweiter Stelle. Nach «weil, obwohl» (Konjunktionen) steht es am Ende.'],,
  ['9 · Mundart-Fallen','Nicht: «wegen dem Regen», «dem Vater sein Auto». Sondern: «wegen des Regens», «das Auto des Vaters» (oder «vom Vater»).','In der Schriftsprache steht nach «wegen» der Genitiv. Der Dativ ist umgangssprachlich. «dem Vater sein Auto» schreibt man nicht.'],
  ['10 · wieder oder wider?','«Ich sehe dich <b>wieder</b>.» (nochmals) / «Er <b>wider</b>spricht mir.» (gegen)','wieder = nochmals, erneut. wider = gegen (widersprechen, der Widerstand, wider Willen).']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('praep,konj,art')}
];
const EX=[
 ['Setze eine Präposition ein: Ich fahre ___ dem Bus ___ Schule.','mit … zur',1],
 ['Welcher Fall folgt auf «mit»?','Dativ: mit dem Bus.',1],
 ['Setze eine Konjunktion ein: Ich bleibe zu Hause, ___ ich krank bin.','weil',1],
 ['Verbinde mit «obwohl»: Es regnet. Wir gehen hinaus.','Obwohl es regnet, gehen wir hinaus.',1],
 ['Unterstreiche alle Partikel: «Heute gehe ich mit dir ins Kino, denn ich habe Zeit.»','Heute · mit · ins · denn',1],
 ['Ordne zu: oft, in, aber, hier, für.','Adverb: oft, hier · Präposition: in, für · Konjunktion: aber',2],
 ['Wie lauten die Kurzformen? in dem, zu dem, von dem, bei dem','im · zum · vom · beim',2],
 ['Schreibe einen Satz mit «wegen» (Genitiv).','Wegen des Regens bleiben wir hier.',2],
 ['Setze ein: ___ ich klein war, wohnten wir in Bern. (einmalig)','Als',1],
 ['Setze ein: Jedes Mal, ___ es regnet, nehme ich den Schirm.','wenn',1],
 ['Setze ein: Ich weiss nicht, ___ der Bus kommt.','wann',1],
 ['Verbinde mit «deshalb»: Ich bin müde. Ich gehe schlafen.','Ich bin müde, deshalb gehe ich schlafen.',2],
 ['Verbinde mit «weil»: Ich bin müde. Ich gehe schlafen.','Ich gehe schlafen, weil ich müde bin.',2],
 ['Korrigiere: «Wegen dem Regen bleiben wir hier.»','Wegen des Regens bleiben wir hier.',2],
 ['Korrigiere: «Das ist dem Vater sein Auto.»','Das ist das Auto des Vaters. (oder: das Auto vom Vater)',2],
 ['Setze ein: Er hat den Test ___ bestanden. (nochmals)','wieder',1],
 ['Setze ein: Sie ___spricht ihrem Bruder. (gegen)','wider',2]
];
const merk=()=>T(['Art','Beispiele','Merksatz'],[['Partikel','und, in, heute, aber','Sie verändern sich nicht.'],['Präposition','in, auf, mit, für, wegen','Steht vor einem Nomen und verlangt einen Fall.'],['Konjunktion','und, aber, weil, dass, obwohl','Verbindet Wörter und Sätze. Nebenordnend (und, oder, aber, denn, sondern): Verb bleibt. Unterordnend (weil, dass, obwohl): Verb am Ende.'],['Adverb','heute, hier, gern, deshalb','Beantwortet Wann? Wo? Wie? Warum?'],['Interjektion','ach, aua, hurra, hey','Drückt ein Gefühl aus oder ruft jemanden an. Danach steht ein Komma oder Ausrufezeichen.']])+
 T(['Fall','Präpositionen'],[['Akkusativ','durch, für, gegen, ohne, um'],['Dativ','aus, bei, mit, nach, seit, von, zu'],['Genitiv','wegen, während, trotz'],['Wechsel (Wo? Dat. · Wohin? Akk.)','an, auf, in, über, unter, vor, hinter, neben, zwischen']]);
const UEM={'praep':{types:'praep',cats:'sg1'},'konj':{types:'konj',cats:'sg2'},'adverb':{types:'adverb',cats:'sg3'},'abgrenzung':{types:'art',cats:'sg4'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{basic:5,konj:3},opt:{pron:.3,adj:.2,det:{def:.5,indef:.3,poss:.2}},classes:[{gl:'Präposition',cats:['sg1'],lv:1},{gl:'Konjunktion',cats:['sg2'],lv:1},{gl:'Adverb',cats:['sg3'],lv:1},{gl:'Partikel',cats:['sg4'],lv:1}],perClass:30});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
const gp=s=>s.replace('___','<span class="gap">_____</span>');
[
['Ich warte ___ den Bus.','auf',['für','mit','von'],1,'«warten auf» + Akkusativ: Ich warte auf den Bus.'],
['Sie fährt ___ dem Zug nach Basel.','mit',['für','gegen','ohne'],1,'«mit» verlangt den Dativ: mit dem Zug.'],
['Wir bleiben ___ des Regens zu Hause.','wegen',['mit','nach','bei'],2,'«wegen» verlangt den Genitiv: wegen des Regens.'],
['Das Geschenk ist ___ dich.','für',['mit','bei','aus'],1,'«für» verlangt den Akkusativ: für dich.'],
['Wir gehen ___ dem Essen spazieren.','nach',['für','gegen','ohne'],1,'«nach» verlangt den Dativ: nach dem Essen.']
].forEach(p=>task.push({typ:'praep',stufe:p[3],lv:p[3]===3?2:1,cats:['sg1'],sent:gp(p[0]),opts:[p[1]].concat(p[2]),answer:p[1],why:'<b>'+p[1]+'.</b> '+p[4]}));
[
['Ich lerne, ___ ich eine gute Note schreibe.','damit',['denn','und','sondern'],2,'«damit» leitet einen Nebensatz ein und nennt den Zweck.'],
['Es regnet, ___ wir gehen trotzdem hinaus.','aber',['weil','dass','obwohl'],1,'«aber» verbindet zwei Hauptsätze.'],
['Ich weiss, ___ du recht hast.','dass',['aber','denn','sondern'],1,'«dass» leitet einen Nebensatz ein.'],
['Er ist nicht müde, ___ hellwach.','sondern',['weil','dass','damit'],2,'«sondern» steht nach einer Verneinung.'],
['___ es regnet, bleiben wir drinnen.','Weil',['Denn','Aber','Und'],2,'«Weil» leitet einen Nebensatz ein. Das Verb steht am Ende.']
].forEach(k=>task.push({typ:'konj',stufe:k[3],lv:k[3]===3?2:1,cats:['sg2'],sent:gp(k[0]),opts:[k[1]].concat(k[2]),answer:k[1],why:'<b>'+k[1]+'.</b> '+k[4]}));
[
['Welches Wort ist ein Adverb?',['heute','Tisch','laufen','rot'],'heute','«heute» sagt, wann etwas geschieht (Adverb der Zeit).',1],
['Welches Wort ist ein Adverb?',['hier','Schule','singen','mit'],'hier','«hier» sagt, wo etwas ist (Adverb des Ortes).',1],
['Welches Wort ist ein Adverb?',['oft','Katze','schlafen','der'],'oft','«oft» sagt, wie häufig etwas geschieht.',1]
].forEach(a=>task.push({typ:'adverb',stufe:a[4],lv:1,cats:['sg3'],prompt:a[0],opts:a[1],answer:a[2],why:a[3]}));
task.push=_p0;
})();

GT.chapter({id:'partikel',teil:'wort',nr:7,css:PVCSS,title:'Partikel',big:'Und, in, heute, aber',desc:'Präpositionen, Konjunktionen, Adverbien und Interjektionen',
 ex:'«'+mk('part','Heute')+' gehe ich '+mk('part','mit')+' dir ins Kino, '+mk('part','denn')+' ich habe Zeit.»',
 goals:['Ich erkenne unveränderliche Wörter (Partikel).','Ich wähle die richtige Präposition und den richtigen Fall (auch Wo? oder Wohin?).','Ich unterscheide nebenordnende und unterordnende Konjunktionen.','Ich erkenne Adverbien und bestimme sie mit Fragen.','Ich erkenne Interjektionen und setze die Satzzeichen.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{praep:{label:'Präposition einsetzen',short:'in, auf, mit, für, wegen',instr:'Welche Präposition passt?',hint:'Wo? Wohin? Womit? Wegen wem oder was?',ref:'praep'},
  konj:{label:'Konjunktion einsetzen',short:'und, aber, weil, obwohl',instr:'Welche Konjunktion passt?',hint:'Grund (weil), Gegensatz (obwohl, aber), Zweck (damit), Bedingung (wenn).',ref:'konj'},
  adverb:{label:'Adverbien',short:'Wann? Wo? Wie? Warum?',instr:'Wähle die richtige Antwort.',hint:'Stelle die passende Frage.',ref:'adverb'},
  art:{label:'Partikelart bestimmen',short:'Adverb, Präposition, Konjunktion oder Interjektion',instr:'Welche Partikelart ist das markierte Wort?',hint:'Vor einem Nomen: Präposition. Verbindet Sätze: Konjunktion. Beantwortet Wann/Wo/Wie: Adverb. Drückt ein Gefühl aus: Interjektion.',ref:'merkmale'},
  text:{icon:'🔍',label:'Partikel im Text',short:'Alle Partikel in einem Text finden',instr:'Tippe alle Partikel im Text an.',hint:'Partikel verändern sich nicht.',ref:'merkmale'},
  adverbgeg:{icon:'↔️',label:'Adverbien: Gegenteile',short:'Adverbien mit gegenteiliger Bedeutung',instr:'Schreibe das Gegenteil.',hint:'Adverbien nennen Ort, Zeit oder Art. Welches Wort passt als Gegensatz?',ref:'adverb'},
  konjart:{label:'Konjunktionen: neben- oder unterordnend',short:'Nebenordnend oder unterordnend',instr:'Ist die Konjunktion nebenordnend oder unterordnend?',hint:'Bleibt das konjugierte Verb (Personalform) an zweiter Stelle, ist sie nebenordnend. Steht es am Ende, ist sie unterordnend.',ref:'konj'},
  konjstellung:{icon:'🔗',label:'Verbstellung nach Konjunktionen',short:'Welcher Satz ist richtig?',instr:'Welcher Satz ist richtig?',hint:'Nach weil, dass, obwohl … steht das konjugierte Verb am Ende. Nach und, aber, denn, oder bleibt es an zweiter Stelle.',ref:'konj'},
  adverbzu:{icon:'🧭',label:'Adverbien zuordnen',short:'Lokal, temporal, modal oder kausal',instr:'Welche Art von Adverb ist das markierte Wort?',hint:'Stelle die Frage: Wo? (lokal), Wann? (temporal), Wie? (modal), Warum? (kausal).',ref:'adverb'},
  interj:{icon:'💥',label:'Interjektionen erkennen',short:'Ausrufewörter finden und zuordnen',instr:'Wähle die richtige Antwort.',hint:'Interjektionen drücken ein Gefühl aus oder rufen jemanden an.',ref:'interj'},
  interjein:{icon:'⌨️',label:'Interjektionen schreiben',short:'Eine passende Interjektion selber schreiben',instr:'Schreibe eine passende Interjektion.',hint:'Welches Gefühl hat die Person? Schmerz, Freude, Ekel?',ref:'interj'},
  wechsel:{icon:'↔️',label:'Wechselpräpositionen einsetzen',short:'auf dem / auf den, im / ins',instr:'Welche Form passt? Frage: Wo oder Wohin?',hint:'Wo? Dativ. Wohin? Akkusativ.',ref:'wechsel'},
  wechselfall:{icon:'📍',label:'Wo oder Wohin? Fall bestimmen',short:'Dativ oder Akkusativ',instr:'Welcher Fall steht nach der Wechselpräposition?',hint:'Wo? Dativ. Wohin? Akkusativ.',ref:'wechsel'},
  markieren:{label:'Partikel markieren',short:'Alle Partikel finden',instr:'Tippe alle Partikel an.',hint:'Partikel verändern sich nicht.',ref:'merkmale'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
