<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sbp\SbpRequest;
use App\Http\Requests\Sbp\StoreSbpRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Response;

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
     * Tambah data SBP baru pada database.
     */
    public function store(StoreSbpRequest $request): HttpResponse
    {
        $request->insert();
        return response()->noContent();
    }
}
