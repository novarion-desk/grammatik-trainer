/* Niveau A (26.11.2026): anspruchsvolle Aufgaben, nur in Niveau A sichtbar (lv 3).
   Muss nach den Kapiteln und vor glossar.js/langtext.js geladen werden.
   Hilfen: W = Auswahl [Antwort, Falsche …], I = selber schreiben, M = antippen (* vor jedem gesuchten Wort),
   T = trennen (| hinter dem Wort). */
(function(){
'use strict';
const GT=window.GT;if(!GT||!GT.chapters)return;
const GAP='<span class="gap">_____</span>',gap=s=>s.replace(/___/g,GAP),hl=s=>s.replace(/\[(.+?)\]/g,'<span class="hl">$1</span>');
let C=null;
function add(t){const c=GT.chapters[C];if(!c||!c.TYPES[t.typ])throw new Error('niveau-a: '+C+' '+t.typ);
  c.TASKS.push(Object.assign({id:c.TASKS.reduce((m,x)=>Math.max(m,Number(x.id)||0),0)+1,stufe:3,lv:3},t));}
function W(typ,cat,prompt,sent,opts,why){const t={typ,cats:[cat],opts,answer:opts[0],why:'<b>'+opts[0]+(/[.!?]$/.test(opts[0])?'':'.')+'</b> '+why};
  if(prompt)t.prompt=prompt;if(sent)t.sent=gap(hl(sent));add(t);}
function I(typ,cat,prompt,sent,answer,why,accept){add({typ,cats:[cat],input:true,noCards:true,prompt,sent:gap(sent),answer,accept:accept||[],why:'<b>'+answer+(/[.!?]$/.test(answer)?'':'.')+'</b> '+why});}
function M(typ,cat,instr,s,why){const targets=[],tokens=s.split(' ').map((w,i)=>{if(w[0]==='*'){targets.push(i);return w.slice(1);}return w;});add({typ,cats:[cat],tokens,targets,instr,why});}
function T(typ,cat,s,why){const cuts=[],tokens=s.split(' ').map((w,i)=>{if(w.endsWith('|')){cuts.push(i);return w.slice(0,-1);}return w;});add({typ,cats:[cat],tokens,cuts,why});}
const WA='Welche Wortart hat das markierte Wort?',WAO=a=>[a].concat(['Nomen','Verb','Adjektiv','Pronomen','Partikel'].filter(x=>x!==a));

C='wortarten';
[['Beim [Wandern] reden wir wenig.','Nomen','nomen','«Beim» enthält einen Artikel: Das Verb ist hier ein Nomen.'],
['Etwas [Neues] auszuprobieren, braucht Mut.','Nomen','nomen','Nach «etwas» wird das Adjektiv zum Nomen.'],
['Das [Weinen] des Kindes hört man weit.','Nomen','nomen','Artikel «das»: Das Verb ist zum Nomen geworden.'],
['Sie spricht sehr [deutlich].','Adjektiv','adj','Man kann es steigern: deutlich, deutlicher.'],
['Das [gelungene] Fest bleibt in Erinnerung.','Adjektiv','adj','Das Wort steht zwischen Artikel und Nomen und wird dekliniert.'],
['[Dank] seiner Hilfe wurden wir fertig.','Partikel','part','«Dank» ist hier eine Präposition und wird kleingeschrieben, ausser am Satzanfang.'],
['Er kommt [morgens] immer zu spät.','Partikel','part','«morgens» ist ein Adverb und lässt sich nicht verändern.'],
['[Wer] hat das Fenster geöffnet?','Pronomen','pron','«Wer» ist ein Fragepronomen.']
].forEach(a=>W('bestimmen',a[2],'',a[0],WAO(a[1]),a[3]));
M('markieren','nomen','Tippe alle Nomen an (auch nominalisierte).','Beim *Aufräumen fand *Lena nichts *Wichtiges ausser einem alten *Foto.','Nomen: Aufräumen, Lena, Wichtiges, Foto.');
M('markieren','verb','Tippe alle Teile der Verben an.','Der Brief *ist erst gestern *abgeschickt *worden.','Verbteile: ist, abgeschickt, worden.');

C='nomen';
[['Er wünscht dir alles ___.',['Gute','gute'],'Nach «alles» wird das Adjektiv zum Nomen.'],
['Es gibt nichts ___ zu berichten.',['Neues','neues'],'Nach «nichts» wird das Adjektiv zum Nomen.'],
['Im ___ hat sie recht.',['Allgemeinen','allgemeinen'],'«im Allgemeinen»: Artikel in «im», darum gross.'],
['Heute ___ treffen wir uns.',['Abend','abend'],'Tageszeiten nach «heute», «gestern», «morgen» schreibt man gross.'],
['Er trainiert immer ___.',['abends','Abends'],'«abends» ist ein Adverb und wird kleingeschrieben.'],
['Das war das ___, was ich je gesehen habe.',['Schönste','schönste'],'Artikel «das» ohne folgendes Nomen: Das Adjektiv wird zum Nomen.'],
['Vor der Prüfung ist mir ___.',['angst','Angst'],'In «mir ist angst» wird «angst» wie ein Adjektiv gebraucht und kleingeschrieben.']
].forEach(a=>W('gross','sg3','',a[0],a[1],a[2]));
W('wissen','sg4','Welches Wort ist ein abstraktes Nomen?','',['Freiheit','Fenster','Lehrer','Apfel'],'Die Freiheit kann man nicht anfassen.');
W('wissen','sg5','Was ist das Grundwort in «Haustürschlüssel»?','',['Schlüssel','Haus','Tür','Haustür'],'Das letzte Wort ist das Grundwort.');
I('kompo','sg5','Setze zusammen. Schreibe das Nomen mit Artikel und gross.','Geburt + s + Tag + s + Geschenk → ___','das Geburtstagsgeschenk','Das letzte Wort bestimmt den Artikel: das Geschenk.',['Geburtstagsgeschenk']);
I('einzahl','sg2','Schreibe die Einzahl mit Artikel.','Kakteen → ___','der Kaktus','Fremdwörter haben oft besondere Mehrzahlformen.',['Kaktus']);
I('einzahl','sg2','Schreibe die Einzahl mit Artikel.','Atlanten → ___','der Atlas','Mehrzahl: die Atlanten oder die Atlasse.',['Atlas']);

C='verb';
[['[Bis Freitag werde ich das Buch gelesen haben.]',['Futur II','Futur I','Perfekt','Plusquamperfekt'],'werden + Partizip II + haben.'],
['[Er wird den Bus verpasst haben.]',['Futur II','Futur I','Perfekt','Präteritum'],'Futur II kann auch eine Vermutung ausdrücken.'],
['[Wir waren schon abgefahren.]',['Plusquamperfekt','Perfekt','Präteritum','Futur II'],'«waren» (Präteritum von «sein») + Partizip II.']
].forEach(a=>W('zeit','sg2','',a[0],a[1],a[2]));
I('einsetzen','sg2','Setze das Verb ins Futur II. Schreibe alle fehlenden Wörter.','Bis morgen ___ ich die Aufgabe ___. (erledigen)','werde erledigt haben','Futur II: werden + Partizip II + haben.');
I('umformen','sg2','Setze den Satz ins Passiv, ohne «man».','Man repariert die Strasse.','Die Strasse wird repariert.','Passiv: werden + Partizip II.');
I('umformen','sg2','Setze den Satz ins Passiv, ohne «man». Die Zeitform bleibt Perfekt.','Man hat das Fenster geöffnet.','Das Fenster ist geöffnet worden.','Passiv im Perfekt: sein + Partizip II + «worden».');
I('umformen','sg2','Schreibe den Satz im Plusquamperfekt.','Wir gehen früh nach Hause.','Wir waren früh nach Hause gegangen.','Plusquamperfekt: «waren» + Partizip II.');
I('umformen','sg2','Schreibe den Satz im Präteritum.','Sie zieht nach Bern um.','Sie zog nach Bern um.','Trennbares Verb «umziehen»: zog … um.');
W('wissen','sg4','Welcher Satz steht im Konjunktiv II?','',['Ich käme gern mit.','Ich kam gern mit.','Ich komme gern mit.','Komm doch mit!'],'«käme» ist der Konjunktiv II von «kommen».');
W('wissen','sg4','Welches Verb gibt es nur zusammen mit «sich» (echt reflexiv)?','',['sich beeilen','laufen','helfen','schlafen'],'«sich beeilen» gibt es nur mit «sich».');
W('wissen','sg4','In welchem Satz ist «haben» ein Vollverb?','',['Ich habe einen Hund.','Ich habe gut geschlafen.','Ich habe das gewusst.','Ich habe lange gewartet.'],'Nur hier steht «haben» allein und bedeutet «besitzen».');

C='adjektiv';
[['Mit ___ (gross) Freude packte er das Geschenk aus.',['grosser','grossem','grosse','grossen'],'Ohne Artikel, weiblich, Dativ.'],
['Trotz ___ (stark) Regens spielten sie weiter.',['starken','starkes','starker','starkem'],'Genitiv männlich ohne Artikel: -en.'],
['Die Meinung ___ (viel) Leute zählt.',['vieler','vielen','viele','vielem'],'Genitiv Mehrzahl ohne Artikel: -er.'],
['Bei ___ (schön) Wetter gehen wir baden.',['schönem','schönen','schönes','schöner'],'Ohne Artikel, sächlich, Dativ: -em.'],
['Alle ___ (neu) Schüler warten draussen.',['neuen','neue','neuer','neuem'],'Nach «alle» folgt die Endung -en.'],
['Einige ___ (alt) Häuser wurden abgerissen.',['alte','alten','alter','altes'],'Nach «einige» folgt in diesem Satz die Endung -e.'],
['Als ___ (gut) Freund half er mir sofort.',['guter','guten','gute','gutem'],'Bezieht sich auf «er»: Nominativ, ohne Artikel.']
].forEach(a=>W('endung','sg2','',a[0],a[1],a[2]));
W('komp','sg1','Wie lautet der Superlativ von «viel»?','',['am meisten','am vielsten','am mehrsten','am vielesten'],'viel – mehr – am meisten.');
W('erkennen','sg3','Welches Adjektiv kann man nicht sinnvoll steigern?','',['schriftlich','freundlich','laut','schnell'],'Etwas ist schriftlich oder nicht.');
W('wort','sg4','Wie heisst das Adjektiv zu «der Zweifel»?','',['zweifelhaft','zweifellich','zweifelsam','zweifelbar'],'Nachsilbe -haft.');
I('ableiten','sg4','Bilde das Adjektiv (klein geschrieben).','Neid → ___','neidisch','Nachsilbe -isch.');
I('ableiten','sg4','Bilde das Adjektiv (klein geschrieben).','Mühe → ___','mühsam','Auch «mühevoll» und «mühselig» sind richtig.',['mühevoll','mühselig']);

C='partikel';
W('praep','sg1','','___ des starken Sturms fiel kein einziger Baum um.',['Trotz','Wegen','Infolge','Aufgrund'],'Es geschieht etwas gegen die Erwartung.');
W('praep','sg1','','___ eines Briefes schickte sie nur eine E-Mail.',['Statt','Trotz','Wegen','Während'],'«statt» zeigt einen Ersatz: E-Mail und nicht Brief.');
[['Je mehr du übst, ___ sicherer wirst du.',['desto','als','wie','dann'],'Zweiteilig: je … desto.'],
['Er ging, ___ sich zu verabschieden.',['ohne','damit','weil','dass'],'«ohne … zu» mit Infinitiv.'],
['Das war nicht Mia, ___ ihre Schwester.',['sondern','aber auch','denn','oder'],'Nach einer Verneinung berichtigt «sondern».'],
['___ er viel gelernt hatte, fiel ihm die Prüfung schwer.',['Obwohl','Weil','Damit','Falls'],'«obwohl» zeigt einen Gegensatz.']
].forEach(a=>W('konj','sg2','',a[0],a[1],a[2]));
const PA=a=>[a].concat(['Präposition','Konjunktion','Adverb','Interjektion'].filter(x=>x!==a));
[['Er blieb zu Hause, [denn] er war krank.','Konjunktion','«denn» verbindet zwei Hauptsätze.'],
['Er war krank, [trotzdem] kam er.','Adverb','Nach «trotzdem» folgt direkt das Verb: Es ist ein eigenes Satzglied.'],
['[Während] der Pause regnete es.','Präposition','Es steht vor einer Nomengruppe.'],
['[Während] ich lese, hört sie Musik.','Konjunktion','Es leitet einen Nebensatz ein.'],
['[Seit] ich hier wohne, fahre ich Velo.','Konjunktion','Es leitet einen Nebensatz ein.']
].forEach(a=>W('art','sg4','',a[0],PA(a[1]),a[2]));
W('wechsel','sg1','','Er hängt die Jacke ___ Stuhl. (über)',['über den','über dem'],'Wohin? Akkusativ.');
W('wechsel','sg1','','Die Lampe hängt ___ Tisch. (über)',['über dem','über den'],'Wo? Dativ.');

C='wl-sl';
W('wissen','sg2','Welche Wortgruppe ist genau ein Satzglied? «Der Bruder meiner Freundin spielt am Samstag Handball.»','',['Der Bruder meiner Freundin','meiner Freundin spielt','spielt am Samstag','am Samstag Handball'],'Die Wörter lassen sich nur gemeinsam verschieben.');
W('wissen','sg2','Wie viele Satzglieder hat «Seit letztem Montag trainiert die Mannschaft meines Bruders in der neuen Halle.»?','',['4','5','6','7'],'Seit letztem Montag | trainiert | die Mannschaft meines Bruders | in der neuen Halle.');
W('wissen','sg2','Welche Aussage stimmt?','',['Ein einzelnes Wort kann ein Satzglied sein.','Ein Satzglied besteht immer aus mehreren Wörtern.','Wortart und Satzglied sind dasselbe.','Jedes Wort ist ein eigenes Satzglied.'],'Beispiel: «Wir» in «Wir kommen.»');
W('wissen','sg2','Was gilt für «morgen» in «Wir kommen morgen.»?','',['Wortart Partikel, im Satz ein eigenes Satzglied','Wortart Nomen, kein Satzglied','Wortart Verb, Teil des Prädikats','Wortart Adjektiv, Teil eines anderen Satzglieds'],'«morgen» ist ein Adverb und lässt sich allein verschieben.');
W('wissen','sg3','Wie viele Personalformen hat «Als er ankam, hatten alle gegessen, obwohl sie warten wollten.»?','',['3','2','4','5'],'ankam, hatten, wollten.');
I('zaehlen','sg2','Wie viele Satzglieder hat der Satz? Schreibe die Zahl.','Am Abend erzählt der Vater seinen Kindern im Wohnzimmer eine Geschichte.','6','Am Abend | erzählt | der Vater | seinen Kindern | im Wohnzimmer | eine Geschichte.');
I('zaehlen','sg2','Wie viele Satzglieder hat der Satz? Schreibe die Zahl.','Die kleine Schwester meines Freundes lacht.','2','Die kleine Schwester meines Freundes | lacht.');

C='verbale';
W('zaehlen','sg2','Wie viele Teile hat das Prädikat? «Das Auto muss bis morgen repariert worden sein.»','',['4','2','3','5'],'muss, repariert, worden, sein.');
W('zaehlen','sg2','Wie viele Teile hat das Prädikat? «Er wird wohl eingeschlafen sein.»','',['3','1','2','4'],'wird, eingeschlafen, sein.');
W('zaehlen','sg2','Wie viele Teile hat das Prädikat? «Sie ruft ihre Mutter heute Abend an.»','',['2','1','3','4'],'ruft … an: trennbares Verb.');
I('praedikat','sg2','Schreibe das ganze Prädikat (alle Verbteile).','Der Brief ist gestern abgeschickt worden.','ist abgeschickt worden','Alle drei Verbteile gehören dazu.');
I('praedikat','sg2','Schreibe das ganze Prädikat (alle Verbteile).','Wir hätten früher losfahren sollen.','hätten losfahren sollen','Alle drei Verbteile gehören dazu.');
I('wortkette','sg4','Bilde die verbale Wortkette (Rohform des Satzes).','Er hat sein Velo geputzt.','Sein Velo geputzt haben','Das Subjekt fällt weg, die Personalform steht in der Grundform am Schluss.');
I('wortkette','sg4','Bilde die verbale Wortkette (Rohform des Satzes).','Die Aufgabe ist gelöst worden.','Gelöst worden sein','«Die Aufgabe» ist das Subjekt und fällt weg.');
I('wortkette','sg4','Bilde die verbale Wortkette (Rohform des Satzes).','Du sollst deinem Bruder helfen.','Deinem Bruder helfen sollen','Das Subjekt «du» fällt weg.');
W('wissen','sg3','In welchem Satz enthält das Prädikat ein Modalverb?','',['Er darf heute länger bleiben.','Er wird heute länger bleiben.','Er ist heute länger geblieben.','Er bleibt heute länger weg.'],'«dürfen» ist ein Modalverb.');

C='verschiebe';
W('probe','sg2','Wie viele Satzglieder hat «Am letzten Ferientag hat uns der Nachbar mit dem hohen Zaun seinen Garten gezeigt.»?','',['5','4','6','7'],'Am letzten Ferientag | hat … gezeigt | uns | der Nachbar mit dem hohen Zaun | seinen Garten.');
W('probe','sg1','Welche Wörter bleiben beim Verschieben zusammen? «Die Frau mit dem roten Hut wartet an der Haltestelle.»','',['Die Frau mit dem roten Hut','Hut wartet','wartet an der','mit dem roten Hut wartet'],'Diese Wortgruppe ist ein Satzglied.');
W('probe','sg2','Welche Umstellung ergibt einen richtigen Aussagesatz? «Wir besuchen morgen unsere Tante.»','',['Unsere Tante besuchen wir morgen.','Morgen wir besuchen unsere Tante.','Unsere Tante wir besuchen morgen.','Besuchen morgen wir unsere Tante.'],'Das Verb bleibt an zweiter Stelle.');
I('umstellen','sg2','Stelle den Satz um. Beginne mit «Seinem Bruder».','Er leiht seinem Bruder oft das Velo.','Seinem Bruder leiht er oft das Velo.','Das Verb bleibt an zweiter Stelle.');
I('umstellen','sg2','Stelle den Satz um. Beginne mit «Wegen des Regens».','Das Spiel fällt wegen des Regens aus.','Wegen des Regens fällt das Spiel aus.','Das Verb bleibt an zweiter Stelle, «aus» bleibt am Schluss.');
T('trenn','sg1','Der Trainer unserer Mannschaft| erklärt| den Spielern| nach der Pause| die neue Taktik.','Jede Wortgruppe lässt sich als Ganzes verschieben.');

C='satzarten';
const SB=a=>[a].concat(['Einfacher Satz','Zusammengesetzter Satz','Satzfragment'].filter(x=>x!==a));
[['«Nach einem langen und anstrengenden Tag endlich zu Hause.»','Satzfragment','sg5','Es gibt keine Personalform.'],
['«Kaum war er weg, klingelte das Telefon.»','Zusammengesetzter Satz','sg4','Zwei Personalformen: war, klingelte.'],
['«Wegen der grossen Hitze blieben die Fenster des alten Schulhauses den ganzen Tag geschlossen.»','Einfacher Satz','sg4','Trotz der Länge gibt es nur eine Personalform.']
].forEach(a=>W('bau',a[2],'',a[0],SB(a[1]),a[3]));
W('wissen','sg1','Welcher Satz ist wie eine Frage gebaut, ist aber als Aufforderung gemeint?','',['Kannst du bitte leiser sein?','Wo bist du gewesen?','Du bist sehr leise.','Wie leise das ist!'],'Man erwartet keine Antwort, sondern eine Handlung.');
W('wissen','sg4','Wie viele Teilsätze hat «Als es klingelte, packten alle ihre Sachen und gingen.»?','',['3','1','2','4'],'Drei Personalformen: klingelte, packten, gingen.');
I('umformen','sg3','Forme den Aussagesatz in einen Fragesatz um.','Ihr habt die Aufgaben gelöst.','Habt ihr die Aufgaben gelöst?','Die Personalform steht an erster Stelle.');
I('umformen','sg3','Forme den Aussagesatz in einen Aufforderungssatz um.','Du gibst mir das Buch.','Gib mir das Buch!','Befehlsform von «geben»: gib.');
I('umformen','sg3','Forme den Aussagesatz in einen Aufforderungssatz um.','Ihr seid pünktlich.','Seid pünktlich!','Befehlsform Mehrzahl: seid.');

C='hs-ns';
const GF=a=>[a].concat(['einfacher Satz','Satzverbindung','Satzgefüge'].filter(x=>x!==a));
[['«Weil der Bus, der sonst pünktlich ist, ausfiel, gingen wir zu Fuss.»','Satzgefüge','Ein Hauptsatz mit zwei Nebensätzen.'],
['«Wegen des Ausfalls des Busses gingen wir an diesem kalten Morgen zu Fuss.»','einfacher Satz','Nur eine Personalform: gingen.'],
['«Der Bus fiel aus, deshalb gingen wir zu Fuss.»','Satzverbindung','«deshalb» ist ein Adverb, das Verb folgt direkt: zwei Hauptsätze.']
].forEach(a=>W('gefuege','sg2','',a[0],GF(a[1]),a[2]));
const EL=a=>[a].concat(['unterordnende Konjunktion','Relativpronomen oder Relativadverb','Fragewort'].filter(x=>x!==a));
[['Das Dorf, [wo] ich aufgewachsen bin, ist klein.','Relativpronomen oder Relativadverb','«wo» bezieht sich auf «Dorf».'],
['Niemand weiss, [wo] er steckt.','Fragewort','Indirekte Frage: Wo steckt er?'],
['Sie fragt, [ob] wir kommen.','unterordnende Konjunktion','«ob» ist eine Konjunktion, die eine indirekte Frage einleitet.']
].forEach(a=>W('einleit','sg3','',a[0],EL(a[1]),a[2]));
[['«<b>Hätte ich Zeit</b>, käme ich mit.»','Uneingeleiteter Nebensatz: gemeint ist «Wenn ich Zeit hätte».'],
['«<b>Kommt er pünktlich</b>, fahren wir sofort los.»','Uneingeleiteter Nebensatz: gemeint ist «Wenn er pünktlich kommt».']
].forEach(a=>W('teilsatz','sg1','',a[0],['Nebensatz','Hauptsatz'],a[1]));
I('verbinden','sg2','Verbinde mit «obwohl». Der Nebensatz steht vorne. Setze das Komma.','Er war krank. Er kam zur Schule.','Obwohl er krank war, kam er zur Schule.','Nach dem vorangestellten Nebensatz folgt direkt das Verb.');
I('verbinden','sg2','Verbinde mit «bevor». Der Nebensatz steht am Schluss. Setze das Komma.','Wasch dir die Hände. Du isst.','Wasch dir die Hände, bevor du isst.','Im Nebensatz steht das Verb am Schluss.');
I('verbinden','sg2','Füge den zweiten Satz als Relativsatz mit «die» in den ersten ein.','Die Frau winkt uns. Sie wohnt nebenan.','Die Frau, die nebenan wohnt, winkt uns.','Der eingeschobene Relativsatz steht zwischen zwei Kommas.');
M('markieren','sg1','Tippe alle Wörter des Nebensatzes an.','Der Hund, *den *wir *gestern *sahen, gehört Lea.','Relativsatz: «den wir gestern sahen».');

C='zgs';
[[['Ich besuche meine Tante und helfe ihr.','Ich besuche und helfe meiner Tante.','Ich besuche und helfe meine Tante.','Ich besuche meiner Tante und helfe sie.'],'«besuchen» verlangt den Akkusativ, «helfen» den Dativ.'],
[['Er sah den Hund und gab ihm Futter.','Er sah und gab dem Hund Futter.','Er sah und gab den Hund Futter.','Er sah dem Hund und gab ihn Futter.'],'«sehen» und «geben» verlangen verschiedene Fälle.'],
[['Wir danken der Lehrerin und loben sie.','Wir danken und loben der Lehrerin.','Wir danken und loben die Lehrerin.','Wir danken der Lehrerin und loben ihr.'],'«danken» verlangt den Dativ, «loben» den Akkusativ.']
].forEach(a=>W('falsch','sg3','Welcher Satz ist richtig?','',a[0],a[1]));
W('erkenne','sg1','Was wird nur einmal genannt? «Heute spielt Lea Geige und morgen Klavier.»','',['Subjekt und Prädikat','nur das Subjekt','nur das Prädikat','das Objekt'],'Im zweiten Teil fehlen «Lea» und «spielt».');
W('erkenne','sg1','Was wird nur einmal genannt? «Im Garten spielen die Kinder und bellt der Hund.»','',['die Ortsangabe «Im Garten»','das Subjekt','das Prädikat','das Objekt'],'«Im Garten» gilt für beide Teile.');
I('zieh','sg2','Ziehe die beiden Sätze zu einem Satz zusammen.','Mia kocht die Suppe. Mia deckt den Tisch.','Mia kocht die Suppe und deckt den Tisch.','Das gemeinsame Subjekt steht nur einmal.');
I('zieh','sg2','Ziehe die beiden Sätze zu einem Satz zusammen.','Er ist früh aufgestanden. Er ist joggen gegangen.','Er ist früh aufgestanden und joggen gegangen.','Subjekt und Hilfsverb stehen nur einmal.');
I('zieh','sg2','Ziehe die beiden Sätze zu einem Satz zusammen.','Anna liest einen Krimi. Ben liest ein Comicheft.','Anna liest einen Krimi und Ben ein Comicheft.','Das gemeinsame Verb steht nur einmal.');
I('zieh','sg2','Ziehe die beiden Sätze zu einem Satz zusammen.','Tim hat einen Brief geschrieben. Lea hat eine Karte geschrieben.','Tim hat einen Brief geschrieben und Lea eine Karte.','Gemeinsame Verbteile stehen nur einmal.',['Tim hat einen Brief und Lea eine Karte geschrieben.']);
})();
