<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PerusahaanExport\PerusahaanExportRequest;
use App\Http\Requests\PerusahaanExport\StorePerusahaanExportRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class PerusahaanExportController extends Controller
{
    /**
     * Menampilkan halaman perusahaan export
     *
     * @param PerusahaanExportRequest $request
     * @return Response
     */
    public function index(PerusahaanExportRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('perusahaan-export', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan-export');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'PerusahaanExport/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data perusahaan export baru ke database. 
     *
     * @param StorePerusahaanExportRequest $request
     * @return RedirectResponse
     */
    public function store(StorePerusahaanExportRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.',
        ]);
    }
}
