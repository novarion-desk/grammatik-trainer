# Grammatik Trainer

Schul-Web-App (Wortlehre + Satzlehre) mit Schülermodus (ohne Login) und Lehrermodus (Firebase-Login, `?demo` für Demo).

- `index.html`: Engine, Design, Login
- `chapters/*.js`: ein Kapitel pro Datei (Theorie, Folien, Aufgaben, Merkblatt)
- `vendor/`: Firebase-Bibliotheken

Kapitel: Wortarten, Nomen, Fälle, Verb, Adjektiv, Pronomen, Partikel · Wortlehre und Satzlehre, Verbale Teile, Verschiebeprobe, Satzarten, Hauptsatz/Nebensatz, Kommasetzung.
Niveaus: A = alles, B = mittlerer Umfang, C = Kern.


## Neu (November 2026)
- Aufgaben zum Selberschreiben (Einsetzen, Umformen, Mehrzahl, Artikel …); Umschalter «Selber schreiben / Auswählen» in der Übungsauswahl.
- Verb: Einsetzen, Umformen, Zeit wählen, Verben im Text.
- Alle Wortarten: Aufgabe «… im Text» (Wortarten: alle Wortarten im Text anmalen).
- Lehrerbereich: KI-Übungsblatt (Pool oder KI), A4 mit Lösungsblatt. Die KI-Schlüssel kommen aus dem Konto (Firestore `sekSync/apikeys_<uid>`), also dieselben wie im Sek Planer.
