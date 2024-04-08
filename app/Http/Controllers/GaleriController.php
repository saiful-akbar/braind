<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\Galeri\GaleriRequest;

class GaleriController extends Controller
{
    /**
     * Menampilkan halaman galeri kantor
     *
     * @return Response
     */
    public function index(GaleriRequest $request): Response
    {
        $data = $request->paginate();
        $access = $this->getAccessByRoute('galeri');

        return $this->renderPaginate(
            component: 'Galeri/index',
            paginator: $data,
            access: $access,
        );
    }
}
