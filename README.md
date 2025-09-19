# Kontaktformular (Dark Mode) – GitHub Pages

Ein simples Kontakt-/Feedback-Formular mit Dark-Theme, das statisch auf GitHub Pages gehostet werden kann. Der Versand läuft per Formspree (kein eigenes Backend nötig). Optional kannst du später ein eigenes, kleines Backend ergänzen.

## Features
- Dark-Mode, responsive, barrierearme Formularelemente
- Validierung im Browser (Name, Nachricht; E‑Mail optional mit Formatprüfung)
- Anti-Spam: Honeypot + Zeitfalle
- E‑Mail-Obfuskation im Impressum (z. B. kontakt [AT] beispiel [DOT] de), per Klick Anzeige/Kopieren
- Leicht auf GitHub Pages zu deployen

## Dateien
- index.html – Seite inkl. Formular und Impressum
- assets/main.css – Styles
- assets/main.js – Logik (Validierung, Versand, E‑Mail-Reveal)

## Einrichten (Formspree)
1. Formular auf formspree.io anlegen (Free-Plan reicht). Formular-ID notieren (Format f/xxxxxx).
2. In assets/main.js die Konstante endpoint anpassen und FORM_ID durch deine ID ersetzen.
3. Optional: In assets/main.js im Abschnitt „reveal email“ user und domain auf deine Adresse setzen.

Hinweis: GitHub Pages ist statisch; Formspree übernimmt den Versand. Eigene Backends sind in diesem Projekt absichtlich entfernt, um den Workflow maximal zu vereinfachen.

## Impressum
Ersetze im Abschnitt „Impressum“ in index.html den Platzhaltertext durch dein echtes Impressum. Wenn du mir den Text schickst, trag ich ihn für dich ein.

## Deploy auf GitHub Pages
- Repo zu GitHub pushen.
- In den Repository Settings → Pages → Branch main, Folder /(root) auswählen → Save.
- Seite erreichbar unter https://<dein-user>.github.io/<repo-name>/

## Datenschutz
Beim Absenden wird per fetch JSON an Formspree gesendet. Prüfe, ob das in deiner Datenschutzerklärung abgedeckt ist.

## Anpassen
- Farben/Fonts in assets/main.css.
- Felder in index.html (IDs beibehalten, damit die JS-Validierung weiter funktioniert).

Viel Erfolg! Wenn du mir dein Impressum und deine Ziel-E‑Mail gibst, trag ich beides für dich ein.