
# Green Production Calculator

## Idee und Zusammenhang mit der Bachelorarbeit

Für mein Webprojekt in IM5 gestaltete ich einen CO2-Rechner, der die Emissionen einer schweizerischen Medienproduktion berechnen kann.
Das Resultat ist leider nicht sehr repräsentativ, da nicht alle Parameter miteinbezogen werden konnten. Die Ergebnisse sind jedoch valide und werden mithilfe der Firma "climatiq.io" berechnet. Mit der Applikation soll ein Bewusstsein geschaffen werden für die Unmengen an CO2-Emissionen, welche durch das Erstellen von multimedialem Content anfällt. Mein Bachelorthema "Green Production" befasst sich mit den Produktionsansätzen, um diese Emissionen zu verringern.

## Funktionen der Webseite

In erster Linie ist es ein Rechner, welcher die Inputs der User:innen zusammenrechnet. Dies geschieht aber dynamisch, sodass kein Button gedrückt werden muss.
Die Daten werden bei jeder neuen Eingabe geupdatet und mit einem fetch weitergegeben. Darauffolgend wird eine Illustration je nach Resultat animiert. Bei einer zu hohen 
CO&#x2082-Bilanz greift ein Limiter, der die Werte sofort wieder auf null zurücksetzt und einem rät, die Produktionspläne nochmals zu überdenken.
Alle Eingaben werden jeweils durch eine ergänzende Validierung via HTML und Javascript überprüft. Bei einem "false" wird eine Fehlermeldung im DOM ausgegeben.

## Challenges

+ Monatliche Requests in der ersten Woche überschritten
+ Das CSS für eine Smartphoneversion gestaltete sich schwierig, da Elemente weichen mussten, die Usability aber nicht darunter leiden durfte
+ Aufbau der Logik des Javascript-Codes: Wo kann welche Funktion ausgelagert/gelöscht werden, dass der Code übersichtlicher und skalierbarer wird und sich dabei nicht wiederholt?

## Learnings

+ Den Umgang mit Github Desktop, dem Repository und Co-Pilot
+ Kleine Elemente wie ein Resetbutton können an der falschen Stelle grossen Einfluss auf den Code haben
+ ChatGPT 3.5 ist ab einer gewissen Komplexität nicht mehr nützlicher, als eine konkrete Google-Suche
+ Validierung und Userfreundlichkeit muss von Anfang an in die Planung miteinbezogen werden

## Hilfsmittel, Methodik und Quellen

Für das Projekt habe ich ChatGPT 3.5 als Hilfsmittel verwendet, um beispielsweise Strukturen von wichtigen Funktionen zu erstellen. Ab einer gewissen Komplexität musste ich jedoch auf Foren oder Codierwebseiten wie stackoverflow.com oder w3schools.com zurückgreifen, um bestimmte Probleme lösen zu können. Der Co-Pilot von GitHub war zusätzlich eine grosse Hilfe während des Programmierens und half dabei, Bugs schneller identifizieren zu können.

Den Code habe ich mit der neusten Version von VS Code erstellt und mit meinem GitHub-Account verbunden, um schrittweise Back-Up's des Projektes zu machen.

Die svg-Grafik habe ich in Illustrator nach folgender Inspiration nachgebaut und auf meine Bedürfnisse angepasst: https://www.shutterstock.com/de/image-vector/old-cinema-camera-pinup-pop-art-2285092763


Zuletzt bleibt mir nichts anderes übrig, als mich bei meinen Dozent:innen und Mitstudierenden für die Coachings zu bedanken, die mein Projekt weiter voran gebracht haben. Und nun wünsche ich viel Spass mit dem "Green Production Calculator"!
