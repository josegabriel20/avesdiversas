FROM php:8.2-apache

# 1. Instala utilidades necesarias y extensiones para que Composer funcione
RUN apt-get update && apt-get install -y git unzip zip

# 2. Copia Composer oficial dentro de tu contenedor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Copia los archivos de tu proyecto al servidor Apache
WORKDIR /var/www/html
COPY . .

# 4. Descarga e instala automáticamente la librería phpdotenv
RUN composer require vlucas/phpdotenv

# Exponer el puerto estándar de Apache
EXPOSE 80

