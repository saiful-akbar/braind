<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\OperasiKapalPatroli;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\OperasiKapalPatroliExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\Templates\OperasiKapalPatroliTemplateExport;
use App\Http\Requests\OperasiKapalPatroli\OperasiKapalPatroliRequest;
use App\Http\Requests\OperasiKapalPatroli\StoreOperasiKapalPatroliRequest;
use App\Http\Requests\OperasiKapalPatroli\ImportOperasiKapalPatroliRequest;
use App\Http\Requests\OperasiKapalPatroli\ReportOperasiKapalPatroliRequest;
use App\Http\Requests\OperasiKapalPatroli\UpdateOperasiKapalPatroliRequest;
use Illuminate\Http\Response as HttpResponse;

class OperasiKapalPatroliController extends Controller
{
    /**
     * Menampilkan halaman sarana operasi kapal patroli.
     *
     * @param OperasiKapalPatroliRequest $request
     * @return Response
     */
    public function index(OperasiKapalPatroliRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('operasi-kapal-patroli', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('operasi-kapal-patroli');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'OperasiKapalPatroli/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data sarana operasi kapal patroli baru ke database. 
     *
     * @param StoreOperasiKapalPatroliRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOperasiKapalPatroliRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi kapal patroli berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data sarana operasi kapal patroli.
     *
     * @param UpdateOperasiKapalPatroliRequest $request
     * @param OperasiKapalPatroli $operasi
     * @return RedirectResponse
     */
    public function update(UpdateOperasiKapalPatroliRequest $request, OperasiKapalPatroli $operasi): RedirectResponse
    {
        $request->update();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data oprasi kapal patroli berhasil diubah.',
        ]);
    }

    /**
     * Hapus data sarana operasi kapal patroli (soft deletes)
     *
     * @param Request $request
     * @param OperasiKapalPatroli $operasi
     * @return RedirectResponse
     */
    public function remove(Request $request, OperasiKapalPatroli $operasi): RedirectResponse
    {
        $operasi->delete();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi kapal patroli berhasil dihapus.',
        ]);
    }

    /**
     * Restore data sarana operasi kapal patroli
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        OperasiKapalPatroli::onlyTrashed()->findOrFail($id)->restore();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi kapal patroli berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data sarana operasi kapal patroli (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        OperasiKapalPatroli::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi kapal patroli dihapus selamanya.',
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
        $access = $this->getAccessByRoute('operasi-kapal-patroli');
        $fileName = "operasi_kapal_patroli_export.xlsx";

        return Excel::download(new OperasiKapalPatroliExport($request, $access), $fileName);
    }

    /**
     * Download template untuk import excel
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_operasi_kapal_patroli.xlsx";

        return Excel::download(new OperasiKapalPatroliTemplateExport, $fileName);
    }

    /**
     * Import excel ke database.
     *
     * @param ImportOperasiKapalPatroliRequest $request
     * @return RedirectResponse
     */
    public function import(ImportOperasiKapalPatroliRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('operasi-kapal-patroli', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Cetak report PDF
     *
     * @param ReportOperasiKapalPatroliRequest $request
     * @return HttpResponse
     */
    public function report(ReportOperasiKapalPatroliRequest $request): HttpResponse
    {
        return $request->printPdf(
            access: $this->getAccessByRoute('operasi-kapal-patroli'),
        );
    }
}
