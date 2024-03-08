<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\PerusahaanExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\PerusahaanExportExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\Templates\PerusahaanExportTemplateExport;
use App\Http\Requests\PerusahaanExport\PerusahaanExportRequest;
use App\Http\Requests\PerusahaanExport\StorePerusahaanExportRequest;
use App\Http\Requests\PerusahaanExport\ImportPerusahaanExportRequest;
use App\Http\Requests\PerusahaanExport\TopFivePerusahaanExportRequest;
use App\Http\Requests\PerusahaanExport\UpdatePerusahaanExportRequest;
use Illuminate\Http\JsonResponse;

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

    /**
     * Perbarui data perusahaan export.
     *
     * @param UpdatePerusahaanExportRequest $request
     * @param PerusahaanExport $perusahaan
     * @return RedirectResponse
     */
    public function update(UpdatePerusahaanExportRequest $request, PerusahaanExport $perusahaan): RedirectResponse
    {
        $request->update();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil diubah.',
        ]);
    }

    /**
     * Hapus data perusahaan export (soft deletes)
     *
     * @param Request $request
     * @param PerusahaanExport $perusahaan
     * @return RedirectResponse
     */
    public function remove(Request $request, PerusahaanExport $perusahaan): RedirectResponse
    {
        $perusahaan->delete();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus.',
        ]);
    }

    /**
     * Restore data perusahaan export
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        PerusahaanExport::onlyTrashed()->findOrFail($id)->restore();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data perusahaan export (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        PerusahaanExport::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus selamanya.',
        ]);
    }

    /**
     * Export excel
     *
     * @param Request $request
     * @return BinaryFileResponse
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('perusahaan-export');
        $fileName = "perusahaan_export_export.xlsx";

        return Excel::download(new PerusahaanExportExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_perusahaan_export.xlsx";

        return Excel::download(new PerusahaanExportTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPerusahaanExportRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPerusahaanExportRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('perusahaan-export', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Ambil data 5 besar perusahaan export.
     *
     * @param TopFivePerusahaanExportRequest $request
     * @return JsonResponse
     */
    public function topFive(TopFivePerusahaanExportRequest $request): JsonResponse
    {
        return $this->jsonResponse(data: $request->read());
    }
}
