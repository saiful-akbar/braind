<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\MenuGroup;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard
     */
    public function index()
    {

        return $this->render('Dashboard/index');
    }
}
