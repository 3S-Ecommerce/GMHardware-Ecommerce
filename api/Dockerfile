# Usamos a imagem oficial do PHP com Apache
FROM php:8.2-apache

# 1. Instalar dependências do sistema e drivers do PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Ativar o módulo de reescrita do Apache (essencial para o roteamento do Laravel)
RUN a2enmod rewrite

# 3. Mudar a raiz do servidor para a pasta /public do Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Copiar os arquivos do seu projeto para dentro do container
COPY . /var/www/html

# 5. Instalar o Composer (gerenciador de pacotes do PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# 6. Dar permissão para as pastas de cache e logs (importante para não dar erro 500)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# O Render vai usar a porta 80 por padrão
EXPOSE 80