<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\OperasiAlatPemindai;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\OperasiAlatPemindaiExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\Templates\OperasiAlatPemindaiTemplateExport;
use App\Http\Requests\OperasiAlatPemindai\OperasiAlatPemindaiRequest;
use App\Http\Requests\OperasiAlatPemindai\StoreOperasiAlatPemindaiRequest;
use App\Http\Requests\OperasiAlatPemindai\ImportOperasiAlatPemindaiRequest;
use App\Http\Requests\OperasiAlatPemindai\ReportOperasiAlatPemindaiRequest;
use App\Http\Requests\OperasiAlatPemindai\UpdateOperasiAlatPemindaiRequest;
use Illuminate\Http\Response as HttpResponse;

class OperasiAlatPemindaiController extends Controller
{
    /**
     * Menampilkan halaman operasi alat pemindai
     *
     * @param OperasiAlatPemindaiRequest $request
     * @return Response
     */
    public function index(OperasiAlatPemindaiRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('operasi-alat-pemindai', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('operasi-alat-telekomunikasi');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'OperasiAlatPemindai/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data operasi alat pemindai baru ke database. 
     *
     * @param StoreOperasiAlatPemindaiRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOperasiAlatPemindaiRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat pemindai berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data operasi alat pemindai.
     *
     * @param UpdateOperasiAlatPemindaiRequest $request
     * @param OperasiAlatPemindai $operasi
     * @return RedirectResponse
     */
    public function update(UpdateOperasiAlatPemindaiRequest $request, OperasiAlatPemindai $operasi): RedirectResponse
    {
        $request->update();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat pemindai berhasil diubah.',
        ]);
    }

    /**
     * Hapus data operasi alat pemindai (soft deletes)
     *
     * @param Request $request
     * @param OperasiAlatPemindai $operasi
     * @return RedirectResponse
     */
    public function remove(Request $request, OperasiAlatPemindai $operasi): RedirectResponse
    {
        $operasi->delete();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat pemindai berhasil dihapus.',
        ]);
    }

    /**
     * Restore data operasi alat pemindai
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        OperasiAlatPemindai::onlyTrashed()->findOrFail($id)->restore();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat pemindai berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data operasi alat pemindai (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        OperasiAlatPemindai::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi alat pemindai dihapus selamanya.',
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
        $access = $this->getAccessByRoute('operasi-alat-pemindai');
        $fileName = "operasi_alat_pemindai_export.xlsx";

        return Excel::download(new OperasiAlatPemindaiExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_operasi_alat_pemindai.xlsx";

        return Excel::download(new OperasiAlatPemindaiTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportOperasiAlatPemindaiRequest $request
     * @return RedirectResponse
     */
    public function import(ImportOperasiAlatPemindaiRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('operasi-alat-pemindai', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Cetak laporan PDF.
     *
     * @param ReportOperasiAlatPemindaiRequest $request
     * @return HttpResponse
     */
    public function report(ReportOperasiAlatPemindaiRequest $request): HttpResponse
    {
        return $request->printPdf(
            access: $this->getAccessByRoute('operasi-alat-pemindai')
        );
    }
}
