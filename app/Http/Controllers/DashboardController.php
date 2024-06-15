<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\PerusahaanExport;
use App\Models\PerusahaanHtHptl;
use App\Models\PerusahaanImport;
use App\Models\PerusahaanMmea;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard
     */
    public function index(): Response
    {
        return $this->render(
            component: 'Dashboard/index',
            access: $this->getAccessByRoute('kantor')
        );
    }

    /**
     * Mengambil tahun pada 4 tabel perusahaan
     * untuk select options 5 besar perusahaan
     *
     * @return JsonResponse
     */
    public function topFiveYears(): JsonResponse
    {
        $query = PerusahaanImport::select(DB::raw('YEAR(tanggal_input) AS tahun'))
            ->union(PerusahaanExport::select(DB::raw('YEAR(tanggal_input) AS tahun')))
            ->union(PerusahaanHtHptl::select(DB::raw('YEAR(tanggal_input) AS tahun')))
            ->union(PerusahaanMmea::select(DB::raw('YEAR(tanggal_input) AS tahun')))
            ->orderBy('tahun', 'desc')
            ->get();

        return $this->jsonResponse($query);
    }
}
