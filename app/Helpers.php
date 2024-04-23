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

if (!function_exists('menu')) {

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
