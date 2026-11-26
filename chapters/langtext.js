/* Lange Texte: in den Wortlehre-Kapiteln gibt es zusätzlich eine eigene Übung mit einem längeren Text.
   Wortarten: alle Wortarten anmalen. Nomen, Verb, Adjektiv, Pronomen, Partikel: alle Wörter dieser Wortart antippen. */
(function(){
'use strict';
const GT=window.GT;if(!GT||!GT.chapters)return;
/* Wort|Wortart (nomen, verb, adj, pron, part). Artikel zählen hier zu den Pronomen, Adverbien, Präpositionen und Konjunktionen zu den Partikeln. */
const TXT=[
[1,"Heute|part geht|verb Mia|nomen mit|part ihrer|pron Familie|nomen in|part den|pron Zoo|nomen. Dort|part sieht|verb sie|pron einen|pron grossen|adj Elefanten|nomen. Er|pron trinkt|verb gerade|part Wasser|nomen. Danach|part essen|verb alle|pron ein|pron leckeres|adj Eis|nomen."],
[2,"Letzte|adj Woche|nomen besuchte|verb unsere|pron Klasse|nomen ein|pron altes|adj Schloss|nomen. Der|pron Führer|nomen erzählte|verb spannende|adj Geschichten|nomen, und|part wir|pron lauschten|verb gespannt|part. Weil|part es|pron draussen|part regnete|verb, blieben|verb wir|pron lange|part in|part dem|pron kalten|adj Keller|nomen."],
[3,"Gestern|part Abend|nomen kam|verb mein|pron Bruder|nomen müde|adj von|part dem|pron Training|nomen nach|part Hause|nomen. Obwohl|part er|pron kaum|part noch|part laufen|verb konnte|verb, lachte|verb er|pron laut|part und|part erzählte|verb von|part dem|pron wichtigen|adj Spiel|nomen. Meine|pron Mutter|nomen kochte|verb ihm|pron eine|pron heisse|adj Suppe|nomen, denn|part er|pron hatte|verb grossen|adj Hunger|nomen."],
[1,"Am|part Montag|nomen geht|verb Anna|nomen mit|part ihrer|pron Freundin|nomen in|part die|pron Schule.|nomen Sie|pron tragen|verb schwere|adj Taschen.|nomen Im|part Klassenzimmer|nomen wartet|verb schon|part die|pron nette|adj Lehrerin.|nomen Heute|part schreiben|verb alle|pron ein|pron Diktat.|nomen"],
[1,"Der|pron kleine|adj Hund|nomen rennt|verb über|part die|pron grosse|adj Wiese.|nomen Er|pron jagt|verb einen|pron bunten|adj Ball.|nomen Danach|part trinkt|verb er|pron frisches|adj Wasser.|nomen Seine|pron Besitzerin|nomen lacht.|verb"],
[1,"Im|part Sommer|nomen fahren|verb wir|pron an|part den|pron See.|nomen Das|pron Wasser|nomen ist|verb warm|adj und|part klar.|adj Wir|pron bauen|verb eine|pron Sandburg|nomen und|part essen|verb kalte|adj Wassermelone.|nomen Am|part Abend|nomen sind|verb alle|pron zufrieden.|adj"],
[1,"Opa|nomen kocht|verb heute|part eine|pron heisse|adj Suppe.|nomen Er|pron schneidet|verb frisches|adj Gemüse|nomen und|part gibt|verb es|pron in|part den|pron grossen|adj Topf.|nomen Bald|part riecht|verb es|pron im|part ganzen|adj Haus.|nomen"],
[1,"Auf|part dem|pron Pausenhof|nomen spielen|verb viele|pron Kinder.|nomen Ein|pron mutiger|adj Junge|nomen klettert|verb auf|part den|pron hohen|adj Baum.|nomen Seine|pron Freunde|nomen warten|verb unten.|part"],
[1,"Mama|nomen backt|verb einen|pron leckeren|adj Kuchen|nomen für|part den|pron Geburtstag.|nomen Ich|pron helfe|verb ihr|pron und|part rühre|verb den|pron süssen|adj Teig.|nomen Zum|part Schluss|nomen lecke|verb ich|pron die|pron Schüssel.|nomen"],
[2,"Weil|part das|pron Wetter|nomen schön|adj ist,|verb machen|verb wir|pron einen|pron langen|adj Ausflug.|nomen Wir|pron kaufen|verb belegte|adj Brote|nomen und|part kühle|adj Getränke|nomen im|part kleinen|adj Laden.|nomen Danach|part wandern|verb wir|pron durch|part den|pron dunklen|adj Wald.|nomen"],
[2,"Der|pron neue|adj Schüler|nomen heisst|verb Luca|nomen und|part kommt|verb aus|part Italien.|nomen Er|pron kennt|verb noch|part keine|pron Wörter,|nomen aber|part er|pron ist|verb sehr|part motiviert.|adj"],
[2,"Die|pron Katze|nomen liegt|verb auf|part dem|pron warmen|adj Sofa|nomen und|part schläft.|verb Wenn|part die|pron Tür|nomen knarrt,|verb öffnet|verb sie|pron ein|pron Auge.|nomen Sie|pron ist|verb eine|pron vorsichtige|adj Jägerin.|nomen"],
[2,"Gestern|part hat|verb es|pron geregnet,|verb deshalb|part sind|verb die|pron Strassen|nomen nass.|adj Viele|pron Autos|nomen stehen|verb im|part Stau,|nomen denn|part der|pron Verkehr|nomen ist|verb dicht.|adj"],
[2,"Unsere|pron Klasse|nomen plant|verb eine|pron Reise|nomen nach|part Bern.|nomen Wir|pron besuchen|verb das|pron Bundeshaus|nomen und|part die|pron alte|adj Stadt.|nomen Danach|part essen|verb wir|pron ein|pron Sandwich|nomen am|part Fluss,|nomen weil|part das|pron Wetter|nomen herrlich|adj ist.|verb"],
[2,"Der|pron Bäcker|nomen beginnt|verb früh|part seine|pron Arbeit.|nomen Er|pron knetet|verb den|pron weichen|adj Teig|nomen und|part heizt|verb den|pron grossen|adj Ofen.|nomen Bald|part duftet|verb das|pron ganze|adj Dorf|nomen nach|part frischem|adj Brot.|nomen"],
[3,"Obwohl|part der|pron Wanderweg|nomen steil|adj und|part anstrengend|adj war,|verb erreichten|verb wir|pron den|pron Gipfel.|nomen Dort|part genossen|verb wir|pron die|pron wunderbare|adj Aussicht,|nomen bevor|part wir|pron müde|adj ins|part Tal|nomen zurückkehrten.|verb"],
[3,"Mein|pron älterer|adj Bruder|nomen repariert|verb das|pron kaputte|adj Fahrrad.|nomen Er|pron sucht|verb das|pron passende|adj Werkzeug|nomen in|part der|pron dunklen|adj Garage,|nomen weil|part er|pron den|pron Schlüssel|nomen verloren|verb hat.|verb"],
[3,"Nachdem|part die|pron Sonne|nomen untergegangen|verb war,|verb wurde|verb es|pron kühl.|adj Wir|pron entfachten|verb ein|pron gemütliches|adj Feuer|nomen und|part erzählten|verb spannende|adj Geschichten,|nomen denn|part niemand|pron war|verb müde.|adj"],
[3,"Die|pron junge|adj Forscherin|nomen untersucht|verb seltene|adj Pflanzen.|nomen Sie|pron notiert|verb jede|pron Beobachtung|nomen in|part ihrem|pron Heft,|nomen damit|part sie|pron nichts|pron vergisst.|verb"],
[3,"Auf|part dem|pron Markt|nomen verkauft|verb ein|pron freundlicher|adj Händler|nomen frisches|adj Obst.|nomen Die|pron Kunden|nomen prüfen|verb die|pron reifen|adj Früchte|nomen und|part kaufen|verb sofort|part einen|pron grossen|adj Korb.|nomen"],
[1,"Am|part Sonntag|nomen besucht|verb Lena|nomen ihre|pron Grossmutter|nomen. Sie|pron hat|verb einen|pron bunten|adj Blumenstrauss|nomen gekauft|verb. Die|pron Grossmutter|nomen freut|verb sich|pron sehr|part. Zusammen|part trinken|verb sie|pron heissen|adj Tee|nomen."],
[1,"Der|pron Vogel|nomen sitzt|verb im|part Baum|nomen. Er|pron singt|verb ein|pron schönes|adj Lied|nomen. Die|pron Kinder|nomen lauschen|verb dem|pron Gesang|nomen gerne|part."],
[1,"Heute|part schneit|verb es|pron stark|part. Die|pron Strassen|nomen sind|verb weiss|adj und|part glatt|adj. Viele|pron Menschen|nomen tragen|verb warme|adj Mützen|nomen."],
[1,"Tim|nomen malt|verb ein|pron rotes|adj Auto|nomen. Danach|part malt|verb er|pron einen|pron blauen|adj Himmel|nomen. Seine|pron Schwester|nomen lobt|verb das|pron schöne|adj Bild|nomen."],
[2,"Nach|part dem|pron Unterricht|nomen gehen|verb wir|pron oft|part in|part die|pron Bibliothek|nomen. Dort|part lesen|verb wir|pron spannende|adj Bücher|nomen und|part lernen|verb für|part die|pron Prüfung|nomen."],
[2,"Der|pron Zug|nomen hatte|verb leider|part Verspätung|nomen. Deshalb|part kam|verb ich|pron erst|part am|part Abend|nomen nach|part Hause|nomen. Meine|pron Eltern|nomen waren|verb besorgt|adj."],
[2,"Im|part Winter|nomen bedeckt|verb dicker|adj Schnee|nomen die|pron Berge|nomen. Die|pron Skifahrer|nomen freuen|verb sich|pron über|part die|pron perfekten|adj Pisten|nomen. Abends|part sitzen|verb sie|pron müde|adj am|part Feuer|nomen."],
[3,"Obwohl|part es|pron regnete|verb, gingen|verb wir|pron in|part den|pron Wald|nomen. Dort|part fanden|verb wir|pron viele|pron Pilze|nomen und|part sammelten|verb sie|pron in|part einem|pron grossen|adj Korb|nomen. Zu|part Hause|nomen kochte|verb Papa|nomen eine|pron leckere|adj Suppe|nomen."],
[3,"Weil|part der|pron Bus|nomen spät|part kam|verb, mussten|verb wir|pron lange|part frieren|verb. Ein|pron freundlicher|adj Mann|nomen schenkte|verb uns|pron heissen|adj Kaffee|nomen, denn|part er|pron hatte|verb Mitleid|nomen."],
[3,"Bevor|part die|pron Show|nomen begann|verb, kauften|verb wir|pron Popcorn|nomen und|part kalte|adj Getränke|nomen. Der|pron Film|nomen war|verb spannend|adj, doch|part das|pron Ende|nomen überraschte|verb alle|pron."]
];
const parse=a=>a.split(' ').map(w=>{const i=w.indexOf('|');const m=w.slice(i+1).match(/^([a-z]+)(.*)$/);return{t:w.slice(0,i)+m[2],f:m[1]};});
const nextId=c=>c.TASKS.reduce((m,t)=>Math.max(m,t.id||0),0)+1;
const WA={wortarten:{f:null,type:'anmalenlang'}};
const SINGLE={nomen:{f:'nomen',cat:'sg3',instr:'Tippe alle Nomen im Text an (auch nominalisierte).',lab:'Nomen'},
  verb:{f:'verb',cat:'sg4',instr:'Tippe alle Verben im Text an.',lab:'Verben'},
  adjektiv:{f:'adj',cat:'sg3',instr:'Tippe alle Adjektive im Text an.',lab:'Adjektive'},
  pronomen:{f:'pron',cat:'sg2',instr:'Tippe alle Pronomen im Text an (auch Artikel).',lab:'Pronomen'},
  partikel:{f:'part',cat:'sg4',instr:'Tippe alle Partikel im Text an (Präpositionen, Konjunktionen, Adverbien).',lab:'Partikel'}};
/* Wortarten: alle Wortarten im langen Text anmalen */
(function(){
  const c=GT.chapters.wortarten;if(!c)return;
  c.TYPES.anmalenlang={icon:'📄',label:'Langer Text anmalen',short:'Alle Wortarten in einem längeren Text anmalen',instr:'Wähle eine Wortart und tippe alle passenden Wörter im Text an. Male jedes Wort an.',hint:'Wende bei jedem Wort die Probe an: Artikelprobe, Konjugationsprobe, Steigerung. Unveränderliche Wörter sind Partikel.',ref:'proben'};
  TXT.forEach(a=>{
    const parts=parse(a[1]),cats=[...new Set(parts.map(p=>p.f))];
    c.TASKS.push({id:nextId(c),typ:'anmalenlang',stufe:a[0],lv:a[0]===3?2:1,cats,parts,sent:'',lang:true,why:parts.map(p=>p.t.replace(/[.,]$/,'')+' → '+c.catName[p.f]).join(' · ')});
  });
})();
/* Fälle: langer Text. Die Nomengruppen (mit ihrer Präposition) werden mit dem passenden Fall angemalt, alles andere bleibt unbemalt.
   Schreibweise: [Gruppe|nom|gen|dat|akk]. Nur Nomengruppen markieren, Pronomen bleiben ungemalt. Bei Wechselpräpositionen muss die Frage Wo? oder Wohin? eindeutig sein. */
(function(){
  const c=GT.chapters.faelle;if(!c)return;
  const FT=[
[1,"[Mia|nom] schenkt [ihrem Bruder|dat] [ein Buch|akk]. [Der Junge|nom] liest [die Geschichte|akk] sofort. Danach erzählt er [seiner Mutter|dat] [den Inhalt|akk]. [Die Mutter|nom] lacht und lobt [das Buch|akk]."],
[1,"[Der Lehrer|nom] gibt [den Schülern|dat] [eine Aufgabe|akk]. [Die Schüler|nom] lösen [die Aufgabe|akk] schnell. Dann bringt [die Klasse|nom] [dem Lehrer|dat] [die Blätter|akk]. [Der Lehrer|nom] liest [die Lösungen|akk]."],
[1,"[Die Mutter|nom] kocht [eine Suppe|akk]. [Der Vater|nom] deckt [den Tisch|akk]. [Die Kinder|nom] helfen [der Mutter|dat]. Später bringt [der Vater|nom] [den Kindern|dat] [das Brot|akk]."],
[1,"[Der Bäcker|nom] verkauft [dem Kunden|dat] [frisches Brot|akk]. [Der Kunde|nom] bezahlt [die Rechnung|akk]. [Die Verkäuferin|nom] dankt [dem Mann|dat]. [Der Mann|nom] öffnet [die Tür|akk] und geht."],
[1,"[Ein Hund|nom] bellt [den Briefträger|akk] an. [Der Briefträger|nom] gibt [dem Hund|dat] [ein Stück Wurst|akk]. [Der Hund|nom] frisst [die Wurst|akk] gierig. Dann folgt [der Hund|nom] [dem Briefträger|dat]."],
[1,"[Anna|nom] schreibt [ihrer Freundin|dat] [einen Brief|akk]. [Die Freundin|nom] schickt [Anna|dat] [eine Karte|akk]. [Anna|nom] liebt [die Karte|akk]."],
[2,"[Die Klasse|nom] fährt [mit dem Bus|dat] [zum Zoo|dat]. Dort sehen [die Kinder|nom] [einen Elefanten|akk] und [zwei Affen|akk]. [Während der Pause|gen] essen sie [ein Sandwich|akk] [vor dem Eingang|dat]."],
[2,"[Der Zug|nom] fährt [durch den Tunnel|akk]. [Im Wagen|dat] sitzen [viele Reisende|nom]. [Ein Kind|nom] schaut [aus dem Fenster|dat]. [Nach der Fahrt|dat] steigt [die Familie|nom] aus."],
[2,"[Wegen des Regens|gen] bleibt [die Klasse|nom] [im Schulhaus|dat]. [Die Lehrerin|nom] liest [den Kindern|dat] [eine Geschichte|akk] vor. [Ohne ein Wort|akk] hören [die Kinder|nom] zu."],
[2,"[Der Opa|nom] erzählt [den Enkeln|dat] [eine Geschichte|akk] [aus seiner Jugend|dat]. Er arbeitete damals [auf einem Bauernhof|dat]. [Die Arbeit|nom] war hart, aber [der Lohn|nom] war gut."],
[2,"[Meine Schwester|nom] trainiert [in der Woche|dat] [mit ihrem Team|dat]. [Der Trainer|nom] erklärt [den Spielerinnen|dat] [die Taktik|akk]. [Nach dem Training|dat] duscht [das Team|nom]."],
[2,"[Der Koch|nom] schneidet [das Gemüse|akk] [mit einem scharfen Messer|dat]. [Die Zwiebeln|akk] brät er [in der Pfanne|dat]. [Der Duft|nom] zieht [durch die Küche|akk]. [Die Gäste|nom] warten [vor der Tür|dat]."],
[2,"[Die Katze|nom] [meiner Nachbarin|gen] sitzt [auf dem Dach|dat]. [Die Nachbarin|nom] ruft [die Katze|akk]. [Das Tier|nom] hört [die Stimme|akk] nicht."],
[3,"[Am Samstag|dat] besucht [die Familie|nom] [den Zirkus|akk]. [Vor dem Zelt|dat] steht [eine lange Schlange|nom]. [Der Direktor|nom] begrüsst [die Gäste|akk] und wünscht [den Kindern|dat] [viel Spass|akk]. [Während der Vorstellung|gen] staunt [das Publikum|nom] [über die Kunststücke|akk] [der Artisten|gen]."],
[3,"[Der Vater|nom] hängt [das Bild|akk] [an die Wand|akk]. Dann stellt er [die Vase|akk] [auf den Tisch|akk]. Jetzt hängt [das Bild|nom] [an der Wand|dat], und [die Vase|nom] steht [auf dem Tisch|dat]."],
[3,"[Der Hund|nom] rennt [in den Garten|akk]. Dort gräbt er [ein Loch|akk] [unter dem Zaun|dat]. Dann kriecht er [durch das Loch|akk]. [Auf der Strasse|dat] sieht [die Nachbarin|nom] [den Hund|akk] und ruft [den Besitzer|akk]."],
[3,"[Der Hut|nom] [des Zauberers|gen] liegt [auf dem Boden|dat]. [Die Kinder|nom] [der Nachbarn|gen] staunen [über den Trick|akk]. [Trotz des Lärms|gen] hört [der Zauberer|nom] [die Stimme|akk] [seiner Tochter|gen]."],
[3,"[Wegen des Streiks|gen] fährt [der Zug|nom] nicht. [Die Reisenden|nom] warten [in der Halle|dat] [auf den nächsten Zug|akk]. [Ein Mitarbeiter|nom] erklärt [den Gästen|dat] [die Lage|akk]. [Die Verspätung|nom] [des Zuges|gen] beträgt [eine Stunde|akk]."],
[3,"[Anna|nom] sitzt [im Park|dat] und liest [ein Buch|akk]. Plötzlich läuft [ein Eichhörnchen|nom] [auf den Weg|akk]. [Anna|nom] gibt [dem Tier|dat] [eine Nuss|akk]. [Das Eichhörnchen|nom] klettert [auf einen Baum|akk] und frisst [die Nuss|akk] [auf dem Ast|dat]."],
[3,"[Die Schülerin|nom] hilft [ihrem Lehrer|dat] [bei der Arbeit|dat]. Sie trägt [die Hefte|akk] [der Klasse|gen] [ins Zimmer|akk]. [Der Lehrer|nom] dankt [der Schülerin|dat] [für ihre Hilfe|akk]. [Mit dem Lob|dat] [des Lehrers|gen] ist [die Schülerin|nom] zufrieden."]
  ];
  c.TYPES.anmalenlang={icon:'📄',label:'Fälle im langen Text',short:'Die Fälle der Nomen in einem längeren Text bestimmen',instr:'Wähle einen Fall und tippe jede Nomengruppe im Text an. Die Präposition gehört zur Gruppe.',hint:'Finde zuerst das Verb und frage von dort aus: Wer oder was? Wen oder was? Wem? Wessen? Bei Präpositionen entscheidet die Präposition. Wechselpräpositionen: Wo? → Dativ, Wohin? → Akkusativ.',ref:'proben'};
  const re=/\[([^\]|]+)\|(nom|gen|dat|akk)\]([.,!?;:]*)/g;
  FT.forEach(a=>{
    const txt=a[1],parts=[];let last=0,m;re.lastIndex=0;
    while((m=re.exec(txt))){const pl=txt.slice(last,m.index).trim();if(pl)parts.push({t:pl,f:null});parts.push({t:m[1]+m[3],f:m[2]});last=re.lastIndex;}
    const tail=txt.slice(last).trim();if(tail)parts.push({t:tail,f:null});
    const cats=[...new Set(parts.filter(p=>p.f).map(p=>p.f))];
    c.TASKS.push({id:nextId(c),typ:'anmalenlang',stufe:a[0],lv:a[0],cats,parts,sent:'',lang:true,why:parts.filter(p=>p.f).map(p=>p.t.replace(/[.,!?;:]$/,'')+' → '+c.catName[p.f]).join(' · ')});
  });
})();
/* Nomen, Verb, Adjektiv, Pronomen, Partikel: langer Text, alle Wörter der Wortart antippen */
Object.keys(SINGLE).forEach(id=>{
  const c=GT.chapters[id],S=SINGLE[id];if(!c)return;
  c.TYPES.textlang={icon:'📄',label:S.lab+' im langen Text',short:'Alle '+S.lab+' in einem längeren Text finden',instr:S.instr,hint:(c.TYPES.text&&c.TYPES.text.hint)||'Wende die Probe an.',ref:(c.TYPES.text&&c.TYPES.text.ref)||c.TYPES.markieren&&c.TYPES.markieren.ref};
  TXT.forEach(a=>{
    const ps=parse(a[1]);
    const tokens=ps.map(p=>p.t),targets=[];ps.forEach((p,i)=>{if(p.f===S.f)targets.push(i);});
    c.TASKS.push({id:nextId(c),typ:'textlang',stufe:a[0],lv:a[0]===3?2:1,cats:[S.cat],tokens,targets,instr:S.instr,lang:true,why:targets.map(i=>tokens[i].replace(/[.,]$/,'')).join(', ')});
  });
});
/* Partikel: langer Text, jede Partikelart hat eine eigene Farbe (Präposition, Konjunktion, Adverb, Interjektion).
   Alle Wörter lassen sich antippen (auch «Kein Partikel»). Die Texte sind unmarkiert gespeichert und werden mit einer Wortliste automatisch bestimmt.
   Beim Schreiben neuer Texte mehrdeutige Wörter meiden: auf/an/ab/um als Verbzusatz, «zu» vor Verben oder Adjektiven, da, so, wie, bis, während. */
(function(){
  const c=GT.chapters.partikel;if(!c)return;
  const BK=['praep','konj','adv','interj','kein'],BN={praep:'Präposition',konj:'Konjunktion',adv:'Adverb',interj:'Interjektion',kein:'Kein Partikel'};
  c.TYPES.anmalenlang={icon:'🎨',label:'Partikel im langen Text anmalen',short:'Alle Wörter einer Partikelart zuordnen (mit Farben)',instr:'Wähle eine Farbe und tippe die Wörter im Text an. Jede Partikelart hat ihre eigene Farbe. Alle anderen Wörter lässt du weiss oder malst sie grau («Kein Partikel»).',hint:'Präposition: steht vor einem Nomen (mit der Klasse). Konjunktion: verbindet Sätze (und, weil). Adverb: Wo? Wann? Wie? Warum? Interjektion: Ausruf (ach, aua).',ref:'merkmale'};
  const L={praep:'mit in nach von aus bei zu zum zur im am vom beim ins ans aufs auf an über unter vor hinter neben zwischen für gegen ohne durch um wegen trotz seit statt',
    konj:'und oder aber denn sondern weil dass obwohl damit wenn ob als nachdem bevor sobald falls',
    adv:'nicht heute gestern jetzt bald oft manchmal immer nie dort hier draussen drinnen oben unten links rechts dann danach davor später früher schon noch wieder gern leider vielleicht sehr plötzlich sofort endlich zuerst zuletzt darum deshalb deswegen trotzdem zurück hinauf hinunter hinaus herein überall nirgends kaum fast nur auch bestimmt wirklich dabei dafür dazu davon abends morgens mittags nachts eigentlich bereits ständig unbedingt ausserdem dennoch jedoch vorne hinten',
    interj:'ach oh hurra igitt juhu aua autsch pst psst hey hallo ups uff na wow puh pfui'};
  const MAP={};Object.keys(L).forEach(k=>L[k].split(' ').forEach(w=>{MAP[w]=k;}));
  const T=[
   [1,"Heute gehen wir mit der Klasse in den Zoo. Dort sehen wir Affen und Elefanten. Ach, der Löwe schläft noch! Nach dem Essen fahren wir zurück zum Bahnhof."],
   [1,"Hurra, es ist Samstag! Mia spielt draussen mit ihrem Hund. Sie läuft oft durch den Park und trifft dort ihre Freunde. Danach essen alle Eis."],
   [1,"Oh, es regnet schon wieder! Wir bleiben drinnen und spielen ein Spiel. Tim holt Karten aus dem Schrank. Später kochen wir Tee."],
   [1,"Hallo, ich bin Noah. Ich wohne in einem kleinen Dorf neben dem Wald. Jeden Tag fahre ich mit dem Bus zur Schule. Manchmal gehe ich auch zu Fuss."],
   [1,"Wir machen einen Ausflug. Zuerst fahren wir mit dem Zug nach Luzern. Dort laufen wir am See und essen ein Brötchen. Am Abend sind alle müde."],
   [1,"Aua, mein Knie tut weh! Ich bin vor der Tür gestolpert. Mama legt ein Pflaster auf die Wunde und gibt mir einen Apfel. Jetzt geht es mir besser."],
   [2,"Igitt, die Suppe ist kalt! Weil niemand sie gewärmt hat, schmeckt sie schlecht. Jetzt essen wir Brot und Käse, denn wir haben grossen Hunger."],
   [2,"Lena freut sich, weil bald Ferien sind. Sie packt schon den Koffer und denkt an das Meer. Ihr Bruder hofft, dass die Sonne jeden Tag scheint."],
   [2,"Gestern war ich mit meiner Familie draussen, aber es war kalt. Wir sind trotzdem weitergegangen, denn die Aussicht war schön. Abends tranken wir heissen Tee."],
   [2,"Wenn es schneit, gehen wir auf den Hügel. Dort fahren wir mit dem Schlitten hinunter und lachen. Danach wärmen wir uns in der Hütte."],
   [2,"Ach, ich habe meinen Schlüssel vergessen! Ich weiss nicht, ob jemand zu Hause ist. Vielleicht klingle ich bei der Nachbarin, denn sie ist oft in ihrer Wohnung."],
   [2,"Der Zug hat Verspätung, deshalb warten wir am Bahnhof. Hier ist es kalt, aber im Café gibt es Kakao. Pst, ich höre die Durchsage!"],
   [3,"Juhu, endlich sind Ferien! Obwohl es draussen kalt ist, laufen wir ohne Jacke durch den Wald. Plötzlich ruft Tim: Pst, hört ihr das? Wir bleiben stehen, weil er sofort etwas gehört hat. Hinter den Bäumen sehen wir ein Reh, aber es rennt davon."],
   [3,"Nachdem wir gegessen hatten, spülten alle das Geschirr. Danach spielten wir bei Kerzenlicht Karten, obwohl wir eigentlich müde waren. Oh, schon Mitternacht!"],
   [3,"Meine Schwester lernt nicht für die Prüfung, sondern sie schaut ständig auf ihr Handy. Trotzdem hofft sie, dass sie eine gute Note bekommt. Ich finde, dass das kaum klappt."],
   [3,"In der Pause diskutierten wir über das Spiel. Hey, wer hat gestern gewonnen? Wegen des Regens wurde das Training abgesagt, trotzdem kamen fast alle."],
   [3,"Uff, das war anstrengend! Wir haben den ganzen Tag gearbeitet, denn der Garten musste fertig werden. Sobald es dunkel wurde, gingen alle nach Hause. Dort wartete bereits die Suppe."],
   [3,"Wow, die Aussicht ist wirklich toll! Vor uns liegt der See, hinter uns erheben sich die Berge. Wenn das Wetter hält, bleiben wir noch einen Tag hier, denn wir möchten unbedingt auf den Gipfel steigen."]
  ];
  T.forEach(a=>{
    const parts=a[1].split(' ').map(w=>({t:w,f:MAP[w.replace(/^[«"„]+|[.,!?;:»"“]+$/g,'').toLowerCase()]||null}));
    c.TASKS.push({id:nextId(c),typ:'anmalenlang',stufe:a[0],lv:a[0]===3?2:1,cats:['sg4'],parts,sent:'',lang:true,allChips:true,brushKeys:BK,brushNames:BN,why:parts.filter(p=>p.f).map(p=>p.t.replace(/[.,:!?]$/,'')+' → '+BN[p.f]).join(' · ')});
  });
})();
})();
