# Testwerkzeuge

Automatische Tests ohne Browser (jsdom). Einmal `npm install`, dann:

| Befehl | Prüft |
|---|---|
| `node t20.js` | alle Kapitel: Aufgaben (Antwort in Optionen, doppelte Optionen, ß), Theorie, Folien, Druck, Übungsrunden für Niveau A, B und C, Live-Übungen auf der Übungsfolie |
| `node t20.js feld` | nur ein Kapitel (Kapitel-ID einsetzen) |
| `node t21.js` | Trennen- und Verschieben-Widget (Verschiebeprobe) |
| `node t22.js` | Felder-Widget des Kapitels «Feldermodell» |

Erwartung: «bad 0» bei jedem Kapitel und «errors []» am Schluss.
Lange Läufe mit `timeout 300 node t20.js` starten.
