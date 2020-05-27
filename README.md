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

1. Install __Node__ (>= 10), if not already available. Can be downloaded as a package directly from the website: [https://nodejs.org](https://nodejs.org)
2. Install __Yarn__ (1.x) if not already available ([Manual](https://yarnpkg.com/en/docs/install)).
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

&nbsp;

---

&nbsp;

## Docker 🐳 for the Backend?

The front-end workflow is complete, so we can now optimize the development environment for the backend. For example with Docker, to enable a consistent setup for the team and to be independent of the local system environment of the computer.

We can make use of the [REDAXO docker images](https://github.com/FriendsOfREDAXO/docker-redaxo/) provided by Friends Of REDAXO to easily set up a local development environment.

### Setup

Frontend workflow is the same as above, since we do not install Node, Yarn and Gulp within the Docker container, but continue to use it on your local machine. However, with Docker, you don’t need to follow step 5, the localhost.

__Edit `.env` file__

Update the `APP_HOST`:

    APP_HOST=http://localhost:20080

👉 _We use port `20080` for HTTP to avoid conflicts with the default port 80. That makes our setup more robust. If you use several Docker projects, you have to keep in mind that all these ports use and therefore only one can run at a time, not several at the same time._

__Check the `docker-compose.yml` file:__

All we need for our local Docker setup is the one `docker-compose.yml` file in our project root folder. It contains the Docker configuration. For easiest setup make sure to use the file coming with Bimmelbam.  
_Hint: If you want to use one of the [recipes provided by docker-redaxo](https://github.com/FriendsOfREDAXO/docker-redaxo/tree/master/recipes), you’ll need to edit ports (`20080` instead of `80`) and folders (`app` instead of `html`) according to bimmelbam’s requirements._

Afterwards, just start it up:

### Usage

__Start Docker container:__

    $ docker-compose up -d

__Open REDAXO in the browser:__

    http://localhost:3000

👉 _We still use the port 3000 to call in the browser, as defined in Bimmelbam (see [config.js](https://github.com/FriendsOfREDAXO/redaxo-mit-bimmelbam/blob/d32f63df232f5273fd4b967a76e4cea5e90321fd/gulpfile.js/config.js#L14)). Bimmelbam uses a proxy pointing to port 20080, where Docker provides Apache. Do not let that confuse you._

__Stop Docker container:__

    $ docker-compose stop

### Get help and find further information

If Docker is new to you, have a look at [Instruction for Beginners](https://github.com/FriendsOfREDAXO/redaxo-mit-docker#beginners-guide-rocket). 🚀

If you want to customize your setup, you might be interested to read through the [Recipes](https://github.com/FriendsOfREDAXO/docker-redaxo/tree/master/recipes) within our Docker-REDAXO-Repository.

If you have questions or need help, feel free to contact us in Slack Chat! You will receive an invitation here: [https://redaxo.org/slack/](https://redaxo.org/slack/).
