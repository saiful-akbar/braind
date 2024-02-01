<?php

namespace App\Http\Controllers;

use App\Http\Requests\PerusahaanMmea\PerusahaanMmeaRequest;
use App\Http\Requests\PerusahaanMmea\StorePerusahaanMmeaRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PerusahaanMmeaController extends Controller
{
    /**
     * Menampilkan halaman utama untuk perusahaan cukai MMEA.
     *
     * @param PerusahaanMmeaRequest $request
     * @return Response
     */
    public function index(PerusahaanMmeaRequest $request): Response
    {
        $access = $this->getAccessByRoute('perusahaan.mmea');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'PerusahaanMmea/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambahkan data perusahaan mmea ke database.
     *
     * @param StorePerusahaanMmeaRequest $request
     * @return RedirectResponse
     */
    public function store(StorePerusahaanMmeaRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan.mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.'
        ]);
    }
}
