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
/* Partikel: langer Text, jede Partikelart hat eine eigene Farbe (Präposition, Konjunktion, Adverb, Interjektion) */
(function(){
  const c=GT.chapters.partikel;if(!c)return;
  const BK=['praep','konj','adv','interj'],BN={praep:'Präposition',konj:'Konjunktion',adv:'Adverb',interj:'Interjektion'};
  c.TYPES.anmalenlang={icon:'🎨',label:'Partikel im langen Text anmalen',short:'Präpositionen, Konjunktionen, Adverbien und Interjektionen farbig markieren',instr:'Wähle eine Farbe und tippe die passenden Wörter im Text an. Jede Partikelart hat ihre eigene Farbe.',hint:'Präposition: steht vor einem Nomen (mit der Klasse). Konjunktion: verbindet Sätze (und, weil). Adverb: Wo? Wann? Wie? Warum? Interjektion: Ausruf (ach, aua).',ref:'merkmale'};
  const T=[
   [1,"Hurra|interj, heute|adv gehen wir mit|praep der Klasse in|praep den Zoo. Dort|adv sehen wir Affen und|konj Elefanten. Ach|interj, der Löwe schläft noch|adv! Nach|praep dem Essen fahren wir zurück|adv zum|praep Bahnhof."],
   [2,"Igitt|interj, es regnet schon|adv wieder|adv! Weil|konj wir keinen Schirm haben, warten wir unter|praep dem Dach. Mia ist müde, denn|konj sie hat gestern|adv lange|adv gespielt. Aua|interj, ich bin gegen|praep die Wand gelaufen! Danach|adv gehen wir nach|praep Hause."],
   [3,"Juhu|interj, endlich|adv sind Ferien! Obwohl|konj es draussen|adv kalt ist, laufen wir ohne|praep Jacke durch|praep den Wald. Plötzlich|adv ruft Tim leise|adv: Pst|interj, hört ihr das? Wir bleiben stehen, weil|konj er sofort|adv gespannt|adv lauscht. Hinter|praep den Bäumen sehen wir ein Reh, aber|konj es rennt davon|adv."]
  ];
  T.forEach(a=>{
    const parts=a[1].split(' ').map(w=>{const i=w.indexOf('|');if(i<0)return{t:w,f:null};const m=w.slice(i+1).match(/^([a-z]+)(.*)$/);return{t:w.slice(0,i)+m[2],f:m[1]};});
    c.TASKS.push({id:nextId(c),typ:'anmalenlang',stufe:a[0],lv:a[0]===3?2:1,cats:['sg4'],parts,sent:'',lang:true,brushKeys:BK,brushNames:BN,why:parts.filter(p=>p.f).map(p=>p.t.replace(/[.,:!?]$/,'')+' → '+BN[p.f]).join(' · ')});
  });
})();
})();
