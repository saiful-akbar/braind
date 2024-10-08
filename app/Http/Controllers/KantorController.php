<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Kantor;
use Illuminate\Http\Request;
use App\Exports\KantorExport;
use App\Imports\KantorImport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Kantor\KantorRequest;
use App\Exports\Templates\KantorTemplateExport;
use App\Http\Requests\Kantor\PdfKantorRequest;
use App\Http\Requests\Kantor\StoreKantorRequest;
use App\Http\Requests\Kantor\UpdateKantorRequest;
use Illuminate\Http\Response as HttpResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class KantorController extends Controller
{
    /**
     * Menampilkan halaman kantor
     */
    function index(KantorRequest $request): Response
    {
        $access = $this->getAccessByRoute('kantor');

        return $this->renderPaginate(
            component: 'Kantor/index',
            paginator: $request->paginate($access),
            access: $access
        );
    }

    /**
     * Menyimpan data kantor baru.
     */
    public function store(StoreKantorRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Kantor berhasil ditambahkan.'
        ]);
    }

    /**
     * Perbarui data kantor.
     */
    public function update(UpdateKantorRequest $request, Kantor $kantor): RedirectResponse
    {
        $request->update();

        return to_route('kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Kantor berhasil diperbarui.'
        ]);
    }

    /**
     * Menghapus sementara data kantor
     */
    public function remove(Request $request, Kantor $kantor): RedirectResponse
    {
        $kantor->delete();

        return to_route("kantor", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kantor berhasil dihapus.'
        ]);
    }

    /**
     * Memulihkan data yang telah dihapus
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $kantor = kantor::onlyTrashed()->findOrFail($id);

        if (!is_null($kantor)) {
            $kantor->restore();
        }

        return to_route("kantor", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kantor berhasil dipulihkan.'
        ]);
    }

    /**
     * Menghapus kantor (kanwil) selamanya
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $kantor = kantor::onlyTrashed()->findOrFail($id);

        if (!is_null($kantor)) {
            $kantor->forceDelete();
        }

        return to_route("kantor", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kantor berhasil dihapus selamanya.'
        ]);
    }

    /**
     * Ekspor data kantor kedalam bentuk excel.
     */
    public function export(Request $request): BinaryFileResponse
    {
        $access = $this->getAccessByRoute('kantor');
        $name = 'kantor_export.xlsx';

        return Excel::download(new KantorExport($request, $access), $name);
    }

    /**
     * download template import excel
     */
    public function downloadTemplate(): BinaryFileResponse
    {
        $fileName = 'template_import_kantor.xlsx';
        return Excel::download(new KantorTemplateExport, $fileName);
    }

    /**
     * Import excel
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:1024'
        ]);

        Excel::import(new KantorImport, $request->file('file'));

        return to_route('kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Import berhasil.'
        ]);
    }

    /**
     * Mengambil data kantor dengan json response
     */
    public function json(): JsonResponse
    {
        $kantor = Kantor::orderBy('nama', 'asc')->get();

        return $this->jsonResponse(data: $kantor);
    }

    /**
     * Report PDF
     *
     * @param Request $request
     * @return HttpResponse
     */
    public function report(PdfKantorRequest $request): HttpResponse
    {
        return $request->pdf(access: $this->getAccessByRoute('kantor'));
    }
}
