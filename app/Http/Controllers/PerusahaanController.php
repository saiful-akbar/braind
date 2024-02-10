<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perusahaan\PerusahaanRequest;
use App\Http\Requests\Perusahaan\StorePerusahaanRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

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
}
