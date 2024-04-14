<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Pengawasan;
use Illuminate\Http\Request;
use App\Exports\PengawasanExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\PengawasanTemplateExport;
use App\Http\Requests\Pengawasan\PengawasanRequest;
use App\Http\Requests\Pengawasan\StorePengawasanRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\Pengawasan\ImportPengawasanRequest;
use App\Http\Requests\Pengawasan\ReportPengawasanRequest;
use App\Http\Requests\Pengawasan\UpdatePengawasanRequest;
use Illuminate\Http\Response as HttpResponse;

class PengawasanController extends Controller
{
    /**
     * Menampilkan halaman pengawasan
     *
     * @param PengawasanRequest $request
     * @return Response
     */
    public function index(PengawasanRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');
        $type = $request->query('type');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod) || is_null($type)) {
            return to_route('pengawasan', [
                'type' => 'semua',
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('pengawasan');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'Pengawasan/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data pengawasan baru ke database. 
     *
     * @param StorePengawasanRequest $request
     * @return RedirectResponse
     */
    public function store(StorePengawasanRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data pengawasan berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data pengawasan.
     *
     * @param UpdatePengawasanRequest $request
     * @param Pengawasan $pengawasan
     * @return RedirectResponse
     */
    public function update(UpdatePengawasanRequest $request, Pengawasan $pengawasan): RedirectResponse
    {
        $request->update(pengawasan: $pengawasan);

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data pengawasan berhasil diubah.',
        ]);
    }

    /**
     * Hapus data pengawasan (soft deletes)
     *
     * @param Request $request
     * @param Pengawasan $pengawasan
     * @return RedirectResponse
     */
    public function remove(Request $request, Pengawasan $pengawasan): RedirectResponse
    {
        $pengawasan->delete();

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data pengawasan berhasil dihapus.',
        ]);
    }

    /**
     * Restore data pengawasan
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        Pengawasan::onlyTrashed()->findOrFail($id)->restore();

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data pengawasan berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data pengawasan (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        Pengawasan::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data pengawasan berhasil dihapus selamanya.',
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
        $access = $this->getAccessByRoute('pengawasan');
        $fileName = "pengawasan_export.xlsx";

        return Excel::download(new PengawasanExport($request, $access), $fileName);
    }

    /**
     * Download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_pengawasan.xlsx";

        return Excel::download(new PengawasanTemplateExport, $fileName);
    }

    /**
     * Import dari excel ke database.
     *
     * @param ImportPengawasanRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPengawasanRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('pengawasan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Pengawasan report PDF
     *
     * @param ReportPengawasanRequest $request
     * @return HttpResponse
     */
    public function report(ReportPengawasanRequest $request): HttpResponse
    {
        return $request->printPdf(
            access: $this->getAccessByRoute('pengawasan'),
        );
    }
}
