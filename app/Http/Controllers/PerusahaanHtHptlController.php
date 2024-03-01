<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\PerusahaanHtHptlExport;
use App\Imports\PerusahaanHtHptlImport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\Templates\PerusahaanHtHptlTemplateExport;
use App\Http\Requests\PerusahaanHtHptl\PerusahaanHtHptlRequest;
use App\Http\Requests\PerusahaanHtHptl\StorePerusahaanHtHptlRequest;
use App\Http\Requests\PerusahaanHtHptl\UpdatePerusahaanHtHptlRequest;
use App\Models\PerusahaanHtHptl;

class PerusahaanHtHptlController extends Controller
{
    /**
     * Menampilkan halaman perusahaan cukai HT + HPTL
     */
    public function index(PerusahaanHtHptlRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period
        // reqdirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('perusahaan-hthptl', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan-hthptl');
        $data = $request->paginate(access: $access);

        return $this->renderPaginate(
            component: 'PerusahaanHtHptl/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Tambah data perusahaan cukai HT + HPTL ke database.
     */
    public function store(StorePerusahaanHtHptlRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.'
        ]);
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
    public function downloadTemplate(): BinaryFileResponse
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
            'file' => 'required|mimes:xlsx,xls|max:1024'
        ]);

        // Jalankan proses insert data dari file yang di import
        Excel::import(new PerusahaanHtHptlImport, $request->file('file'));

        // response
        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Update data
     */
    public function update(UpdatePerusahaanHtHptlRequest $request, string $id): RedirectResponse
    {
        $request->update();

        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil diperbarui.'
        ]);
    }

    /**
     * Remove data (soft delete)
     */
    public function remove(Request $request, string $id): RedirectResponse
    {
        PerusahaanHtHptl::findOrFail($id)->delete();

        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus.'
        ]);
    }

    /**
     * Hapus data perusahaan selamanya
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        PerusahaanHtHptl::onlyTrashed()
            ->findOrFail($id)
            ->forceDelete();

        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus selamanya.'
        ]);
    }

    /**
     * Mengambalikan atau memulihkan data perusahaan yang telah dihapus
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        PerusahaanHtHptl::onlyTrashed()
            ->findOrFail($id)
            ->restore();

        return to_route('perusahaan-hthptl', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dipulihkan.'
        ]);
    }
}
