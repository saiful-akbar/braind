<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Kantor;
use App\Models\ProfilKantor;
use Illuminate\Http\Request;

class ProfilKantorController extends Controller
{
    /**
     * Menampilkan halaman profil kantor
     *
     * @return Response
     */
    public function index(): mixed
    {
        $access = $this->getAccessByRoute('profil-kantor');

        $data = Kantor::with(['profil', 'galeri'])
            ->where('id', user()->kantor_id)
            ->first();

        return $this->render(
            component: 'ProfilKantor/index',
            data: $data,
            access: $access
        );
    }
}
