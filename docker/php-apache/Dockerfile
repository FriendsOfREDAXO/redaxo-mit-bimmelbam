FROM php:7.2-apache

# copy custom configs
COPY php.ini /usr/local/etc/php/
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# enable apache modules
RUN a2enmod expires headers rewrite ssl

# install extensions
RUN apt-get update -q && apt-get install -qy \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libzip-dev \
        ssmtp \
        unzip \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip
