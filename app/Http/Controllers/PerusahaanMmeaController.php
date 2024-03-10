<?php

namespace App\Http\Controllers;

use App\Exports\PerusahaanMmeaExport;
use App\Exports\Templates\PerusahaanMmeaTemplateExport;
use App\Http\Requests\PerusahaanMmea\ImportPerusahaanMmeaRequest;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\PerusahaanMmea\PerusahaanMmeaRequest;
use App\Http\Requests\PerusahaanMmea\StorePerusahaanMmeaRequest;
use App\Http\Requests\PerusahaanMmea\TopFivePerusahaanMmeaRequest;
use App\Http\Requests\PerusahaanMmea\UpdatePerusahaanMmeaRequest;
use App\Models\PerusahaanMmea;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PerusahaanMmeaController extends Controller
{
    /**
     * Menampilkan halaman utama untuk perusahaan cukai MMEA.
     *
     * @param PerusahaanMmeaRequest $request
     * @return Response
     */
    public function index(PerusahaanMmeaRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period
        // reqdirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini.
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('perusahaan-mmea', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan-mmea');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'PerusahaanMmea/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambahkan data perusahaan mmea ke database.
     *
     * @param StorePerusahaanMmeaRequest $request
     * @return RedirectResponse
     */
    public function store(StorePerusahaanMmeaRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.'
        ]);
    }

    /**
     * Update data perusahaan MMEA ke database.
     *
     * @param UpdatePerusahaanMmeaRequest $request
     * @param Perusahaan $perusahaan
     * @return RedirectResponse
     */
    public function update(UpdatePerusahaanMmeaRequest $request, PerusahaanMmea $perusahaan): RedirectResponse
    {
        $request->update();

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil diperbarui.',
        ]);
    }

    /**
     * Hapus (soft delete) data perusahaan mmea
     *
     * @param Request $request
     * @param PerusahaanMmea $perusahaan
     * @return RedirectResponse
     */
    public function remove(Request $request, PerusahaanMmea $perusahaan): RedirectResponse
    {
        $perusahaan->delete();

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus.',
        ]);
    }

    /**
     * Hapus (soft delete) data perusahaan mmea
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        PerusahaanMmea::onlyTrashed()
            ->findOrFail($id)
            ->restore();

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus (permanent delete) data perusahaan mmea
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        PerusahaanMmea::onlyTrashed()
            ->findOrFail($id)
            ->forceDelete();

        return to_route('perusahaan-mmea', $request->query())->with([
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
        $access = $this->getAccessByRoute('perusahaan-mmea');
        $fileName = "perusahaan_mmea_export.xlsx";

        return Excel::download(new PerusahaanMmeaExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_perusahaan_mmea.xlsx";

        return Excel::download(new PerusahaanMmeaTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPerusahaanMmeaRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPerusahaanMmeaRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Ambil data 5 besar perusahaan cukai MMEA.
     *
     * @param TopFivePerusahaanMmeaRequest $request
     * @return JsonResponse
     */
    public function topFive(TopFivePerusahaanMmeaRequest $request): JsonResponse
    {
        return $this->jsonResponse(
            data: $request->read()
        );
    }
}
