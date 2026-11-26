# Arbeitsweise Grammatik Trainer

Notizen für die Weiterarbeit mit KI-Assistenz. Hier steht, wie die App aufgebaut ist und wie Änderungen ablaufen.
Gemeinsame Regeln für alle Apps stehen in `TEACHING-COCKPIT.md` im Website-Repo (`novarion-desk/novarion-desk.github.io`).

## Die App

- Reine Browser-App ohne Build-Schritt: `index.html` (Engine `window.GT`) plus ein Skript pro Kapitel in `chapters/`.
- Live: https://novarion-desk.github.io/grammatik-trainer/ (GitHub Pages, Zweig `main`). Die Demo und die Website-Kachel ziehen automatisch nach.
- Weitere Dateien: `docx-export.js` (Word-Export), `vendor/docx.min.js`, `sw.js` (Cache), `manifest.webmanifest`, `icons/`.
- Schüler-Modus ohne Login, Lehrer-Modus mit Login (Firebase). Auf der Website nur Demo im Schüler-Modus mit Hinweis «Beta».
- Niveaus: A ist das höchste, C das tiefste (`LV={C:1,B:2,A:3}`, `GT.lv()`).

## Kapitel

Reihenfolge in `GT.WORT` und `GT.SATZ` (oben in `index.html`), Skripte unten in `index.html` eingebunden.

Wortlehre: Wortarten, Nomen, Fälle (`faelle.js`), Verb, Adjektiv, Pronomen, Partikel.
Satzlehre: `wl-sl`, `verschiebe`, `satzglieder`, `verbale`, `satzarten`, `feld`, `hs-ns`, `zgs`, `nsarten`, `komma`, `rede`.

Einzelne Kapitel erzeugen Aufgaben zufällig. Die Anzahl schwankt darum leicht; Dubletten entfernt der Filter am Ende von `chapters/langtext.js`.

Fast alle Kapitel nutzen `GT.chapter({id,teil,nr,title,big,desc,ex,goals,cats,catTitle,catWord,types,sections,tasks,exercises,merk,tryTypes,liveCats,css,widgets})`.
Nur `faelle.js` ist ein Sonderfall mit `GT.register` und eigenen `SEC`, `SLIDES`, `TASKS`.

Aufgaben (`tasks`): `typ`, `stufe` (1–3), `lv`, `cats`, `prompt` oder `sent`, `opts` + `answer` + `why`, oder Eingabe (`input`, `accept`, `strict`), oder Trennen (`tokens`, `cuts`).
Auswahlaufgaben erscheinen auch in den Live-Übungen. `liveCats` begrenzt sie auf Kategorien des Kapitels.

Jedes Kapitel liefert:
- **Folien** (Lehrer, zugleich Theorie für Schüler), `sections` mit Farben und Emojis,
- **Gemeinsame Übungen**: drei Live-Aufgaben vorne, die sich mit «Alle drei neu» erneuern, plus Aufschreib-Liste (`exercises`) für das Übungsblatt,
- **Merkblatt** (`merk`), **Lernziele** (`goals`), **Abschluss-Check**.
- Druck als PDF und Export als Word (`.docx`).

Widgets: `GT.tryW(typen, kategorien)` (Probier-es-aus), Trennen und Verschieben (Verschiebeprobe), Felder füllen (`feld.js`).

## Inhaltsregeln

- Hochdeutsch, Schweizer Rechtschreibung (ss, kein ß). Beispiele aus Schul- und Jugendalltag.
- Fachbegriffe zum Eintippen: Kleine Tippfehler zählen als richtig und werden erwähnt (siehe README).
- Fokus ist Grammatik, nicht Rechtschreibung.
- «Gemeinsame Übungen» beziehen sich nur auf das aktuelle Kapitel und greifen dem Stoff nicht vor.
- Eigene Formulierungen. Nichts aus Lehrmitteln oder Verlagsmaterial kopieren.
- Begriffsbrücke zum kantonalen Lehrmittel (LMVZ «Deutsch»): Verschiebeprobe = Vorfeldprobe, Präpositionalgefüge = Präpositionalgruppe, Kern = Chef-Wort.
- Sprachlich Inkorrektes darf ohne Nachfrage korrigiert werden. Amerikanische und britische Schreibweise gelten beide.

## Ablauf bei Inhaltsänderungen

1. Analyse (Material des Lehrers, Lehrmittel): was ist drin, was fehlt.
2. Prüfliste für den Faktencheck, Entscheidung per Ja/Nein.
3. Backup der aktuellen Dateien, dann lokal bauen.
4. Testen: `cd tools && npm install && timeout 300 node t20.js` (siehe `tools/README.md`).
5. Erst nach ausdrücklichem Ja pushen (Commit auf `main`).
6. Design- oder Funktionsänderungen immer auch für Demo und Website mitführen.

## Stand

- Fertig: Wortarten (Überblick), Nomen, Fälle (mit Präpositionen, Fallfehler, Endungen), komplette Satzlehre inklusive Feldermodell.
- Alle 18 Kapitel sind in der App. Adjektiv, Verb, Pronomen, Partikel: noch nicht an den Unterlagen geprüft.
- Ideen: Verbenfächer, Aktiv/Passiv, Konjunktiv I/II, Zusammensetzungen.
- Offene Punkte: Tests auf iPad und Handy, Lehrer-Login prüfen, KI-Übungsblatt testen, kleine Testgruppe, Einstellungen im Konto speichern, Knopf «Aufgabe melden», Verschieben auch im Übungsmodus, alte Inhalte in `komma.js` und im Teil «Wortstellung» von `hs-ns.js` noch ungeprüft.

## Glossar und lange Texte

- `chapters/glossar.js` (nach allen Kapiteln geladen): Glossar pro Kapitel `[Begriff, deutsches Wort, Erklärung, optional Niveau]`. Neues Kapitel = neuen Eintrag in `G` ergänzen. Es erscheint als Abschnitt «Glossar» (TOC) und als zweite Folie.
- `chapters/langtext.js` (danach geladen): lange Texte für Wortarten (`anmalenlang`) und die Einzelkapitel (`textlang`). Format `Wort|wortart`, Artikel zählen zu Pronomen, Adverbien/Präpositionen/Konjunktionen zu Partikel.
- Beide Dateien hängen sich nach `GT.register` an (`SEC`, `TOC`, `SLIDES`, `TASKS`, `TYPES`). Ladereihenfolge in `index.html` beachten.
- Theorie: Am Schluss kein «Ausprobieren», wenn der letzte Abschnitt schon eine Übungsbox hat (`noCheck`).
