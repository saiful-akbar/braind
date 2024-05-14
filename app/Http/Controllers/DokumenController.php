<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class DokumenController extends Controller
{
    /**
     * Menampilkan halaman utaman dokumen.
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render(
            component: 'Dokumen/index',
            access: $this->getAccessByRoute('dokumen')
        );
    }
}
