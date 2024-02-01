<?php

namespace App\Http\Controllers;

use App\Models\Sbp;
use Inertia\Response;
use App\Exports\SbpExport;
use App\Exports\Templates\SbpTemplateExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\Sbp\SbpRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Sbp\StoreSbpRequest;
use App\Http\Requests\Sbp\UpdateSbpRequest;
use App\Imports\SbpImport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SbpController extends Controller
{
    /**
     * Menampilkan halaman master SBP
     *
     * @param SbpRequest $request
     * @return Response|RedirectResponse
     */
    public function index(SbpRequest $request): Response|RedirectResponse
    {
        $access = $this->getAccessByRoute('sbp');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'Sbp/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Tambahkan sbp baru pada database
     *
     * @param StoreSbpRequest $request
     * @return RedirectResponse
     */
    public function store(StoreSbpRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'SBP berhasil ditambahkan.'
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
        $access = $this->getAccessByRoute('sbp');
        $name = 'sbp_export.xlsx';

        return Excel::download(new SbpExport($request, $access), $name);
    }

    /**
     * Perbarui data SBP pada database.
     *
     * @param UpdateSbpRequest $request
     * @param Sbp $sbp
     * @return RedirectResponse
     */
    public function update(UpdateSbpRequest $request, Sbp $sbp): RedirectResponse
    {
        $request->update($sbp);

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'SBP berhasil diperbarui.',
        ]);
    }

    /**
     * Remove data SBP (soft delete)
     *
     * @param Request $request
     * @param Sbp $sbp
     * @return RedirectResponse
     */
    public function remove(Request $request, Sbp $sbp): RedirectResponse
    {
        $sbp->delete();

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'SBP berhasil dihapus.'
        ]);
    }

    /**
     * Restore data SBP
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        Sbp::onlyTrashed()->findOrFail($id)->restore();

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'SBP berhasil dipuihkan.'
        ]);
    }

    /**
     * Destroy data SBP (permanent delete)
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        Sbp::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'SBP berhasil dihapus selamanya.'
        ]);
    }

    /**
     * download template import
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        return Excel::download(new SbpTemplateExport, 'template_import_sbp.xlsx');
    }

    /**
     * import excel
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:10000'
        ]);

        Excel::import(new SbpImport, $request->file('file'));

        return to_route('sbp', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }
}
