# Usa la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Copia los archivos de tu proyecto al directorio del servidor
COPY . /var/www/html/

# Expone el puerto 80 para el tráfico web
EXPOSE 80
