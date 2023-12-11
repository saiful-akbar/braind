<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Inertia\Response;
use App\Models\MenuUser;
use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Render komponen
     */
    protected function render(string $component, ?array $data = null, ?Collection $access = null): Response
    {
        return inertia($component, compact('data', 'access'));
    }

    /**
     * Render komponen dengan pagination
     */
    protected function renderPaginate(
        string $component,
        LengthAwarePaginator $paginator,
        MenuUser|Menu|null $access = null
    ): Response {
        return inertia($component, [
            'access' => fn () => $access,
            'data' => fn () => $paginator->items(),
            'pagination' => fn () => [
                'page' => $this->getCurrentPage($paginator->currentPage(), $paginator->lastPage()),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'first_page' => 1,
                'last_page' => $paginator->lastPage(),
                'count' => $paginator->count(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
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

    /**
     * Ambil akses user terhadap menu berdasarkan route.
     */
    protected function getAccessByRoute(string $route): ?MenuUser
    {
        return access()->firstWhere('route', $route)?->pivot;
    }
}
