<?php

namespace App\Http\Controllers;

use App\Models\Commodity;
use App\Exports\CommodityExport;
use App\Http\Requests\Commodities\CommodityRequest;
use App\Http\Requests\Commodities\StoreCommodityRequest;
use App\Http\Requests\Commodities\UpdateCommodityRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CommodityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CommodityRequest $request): Response
    {
        // ambil data akses user pada route "commodity".
        $access = $this->getAccessByRoute('commodity');

        return $this->renderPaginate(
            component: 'Commodity/index',
            paginator: $request->paginate($access),
            access: $access
        );
    }

    /**
     * Menyimpan data baru pada tabel commodities.
     */
    public function store(StoreCommodityRequest $request): JsonResponse
    {
        $data = $request->save();
        return $this->jsonResponse($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommodityRequest $request, Commodity $commodity): mixed
    {
        $request->save($commodity);
        return $this->jsonResponse($commodity);
    }

    /**
     * Hapus commodity (soft deleted).
     */
    public function remove(Commodity $commodity): RedirectResponse
    {
        $commodity->delete();

        return to_route('commodity')->with([
            'flash.status' => 'success',
            'flash.message' => 'Komodoti berhasil dihapus.'
        ]);
    }

    /**
     * Mengambalikan commodity yang sudah dihapus.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $commodity = Commodity::onlyTrashed()->findOrFail($id);
        $commodity->restore();

        return to_route('commodity', $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Komoditi berhasil dipulihkan.'
        ]);
    }

    /**
     * Menhapus commodity selamanya (permanen, tidak dapat di restore).
     */
    public function destroy(Request $request, string $id): mixed
    {
        $commodity = Commodity::onlyTrashed()->findOrFail($id);
        $commodity->forceDelete();

        return to_route('commodity', $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Komoditi berhasil dihapus selamanya.'
        ]);
    }

    /**
     * Ekspor data division (kanwil) kedalam bentuk excel.
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('commodity');
        $name = "commodity_export.xlsx";

        return Excel::download(new CommodityExport($request, $access), $name);
    }
}
