composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan config:clear
php artisan view:clear
php artisan event:clear
cp .fixed vendor/inertiajs/inertia-laravel/src/Response.php
npm install