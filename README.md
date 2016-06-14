# REDAXO mit Gulp, Browserify, PostCSS und Bimmelbam

Beispiel eines Frontend-Workflows zur Entwicklung einer REDAXO-Website.

## Idee

* Ein generischer Frontend-Workflow, der nicht zwangsläufig REDAXO erfordert, sondern auch im anderen Kontext (statische Website, anderes CMS, Webapp) funktioniert.
* REDAXO and ein statischer Frontend-Prototyp greifen auf die gleichen Ressourcen (CSS, JS, Medien, …) zu.
* Am Prototyp findet die komplette Frontend-Entwicklung statt, die Implementierung für REDAXO kann unabhängig erfolgen.
* Der Wechsel zwischen Develop- und Production-Modus findet außerhalb von REDAXO statt, und es sind dafür auch keine Eingriffe in Templates oder Module notwendig.

## Komponenten und Funktionen

* [npm](https://www.npmjs.com) und [Bower](https://bower.io) als package manager
* [Gulp](http://gulpjs.com) als task runner
* [Sass](http://sass-lang.com) und [PostCSS](http://postcss.org) für CSS (mit [Autoprefixer](http://autoprefixer.github.io), [Lost Grid](https://github.com/peterramsing/lost) und Bimmelbam)
* ES6 mit [Babel](http://babeljs.io) und [Browserify](http://browserify.org) für schönes JavaScript
* [Nunjucks](https://mozilla.github.io/nunjucks/) templates (für den Prototyp, aber gerne auch für JavaScript-Komponenten)
* ein konfigurierbarer [Modernizr](https://modernizr.com) (weil es geht)
* Bilder werden minifiziert
* SVGs werden kombiniert und ins HTML gebracht (für Icons)
* [BrowserSync](https://www.browsersync.io) für Live-Reload und zum Test auf verschiedenen Geräten

Nicht enthalten, aber sehr sinnvoll:

* Linting, damit Code den Anforderungen entspricht
* Testing, weil Menschen ständig Fehler machen
* Deployment, um Sourcen nicht manuell rumschieben zu müssen

## Warum?

Warum man solche durchaus komplexen Workflows verwendet?

* Weil man Aufgaben automatisieren möchte.
* Weil man dadurch Zeit spart und Fehler vermeidet.
* Weil man dadurch einfacher im Team arbeiten kann. Man sollte immer im Team arbeiten, selbst wenn man gerade kein Team um sich rum hat!
* Weil Frontend-Entwicklung so komplex geworden ist, dass es gar nicht mehr anders ginge.

## Setup

TODO

## Hinweise zur Entwicklung

TODO
