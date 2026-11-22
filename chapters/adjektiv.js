/* Kapitel Wortlehre 5: Adjektiv. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Steigerung',sg2:'Deklination (Endungen)',sg3:'Adjektiv erkennen',sg4:'Gegenteile und Wortbildung'};
const task=[];
const gap=s=>s.replace('___','<span class="gap">_____</span>');

/* Steigerung: [Grundform, Komparativ, Superlativ, falsche Komp, falsche Sup, Stufe] */
const S=[
['schnell','schneller','am schnellsten',['schnellter','mehr schnell','schnellerer'],['am schnellern','am schnellsen','am schnellesten'],1],
['klein','kleiner','am kleinsten',['kleinner','mehr klein','kleinerer'],['am kleinern','am kleinsen','am kleinesten'],1],
['gross','grösser','am grössten',['grosser','grössterer','mehr gross'],['am grosssten','am grosten','am grossten'],1],
['alt','älter','am ältesten',['alter','alterer','ältere'],['am altesten','am ältsten','am ältersten'],1],
['jung','jünger','am jüngsten',['junger','jungerer','jüngerer'],['am jungsten','am jüngesten','am jüngersten'],1],
['stark','stärker','am stärksten',['starker','stärkerer','starkerer'],['am starksten','am stärkesten','am starkesten'],1],
['kalt','kälter','am kältesten',['kalter','kältere','kaltere'],['am kältsten','am kaltesten','am kaltsten'],2],
['lang','länger','am längsten',['langer','längerer','langerer'],['am langsten','am längesten','am längersten'],2],
['warm','wärmer','am wärmsten',['warmer','wärmerer','warmerer'],['am warmsten','am wärmesten','am wärmersten'],2],
['hart','härter','am härtesten',['harter','härtere','hartere'],['am härtsten','am hartesten','am hartsten'],2],
['heiss','heisser','am heissesten',['heiss','heissere','heisster'],['am heissten','am heisssten','am heissen'],2],
['kurz','kürzer','am kürzesten',['kurzer','kürzerer','kurzerer'],['am kürzsten','am kurzesten','am kurzsten'],2],
['gut','besser','am besten',['guter','gutter','mehr gut'],['am gutesten','am gutsten','am bessersten'],1],
['viel','mehr','am meisten',['vieler','mehrer','vielerer'],['am vielsten','am mehrsten','am vielesten'],1],
['gern','lieber','am liebsten',['gerner','mehr gern','gernerer'],['am gernsten','am liebesten','am liebstens'],1],
['hoch','höher','am höchsten',['hocher','höcher','hochere'],['am hochsten','am höhsten','am höchesten'],2],
['nah','näher','am nächsten',['naher','nähere','mehr nah'],['am nahsten','am nähsten','am nähesten'],2],
['dumm','dümmer','am dümmsten',['dummer','dummerer','dümmerer'],['am dummsten','am dümmesten','am dummesten'],3],
['klug','klüger','am klügsten',['kluger','klugerer','klügerer'],['am klugsten','am klügesten','am klugesten'],3],
['scharf','schärfer','am schärfsten',['scharfer','schärferer','scharferer'],['am scharfsten','am schärfesten','am scharfesten'],3]
];
S.forEach(s=>{
 task.push({typ:'komp',stufe:s[5],lv:s[5]===3?2:1,cats:['sg1'],prompt:'Wie lautet der <b>Komparativ</b> von «'+s[0]+'»?',opts:[s[1]].concat(s[3]),answer:s[1],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b>'});
 task.push({typ:'komp',stufe:s[5],lv:s[5]===3?2:1,cats:['sg1'],prompt:'Wie lautet der <b>Superlativ</b> von «'+s[0]+'»?',opts:[s[2]].concat(s[4]),answer:s[2],why:'<b>'+s[0]+' – '+s[1]+' – '+s[2]+'.</b>'});
});

/* Steigerungsform bestimmen */
const F=[
['Das Haus ist <b>grösser</b> als das Auto.','Komparativ',1,'Vergleich mit «als»: Komparativ.'],
['Anna ist die <b>schnellste</b> Läuferin.','Superlativ',1,'Endung -st: Superlativ.'],
['Das Wasser ist <b>kalt</b>.','Positiv',1,'Keine Steigerung: Positiv.'],
['Heute ist es <b>wärmer</b> als gestern.','Komparativ',1,'Vergleich mit «als»: Komparativ.'],
['Er ist <b>am stärksten</b>.','Superlativ',1,'«am … -sten»: Superlativ.'],
['Mia ist <b>so gross wie</b> Tim.','Positiv',2,'«so … wie»: gleich, also Positiv.'],
['Das ist der <b>beste</b> Film.','Superlativ',2,'beste ist Superlativ von «gut».'],
['Ich esse <b>lieber</b> Pizza.','Komparativ',2,'lieber ist Komparativ von «gern».'],
['Sie singt <b>am liebsten</b> im Chor.','Superlativ',2,'am liebsten ist Superlativ von «gern».'],
['Der Turm ist <b>höher</b> als das Haus.','Komparativ',2,'Vergleich mit «als».']
];
F.forEach(f=>task.push({typ:'stufe',stufe:f[2],lv:1,cats:['sg1'],sent:f[0],opts:['Positiv','Komparativ','Superlativ'],answer:f[1],why:'<b>'+f[1]+'.</b> '+f[3]}));

/* Deklination: [Satz, Antwort, falsch, Stufe, Hinweis] */
const D=[
['Das ist ein ___ Hund.','kleiner',['kleine','kleines','kleinen'],1,'«ein Hund» ist männlich, Nominativ: ein kleiner Hund.'],
['Das ist eine ___ Katze.','kleine',['kleiner','kleines','kleinen'],1,'«eine Katze» ist weiblich, Nominativ: eine kleine Katze.'],
['Das ist ein ___ Kind.','kleines',['kleine','kleiner','kleinen'],1,'«ein Kind» ist sächlich, Nominativ: ein kleines Kind.'],
['Der ___ Baum steht im Garten.','grosse',['grosser','grosses','grossen'],1,'Nach «der» endet das Adjektiv auf -e.'],
['Die ___ Blume blüht.','rote',['roter','rotes','roten'],1,'Nach «die» (Nominativ) endet das Adjektiv auf -e.'],
['Das ___ Haus ist alt.','neue',['neuer','neues','neuen'],1,'Nach «das» (Nominativ) endet das Adjektiv auf -e.'],
['Ich sehe den ___ Hund.','grossen',['grosse','grosser','grosses'],2,'Akkusativ männlich: den grossen Hund.'],
['Ich kaufe einen ___ Apfel.','roten',['rote','roter','rotes'],2,'Akkusativ männlich: einen roten Apfel.'],
['Wir haben eine ___ Wohnung.','schöne',['schöner','schönes','schönen'],2,'Akkusativ weiblich: eine schöne Wohnung.'],
['Sie liest ein ___ Buch.','spannendes',['spannende','spannender','spannenden'],2,'Akkusativ sächlich: ein spannendes Buch.'],
['Wir helfen dem ___ Mann.','alten',['alte','alter','altes'],2,'Dativ: dem alten Mann.'],
['Er gibt der ___ Frau das Buch.','netten',['nette','netter','nettes'],2,'Dativ weiblich: der netten Frau.'],
['Das ist das Auto des ___ Lehrers.','neuen',['neue','neuer','neues'],2,'Genitiv: des neuen Lehrers.'],
['Mit einem ___ Stift schreibe ich.','schwarzen',['schwarze','schwarzer','schwarzes'],2,'Dativ nach «mit»: einem schwarzen Stift.'],
['Die ___ Kinder spielen draussen.','kleinen',['kleine','kleiner','kleines'],2,'Mehrzahl: die kleinen Kinder.'],
['Er trägt ___ Schuhe.','schwarze',['schwarzen','schwarzer','schwarzes'],3,'Ohne Artikel, Mehrzahl, Akkusativ: schwarze Schuhe.'],
['Sie trinkt ___ Tee.','heissen',['heisse','heisser','heisses'],3,'Ohne Artikel, Akkusativ männlich: heissen Tee.'],
['Ich esse ___ Brot.','frisches',['frische','frischer','frischen'],3,'Ohne Artikel, Akkusativ sächlich: frisches Brot.'],
['Wegen des ___ Wetters bleiben wir hier.','schlechten',['schlechte','schlechter','schlechtes'],3,'Genitiv: wegen des schlechten Wetters.']
];
D.forEach(d=>{const base=d[1].replace(/(es|en|er|e)$/,'');task.push({typ:'endung',stufe:d[3],lv:d[3]===3?2:1,cats:['sg2'],sent:gap(d[0]).replace('<span class="gap">_____</span>','<span class="gap">_____</span> <i class="muted">('+base+')</i>'),opts:[d[1]].concat(d[2]),answer:d[1],why:'<b>'+d[1]+'.</b> '+d[4]})});

/* Adjektive erkennen (Option) */
const E=[
['Welches Wort ist ein Adjektiv?',['schön','Haus','laufen','und'],'schön','Adjektive beschreiben und lassen sich steigern: schön, schöner, am schönsten.',1],
['Welches Wort ist ein Adjektiv?',['gross','Tisch','schlafen','in'],'gross','gross, grösser, am grössten.',1],
['Welches Wort ist ein Adjektiv?',['freundlich','Freundin','freuen','mit'],'freundlich','Die Endung -lich bildet oft Adjektive.',1],
['Welches Wort ist ein Adjektiv?',['mutig','Mut','ermutigen','aber'],'mutig','Die Endung -ig bildet oft Adjektive.',2],
['Welches Wort ist <b>kein</b> Adjektiv?',['gestern','rot','gross','klein'],'gestern','«gestern» ist ein Adverb, es lässt sich nicht steigern.',2],
['Welches Wort ist <b>kein</b> Adjektiv?',['sehr','schnell','laut','leise'],'sehr','«sehr» ist ein Adverb.',2],
['Welches Wort ist <b>kein</b> Adjektiv?',['heute','gut','alt','neu'],'heute','«heute» ist ein Adverb.',2],
['Welches Adjektiv kann man <b>nicht</b> steigern?',['tot','schnell','gross','alt'],'tot','Absolute Adjektive wie tot, leer, schwanger kann man nicht steigern.',3],
['Welches Adjektiv kann man <b>nicht</b> steigern?',['leer','schön','klein','gut'],'leer','«leer» ist schon das Maximum.',3],
['Welches Wort sagt, <b>wie</b> etwas ist (Adjektiv)?',['sauber','Sauberkeit','putzen','dort'],'sauber','Adjektive antworten auf die Frage «Wie ist es?».',1],
['Was gilt für ein Adjektiv vor dem Nomen («ein schönes Haus»)?',['Es steht vor dem Nomen und hat eine Endung.','Es steht nach dem Verb ohne Endung.','Es ist ein Verb.','Es ist ein Artikel.'],'Es steht vor dem Nomen und hat eine Endung.','Vor dem Nomen wird das Adjektiv dekliniert: ein schön<b>es</b> Haus.',2]
];
E.forEach(e=>task.push({typ:'erkennen',stufe:e[4],lv:e[4]===3?2:1,cats:['sg3'],prompt:e[0],opts:e[1],answer:e[2],why:e[3]}));

/* Gegenteile / Wortbildung */
const G=[
['Was ist das Gegenteil von «gross»?',['klein','hoch','lang','dick'],'klein','gross ↔ klein.',1],
['Was ist das Gegenteil von «laut»?',['leise','dick','klein','dunkel'],'leise','laut ↔ leise.',1],
['Was ist das Gegenteil von «alt»?',['jung','dick','klein','schwach'],'jung','alt ↔ jung. (Bei Dingen sagt man: alt ↔ neu.)',1],
['Was ist das Gegenteil von «schnell»?',['langsam','leise','müde','schwach'],'langsam','schnell ↔ langsam.',1],
['Was ist das Gegenteil von «freundlich»?',['unfreundlich','traurig','ruhig','klein'],'unfreundlich','Mit der Vorsilbe un- bildet man Gegenteile.',2],
['Was ist das Gegenteil von «möglich»?',['unmöglich','bestimmt','schwer','schlecht'],'unmöglich','un- + möglich.',2],
['Welche Endung bildet aus «Freund» ein Adjektiv?',['-lich (freundlich)','-ung','-heit','-keit'],'-lich (freundlich)','Mit -lich, -ig, -isch, -bar, -sam bildet man Adjektive.',2],
['Wie heisst das Adjektiv zu «der Mut»?',['mutig','mutlich','mutisch','mutsam'],'mutig','Mut + -ig = mutig.',2],
['Wie heisst das Adjektiv zu «die Gefahr»?',['gefährlich','gefahrig','gefahrisch','gefahrbar'],'gefährlich','Gefahr + -lich = gefährlich (mit Umlaut).',3],
['Wie heisst das Adjektiv zu «die Hoffnung»?',['hoffnungsvoll','hoffnungig','hoffnungisch','hoffnungbar'],'hoffnungsvoll','Hoffnung + -voll. Das Gegenteil ist «hoffnungslos».',3]
];
G.forEach(g=>task.push({typ:'wort',stufe:g[4],lv:g[4]===3?2:1,cats:['sg4'],prompt:g[0],opts:g[1],answer:g[2],why:g[3]}));

/* Markieren */
const M=[
['Der *kleine Hund frisst das *frische Futter.',1,'Adjektive: kleine, frische.'],
['Das *schnelle Auto fährt auf der *langen Strasse.',1,'Adjektive: schnelle, lange.'],
['Die *nette Lehrerin trägt einen *roten Mantel.',1,'Adjektive: nette, roten.'],
['Der *alte Mann sitzt auf einer *bequemen Bank.',2,'Adjektive: alte, bequemen.'],
['Im *dunklen Wald hörten wir *leise Schritte.',2,'Adjektive: dunklen, leise.'],
['Sie ist *klüger als ihr Bruder, aber er ist *schneller.',3,'Adjektive (Komparativ): klüger, schneller.']
];
M.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'markieren',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Adjektive an.',why:m[2]});
});


/* Wortart im Text erkennen */
const TX=[
["Der *kleine Hund hat ein *weiches Fell.",1,"Adjektive: kleine, weiches."],
["Das *rote Auto fährt auf der *nassen Strasse.",1,"Adjektive: rote, nassen."],
["Die *neue Lehrerin ist sehr *freundlich.",1,"neue und freundlich. «sehr» ist ein Adverb."],
["Im *dunklen Wald lebt ein *scheuer Fuchs mit *buschigem Schwanz.",2,"dunklen, scheuer, buschigem."],
["Der Kuchen schmeckt *süss, aber die Suppe ist *salzig.",2,"süss und salzig stehen nach dem Verb und werden nicht verändert."],
["Sie trägt eine *warme Jacke, weil es *kalt ist.",2,"warme und kalt."],
["Es war ein *gelungenes Fest mit *leckerem Essen.",3,"gelungenes (vom Partizip) und leckerem."]
];
TX.forEach(m=>{
  const raw=m[0].split(' '),tokens=raw.map(w=>w.replace(/^\*/,'')),targets=[];raw.forEach((w,i)=>{if(w[0]==='*')targets.push(i);});
  task.push({typ:'text',stufe:m[1],lv:m[1]===3?2:1,cats:['sg3'],tokens,targets,instr:'Tippe alle Adjektive im Text an.',why:m[2]});
});


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "gross ↔ ___", "klein", [], false, "Gegenteil von «gross»: «klein»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "hell ↔ ___", "dunkel", [], false, "Gegenteil von «hell»: «dunkel»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "schnell ↔ ___", "langsam", [], false, "Gegenteil von «schnell»: «langsam»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "stark ↔ ___", "schwach", [], false, "Gegenteil von «stark»: «schwach»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "leise ↔ ___", "laut", [], false, "Gegenteil von «leise»: «laut»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "warm ↔ ___", "kalt", ["kühl"], false, "Gegenteil von «warm»: «kalt»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "alt ↔ ___", "jung", ["neu"], false, "Gegenteil von «alt»: «jung»."], ["gegenteil", 1, "sg4", "Schreibe das Gegenteil.", "früh ↔ ___", "spät", [], false, "Gegenteil von «früh»: «spät»."], ["gegenteil", 2, "sg4", "Schreibe das Gegenteil.", "billig ↔ ___", "teuer", [], false, "Gegenteil von «billig»: «teuer»."], ["gegenteil", 2, "sg4", "Schreibe das Gegenteil.", "mutig ↔ ___", "feige", ["ängstlich"], false, "Gegenteil von «mutig»: «feige»."], ["gegenteil", 2, "sg4", "Schreibe das Gegenteil.", "ehrlich ↔ ___", "unehrlich", ["verlogen", "unaufrichtig"], false, "Gegenteil von «ehrlich»: «unehrlich»."], ["gegenteil", 2, "sg4", "Schreibe das Gegenteil.", "möglich ↔ ___", "unmöglich", [], false, "Gegenteil von «möglich»: «unmöglich»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Freude → ___", "freudig", ["freudvoll"], false, "Aus dem Nomen «Freude» wird das Adjektiv «freudig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Kraft → ___", "kräftig", ["kraftvoll"], false, "Aus dem Nomen «Kraft» wird das Adjektiv «kräftig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Glück → ___", "glücklich", [], false, "Aus dem Nomen «Glück» wird das Adjektiv «glücklich»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Farbe → ___", "farbig", [], false, "Aus dem Nomen «Farbe» wird das Adjektiv «farbig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Hunger → ___", "hungrig", [], false, "Aus dem Nomen «Hunger» wird das Adjektiv «hungrig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Mut → ___", "mutig", [], false, "Aus dem Nomen «Mut» wird das Adjektiv «mutig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Wind → ___", "windig", [], false, "Aus dem Nomen «Wind» wird das Adjektiv «windig»."], ["ableiten", 2, "sg4", "Bilde das Adjektiv (klein geschrieben).", "Staub → ___", "staubig", [], false, "Aus dem Nomen «Staub» wird das Adjektiv «staubig»."]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'merkmale',title:'Was ist ein Adjektiv?',short:'Merkmale',min:6,note:'Adjektive beschreiben Nomen. Steigerungsprobe als Erkennungsmerkmal. Abgrenzung zum Adverb ansprechen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Adjektive beschreiben</h3><p>Sie sagen, <b>wie</b> etwas ist: ein <b>kleiner</b> Hund, ein <b>rotes</b> Auto, ein <b>netter</b> Mensch.</p><p class="muted">Man nennt sie auch Wie-Wörter oder Eigenschaftswörter.</p></div>'+
 '<div class="card"><h3>Die Steigerungsprobe</h3><p>Kannst du das Wort steigern? Dann ist es meist ein Adjektiv.</p><p class="muted">Zusatzprobe: Du kannst es vor ein Nomen setzen, dann bekommt es eine Endung (ein schönes Haus).</p>'+T(['Positiv','Komparativ','Superlativ'],[['schnell','schneller','am schnellsten'],['schön','schöner','am schönsten']])+'</div></div>'+
 '<div class="callout">Adjektive stehen <b>vor dem Nomen</b> (ein schnelles Auto, mit Endung) oder <b>nach «sein»</b> (Das Auto ist schnell, ohne Endung).</div>'},
{id:'steigerung',title:'Steigerung',short:'Steigerung',min:10,note:'Drei Stufen. Unregelmässige: gut – besser – am besten, viel – mehr – am meisten, gern – lieber – am liebsten. Umlaut bei einsilbigen Adjektiven oft. «gern» und «viel» führt der Duden als Adverb bzw. Pronomen; hier als Sonderfälle der Steigerung.',
 html:()=>T(['Stufe','Fachwort','Bildung','Beispiel'],[['1','Positiv (Grundstufe)','Grundform','schnell'],['2','Komparativ (Höherstufe)','+ -er','schneller (als)'],['3','Superlativ (Höchststufe)','am … + -sten','am schnellsten']])+
 '<div class="grid2" style="margin-top:.8rem"><div class="card"><h3>Oft mit Umlaut</h3><p>alt – <b>ä</b>lter – am <b>ä</b>ltesten</p><p>gross – <b>grö</b>sser – am <b>grö</b>ssten</p><p>jung – <b>jü</b>nger – am <b>jü</b>ngsten</p></div>'+
 '<div class="card"><h3>Unregelmässig</h3><p>gut – <b>besser</b> – am <b>besten</b></p><p>viel – <b>mehr</b> – am <b>meisten</b></p><p>gern – <b>lieber</b> – am <b>liebsten</b></p><p class="muted">«gern» ist eigentlich ein Adverb, lässt sich aber ausnahmsweise steigern.</p></div></div>'+
 '<div class="callout">Vergleich: <b>so … wie</b> (gleich), <b>-er … als</b> (Komparativ). Beispiel: «Er ist grösser <b>als</b> ich.»</div>'},
{id:'endungen',title:'Adjektive vor dem Nomen',short:'Endungen',min:12,note:'Wichtig: Endung hängt von Artikel, Geschlecht und Fall ab. Im Niveau A nur Nominativ und Akkusativ intensiv. Tabelle mit den vier Fällen bei Niveau A.',
 html:()=>'<p class="lead">Steht das Adjektiv <b>vor dem Nomen</b>, bekommt es eine <b>Endung</b>. Die Endung zeigt Geschlecht, Zahl und Fall.</p>'+
 '<div class="card"><h3>Nach «der, die, das» (bestimmter Artikel)</h3>'+T(['Fall','männlich','weiblich','sächlich','Mehrzahl'],[['Nominativ','der grosse Hund','die kleine Katze','das neue Haus','die alten Bücher'],['Akkusativ','den grossen Hund','die kleine Katze','das neue Haus','die alten Bücher'],['Dativ','dem grossen Hund','der kleinen Katze','dem neuen Haus','den alten Büchern'],['Genitiv','des grossen Hundes','der kleinen Katze','des neuen Hauses','der alten Bücher']])+'</div>'+
 '<div class="callout"><b>Faustregel:</b> Nach «der, die, das» endet das Adjektiv auf <b>-e</b> im Nominativ und im Akkusativ weiblich und sächlich, sonst auf <b>-en</b>.</div>'},
{id:'ohneartikel',title:'Ohne Artikel und nach «ein»',short:'Ohne Artikel',lv:3,min:8,note:'Nur Niveau A. Nach «ein» zeigt das Adjektiv das Geschlecht im Nominativ: ein kleiner Hund, eine kleine Katze, ein kleines Kind.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nach «ein, eine»</h3><p>Das Adjektiv zeigt Geschlecht:</p><p>ein klein<b>er</b> Hund · eine klein<b>e</b> Katze · ein klein<b>es</b> Kind</p></div>'+
 '<div class="card"><h3>Ohne Artikel</h3><p>Das Adjektiv übernimmt meist die Endung des Artikels:</p><p>frisch<b>es</b> Brot · heiss<b>en</b> Tee · schwarz<b>e</b> Schuhe</p></div></div>'},
{id:'wortbildung',title:'Wortbildung',short:'Wortbildung',lv:2,min:8,note:'Ab Niveau B. Gegenteile mit un-, -los. Adjektive bilden mit -lich, -ig, -isch, -bar, -sam, -voll.',
 html:()=>'<div class="grid2"><div class="card"><h3>Gegenteile</h3><p>un-: freundlich – <b>un</b>freundlich</p><p>-los / -voll: hoffnungs<b>voll</b> – hoffnungs<b>los</b></p><p>Echte Gegenteile: gross – klein, laut – leise</p></div>'+
 '<div class="card"><h3>Adjektive bilden</h3>'+T(['Nomen','Endung','Adjektiv'],[['Freund','-lich','freundlich'],['Mut','-ig','mutig'],['Wind','-ig','windig'],['Gefahr','-lich','gefährlich'],['Kind','-isch','kindisch'],['Ehre','-voll','ehrenvoll']])+'</div></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Jeden Stolperstein mit einem Beispielsatz festhalten lassen.',
 html:()=>'<div class="grid3">'+[
  ['1 · Adjektiv beim Verb','«Sie singt <b>schön</b>.» (Adjektiv beim Verb, bleibt unverändert)<br>«Das <b>schöne</b> Lied.» (Adjektiv vor Nomen)','Beim Verb und nach «sein» bleibt das Adjektiv ohne Endung, vor einem Nomen bekommt es eine.'],
  ['2 · Endung nicht vergessen','«Das ist ein schön<b>es</b> Haus.»','Vor dem Nomen braucht das Adjektiv eine Endung, nach «sein» nicht.'],
  ['3 · «als» oder «wie»?','«grösser <b>als</b>», «so gross <b>wie</b>»','Komparativ + als, gleich = so … wie.'],
  ['4 · Unregelmässige Steigerung','«gut – besser – am besten»','Nicht «guter» oder «mehr gut».'],
  ['5 · Umlaut','«alt – älter – am ältesten»','Viele einsilbige Adjektive bekommen einen Umlaut.'],
  ['6 · Nicht steigerbar','«tot, leer, rund»','Diese Adjektive steigert man nicht.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('komp,stufe,endung')}
];
const EX=[
 ['Steigere: schnell, alt, gut, gern.','schnell – schneller – am schnellsten · alt – älter – am ältesten · gut – besser – am besten · gern – lieber – am liebsten',1],
 ['Setze die richtige Endung ein: Das ist ein (klein) ___ Hund.','kleiner',1],
 ['Setze die richtige Endung ein: Ich sehe den (gross) ___ Baum.','grossen (Akkusativ männlich)',1],
 ['Unterstreiche alle Adjektive: «Der alte Mann trägt einen schweren Koffer.»','alte · schweren',1],
 ['Bilde das Gegenteil: freundlich, möglich, ehrlich.','unfreundlich · unmöglich · unehrlich',2],
 ['Bilde ein Adjektiv aus: Mut, Gefahr, Freund.','mutig · gefährlich · freundlich',2],
 ['Schreibe je einen Satz mit Komparativ und Superlativ von «klein».','Beispiel: Mia ist kleiner als Tim. Anna ist am kleinsten.',2],
 ['Erkläre: «Sie singt schön.» Ist «schön» ein Adjektiv?','Ja: Es steht beim Verb und bleibt unverändert, lässt sich aber steigern (schöner).',3]
];
const merk=()=>T(['Thema','Merksatz'],[['Erkennen','Adjektive beschreiben und lassen sich meist steigern.'],['Steigerung','Positiv: schnell · Komparativ: schneller · Superlativ: am schnellsten'],['Unregelmässig','gut – besser – am besten · viel – mehr – am meisten · gern – lieber – am liebsten'],['Vergleich','grösser als · so gross wie'],['Endungen','Vor dem Nomen braucht das Adjektiv eine Endung; nach «sein» nicht.'],['Nach dem Artikel','-e im Nominativ sowie im Akkusativ weiblich und sächlich, sonst -en (Mehrzahl immer -en).'],['Wortbildung','un-, -lich, -ig, -isch, -bar, -sam, -voll']]);
const UEM={'merkmale':{types:'erkennen',cats:'sg3'},'steigerung':{types:'komp,stufe',cats:'sg1'},'endungen':{types:'endung',cats:'sg2'},'ohneartikel':{types:'endung',cats:'sg2'},'wortbildung':{types:'wort',cats:'sg4'}};SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
if(GT.wg)GT.wg.tasks(task,{n:320,kinds:{basic:5,poss:1},opt:{pron:.15,adj:.85,det:{def:.45,indef:.3,poss:.25}},classes:[{gl:'Adjektiv',cats:['sg3'],lv:1}],perClass:34});
GT.chapter({id:'adjektiv',teil:'wort',nr:5,title:'Adjektiv',big:'Ein kleiner Hund, ein schnelles Auto',desc:'Eigenschaften, Steigerung und Endungen',
 ex:'«Der '+mk('adj','kleine')+' Hund ist '+mk('adj','schneller')+' als die '+mk('adj','alte')+' Katze.»',
 goals:['Ich erkenne Adjektive mit der Steigerungsprobe.','Ich steigere Adjektive (Positiv, Komparativ, Superlativ).','Ich setze die richtige Endung vor dem Nomen.','Ich bilde Gegenteile und Adjektive aus Nomen.'],
  write:['komp','endung'], cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{komp:{winstr:'Schreibe die richtige Form.',label:'Steigern',short:'Komparativ und Superlativ',instr:'Wähle die richtige Form.',hint:'Komparativ: -er. Superlativ: am … -sten. Achte auf Umlaut und Sonderformen.',ref:'steigerung'},
  stufe:{label:'Steigerungsstufe bestimmen',short:'Positiv, Komparativ, Superlativ',instr:'In welcher Stufe steht das Adjektiv?',hint:'«als» → Komparativ. «am … -sten» → Superlativ.',ref:'steigerung'},
  endung:{winstr:'Schreibe das Adjektiv mit der richtigen Endung.',label:'Endung einsetzen',short:'Adjektiv vor dem Nomen',instr:'Welche Form passt in die Lücke?',hint:'Welches Geschlecht und welchen Fall hat das Nomen?',ref:'endungen'},
  erkennen:{label:'Adjektive erkennen',short:'Adjektiv oder nicht?',instr:'Wähle die richtige Antwort.',hint:'Steigerungsprobe: schön, schöner, am schönsten.',ref:'merkmale'},
  wort:{label:'Gegenteile und Wortbildung',short:'un-, -lich, -ig …',instr:'Wähle die richtige Antwort.',hint:'Schau in der Wortbildung nach.',ref:'wortbildung'},
  text:{icon:'🔍',label:'Adjektive im Text',short:'Alle Adjektive in einem Text finden',instr:'Tippe alle Adjektive im Text an.',hint:'Wie ist das Nomen? Das Wort davor beschreibt es.',ref:'merkmale'},
  gegenteil:{icon:'↔️',label:'Gegenteile',short:'Das Gegenteil eines Adjektivs schreiben',instr:'Schreibe das Gegenteil.',hint:'Mit welchem Wort kannst du das Gegenteil ausdrücken?',ref:'wortbildung'},
  ableiten:{icon:'🌱',label:'Adjektive bilden',short:'Aus Nomen Adjektive machen',instr:'Schreibe das Adjektiv.',hint:'Endungen: -ig, -lich, -isch, -bar, -sam.',ref:'wortbildung'},
  markieren:{label:'Adjektive markieren',short:'Alle Adjektive finden',instr:'Tippe alle Adjektive an.',hint:'Wie ist das Nomen? Das Wort davor beschreibt es.',ref:'merkmale'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
