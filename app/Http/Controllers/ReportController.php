<?php

namespace App\Http\Controllers;

use App\Http\Requests\Report\LpsoReportRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Menampilkan halaman report sarana operasi.
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render(
            component: 'Report/index',
        );
    }

    /**
     * Laporan Pengoperasian Sarana Operasi (LPSO)
     *
     * @param LpsoReportRequest $request
     * @return HttpResponse
     */
    public function lpso(LpsoReportRequest $request): mixed
    {
        return $request->printPdf();
    }
}
