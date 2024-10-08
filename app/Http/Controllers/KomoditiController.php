<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Komoditi;
use Illuminate\Http\Request;
use App\Exports\KomoditiExport;
use App\Imports\KomoditiImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Komoditi\KomoditiRequest;
use App\Exports\Templates\KomoditiTemplateExport;
use App\Http\Requests\Komoditi\StoreKomoditiRequest;
use App\Http\Requests\Komoditi\UpdateKomoditiRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class KomoditiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(KomoditiRequest $request): Response
    {
        // ambil data akses user pada route "komoditi".
        $access = $this->getAccessByRoute('komoditi');

        return $this->renderPaginate(
            component: 'Komoditi/index',
            paginator: $request->paginate($access),
            access: $access
        );
    }

    /**
     * Menyimpan data baru pada tabel Komoditi.
     */
    public function store(StoreKomoditiRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Kode komoditi berhasil ditambahkan.',
        ]);
    }

    /**
     * Simpan perubahan komoditi pada database.
     */
    public function update(UpdateKomoditiRequest $request, Komoditi $komoditi): RedirectResponse
    {
        $request->update();

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Kode komoditi berhasil dirubah.',
        ]);
    }

    /**
     * Hapus komoditi (soft deleted).
     */
    public function remove(Request $request, Komoditi $komoditi): RedirectResponse
    {
        $komoditi->delete();

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Komoditi berhasil dihapus.'
        ]);
    }

    /**
     * Mengambalikan komoditi yang sudah dihapus.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $komoditi = Komoditi::onlyTrashed()->findOrFail($id);
        $komoditi->restore();

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Komoditi berhasil dipulihkan.'
        ]);
    }

    /**
     * Menhapus komoditi selamanya (permanen, tidak dapat di restore).
     */
    public function destroy(Request $request, string $id): mixed
    {
        $komoditi = Komoditi::onlyTrashed()->findOrFail($id);
        $komoditi->forceDelete();

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Komoditi berhasil dihapus selamanya.'
        ]);
    }

    /**
     * Ekspor data division (kanwil) kedalam bentuk excel.
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('komoditi');
        $name = "kode_komoditi_export.xlsx";

        return Excel::download(new KomoditiExport($request, $access), $name);
    }

    /**
     * Download template import
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $name = 'template_import_kode_komoditi.xlsx';
        return Excel::download(new KomoditiTemplateExport, $name);
    }

    /**
     * Import excel
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:1024'
        ]);

        Excel::import(new KomoditiImport, $request->file('file'));

        return to_route('komoditi', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Ambil data komoditi dalam format json
     *
     * @return JsonResponse
     */
    public function json(): JsonResponse
    {
        return $this->jsonResponse(
            data: Komoditi::orderBy('kode', 'asc')->get()
        );
    }
}
