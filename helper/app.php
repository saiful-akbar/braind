<?php

use App\Models\User;
use App\Models\MenuGroup;
use Illuminate\Database\Eloquent\Collection;

if (!function_exists('user')) {

    /**
     * Helper untuk mengambil data user yang sedang login
     */
    function user(): ?User
    {
        return auth()->user();
    }
}

if (!function_exists('menu_access')) {

    /**
     * Helper untuk mengambil data akses menu yang
     * dimiliki user yang sedang login
     */
    function menu_access(): Collection
    {
        return MenuGroup::with([
            'childrens' => function ($query): void {
                $query->whereRelation('usersWithReadAccess', 'user_id', '=', user()?->id)
                    ->leftJoin('menu_user', 'menus.id', '=', 'menu_user.menu_id')
                    ->orderBy('menus.name', 'asc')
                    ->select([
                        'menus.*',
                        'menu_user.create',
                        'menu_user.read',
                        'menu_user.update',
                        'menu_user.delete',
                        'menu_user.destroy'
                    ]);
            }
        ])
            ->whereRelation('childrens.usersWithReadAccess', 'user_id', '=', user()?->id)
            ->orderBy('menu_groups.name', 'asc')
            ->get();
    }
}
