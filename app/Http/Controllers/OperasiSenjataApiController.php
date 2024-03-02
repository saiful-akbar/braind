<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\OperasiSenjataApi;
use Illuminate\Http\Request;
use App\Exports\OperasiSenjataApiExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\OperasiSenjataApiTemplateExport;
use App\Http\Requests\OperasiSenjataApi\OperasiSenjataApiRequest;
use App\Http\Requests\OperasiSenjataApi\StoreOperasiSenjataApiRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\OperasiSenjataApi\ImportOperasiSenjataApiRequest;
use App\Http\Requests\OperasiSenjataApi\UpdateOperasiSenjataApiRequest;

class OperasiSenjataApiController extends Controller
{
    /**
     * Menampilkan halaman sarana operasi senjata api.
     *
     * @param OperasiSenjataApiRequest $request
     * @return Response
     */
    public function index(OperasiSenjataApiRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('operasi-senjata-api', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('operasi-senjata-api');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'OperasiSenjataApi/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data sarana operasi senjata api baru ke database. 
     *
     * @param StoreOperasiSenjataApiRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOperasiSenjataApiRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi senjata api berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data sarana operasi senjata api.
     *
     * @param UpdateOperasiSenjataApiRequest $request
     * @param OperasiSenjataApi $operasi
     * @return RedirectResponse
     */
    public function update(UpdateOperasiSenjataApiRequest $request, OperasiSenjataApi $operasi): RedirectResponse
    {
        $request->update();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi senjata api berhasil diubah.',
        ]);
    }

    /**
     * Hapus data sarana operasi senjata api (soft deletes)
     *
     * @param Request $request
     * @param OperasiSenjataApi $operasi
     * @return RedirectResponse
     */
    public function remove(Request $request, OperasiSenjataApi $operasi): RedirectResponse
    {
        $operasi->delete();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi senjata api berhasil dihapus.',
        ]);
    }

    /**
     * Restore data sarana operasi senjata api
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        OperasiSenjataApi::onlyTrashed()->findOrFail($id)->restore();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi senjata api berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data sarana operasi senjata api (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        OperasiSenjataApi::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi senjata api dihapus selamanya.',
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
        $access = $this->getAccessByRoute('operasi-senjata-api');
        $fileName = "operasi_senjata_api_export.xlsx";

        return Excel::download(new OperasiSenjataApiExport($request, $access), $fileName);
    }

    /**
     * Download template untuk import excel
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_operasi_senjata_api.xlsx";

        return Excel::download(new OperasiSenjataApiTemplateExport, $fileName);
    }

    /**
     * Import excel ke database.
     *
     * @param ImportOperasiSenjataApiRequest $request
     * @return RedirectResponse
     */
    public function import(ImportOperasiSenjataApiRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('operasi-senjata-api', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
