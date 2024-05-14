composer install --optimize-autoloader --no-dev

php artisan event:cache
php artisan view:cache
php artisan config:cache

npm run build