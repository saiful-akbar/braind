<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Penerimaan;
use Illuminate\Http\Request;
use App\Exports\PenerimaanExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\PenerimaanTemplateExport;
use App\Http\Requests\Penerimaan\PenerimaanRequest;
use App\Http\Requests\Penerimaan\StorePenerimaanRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\Penerimaan\ImportPenerimaanRequest;
use App\Http\Requests\Penerimaan\UpdatePenerimaanRequest;

class PenerimaanController extends Controller
{
    /**
     * Menampilkan halaman penerimaan
     *
     * @param PenerimaanRequest $request
     * @return Response
     */
    public function index(PenerimaanRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('penerimaan', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('penerimaan');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'Penerimaan/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data penerimaan baru ke database. 
     *
     * @param StorePenerimaanRequest $request
     * @return RedirectResponse
     */
    public function store(StorePenerimaanRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penerimaan berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data penerimaan.
     *
     * @param UpdatePenerimaanRequest $request
     * @param Penerimaan $penerimaan
     * @return RedirectResponse
     */
    public function update(UpdatePenerimaanRequest $request, Penerimaan $penerimaan): RedirectResponse
    {
        $request->update();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penerimaan berhasil diubah.',
        ]);
    }

    /**
     * Hapus data penerimaan (soft deletes)
     *
     * @param Request $request
     * @param Penerimaan $penerimaan
     * @return RedirectResponse
     */
    public function remove(Request $request, Penerimaan $penerimaan): RedirectResponse
    {
        $penerimaan->delete();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penerimaan berhasil dihapus.',
        ]);
    }

    /**
     * Restore data penerimaan
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        Penerimaan::onlyTrashed()->findOrFail($id)->restore();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penerimaan berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data penerimaan (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        Penerimaan::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penerimaan berhasil dihapus selamanya.',
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
        $access = $this->getAccessByRoute('penerimaan');
        $fileName = "penerimaan_export.xlsx";

        return Excel::download(new PenerimaanExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_penerimaan.xlsx";

        return Excel::download(new PenerimaanTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPenerimaanRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPenerimaanRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('penerimaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
