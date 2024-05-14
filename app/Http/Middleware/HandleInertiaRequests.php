<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Models\MenuGroup;
use Illuminate\Database\Eloquent\Collection;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => fn () => [
                'user' => $request->user()?->load('kantor'),
                'menu' => menu()
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'app' => fn () => [
                'csrf' => csrf_token(),
                'url' => [
                    'params' => (object) $request->all(),
                ],
            ],
            'flash' => fn () => [
                'status' => $request->session()->get('flash.status'),
                'message' => $request->session()->get('flash.message'),
            ]
        ];
    }
}
