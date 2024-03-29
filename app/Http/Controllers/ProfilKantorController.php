<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilKantor\UpdateKeteranganProfilKantorRequest;
use Inertia\Response;
use App\Models\Kantor;
use Illuminate\Http\RedirectResponse;

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

    /**
     * Update keterangan profil kantor.
     *
     * @param UpdateKeteranganProfilKantorRequest $request
     * @return RedirectResponse
     */
    public function updateKeterangan(UpdateKeteranganProfilKantorRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil-kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Keterangan berhasil diperbarui.'
        ]);
    }
}
