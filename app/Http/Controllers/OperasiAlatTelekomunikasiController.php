<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\OperasiAlatTelekomunikasi;
use Illuminate\Http\Request;
use App\Exports\OperasiAlatTelekomunikasiExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Exports\Templates\OperasiAlatTelekomunikasiTemplateExport;
use App\Http\Requests\OperasiAlatTelekomunikasi\OperasiAlatTelekomunikasiRequest;
use App\Http\Requests\OperasiAlatTelekomunikasi\StoreOperasiAlatTelekomunikasiRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\OperasiAlatTelekomunikasi\ImportOperasiAlatTelekomunikasiRequest;
use App\Http\Requests\OperasiAlatTelekomunikasi\ReportOperasiAlatTelekomunikasiRequest;
use App\Http\Requests\OperasiAlatTelekomunikasi\UpdateOperasiAlatTelekomunikasiRequest;
use Illuminate\Http\Response as HttpResponse;

class OperasiAlatTelekomunikasiController extends Controller
{
    /**
     * Menampilkan halaman sarana operasi alat telekomunikasi.
     *
     * @param OperasiAlatTelekomunikasiRequest $request
     * @return Response
     */
    public function index(OperasiAlatTelekomunikasiRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period"
        // redirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('operasi-alat-telekomunikasi', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('operasi-alat-telekomunikasi');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'OperasiAlatTelekomunikasi/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data sarana alat telekomunikasi baru ke database. 
     *
     * @param StoreOperasiAlatTelekomunikasiRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOperasiAlatTelekomunikasiRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat telekomunikasi berhasil ditambahkan.',
        ]);
    }

    /**
     * Perbarui data operasi alat telekomunikasi.
     *
     * @param UpdateOperasiAlatTelekomunikasiRequest $request
     * @param OperasiAlatTelekomunikasi $operasi
     * @return RedirectResponse
     */
    public function update(UpdateOperasiAlatTelekomunikasiRequest $request, OperasiAlatTelekomunikasi $operasi): RedirectResponse
    {
        $request->update();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat telekomunikasi berhasil diubah.',
        ]);
    }

    /**
     * Hapus data operasi alat telekomunikasi (soft deletes)
     *
     * @param Request $request
     * @param OperasiAlatTelekomunikasi $operasi
     * @return RedirectResponse
     */
    public function remove(Request $request, OperasiAlatTelekomunikasi $operasi): RedirectResponse
    {
        $operasi->delete();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat telekomunikasi berhasil dihapus.',
        ]);
    }

    /**
     * Restore data operasi alat telekomunikasi
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        OperasiAlatTelekomunikasi::onlyTrashed()->findOrFail($id)->restore();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data alat telekomunikasi berhasil dipulihkan.',
        ]);
    }

    /**
     * Hapus data operasi alat telekomunikasi (permanent deletes)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        OperasiAlatTelekomunikasi::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data operasi alat telekomunikasi dihapus selamanya.',
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
        $access = $this->getAccessByRoute('operasi-alat-telekomunikasi');
        $fileName = "operasi_alat_telekomunikasi_export.xlsx";

        return Excel::download(new OperasiAlatTelekomunikasiExport($request, $access), $fileName);
    }

    /**
     * Download template untuk import excel
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = "template_import_operasi_alat_telekomunikasi.xlsx";

        return Excel::download(new OperasiAlatTelekomunikasiTemplateExport, $fileName);
    }

    /**
     * Import excel ke database.
     *
     * @param ImportOperasiAlatTelekomunikasiRequest $request
     * @return RedirectResponse
     */
    public function import(ImportOperasiAlatTelekomunikasiRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('operasi-alat-telekomunikasi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Cetak report PDF
     *
     * @param ReportOperasiAlatTelekomunikasiRequest $request
     * @return HttpResponse
     */
    public function report(ReportOperasiAlatTelekomunikasiRequest $request): HttpResponse
    {
        return $request->printPdf(
            access: $this->getAccessByRoute('operasi-alat-telekomunikasi'),
        );
    }
}
