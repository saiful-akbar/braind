<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perusahaan\HtHptl\HtHptlRequest;
use App\Http\Requests\Perusahaan\HtHptl\StoreHtHptlRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PerusahaanHtHptlController extends Controller
{
    /**
     * Menampilkan halaman perusahaan cukai HT + HPTL
     *
     * @param HtHptlRequest $request
     * @return Response|RedirectResponse
     */
    public function index(HtHptlRequest $request): Response|RedirectResponse
    {
        // jika tidak ada query string start_period dan end_period
        // redirect dengan menmabhkan query string tersebut.
        if (is_null($request->query('start_period')) || is_null($request->query('end_period'))) {
            return redirect()->route('perusahaan.hthptl', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan.hthptl');
        $data = $request->paginate(access: $access);

        return $this->renderPaginate(
            component: 'Perusahaan/HtHptl/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Tambah data perusahaan cukai HT + HPTL ke database.
     */
    public function store(StoreHtHptlRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('perusahaan.hthptl', [
            'start_period' => $request->query('start_period', date('Y-m-01')),
            'end_period' => $request->query('end_period', date('Y-m-d')),
        ]);
    }
}
