# Grammatik Trainer

Schul-Web-App (Wortlehre + Satzlehre) mit Schülermodus (ohne Login) und Lehrermodus (Firebase-Login, `?demo` für Demo).

- `index.html`: Engine, Design, Login
- `chapters/*.js`: ein Kapitel pro Datei (Theorie, Folien, Aufgaben, Merkblatt)
- `vendor/`: Firebase-Bibliotheken

Kapitel (18): Wortarten, Nomen, Fälle, Verb, Adjektiv, Pronomen, Partikel · Wortlehre und Satzlehre, Verschiebeprobe, Satzglieder, Verbale Teile, Satzarten, Feldermodell, Hauptsatz/Nebensatz, Zusammengezogener Satz, Arten der Nebensätze, Kommasetzung, Direkte und indirekte Rede.
Niveaus: A = alles, B = mittlerer Umfang, C = Kern.


## Neu (November 2026)
- **Lernhilfen (26.11.):** «Meine Fehler» (falsche Aufgaben bleiben auf dem Gerät, fällig nach 1 Tag, nach richtiger Antwort nochmals nach 3 Tagen; nach zweimal richtig weg, höchstens 200), Teilthemen in «Mein Fortschritt», Einstiegscheck in der Testvorbereitung, «Aufgabe melden» (Kapitel, Nummer und Aufgabenanfang gehen ins Tally-Formular), beim Üben keine Kopfzeile, Theorie mit «Das Wichtigste in Kürze» (Merkblatt) und eingeklappten Details.
- **Korrekturen (26.11.):** Frage nicht mehr doppelt, Erklärungen bei Komma, Rede, Nomen und Nebensatzarten korrigiert, vier Texte ausgebaut, doppelte Aufgaben werden beim Laden entfernt.
- **Satzlehre-Texte (26.11.):** Lange Texte auch für die Satzlehre: Satzglieder anmalen (16 Texte, 7 Satzglieder), Kommas im Text setzen (12 Texte), Nebensatzarten anmalen (10 Texte) und alle Nebensätze im Text antippen (10 Texte). Sie erscheinen über «Textaufgaben pro Kapitel» im Test und im Druckblatt (mit Legende der Bezeichnungen).
- **Textaufgaben in der Testvorbereitung (26.11.):** Neue Einstellung «Textaufgaben pro Kapitel» (0 bis 3, Standard 1): Pro gewähltes Kapitel kommen ein bis drei lange Texte in den Test (Wortarten bestimmen, Fälle der Nomen bestimmen, Nomen/Verben/Adjektive/Pronomen/Partikel antippen). Die Texte stehen am Schluss, zählen zur Anzahl Aufgaben (höchstens die Hälfte des Tests) und erscheinen auch auf der Übungsprüfung zum Drucken mit Lösungen. **Neu:** «Fälle im langen Text» (20 Texte: Nomengruppen mit Präposition anmalen, Pronomen bleiben ungemalt) und 10 zusätzliche Texte für Wortarten, Nomen, Verb, Adjektiv, Pronomen und Partikel (30 statt 20).
- **Präsentation (24.11.):** Die Antwort von «Frag Marty» lässt sich nach unten scrollen und wird automatisch ins Bild geholt.
- **Frag Marty in allen Folien-Übungen (24.11.):** Nach jeder beantworteten Aufgabe auf den Übungsfolien, bei «Probier es aus», in den Gemeinsamen Übungen und im Abschluss-Check erscheint «💡 Frag Marty» (wie im Üben-Bereich; `#ki-aus` schaltet es ab).
- **Druck (24.11.):** Vorsorge gegen eine leere erste Seite bei Merkblatt, Handout und Übersicht (Seitenumbruch-Regeln der Druckvorlage entschärft). Beim Handout entfällt die leere letzte Seite.
- **Antipp-Aufgaben (24.11.):** 30 neue Sätze zum Antippen in Pronomen, Satzarten (Fragewort), Nebensatzarten (Einleitewort), Feldermodell (Vorfeld), Zusammengezogener Satz (gemeinsames Satzglied) und Verschiebeprobe (verschiebbares Satzglied). Erscheinen auf den Übungsfolien.
- **Design 2 für alle Kapitel (24.11.):** Karten in Zweier-/Dreierspalten haben jetzt den Farbcode (blau, grün, orange, violett), Stolpersteine sind rot gerahmt, Nummern und Tabellen sind aufgeräumt. Neu gestaltet mit Chips, Vergleich, Regelkarten und Falsch-Richtig-Paaren: Nomen (6 Folien), Komma, Rede, Satzarten, Zusammengezogener Satz, Partikel, Verbale Teile, Verschiebeprobe, Pronomen, Nebensätze, Haupt-/Nebensatz, Adjektiv. Inhalte unverändert. Zweiter Durchgang: Feldermodell, Pronomen (Begleiter/Stellvertreter), Wortarten (Chips, farbige Spaltenköpfe).
- **Handout mit Auswahl (24.11.):** «Drucken › Handout» fragt Folien pro A4 (1, 2, 4, 6, 8; mit Notizen rechts 2, 3, 4) und Notizen (keine, rechts, am Schluss). Hinweis im Dialog: «Kopf- und Fusszeilen» im Druckdialog ausschalten. Das Drucken-Menü ist auf dem Handy nicht mehr abgeschnitten.
- **Folien neu gestaltet (24.11.):** Verb: Zeitleiste bei den Zeitformen und falsch/richtig-Paare bei den Stolpersteinen; Fälle: Dativ/Genitiv/Akkusativ nebeneinander bei den Stolpersteinen; Satzglieder: Satzglieder als farbige Chips; Haupt-/Nebensatz als Zwei-Spalten-Vergleich. Behoben: Fettschrift in Stolperstein-Karten brach Zeilen um.
- **Baukasten 2.0 (24.11.):** Neue Bausteine für Folien in `GT.ui` (Satzbaustein-Chips, Zwei-Spalten-Vergleich `vs`, Regelkarten, Oops-Gegenüberstellung, Zeitleiste, Tipp-/Warn-/Oops-Kästen). Bestehende Hinweiskästen «Merke» und «Wichtig» erscheinen jetzt grün mit 💡 bzw. gelb mit ⚠️. Noch in keinem Kapitel eingesetzt (Inhalte kommen über Prüfliste).
- **KI-Erklärung (23.11.):** Knopf «💡 Frag Marty» nach einer beantworteten Üben-Aufgabe, für alle sichtbar, nicht in der Prüfung (`…/grammatik-trainer/#ki-aus` schaltet ihn auf dem Gerät ab, `#ki-test` wieder ein). Die Anfrage geht an den Cloudflare-Worker `tc-ki-proxy` (Mistral, Key nur dort), mit Tageslimit pro Gerät. Hinweis in der App: KI kann sich irren, keine Namen eingeben. Nicht in der Prüfung.
- **Tippfehler (23.11.):** Bei Fachbegriffen im Modus «Selber schreiben» zählt ein kleiner Tippfehler (ab 6 Buchstaben: 1 Fehler, ab 12: 2; ä/ae gleichwertig) als richtig, wird aber erwähnt («Achte auf die Schreibweise …») und in der Übersicht markiert. Nicht tolerant: Grammatikformen (Einsetzen, Umformen), Gross-/Kleinschreibungs-Aufgaben und Begriffe, die selbst ein anderer Fachbegriff sind (z. B. «Futur II» statt «Futur I»).
- **Neuer Typ «Subjekt und Objekte finden» (23.11.):** 8 bisher unsichtbare Aufgaben in «Die Verschiebeprobe» sind jetzt sichtbar.
- **Antwortart (23.11.):** Im Üben-Menü gibt es «Selber schreiben», «Auswählen» und «Gemischt». «Auswählen» ist reines Antippen: Aufgaben, die man sonst schreibt, haben Antippen-Varianten (Wortkarten für Sätze, Auswahl mit passenden Fehlantworten für Wörter). «Selber schreiben» zeigt überall dort ein Textfeld, wo es sinnvoll ist (kurze Fachbegriffe, Lückenwörter); Markieren, Anmalen und Kommasetzen bleiben Antippen. «Gemischt» würfelt pro Aufgabe.
- **Übungsblatt für Schüler (23.11.):** Im Üben-Menü neben «Übung starten» gibt es «🖨️ Drucken / PDF» und «📝 Word». Das Blatt entsteht aus der gewählten Auswahl (Themen, Typen, Stufe, Anzahl). Die Lösungen stehen am Schluss.
- **Mehr Aufgaben (23.11.):** rund 325 neue Aufgaben in 14 Kapiteln, vor allem dort, wo es wenige gab (Zusammengezogener Satz, Wortlehre/Satzlehre, Verschiebeprobe, Satzarten, Rede, Verbale Teile, Komma, Hauptsatz/Nebensatz, Adjektiv). Mehr Stufe 2 und 3. Pronomen, Satzglieder, Fälle und Feld unverändert.
- **Merkblatt** enthält jetzt das Glossar (eigene Seite). **Handout:** Folien verkleinert, mehrere pro A4 (Lehrer: Drucken ▾ › Handout). **Mein Fortschritt** auf der Startseite: pro Kapitel Trefferquote, Anzahl Aufgaben, zuletzt geübt (nur auf diesem Gerät).
- **Testvorbereitung als Prüfung:** Kapitel mischen (bis 80 Aufgaben), Prüfungsmodus (Resultate erst am Schluss, ohne Tipps), Auswertung mit «Das solltest du anschauen» (Links zur Theorie) und Lösungen mit Begründung. Punkte: Auswahl 0,5, sonst 1 (schwieriger 2), lange Texte 2. Prüfung auch als Blatt (Druck/Word) mit Lösungsblatt, Total und Note.
- **Glossar** am Anfang jedes Kapitels (Theorie und Folien): Fachbegriff, deutsches Wort, Erklärung. Daten in `chapters/glossar.js`.
- **Partikel** ausgebaut: Interjektionen (neuer Abschnitt), Konjunktionen nebenordnend/unterordnend mit Verbstellung, Adverbien zuordnen (lokal, temporal, modal, kausal), Wechselpräpositionen (Wo? Wohin?), Kurzformen. Begriffe wie «Verhältniswort» im Text.
- **Lange Texte**: Wortarten «Langer Text anmalen» (alle fünf Wortarten), in Nomen, Verb, Adjektiv, Pronomen und Partikel je «… im langen Text». Daten in `chapters/langtext.js`.
- «Probier es aus» kommt in der Theorie nur noch einmal am Schluss: Endet das Kapitel schon mit einer Übungsbox, entfällt der Block «Ausprobieren».
- Aufgaben zum Selberschreiben (Einsetzen, Umformen, Mehrzahl, Artikel …); Umschalter «Selber schreiben / Auswählen» in der Übungsauswahl.
- Verb: Einsetzen, Umformen, Zeit wählen, Verben im Text.
- Alle Wortarten: Aufgabe «… im Text» (Wortarten: alle Wortarten im Text anmalen).
- Lehrerbereich: KI-Übungsblatt (Pool oder KI), A4 mit Lösungsblatt. Die KI-Schlüssel kommen aus dem Konto (Firestore `sekSync/apikeys_<uid>`), also dieselben wie im Sek Planer.

### Präsentieren-Modus (Lehrer, Folien)
Knopf «▶ Präsentieren» in der Folien-Leiste: Vollbild, Folie wird automatisch auf die Bildschirmgrösse skaliert. Bedienung: Pfeiltasten/Leertaste/Klick rechts/Wischen = weiter, Klick links = zurück, N = Hinweise ein/aus, Esc = beenden. Auf iPad/iPhone ohne echten Browser-Vollbild (Seite füllt den Bildschirm).

## Feedback
Der Knopf «💬 Feedback» öffnet ein externes, anonymes Formular bei Tally (Fehler, Wünsche, Inhalte). Nur dann werden Angaben gesendet – zusammen mit App-Name, Version und Gerätetyp. Namen werden nicht abgefragt.

## Zurück-Geste
Die Zurück-Taste bzw. -Geste (Handy, iPad) geht einen Schritt zurück (z. B. Aufgaben → Einstellung → Start, offene Fenster schliessen) und schliesst die App erst auf dem Startbildschirm.
