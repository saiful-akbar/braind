<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Kantor;
use Illuminate\Http\Request;
use App\Exports\KantorExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Kantor\KantorRequest;
use App\Http\Requests\Kantor\StoreKantorRequest;
use App\Http\Requests\Kantor\UpdateKantorRequest;
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
     * Menampilkan halaman tambah divisi baru.
     */
    public function create(): Response
    {
        return $this->render('Kantor/Create/index');
    }

    /**
     * Menyimpan data kantor baru.
     */
    public function store(StoreKantorRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('kantor.create')->with([
            'flash.status' => 'success',
            'flash.message' => 'Kantor baru berhasil ditambahkan'
        ]);
    }

    /**
     * Menampilkan halaman edit kantor.
     */
    public function edit(Kantor $kantor): Response
    {
        $access = $this->getAccessByRoute('kantor');

        return $this->render(
            component: 'Kantor/Edit/index',
            data: $kantor,
            access: $access
        );
    }

    /**
     * Perbarui data kantor.
     */
    public function update(UpdateKantorRequest $request, Kantor $kantor): RedirectResponse
    {
        $request->update();

        return to_route('kantor.edit', ['kantor' => $kantor->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kantor berhasil diperbarui.'
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
        $name = 'braind_master_kantor.xlsx';

        return Excel::download(new KantorExport($request, $access), $name);
    }
}
