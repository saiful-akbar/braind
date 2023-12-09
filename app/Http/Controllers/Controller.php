<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Render komponen
     */
    protected function render(string $component, ?array $data = null): Response
    {
        return inertia($component, compact('data'));
    }

    /**
     * Render komponen dengan pagination
     */
    protected function renderPaginate(string $component, LengthAwarePaginator $paginator): Response
    {
        return inertia($component, [
            'data' => $paginator->items(),
            'pagination' => [
                'page' => $this->getCurrentPage($paginator->currentPage(), $paginator->lastPage()),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'first_page' => 1,
                'last_page' => $paginator->lastPage(),
            ]
        ]);
    }

    /**
     * Mengambil nomor halaman saat ini untuk pagination.
     */
    private function getCurrentPage(int $currentPage, int $lastPage): int
    {
        if ($currentPage > $lastPage) return $lastPage;
        return $currentPage;
    }
}
