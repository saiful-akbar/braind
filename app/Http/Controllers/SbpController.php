<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Kantor;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Sbp\SbpRequest;
use App\Http\Requests\Sbp\StoreSbpRequest;
use Illuminate\Http\Response as HttpResponse;

class SbpController extends Controller
{
    /**
     * Menampilkan halaman master SBP
     */
    public function index(SbpRequest $request): Response
    {
        $access = $this->getAccessByRoute('sbp');

        return $this->renderPaginate(
            component: 'Sbp/index',
            paginator: $request->paginate($access),
            access: $access,
        );
    }

    /**
     * Menampilkan halaman tambah data SBP
     */
    public function create(): Response
    {
        $kantor = Kantor::select('id as value', 'nama as label')
            ->orderBy('nama', 'desc')
            ->get();

        return $this->render(
            component: 'Sbp/Create/index',
            data: compact('kantor')
        );
    }
}
