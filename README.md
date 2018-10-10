# REDAXO whit Gulp, Browserify, PostCSS and Bimmelbam

Example of a front-end workflow for developing a REDAXO website.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam.jpg)

## Idea

* A __generic frontend workflow__ that does not necessarily require REDAXO, but works in the other context (static website, other CMS, webapp).
* REDAXO and a static front-end prototype access the same assets__ (CSS, JS, media, ...).
* At the __Prototype__ the complete frontend development takes place, the implementation for REDAXO can be done independently (useful when working in a team).
* Switching between __Develop and Production mode__ takes place outside of REDAXO, and there is no need to intervene in templates or modules.

## Components and functions

* [Yarn](https://yarnpkg.com) as __package manager__
* [Gulp](http://gulpjs.com) as __task runner__
* [Sass](http://sass-lang.com) and [PostCSS](http://postcss.org) for __CSS__ (whit [Autoprefixer](http://autoprefixer.github.io), [cssnano](http://cssnano.co) and Bimmelbam)
* ES6 whit [Babel](http://babeljs.io) and [Browserify](http://browserify.org) for beautiful __JavaScript__
* [Nunjucks](https://mozilla.github.io/nunjucks/) __Templates__ (for the prototype, but could also be used for JavaScript components)
* ein konfigurierbarer [Modernizr](https://modernizr.com) (because it works)
* __Bilder__ be minified
* __SVGs__ are combined and put into HTML (for icons)
* [Bootstrap](http://getbootstrap.com) and [Google Material Icons](https://material.io/icons/) are integrated as external components (via npm)
* [BrowserSync](https://www.browsersync.io) for __Live-Reload__ and for testing on different devices

Not included, but very useful:

* __Linting__, so that code meets the requirements.
* __Testing__, because people are constantly making mistakes.
* __Continuous integration (CI)__, not always having to assemble the project by hand.
* __Deployment__ and other Bimmelbam

## Setup

1. __Node__ (>= 6.9) install, if not already available. Can be downloaded as a package directly from the website: [https://nodejs.org](https://nodejs.org)
2. __Yarn__ install, if not already available ([Manual](https://yarnpkg.com/en/docs/install)).
3. Change to our directory in the terminal and get the needed packages by Yarn.
_Attention, several hundred megabytes of data are coming through the line!_  

        $ yarn

4. __Gulp__, if its not installed, you can install it whit Yarn global:

        $ yarn global add gulp-cli

5. Create a __localhost / vhost__ (for example, `http: // local.bimmelbam`) for our project that works for REDAXO. Target directory of the host is `/app`!  
_Btw: Here you find a good Guide: [»Create a local domain using Apache Virtual Hosts«](http://www.matthias-zeis.com/ressourcen/zfstde/zfbook.creating.a.local.domain.using.apache.virtual.hosts.html)_
6. Create the `.env` (__Environment__) in the projectroot. Just copy the `.env.example` included in the package and adjust it accordingly: `APP_HOST` corresponds to the newly created host, `APP_ENV` we leave for the time being on `development`.
7. Start the front-end workflow. After that, our frontend prototype should be accessible via `http://localhost:3000/demo/`:

        $ gulp

Did not work? Sorry :-(  
Don't worry!. you can ask the [REDAXO-Slack](http://redaxo.org/slack/) or in the [Forum](http://www.redaxo.org/de/forum/allgemeines-f39/frontend-workflow-fur-redaxo-mit-gulp-browserify-postcss-t21541.html#p120663), here you will get help!

---

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam_02.png)

## What's next?

### REDAXO

This project does not contain _no_ REDAXO installation. Once your gulp tasks have completed successfully, you can now put REDAXO yourself, directly into the `/app` directory. There are already the typical REDAXO folders.

As soon as your REDAXO is up and running, you can implement the website as usual using templates and modules. The HTML you use as in the prototype (if necessary, adapt paths!) And embed the same assets. In the end, you have a working REDAXO website whose output is identical to the prototype.

### Prototype

If you want to develop your frontend directly in REDAXO in the future, you can now discard the prototype. __But the purpose of this project is to convince you to develop the frontend basically _outside_ of REDAXO based on the prototype .__ Why? Because it is more efficient and comfortable, and because it works in a team. can be adopted by people who focus exclusively on frontend development and do not need a REDAXO and PHP experience.

In addition, the workflow works quite generic. So you could use it in the same way for other projects, for example in combination with other CMS, for purely static websites or web apps. ✌️

### Production

To get the site ready for production, turn on `APP_ENV = production` and let go through Gulp. JavaScript and CSS are minimized, source maps are removed and images are compressed. In REDAXO you do not have to do anything, because all assets keep their paths. However, you should consider a solution to control the caching, such as using timestamp parameters (example: `styles.css? V = 1335939007`, see also this[Solution for REDAXO](https://github.com/redaxo/redaxo/pull/976/commits/e1013defced264ffd9f6c24993acdd14791869bf)).

---

## Docker :whale: for the Backend

The front-end workflow is complete, so we can now optimize the development environment for the backend. For example with Docker, to enable a consistent setup for the team and to be independent of the local system environment of the computer.

In addition to the front-end Bimmelbam, this package also includes a __simplified version of the package [REDAXO whit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)__. The associated files and folders are:

    db/
    docker/
    .dockerignore
    docker-compose.yml

:point_right: _If you do not want to run Bimmelbam with Docker, you can simply delete these components if it gets too confusing for you._

We use Docker for Bimmelbam to provide a __server environment (Apache, PHP, MySQL)__. That's pretty handy, because then your computer does not have to be set up for that, and besides, if you work in a team, you all end up with the same server environment, regardless of the operating system you're using.

### Setup

__Edit `.env`__ file:

    APP_HOST=http://localhost:20080

:point_right: _We use port `20080` for HTTP and `23306` for the database, so as not to conflict with the standard ports `80`/`3306`, if they are already in use. That makes our setup more robust.
If you use several Docker projects, you have to keep in mind that all these ports use and therefore only one can run at a time, not several at the same time.

### Usage

If Docker is new to you: no problem, there is a [Instruction for beginners](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anleitung-für-einsteiger_innen-rocket). :rocket:

__Start Docker-Container:__

    $ docker-compose up -d

__REDAXO in the Browser:__

    http://localhost:3000

:point_right: _We still use the port 3000 to call in the browser, as defined in Bimmelbam (see [config.js](https://github.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/blob/d32f63df232f5273fd4b967a76e4cea5e90321fd/gulpfile.js/config.js#L14)). Bimmelbam uses a proxy pointing to port 20080, where Docker provides Apache. Do not let that confuse you._

### Differences between the setup in [REDAXO whit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)

The Docker setup in this package is less complicated to knit than the setup in the _large package_ »REDAXO whit Docker«. Hier soll Docker lediglich eine Serverumgebung bereitstellen und verzichtet auf zusätzliche Features. Dies sind die Unterschiede:

1. It does not automatically install a fresh REDAXO.
2. It also does not install demo sites.
3. There is no [Mailhog](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#mailhog-verwenden) to send mails whit REDAXO
4. Access via HTTPS is not configured.
5. The volume for the webroot is the folder `app/`, in the other package it is `html/`.

If you prefer to work with the large Docker setup here in Bimmelbam, you can easily copy required files and folders from »REDAXO with Docker« here. After that, you only need to change the webroot to `app/` in `docker-compose.yml`. Everything else can be maintained and should work seamlessly in Bimmelbam as well.

### Further information, configuration and customization

You will find a lot of information in the package [REDAXO whit Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker), and also to this Topics:

* [Adjustments for your projects](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anpassungen-für-deine-projekte)
* [Configuration and tips](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#konfiguration-und-tipps)
* [Guide for beginners](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#anleitung-für-einsteiger_innen-rocket) 🚀

If you have questions or need help, feel free to contact us in Slack Chat! You will receive an invitation here: https://redaxo.org/slack/

