<?php

namespace App\Http\Controllers;

use App\Exports\PerusahaanExport;
use App\Exports\Templates\PerusahaanTemplateExport;
use App\Http\Requests\Perusahaan\ImportPerusahaanRequest;
use App\Http\Requests\Perusahaan\PerusahaanRequest;
use App\Http\Requests\Perusahaan\StorePerusahaanRequest;
use App\Http\Requests\Perusahaan\UpdatePerusahaanRequest;
use App\Models\Perusahaan;
use App\Models\PerusahaanImpor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PerusahaanController extends Controller
{
    /**
     * Menampilkan halaman utama data master perusahaan.
     *
     * @param PerusahaanRequest $request
     * @return Response
     */
    public function index(PerusahaanRequest $request): mixed
    {
        $access = $this->getAccessByRoute('master-perusahaan');
        $data = $request->paginate(access: $access);

        return $this->renderPaginate(
            paginator: $data,
            access: $access,
            component: 'Perusahaan/index',
        );
    }

    /**
     * Manmbah perusahaan baru pada database.
     *
     * @param StorePerusahaanRequest $request
     * @return RedirectResponse
     */
    public function store(StorePerusahaanRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('master-perusahaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.'
        ]);
    }

    /**
     * Perbarui data perusahaan yang ada pada database.
     *
     * @param UpdatePerusahaanRequest $request
     * @param Perusahaan $perusahaan
     * @return RedirectResponse
     */
    public function update(UpdatePerusahaanRequest $request, Perusahaan $perusahaan): RedirectResponse
    {
        $request->update($perusahaan);

        return to_route('master-perusahaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil diperbarui.',
        ]);
    }

    /**
     * Hapus data perusahaan (soft deletes)
     *
     * @param Request $request
     * @param Perusahaan $perusahaan
     * @return RedirectResponse
     */
    public function remove(Request $request, Perusahaan $perusahaan): RedirectResponse
    {
        $perusahaan->delete();

        return to_route('master-perusahaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dihapus.',
        ]);
    }

    /**
     * Pulihkan data perusahaan yang dihapus.
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        Perusahaan::onlyTrashed()->findOrFail($id)->restore();

        return to_route('master-perusahaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil dipulihkan.',
        ]);
    }

    /**
     * Menghapus data perusahaan untuk selamanya (permanent delete).
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        Perusahaan::onlyTrashed()->findOrFail($id)->forceDelete();

        return to_route('master-perusahaan', $request->query())->with([
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
        $access = $this->getAccessByRoute('master-perusahaan');
        $fileName = 'perusahaan_export.xlsx';

        return Excel::download(new PerusahaanExport($request, $access), $fileName);
    }

    /**
     * Download template import excel.
     *
     * @return BinaryFileResponse
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = 'template_import_perusahaan.xlsx';

        return Excel::download(new PerusahaanTemplateExport, $fileName);
    }

    /**
     * Import excel.
     *
     * @param ImportPerusahaanRequest $request
     * @return RedirectResponse
     */
    public function import(ImportPerusahaanRequest $request): RedirectResponse
    {
        $request->importExcel();

        return to_route('master-perusahaan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import excel berhasil.'
        ]);
    }
}
