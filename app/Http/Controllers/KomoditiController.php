<?php

namespace App\Http\Controllers;

use App\Models\Komoditi;
use App\Exports\KomoditiExport;
use App\Http\Requests\Komoditi\KomoditiRequest;
use App\Http\Requests\Komoditi\StoreKomoditiRequest;
use App\Http\Requests\Komoditi\UpdateKomoditiRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
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
    public function remove(Komoditi $komoditi): RedirectResponse
    {
        $komoditi->delete();

        return to_route('komoditi')->with([
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

        return to_route('komoditi', $request->all())->with([
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

        return to_route('komoditi', $request->all())->with([
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
        $name = "komoditi_export.xlsx";

        return Excel::download(new KomoditiExport($request, $access), $name);
    }
}
