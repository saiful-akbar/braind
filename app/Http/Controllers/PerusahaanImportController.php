<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\PerusahaanImport;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\PerusahaanImportExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\Templates\PerusahaanImportTemplateExport;
use App\Http\Requests\PerusahaanImport\PerusahaanImportRequest;
use App\Http\Requests\PerusahaanImport\ReportPerusahaanImportRequest;
use App\Http\Requests\PerusahaanImport\StorePerusahaanImportRequest;
use App\Http\Requests\PerusahaanImport\TopFivePerusahaanImportRequest;
use App\Http\Requests\PerusahaanImport\ImportPerusahaanImportRequest;
use App\Http\Requests\PerusahaanImport\UpdatePerusahaanImportRequest;
use Illuminate\Http\Response as HttpResponse;

class PerusahaanImportController extends Controller
{
    /**
     * Menampilkan halaman perusahaan export
     *
     * @param PerusahaanImportRequest $request
     * @return Response
     */
    public function index(PerusahaanImportRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini.
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('perusahaan-import', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan-import');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'PerusahaanImport/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data perusahaan export baru ke database.
     *
     * @param StorePerusahaanImportRequest $request
     * @return RedirectResponse
     */
    public function store(StorePerusahaanImportRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan-import', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data perusahaan export.
     *
     * @param UpdatePerusahaanImportRequest $request
     * @param PerusahaanImport $perusahaan
     * @return RedirectResponse
     */
    public function update(UpdatePerusahaanImportRequest $request, PerusahaanImport $perusahaan): RedirectResponse
    {
        $request->update();

        return to_route('perusahaan-import', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil diubah.',
        ]);
    }

    /**
     * Hapus data perusahaan export (soft deletes)
     *
     * @param Request $request
     * @param PerusahaanImport $perusahaan
     * @return RedirectResponse
     */
    public function remove(Request $request, PerusahaanImport $perusahaan): RedirectResponse
    {
        $perusahaan->delete();

        return to_route('perusahaan-import', $request->query())->with([
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
        PerusahaanImport::onlyTrashed()->findOrFail($id)->restore();

        return to_route('perusahaan-import', $request->query())->with([
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
        PerusahaanImport::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('perusahaan-import', $request->query())->with([
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
        $access = $this->getAccessByRoute('perusahaan-import');
        $fileName = "perusahaan_import_export.xlsx";

        return Excel::download(new PerusahaanImportExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_perusahaan_export.xlsx";

        return Excel::download(new PerusahaanImportTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPerusahaanImportRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPerusahaanImportRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('perusahaan-import', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Ambil data 5 besar perusahaan import
     *
     * @param TopFivePerusahaanImportRequest $request
     * @return JsonResponse
     */
    public function topFive(TopFivePerusahaanImportRequest $request): JsonResponse
    {
        return $this->jsonResponse(
            data: $request->read(),
        );
    }

    /**
     * Cetak report PDF Perusahaan import
     *
     * @param ReportPerusahaanImportRequest $request
     * @return HttpResponse
     */
    public function report(ReportPerusahaanImportRequest $request): HttpResponse
    {
        return $request->printPdf(
            access: $this->getAccessByRoute('perusahaan-import')
        );
    }
}
