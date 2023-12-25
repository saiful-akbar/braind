<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Inertia\Response;
use App\Models\MenuUser;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Render komponen
     */
    protected function render(string $component, mixed $data = null, ?MenuUser $access = null): Response
    {
        return inertia($component, compact('data', 'access'));
    }

    /**
     * Render komponen dengan pagination
     */
    protected function renderPaginate(string $component, LengthAwarePaginator $paginator, ?MenuUser $access = null): Response
    {
        return inertia($component, [
            'access' => $access,
            'data' => $paginator->items(),
            'pagination' => [
                'page' => $this->getCurrentPage($paginator),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
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
    private function getCurrentPage(LengthAwarePaginator $paginator,): int
    {
        if ($paginator->currentPage() > $paginator->lastPage()) {
            return $paginator->lastPage();
        }

        return $paginator->currentPage();
    }

    /**
     * Ambil akses user terhadap menu berdasarkan route.
     */
    protected function getAccessByRoute(string $route): ?MenuUser
    {
        return access()->firstWhere('route', $route)?->pivot;
    }

    /**
     * Json response
     */
    protected function jsonResponse(
        array|object $data = [],
        string $message = 'success',
        int $code = 200
    ): JsonResponse {
        return response()->json(compact('data', 'message', 'code'), $code);
    }
}
