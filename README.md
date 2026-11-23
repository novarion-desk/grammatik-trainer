# Grammatik Trainer

Schul-Web-App (Wortlehre + Satzlehre) mit Schülermodus (ohne Login) und Lehrermodus (Firebase-Login, `?demo` für Demo).

- `index.html`: Engine, Design, Login
- `chapters/*.js`: ein Kapitel pro Datei (Theorie, Folien, Aufgaben, Merkblatt)
- `vendor/`: Firebase-Bibliotheken

Kapitel: Wortarten, Nomen, Fälle, Verb, Adjektiv, Pronomen, Partikel · Wortlehre und Satzlehre, Verbale Teile, Verschiebeprobe, Satzarten, Hauptsatz/Nebensatz, Kommasetzung.
Niveaus: A = alles, B = mittlerer Umfang, C = Kern.


## Neu (November 2026)
- **KI-Erklärung (Test, 23.11.):** Knopf «💡 Frag die KI» nach einer beantworteten Üben-Aufgabe, nur sichtbar auf Geräten, auf denen einmal `…/grammatik-trainer/#ki-test` geöffnet wurde (`#ki-aus` schaltet ab). Die Anfrage geht an den Cloudflare-Worker `tc-ki-proxy` (Mistral, Key nur dort), mit Tageslimit pro Gerät. Hinweis in der App: KI kann sich irren, keine Namen eingeben. Nicht in der Prüfung.
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
