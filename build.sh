composer install --optimize-autoloader --no-dev
php artisan optimize
php artisan route:clear
npm run build