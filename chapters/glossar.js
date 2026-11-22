/* Glossar: wichtige Begriffe am Anfang jedes Kapitels (Theorie und Folien).
   Eintrag: [Fachbegriff, Deutsches Wort ('' = keines), Erklärung, optional Niveau (2 = ab B, 3 = nur A)] */
(function(){
'use strict';
const GT=window.GT;if(!GT||!GT.chapters)return;
const G={
wortarten:[
['Wortart','','Eine Gruppe von Wörtern mit denselben Eigenschaften.'],
['Nomen','Namenwort','Bezeichnet Lebewesen, Dinge, Orte und Gedanken. Wird grossgeschrieben.'],
['Verb','Tunwort','Sagt, was jemand tut oder was geschieht.'],
['Adjektiv','Wiewort','Sagt, wie etwas ist oder aussieht.'],
['Pronomen','Fürwort','Steht für ein Nomen oder begleitet es: er, mein, dieser.'],
['Partikel','unveränderliches Wort','Ein Wort, das nie seine Form ändert: und, in, heute.'],
['flektieren','beugen','Ein Wort ändert seine Form. Beim Verb heisst das konjugieren, bei Nomen, Artikel, Adjektiv und Pronomen deklinieren.'],
['flektierbar','veränderlich','Das Wort kann seine Form ändern (Nomen, Verb, Adjektiv, Pronomen).'],
['nicht flektierbar','unveränderlich','Das Wort bleibt immer gleich. Das gilt für alle Partikel.']],
nomen:[
['Nomen','Namenwort','Bezeichnet Lebewesen, Dinge, Orte und Gedanken.'],
['Artikel','Begleiter','der, die, das, ein, eine. Er steht vor dem Nomen.'],
['Genus','grammatisches Geschlecht','maskulin (der), feminin (die), neutral (das).'],
['Numerus','Zahl','Singular (Einzahl) oder Plural (Mehrzahl).'],
['Singular','Einzahl','Eines: der Hund.'],
['Plural','Mehrzahl','Mehrere: die Hunde.'],
['Konkretum','Nomen für Dinge zum Anfassen','Zum Beispiel Tisch, Hund, Stadt.',2],
['Abstraktum','Nomen für Gedanken und Gefühle','Zum Beispiel Freundschaft, Angst, Mut.',2],
['Zusammensetzung','Kompositum','Aus mehreren Wörtern gebildet: Schul + Hof = Schulhof. Das letzte Wort bestimmt den Artikel.',2],
['Homonym','','Gleich geschrieben, aber andere Bedeutung oder anderer Artikel: der See / die See.',3]],
verb:[
['Verb','Tunwort','Sagt, was jemand tut oder was geschieht.'],
['Infinitiv','Grundform','Die Form im Wörterbuch: laufen, sagen.'],
['konjugieren','beugen','Das Verb ändert sich nach Person und Zeit: ich laufe, du läufst.'],
['Person','','1. Person (ich, wir), 2. Person (du, ihr), 3. Person (er, sie, es, sie).'],
['Zeitform','Tempus','Sagt, wann etwas geschieht: Gegenwart, Vergangenheit, Zukunft.'],
['Hilfsverb','','sein, haben, werden: Sie helfen, andere Zeitformen zu bilden.'],
['Stammformen','','Grundform, Vergangenheit und Partizip: laufen – lief – gelaufen.',2],
['Befehlsform','Imperativ','Eine Aufforderung: Lauf! Lauft!'],
['Aktiv','Tatform','Wer handelt, steht vorn: Anna liest das Buch.',2],
['Passiv','Leideform','Die Handlung steht im Vordergrund: Das Buch wird gelesen.',2]],
adjektiv:[
['Adjektiv','Wiewort','Sagt, wie jemand oder etwas ist: schnell, gross, rot.'],
['steigern','','Das Adjektiv wird verglichen: gross – grösser – am grössten.'],
['Positiv','Grundstufe','gross'],
['Komparativ','Höherstufe','grösser'],
['Superlativ','Höchststufe','am grössten'],
['Endung','','Vor dem Nomen bekommt das Adjektiv eine Endung: der grosse Hund.'],
['Attribut','Beifügung','Das Adjektiv steht vor dem Nomen: der <b>grosse</b> Hund.',2],
['Prädikativ','','Das Adjektiv steht nach «sein» oder «werden»: Der Hund ist gross.',2],
['Wortbildung','','Mit Vorsilbe oder Nachsilbe: un-freundlich, freund-lich.',3]],
pronomen:[
['Pronomen','Fürwort','Steht für ein Nomen oder begleitet es.'],
['Begleiter','','Steht vor einem Nomen: mein Buch, dieser Hund.'],
['Stellvertreter','','Steht anstelle eines Nomens: Sie gehört mir.'],
['Artikel','Geschlechtswort','der, die, das, ein, eine. Er gehört hier zu den Begleitern.'],
['Personalpronomen','persönliches Fürwort','ich, du, er, sie, es, wir, ihr, sie.'],
['Possessivpronomen','besitzanzeigendes Fürwort','mein, dein, sein, ihr, unser, euer.'],
['Reflexivpronomen','rückbezügliches Fürwort','sich: Er wäscht sich.'],
['Demonstrativpronomen','hinweisendes Fürwort','dieser, jener, derselbe.'],
['Fragepronomen','fragendes Fürwort','wer, was, welcher.'],
['Indefinitpronomen','unbestimmtes Fürwort','man, jemand, niemand, alle.',2],
['Relativpronomen','bezügliches Fürwort','Leitet einen Relativsatz ein: der Mann, der dort steht.',2],
['Bezugswort','','Das Wort, auf das sich ein Pronomen bezieht.']],
partikel:[
['Partikel','Teilchen','Wörter, die ihre Form nie ändern. Sie lassen sich nicht beugen. Dazu gehören Präpositionen, Konjunktionen, Adverbien und Interjektionen.'],
['nicht flektierbar','unveränderlich','Das Wort bekommt keine Endung und hat keine Zeitform.'],
['Präposition','Verhältniswort','Steht vor einem Nomen und verlangt einen Fall: in, auf, mit, für.'],
['Konjunktion','Bindewort','Verbindet Wörter oder Sätze. Es gibt zwei Arten: nebenordnende und unterordnende Konjunktionen.'],
['nebenordnende Konjunktion','nebenordnendes Bindewort','Eine Art der Konjunktion. Verbindet gleichwertige Teile, das Verb bleibt an seiner Stelle: und, oder, aber, denn, sondern.'],
['unterordnende Konjunktion','unterordnendes Bindewort','Eine Art der Konjunktion. Leitet einen Nebensatz ein, das Verb steht am Ende: weil, dass, obwohl, wenn, damit.'],
['Adverb','Umstandswort','Nennt Ort, Zeit, Art oder Grund: hier, heute, gern, deshalb.'],
['Lokaladverb','Ortsadverb','Antwortet auf Wo? oder Wohin?: hier, dort, oben, hinauf.'],
['Temporaladverb','Zeitadverb','Antwortet auf Wann? oder Wie oft?: heute, bald, oft.'],
['Modaladverb','Artadverb','Antwortet auf Wie?: gern, leider, vielleicht.'],
['Kausaladverb','Grundadverb','Antwortet auf Warum?: deshalb, darum, deswegen.'],
['Interjektion','Ausrufewort','Drückt ein Gefühl aus oder ruft jemanden an: ach, aua, hurra, hey.'],
['Wechselpräposition','','Verlangt je nach Frage Dativ (Wo?) oder Akkusativ (Wohin?).'],
['Fall','Kasus','Nominativ, Genitiv, Dativ oder Akkusativ.']],
'wl-sl':[
['Wortlehre','','Untersucht einzelne Wörter und ihre Wortarten.'],
['Satzlehre','','Untersucht, wie Wörter zu Sätzen zusammengebaut sind.'],
['Wortart','','Zum Beispiel Nomen, Verb, Adjektiv.'],
['Satz','','Eine Wortgruppe, die eine Aussage, Frage oder Aufforderung enthält.'],
['Satzglied','','Wörter, die beim Umstellen zusammenbleiben.'],
['Prädikat','Satzaussage','Das Verb oder die Verbgruppe im Satz.'],
['Subjekt','Satzgegenstand','Fragen: Wer oder was?']],
verbale:[
['Verbale Teile','','Alle Teile des Prädikats: Personalform, Infinitiv, Partizip, Verbzusatz.'],
['Rohform','','Der Satz mit allen verbalen Teilen, ohne die anderen Wörter.'],
['Personalform','','Das Verb mit Person und Zeit: ich lese, wir lasen.'],
['Infinitiv','Grundform','lesen, laufen.'],
['Partizip','Mittelwort','gelesen, gelaufen (Partizip II) oder lesend (Partizip I).'],
['Verbzusatz','','Der abgetrennte Teil des Verbs: Ich rufe dich <b>an</b>.'],
['Satzklammer','','Personalform und restliche verbale Teile umschliessen den Rest des Satzes.',2]],
verschiebe:[
['Verschiebeprobe','Umstellprobe','Man stellt Wörter um. Was zusammen verschoben wird, ist ein Satzglied.'],
['Satzglied','','Wörter, die beim Verschieben zusammenbleiben.'],
['Wortgruppe','','Mehrere Wörter, die zusammengehören.'],
['Prädikat','Satzaussage','Beim Aussagesatz bleibt es immer an zweiter Stelle.'],
['Vorfeld','','Der Platz vor dem Prädikat im Aussagesatz.',2]],
satzglieder:[
['Satzglied','','Wörter, die beim Verschieben zusammenbleiben.'],
['Prädikat','Satzaussage','Das Verb oder die Verbgruppe.'],
['Subjekt','Satzgegenstand','Wer oder was? (Nominativ)'],
['Akkusativobjekt (AO)','','Wen oder was? (Akkusativ)'],
['Dativobjekt (DO)','','Wem? (Dativ)'],
['Genitivobjekt (GO)','','Wessen? (Genitiv)',3],
['Präpositionalgefüge','','Präposition mit Nomen: auf den Bus, mit dem Zug.'],
['Adverbiale','adverbiale Bestimmung','Gibt Ort, Zeit, Art oder Grund an: heute, im Park.'],
['Attribut','Beifügung','Gehört zu einem Nomen und ist kein eigenes Satzglied: das <b>rote</b> Auto.',2],
['Gleichsetzungsnominativ','','Wird mit «sein» oder «werden» gleichgesetzt: Anna ist <b>Lehrerin</b>.',3]],
satzarten:[
['Satzart','','Sagt, was der Satz tut: aussagen, fragen, auffordern.'],
['Aussagesatz','','Gibt eine Information. Am Ende steht ein Punkt.'],
['Fragesatz','','Stellt eine Frage. Am Ende steht ein Fragezeichen.'],
['Aufforderungssatz','','Bittet oder befiehlt. Am Ende steht ein Punkt oder Ausrufezeichen.'],
['Ausrufesatz','','Drückt ein Gefühl aus. Am Ende steht ein Ausrufezeichen.'],
['Satzfragment','','Ein unvollständiger Satz, dem etwas Wichtiges fehlt.'],
['Satzbau','','Wie die Teile eines Satzes angeordnet sind.']],
feld:[
['Feldermodell','','Ein Raster, das zeigt, wo die Teile eines Satzes stehen.'],
['Vorfeld','','Alles vor der linken Satzklammer. Im Aussagesatz steht dort genau ein Satzglied.'],
['Mittelfeld','','Alles zwischen den beiden Satzklammern.'],
['Nachfeld','','Alles nach der rechten Satzklammer.'],
['linke Satzklammer','','Die Personalform des Verbs.'],
['rechte Satzklammer','','Die restlichen verbalen Teile.'],
['Satzglied','','Wörter, die beim Verschieben zusammenbleiben.']],
'hs-ns':[
['Hauptsatz','','Kann allein stehen. Die Personalform steht an zweiter Stelle.'],
['Nebensatz','','Hängt von einem Hauptsatz ab. Die Personalform steht am Ende.'],
['Satzverbindung','','Zwei Hauptsätze, die verbunden sind.'],
['Satzgefüge','','Ein Hauptsatz mit mindestens einem Nebensatz.'],
['Einleitewort','','Das Wort am Anfang des Nebensatzes: weil, dass, der.'],
['Konjunktion','Bindewort','Verbindet Sätze: weil, dass, obwohl.'],
['Personalform','','Das Verb mit Person und Zeit.'],
['Wortstellung','','Die Reihenfolge der Wörter im Satz.']],
zgs:[
['zusammengezogener Satz','','Zwei Sätze, bei denen ein gemeinsames Satzglied nur einmal steht.'],
['gemeinsames Satzglied','','Das Satzglied, das in beiden Teilen vorkommt: Anna lacht und winkt.'],
['Hauptsatz','','Kann allein stehen.'],
['Subjekt','Satzgegenstand','Wer oder was?'],
['Prädikat','Satzaussage','Das Verb im Satz.']],
nsarten:[
['Nebensatz','','Hängt von einem Hauptsatz ab. Die Personalform steht am Ende.'],
['Einleitewort','','Das Wort am Anfang: weil, dass, der, ob.'],
['Konjunktionalsatz','','Nebensatz mit einer Konjunktion: weil, dass, obwohl.'],
['Relativsatz','','Nebensatz mit einem Relativpronomen. Er beschreibt ein Nomen.'],
['Relativpronomen','bezügliches Fürwort','der, die, das, welcher.'],
['Bezugswort','','Das Wort im Hauptsatz, zu dem der Relativsatz gehört.'],
['indirekter Fragesatz','','Eine Frage als Nebensatz: Ich weiss nicht, ob er kommt.'],
['uneingeleiteter Nebensatz','','Ein Nebensatz ohne Einleitewort.',2],
['Infinitivsatz','','Nebensatz mit «zu» und Infinitiv: Er hofft, bald zu gewinnen.',2],
['Partizipialsatz','','Nebensatz mit einem Partizip: Lachend ging sie weg.',3]],
komma:[
['Komma','','Trennt Sätze oder Satzteile und macht den Text lesbar.'],
['Aufzählung','','Gleichartige Wörter nacheinander: Äpfel, Birnen, Nüsse.'],
['Hauptsatz','','Kann allein stehen.'],
['Nebensatz','','Wird immer mit einem Komma abgetrennt.'],
['Satzgefüge','','Hauptsatz mit Nebensatz.'],
['Relativsatz','','Nebensatz mit einem Relativpronomen: der Mann, der dort steht.'],
['Einschub','Apposition','Ein eingeschobener Zusatz: Anna, meine Schwester, kommt.',2],
['Infinitivgruppe','','Gruppe mit «zu» und Infinitiv: Er hofft, bald zu gewinnen.',2],
['Konjunktion','Bindewort','und, oder (ohne Komma), weil, dass (mit Komma).']],
faelle:[
['Fall','Kasus','Die Form eines Nomens oder Artikels im Satz.'],
['Nominativ','Wer-Fall','Wer oder was?'],
['Genitiv','Wes-Fall','Wessen?'],
['Dativ','Wem-Fall','Wem?'],
['Akkusativ','Wen-Fall','Wen oder was?'],
['deklinieren','beugen','Nomen, Artikel, Adjektive und Pronomen ändern ihre Form nach dem Fall.'],
['Präposition','Verhältniswort','Verlangt einen bestimmten Fall: mit dem Bus (Dativ).'],
['Endung','','Der Teil am Wortende, der den Fall zeigt.']],
rede:[
['wörtliche Rede','direkte Rede','Man gibt wieder, was jemand genau gesagt hat. Sie steht in Anführungszeichen.'],
['Redebegleitsatz','','Zeigt, wer spricht: sagte Anna.'],
['Anführungszeichen','Gänsefüsschen','Schliessen die wörtliche Rede ein: «Ich komme.»'],
['indirekte Rede','','Man gibt weiter, was jemand gesagt hat, ohne wörtlich zu zitieren: Anna sagt, sie komme.'],
['Konjunktiv I','','Die Verbform der indirekten Rede: er komme, sie habe.'],
['Konjunktiv II','','Ersatzform, wenn Konjunktiv I nicht eindeutig ist: sie hätten.'],
['Ersatzform','','Eine andere Form, wenn Konjunktiv I wie die Gegenwart aussieht.']]
};

const lvNow=()=>(GT.lv?GT.lv():3);
const esc=s=>s;
function html(id){
  const rows=(G[id]||[]).filter(r=>!r[3]||lvNow()>=r[3]);
  if(!rows.length)return '';
  return '<div class="card gloss"><details open><summary style="cursor:pointer;font-weight:800">📖 Glossar: die wichtigsten Begriffe</summary><div class="gl">'+
    rows.map(r=>'<div class="glr"><div class="glt"><b>'+r[0]+'</b>'+(r[1]?' <span class="gld">= '+r[1]+'</span>':'')+'</div><div class="gle">'+r[2]+'</div></div>').join('')+
    '</div></details></div>';
}
(function(){const st=document.createElement('style');st.textContent='.gloss .gl{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.55rem;margin-top:.7rem}.gloss .glr{border:1px solid var(--line,#e2e8f0);border-radius:12px;padding:.55rem .75rem;background:var(--surface,#fff);hyphens:none;-webkit-hyphens:none}.gloss .glt{font-size:1rem}.gloss .gld{color:var(--muted,#64748b);font-weight:600}.gloss .gle{font-size:.92rem;margin-top:.15rem}';document.head.appendChild(st);})();
Object.keys(G).forEach(id=>{
  const c=GT.chapters[id];if(!c||c.glossar)return;
  c.glossar=true;
  c.SEC.glossar=()=>'<h2>Glossar</h2>'+html(id);
  const i=c.TOC.findIndex(t=>t[0]==='ziele');
  c.TOC.splice(i<0?0:i+1,0,['glossar','Glossar']);
  const j=c.SLIDES.findIndex(s=>s.id==='titel');
  c.SLIDES.splice(j<0?0:j+1,0,{id:'glossar',title:'Glossar',min:3,p:'h',note:'Die wichtigsten Begriffe kurz klären, bevor es losgeht. Aufklappbar, damit sie später nachgeschlagen werden können.',html:()=>html(id)});
});
})();
