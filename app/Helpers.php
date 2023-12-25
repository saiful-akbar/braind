<?php

use App\Models\User;
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

if (!function_exists('menu_access')) {

    /**
     * Helper untuk mengambil data akses menu yang
     * dimiliki user yang sedang login
     */
    function menu(): Collection
    {
        return collect(session('menu'));
    }
}

if (!function_exists('access')) {

    /**
     * Ambil akses user pada menu
     */
    function access(): Collection
    {
        return collect(session('access'));
    }
}
