<p align="right">🌎 <a href="https://github.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/blob/master/README.de.md">Deutsch</a></p>

# REDAXO with Gulp, Browserify, PostCSS and Bimmelbam<sup>*</sup>

Example of a front-end workflow for developing a REDAXO website. (<sup>*</sup> stuff)

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam.jpg)

## Idea

* A __generic frontend workflow__ that does not necessarily require REDAXO but works in several contexts (static website, different CMS, web app).
* REDAXO and a static front-end prototype __share all assets__ (CSS, JS, media, ...).
* The __prototype__ is used for the complete frontend development. Implementation for REDAXO can be done separately (useful when working in a team).
* Switch between __develop and production mode__ without touching REDAXO, there is no need to modifiy templates or modules.

## Components and features

* [Yarn](https://yarnpkg.com) as a __package manager__
* [Gulp](http://gulpjs.com) as a __task runner__
* [Sass](http://sass-lang.com) and [PostCSS](http://postcss.org) for __CSS__ (with [Autoprefixer](http://autoprefixer.github.io), [cssnano](http://cssnano.co) and Bimmelbam)
* ES6 with [Babel](http://babeljs.io) and [Browserify](http://browserify.org) for beautiful __JavaScript__
* [Nunjucks](https://mozilla.github.io/nunjucks/) __templates__ (for the prototype, but could also be used for JavaScript components)
* A customizable [Modernizr](https://modernizr.com) (because it works)
* __Images__ get minified
* __SVGs__ get combined and injected into the HTML (for icons)
* [Bootstrap](http://getbootstrap.com) and [Google Material Icons](https://material.io/icons/) are included as external components (via npm)
* [BrowserSync](https://www.browsersync.io) for __live reload__ and for testing on different devices

Not included, but meaningful:

* __Linting__, so that code meets the requirements.
* __Testing__, because people are constantly making mistakes.
* __Continuous integration (CI)__ to not always having to assemble the project by hand.
* __Deployment__ and other Bimmelbam (means: stuff)

## Setup

1. Install __Node__ (>= 6.9), if not already available. Can be downloaded as a package directly from the website: [https://nodejs.org](https://nodejs.org)
2. Install __Yarn__ if not already available ([Manual](https://yarnpkg.com/en/docs/install)).
3. Change to our directory in the terminal and fetch the required packages.  
   _Attention, several hundred megabytes of data are coming through the line!_  

		$ yarn

4. Use Yarn to install __Gulp__ globally, if it is not already installed:  

		$ yarn global add gulp-cli

5. Set up a **localhost/vhost** (for example, `http://local.bimmelbam`) for our project that is able to run REDAXO. Target directory of the host is `/app`!
6. Create an `.env` file (__Environment__) inside of the project root. Just copy the `.env.example` included in the package and adjust it accordingly: `APP_HOST` corresponds to the host you have previously set up, `APP_ENV` can remain at `development` for the time being.
7. Start the front-end workflow. After that, our frontend prototype should be accessible via `http://localhost:3000/demo/`:

		$ gulp

Does not work? Sorry :-(  
No worries! Join the [REDAXO Slack](https://redaxo.org/slack/) for help or leave a post on the [Forum](https://www.redaxo.org/forum/), we’ll try to support you!

---

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/assets/redaxo-mit-bimmelbam_02.png)

## What’s next?

### REDAXO

This project does _not_ contain a REDAXO installation. Once your gulp tasks have completed successfully, you can now __manually add REDAXO__ into the `/app` directory. It already contains the common REDAXO folders.

Once your REDAXO is up and running, you can implement the website with templates and modules as usual. Take the HTML from the prototype (adapt file paths as required) and include the same assets. When done, you’ll see a working REDAXO website whose output is identical to the prototype.

### Prototype

If you prefer to develop your frontend within REDAXO from now on, you can discard the prototype. __However, the intention of this project is to convince you to develop frontend _outside_ of REDAXO using the prototype.__ Why? Because it’s more efficient and comfortable, and also because it can be done by fellow workers who concentrate exclusively on frontend development and don’t require REDAXO and PHP experience.

In addition, the workflow is quite generic. So you could use it in the same way for other projects, for example in combination with other CMS, for static websites or for web apps. ✌️

### Production

To get the site ready for production, turn on `APP_ENV = production` and run Gulp. JavaScript and CSS are minimized, source maps are removed and images are compressed. In REDAXO you do not have to modify anything, because all assets keep their paths. However, you should consider a solution to control the caching, such as using timestamp parameters (example: `styles.css?v=1335939007`, see also this [solution for REDAXO](https://github.com/redaxo/redaxo/pull/976/commits/e1013defced264ffd9f6c24993acdd14791869bf)).

---

## Docker :whale: for the Backend

The front-end workflow is complete, so we can now optimize the development environment for the backend. For example with Docker, to enable a consistent setup for the team and to be independent of the local system environment of the computer.

In addition to the front-end Bimmelbam, this package also includes a __simplified version of the package [REDAXO with Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)__. The associated files and folders are:

    db/
    docker/
    .dockerignore
    docker-compose.yml

:point_right: _If you do not want to run Bimmelbam with Docker, you can simply delete these components if it gets too confusing for you._

We use Docker for Bimmelbam to provide a __server environment (Apache, PHP, MySQL)__. That’s pretty handy, because then your computer does not have to be set up for that, and besides, if you work in a team, you all end up with the same server environment, regardless of the operating system you’re using.

### Setup

__Edit `.env` file:__

    APP_HOST=http://localhost:20080

:point_right: _We use port `20080` for HTTP and `23306` for the database, so as not to conflict with the standard ports `80`/`3306`, if they are already in use. That makes our setup more robust. If you use several Docker projects, you have to keep in mind that all these ports use and therefore only one can run at a time, not several at the same time._

### Usage

If Docker is new to you: no problem, there is a [Instruction for Beginners](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#beginners-guide-rocket). :rocket:

__Start Docker-Container:__

    $ docker-compose up -d

__Open REDAXO in the browser:__

    http://localhost:3000

:point_right: _We still use the port 3000 to call in the browser, as defined in Bimmelbam (see [config.js](https://github.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/blob/d32f63df232f5273fd4b967a76e4cea5e90321fd/gulpfile.js/config.js#L14)). Bimmelbam uses a proxy pointing to port 20080, where Docker provides Apache. Do not let that confuse you._

### Differences between this setup and [REDAXO with Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker)

The Docker setup in this package is less comprehensive than the setup in the _parent package_ »REDAXO with Docker«. Here, Docker is only supposed to provide a server environment and does without additional features. These are the differences:

1. It does not automatically install a fresh REDAXO.
2. It also does not install demo sites.
3. It doesn’t include [Mailhog](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#use-mailhog) to send mails from REDAXO.
4. HTTPS/SSL is not configured.
5. The volume for the webroot is the folder `app/` while in the parent package it’s `html/`.

If you prefer to work with the large Docker setup here in Bimmelbam, you can easily copy the required files and folders from »REDAXO with Docker«. After that, you only need to change the webroot to `app/` in `docker-compose.yml`. Everything else can be retained and should work seamlessly in Bimmelbam as well.

### Further information, configuration and customization

You will find a lot of information in the package [REDAXO with Docker](https://github.com/FriendsOfREDAXO/redaxo-mit-docker), and also concerning these topics:

* [How to adapt for your projects](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#customize-for-your-project)
* [Configuration and tips](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#configuration-and-tips)
* [Guide for beginners](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#beginners-guide-rocket) 🚀

If you have questions or need help, feel free to contact us in Slack Chat! You will receive an invitation here: https://redaxo.org/slack/
