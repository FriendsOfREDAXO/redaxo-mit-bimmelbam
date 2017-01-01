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

TODO



