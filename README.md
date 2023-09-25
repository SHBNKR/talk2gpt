# Talk2GPT      


### Installation & Start der Anwendung:

git clone https://github.com/SHBNKR/talk2gpt.git <br>
npm install <br>
npm start <br>

#### Information:

Dieses Projekt nutzt die OpenAI-API. Der folgende Code funktioniert NUR mir einer selbst generierten API_KEY von OpenAI. --> Da dass Projekt veröffentlicht wurde, wurde der API_KEY im Code deaktiviert.
Unter https://platform.openai.com/overview ist nach der Registrierung/Anmeldung im Personal Bereich der API_KEY Bereich vorzufinden. <br>
Anleitung: https://www.youtube.com/watch?v=nafDyRsVnXU&ab_channel=TutorialsHub

## Use Case:

ChatGPT gewinnt immer weiter an Beliebtheit. Doch diese Technologie soll nun weiterentwickelt werden. Da ebenso smarte Kopfhörer inzwischen sehr weit revolutioniert sind, soll die Nutzung von ChatGPT sprachgebunden möglich werden. Um einen ersten Eindruck zu erhalten, soll ein Prototyp entwickelt werden. Dabei soll die Eingabe über ein Mikrofon aufgenommen und über einen Button versendet werden können. Wichtig ist, dass nach der Eingabe das Mikrofon automatisch stummgeschalten wird um die Sprachausgabe nicht als Input zu verwerten. Des weiteren soll für lange und fehlgeschlagene Antworten eine Möglichkeit existieren die Sprachausgabe zu unterbrechen.

## Architektur & Entwurf:

### Komponenten:

* Spracheingabe als Input
* Chatkomponente API-Anfrage & Antwort
*	Sprachausgabe
*	Buttons

### Mockup:

<img width="587" alt="Mockup" src="https://github.com/SHBNKR/talk2gpt/assets/44865671/269f9bb8-76d5-4b1a-8d84-a95679873c48">

### Klassendiagramm:

![Class_Diagram](https://github.com/SHBNKR/talk2gpt/assets/44865671/8fe62738-3d43-4c7c-9c82-d21d53e6b603)


## Relevanz von React.js

* React.js ist basierend auf einer komponentenbasierten Architektur, in der UI-Elemente in wiederverwendbare Komponenten aufgeteilt werden können. Dies führt zu einer klaren und übersichtlichen Struktur des Codes und erleichtert somit die Wartung, Erweiterung oder Einarbeitung des Projekts. Für diesen Aspekt konnten die Komponenten für die Aufnahme der Spracheingabe, die Verarbeitung der Anfragen sowie die Ausgabe als Sprache erstellt werden.

* React.js wendet ein virtuelles DOM an, welches eine effiziente Aktualisierung der Benutzeroberfläche ermöglicht. Bei Zustandsänderungen wird der virtuelle DOM genutzt, um nur die betroffenen Komponenten zu aktualisieren, statt die gesamte Seite neu zu rendern. Der Einsatz ist insbesondere bei der Sprachausgabe relevant, da eine schnelle Reaktion erforderlich ist.

* React.js bietet eine breite Palette an Drittanbieter-Bibliotheken und Komponenten, welches die Entwicklung erleichtern kann. Für die Integration der Spracherkennung und -ausgabe konnten bereits vorhandene Bibliotheken wie SpeechRecognition genutzt werden. Die Integration solcher Bibliotheken in das Projekt erfolgt sehr einfach.

## Herausforderungen

Die Komponentenerstellung stellte eine Herausforderung dar, da der Code für Spracheingabe sehr gering war (25 LOC), welches ebenso als separate Komponente implementiert werden konnte, dadurch jedoch für separate Funktionalitäten der resetButton und die parallele Eingabe in das MessageInput-Feld wieder in der ChatKomponente mehr Code entstand als die Auslagerung einbrachte. Aus diesem Grund wurde die Komponente auskommentiert.




