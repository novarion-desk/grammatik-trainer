/* Kapitel Satzlehre 2: Die Verschiebeprobe. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const task=[];
const C={sg1:'Satzglieder trennen',sg2:'Zählen und Umstellen',sg3:'Fachbegriffe'};
/* Verschiebeprobe */
const V=[
['Welche Umstellung ist richtig? «Der Hund bellt laut.»',['Laut bellt der Hund.','Bellt laut Hund der.','Der bellt Hund laut.','Hund der laut bellt.'],'Laut bellt der Hund.','Ganze Satzglieder verschieben: «Der Hund» bleibt zusammen.','sg1',1],
['Welche Umstellung ist richtig? «Anna liest ein Buch.»',['Ein Buch liest Anna.','Liest ein Anna Buch.','Anna ein liest Buch.','Buch ein Anna liest.'],'Ein Buch liest Anna.','«ein Buch» ist ein Satzglied.','sg1',1],
['Wie viele Satzglieder hat «Heute spielt der Hund im Garten.»?',['4','3','5','2'],'4','Heute · spielt · der Hund · im Garten.','sg1',1],
['Wie viele Satzglieder hat «Der kleine Junge liest ein spannendes Buch.»?',['3','4','5','2'],'3','Der kleine Junge · liest · ein spannendes Buch.','sg1',1],
['Wie viele Satzglieder hat «Wir fahren morgen mit dem Zug nach Bern.»?',['5','4','6','3'],'5','Wir · fahren · morgen · mit dem Zug · nach Bern.','sg1',2],
['Welches Wort bleibt beim Verschieben <b>immer an zweiter Stelle</b>?',['die Personalform des Verbs','das Subjekt','das Objekt','die Adverbiale'],'die Personalform des Verbs','Im Aussagesatz steht die Personalform an Position 2.','sg1',1],
['Welches ist ein <b>Satzglied</b>?',['der kleine Hund','der kleine','kleine Hund','Hund der'],'der kleine Hund','Beim Verschieben bleibt die ganze Gruppe zusammen.','sg1',1],
['Wozu dient die Verschiebeprobe?',['um Satzglieder zu finden','um Wörter zu zählen','um die Zeit zu bestimmen','um Nomen zu finden'],'um Satzglieder zu finden','Was zusammen verschoben wird, ist ein Satzglied.','sg1',1],
['Welche Umstellung ist <b>falsch</b>? «Gestern habe ich den Film gesehen.»',['Gestern ich habe den Film gesehen.','Ich habe gestern den Film gesehen.','Den Film habe ich gestern gesehen.','Gesehen habe ich gestern den Film.'],'Gestern ich habe den Film gesehen.','Das Verb muss an zweiter Stelle bleiben.','sg1',2],
['Wie viele Satzglieder hat «Ich habe gestern den Film gesehen.»?',['4','5','3','6'],'4','Ich · habe … gesehen · gestern · den Film.','sg1',3]
];
V.forEach(v=>task.push({typ:'probe',stufe:v[5],lv:v[5]===3?2:1,cats:[v[4]],prompt:v[0],opts:v[1],answer:v[2],why:v[3]}));
/* ---- NEU: Wissensfragen ---- */
const F2=[
['Mit welcher Frage findest du das <b>Genitivobjekt</b>?',['Wessen?','Wem?','Wen oder was?','Wer oder was?'],'Wessen?','Genitivobjekt: Wessen? (kommt selten vor).','sg3',2],
['Woran erkennst du ein <b>Präpositionalgefüge</b>?',['Es beginnt mit einer Präposition.','Es steht immer am Satzanfang.','Es besteht aus einem einzigen Wort.','Es steht im Nominativ.'],'Es beginnt mit einer Präposition.','Präposition (z. B. in, auf, mit, für) plus die Wörter, die dazugehören: auf dem Pausenplatz.','sg4',1],
['Welches ist ein <b>Präpositionalgefüge</b>?',['mit dem Fahrrad','das Fahrrad','gestern','fahren'],'mit dem Fahrrad','Es beginnt mit der Präposition «mit».','sg4',1],
['Welches ist ein <b>Präpositionalgefüge</b>?',['in der Pause','die Pause','heute','spielen'],'in der Pause','Es beginnt mit der Präposition «in».','sg4',1],
['Welches Wort ist eine <b>Präposition</b>?',['auf','Haus','laufen','schön'],'auf','Präpositionen: in, auf, mit, für, nach, von, zu, bei, aus …','sg4',1],
['Was leistet ein Präpositionalgefüge im Satz?',['Es wird vom Verb verlangt oder sagt etwas über Ort, Zeit oder Art.','Es ersetzt das Subjekt.','Es ist immer das Prädikat.','Es steht immer im Nominativ.'],'Es wird vom Verb verlangt oder sagt etwas über Ort, Zeit oder Art.','Beispiele: sich freuen auf die Ferien (vom Verb verlangt), in der Pause (Zeit).','sg4',2],
['Das <b>Subjekt</b> steht immer im …',['Nominativ','Genitiv','Dativ','Akkusativ'],'Nominativ','Subjekt: Wer oder was? Nominativ.','sg2',1],
['Ein <b>Objekt</b> steht nie im …',['Nominativ','Genitiv','Dativ','Akkusativ'],'Nominativ','Objekte stehen im Akkusativ, Dativ oder Genitiv.','sg3',1],
['Das Subjekt steht immer an erster Stelle im Satz.',['Falsch','Richtig','Nur im Fragesatz','Nur bei Verben'],'Falsch','Es kann auch später stehen: «Heute schreibt <b>die Klasse</b> einen Test.»','sg2',1],
['An welcher Stelle steht das Prädikat (die Personalform) im Aussagesatz?',['an zweiter Stelle','an erster Stelle','am Schluss','an dritter Stelle'],'an zweiter Stelle','Die Personalform bleibt im Hauptsatz immer an zweiter Stelle.','sg1',1],
['Was bedeutet das Kürzel <b>AO</b>?',['Akkusativobjekt','Adverbiale Ortsangabe','Attribut-Objekt','Aussageobjekt'],'Akkusativobjekt','AO = Akkusativobjekt (Wen oder was?).','sg3',1],
['Was bedeutet das Kürzel <b>DO</b>?',['Dativobjekt','Direktes Objekt','Doppelobjekt','Dativ-Ort'],'Dativobjekt','DO = Dativobjekt (Wem?).','sg3',1],
['Was kann ein Satz mindestens enthalten?',['Subjekt und Prädikat','nur ein Objekt','nur ein Attribut','nur ein Präpositionalgefüge'],'Subjekt und Prädikat','Jeder einfache Satz hat mindestens ein Subjekt und ein Prädikat.','sg2',1],
['Aus wie vielen Satzgliedern besteht das Prädikat «hat … gesehen»?',['eines','zwei','keines','drei'],'eines','Alle verbalen Teile zusammen sind <b>ein</b> Satzglied: das Prädikat.','sg2',2],
['Beim Verschieben bleibt das <b>Attribut</b> …',['beim Nomen, zu dem es gehört','allein stehen','am Satzanfang','beim Verb'],'beim Nomen, zu dem es gehört','Das Attribut ist kein eigenes Satzglied. Es ist ein Teil eines Satzglieds.','sg5',2],
['Mit welcher Frage findest du das <b>Attribut</b>?',['Was für ein …?','Wer oder was?','Wem?','Wo?'],'Was für ein …?','«Was für ein Hund?» – der <b>freche</b> Hund.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Der freche Hund bellt.»',['Der und freche','Hund und bellt','nur freche','nur Hund'],'Der und freche','Beide sind dem Nomen «Hund» beigefügt: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Wir lesen ein spannendes Buch.»',['ein und spannendes','lesen und Buch','nur spannendes','Wir und ein'],'ein und spannendes','Beide gehören zum Nomen «Buch»: der Artikel und das Adjektiv.','sg5',1],
['Welche Wörter sind <b>Attribute</b>? «Die jungen Schülerinnen lachen.»',['Die und jungen','Schülerinnen und lachen','nur jungen','Die und lachen'],'Die und jungen','Zum Kern «Schülerinnen» gehören Artikel und Adjektiv.','sg5',2],
['Ein Satzglied besteht aus einem Kern und …',['Attributen (Beifügungen)','nur Verben','Satzzeichen','einem Nebensatz'],'Attributen (Beifügungen)','Kern: oft ein Nomen. Dazu kommen Attribute.','sg5',2],
['Welcher Satz ist die richtige Umstellung? «Ich habe gestern einen Film gesehen.»',['Gestern habe ich einen Film gesehen.','Gestern ich habe einen Film gesehen.','Habe ich gestern einen Film gesehen.','Einen Film gestern habe ich gesehen.'],'Gestern habe ich einen Film gesehen.','Die Personalform «habe» bleibt an zweiter Stelle.','sg1',2],
['Wie viele Satzglieder hat «Die neue Lehrerin erklärt den Schülern die Aufgabe.»?',['4','3','5','6'],'4','Die neue Lehrerin · erklärt · den Schülern · die Aufgabe.','sg1',2],
['Wie viele Satzglieder hat «Nach der Pause schreibt die Klasse einen Test.»?',['4','3','5','6'],'4','Nach der Pause · schreibt · die Klasse · einen Test.','sg1',2],
['Wie viele Satzglieder hat «Leider hat der Bus heute Verspätung.»?',['5','4','3','6'],'5','Leider · hat · der Bus · heute · Verspätung.','sg1',2],
['Wie viele Satzglieder hat «Ich habe mein Handy zu Hause vergessen.»?',['4','5','3','6'],'4','Ich · habe … vergessen · mein Handy · zu Hause.','sg1',2]
];
F2.forEach(f=>task.push({typ:'frage',stufe:f[5],lv:f[5]===3?2:1,cats:[f[4]],prompt:f[0],opts:f[1],answer:f[2],why:f[3]}));
/* ---- NEU: Satzglieder trennen (zwischen zwei Wörtern antippen) ---- */
const TR=[
['Anna | liest | ein Buch .',1,''],
['Der Hund | bellt | laut .',1,''],
['Gestern | spielte | der kleine Junge | Fussball .',1,''],
['Die Klasse | wartet | auf den Bus .',1,''],
['Meine Schwester | schenkt | mir | heute | ein Buch .',2,''],
['Nach der Pause | schreibt | die Klasse | einen Test .',2,''],
['Wir | treffen | uns | am Freitag | im Schwimmbad .',2,''],
['Der Lehrer | erklärt | den Schülern | die Aufgabe .',2,''],
['Leider | hat | der Bus | heute | Verspätung .',2,''],
['Mein Bruder | hat | gestern | sein Handy | verloren .',2,' «hat» und «verloren» gehören beide zum Prädikat.'],
['Die neue Schülerin | zeigt | dem Lehrer | ihre Hausaufgaben .',3,''],
['Der Bus | fährt | heute | wegen des Schnees | früher | ab .',3,' «fährt» und «ab» gehören beide zum Prädikat.'],
['Am Montag | hat | unsere Klasse | im Turnen | einen Wettkampf | gewonnen .',3,' «hat» und «gewonnen» gehören beide zum Prädikat.']
];
TR.forEach(t=>{
  const words=[],cuts=[];
  t[0].split(' ').forEach(w=>{if(w==='|'){cuts.push(words.length-1);}else if(w!=='.'){words.push(w);}});
  task.push({typ:'trenn',stufe:t[1],lv:t[1]===3?2:1,cats:['sg1'],tokens:words,cuts,instr:'Tippe zwischen zwei Wörter, wo eine Satzgliedgrenze liegt.',why:'Die Satzglieder: '+t[0].replace(' .','.')+t[2]});
});

/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Gestern».", "Tim spielt gestern Fussball.", "Gestern spielt Tim Fussball.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Gestern spielt Tim Fussball.»"], ["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Im Garten».", "Lena liest ein Buch im Garten.", "Im Garten liest Lena ein Buch.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Im Garten liest Lena ein Buch.»"], ["umstellen", 1, "sg1", "Stelle den Satz um. Beginne mit «Heute».", "Ich esse heute Pizza.", "Heute esse ich Pizza.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Heute esse ich Pizza.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Im Sommer».", "Wir fahren im Sommer nach Italien.", "Im Sommer fahren wir nach Italien.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Im Sommer fahren wir nach Italien.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Am Montag».", "Die Schüler schreiben am Montag einen Test.", "Am Montag schreiben die Schüler einen Test.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Am Montag schreiben die Schüler einen Test.»"], ["umstellen", 2, "sg1", "Stelle den Satz um. Beginne mit «Seit einer Stunde».", "Sie wartet seit einer Stunde auf den Bus.", "Seit einer Stunde wartet sie auf den Bus.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Seit einer Stunde wartet sie auf den Bus.»"], ["umstellen", 3, "sg1", "Stelle den Satz um. Beginne mit «Gestern».", "Er hat gestern seinen Freund besucht.", "Gestern hat er seinen Freund besucht.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Gestern hat er seinen Freund besucht.»"], ["umstellen", 3, "sg1", "Stelle den Satz um. Beginne mit «Nach der Schule».", "Wir gehen nach der Schule ins Kino.", "Nach der Schule gehen wir ins Kino.", [], false, "Das Prädikat bleibt an zweiter Stelle: «Nach der Schule gehen wir ins Kino.»"]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));
const INP2=[
["umstellen",1,"sg1","Stelle den Satz um. Beginne mit «Nach der Pause».","Die Klasse schreibt nach der Pause einen Test.","Nach der Pause schreibt die Klasse einen Test.",[],false,"Das Prädikat bleibt an zweiter Stelle: «Nach der Pause» ist ein Satzglied."],
["umstellen",1,"sg1","Stelle den Satz um. Beginne mit «Heute».","Wir schreiben einen Test heute.","Heute schreiben wir einen Test.",[],false,"Das Prädikat bleibt an zweiter Stelle."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Dem Lehrer».","Die Schülerin zeigt dem Lehrer ihre Hausaufgaben.","Dem Lehrer zeigt die Schülerin ihre Hausaufgaben.",[],false,"«Dem Lehrer» ist ein Satzglied. Das Prädikat bleibt an zweiter Stelle."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Auf den Bus».","Die Klasse wartet auf den Bus.","Auf den Bus wartet die Klasse.",[],false,"«Auf den Bus» bleibt zusammen: ein Präpositionalgefüge."],
["umstellen",2,"sg1","Stelle den Satz um. Beginne mit «Gestern».","Ich habe gestern mein Handy verloren.","Gestern habe ich mein Handy verloren.",[],false,"Die Personalform «habe» bleibt an zweiter Stelle. «verloren» bleibt am Schluss."],
["fach",1,"sg6","Wie heisst das Verfahren zur Ermittlung der Satzglieder?","Das Verfahren heisst …","Verschiebeprobe",["Umstellprobe"],true,"Mit der Verschiebeprobe findest du die Satzglieder."],
["fach",1,"sg6","Das Subjekt steht immer im … (Fall).","Das Subjekt steht immer im …","Nominativ",[],true,"Subjekt: Wer oder was? Nominativ."],
["fach",1,"sg6","Ein Objekt steht nie im … (Fall).","Ein Objekt steht nie im …","Nominativ",[],true,"Objekte stehen im Akkusativ, Dativ oder Genitiv."],
["fach",1,"sg6","Satzglied, das mit einer Präposition beginnt (am Freitag, auf dem Pausenplatz).","Das Satzglied heisst …","Präpositionalgefüge",[],true,"Präposition und die Wörter, die dazugehören."],
["fach",1,"sg6","Wie heisst das Satzglied, das nach «Wen oder was?» fragt?","Das Satzglied heisst …","Akkusativobjekt",[],true,"Wen oder was? Akkusativobjekt, kurz AO."],
["fach",1,"sg6","Wie heisst das Satzglied, das nach «Wem?» fragt?","Das Satzglied heisst …","Dativobjekt",[],true,"Wem? Dativobjekt, kurz DO."],
["fach",2,"sg6","Wie heisst das Satzglied, das nach «Wessen?» fragt?","Das Satzglied heisst …","Genitivobjekt",[],true,"Wessen? Genitivobjekt (selten)."],
["fach",2,"sg6","Eine Beifügung zu einem Nomen (Was für ein …?) heisst …","Die Beifügung heisst …","Attribut",["Das Attribut"],true,"«Attribut» kommt vom lateinischen «attribuere» = beifügen."],
["fach",2,"sg6","Alle Teile des Verbs im Satz zusammen heissen …","Die verbalen Teile bilden das …","Prädikat",["Das Prädikat"],true,"Alle Teile, die zum Verb gehören: das Prädikat."],
["fach",2,"sg6","Wie heisst das Satzglied, das fragt «Wer oder was?»","Das Satzglied heisst …","Subjekt",["Das Subjekt"],true,"Wer oder was tut etwas? Das Subjekt."],
["fach",2,"sg6","An welcher Stelle steht die Personalform im Aussagesatz? (Schreibe: zweiter)","Die Personalform steht an … Stelle.","zweiter",["zweiten","2."],true,"Im Hauptsatz steht die Personalform an zweiter Stelle."]
];
INP2.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

/* Auswahl: nur Aufgaben zur Verschiebeprobe */
for(let i=task.length-1;i>=0;i--){const t=task[i];
  if(t.typ==='frage'){if(t.cats[0]==='sg1'){t.typ='probe';}else{task.splice(i,1);continue;}}
  if(t.typ==='fach'&&t.answer!=='Verschiebeprobe'){task.splice(i,1);continue;}
  if(t.typ==='fach')t.cats=['sg3'];
  else if(t.typ==='trenn')t.cats=['sg1'];
  else t.cats=['sg2'];
}
/* Weitere Aufgaben zum Trennen */
const TR2=[
['Tim | spielt | Fussball .',1,''],
['Die Lehrerin | lacht | laut .',1,''],
['Mia | trinkt | heute | Tee .',1,''],
['Der kleine Hund | frisst | den Knochen .',1,''],
['Im Garten | blühen | die Rosen .',1,''],
['Die Schüler | schreiben | morgen | einen Test .',2,''],
['Mein Vater | repariert | am Samstag | das Fahrrad .',2,''],
['Anna | gibt | ihrem Bruder | das Buch .',2,''],
['Nach dem Training | duschen | die Spieler | schnell .',2,''],
['Das neue Handy | gefällt | meiner Schwester | sehr .',2,''],
['Gestern Abend | hat | die Familie | im Wohnzimmer | einen Film | geschaut .',3,' «hat» und «geschaut» gehören beide zum Verb.'],
['Am Freitag | lädt | meine Mutter | die Nachbarn | zum Essen | ein .',3,' «lädt» und «ein» gehören beide zum Verb.']
];
TR2.forEach(t=>{const words=[],cuts=[];
  t[0].split(' ').forEach(w=>{if(w==='|'){cuts.push(words.length-1);}else if(w!=='.'){words.push(w);}});
  task.push({typ:'trenn',stufe:t[1],lv:t[1]===3?2:1,cats:['sg1'],tokens:words,cuts,instr:'Tippe zwischen zwei Wörter, wo eine Satzgliedgrenze liegt.',why:'Die Satzglieder: '+t[0].replace(' .','.')+t[2]});});
/* Weitere Aufgaben zum Zählen */
[
['Wie viele Satzglieder hat «Anna lacht.»?',['2','1','3','4'],'2','Anna · lacht.',1],
['Wie viele Satzglieder hat «Tim spielt heute Fussball.»?',['4','3','5','2'],'4','Tim · spielt · heute · Fussball.',1],
['Wie viele Satzglieder hat «Die Lehrerin erklärt der Klasse die Aufgabe.»?',['4','3','5','6'],'4','Die Lehrerin · erklärt · der Klasse · die Aufgabe.',1],
['Wie viele Satzglieder hat «Der freche kleine Hund bellt laut.»?',['3','4','5','6'],'3','Der freche kleine Hund · bellt · laut.',2],
['Wie viele Satzglieder hat «Am Montag schreibt die ganze Klasse einen Test.»?',['4','5','3','6'],'4','Am Montag · schreibt · die ganze Klasse · einen Test.',2],
['Wie viele Satzglieder hat «Mein Bruder hat gestern sein Handy verloren.»?',['4','5','3','6'],'4','Mein Bruder · hat … verloren · gestern · sein Handy. Die beiden Verbteile zählen als ein Satzglied.',3],
['Warum ist «hat … verloren» nur ein Satzglied?',['Beide Teile gehören zum Verb und bilden zusammen ein Glied.','Weil «hat» ein Hilfswort ist.','Weil zwei Wörter immer ein Glied sind.','Weil «verloren» nicht verschoben werden kann.'],'Beide Teile gehören zum Verb und bilden zusammen ein Glied.','Alle Teile des Verbs gehören zusammen und zählen als ein Satzglied.',3],
['Was bleibt beim Verschieben zusammen?',['ein Satzglied','ein einzelnes Wort','ein Nebensatz','ein Satzzeichen'],'ein Satzglied','Satzglieder bleiben beim Umstellen zusammen.',1],
['Was darf man beim Umstellen <b>nicht</b> auseinanderreissen?',['die Wörter eines Satzglieds','das Satzzeichen','Anfangsbuchstaben','die Reihenfolge der Seiten'],'die Wörter eines Satzglieds','«Der kleine Hund» bleibt zusammen.',1]
].forEach(v=>task.push({typ:'probe',stufe:v[4],lv:v[4]===3?2:1,cats:['sg2'],prompt:v[0],opts:v[1],answer:v[2],why:v[3]}));
[
["fach",1,"sg3","Wort oder Wortgruppe, die beim Umstellen zusammenbleibt.","Das ist ein …","Satzglied",["Das Satzglied","Ein Satzglied"],true,"Was beim Umstellen zusammenbleibt, ist ein Satzglied."],
["fach",2,"sg3","Anderes Wort für Verschiebeprobe.","Das andere Wort heisst …","Umstellprobe",["Die Umstellprobe"],true,"Umstellprobe = Verschiebeprobe."]
].forEach(r=>task.push({typ:r[0],stufe:r[1],lv:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'.</b> '+r[8]}));

const SECS=[
{id:'probe',title:'Die Verschiebeprobe',short:'Verschiebeprobe',min:10,note:'Beispielsatz mit Kärtchen an der Wandtafel umstellen. Hier noch keine Namen der Satzglieder: Es geht nur darum, die Glieder zu finden. Das konjugierte Verb (Personalform) bleibt im Aussagesatz an zweiter Stelle.',
 html:()=>'<p class="lead">Mit der <b>Verschiebeprobe</b> (auch <b>Umstellprobe</b>) findest du die Satzglieder: Was beim Umstellen zusammenbleibt, ist <b>ein</b> Satzglied.</p>'+
 '<div class="card"><p>Der kleine Hund bellt laut.</p><p>Laut bellt der kleine Hund.</p><p>Bellt der kleine Hund laut? <span class="muted">(Frage)</span></p></div>'+
 '<div class="callout"><b>Regeln:</b> 1. Das konjugierte Verb (die Personalform) bleibt im Aussagesatz an zweiter Stelle. 2. Wörter, die zusammenbleiben, sind <b>ein</b> Satzglied. 3. Der Satz muss danach noch Sinn ergeben.</div>'},
{id:'abtrennen',title:'Satzglieder abtrennen',short:'Satzglieder abtrennen',min:10,note:'Schritt für Schritt: Satz umstellen, prüfen, was zusammenbleibt, dann senkrechte Striche zwischen die Satzglieder setzen. Zweiteilige Verben (hat … gelacht, fährt … ab) zählen als ein Satzglied, auch wenn die Teile getrennt stehen.',
 html:()=>'<p class="lead">Setze zwischen den Satzgliedern einen <b>senkrechten Strich</b>.</p>'+
 '<ol class="steps"><li>Stelle den Satz mehrmals um.</li><li>Was immer zusammenbleibt, ist ein Satzglied.</li><li>Setze zwischen die Satzglieder einen Strich.</li></ol>'+
 T(['Satz','Satzglieder'],[['Gestern spielte der kleine Junge Fussball.','Gestern | spielte | der kleine Junge | Fussball'],['Nach der Pause schreibt die Klasse einen Test.','Nach der Pause | schreibt | die Klasse | einen Test'],['Mein Bruder hat gestern sein Handy verloren.','Mein Bruder | hat | gestern | sein Handy | verloren']])+
 '<div class="callout"><b>Achtung:</b> «hat» und «verloren» gehören beide zum Verb. Zusammen zählen sie als <b>ein</b> Satzglied, auch wenn sie nicht nebeneinander stehen.</div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Typische Fehler: Satzglied zu klein abgrenzen; Verb nicht an Position 2; Satz nach dem Umstellen sinnlos.',
 html:()=>'<div class="grid3">'+[
  ['1 · Satzglied zu klein','«<b>Der kleine Hund</b>» ist ein Glied','Alles, was zusammen verschoben wird.'],
  ['2 · Verb bleibt an Position 2','«Heute <b>spielt</b> er.»','Nicht: «Heute er spielt.»'],
  ['3 · Zweiteiliges Verb','«Wir <b>haben</b> gestern <b>gelacht</b>.»','Beide Verbteile bilden zusammen ein Satzglied.'],
  ['4 · Satz muss Sinn ergeben','«Laut bellt der Hund.»','Ein Satz mit anderer Bedeutung ist keine richtige Umstellung.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0">'+x[2]+'</p></div>').join('')+'</div>'},
{id:'fachbegriffe',title:'Die Fachbegriffe im Überblick',short:'Fachbegriffe',min:4,note:'Diese Begriffe kommen in der Prüfung als Eintippaufgaben vor. Tippfehler zählen als falsch.',
 html:()=>T(['Begriff','Bedeutung'],[['Verschiebeprobe','Verfahren, um Satzglieder zu finden (auch Umstellprobe)'],['Satzglied','Wort oder Wortgruppe, die beim Umstellen zusammenbleibt'],['Personalform','konjugiertes Verb']])}
];
const EX=[
 ['Stelle den Satz zweimal um: «Der Hund bellt laut.»','Laut bellt der Hund. · Bellt der Hund laut?',1],
 ['Trenne die Satzglieder: «Gestern spielte der kleine Junge Fussball.»','Gestern | spielte | der kleine Junge | Fussball',1],
 ['Wie viele Satzglieder hat der Satz? «Heute spielt der Hund im Garten.»','4 (Heute · spielt · der Hund · im Garten)',1],
 ['Trenne die Satzglieder: «Mein Bruder hat gestern sein Handy verloren.»','Mein Bruder | hat | gestern | sein Handy | verloren (4 Satzglieder)',2],
 ['Stelle um, beginne mit «Auf den Bus»: «Die Klasse wartet auf den Bus.»','Auf den Bus wartet die Klasse.',2]
];
const merk=()=>T(['Begriff','Merksatz'],[['Verschiebeprobe','Was beim Umstellen zusammenbleibt, ist ein Satzglied.'],['Verb','Das konjugierte Verb steht im Aussagesatz an zweiter Stelle.'],['Zweiteiliges Verb','hat … gelacht zählt als ein Satzglied.'],['Abtrennen','Zwischen die Satzglieder kommt ein Strich.']]);
GT.chapter({id:'verschiebe',teil:'satz',nr:2,title:'Die Verschiebeprobe',big:'Der Hund | bellt | laut',desc:'Satzglieder durch Umstellen finden und abtrennen',
 ex:'«Der Hund | bellt | laut.»',
 goals:['Ich finde Satzglieder mit der Verschiebeprobe.','Ich trenne die Satzglieder in einem Satz ab.','Ich zähle die Satzglieder.','Ich stelle Sätze um.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{trenn:{icon:'✂️',label:'Satzglieder trennen',short:'Zwischen zwei Wörtern antippen',instr:'Tippe zwischen zwei Wörter, wo eine Satzgliedgrenze liegt.',hint:'Was beim Umstellen zusammenbleibt, ist ein Satzglied. Das Verb kann aus zwei Teilen bestehen.',ref:'abtrennen'},
  probe:{label:'Zählen und Umstellen',short:'Satzglieder zählen, richtig umstellen',instr:'Wähle die richtige Antwort.',hint:'Was beim Umstellen zusammenbleibt, ist ein Satzglied.',ref:'probe'},
  umstellen:{icon:'🔀',label:'Satz umstellen',short:'Mit einem anderen Satzglied beginnen',instr:'Schreibe den umgestellten Satz.',hint:'Das konjugierte Verb bleibt an zweiter Stelle.',ref:'probe'},
  fach:{icon:'⌨️',label:'Fachbegriffe schreiben',short:'Den Fachbegriff selber schreiben',instr:'Schreibe den Fachbegriff. Tippfehler zählen.',hint:'Schau im Überblick der Fachbegriffe nach.',ref:'fachbegriffe'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
