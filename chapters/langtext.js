/* Lange Texte: in den Wortlehre-Kapiteln gibt es zusätzlich eine eigene Übung mit einem längeren Text.
   Wortarten: alle Wortarten anmalen. Nomen, Verb, Adjektiv, Pronomen, Partikel: alle Wörter dieser Wortart antippen. */
(function(){
'use strict';
const GT=window.GT;if(!GT||!GT.chapters)return;
/* Wort|Wortart (nomen, verb, adj, pron, part). Artikel zählen hier zu den Pronomen, Adverbien, Präpositionen und Konjunktionen zu den Partikeln. */
const TXT=[
[1,"Heute|part geht|verb Mia|nomen mit|part ihrer|pron Familie|nomen in|part den|pron Zoo|nomen. Dort|part sieht|verb sie|pron einen|pron grossen|adj Elefanten|nomen. Er|pron trinkt|verb gerade|part Wasser|nomen. Danach|part essen|verb alle|pron ein|pron leckeres|adj Eis|nomen."],
[2,"Letzte|adj Woche|nomen besuchte|verb unsere|pron Klasse|nomen ein|pron altes|adj Schloss|nomen. Der|pron Führer|nomen erzählte|verb spannende|adj Geschichten|nomen, und|part wir|pron lauschten|verb gespannt|part. Weil|part es|pron draussen|part regnete|verb, blieben|verb wir|pron lange|part in|part dem|pron kalten|adj Keller|nomen."],
[3,"Gestern|part Abend|nomen kam|verb mein|pron Bruder|nomen müde|adj von|part dem|pron Training|nomen nach|part Hause|nomen. Obwohl|part er|pron kaum|part noch|part laufen|verb konnte|verb, lachte|verb er|pron laut|part und|part erzählte|verb von|part dem|pron wichtigen|adj Spiel|nomen. Meine|pron Mutter|nomen kochte|verb ihm|pron eine|pron heisse|adj Suppe|nomen, denn|part er|pron hatte|verb grossen|adj Hunger|nomen."]
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
