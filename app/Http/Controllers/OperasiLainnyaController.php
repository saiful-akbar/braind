<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\OperasiLainnya;
use Illuminate\Http\Request;
use App\Exports\OperasiLainnyaExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\OperasiLainnyaTemplateExport;
use App\Http\Requests\OperasiLainnya\OperasiLainnyaRequest;
use App\Http\Requests\OperasiLainnya\StoreOperasiLainnyaRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\OperasiLainnya\ImportOperasiLainnyaRequest;
use App\Http\Requests\OperasiLainnya\UpdateOperasiLainnyaRequest;

class OperasiLainnyaController extends Controller
{
    /**
     * Menampilkan halaman sarana operasi lainnya.
     *
     * @param OperasiLainnyaRequest $request
     * @return Response
     */
    public function index(OperasiLainnyaRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('operasi-lainnya', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('operasi-lainnya');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'OperasiLainnya/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data sarana operasi lainnya baru ke database. 
     *
     * @param StoreOperasiLainnyaRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOperasiLainnyaRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data sarana operasi lainnya.
     *
     * @param UpdateOperasiLainnyaRequest $request
     * @param OperasiLainnya $operasi
     * @return RedirectResponse
     */
    public function update(UpdateOperasiLainnyaRequest $request, OperasiLainnya $operasi): RedirectResponse
    {
        $request->update();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data oprasi berhasil diubah.',
        ]);
    }

    /**
     * Hapus data sarana operasi lainnya (soft deletes)
     *
     * @param Request $request
     * @param OperasiLainnya $operasi
     * @return RedirectResponse
     */
    public function remove(Request $request, OperasiLainnya $operasi): RedirectResponse
    {
        $operasi->delete();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi lainnya berhasil dihapus.',
        ]);
    }

    /**
     * Restore data sarana operasi lainnya
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        OperasiLainnya::onlyTrashed()->findOrFail($id)->restore();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi lainnya berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data sarana operasi lainnya (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        OperasiLainnya::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi lainnya dihapus selamanya.',
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
        $access = $this->getAccessByRoute('operasi-lainnya');
        $fileName = "operasi_lainnya_export.xlsx";

        return Excel::download(new OperasiLainnyaExport($request, $access), $fileName);
    }

    /**
     * Download template untuk import excel
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_operasi_lainnya.xlsx";

        return Excel::download(new OperasiLainnyaTemplateExport, $fileName);
    }

    /**
     * Import excel ke database.
     *
     * @param ImportOperasiLainnyaRequest $request
     * @return RedirectResponse
     */
    public function import(ImportOperasiLainnyaRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('operasi-lainnya', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
