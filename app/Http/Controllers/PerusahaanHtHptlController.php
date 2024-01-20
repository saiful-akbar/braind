<?php

namespace App\Http\Controllers;

use App\Exports\PerusahaanHtHptlExport;
use App\Exports\Templates\PerusahaanHtHptlTemplateExport;
use Inertia\Response;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;
use App\Http\Requests\Perusahaan\HtHptl\HtHptlRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\Perusahaan\HtHptl\StoreHtHptlRequest;
use App\Imports\PerusahaanHtHptlImport;

class PerusahaanHtHptlController extends Controller
{
    /**
     * Menampilkan halaman perusahaan cukai HT + HPTL
     *
     * @param HtHptlRequest $request
     * @return Response|RedirectResponse
     */
    public function index(HtHptlRequest $request): Response|RedirectResponse
    {
        // jika tidak ada query string start_period dan end_period
        // redirect dengan menmabhkan query string tersebut.
        if (is_null($request->query('start_period')) || is_null($request->query('end_period'))) {
            return redirect()->route('perusahaan.hthptl', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan.hthptl');
        $data = $request->paginate(access: $access);

        return $this->renderPaginate(
            component: 'Perusahaan/HtHptl/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Tambah data perusahaan cukai HT + HPTL ke database.
     */
    public function store(StoreHtHptlRequest $request): RedirectResponse
    {
        $request->insert();
        return redirect()->route('perusahaan.hthptl', $request->query());
    }

    /**
     * Export excel
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('sbp');
        $name = 'perusahaan_cukai_ht_hptl.xlsx';

        return Excel::download(new PerusahaanHtHptlExport($request, $access), $name);
    }

    /**
     * Download template untuk import excel
     */
    public function exportTemplate(): BinaryFileResponse
    {
        $name = 'template_impor_perusahaan_cukai_ht_hptl.xlsx';
        return Excel::download(new PerusahaanHtHptlTemplateExport(), $name);
    }

    /**
     * Insert data dengan import excel
     */
    public function import(Request $request): RedirectResponse
    {
        // validasi request
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:10000'
        ]);

        // Jalankan proses insert data dari file yang di import
        Excel::import(new PerusahaanHtHptlImport, $request->file('file'));

        // response
        return to_route('perusahaan.hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
