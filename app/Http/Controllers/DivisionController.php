<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Http\Requests\Divisions\DivisionRequest;
use App\Http\Requests\Divisions\StoreDivisionRequest;
use Illuminate\Http\RedirectResponse;

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
}
