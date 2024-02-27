<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Penindakan;
use Illuminate\Http\Request;
use App\Exports\PenindakanExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\PenindakanTemplateExport;
use App\Http\Requests\Penindakan\PenindakanRequest;
use App\Http\Requests\Penindakan\StorePenindakanRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\Penindakan\ImportPenindakanRequest;
use App\Http\Requests\Penindakan\UpdatePenindakanRequest;

class PenindakanController extends Controller
{
    /**
     * Menampilkan halaman penindakan
     *
     * @param PenindakanRequest $request
     * @return Response
     */
    public function index(PenindakanRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('penindakan', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('penerimaan');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'Penindakan/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data penindakan baru ke database. 
     *
     * @param StorePenindakanRequest $request
     * @return RedirectResponse
     */
    public function store(StorePenindakanRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penindakan berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data penindakan.
     *
     * @param UpdatePenindakanRequest $request
     * @param Penindakan $penindakan
     * @return RedirectResponse
     */
    public function update(UpdatePenindakanRequest $request, Penindakan $penindakan): RedirectResponse
    {
        $request->update();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penindakan berhasil diubah.',
        ]);
    }

    /**
     * Hapus data penindakan (soft deletes)
     *
     * @param Request $request
     * @param Penindakan $penindakan
     * @return RedirectResponse
     */
    public function remove(Request $request, Penindakan $penindakan): RedirectResponse
    {
        $penindakan->delete();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penindakan berhasil dihapus.',
        ]);
    }

    /**
     * Restore data penindakan
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        Penindakan::onlyTrashed()->findOrFail($id)->restore();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penindakan berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data penindakan (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        Penindakan::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data penindakan berhasil dihapus selamanya.',
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
        $access = $this->getAccessByRoute('penindakan');
        $fileName = "penindakan_export.xlsx";

        return Excel::download(new PenindakanExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_penindakan.xlsx";

        return Excel::download(new PenindakanTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPenindakanRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPenindakanRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('penindakan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
