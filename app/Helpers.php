<?php

use App\Models\User;
use App\Models\MenuGroup;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

if (!function_exists('user')) {

    /**
     * Helper untuk mengambil data user yang sedang login
     */
    function user(): ?User
    {
        return auth()->user();
    }
}

if (!function_exists('menu')) {

    /**
     * Helper untuk mengambil data akses menu yang
     * dimiliki user yang sedang login
     */
    function menu(): Collection
    {
        // return collect(session('menu'));

        $menu = MenuGroup::with([
            'subMenu' => function (HasMany $query): void {
                $columns = [
                    'menu.*',
                    'menu_user.create',
                    'menu_user.read',
                    'menu_user.update',
                    'menu_user.remove',
                    'menu_user.destroy',
                ];

                $query->select($columns)
                    ->join('menu_user', 'menu.id', '=', 'menu_user.menu_id')
                    ->where('menu_user.user_id', user()?->id)
                    ->where('menu_user.read', 1);
            }
        ])
            ->whereRelation('subMenu.userWithReadAccess', 'user_id', '=', user()?->id)
            ->get();

        return collect($menu);
    }
}

if (!function_exists('access')) {

    /**
     * Ambil akses user pada menu
     */
    function access(): Collection
    {
        // return collect(session('access'));

        return collect(user()?->menu);
    }
}

if (!function_exists('storage_url')) {

    /**
     * Helper untuk membuat storage url
     *
     * @param string $path
     * @param boolean|null $secure
     * @return string
     */
    function storage_url(string $path = '/', ?bool $secure = null): string
    {
        return asset("storage/" . ltrim($path, '/'), $secure);
    }
}

if (!function_exists('is_empty')) {

    /**
     * Helper untuk memriksa apakah data bernilai kosong atau tidak.
     *
     * @param string|integer|float $value
     * @return string|integer|float
     */
    function is_empty(string|int|float $value): string|int|float
    {
        return empty($value) ? '-' : $value;
    }
}
