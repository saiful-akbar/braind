composer install

cp .env.example .env

php artisan key:generate
php artisan storage:link
php artisan optimize:clear

cp fix.php ./vendor/inertiajs/inertia-laravel/src/Response.php

npm ci