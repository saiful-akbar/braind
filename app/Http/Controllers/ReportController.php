<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use App\Http\Requests\Report\RmsReportRequest;
use App\Http\Requests\Report\DpsoReportRequest;
use App\Http\Requests\Report\LpsoReportRequest;

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
     * Cetak PDF laporan pengoperasian parana operasi (LPSO)
     *
     * @param LpsoReportRequest $request
     * @return HttpResponse
     */
    public function lpso(LpsoReportRequest $request): HttpResponse
    {
        return $request->printPdf();
    }

    /**
     * Cetak PDF rekapitulasi monitoring sarana operasi (RMS)
     *
     * @param RmsReportRequest $request
     * @return HttpResponse
     */
    public function rms(RmsReportRequest $request): HttpResponse
    {
        return $request->printPdf();
    }

    /**
     * Cetak PDF daftar pemeliharaan sarana operasi (DPSO)
     *
     * @param RmsReportRequest $request
     * @return HttpResponse
     */
    public function dpso(DpsoReportRequest $request): HttpResponse
    {
        return $request->printPdf();
    }
}
