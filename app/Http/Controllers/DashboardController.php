<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard
     */
    public function index(): Response
    {
        return $this->render('Dashboard/index');
    }
}
