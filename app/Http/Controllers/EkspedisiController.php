<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class EkspedisiController extends Controller
{
    /**
     * Menampilkan halaman master ekspedisi.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $access = $this->getAccessByRoute('ekspedisi');

        return inertia('Ekspedisi/index', compact('access'));
    }
}
