FROM php:8.3-apache
RUN apt-get update && apt-get install -y git unzip libpq-dev && docker-php-ext-install pdo pdo_pgsql
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . /var/www/html
RUN composer install --no-interaction --prefer-dist --no-scripts || true
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
