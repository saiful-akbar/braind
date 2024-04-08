<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class PetaKerawananController extends Controller
{
    /**
     * Menampilkan halaman peta kerawanan.
     *
     * @return Response
     */
    public function index(): Response
    {
        return inertia('PetaKerawanan/index');
    }
}
