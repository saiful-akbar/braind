composer install
cp .env.example .env
php artisan key:generate
php artisan optimize:clear

# Buat ulang folder storage pada public
rm -rf public/storage
php artisan storage:link

# Perbaikan file Response.php
cp FixInertiaResponse.php ./vendor/inertiajs/inertia-laravel/src/Response.php

# Install paket NPM
npm install
