/* Kapitel Satzlehre 8: Kommasetzung. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Aufzählung',sg2:'Haupt- und Nebensatz',sg3:'Relativsatz und Einschub',sg4:'Anrede, Ausruf, Infinitivgruppe'};
const task=[];

/* Welcher Satz ist richtig? [Richtig, Falsche1-3, Stufe, Kategorie, Hinweis] */
const R=[
['Ich kaufe Äpfel, Birnen und Bananen.',['Ich kaufe Äpfel Birnen und Bananen.','Ich kaufe Äpfel, Birnen, und Bananen.','Ich kaufe, Äpfel, Birnen und Bananen.'],1,'sg1','Aufzählung: Komma zwischen den Gliedern, vor «und» kein Komma.'],
['Wir spielen Fussball, Tennis und Basketball.',['Wir spielen Fussball Tennis und Basketball.','Wir spielen, Fussball, Tennis und Basketball.','Wir spielen Fussball, Tennis, und Basketball.'],1,'sg1','Aufzählung: vor «und» kein Komma.'],
['Er ist gross, stark und freundlich.',['Er ist gross stark und freundlich.','Er ist gross, stark, und freundlich.','Er ist, gross, stark und freundlich.'],1,'sg1','Aufzählung von Adjektiven.'],
['Sie singt laut, schön und lange.',['Sie singt laut schön und lange.','Sie singt laut, schön, und lange.','Sie singt, laut schön und lange.'],1,'sg1','Aufzählung.'],
['Ich bleibe zu Hause, weil ich krank bin.',['Ich bleibe zu Hause weil ich krank bin.','Ich bleibe zu Hause weil, ich krank bin.','Ich bleibe, zu Hause weil ich krank bin.'],1,'sg2','Vor einem Nebensatz steht ein Komma.'],
['Ich weiss, dass er kommt.',['Ich weiss dass er kommt.','Ich weiss dass, er kommt.','Ich, weiss dass er kommt.'],1,'sg2','Vor «dass» steht immer ein Komma.'],
['Obwohl es regnet, gehen wir hinaus.',['Obwohl es regnet gehen wir hinaus.','Obwohl, es regnet gehen wir hinaus.','Obwohl es regnet gehen, wir hinaus.'],1,'sg2','Nach einem vorangestellten Nebensatz steht ein Komma.'],
['Wenn du Hilfe brauchst, ruf mich an.',['Wenn du Hilfe brauchst ruf mich an.','Wenn, du Hilfe brauchst ruf mich an.','Wenn du Hilfe brauchst ruf, mich an.'],1,'sg2','Nach dem Nebensatz steht ein Komma.'],
['Es regnet, aber wir gehen hinaus.',['Es regnet aber wir gehen hinaus.','Es regnet aber, wir gehen hinaus.','Es, regnet aber wir gehen hinaus.'],1,'sg2','Vor «aber» steht ein Komma.'],
['Ich gehe nach Hause, denn ich bin müde.',['Ich gehe nach Hause denn ich bin müde.','Ich gehe nach Hause denn, ich bin müde.','Ich gehe, nach Hause denn ich bin müde.'],2,'sg2','Vor «denn» steht ein Komma.'],
['Ich lerne, damit ich die Prüfung bestehe.',['Ich lerne damit ich die Prüfung bestehe.','Ich lerne damit, ich die Prüfung bestehe.','Ich, lerne damit ich die Prüfung bestehe.'],1,'sg2','Vor «damit» steht ein Komma.'],
['Als wir ankamen, war das Essen fertig.',['Als wir ankamen war das Essen fertig.','Als, wir ankamen war das Essen fertig.','Als wir ankamen war, das Essen fertig.'],2,'sg2','Nach dem vorangestellten Nebensatz steht ein Komma.'],
['Der Mann, der dort steht, ist mein Onkel.',['Der Mann der dort steht ist mein Onkel.','Der Mann, der dort steht ist mein Onkel.','Der Mann der dort steht, ist mein Onkel.'],2,'sg3','Ein Relativsatz in der Mitte wird auf beiden Seiten mit Komma abgetrennt.'],
['Das Buch, das ich lese, ist spannend.',['Das Buch das ich lese ist spannend.','Das Buch, das ich lese ist spannend.','Das Buch das ich lese, ist spannend.'],2,'sg3','Relativsatz: Komma davor und danach.'],
['Anna, meine Schwester, wohnt in Bern.',['Anna meine Schwester wohnt in Bern.','Anna, meine Schwester wohnt in Bern.','Anna meine Schwester, wohnt in Bern.'],3,'sg3','Eingeschobene Erklärung (Apposition): Komma davor und danach.'],
['Lukas, komm bitte her!',['Lukas komm bitte her!','Lukas, komm, bitte her!','Lukas komm, bitte her!'],1,'sg4','Die Anrede wird durch ein Komma abgetrennt.'],
['Ja, ich komme mit.',['Ja ich komme mit.','Ja ich, komme mit.','Ja, ich, komme mit.'],1,'sg4','Nach «ja», «nein», «danke» steht ein Komma.'],
['Ach, das ist schade!',['Ach das ist schade!','Ach das, ist schade!','Ach, das, ist schade!'],2,'sg4','Nach einem Ausruf (ach, oh) steht ein Komma.'],
['Sie lernt viel, um die Prüfung zu bestehen.',['Sie lernt viel um die Prüfung zu bestehen.','Sie lernt, viel um die Prüfung zu bestehen.','Sie lernt viel um, die Prüfung zu bestehen.'],3,'sg4','Vor «um … zu» steht ein Komma.']
];
R.forEach(r=>task.push({typ:'komma',stufe:r[2],lv:r[2]===3?2:1,cats:[r[3]],prompt:'Welcher Satz ist richtig geschrieben?',opts:[r[0]].concat(r[1]),answer:r[0],why:'<b>'+r[0]+'</b> '+r[4]}));

/* Komma ja oder nein */
const J=[
['Ich kaufe Brot___ Milch und Käse.',true,1,'sg1','In einer Aufzählung trennt man mit Komma.'],
['Ich kaufe Brot, Milch ___ Käse.',false,1,'sg1','Vor «und» steht in der Aufzählung kein Komma.'],
['Ich weiss___ dass er kommt.',true,1,'sg2','Vor «dass» steht ein Komma.'],
['Sie ist müde___ weil sie wenig geschlafen hat.',true,1,'sg2','Vor «weil» steht ein Komma.'],
['Wir spielen___ aber es regnet.',true,1,'sg2','Vor «aber» steht ein Komma.'],
['Ich bleibe hier ___ bis du kommst.',true,2,'sg2','Vor «bis» im Nebensatz steht ein Komma.'],
['Ich esse einen Apfel ___ und eine Birne.',false,1,'sg1','«und» verbindet zwei Wörter: kein Komma.'],
['Der Hund___ der dort steht___ gehört mir.',true,2,'sg3','Relativsatz in der Mitte: Komma davor und danach.'],
['Nina___ komm bitte her!',true,1,'sg4','Die Anrede wird abgetrennt.'],
['Sie gibt sich Mühe___ um die Prüfung zu bestehen.',true,3,'sg4','Vor «um … zu» steht ein Komma.']
];
J.forEach(j=>task.push({typ:'ja',stufe:j[2],lv:j[2]===3?2:1,cats:[j[3]],sent:j[0].replace(/___ ?/g,'<span class="gap">_</span> ').replace(/ ___ /g,' <span class="gap">_</span> '),opts:['Komma setzen','Kein Komma'],answer:j[1]?'Komma setzen':'Kein Komma',why:'<b>'+(j[1]?'Komma setzen.':'Kein Komma.')+'</b> '+j[4]}));

/* Zusatzaufgaben: Relativsatz, Einschub, Infinitivgruppe */
const R2=[
['Die Frau, die dort wartet, ist meine Lehrerin.',['Die Frau die dort wartet ist meine Lehrerin.','Die Frau, die dort wartet ist meine Lehrerin.','Die Frau die dort wartet, ist meine Lehrerin.'],2,'sg3','Relativsatz in der Mitte: Komma davor und danach.'],
['Das Fahrrad, das ich geschenkt bekam, ist rot.',['Das Fahrrad das ich geschenkt bekam ist rot.','Das Fahrrad, das ich geschenkt bekam ist rot.','Das Fahrrad das ich geschenkt bekam, ist rot.'],2,'sg3','Relativsatz in der Mitte: zwei Kommas.'],
['Ich kenne den Jungen, der neben mir sitzt.',['Ich kenne den Jungen der neben mir sitzt.','Ich kenne, den Jungen der neben mir sitzt.','Ich kenne den Jungen, der, neben mir sitzt.'],2,'sg3','Relativsatz am Satzende: nur ein Komma davor.'],
['Mein Onkel, ein Pilot, wohnt in Zürich.',['Mein Onkel ein Pilot wohnt in Zürich.','Mein Onkel, ein Pilot wohnt in Zürich.','Mein Onkel ein Pilot, wohnt in Zürich.'],3,'sg3','Eingeschobene Erklärung: Komma davor und danach.'],
['Herr Meier, unser Nachbar, hat ein neues Auto.',['Herr Meier unser Nachbar hat ein neues Auto.','Herr Meier, unser Nachbar hat ein neues Auto.','Herr Meier unser Nachbar, hat ein neues Auto.'],3,'sg3','Eingeschobene Erklärung (Apposition): zwei Kommas.'],
['Zürich, die grösste Stadt der Schweiz, liegt am See.',['Zürich die grösste Stadt der Schweiz liegt am See.','Zürich, die grösste Stadt der Schweiz liegt am See.','Zürich die grösste Stadt der Schweiz, liegt am See.'],3,'sg3','Der Einschub erklärt «Zürich» und steht zwischen zwei Kommas.'],
['Wir gingen früh, um den Bus zu erreichen.',['Wir gingen früh um den Bus zu erreichen.','Wir gingen, früh um den Bus zu erreichen.','Wir gingen früh um, den Bus zu erreichen.'],2,'sg4','Vor «um … zu» steht immer ein Komma.'],
['Er ging weg, ohne ein Wort zu sagen.',['Er ging weg ohne ein Wort zu sagen.','Er ging weg ohne, ein Wort zu sagen.','Er ging, weg ohne ein Wort zu sagen.'],3,'sg4','Bei «ohne … zu» steht das Komma immer.'],
['Statt zu lernen, schaute sie fern.',['Statt zu lernen schaute sie fern.','Statt, zu lernen schaute sie fern.','Statt zu lernen schaute, sie fern.'],3,'sg4','Bei «statt … zu» steht das Komma immer, auch wenn die Gruppe vorne steht.']
];
R2.forEach(r=>task.push({typ:'komma',stufe:r[2],lv:r[2]===3?2:1,cats:[r[3]],prompt:'Welcher Satz ist richtig geschrieben?',opts:[r[0]].concat(r[1]),answer:r[0],why:'<b>'+r[0]+'</b> '+r[4]}));
const J2=[
['Der Lehrer___ der gerade kommt___ ist neu.',true,2,'sg3','Relativsatz in der Mitte: Komma davor und danach.'],
['Anna___ meine Freundin___ wohnt in Bern.',true,3,'sg3','Eingeschobene Erklärung: Komma davor und danach.'],
['Ich sehe den Mann___ der dort steht.',true,2,'sg3','Vor dem Relativsatz steht ein Komma.'],
['Das Mädchen___ das singt___ heisst Lena.',true,2,'sg3','Relativsatz in der Mitte: zwei Kommas.'],
['Sie ging___ ohne zu grüssen.',true,3,'sg4','Vor «ohne … zu» steht das Komma immer.'],
['Statt zu lernen___ spielte er.',true,3,'sg4','Nach «statt … zu» am Satzanfang steht das Komma.']
];
J2.forEach(j=>task.push({typ:'ja',stufe:j[2],lv:j[2]===3?2:1,cats:[j[3]],sent:j[0].replace(/___ ?/g,'<span class="gap">_</span> '),opts:['Komma setzen','Kein Komma'],answer:j[1]?'Komma setzen':'Kein Komma',why:'<b>'+(j[1]?'Komma setzen.':'Kein Komma.')+'</b> '+j[4]}));

/* Kommas antippen: Sätze aus Bausteinen (fast unbegrenzt viele Beispiele). Satz ohne Kommas, Kommastellen antippen, dann Signalwort und Regel. */
const KT=[];
const kcap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const kwords=s=>s.trim().split(/\s+/);
/* parts: Liste von [Text, Komma danach?]. Der Satz endet mit ender (. ! ?) */
function ktap(parts,ender,stufe,cat,sig,rule){
  const toks=[],cuts=[],full=[];
  parts.forEach((p,pi)=>{const w=kwords(p[0]);w.forEach((x,wi)=>{toks.push(x);full.push(x);});if(p[1]&&pi<parts.length-1){cuts.push(toks.length-1);full[full.length-1]+=',';}});
  toks[0]=kcap(toks[0]);full[0]=kcap(full[0]);
  toks[toks.length-1]+=ender;full[full.length-1]+=ender;
  const fs=full.join(' ');
  KT.push({typ:'ktap',stufe:stufe,lv:stufe===3?2:1,cats:[cat],tokens:toks,cuts:cuts,full:fs,
   why:'<b>'+fs+'</b><br>Signalwort: <b>'+sig+'</b><br>Regel: '+rule});
}
/* Nebensatz: Subjekt, Verb, Rest, Konjunktion, Nebensatz */
const NSR=[
['ich','bleibe','heute zu Hause','weil','ich krank bin'],['wir','gehen','schwimmen','wenn','die Sonne scheint'],
['sie','lernt','viel','damit','sie die Prüfung besteht'],['wir','gingen','nach Hause','als','es dunkel wurde'],
['ich','warte','hier','bis','du kommst'],['er','kam','mit','obwohl','er müde war'],
['ich','putze','mir die Zähne','bevor','ich ins Bett gehe'],['wir','spielen','Fussball','nachdem','wir die Hausaufgaben gemacht haben'],
['er','hilft','mir','weil','ich das Problem nicht verstehe'],['sie','bleibt','im Bett','weil','sie Fieber hat'],
['wir','essen','draussen','wenn','das Wetter schön ist'],['er','putzt','das Fahrrad','damit','es wieder glänzt'],
['sie','lacht','laut','während','er die Geschichte erzählt'],['ich','nehme','einen Schirm mit','falls','es regnet'],
['wir','bleiben','zu Hause','da','es stürmt'],['sie','ruft','mich an','sobald','sie zu Hause ist'],
['er','läuft','schneller','damit','er den Zug erreicht'],['wir','fahren','ans Meer','sobald','die Ferien beginnen'],
['sie','lernt','jeden Tag','obwohl','sie schon gut ist'],['ich','lese','ein Buch','während','der Bus fährt']
];
const NSD=[ /* Subjekt, Verb, Rest vor dass/ob/Fragewort */
['ich','weiss','','dass','du recht hast'],['er','sagt','','dass','er keine Zeit hat'],['ich','glaube','','dass','es bald regnet'],
['sie','fragt','','ob','der Bus schon gefahren ist'],['ich','frage','mich','ob','er kommt'],['sie','weiss','','warum','er fehlt'],
['wir','wissen','','dass','der Test schwierig wird'],['er','fragt','','wie','das funktioniert']
];
const NSRULE='Das Einleitewort beginnt einen <b>Nebensatz</b> (Verb am Schluss). Haupt- und Nebensatz trennt man mit einem <b>Komma</b>.';
NSR.forEach(a=>{
  const h=[a[0]+' '+a[1]+' '+a[2]].map(x=>x.replace(/\s+/g,' ').trim())[0];
  ktap([[h,1],[a[3]+' '+a[4],0]],'.',1,'sg2',a[3],NSRULE+' Der Nebensatz steht <b>hinten</b>: Komma davor.');
  ktap([[a[3]+' '+a[4],1],[(a[1]+' '+a[0]+' '+a[2]).replace(/\s+/g,' ').trim(),0]],'.',1,'sg2',a[3],NSRULE+' Der Nebensatz steht <b>vorne</b>: Komma danach.');
});
NSD.forEach(a=>{
  const h=(a[0]+' '+a[1]+' '+a[2]).replace(/\s+/g,' ').trim();
  ktap([[h,1],[a[3]+' '+a[4],0]],'.',1,'sg2',a[3],NSRULE+' Vor «'+a[3]+'» steht immer ein Komma.');
  ktap([[a[3]+' '+a[4],1],[(a[1]+' '+a[0]+' '+a[2]).replace(/\s+/g,' ').trim(),0]],'.',2,'sg2',a[3],NSRULE+' Der Nebensatz steht <b>vorne</b>: Komma danach.');
});
/* Hauptsatz, aber/denn/doch/sondern + Hauptsatz */
[['Es regnet','aber','wir gehen hinaus'],['Ich bin müde','denn','ich habe schlecht geschlafen'],['Er ist nett','aber','er kommt oft zu spät'],
 ['Wir bleiben zu Hause','denn','es ist kalt'],['Sie wollte kommen','aber','sie hatte keine Zeit'],['Ich gehe nicht schwimmen','sondern','ich bleibe zu Hause'],
 ['Das Essen ist gut','aber','es ist zu teuer'],['Er lernt viel','denn','er will die Prüfung bestehen']].forEach(a=>
 ktap([[a[0],1],[a[1]+' '+a[2],0]],'.',a[1]==='sondern'?2:1,'sg2',a[1],'«'+a[1]+'» verbindet zwei <b>Hauptsätze</b>. Davor steht immer ein <b>Komma</b>.'));
/* Aufzählung */
[['ich kaufe',['Brot','Milch','Käse'],'und',''],['wir spielen',['Fussball','Tennis','Basketball'],'oder',''],['er ist',['gross','stark','freundlich'],'und',''],
 ['sie singt',['laut','schön','lange'],'und',''],['im Garten wachsen',['Äpfel','Birnen','Kirschen','Pflaumen'],'und',''],['wir brauchen',['Stifte','Hefte','Lineale'],'und','für die Schule'],
 ['am Montag haben wir',['Deutsch','Englisch','Musik'],'und','']].forEach(a=>{
  const n=a[1].length,parts=[];
  for(let k=0;k<n-1;k++)parts.push([(k===0?a[0]+' ':'')+a[1][k],k<n-2?1:0]);
  parts.push([a[2]+' '+a[1][n-1]+(a[3]?' '+a[3]:''),0]);
  ktap(parts,'.',1,'sg1','und / oder','In einer <b>Aufzählung</b> steht zwischen den Gliedern ein Komma. Vor «und» und «oder» steht <b>kein</b> Komma.');
});
/* Relativsatz in der Mitte */
[['der Mann','der dort steht','ist mein Onkel'],['das Buch','das ich lese','ist spannend'],['die Frau','die neben mir wohnt','ist Ärztin'],
 ['der Hund','der laut bellt','gehört mir'],['das Mädchen','das gerade singt','heisst Lena'],['die Schüler','die zu spät kamen','mussten warten'],
 ['das Handy','das ich gekauft habe','ist neu'],['der Ort','wo wir uns treffen','ist schön'],['die Lehrerin','die uns unterrichtet','kommt aus Bern']].forEach(a=>{
  const sig=a[1].split(' ')[0];
  ktap([[a[0],1],[a[1],1],[a[2],0]],'.',2,'sg3',sig,'«'+sig+'» leitet einen <b>Relativsatz</b> ein. Er beschreibt «'+a[0].split(' ').slice(1).join(' ')+'» genauer. Mitten im Satz steht <b>davor und danach</b> ein Komma.');
});
/* Relativsatz am Ende */
[['ich kenne den Jungen','der neben mir sitzt'],['ich lese das Buch','das du mir gegeben hast'],['wir besuchen die Frau','die hier wohnt'],
 ['sie mag den Hund','der so freundlich ist'],['er repariert das Fahrrad','das kaputt ist']].forEach(a=>{
  const sig=a[1].split(' ')[0];
  ktap([[a[0],1],[a[1],0]],'.',2,'sg3',sig,'«'+sig+'» leitet einen <b>Relativsatz</b> ein. Am Satzende steht <b>nur davor</b> ein Komma.');
});
/* Einschub (Apposition) */
[['Anna','meine Schwester','wohnt in Bern'],['Herr Meier','unser Nachbar','hat ein neues Auto'],['Zürich','die grösste Stadt der Schweiz','liegt am See'],
 ['mein Onkel','ein Pilot','wohnt in Zürich'],['Lena','meine beste Freundin','kommt morgen'],['unser Lehrer','ein grosser Fussballfan','trägt immer ein Trikot']].forEach(a=>
 ktap([[a[0],1],[a[1],1],[a[2],0]],'.',3,'sg3','(kein Einleitewort)','«'+a[1]+'» ist ein <b>Einschub</b>. Er erklärt «'+a[0]+'» genauer und steht zwischen <b>zwei Kommas</b>.'));
/* Anrede und Ausruf */
[['Lukas','komm bitte her',"!",'Anrede'],['Anna','hilfst du mir',"?",'Anrede'],['Frau Keller','darf ich eine Frage stellen',"?",'Anrede'],
 ['Ja','ich komme mit',".",'Antwortwort'],['Nein','das stimmt nicht',".",'Antwortwort'],['Danke','das ist nett von dir',".",'Antwortwort'],
 ['Ach','das ist schade',"!",'Ausruf'],['Oh','das habe ich nicht gewusst',".",'Ausruf']].forEach(a=>
 ktap([[a[0],1],[a[1],0]],a[2],1,'sg4',a[0],'«'+a[0]+'» ist eine/ein '+a[3]+'. Sie wird mit einem <b>Komma</b> vom Rest des Satzes getrennt.'));
/* Infinitivgruppe mit um/ohne/statt */
[['wir gingen früh','um den Bus zu erreichen','um'],['er ging weg','ohne ein Wort zu sagen','ohne'],['sie lernt viel','um die Prüfung zu bestehen','um'],
 ['er spielt Handy','anstatt zu lernen','anstatt'],['er ging nach Hause','ohne sich zu verabschieden','ohne'],['sie spart Geld','um sich ein Velo zu kaufen','um']].forEach(a=>
 ktap([[a[0],1],[a[1],0]],'.',3,'sg4',a[2]+' … zu','Vor «'+a[2]+' … zu» steht <b>immer</b> ein Komma (Infinitivgruppe).'));
[['Statt zu lernen','schaute sie fern','statt'],['Ohne zu zögern','sprang er ins Wasser','ohne'],['Um fit zu bleiben','geht sie jeden Tag joggen','um']].forEach(a=>
 ktap([[a[0],1],[a[1],0]],'.',3,'sg4',a[2]+' … zu','Die Gruppe mit «'+a[2]+' … zu» steht vorne: Komma <b>danach</b>.'));
KT.forEach(t=>task.push(t));

/* Wissen */
const W=[
['Wann steht in einer Aufzählung <b>kein</b> Komma?',['vor «und» und «oder»','zwischen den Gliedern','nach dem ersten Wort','nie'],'vor «und» und «oder»','«Äpfel, Birnen und Bananen.»','sg1',1],
['Welche Wörter leiten einen Nebensatz ein, der mit Komma abgetrennt wird?',['dass, weil, obwohl, damit','und, oder','der, die, das','ich, du, er'],'dass, weil, obwohl, damit','Nebensätze trennt man mit Komma.','sg2',1],
['Welche Konjunktion verlangt <b>kein</b> Komma zwischen zwei Hauptsätzen?',['und','aber','denn','sondern'],'und','Vor «und» und «oder» ist das Komma nicht Pflicht.','sg2',2],
['Wo stehen die Kommas im Relativsatz mitten im Satz?',['davor und danach','nur davor','nur danach','nirgends'],'davor und danach','«Der Mann, der dort steht, ist mein Onkel.»','sg3',2],
['Warum setzt man ein Komma vor «dass»?',['weil ein Nebensatz beginnt','weil «dass» ein Nomen ist','weil «dass» ein Verb ist','es gibt keinen Grund'],'weil ein Nebensatz beginnt','Haupt- und Nebensatz werden durch Komma getrennt.','sg2',1],
['Wie wird eine Anrede abgetrennt?',['durch ein Komma','durch einen Punkt','gar nicht','durch ein Fragezeichen'],'durch ein Komma','«Lukas, komm her!»','sg4',1],
['Was trennt man mit Kommas ab?',['Anrede, Ausruf und eingeschobene Erklärung','Nur Aufzählungen','Nur Nebensätze','Nur Hauptsätze'],'Anrede, Ausruf und eingeschobene Erklärung','Alle diese Teile sind vom Satz abgetrennt.','sg4',2],
['Was tun, wenn du dir bei einem Komma unsicher bist?',['Prüfen, ob ein Nebensatz beginnt (Verb am Ende)','Nie ein Komma setzen','Immer ein Komma setzen','Nach jedem dritten Wort ein Komma setzen'],'Prüfen, ob ein Nebensatz beginnt (Verb am Ende)','Das Verb am Ende zeigt den Nebensatz.','sg2',2]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));



const SECS0=[
{id:'auf',title:'Aufzählung',short:'Aufzählung',min:6,note:'Einfachste Regel zuerst: Aufzählung. «und» und «oder» ersetzen das Komma.',
 html:()=>'<div class="card"><p>Ich kaufe Äpfel<b>,</b> Birnen <b>und</b> Bananen.</p><p>Er ist gross<b>,</b> stark <b>und</b> freundlich.</p></div>'+
 '<div class="callout"><b>Merke:</b> Zwischen den Gliedern einer Aufzählung steht ein Komma. Vor <b>und</b> und <b>oder</b> steht <b>kein</b> Komma.</div>'},
{id:'haupt-neben',title:'Hauptsatz und Nebensatz',short:'Nebensatz',min:10,note:'Wichtigste Regel: Nebensatz = Komma. Nebensatz an Satzanfang → Komma nach dem Nebensatz. Nebensatz am Satzende → Komma davor.',
 html:()=>'<div class="grid2"><div class="card"><h3>Nebensatz nachgestellt</h3><p>Ich bleibe zu Hause<b>,</b> weil ich krank bin.</p><p>Ich weiss<b>,</b> dass er kommt.</p></div>'+
 '<div class="card"><h3>Nebensatz vorangestellt</h3><p>Weil ich krank bin<b>,</b> bleibe ich zu Hause.</p><p>Obwohl es regnet<b>,</b> gehen wir hinaus.</p></div></div>'+
 '<div class="callout"><b>Merke:</b> Ein Nebensatz wird <b>immer</b> mit einem Komma vom Hauptsatz getrennt.</div>'},
{id:'hs-hs',title:'Zwei Hauptsätze',short:'Zwei Hauptsätze',min:8,note:'Vor aber, denn, sondern steht ein Komma. Vor und/oder darf es fehlen.',
 html:()=>T(['Konjunktion','Komma?','Beispiel'],[['aber, sondern, denn','ja','Es regnet<b>,</b> aber wir gehen hinaus.'],['und, oder','nicht nötig','Der Hund bellt <b>und</b> die Katze schläft.']])},
{id:'relativ',title:'Relativsatz und Einschub',short:'Relativsatz',lv:2,min:8,note:'Ab Niveau B. Ein eingeschobener Relativsatz wird mit zwei Kommas eingeschlossen.',
 html:()=>'<div class="card"><p>Der Mann<b>,</b> der dort steht<b>,</b> ist mein Onkel.</p><p>Anna<b>,</b> meine Schwester<b>,</b> wohnt in Bern.</p></div>'+
 '<div class="callout">Eingeschobenes steht <b>zwischen zwei Kommas</b>.</div>'},
{id:'sonst',title:'Anrede, Ausruf, Infinitivgruppe',short:'Weitere Regeln',min:8,note:'Infinitivgruppen: Komma ist teilweise Pflicht (um … zu, ohne … zu), sonst freiwillig.',
 html:()=>T(['Fall','Beispiel'],[['Anrede','Lukas<b>,</b> komm bitte her!'],['Ausruf','Ach<b>,</b> das ist schade!'],['Ja/Nein/Danke','Ja<b>,</b> ich komme mit.'],['Infinitivgruppe (um … zu)','Sie lernt viel<b>,</b> um die Prüfung zu bestehen.']])},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:7,note:'Typische Fehler: Komma vor «und», fehlendes Komma vor «dass».',
 html:()=>'<div class="grid3">'+[
  ['1 · Komma vor «und»?','«Äpfel, Birnen <b>und</b> Bananen»','In einer Aufzählung kein Komma vor «und».'],
  ['2 · Komma vor «dass»','«Ich weiss<b>,</b> dass er kommt.»','Immer ein Komma.'],
  ['3 · Zwei Kommas beim Einschub','«Der Mann<b>,</b> der dort steht<b>,</b> …»','Wer einmal anfängt, muss auch schliessen.'],
  ['4 · Komma vor «aber»','«Ich will<b>,</b> aber ich kann nicht.»','Vor aber immer ein Komma.'],
  ['5 · Komma nach vorangestelltem Nebensatz','«Weil ich müde bin<b>,</b> gehe ich.»','Nicht vergessen.'],
  ['6 · Komma im falschen Satz','«Ich gehe, nach Hause.»','Kein Komma ohne Grund.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('komma,ja')}
];
const ART=o=>'<div class="grid2"><div class="card"><h3>Was ist das?</h3><p>'+o.was+'</p></div><div class="card"><h3>So erkennst du es</h3><ul style="margin:.2rem 0 0;padding-left:1.2rem">'+o.erk.map(x=>'<li>'+x+'</li>').join('')+'</ul></div></div>'+T(['Beispiel','Komma'],o.bsp)+'<div class="callout">⚠️ <b>Stolperstein:</b> '+o.stolper+'</div>';
const SECS_N=[
{id:'was-komma',title:'Wozu braucht man Kommas?',short:'Wozu Kommas?',min:8,note:'Einstieg: Das Komma gliedert den Satz und kann die Bedeutung verändern. Die Schüler lesen die Paare laut und erklären den Unterschied.',
 html:()=>'<div class="grid2"><div class="card"><h3>Was ist ein Komma?</h3><p>Das Komma ist ein <b>Satzzeichen</b>. Es steht <b>innerhalb</b> eines Satzes.</p></div>'+
 '<div class="card"><h3>Wozu ist es da?</h3><ul style="margin:.2rem 0 0;padding-left:1.2rem"><li>Es <b>gliedert</b> den Satz in Teile.</li><li>Es zeigt, was <b>zusammengehört</b> und was nicht.</li><li>Es hilft dem Leser, den Satz <b>richtig zu verstehen</b>.</li></ul></div></div>'+
 '<h3 style="margin:1rem 0 .4rem">Ein Komma kann den Sinn ändern</h3>'+
 T(['Anderes Komma','Mit Komma'],[
 ['Komm, wir essen Opa!<br><small>Opa wird gegessen.</small>','Komm, wir essen<b>,</b> Opa!<br><small>Opa wird angesprochen.</small>'],
 ['Der Lehrer sagt<b>,</b> der Schüler sei faul.<br><small>Der Lehrer urteilt über den Schüler.</small>','Der Lehrer<b>,</b> sagt der Schüler<b>,</b> sei faul.<br><small>Der Schüler urteilt über den Lehrer.</small>'],
 ['Ich komme nicht<b>,</b> weil du es willst.<br><small>Ich komme nicht. Der Grund: Du willst es.</small>','Ich komme<b>,</b> nicht weil du es willst.<br><small>Ich komme. Aber nicht deinetwegen.</small>']])+
 '<div class="callout"><b>Merke:</b> Ein Komma ist keine Atempause. Es folgt festen Regeln. Die lernst du auf den nächsten Folien.</div>'},
{id:'ns-erkl',title:'Was ist ein Nebensatz? Wann steht ein Komma?',short:'Nebensatz erkennen',min:8,note:'Kurze Wiederholung: Ein Nebensatz kann nicht allein stehen, beginnt meist mit einem Einleitewort (weil, dass, wenn, der …) und hat das Verb am Schluss. Zwischen Haupt- und Nebensatz steht immer ein Komma.',
 html:()=>ART({was:'Ein <b>Nebensatz</b> kann nicht allein stehen. Er hängt an einem <b>Hauptsatz</b>. Zwischen den beiden Sätzen steht ein <b>Komma</b>.',erk:['Er beginnt mit einem <b>Einleitewort</b>: weil, dass, wenn, obwohl, damit, als, der, die, das …','Die <b>Personalform</b> steht am <b>Schluss</b>.','Probe: Allein ergibt er keinen vollständigen Satz («…, weil ich müde bin»).'],bsp:[['Ich bleibe zu Hause<b>,</b> weil ich krank bin.','Nebensatz hinten: Komma davor'],['Weil ich krank bin<b>,</b> bleibe ich zu Hause.','Nebensatz vorne: Komma danach'],['Ich weiss<b>,</b> dass du recht hast.','Komma vor «dass»']],stolper:'Das Komma gehört zwischen die Sätze, nicht ins Innere des Nebensatzes. Nicht: «Ich bleibe, zu Hause weil ich krank bin.»'})},
{id:'relativ-erkl',lv:2,title:'Was ist ein Relativsatz?',short:'Was ist ein Relativsatz?',min:8,note:'Ab Niveau B. Relativsatz = Nebensatz, der ein Nomen im Hauptsatz genauer beschreibt (Bezugswort). Beginnt mit der, die, das, welcher, wo. Immer mit Komma abgetrennt: am Ende ein Komma, in der Mitte zwei.',
 html:()=>ART({was:'Ein <b>Relativsatz</b> ist ein Nebensatz, der ein <b>Nomen</b> genauer beschreibt. Er beginnt mit <b>der, die, das</b> (oder welcher, wo).',erk:['Er hängt an einem <b>Bezugswort</b> (einem Nomen) im Hauptsatz.','Das Relativpronomen lässt sich oft durch <b>«welcher, welche, welches»</b> ersetzen.','Die Personalform steht am <b>Schluss</b>.'],bsp:[['Ich kenne den Jungen<b>,</b> der neben mir sitzt.','am Ende: ein Komma davor'],['Die Frau<b>,</b> die dort wartet<b>,</b> ist meine Lehrerin.','in der Mitte: zwei Kommas'],['Das Fahrrad<b>,</b> das ich bekam<b>,</b> ist rot.','in der Mitte: zwei Kommas']],stolper:'In der Mitte brauchst du <b>zwei</b> Kommas. Wer einmal anfängt, muss auch schliessen.'})},
{id:'einschub',lv:2,title:'Was ist ein Einschub?',short:'Einschub (Apposition)',min:6,note:'Ab Niveau B. Ein Einschub (Apposition) erklärt ein Nomen genauer und steht zwischen zwei Kommas. Probe: Ohne den Einschub bleibt der Satz vollständig. Nicht mit Aufzählung verwechseln.',
 html:()=>ART({was:'Ein <b>Einschub</b> (Apposition) erklärt ein Nomen genauer. Er wird in den Satz <b>eingeschoben</b>.',erk:['Er sagt noch einmal dasselbe mit anderen Worten: «Anna, <b>meine Schwester</b>».','Probe: Lässt man ihn weg, ist der Satz noch <b>vollständig</b>.','Er steht zwischen <b>zwei Kommas</b>.'],bsp:[['Anna<b>,</b> meine Schwester<b>,</b> wohnt in Bern.','Einschub: meine Schwester'],['Mein Onkel<b>,</b> ein Pilot<b>,</b> wohnt in Zürich.','Einschub: ein Pilot'],['Zürich<b>,</b> die grösste Stadt der Schweiz<b>,</b> liegt am See.','Einschub: die grösste Stadt …']],stolper:'Eine <b>Aufzählung</b> sieht ähnlich aus: «Anna, Tim und Mia». Beim Einschub bezeichnen beide Teile <b>dieselbe</b> Person oder Sache.'})},
{id:'infgruppe',title:'Was ist eine Infinitivgruppe?',short:'Infinitivgruppe',min:8,note:'Infinitivgruppe = Infinitiv mit «zu» plus die Wörter, die dazugehören (um den Bus zu erreichen). Komma ist Pflicht bei um, ohne, statt, anstatt, ausser, als. Sonst ist es oft freiwillig. Pflicht ist es auch, wenn die Gruppe von einem Nomen oder Hinweiswort abhängt.',
 html:()=>ART({was:'Eine <b>Infinitivgruppe</b> besteht aus einem <b>Infinitiv mit «zu»</b> und den Wörtern, die dazugehören.',erk:['Es steht «<b>zu</b>» + Infinitiv: <b>zu erreichen, zu sagen, zu lernen</b>.','Es gibt keine Personalform und kein eigenes Subjekt.','Bei <b>um … zu, ohne … zu, statt … zu</b> steht das Komma <b>immer</b>.'],bsp:[['Wir gingen früh<b>,</b> um den Bus zu erreichen.','um … zu: Komma Pflicht'],['Er ging weg<b>,</b> ohne ein Wort zu sagen.','ohne … zu: Komma Pflicht'],['Statt zu lernen<b>,</b> schaute sie fern.','statt … zu: Komma Pflicht']],stolper:'Bei anderen Infinitivgruppen (zum Beispiel «Er hofft zu gewinnen») ist das Komma oft <b>freiwillig</b>. Pflicht ist es auch, wenn die Gruppe zu einem Nomen oder Hinweiswort gehört: «Ich habe den Plan<b>,</b> auszuwandern.»'})}
];
const ORD=['was-komma','auf','ns-erkl','haupt-neben','hs-hs','relativ-erkl','relativ','einschub','sonst','infgruppe','stolper'];
const UE={auf:{types:'ktap,komma,ja',cats:'sg1'},'ns-erkl':{types:'ktap,komma,ja',cats:'sg2'},'haupt-neben':{types:'ktap,komma,ja',cats:'sg2'},'hs-hs':{types:'ktap,komma,ja',cats:'sg2'},'relativ-erkl':{types:'ktap,komma,ja',cats:'sg3'},relativ:{types:'ktap,komma,ja',cats:'sg3'},einschub:{types:'ktap,komma,ja',cats:'sg3'},sonst:{types:'ktap,komma,ja',cats:'sg4',title:'Anrede, Ausruf, Infinitivgruppe'},infgruppe:{types:'ktap,komma,ja',cats:'sg4'}};
const ALL=SECS0.concat(SECS_N);
const SECS=ORD.map(id=>{const x=ALL.find(y=>y.id===id);if(!x)throw new Error('Abschnitt fehlt: '+id);if(UE[id])x.uebung=Object.assign({},UE[id]);return x;});
const EX=[
 ['Setze die Kommas: «Ich kaufe Brot Milch Käse und Butter.»','Ich kaufe Brot, Milch, Käse und Butter.',1],
 ['Setze das Komma: «Ich weiss dass er kommt.»','Ich weiss, dass er kommt.',1],
 ['Setze das Komma: «Weil es regnet bleiben wir zu Hause.»','Weil es regnet, bleiben wir zu Hause.',1],
 ['Setze das Komma: «Es regnet aber wir gehen hinaus.»','Es regnet, aber wir gehen hinaus.',1],
 ['Setze die Kommas: «Der Hund der dort steht gehört mir.»','Der Hund, der dort steht, gehört mir.',2],
 ['Setze das Komma: «Lukas komm bitte her!»','Lukas, komm bitte her!',2],
 ['Schreibe einen Satz mit Aufzählung und einen mit «weil».','Beispiel: Ich esse Äpfel, Birnen und Trauben. Ich bleibe, weil ich müde bin.',2]
];
const merk=()=>T(['Regel','Beispiel'],[['Aufzählung (nicht vor und/oder)','Äpfel<b>,</b> Birnen <b>und</b> Bananen'],['Nebensatz','Ich weiss<b>,</b> dass er kommt.<br>Weil ich müde bin<b>,</b> gehe ich.'],['aber, denn, sondern','Ich will<b>,</b> aber ich kann nicht.'],['Relativsatz / Einschub','Der Mann<b>,</b> der dort steht<b>,</b> …'],['Anrede, Ausruf','Lukas<b>,</b> komm! · Ach<b>,</b> schade!'],['Infinitiv mit um … zu','Sie lernt<b>,</b> um zu bestehen.']]);
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Sie mag Hunde, Katzen und Pferde.',['Sie mag Hunde Katzen und Pferde.','Sie mag Hunde, Katzen, und Pferde.','Sie mag, Hunde, Katzen und Pferde.'],1,'sg1','Aufzählung: Komma zwischen den Gliedern, vor «und» kein Komma.'],
['Das Wetter ist kalt, aber die Sonne scheint.',['Das Wetter ist kalt aber die Sonne scheint.','Das Wetter ist kalt aber, die Sonne scheint.','Das Wetter ist, kalt aber die Sonne scheint.'],1,'sg2','Vor «aber» steht ein Komma.'],
['Ich glaube, dass er recht hat.',['Ich glaube dass er recht hat.','Ich glaube dass, er recht hat.','Ich glaube, dass, er recht hat.'],1,'sg2','Vor «dass» steht ein Komma.'],
['Wenn es regnet, bleiben wir zu Hause.',['Wenn es regnet bleiben wir zu Hause.','Wenn, es regnet bleiben wir zu Hause.','Wenn es regnet bleiben, wir zu Hause.'],1,'sg2','Der Nebensatz am Anfang wird mit einem Komma abgetrennt.'],
['Wir bleiben zu Hause, weil es regnet.',['Wir bleiben zu Hause weil es regnet.','Wir bleiben, zu Hause weil es regnet.','Wir bleiben zu Hause weil, es regnet.'],1,'sg2','Vor «weil» steht ein Komma.'],
['Als wir ankamen, war es schon dunkel.',['Als wir ankamen war es schon dunkel.','Als wir ankamen war, es schon dunkel.','Als, wir ankamen war es schon dunkel.'],1,'sg2','Nach dem Nebensatz steht ein Komma.'],
['Ich weiss, wo du wohnst.',['Ich weiss wo du wohnst.','Ich weiss wo, du wohnst.','Ich, weiss wo du wohnst.'],2,'sg2','Auch ein Nebensatz mit Fragewort wird mit Komma abgetrennt.'],
['Obwohl er müde war, ging er zur Schule.',['Obwohl er müde war ging er zur Schule.','Obwohl er müde war ging, er zur Schule.','Obwohl, er müde war ging er zur Schule.'],1,'sg2','Nach dem Nebensatz steht ein Komma.'],
['Der Mann, der dort steht, ist mein Onkel.',['Der Mann der dort steht, ist mein Onkel.','Der Mann, der dort steht ist mein Onkel.','Der Mann der dort steht ist mein Onkel.'],2,'sg3','Der Relativsatz wird vorne und hinten mit Komma abgetrennt.'],
['Das Mädchen, das ich gestern traf, heisst Mia.',['Das Mädchen das ich gestern traf, heisst Mia.','Das Mädchen, das ich gestern traf heisst Mia.','Das Mädchen das ich gestern traf heisst Mia.'],2,'sg3','Der Relativsatz steht zwischen zwei Kommas.'],
['Mia, meine Freundin, kommt morgen.',['Mia meine Freundin, kommt morgen.','Mia, meine Freundin kommt morgen.','Mia meine Freundin kommt morgen.'],2,'sg3','Der Einschub «meine Freundin» wird von Kommas eingeschlossen.'],
['Tim, komm bitte her!',['Tim komm bitte her!','Tim, komm, bitte her!','Tim komm, bitte her!'],1,'sg4','Die Anrede wird mit einem Komma abgetrennt.'],
['Ja, ich komme gern.',['Ja ich komme gern.','Ja, ich, komme gern.','Ja ich, komme gern.'],1,'sg4','Nach «Ja» steht ein Komma.'],
['Er ging nach Hause, ohne sich zu verabschieden.',['Er ging nach Hause ohne sich zu verabschieden.','Er ging nach Hause ohne, sich zu verabschieden.','Er ging, nach Hause ohne sich zu verabschieden.'],3,'sg4','Vor «ohne zu» + Infinitiv steht immer ein Komma.'],
['Sie lernt viel, um eine gute Note zu schreiben.',['Sie lernt viel um eine gute Note zu schreiben.','Sie lernt viel um, eine gute Note zu schreiben.','Sie lernt, viel um eine gute Note zu schreiben.'],3,'sg4','Vor «um zu» + Infinitiv steht immer ein Komma.']
].forEach(r=>task.push({typ:'komma',stufe:r[2],lv:r[2]===3?2:1,cats:[r[3]],prompt:'Welcher Satz ist richtig geschrieben?',opts:[r[0]].concat(r[1]),answer:r[0],why:'<b>'+r[0]+'</b> '+r[4]}));
[
['Tim spielt Gitarre___ und singt dazu.',false,2,'sg2','Zusammengezogener Satz: Vor «und» steht kein Komma.'],
['Ich bleibe zu Hause___ weil ich krank bin.',true,1,'sg2','Vor «weil» steht ein Komma.'],
['Es regnet___ aber wir gehen hinaus.',true,1,'sg2','Vor «aber» steht ein Komma.'],
['Anna___ komm bitte her!',true,1,'sg4','Die Anrede wird mit einem Komma abgetrennt.'],
['Wir spielen Fussball___ Basketball und Tennis.',true,1,'sg1','In der Aufzählung trennt man mit Komma.'],
['Ich spiele Gitarre ___ und Klavier.',false,1,'sg1','Vor «und» steht in der Aufzählung kein Komma.'],
['Ich weiss___ wann der Bus kommt.',true,2,'sg2','Ein Nebensatz mit Fragewort wird mit Komma abgetrennt.'],
['Sie ging nach Hause___ ohne sich zu verabschieden.',true,3,'sg4','Vor «ohne zu» steht ein Komma.'],
['Wenn du willst___ kannst du mitkommen.',true,1,'sg2','Nach dem Nebensatz am Anfang steht ein Komma.'],
['Nach der Pause___ schreiben wir einen Test.',false,2,'sg2','«Nach der Pause» ist kein Nebensatz, darum steht kein Komma.'],
['Nein___ das stimmt nicht.',true,1,'sg4','Nach «Nein» steht ein Komma.']
].forEach(j=>task.push({typ:'ja',stufe:j[2],lv:j[2]===3?2:1,cats:[j[3]],sent:j[0].replace(/___ ?/g,'<span class="gap">_</span> '),opts:['Komma setzen','Kein Komma'],answer:j[1]?'Komma setzen':'Kein Komma',why:'<b>'+(j[1]?'Komma setzen.':'Kein Komma.')+'</b> '+j[4]}));
task.push=_p0;
})();

GT.chapter({id:'komma',teil:'satz',nr:10,title:'Kommasetzung',big:'Ich weiss, dass er kommt',desc:'Kommaregeln anwenden',
 ex:'«Ich weiss, dass er kommt.»',
 goals:['Ich setze das Komma in Aufzählungen.','Ich setze das Komma zwischen Haupt- und Nebensatz.','Ich setze Kommas beim Relativsatz, bei der Anrede und beim Ausruf.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{ktap:{icon:'👆',label:'Kommas antippen',short:'Wo steht ein Komma?',instr:'Tippe zwischen zwei Wörter, wo ein Komma stehen muss.',hint:'Suche das Einleitewort (weil, dass, der …) oder die Aufzählung. Davor oder danach steht das Komma.',ref:'haupt-neben'},
  komma:{label:'Richtigen Satz wählen',short:'Welcher Satz ist richtig?',instr:'Welcher Satz ist richtig geschrieben?',hint:'Suche den Nebensatz, die Aufzählung oder den Einschub.',ref:'haupt-neben'},
  ja:{label:'Komma oder nicht',short:'Komma setzen?',instr:'Muss ein Komma stehen?',hint:'Beginnt ein Nebensatz? Ist es eine Aufzählung?',ref:'haupt-neben'},
  wissen:{label:'Wissen',short:'Kommaregeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'auf'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
