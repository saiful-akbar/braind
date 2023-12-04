composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
cp .fixed vendor/inertiajs/inertia-laravel/src/Response.php
npm install