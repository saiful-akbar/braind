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
    public function index(PerusahaanMmeaRequest $request): Response|RedirectResponse
    {
        $startPeriod = $request->query('start_period');
        $endPeriod = $request->query('end_period');

        // Jika pada request tidak ada query string "start_period" dan "end_period
        // reqdirect ke halaman ini dengan menambahan query string
        // start_period = tanggal 01 pada bulan saat ini
        // end_period = tanggal saat ini. 
        if (is_null($startPeriod) || is_null($endPeriod)) {
            return to_route('perusahaan-mmea', [
                'start_period' => $request->query('start_period', date('Y-m-01')),
                'end_period' => $request->query('end_period', date('Y-m-d')),
            ]);
        }

        $access = $this->getAccessByRoute('perusahaan-mmea');
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

        return to_route('perusahaan-mmea', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Perusahaan berhasil ditambahkan.'
        ]);
    }
}
