# REDAXO mit Gulp, Browserify, PostCSS und Bimmelbam

Beispiel eines Frontend-Workflows zur Entwicklung einer REDAXO-Website.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam.jpg)

## Idee

* Ein __generischer Frontend-Workflow__, der nicht zwangsläufig REDAXO erfordert, sondern auch im anderen Kontext (statische Website, anderes CMS, Webapp) funktioniert.
* REDAXO und ein statischer Frontend-Prototyp greifen auf __die gleichen Assets__ (CSS, JS, Medien, …) zu.
* Am __Prototyp__ findet die komplette Frontend-Entwicklung statt, die Implementierung für REDAXO kann unabhängig erfolgen (sinnvoll bei Arbeit im Team).
* Der Wechsel zwischen __Develop- und Production-Modus__ findet außerhalb von REDAXO statt, und es sind dafür auch keine Eingriffe in Templates oder Module notwendig.

## Komponenten und Funktionen

* [Yarn](https://yarnpkg.com) statt npm als __package manager__
* [Gulp](http://gulpjs.com) als __task runner__
* [Sass](http://sass-lang.com) und [PostCSS](http://postcss.org) für __CSS__ (mit [Autoprefixer](http://autoprefixer.github.io), [cssnano](http://cssnano.co) und Bimmelbam)
* ES6 mit [Babel](http://babeljs.io) und [Browserify](http://browserify.org) für schönes __JavaScript__
* [Nunjucks](https://mozilla.github.io/nunjucks/) __Templates__ (für den Prototyp, könnten aber auch für JavaScript-Komponenten verwendet werden)
* ein konfigurierbarer [Modernizr](https://modernizr.com) (weil es geht)
* __Bilder__ werden minifiziert
* __SVGs__ werden kombiniert und ins HTML gebracht (für Icons)
* [Bootstrap](http://getbootstrap.com) und [Google Material Icons](https://material.io/icons/) werden als externe Komponenten (via npm) verwendet
* [BrowserSync](https://www.browsersync.io) für __Live-Reload__ und zum Test auf verschiedenen Geräten

Nicht enthalten, aber sehr sinnvoll:

* __Linting__, damit Code den Anforderungen entspricht.
* __Testing__, weil Menschen ständig Fehler machen.
* __Continuous integration (CI)__, um das Projekt nicht immer von Hand zusammenbauen zu müssen.
* __Deployment__ und sonstiges Bimmelbam

## Setup

1. __Node__ (>= 6.9) installieren, falls nicht nicht vorhanden. Kann als Paket direkt von der Website runtergeladen werden: [https://nodejs.org](https://nodejs.org)
2. __Yarn__ installieren, falls noch nicht vorhanden ([Anleitung](https://yarnpkg.com/en/docs/install)).
3. Im Terminal in unser Verzeichnis wechseln und mittels Yarn die benötigten Pakete holen.  
_Achtung, es kommen mehrere hundert Megabyte an Daten durch die Leitung!_  

        $ yarn

4. __Gulp__ mittels Yarn global installieren:

        $ yarn global add gulp-cli

5. Einen __localhost/vhost__ (z. B. `http://local.bimmelbam`) für unser Projekt anlegen, der für REDAXO funktioniert. Zielverzeichnis des Hosts ist `/app`!
6. Die `.env` (__Environment__) im Projektroot anlegen. Dazu einfach die im Paket enthaltene `.env.example` kopieren und entsprechend anpassen: `APP_HOST` entspricht dem eben angelegten Host, `APP_ENV` belassen wir vorerst auf `development`.
7. Den Frontend-Workflow starten. Danach sollte unsere Frontend-Demo erreichbar sein über `http://localhost:3000/demo/`:

        $ gulp


Hat nicht geklappt? Sorry :-(  
Nicht ärgern und lieber im [REDAXO-Slack](http://redaxo.org/slack/) nachfragen, dort wird dir geholfen!