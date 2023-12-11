<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MenuAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $route, string $access): Response
    {
        // ambil menu akses pada session berdasarkan $route
        $menu = access()->firstWhere('route', $route);

        // Jika user memiliki akses lanjutkan proses
        if ($menu->pivot[$access]) {
            return $next($request);
        }

        // Jika tidak memiliki akses alihkan kelahaman 403|forbidden
        abort(403);
    }
}
