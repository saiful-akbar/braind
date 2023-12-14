<?php

namespace App\Http\Controllers;

use App\Http\Requests\Divisions\DivisionRequest;
use App\Http\Requests\Divisions\StoreDivisionRequest;
use App\Http\Requests\Divisions\UpdateDivisionRequest;
use App\Models\Division;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DivisionController extends Controller
{
    /**
     * Menampilkan halaman division (Kanwil)
     */
    function index(DivisionRequest $request): Response
    {
        $access = $this->getAccessByRoute('division');

        return $this->renderPaginate(
            component: 'Division/index',
            paginator: $request->paginate($access),
            access: $access
        );
    }

    /**
     * Menampilkan halaman tambah divisi baru.
     */
    public function create(): Response
    {
        return $this->render('Division/Create/index');
    }

    /**
     * Method untuk menambahkan data division (kanwil) baru.
     */
    public function store(StoreDivisionRequest $request): RedirectResponse
    {
        $request->save();

        return to_route('division.create')->with([
            'flash.status' => 'success',
            'flash.message' => 'Kanwil baru berhasil ditambahkan'
        ]);
    }

    /**
     * Menampilkan halaman edit division (master kanwil)
     */
    public function edit(Division $division): mixed
    {
        $access = $this->getAccessByRoute('division');

        return $this->render(
            component: 'Division/Edit/index',
            data: $division,
            access: $access
        );
    }

    /**
     * Perbarui data division (master kanwil)
     */
    public function update(UpdateDivisionRequest $request, Division $division): RedirectResponse
    {
        $request->save();

        return to_route('division.edit', ['division' => $division->id])->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kanwil berhasil diperbarui.'
        ]);
    }

    /**
     * Menghapus sementara data division (kanwil)
     */
    public function remove(Request $request, Division $division): RedirectResponse
    {
        $division->delete();

        return to_route("division", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kanwil berhasil dihapus.'
        ]);
    }

    /**
     * Memulihkan data yang telah dihapus
     */
    public function restore(Request $request, int $division): RedirectResponse
    {
        Division::where('id', $division)->restore();

        return to_route("division", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kanwil berhasil dipulihkan.'
        ]);
    }

    /**
     * Menghapus division (kanwil) selamanya
     */
    public function destroy(Request $request, int $division): RedirectResponse
    {
        Division::where('id', $division)->forceDelete();

        return to_route("division", $request->all())->with([
            'flash.status' => 'success',
            'flash.message' => 'Data kanwil berhasil dihapus selamanya.'
        ]);
    }
}
