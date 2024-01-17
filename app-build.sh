composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan view:cache
php artisan event:cache
npm run build