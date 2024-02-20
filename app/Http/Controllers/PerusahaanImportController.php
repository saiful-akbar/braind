<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PerusahaanImportController extends Controller
{
    /**
     * Menampilkan halaman perusahaan import.
     *
     * @return RedirectResponse
     */
    public function index(): RedirectResponse
    {
        return to_route('dashboard');
    }
}
