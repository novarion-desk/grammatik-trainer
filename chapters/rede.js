/* Kapitel Satzlehre 13: Direkte und indirekte Rede. */
(function(){
'use strict';
const GT=window.GT,T=GT.table;
const C={sg1:'Direkte Rede und Zeichensetzung',sg2:'Direkt oder indirekt?',sg3:'Konjunktiv I bilden',sg4:'Indirekte Rede bilden',sg5:'Fachbegriffe'};
const task=[];
const GAP='<span class="gap">_____</span>';
const shuf=GT.shuffle;
const add=t=>task.push(t);

/* ---------- Direkt oder indirekt erkennen ---------- */
const ER=[
['Anna sagt: «Ich bin müde.»','direkte Rede','Die Worte stehen in Anführungszeichen: wörtliche Rede.',1],
['Anna sagt, sie sei müde.','indirekte Rede','Keine Anführungszeichen, Konjunktiv I («sei»): indirekte Rede.',1],
['Tim fragt: «Kommst du mit?»','direkte Rede','Anführungszeichen und Doppelpunkt: direkte Rede.',1],
['Tim fragt, ob ich mitkomme.','indirekte Rede','Eingeleitet mit «ob»: indirekte Rede.',1],
['«Ich habe Hunger», sagt Mia.','direkte Rede','Die Anführungszeichen zeigen die wörtliche Rede.',1],
['Mia sagt, dass sie Hunger habe.','indirekte Rede','Eingeleitet mit «dass», Konjunktiv I («habe»): indirekte Rede.',1],
['Der Lehrer ruft: «Ruhe bitte!»','direkte Rede','Anführungszeichen und Ausrufezeichen: direkte Rede.',1],
['Der Lehrer verlangt, dass alle ruhig seien.','indirekte Rede','Konjunktiv I («seien») ohne Anführungszeichen.',2],
['Die Eltern sagen, sie würden morgen kommen.','indirekte Rede','Ersatzform «würden kommen»: indirekte Rede.',2],
['«Wir fahren morgen», sagen die Eltern.','direkte Rede','Anführungszeichen: direkte Rede.',1]
];
ER.forEach(e=>add({typ:'erkenne',stufe:e[3],lv:e[3]===2?2:1,cats:['sg2'],prompt:'Ist das <b>direkte</b> oder <b>indirekte</b> Rede?',sent:e[0],opts:['direkte Rede','indirekte Rede'],answer:e[1],why:'<b>'+e[1]+'.</b> '+e[2]}));

/* ---------- Zeichensetzung ---------- */
const ZE=[
[['Er sagte: «Ich komme.»','Er sagte «Ich komme».','Er sagte, «Ich komme.»'],'Redebegleitsatz vorn: Doppelpunkt, dann Anführungszeichen. Der Schlusspunkt steht in den Anführungszeichen.',1],
[['«Ich komme», sagte er.','«Ich komme.» sagte er.','«Ich komme,» sagte er.'],'Redebegleitsatz hinten: Der Schlusspunkt fällt weg, nach den Anführungszeichen steht ein Komma.',1],
[['«Kommst du?», fragte sie.','«Kommst du»?, fragte sie.','«Kommst du?» fragte sie.'],'Das Fragezeichen bleibt in den Anführungszeichen, danach folgt trotzdem ein Komma.',1],
[['Sie rief: «Hilfe!»','Sie rief «Hilfe»!','Sie rief, «Hilfe!»'],'Das Ausrufezeichen steht in den Anführungszeichen. Vorangestellt: Doppelpunkt.',1],
[['«Ich bin müde», sagte Anna, «und will schlafen.»','«Ich bin müde», sagte Anna «und will schlafen».','«Ich bin müde,» sagte Anna, «und will schlafen.»'],'Der Redebegleitsatz steht in der Mitte: Komma davor und danach, zweite Rede klein.',2],
[['«Wo bist du?», fragte Tim.','«Wo bist du?» fragte Tim.','«Wo bist du»? fragte Tim.'],'Nach dem Fragezeichen kommt ein Komma, der Redebegleitsatz beginnt klein.',1],
[['Der Lehrer sagte: «Heute schreiben wir eine Prüfung.»','Der Lehrer sagte, «Heute schreiben wir eine Prüfung.»','Der Lehrer sagte: «heute schreiben wir eine Prüfung.»'],'Die wörtliche Rede beginnt gross, weil sie ein ganzer Satz ist.',1],
[['«Komm bitte!», sagte Mama.','«Komm bitte!» sagte Mama.','«Komm bitte»!, sagte Mama.'],'Nach dem Ausrufezeichen steht ein Komma, der Begleitsatz beginnt klein.',2]
];
ZE.forEach(z=>add({typ:'zeichen',stufe:z[2],lv:1,cats:['sg1'],prompt:'Welcher Satz ist richtig geschrieben?',opts:z[0],answer:z[0][0],why:'<b>'+z[0][0]+'</b> '+z[1]}));

/* ---------- Konjunktiv I: Form einsetzen (3. Person Einzahl) ---------- */
const KV=[
['kommen','komme','kommt','käme','komm'],['gehen','gehe','geht','ginge','geh'],['spielen','spiele','spielt','spielte','spiel'],['lesen','lese','liest','läse','les'],
['schreiben','schreibe','schreibt','schriebe','schreib'],['fahren','fahre','fährt','führe','fahr'],['nehmen','nehme','nimmt','nähme','nehm'],['sehen','sehe','sieht','sähe','seh'],
['haben','habe','hat','hätte','hab'],['sein','sei','ist','wäre','sein'],['werden','werde','wird','würde','werd'],['können','könne','kann','könnte','könn'],
['müssen','müsse','muss','müsste','müss'],['wollen','wolle','will','wollte','woll'],['dürfen','dürfe','darf','dürfte','dürf'],['wissen','wisse','weiss','wüsste','wiss']
];
const SUBJ=['Anna','Tim','Mia','Lena','Noah','Max'];
const OBJ={kommen:'morgen',gehen:'nach Hause',spielen:'Fussball',lesen:'ein Buch',schreiben:'einen Brief',fahren:'nach Bern',nehmen:'den Bus',sehen:'den Film',haben:'Hunger',sein:'müde',werden:'bald fertig',können:'nicht kommen',müssen:'früh gehen',wollen:'mitkommen',dürfen:'draussen spielen',wissen:'die Antwort'};
KV.forEach((v,i)=>{
  const s=SUBJ[i%SUBJ.length],pro=(s==='Anna'||s==='Mia'||s==='Lena')?'sie':'er';
  const sent=s+' sagt, '+pro+' '+GAP+' '+OBJ[v[0]]+'.';
  const lvv=(v[0]==='sein'||v[0]==='haben')?1:2;
  add({typ:'konj',stufe:lvv,lv:lvv,cats:['sg3'],prompt:'Welche Form des Konjunktivs I passt? Verb: «'+v[0]+'»',sent:sent,opts:[v[1],v[2],v[3],v[4]],answer:v[1],why:'<b>'+v[1]+'.</b> Konjunktiv I, 3. Person Einzahl: Stamm + «e» ('+v[0]+' → '+v[1]+'). Nicht «'+v[2]+'» (Indikativ) und nicht «'+v[3]+'» (Konjunktiv II).'});
});

/* ---------- Ersatzform, wenn Konjunktiv I gleich wie Indikativ ---------- */
const ERS=[
['Die Kinder sagen, sie ___ Hunger.','hätten',['haben','hatten','habe'],'«sie haben» ist im Konjunktiv I gleich wie im Indikativ. Darum nimmt man Konjunktiv II: «hätten».'],
['Die Eltern sagen, sie ___ morgen.','würden kommen',['kommen','kamen','kommt'],'«sie kommen» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «würden kommen».'],
['Die Schüler sagen, sie ___ müde.','seien',['sind','waren','sei'],'Bei «sein» gibt es eine eigene Form für die Mehrzahl: «seien».'],
['Tim und Lena sagen, sie ___ nach Hause.','würden gehen',['gehen','gingen','geht'],'«sie gehen» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «würden gehen».'],
['Wir sagen, wir ___ Zeit.','hätten',['haben','hatten','habe'],'«wir haben» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «hätten».'],
['Die Freunde sagen, sie ___ nicht kommen.','könnten',['können','konnten','könne'],'«sie können» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «könnten».'],
['Die Nachbarn sagen, sie ___ den Film.','würden sehen',['sehen','sahen','sieht'],'«sie sehen» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «würden sehen».']
];
ERS.forEach(e=>add({typ:'ersatz',stufe:3,lv:3,cats:['sg3'],prompt:'Welche Form ist richtig? Konjunktiv I oder Ersatzform.',sent:e[0].replace('___',GAP),opts:[e[1]].concat(e[2]),answer:e[1],why:'<b>'+e[1]+'.</b> '+e[3]}));

/* ---------- Umformen: direkte → indirekte Rede ---------- */
const UM=[
['Anna sagt: «Ich bin müde.»','Anna sagt, sie sei müde.',['Anna sagt, ich sei müde.','Anna sagt, sie ist müde.','Anna sagt, sie wäre müde.'],'«ich» wird zu «sie», «bin» wird zu Konjunktiv I «sei».',2],
['Tim sagt: «Ich habe Hunger.»','Tim sagt, er habe Hunger.',['Tim sagt, ich habe Hunger.','Tim sagt, er hat Hunger.','Tim sagt, er hätte Hunger haben.'],'«ich» wird zu «er», «habe» bleibt im Konjunktiv I «habe».',2],
['Mia sagt: «Ich komme morgen.»','Mia sagt, sie komme morgen.',['Mia sagt, sie kommt morgen.','Mia sagt, ich komme morgen.','Mia sagt, sie käme morgen.'],'«ich» wird zu «sie», «komme» ist schon Konjunktiv I.',2],
['Noah sagt: «Ich habe das Buch gelesen.»','Noah sagt, er habe das Buch gelesen.',['Noah sagt, er hat das Buch gelesen.','Noah sagt, ich habe das Buch gelesen.','Noah sagt, er habe das Buch lesen.'],'Vergangenheit: «habe» + Partizip.',2],
['Anna sagt: «Ich werde dir helfen.»','Anna sagt, sie werde mir helfen.',['Anna sagt, sie wird mir helfen.','Anna sagt, sie werde dir helfen.','Anna sagt, ich werde dir helfen.'],'«ich» → «sie», «dir» → «mir» (die Perspektive wechselt).',3],
['Tim sagt: «Ich kann nicht kommen.»','Tim sagt, er könne nicht kommen.',['Tim sagt, er kann nicht kommen.','Tim sagt, er konnte nicht kommen.','Tim sagt, ich könne nicht kommen.'],'«kann» wird zu Konjunktiv I «könne».',2],
['Der Arzt sagt: «Sie müssen mehr schlafen.» (Du erzählst es als Patient.)','Der Arzt sagt, ich müsse mehr schlafen.',['Der Arzt sagt, Sie müssen mehr schlafen.','Der Arzt sagt, ich muss mehr schlafen.','Der Arzt sagt, er müsse mehr schlafen.'],'«Sie» wird zu «ich», «müssen» zu Konjunktiv I «müsse».',3],
['Lena sagt: «Ich war gestern krank.»','Lena sagt, sie sei am Vortag krank gewesen.',['Lena sagt, sie war gestern krank.','Lena sagt, sie sei gestern krank.','Lena sagt, ich sei am Vortag krank gewesen.'],'Vergangenheit: «sei … gewesen». «gestern» wird später zu «am Vortag».',3],
['Mia sagt: «Wir gehen ins Kino.»','Mia sagt, sie würden ins Kino gehen.',['Mia sagt, sie gehen ins Kino.','Mia sagt, wir gehen ins Kino.','Mia sagt, sie gehe ins Kino.'],'«gehen» ist im Konjunktiv I gleich wie im Indikativ. Ersatz: «würden gehen».',3],
['Anna sagt: «Das Wetter ist schön.»','Anna sagt, das Wetter sei schön.',['Anna sagt, das Wetter ist schön.','Anna sagt, das Wetter wäre schön.','Anna sagt, das Wetter seien schön.'],'«ist» wird zu «sei».',2],
['Lena fragt Tim: «Kommst du mit?»','Lena fragt Tim, ob er mitkomme.',['Lena fragt Tim, ob du mitkommst.','Lena fragt Tim, dass er mitkomme.','Lena fragt Tim, ob er mitkommt.'],'Fragen werden mit «ob» eingeleitet. «du» → «er», Konjunktiv I «mitkomme».',3],
['Der Lehrer sagt: «Ihr müsst leise sein.» (Du erzählst es als Schüler.)','Der Lehrer sagt, wir müssten leise sein.',['Der Lehrer sagt, wir müssen leise sein.','Der Lehrer sagt, ihr müsstet leise sein.','Der Lehrer sagt, wir müsse leise sein.'],'«müssen» ist in der Mehrzahl gleich wie im Indikativ: Ersatz «müssten».',3]
];
UM.forEach(u=>add({typ:'umform',stufe:u[4],lv:u[4]===2?2:3,cats:['sg4'],prompt:'Wie lautet die <b>indirekte Rede</b>?',sent:u[0],opts:[u[1]].concat(u[2]),answer:u[1],why:'<b>'+u[1]+'</b> '+u[3]}));

/* ---------- Wissen ---------- */
const W=[
['Wie heisst der Satz, der die wörtliche Rede ankündigt? («Er sagte: …»)',['Redebegleitsatz','Nebensatz','Konditionalsatz','Relativsatz'],'Redebegleitsatz','Der Redebegleitsatz sagt, wer spricht.','sg1',1],
['Was steht in der direkten Rede <b>vor</b> den Anführungszeichen, wenn der Redebegleitsatz vorne steht?',['ein Doppelpunkt','ein Komma','ein Punkt','nichts'],'ein Doppelpunkt','Er sagte: «Ich komme.»','sg1',1],
['Was steht nach den Anführungszeichen, wenn der Redebegleitsatz hinten steht?',['ein Komma','ein Punkt','ein Doppelpunkt','ein Strichpunkt'],'ein Komma','«Ich komme», sagte er.','sg1',1],
['Womit leitet man eine indirekte <b>Frage</b> ein?',['ob','dass','weil','damit'],'ob','Lena fragt, ob er mitkomme.','sg4',2],
['Welche Zeitform braucht die indirekte Rede?',['Konjunktiv I','Perfekt','Präteritum','Imperativ'],'Konjunktiv I','Der Konjunktiv I zeigt, dass jemand etwas nur wiedergibt.','sg3',2],
['Wann braucht man eine Ersatzform (Konjunktiv II oder «würde» + Infinitiv)?',['wenn Konjunktiv I gleich lautet wie der Indikativ','immer','wenn die Rede eine Frage ist','wenn das Verb «sein» ist'],'wenn Konjunktiv I gleich lautet wie der Indikativ','Beispiel: «sie haben» → «sie hätten».','sg3',3],
['Wie bildet man Konjunktiv I der Vergangenheit?',['«habe» oder «sei» + Partizip','«hatte» + Partizip','«würde» + Infinitiv','«ist» + Partizip'],'«habe» oder «sei» + Partizip','Er sagt, er habe gegessen. Sie sagt, sie sei gekommen.','sg3',3],
['Was ändert sich beim Umformen <b>immer</b>? «Tim sagt: «Ich bin müde.»»',['das Pronomen','der Name','das Nomen','die Zeichensetzung bleibt'],'das Pronomen','«ich» wird zu «er». Zusätzlich ändern sich Verbform und Satzzeichen.','sg4',2],
['Warum benutzt man die indirekte Rede?',['um Gesagtes wiederzugeben, ohne es wörtlich zu zitieren','um etwas zu betonen','um Befehle zu geben','um Fragen zu stellen'],'um Gesagtes wiederzugeben, ohne es wörtlich zu zitieren','Zum Beispiel in Berichten und Zeitungen.','sg2',2]
];
W.forEach(w=>add({typ:'wissen',stufe:w[5],lv:w[5]===3?3:w[5]===2?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:'<b>'+w[2]+'.</b> '+w[3]}));

/* ---------- Fachbegriffe ---------- */
const FB=[
['Wörtliche Rede nennt man auch ___ Rede.','direkte',['direkte'],'wörtliche Rede = direkte Rede.'],
['Gedanken oder Aussagen anderer ohne Anführungszeichen wiedergeben nennt man ___ Rede.','indirekte',['indirekte'],'indirekte Rede: Aussagen anderer wiedergeben, meist im Konjunktiv I.'],
['Der Satz, der angibt, wer spricht, heisst ___.','Redebegleitsatz',['redebegleitsatz'],'Redebegleitsatz: Er sagte, sie fragte, …'],
['Die Möglichkeitsform für die indirekte Rede heisst ___ I.','Konjunktiv',['konjunktiv'],'Konjunktiv I = Möglichkeitsform für die indirekte Rede.']
];
FB.forEach(f=>add({typ:'fach',stufe:2,lv:1,cats:['sg5'],input:true,prompt:'Schreibe den Fachbegriff.',sent:f[0].replace('___',GAP),answer:f[1],accept:f[2],strict:true,why:'<b>'+f[1]+'.</b> '+f[3]}));

/* ---- Erweiterung 2 (23.11.2026, Ausbau Fachbegriffe, Zeichensetzung und Umformen) ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Mama ruft: «Das Essen ist fertig!»','direkte Rede','Anführungszeichen und Doppelpunkt: direkte Rede.',1],
['Mama ruft, das Essen sei fertig.','indirekte Rede','Konjunktiv I «sei», keine Anführungszeichen: indirekte Rede.',1],
['«Ich habe keine Lust», sagt Ben.','direkte Rede','Die Anführungszeichen zeigen die wörtliche Rede.',1],
['Ben sagt, er habe keine Lust.','indirekte Rede','Konjunktiv I «habe», keine Anführungszeichen: indirekte Rede.',1],
['Der Pilot meldet, der Flug dauere zwei Stunden.','indirekte Rede','Konjunktiv I «dauere», keine Anführungszeichen: indirekte Rede.',2],
['Lisa fragt, ob Tim heute Zeit habe.','indirekte Rede','Eingeleitet mit «ob», Konjunktiv I «habe».',2]
].forEach(e=>add({typ:'erkenne',stufe:e[3],lv:e[3]===2?2:1,cats:['sg2'],prompt:'Ist das <b>direkte</b> oder <b>indirekte</b> Rede?',sent:e[0],opts:['direkte Rede','indirekte Rede'],answer:e[1],why:'<b>'+e[1]+'.</b> '+e[2]}));
[
[['Nina sagte: «Ich bin müde.»','Nina sagte «Ich bin müde».','Nina sagte, «Ich bin müde.»'],'Redebegleitsatz vorn: Doppelpunkt. Der Schlusspunkt steht in den Anführungszeichen.',1],
[['«Hast du Zeit?», fragte Ben.','«Hast du Zeit?» fragte Ben.','«Hast du Zeit»?, fragte Ben.'],'Nach dem Fragezeichen steht trotzdem ein Komma. Der Begleitsatz beginnt klein.',1],
[['Der Trainer rief: «Schneller laufen!»','Der Trainer rief «Schneller laufen»!','Der Trainer rief, «Schneller laufen!»'],'Das Ausrufezeichen gehört zur wörtlichen Rede und steht in den Anführungszeichen.',1],
[['«Ich komme später», sagte Lena, «weil ich noch lernen muss.»','«Ich komme später,» sagte Lena «weil ich noch lernen muss.»','«Ich komme später», sagte Lena, «Weil ich noch lernen muss.»'],'Redebegleitsatz in der Mitte: Komma davor und danach, die Fortsetzung beginnt klein.',2]
].forEach(z=>add({typ:'zeichen',stufe:z[2],lv:1,cats:['sg1'],prompt:'Welcher Satz ist richtig geschrieben?',opts:z[0],answer:z[0][0],why:'<b>'+z[0][0]+'</b> '+z[1]}));
[
['Lisa sagt: «Ich habe meine Hausaufgaben gemacht.»','Lisa sagt, sie habe ihre Hausaufgaben gemacht.',['Lisa sagt, sie hat ihre Hausaufgaben gemacht.','Lisa sagt, ich habe meine Hausaufgaben gemacht.','Lisa sagt, sie habe ihre Hausaufgaben machen.'],'«ich» wird zu «sie», «meine» zu «ihre». «habe … gemacht» ist der Konjunktiv I der Vergangenheit.',3],
['Paul sagt: «Ich fahre morgen nach Bern.»','Paul sagt, er fahre morgen nach Bern.',['Paul sagt, er fährt morgen nach Bern.','Paul sagt, ich fahre morgen nach Bern.','Paul sagt, er fuhr morgen nach Bern.'],'«ich» wird zu «er», «fahre» ist schon Konjunktiv I.',2],
['Mia sagt: «Ich kann gut schwimmen.»','Mia sagt, sie könne gut schwimmen.',['Mia sagt, sie kann gut schwimmen.','Mia sagt, ich könne gut schwimmen.','Mia sagt, sie konnte gut schwimmen.'],'«ich» wird zu «sie», «kann» wird zu «könne».',2],
['Die Kinder sagen: «Wir haben Hunger.»','Die Kinder sagen, sie hätten Hunger.',['Die Kinder sagen, sie haben Hunger.','Die Kinder sagen, wir hätten Hunger.','Die Kinder sagen, sie habe Hunger.'],'«wir» wird zu «sie». Der Konjunktiv I «haben» wäre gleich wie der Indikativ, darum nimmt man den Konjunktiv II «hätten».',3],
['Lea sagt: «Das Wetter war schlecht.»','Lea sagt, das Wetter sei schlecht gewesen.',['Lea sagt, das Wetter war schlecht.','Lea sagt, das Wetter ist schlecht gewesen.','Lea sagt, das Wetter wäre schlecht gewesen.'],'Vergangenheit: «sei … gewesen» (Konjunktiv I von «sein» und Partizip).',3],
['Noah fragt Mia: «Wo wohnst du?»','Noah fragt Mia, wo sie wohne.',['Noah fragt Mia, wo sie wohnt.','Noah fragt Mia, wo du wohnst.','Noah fragt Mia, ob sie wohne.'],'Das Fragewort «wo» bleibt, «du» wird zu «sie», «wohnst» zu «wohne».',3],
['Der Arzt sagt zu Tim: «Du musst mehr trinken.»','Der Arzt sagt zu Tim, er müsse mehr trinken.',['Der Arzt sagt zu Tim, er muss mehr trinken.','Der Arzt sagt zu Tim, du müsstest mehr trinken.','Der Arzt sagt zu Tim, er musste mehr trinken.'],'«du» wird zu «er», «musst» wird zu «müsse».',2]
].forEach(u=>add({typ:'umform',stufe:u[4],lv:u[4]===2?2:3,cats:['sg4'],prompt:'Wie lautet die <b>indirekte Rede</b>?',sent:u[0],opts:[u[1]].concat(u[2]),answer:u[1],why:'<b>'+u[1]+'</b> '+u[3]}));
[
['Wie lautet die Konjunktiv-I-Form von «er kommt»?',['er komme','er käme','er kommt','er kam'],'er komme','Konjunktiv I: Stamm und «-e»: «komme».','sg3',1],
['Warum sagt man «Die Kinder sagen, sie hätten Hunger» und nicht «sie haben Hunger»?',['«haben» im Konjunktiv I lautet gleich wie der Indikativ.','«hätten» ist die Höflichkeitsform.','Die Rede steht in der Vergangenheit.','«haben» ist kein Hilfsverb.'],'«haben» im Konjunktiv I lautet gleich wie der Indikativ.','Wenn man den Konjunktiv I nicht vom Indikativ unterscheiden kann, nimmt man den Konjunktiv II als Ersatzform.','sg3',3],
['Was passiert beim Umformen in die indirekte Rede meist mit den Personalpronomen?',['Sie richten sich nach der Person, über die man spricht: «ich» wird zu «er» oder «sie».','Sie fallen weg.','Sie werden immer zu «man».','Sie bleiben immer gleich.'],'Sie richten sich nach der Person, über die man spricht: «ich» wird zu «er» oder «sie».','Beispiel: «Ich komme.» wird zu «Er sagt, er komme.»','sg4',2],
['Welches Wort kann eine indirekte Aussage einleiten?',['dass','ob','wer','wo'],'dass','Beispiel: Er sagt, dass er komme. «dass» kann auch wegfallen: Er sagt, er komme.','sg4',2]
].forEach(w=>add({typ:'wissen',stufe:w[5],lv:w[5]===3?3:w[5]===2?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:'<b>'+w[2]+'.</b> '+w[3]}));
[
['In der direkten Rede steht das Gesagte in ___.','Anführungszeichen',['anführungszeichen'],'Die wörtliche Rede steht in Anführungszeichen.',1],
['Wenn der Konjunktiv I wie der Indikativ lautet, braucht man eine ___.','Ersatzform',['ersatzform'],'Ersatzform: Konjunktiv II oder «würde» und Infinitiv.',2],
['Das Zeichen vor der wörtlichen Rede, wenn der Redebegleitsatz vorangeht, heisst ___.','Doppelpunkt',['doppelpunkt'],'Beispiel: Er sagte: «Ich komme.»',1],
['Die Frage «Kommst du?» heisst in der indirekten Rede ___ Frage.','indirekte',['indirekte'],'Beispiel: Sie fragt, ob er komme.',2],
['Die Aussage «Ich komme.» ohne Anführungszeichen wiederzugeben, nennt man ___ Rede.','indirekte',['indirekte'],'Indirekte Rede: Er sagt, er komme.',1],
['Das Gesagte, das in Anführungszeichen steht, heisst auch ___ Rede.','wörtliche',['wörtliche','woertliche'],'Wörtliche Rede = direkte Rede.',1],
['Die Möglichkeitsform, die man für die indirekte Rede braucht, heisst Konjunktiv ___.','I',['I','1','eins'],'Konjunktiv I.',2]
].forEach(f=>add({typ:'fach',stufe:f[4],lv:1,cats:['sg5'],input:true,prompt:'Schreibe den Fachbegriff.',sent:f[0].replace('___',GAP),answer:f[1],accept:f[2],strict:true,why:'<b>'+f[1]+'.</b> '+f[3]}));
task.push=_p0;
})();

/* ---------- Antippen: Redebegleitsatz und wörtliche Rede ---------- */
const TP=[
['Er sagte:','«Ich komme morgen.»','BR'],['Anna fragte:','«Kommst du mit?»','BR'],['Der Lehrer rief:','«Ruhe bitte!»','BR'],['Mia erzählte:','«Ich war gestern im Kino.»','BR'],
['Tim antwortete:','«Ich habe keine Zeit.»','BR'],['sagte er.','«Ich komme morgen»,','RB'],['fragte Anna.','«Kommst du mit?»,','RB'],['rief der Lehrer.','«Ruhe bitte!»,','RB'],
['sagte Lena','«Das Wetter ist schön»,','RB'],['meinte Noah.','«Das war ein guter Tag»,','RB']
];
TP.forEach(p=>{
  const B=p[0].split(' '),R=p[1].split(' ');
  let toks,tb,tr;
  if(p[2]==='BR'){toks=B.concat(R);tb=B.map((_,i)=>i);tr=R.map((_,i)=>B.length+i);}
  else{toks=R.concat(B);tr=R.map((_,i)=>i);tb=B.map((_,i)=>R.length+i);}
  add({typ:'markieren',stufe:1,lv:1,cats:['sg1'],gl:'Redebegleitsatz',tokens:toks,targets:tb,instr:'Tippe den Redebegleitsatz an.',why:'<b>Redebegleitsatz:</b> «'+tb.map(i=>toks[i]).join(' ').replace(/[.:,]$/,'')+'». Er sagt, wer spricht.'});
  add({typ:'markieren',stufe:1,lv:1,cats:['sg1'],gl:'Wörtliche Rede',tokens:toks,targets:tr,instr:'Tippe die wörtliche Rede an (mit Anführungszeichen).',why:'<b>Wörtliche Rede:</b> '+tr.map(i=>toks[i]).join(' ')+' – das Gesagte steht in Anführungszeichen.'});
});

/* ---------- Theorie ---------- */
const SECS=[
{id:'was',title:'Direkte und indirekte Rede',short:'Was ist das?',min:6,note:'Erst direkte Rede (Anführungszeichen), dann indirekte (Konjunktiv I, dass-Satz). Vergleich an derselben Aussage zeigen.',
 html:()=>'<div class="grid2"><div class="card"><h3>Direkte Rede</h3><p>Anna sagt: «Ich bin müde.»</p><p class="muted">Die Worte werden wörtlich wiedergegeben, in Anführungszeichen.</p></div>'+
 '<div class="card"><h3>Indirekte Rede</h3><p>Anna sagt, sie <b>sei</b> müde.</p><p class="muted">Die Worte werden sinngemäss wiedergegeben, ohne Anführungszeichen, meist im Konjunktiv I.</p></div></div>'+
 '<div class="callout">Der <b>Redebegleitsatz</b> («Anna sagt») sagt, wer spricht. Die <b>Rede</b> sagt, was gesagt wird.</div>'},
{id:'zeichen',title:'Zeichensetzung in der direkten Rede',short:'Zeichensetzung',min:8,note:'Drei Stellungen des Redebegleitsatzes. In der Schweiz: «Anführungszeichen» (Guillemets). Die Rede beginnt gross, ausser nach Unterbrechung.',
 html:()=>[['Vorn','bl','Redebegleitsatz vorn: Doppelpunkt, Rede gross, Schlusspunkt in den Anführungszeichen','Er sagte: «Ich komme.»'],['Hinten','gr','Redebegleitsatz hinten: kein Schlusspunkt, danach Komma, Begleitsatz klein','«Ich komme», sagte er.'],['Mitte','or','Redebegleitsatz in der Mitte: Komma davor und danach, zweite Rede klein','«Ich komme», sagte er, «morgen.»'],['Frage','vi','Frage oder Ausruf: Fragezeichen bleibt, danach trotzdem Komma','«Kommst du?», fragte sie.']].map(a=>GT.ui.R(a[0],a[1],a[2],a[3])).join('')},
{id:'indirekt',title:'Indirekte Rede bilden',short:'Indirekte Rede',lv:2,min:10,note:'Ab Niveau B. Schritte: Einleiten (dass / ob / ohne Einleitewort), Pronomen anpassen, Verb in den Konjunktiv I setzen.',
 html:()=>'<ol class="steps"><li><b>Einleiten:</b> «Anna sagt, …» oder mit «dass»: «Anna sagt, dass sie müde sei.» Fragen mit «ob».</li><li><b>Pronomen anpassen:</b> «ich» → «sie», «dir» → «mir».</li><li><b>Verb in den Konjunktiv I setzen:</b> «bin» → «sei».</li><li><b>Zeit- und Ortsangaben anpassen:</b> «gestern» → «am Vortag», «hier» → «dort».</li></ol>'+
 T(['Direkt','Indirekt'],[['Tim sagt: «Ich habe Hunger.»','Tim sagt, er <b>habe</b> Hunger.'],['Lena fragt: «Kommst du mit?»','Lena fragt, <b>ob</b> er mitkomme.'],['Anna sagt: «Ich war krank.»','Anna sagt, sie <b>sei</b> krank <b>gewesen</b>.']])},
{id:'konj',title:'Konjunktiv I',short:'Konjunktiv I',lv:2,min:10,note:'Ab Niveau B. Stamm des Infinitivs + Endung. Ersatzformen nur im Niveau A vertiefen. Bei «sein» weicht der Konjunktiv I ab: sei.',
 html:()=>T(['Person','kommen','haben','sein'],[['ich','komme','habe','sei'],['du','kommest','habest','seiest'],['er/sie/es','komme','habe','sei'],['wir','kommen','haben','seien'],['ihr','kommet','habet','seiet'],['sie','kommen','haben','seien']])+
 '<div class="grid2"><div class="card"><h3>Gegenwart</h3><p>Er sagt, er <b>komme</b>.</p></div><div class="card"><h3>Vergangenheit</h3><p>Er sagt, er <b>sei gekommen</b>. / Er <b>habe</b> gegessen.</p></div></div>'+
 '<div class="callout">Meist braucht man die <b>3. Person Einzahl</b> (er/sie/es): Stamm + <b>e</b>. Ausnahme: <b>sei</b>.</div>'},
{id:'ersatz',title:'Ersatzformen',short:'Ersatzformen',lv:3,min:8,note:'Nur Niveau A. Wenn der Konjunktiv I gleich lautet wie der Indikativ, nimmt man Konjunktiv II oder «würde» + Infinitiv.',
 html:()=>GT.ui.oops([['Er sagt, sie haben Zeit.','Er sagt, sie <b>hätten</b> Zeit.'],['Er sagt, sie gehen ins Kino.','Er sagt, sie <b>würden</b> ins Kino <b>gehen</b>.']])+GT.ui.R('eigene Form','gr','«Wir sind müde.»','Er sagt, sie <b>seien</b> müde.')+'<div class="callout"><b>Regel:</b> Ist «sie haben, sie gehen» im Konjunktiv I gleich wie im Indikativ, braucht man eine Ersatzform: <b>hätten</b>, <b>würden gehen</b>.</div>'},
{id:'fachbegriffe',title:'Fachbegriffe im Überblick',short:'Fachbegriffe',min:4,note:'Diese Begriffe kommen als Eintippaufgaben vor.',
 html:()=>T(['Begriff','Bedeutung'],[['direkte (wörtliche) Rede','Worte in Anführungszeichen'],['indirekte Rede','sinngemässe Wiedergabe, meist im Konjunktiv I'],['Redebegleitsatz','sagt, wer spricht (Er sagte:)'],['Konjunktiv I','Möglichkeitsform für die indirekte Rede'],['Ersatzform','Konjunktiv II oder «würde» + Infinitiv']])}
];
const EX=[
 ['Setze die Zeichen: Er sagte ich komme morgen','Er sagte: «Ich komme morgen.»',1],
 ['Stelle den Redebegleitsatz hinter die Rede: Anna fragte: «Kommst du mit?»','«Kommst du mit?», fragte Anna.',1],
 ['Forme in indirekte Rede um: Tim sagt: «Ich bin müde.»','Tim sagt, er sei müde.',2],
 ['Forme in indirekte Rede um: Lena fragt: «Kommst du mit?»','Lena fragt, ob er mitkomme.',2],
 ['Forme in indirekte Rede um: Die Kinder sagen: «Wir haben Hunger.»','Die Kinder sagen, sie hätten Hunger.',3]
];
const merk=()=>T(['Thema','Merksatz'],[['Direkte Rede','Anführungszeichen «…», Redebegleitsatz mit Doppelpunkt oder Komma'],['Indirekte Rede','kein Anführungszeichen, Pronomen anpassen, Konjunktiv I'],['Konjunktiv I','er/sie/es: Stamm + e (komme, habe), sein: sei'],['Ersatzform','Konjunktiv I = Indikativ → Konjunktiv II oder «würde» + Infinitiv'],['Frage','indirekte Frage mit «ob»']]);
const UEM={zeichen:{types:'zeichen',cats:'sg1'},was:{types:'erkenne',cats:'sg2'},indirekt:{types:'umform',cats:'sg4'},konj:{types:'konj',cats:'sg3'},ersatz:{types:'ersatz',cats:'sg3'}};
SECS.forEach(s=>{if(UEM[s.id]&&!s.uebung)s.uebung=Object.assign({},UEM[s.id]);});
/* ---- Erweiterung 23.11.2026 ---- */
(function(){
const _p0=task.push.bind(task),_have=new Set(task.map(t=>(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer));
task.push=function(t){const k=(t.prompt||'')+'|'+(t.sent||'')+'|'+t.answer;if(_have.has(k))return task.length;_have.add(k);return _p0(t);};
[
['Lena sagt: «Das macht Spass.»','direkte Rede','Anführungszeichen und Doppelpunkt: direkte Rede.',1],
['Lena sagt, das mache Spass.','indirekte Rede','Konjunktiv I «mache», keine Anführungszeichen: indirekte Rede.',1],
['«Wo ist mein Heft?», fragt Noah.','direkte Rede','Die Anführungszeichen zeigen die wörtliche Rede.',1],
['Noah fragt, wo sein Heft sei.','indirekte Rede','Eingeleitet mit dem Fragewort «wo», Konjunktiv I «sei».',2],
['Die Lehrerin ruft: «Kommt bitte alle her!»','direkte Rede','Anführungszeichen: direkte Rede.',1],
['Die Lehrerin sagt, alle sollten herkommen.','indirekte Rede','Konjunktiv II «sollten» als Ersatzform, keine Anführungszeichen: indirekte Rede.',2],
['Mia flüstert: «Ich habe Angst.»','direkte Rede','Anführungszeichen: direkte Rede.',1],
['Mia flüstert, sie habe Angst.','indirekte Rede','Konjunktiv I «habe», keine Anführungszeichen: indirekte Rede.',1]
].forEach(e=>add({typ:'erkenne',stufe:e[3],lv:e[3]===2?2:1,cats:['sg2'],prompt:'Ist das <b>direkte</b> oder <b>indirekte</b> Rede?',sent:e[0],opts:['direkte Rede','indirekte Rede'],answer:e[1],why:'<b>'+e[1]+'.</b> '+e[2]}));
[
[['Mia fragte: «Kommst du morgen?»','Mia fragte «Kommst du morgen»?','Mia fragte, «Kommst du morgen?»'],'Redebegleitsatz vorn: Doppelpunkt. Das Fragezeichen steht in den Anführungszeichen.',1],
[['«Ich habe Hunger», sagte Lena.','«Ich habe Hunger.», sagte Lena.','«Ich habe Hunger,» sagte Lena.'],'Redebegleitsatz hinten: Der Schlusspunkt fällt weg, nach den Anführungszeichen steht ein Komma.',1],
[['Der Lehrer sagte: «Ihr dürft gehen.»','Der Lehrer sagte «Ihr dürft gehen».','Der Lehrer sagte, «Ihr dürft gehen.»'],'Vorangestellter Redebegleitsatz: Doppelpunkt, dann Anführungszeichen. Der Punkt steht in den Anführungszeichen.',1],
[['Sie rief laut: «Warte auf mich!»','Sie rief laut «Warte auf mich»!','Sie rief laut, «Warte auf mich!»'],'Das Ausrufezeichen gehört zur wörtlichen Rede und steht in den Anführungszeichen.',1],
[['«Wir gehen heute schwimmen», sagte Papa, «und danach essen wir Pizza.»','«Wir gehen heute schwimmen,» sagte Papa «und danach essen wir Pizza.»','«Wir gehen heute schwimmen», sagte Papa, «Und danach essen wir Pizza.»'],'Redebegleitsatz in der Mitte: Komma davor und danach, die Fortsetzung beginnt klein.',2],
[['«Wer hat angerufen?», wollte Mama wissen.','«Wer hat angerufen?» wollte Mama wissen.','«Wer hat angerufen»?, wollte Mama wissen.'],'Nach dem Fragezeichen steht trotzdem ein Komma. Der Begleitsatz beginnt klein.',2]
].forEach(z=>add({typ:'zeichen',stufe:z[2],lv:1,cats:['sg1'],prompt:'Welcher Satz ist richtig geschrieben?',opts:z[0],answer:z[0][0],why:'<b>'+z[0][0]+'</b> '+z[1]}));
[
['Mia sagt: «Ich habe Durst.»','Mia sagt, sie habe Durst.',['Mia sagt, sie hat Durst.','Mia sagt, ich habe Durst.','Mia sagt, sie hätte Durst haben.'],'«ich» wird zu «sie», «habe» ist schon Konjunktiv I.',2],
['Tim sagt: «Ich gehe nach Hause.»','Tim sagt, er gehe nach Hause.',['Tim sagt, er geht nach Hause.','Tim sagt, ich gehe nach Hause.','Tim sagt, er ging nach Hause.'],'«ich» wird zu «er», «gehe» ist schon Konjunktiv I.',2],
['Lena sagt: «Ich bin krank.»','Lena sagt, sie sei krank.',['Lena sagt, sie ist krank.','Lena sagt, ich sei krank.','Lena sagt, sie sein krank.'],'«ich» wird zu «sie», «bin» wird zu Konjunktiv I «sei».',2],
['Noah sagt: «Ich muss lernen.»','Noah sagt, er müsse lernen.',['Noah sagt, er muss lernen.','Noah sagt, ich müsse lernen.','Noah sagt, er musste lernen.'],'«ich» wird zu «er», «muss» wird zu «müsse».',2],
['Anna fragt Tim: «Hast du Zeit?»','Anna fragt Tim, ob er Zeit habe.',['Anna fragt Tim, ob du Zeit hast.','Anna fragt Tim, dass er Zeit habe.','Anna fragt Tim, ob er Zeit hat.'],'Eine Frage wird mit «ob» eingeleitet. «du» wird zu «er», «hast» zu «habe».',3],
['Tim sagt: «Ich bin schnell gelaufen.»','Tim sagt, er sei schnell gelaufen.',['Tim sagt, er ist schnell gelaufen.','Tim sagt, er habe schnell gelaufen.','Tim sagt, ich sei schnell gelaufen.'],'Vergangenheit mit «sein»: «sei … gelaufen».',3]
].forEach(u=>add({typ:'umform',stufe:u[4],lv:u[4]===2?2:3,cats:['sg4'],prompt:'Wie lautet die <b>indirekte Rede</b>?',sent:u[0],opts:[u[1]].concat(u[2]),answer:u[1],why:'<b>'+u[1]+'</b> '+u[3]}));
[
['Woran erkennst du die direkte Rede?',['an den Anführungszeichen','am Konjunktiv I','am Wort «dass»','am Fragewort'],'an den Anführungszeichen','Die wörtliche Rede steht in Anführungszeichen.','sg2',1],
['Woran erkennst du oft die indirekte Rede?',['am Konjunktiv I und am Fehlen der Anführungszeichen','an den Anführungszeichen','am Ausrufezeichen','am Doppelpunkt'],'am Konjunktiv I und am Fehlen der Anführungszeichen','Beispiel: Er sagte, er habe keine Zeit.','sg2',2],
['Wie lautet die Konjunktiv-I-Form von «er hat»?',['er habe','er hätte','er hat','er habe gehabt'],'er habe','Konjunktiv I: «habe».','sg3',1],
['Wie lautet die Konjunktiv-I-Form von «sie ist»?',['sie sei','sie wäre','sie ist','sie seie'],'sie sei','Konjunktiv I von «sein»: «sei».','sg3',1],
['In «Tim sagt zu Mia: «Du hast recht.»» wird «du» in der indirekten Rede zu …',['sie','du','ich','er'],'sie','Tim spricht über Mia: «Tim sagt zu Mia, sie habe recht.»','sg4',3]
].forEach(w=>add({typ:'wissen',stufe:w[5],lv:w[5]===3?3:w[5]===2?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:'<b>'+w[2]+'.</b> '+w[3]}));
task.push=_p0;
})();

GT.chapter({id:'rede',teil:'satz',nr:13,title:'Direkte und indirekte Rede',big:'Anna sagt, sie sei müde',desc:'Wörtliche Rede, Zeichensetzung und Konjunktiv I',
 ex:'«Anna sagt: «Ich bin müde.» → Anna sagt, sie <b>sei</b> müde.»',
 goals:['Ich unterscheide direkte und indirekte Rede.','Ich setze die Zeichen in der direkten Rede richtig.','Ich bilde den Konjunktiv I.','Ich forme direkte in indirekte Rede um (ab B).'],
 write:['konj'],cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{
  markieren:{icon:'👆',label:'Im Satz antippen',short:'Redebegleitsatz und wörtliche Rede finden',instr:'Tippe an.',hint:'Die wörtliche Rede steht in Anführungszeichen.',ref:'was'},
  erkenne:{icon:'🔎',label:'Direkt oder indirekt?',short:'Rede erkennen',instr:'Wähle die richtige Antwort.',hint:'Anführungszeichen? Konjunktiv I?',ref:'was'},
  zeichen:{icon:'✏️',label:'Zeichensetzung',short:'Anführungszeichen, Komma, Doppelpunkt',instr:'Welcher Satz ist richtig?',hint:'Wo steht der Redebegleitsatz?',ref:'zeichen'},
  konj:{icon:'🔤',winstr:'Schreibe die passende Form des Konjunktivs I.',label:'Konjunktiv I',short:'Die richtige Form wählen',instr:'Welche Form passt?',hint:'Stamm des Infinitivs + e.',ref:'konj'},
  ersatz:{icon:'🔁',label:'Ersatzform',short:'Wenn Konjunktiv I und Indikativ gleich sind',instr:'Welche Form ist richtig?',hint:'Ist die Form gleich wie im Indikativ? Dann Ersatzform.',ref:'ersatz'},
  umform:{icon:'🔄',label:'Indirekte Rede bilden',short:'Aus direkter Rede wird indirekte',instr:'Wie lautet die indirekte Rede?',hint:'Pronomen, Verb und Einleitung anpassen.',ref:'indirekt'},
  wissen:{label:'Wissen',short:'Begriffe und Regeln',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'was'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Ein kleiner Tippfehler ist nicht schlimm.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
