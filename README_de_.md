# REDAXO mit Gulp, Browserify, PostCSS und Bimmelbam

Beispiel eines Frontend-Workflows zur Entwicklung einer REDAXO-Website.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam.jpg)

## Idee

* Ein __generischer Frontend-Workflow__, der nicht zwangsläufig REDAXO erfordert, sondern auch im anderen Kontext (statische Website, anderes CMS, Webapp) funktioniert.
* REDAXO und ein statischer Frontend-Prototyp greifen auf __die gleichen Assets__ (CSS, JS, Medien, …) zu.
* Am __Prototyp__ findet die komplette Frontend-Entwicklung statt, die Implementierung für REDAXO kann unabhängig erfolgen (sinnvoll bei Arbeit im Team).
* Der Wechsel zwischen __Develop- und Production-Modus__ findet außerhalb von REDAXO statt, und es sind dafür auch keine Eingriffe in Templates oder Module notwendig.

## Komponenten und Funktionen

* [Yarn](https://yarnpkg.com) als __package manager__
* [Gulp](http://gulpjs.com) als __task runner__
* [Sass](http://sass-lang.com) und [PostCSS](http://postcss.org) für __CSS__ (mit [Autoprefixer](http://autoprefixer.github.io), [cssnano](http://cssnano.co) und Bimmelbam)
* ES6 mit [Babel](http://babeljs.io) und [Browserify](http://browserify.org) für schönes __JavaScript__
* [Nunjucks](https://mozilla.github.io/nunjucks/) __Templates__ (für den Prototyp, könnten aber auch für JavaScript-Komponenten verwendet werden)
* ein konfigurierbarer [Modernizr](https://modernizr.com) (weil es geht)
* __Bilder__ werden minifiziert
* __SVGs__ werden kombiniert und ins HTML gebracht (für Icons)
* [Bootstrap](http://getbootstrap.com) und [Google Material Icons](https://material.io/icons/) werden als externe Komponenten (via npm) eingebunden
* [BrowserSync](https://www.browsersync.io) für __Live-Reload__ und zum Test auf verschiedenen Geräten

Nicht enthalten, aber sehr sinnvoll:

* __Linting__, damit Code den Anforderungen entspricht.
* __Testing__, weil Menschen ständig Fehler machen.
* __Continuous integration (CI)__, um das Projekt nicht immer von Hand zusammenbauen zu müssen.
* __Deployment__ und sonstiges Bimmelbam

## Setup

1. __Node__ (>= 6.9) installieren, falls noch nicht vorhanden. Kann als Paket direkt von der Website runtergeladen werden: [https://nodejs.org](https://nodejs.org)
2. __Yarn__ installieren, falls noch nicht vorhanden ([Anleitung](https://yarnpkg.com/en/docs/install)).
3. Im Terminal in unser Verzeichnis wechseln und mittels Yarn die benötigten Pakete holen.  
_Achtung, es kommen mehrere hundert Megabyte an Daten durch die Leitung!_  

        $ yarn

4. __Gulp__, falls noch nicht vorhanden, mittels Yarn global installieren:

        $ yarn global add gulp-cli

5. Einen __localhost/vhost__ (z. B. `http://local.bimmelbam`) für unser Projekt anlegen, der für REDAXO funktioniert. Zielverzeichnis des Hosts ist `/app`!  
_Anm.: Eine gute Anleitung gibt es hier: [»Eine lokale Domain mittels Apache Virtual Hosts erstellen«](http://www.matthias-zeis.com/ressourcen/zfstde/zfbook.creating.a.local.domain.using.apache.virtual.hosts.html)_
6. Die `.env` (__Environment__) im Projektroot anlegen. Dazu einfach die im Paket enthaltene `.env.example` kopieren und entsprechend anpassen: `APP_HOST` entspricht dem eben angelegten Host, `APP_ENV` belassen wir vorerst auf `development`.
7. Den Frontend-Workflow starten. Danach sollte unser Frontend-Prototyp erreichbar sein über `http://localhost:3000/demo/`:

        $ gulp

Hat nicht geklappt? Sorry :-(  
Nicht ärgern und lieber im [REDAXO-Slack](http://redaxo.org/slack/) nachfragen oder im [Forum](http://www.redaxo.org/de/forum/allgemeines-f39/frontend-workflow-fur-redaxo-mit-gulp-browserify-postcss-t21541.html#p120663), dort wird dir geholfen!

---

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam_02.png)

## Wie geht’s weiter?

### REDAXO

In diesem Projekt ist _keine_ REDAXO-Installation enthalten. Wenn deine Gulp-Tasks erfolgreich durchgelaufen sind, kannst du dir REDAXO nun selbst dazustecken, und zwar direkt ins `/app`-Verzeichnis. Dort liegen bereits die typischen REDAXO-Ordner.

Sobald dein REDAXO läuft, kannst du die Website wie gewohnt mittels Templates und Modulen implementieren. Das HTML verwendest du so wie im Prototyp (ggfls. Pfade anpassen!) und bindest die gleichen Assets ein. Am Ende hast du eine lauffähige REDAXO-Website, deren Output mit dem Prototyp identisch ist.

### Prototyp

Falls du dein Frontend zukünftig direkt in REDAXO entwickeln möchtest, kannst du den Prototyp nun verwerfen. __Jedoch ist die Absicht dieses Projekts ausgerechnet die, dich davon zu überzeugen, Frontend grundsätzlich _außerhalb_ von REDAXO anhand des Prototyps zu entwickeln.__ Warum? Weil es effizienter und komfortabler ist, und weil es im Team ggfls. von Leuten übernommen werden kann, die sich ausschließlich auf Frontend-Entwicklung konzentrieren und keine REDAXO- und PHP-Erfahrung benötigen.

Zudem funktioniert der Workflow ziemlich generisch. Du könntest ihn also in gleicher Form auch für andere Projekte verwenden, etwa im Kombi mit anderen CMS, für rein statische Websites oder Web Apps. ✌️

### Production

Um die Website produktionsfertig zu machen, aktivierst du `APP_ENV=production` und lässt Gulp durchlaufen. Dabei werden JavaScript und CSS minifiziert, Sourcemaps entfernt und Bilder komprimiert. In REDAXO musst du nichts weiter tun, denn alle Assets behalten ihre Pfade. Allerdings solltest du dir eine Lösung überlegen, das Caching zu kontrollieren, etwa mittels Timestamp-Parameter (Beispiel: `styles.css?v=1335939007`, siehe auch diese [Lösung für REDAXO](https://github.com/redaxo/redaxo/pull/976/commits/e1013defced264ffd9f6c24993acdd14791869bf)).

---

## Docker :whale: fürs Backend

Der Frontend-Workflow ist komplett, so dass wir nun die Entwicklungsumgebung fürs Backend optimieren können. Zum Beispiel mit Docker, um ein einheitliches Setup fürs Team zu ermöglichen und unabhängig von der lokalen Systemumgebung des Computers werden.

Dieses Paket enthält neben dem Frontend-Bimmelbam auch eine __vereinfachte Version des Pakets [REDAXO mit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)__. Die zugehörigen Dateien und Ordner sind:

    db/
    docker/
    .dockerignore
    docker-compose.yml

:point_right: _Falls du Bimmelbam nicht mit Docker betreiben möchtest, kannst du diese Komponenten einfach löschen, falls es dir sonst zu unübersichtlich wird._

Wir verwenden Docker für Bimmelbam, um eine __Serverumgebung (Apache, PHP, MySQL)__ bereitzustellen. Das ist ziemlich praktisch, denn dann muss dein Computer nicht dafür eingerichtet werden, und zudem habt ihr, falls ihr im Team arbeitet, am Ende alle die gleiche Serverumgebung, unabhängig vom verwendeten Betriebssystem.

### Setup

__`.env` anpassen:__

    APP_HOST=http://localhost:20080

:point_right: _Wir benutzen Port `20080` für HTTP und `23306` für die Datenbank, um nicht in Konflikt mit den Standardports `80`/`3306` zu kommen, sollten diese bereits verwendet werden. Das macht unser Setup robuster.  
Wenn du mehrere Docker-Projekte verwendest, musst du noch beachten, dass alle diese Ports verwenden und deshalb immer nur eins laufen kann, nicht mehrere gleichzeitig._

### Verwendung

Falls Docker für dich neu ist: Gar kein Problem, es gibt eine [Anleitung für Einsteiger\_innen](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anleitung-für-einsteiger_innen-rocket). :rocket:

__Docker-Container starten:__

    $ docker-compose up -d

__REDAXO im Browser aufrufen:__

    http://localhost:3000

:point_right: _Wir benutzen zum Aufruf im Browser nachwievor den Port 3000, so wie in Bimmelbam definiert (siehe [config.js](https://github.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/blob/d32f63df232f5273fd4b967a76e4cea5e90321fd/gulpfile.js/config.js#L14)). Bimmelbam verwendet einen Proxy und zeigt damit auf Port 20080, auf dem Docker den Apache bereitstellt. Lass dich davon nicht verwirren._

### Unterschiede zum Setup in [REDAXO mit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)

Das Docker-Setup in diesem Paket ist weniger aufwendig gestrickt als das Setup im _großen_ Paket »REDAXO mit Docker«. Hier soll Docker lediglich eine Serverumgebung bereitstellen und verzichtet auf zusätzliche Features. Dies sind die Unterschiede:

1. Es installiert dir nicht automatisch ein frisches REDAXO.
2. Es installiert auch keine Demo-Websites.
3. Es bringt keinen [Mailhog](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#mailhog-verwenden) mit, um den Mailversand in REDAXO zu testen.
4. Der Zugriff mittels HTTPS ist nicht konfiguriert.
5. Als Volume für den Webroot wird hier der Ordner `app/` verwendet, im anderen Paket ist es `html/`.

Falls du hier in Bimmelbam lieber mit dem großen Docker-Setup arbeiten möchtest, kannst du benötigten Dateien und Ordner einfach aus »REDAXO mit Docker« hierher kopieren. Du musst danach lediglich in `docker-compose.yml` den Webroot auf `app/` ändern. Alles andere kann beibehalten werden und sollte nahtlos auch in Bimmelbam funktionieren.

### Weitere Infos, Konfiguration und Anpassung

Ganz viele Informationen findest du im Paket [REDAXO mit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker), unter anderem zu diesen Themen:

* [Anpassungen für deine Projekte](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anpassungen-für-deine-projekte)
* [Konfiguration und Tipps](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#konfiguration-und-tipps)
* [Anleitung für Einsteiger_innen](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anleitung-für-einsteiger_innen-rocket) 🚀

Falls du Fragen hast oder Hilfe benötigst, kontakte uns jederzeit gerne im Slack-Chat! Eine Einladung bekommst du hier: https://redaxo.org/slack/

