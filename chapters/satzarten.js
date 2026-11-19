/* Kapitel Satzlehre 4: Satzarten. */
(function(){
'use strict';
const GT=window.GT,mk=GT.mk,tryW=GT.tryW,T=GT.table;
const C={sg1:'Satzarten bestimmen',sg2:'Satzzeichen',sg3:'Sätze umformen'};
const task=[];
const Z=['Aussagesatz','Fragesatz','Aufforderungssatz','Ausrufesatz'];

/* Satzart bestimmen */
const Q=[
['Der Hund bellt laut.',0,1,'Er teilt etwas mit: Aussagesatz.'],
['Kommst du morgen mit?',1,1,'Er fragt etwas: Fragesatz.'],
['Komm bitte her!',2,1,'Er fordert auf: Aufforderungssatz.'],
['Wie schön das ist!',3,1,'Er drückt ein Gefühl aus: Ausrufesatz.'],
['Anna liest ein Buch.',0,1,'Aussagesatz.'],
['Wo wohnst du?',1,1,'Fragesatz mit Fragewort.'],
['Mach bitte das Fenster zu!',2,1,'Aufforderungssatz.'],
['Hilfe!',3,1,'Ausrufesatz.'],
['Heute ist es kalt.',0,1,'Aussagesatz.'],
['Hast du Hunger?',1,1,'Fragesatz (Ja/Nein-Frage).'],
['Bleib ruhig!',2,1,'Aufforderungssatz.'],
['Das ist ja toll!',3,2,'Ausrufesatz: drückt Begeisterung aus.'],
['Wann beginnt die Schule?',1,2,'Fragesatz mit Fragewort.'],
['Gib mir bitte das Salz.',2,2,'Aufforderungssatz; er kann mit Punkt oder Ausrufezeichen enden.'],
['Wir fahren morgen nach Bern.',0,2,'Aussagesatz.'],
['Warum bist du so spät?',1,2,'Fragesatz mit Fragewort.'],
['Setzt euch bitte hin.',2,2,'Aufforderungssatz.'],
['Das ist unglaublich!',3,2,'Ausrufesatz.'],
['Der Zug fährt um acht Uhr ab.',0,2,'Aussagesatz.'],
['Ob er wohl kommt?',1,3,'Fragesatz.'],
['Würdest du mir bitte helfen?',1,3,'Höfliche Aufforderung in Fragenform: Fragesatz.'],
['Ich möchte, dass du mir hilfst.',0,3,'Aussagesatz (mit Nebensatz).']
];
Q.forEach(q=>task.push({typ:'satzart',stufe:q[2],lv:q[2]===3?2:1,cats:['sg1'],sent:'«'+q[0]+'»',opts:Z,answer:Z[q[1]],why:'<b>'+Z[q[1]]+'.</b> '+q[3]}));

/* Satzzeichen */
const S=[
['Der Hund bellt___',['.','?','!',','],'.','Aussagesatz: Punkt.',1],
['Kommst du morgen___',['?','.','!',','],'?','Fragesatz: Fragezeichen.',1],
['Komm bitte her___',['!','.','?',','],'!','Aufforderung: Ausrufezeichen (oder Punkt bei freundlichem Ton).',1],
['Wie schön das ist___',['!','.','?',','],'!','Ausruf: Ausrufezeichen.',1],
['Wo wohnst du___',['?','.','!',','],'?','Fragesatz: Fragezeichen.',1],
['Heute ist es kalt___',['.','?','!',','],'.','Aussagesatz: Punkt.',1],
['Hilfe___',['!','.','?',','],'!','Ausruf: Ausrufezeichen.',1],
['Hast du Hunger___',['?','.','!',','],'?','Ja/Nein-Frage: Fragezeichen.',1],
['Ich frage mich, ob er kommt___',['.','?','!',','],'.','Es ist eine Aussage (indirekte Frage): Punkt.',2],
['Er fragte: «Kommst du mit___» ',['?','.','!',','],'?','Die direkte Frage endet mit einem Fragezeichen.',3]
];
S.forEach(s=>task.push({typ:'zeichen',stufe:s[4],lv:s[4]===3?2:1,cats:['sg2'],sent:s[0].replace('___','<span class="gap">__</span>'),opts:s[1],answer:s[2],why:'<b>'+s[2]+'</b> '+s[3]}));

/* Wissen */
const W=[
['Wie unterscheidet man einen <b>Aussagesatz</b>?',['Er teilt etwas mit und endet mit einem Punkt.','Er fragt etwas.','Er fordert auf.','Er endet mit einem Fragezeichen.'],'Er teilt etwas mit und endet mit einem Punkt.','Aussagesatz: Punkt.','sg1',1],
['Was ist eine <b>Ja-/Nein-Frage</b>?',['Das Verb steht am Satzanfang.','Das Verb steht am Satzende.','Es beginnt mit «Wer».','Sie endet mit einem Punkt.'],'Das Verb steht am Satzanfang.','«Kommst du mit?»','sg1',1],
['Was ist eine <b>Ergänzungsfrage</b>?',['Sie beginnt mit einem Fragewort.','Sie beginnt mit dem Verb.','Sie endet mit Punkt.','Sie braucht kein Verb.'],'Sie beginnt mit einem Fragewort.','«Wo wohnst du?»','sg1',2],
['Wie lautet die Satzart von «Komm!»?',['Aufforderungssatz','Aussagesatz','Fragesatz','Ausrufesatz'],'Aufforderungssatz','Ein Befehl oder Wunsch.','sg1',1],
['Wo steht das Verb in einer <b>Aufforderung</b>?',['am Satzanfang','an zweiter Stelle','am Satzende','überall'],'am Satzanfang','«<b>Komm</b> her!»','sg3',2],
['Aus «Du kommst morgen.» wird eine Frage:',['Kommst du morgen?','Du kommst morgen?','Morgen du kommst?','Du morgen kommst?'],'Kommst du morgen?','Verb und Subjekt tauschen.','sg3',1],
['Aus «Er hilft dir.» wird eine Frage:',['Hilft er dir?','Er hilft dir?','Hilft dir er?','Er dir hilft?'],'Hilft er dir?','Verb an den Satzanfang.','sg3',1],
['Aus «Du machst das Fenster zu.» wird eine Aufforderung:',['Mach das Fenster zu!','Du mach das Fenster zu!','Machst du das Fenster zu!','Zu mach das Fenster!'],'Mach das Fenster zu!','Befehlsform des Verbs ohne «du».','sg3',2],
['Aus «Das Wetter ist schön.» wird ein Ausruf:',['Wie schön das Wetter ist!','Wie das Wetter ist schön?','Ist das Wetter schön.','Das Wetter schön!'],'Wie schön das Wetter ist!','Ausruf mit «Wie …!»','sg3',2],
['Welcher Satz ist eine <b>höfliche Aufforderung</b>?',['Könnten Sie mir bitte helfen?','Hilf mir!','Ich brauche Hilfe.','Warum hilfst du nicht?'],'Könnten Sie mir bitte helfen?','Höfliche Bitte in Frageform.','sg1',3]
];
W.forEach(w=>task.push({typ:'wissen',stufe:w[5],lv:w[5]===3?2:1,cats:[w[4]],prompt:w[0],opts:w[1],answer:w[2],why:w[3]}));


/* INPUT-AUFGABEN (selber schreiben) */
const INP=[["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Tim kommt morgen.", "Kommt Tim morgen?", [], false, "So wird daraus ein Fragesatz: «Kommt Tim morgen?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Du hilfst mir.", "Hilfst du mir?", [], false, "So wird daraus ein Fragesatz: «Hilfst du mir?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Sie spielt Klavier.", "Spielt sie Klavier?", [], false, "So wird daraus ein Fragesatz: «Spielt sie Klavier?»"], ["umformen", 1, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Ihr habt Hunger.", "Habt ihr Hunger?", [], false, "So wird daraus ein Fragesatz: «Habt ihr Hunger?»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Fragesatz um.", "Wir gehen ins Kino.", "Gehen wir ins Kino?", [], false, "So wird daraus ein Fragesatz: «Gehen wir ins Kino?»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du räumst dein Zimmer auf.", "Räum dein Zimmer auf!", ["Räume dein Zimmer auf!"], false, "So wird daraus ein Aufforderungssatz: «Räum dein Zimmer auf!»"], ["umformen", 2, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du machst die Hausaufgaben.", "Mach die Hausaufgaben!", ["Mache die Hausaufgaben!"], false, "So wird daraus ein Aufforderungssatz: «Mach die Hausaufgaben!»"], ["umformen", 3, "sg3", "Forme den Aussagesatz in einen Aufforderungssatz um.", "Du bist leise.", "Sei leise!", [], false, "So wird daraus ein Aufforderungssatz: «Sei leise!»"]];
INP.forEach(r=>task.push({typ:r[0],stufe:r[1],lv:r[1]===3?2:1,cats:[r[2]],input:true,prompt:r[3],sent:r[4],answer:r[5],accept:r[6]||[],strict:!!r[7],why:'<b>'+r[5]+'</b> '+r[8]}));

const SECS=[
{id:'arten',title:'Die vier Satzarten',short:'Satzarten',min:10,note:'Satzzeichen immer mitnennen. Die Satzart bestimmt Verbstellung und Satzzeichen.',
 html:()=>T(['Satzart','Aufgabe','Satzzeichen','Beispiel'],[['Aussagesatz','etwas mitteilen','.','Der Hund bellt.'],['Fragesatz','etwas fragen','?','Kommst du mit?'],['Aufforderungssatz','etwas verlangen','! oder .','Komm her!'],['Ausrufesatz','ein Gefühl ausdrücken','!','Wie schön das ist!']])},
{id:'frage',title:'Fragesätze',short:'Fragesätze',min:8,note:'Ja/Nein-Frage: Verb an erster Stelle. Ergänzungsfrage: Fragewort + Verb an zweiter Stelle.',
 html:()=>'<div class="grid2"><div class="card"><h3>Ja-/Nein-Frage</h3><p>Das Verb steht <b>vorne</b>.</p><p><b>Kommst</b> du morgen? – Ja. / Nein.</p></div>'+
 '<div class="card"><h3>Ergänzungsfrage</h3><p>Sie beginnt mit einem <b>Fragewort</b> (wer, was, wo, wann, wie, warum).</p><p><b>Wo</b> wohnst du?</p></div></div>'},
{id:'umformen',title:'Sätze umformen',short:'Umformen',min:8,note:'Aus Aussage wird Frage: Verb und Subjekt tauschen. Aus Aussage wird Aufforderung: Befehlsform.',
 html:()=>T(['Aussage','Frage','Aufforderung'],[['Du kommst her.','Kommst du her?','Komm her!'],['Er hilft mir.','Hilft er mir?','Hilf mir!'],['Du machst das Fenster zu.','Machst du das Fenster zu?','Mach das Fenster zu!']])},
{id:'hoeflich',title:'Höfliche Aufforderungen',short:'Höflichkeit',lv:2,min:6,note:'Ab Niveau B. Höfliche Bitten mit «könnten, würden, bitte».',
 html:()=>'<div class="card"><p>Direkt: <b>Hilf mir!</b></p><p>Höflich: <b>Könntest du mir bitte helfen?</b> · <b>Würden Sie mir bitte helfen?</b></p><p class="muted">Höfliche Aufforderungen haben oft die Form einer Frage.</p></div>'},
{id:'stolper',title:'Stolpersteine',short:'Stolpersteine',min:6,note:'Typische Fehler: Satzzeichen, indirekte Fragen, Aufforderung mit Punkt.',
 html:()=>'<div class="grid3">'+[
  ['1 · Indirekte Frage','«Ich frage mich, ob er kommt<b>.</b>»','Keine direkte Frage: Punkt statt Fragezeichen.'],
  ['2 · Aufforderung mit Punkt','«Gib mir bitte das Salz<b>.</b>»','Wenn der Ton freundlich ist, reicht der Punkt.'],
  ['3 · Fragewort oder Verb vorne','«Wo wohnst du?» / «Wohnst du hier?»','Beide sind Fragesätze.'],
  ['4 · Ausruf ≠ Aufforderung','«Wie schön!» (Ausruf) / «Komm!» (Aufforderung)','Ausruf: Gefühl. Aufforderung: Anweisung.'],
  ['5 · Verb an Position 1','«Kommst du?»','Ja-/Nein-Frage: Verb zuerst.'],
  ['6 · Doppeltes Zeichen','«Was?!»','In der Schule genügt ein Zeichen.']
 ].map(x=>'<div class="card stone"><b>'+x[0]+'</b><p style="margin:.2rem 0">'+x[1]+'</p><p class="muted" style="margin:.2rem 0 0;font-size:.9rem">'+x[2]+'</p></div>').join('')+'</div>'+tryW('satzart,zeichen')}
];
const EX=[
 ['Bestimme die Satzart: «Das Wetter ist schön.»','Aussagesatz',1],
 ['Bestimme die Satzart: «Kommst du mit?»','Fragesatz',1],
 ['Bestimme die Satzart: «Sei bitte leise!»','Aufforderungssatz',1],
 ['Forme in eine Frage um: «Er spielt Fussball.»','Spielt er Fussball?',1],
 ['Forme in eine Aufforderung um: «Du schreibst deinen Namen.»','Schreib deinen Namen!',1],
 ['Schreibe einen Ausrufesatz zum Wetter.','Beispiel: Wie schön das Wetter heute ist!',2],
 ['Schreibe eine höfliche Aufforderung an die Lehrerin.','Beispiel: Könnten Sie mir bitte helfen?',2]
];
const merk=()=>T(['Satzart','Satzzeichen','Beispiel'],[['Aussagesatz','.','Der Hund bellt.'],['Fragesatz','?','Kommst du mit?'],['Aufforderungssatz','! oder .','Komm her!'],['Ausrufesatz','!','Wie schön das ist!']])+
 '<ul><li>Ja-/Nein-Frage: Verb an erster Stelle.</li><li>Ergänzungsfrage: Fragewort + Verb an zweiter Stelle.</li><li>Aufforderung: Befehlsform, Verb vorne.</li></ul>';
GT.chapter({id:'satzarten',teil:'satz',nr:4,title:'Satzarten',big:'Aussage, Frage, Aufforderung, Ausruf',desc:'Sätze nach ihrer Aufgabe unterscheiden',
 ex:'«Kommst du mit?» · «Komm mit!» · «Wie schön!»',
 goals:['Ich unterscheide Aussage-, Frage-, Aufforderungs- und Ausrufesätze.','Ich setze das richtige Satzzeichen.','Ich forme Sätze um.'],
 cats:C,catTitle:'Welche Themen?',catWord:'Thema',
 types:{satzart:{label:'Satzart bestimmen',short:'Aussage, Frage, Aufforderung, Ausruf',instr:'Welche Satzart ist es?',hint:'Was will der Satz? Mitteilen, fragen, auffordern oder ein Gefühl zeigen?',ref:'arten'},
  zeichen:{label:'Satzzeichen',short:'. ? !',instr:'Welches Satzzeichen passt?',hint:'Satzart bestimmen, dann das passende Zeichen wählen.',ref:'arten'},
  umformen:{icon:'🔁',label:'Sätze umformen',short:'Aussagen zu Fragen und Aufforderungen machen',instr:'Schreibe den umgeformten Satz.',hint:'Frage: Das Prädikat steht an erster Stelle. Aufforderung: ohne «du».',ref:'umformen'},
  wissen:{label:'Wissen und Umformen',short:'Fragen und Aufforderungen bilden',instr:'Wähle die richtige Antwort.',hint:'Schau in der Theorie nach.',ref:'umformen'}},
 sections:SECS,tasks:task,exercises:EX,merk});
})();
