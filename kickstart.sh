#!/bin/bash
# kickstarter

REDAXO_VERSION=5.4.0
REDAXO_SHA=bdf19a343d91bb23ff5f8a7644af54c643bebd2b

# ANY FILES
read -p "Do your want clear your bimmelbam? [yes]:" answer
case "$answer" in
        Yes|yes|Y|y|"")
            # README - remove all readme files
            find . -type f -name '*.md' -exec rm {} +

            # IMAGES - remove all images and SVG
            find . -type f \( -iname "*.jpg" -o -name "*.jpeg" -o -iname "*svg" \) -exec rm {} +

            # APP - remove all files from app path
            rm -rf ./app/*

            # SASS - remove a set of .scss files
            rm -f ./source/styles/components/{carousel,footer,header,icon}.scss

            echo "All README.md, *.images, app/* and any *.scss files was successful removed"

            # rename env
            mv .env.example .env

            echo ".env.example was renamed to .env"
        ;;
        No|no|N|n)
            echo "Canceled"
            exit 1
        ;;
        *)
            echo "Something was wrong"
            exit 1
        ;;
esac

# .GIT FILES
read -p "Do your want remove .git? [yes]:" answer
case "$answer" in
        Yes|yes|Y|y|"")
            # GIT - remove .git from the fos repository
            rm -rf ./.git

            echo ".git was successful removed"
        ;;
        No|no|N|n)
            echo "Canceled"
        ;;
        *)
            echo "Something was wrong"
            exit 1
        ;;
esac

# NUNJUCK TEMPLATES
read -p "Do you want remove all nunjucks templates? [yes]:" answer
case "$answer" in
        Yes|yes|Y|y|"")
            # TEMPLATES - remove templates
            rm -rf ./source/templates

            # remove templates and browser sync from gulpfile.js config.js
            php -r "file_put_contents(\"./gulpfile.js/config.js\",preg_replace(array(\"/\'browserSync\': \{[^\}]+\},/\",\"/\'templates\': \{[^\}]+\}[^\}]+},/\",\"/\'templates',/\",\"/\{'templates'[^\}]+\}/\",\"/\/\/ Templates/\",\"/'templates',/\"), \"\", file_get_contents(\"./gulpfile.js/config.js\")));"

            # remove templates and browser sync from gulpfile.js index.js
            php -r "file_put_contents(\"./gulpfile.js/index.js\",preg_replace(array(\"/'browserSync',/\",\"/'templates',/\"), \"\", file_get_contents(\"./gulpfile.js/index.js\")));"

            # remove host var from .env
            php -r "file_put_contents(\"./.env\",preg_replace(\"/(APP_HOST=)([^*\n]+\n)/\", \"\", file_get_contents(\"./.env\")));"

            # remove config in watcher
            php -r "file_put_contents(\"./gulpfile.js/tasks/watch.js\", preg_replace(array(\"/(open:)([^*\n]+)/\",\"/(message:)([^*\n]+)/\",\"/.*?config.browserSync.port .*/\"), array(\"\",\"message: 'GO GO GO!',\",\"\"), file_get_contents(\"./gulpfile.js/tasks/watch.js\")));"

            # remove templates task
            rm -f ./gulpfile.js/tasks/{templates,browserSync}.js

            echo "All nunjucks template files, the template watcher and template browser sync was successful removed"

        ;;
        No|no|N|n)
            echo "Nunjucks template deletion was canceled"
        ;;
        *)
            echo "Something was wrong"
            exit 1
        ;;
esac

# LOAD REDAXO
read -p "Do you want load the latest redaxo 5.4.0? [yes]:" answer
case "$answer" in
        Yes|yes|Y|y|"")
            # thanks @schuer
            # https://github.com/FriendsOfREDAXO/redaxo-mit-docker/blob/master/docker/php-apache/Dockerfile#L29-L35
            set -e;
            mkdir tmp/
            mkdir ./tmp/redaxo;
            curl -Ls -o ./tmp/redaxo/redaxo_${REDAXO_VERSION}.zip https://github.com/redaxo/redaxo/releases/download/${REDAXO_VERSION}/redaxo_${REDAXO_VERSION}.zip;
            echo "${REDAXO_SHA} *./tmp/redaxo/redaxo_${REDAXO_VERSION}.zip" | shasum -c -a 256;
            unzip -oq ./tmp/redaxo/redaxo_${REDAXO_VERSION}.zip -d ./app;
            rm -rf ./tmp

            echo "Redaxo 5.4.0 was sussessful loaded"
        ;;
        No|no|N|n)
            echo "Canceled"
        ;;
        *)
            echo "Something was wrong"
            exit 1
        ;;
esac

yarn
