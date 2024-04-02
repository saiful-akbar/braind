<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Kantor;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ProfilKantor\UpdateProfilKantorRequest;
use App\Http\Requests\ProfilKantor\StoreGaleriProfilKantorRequest;

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
     * @param UpdateProfilKantorRequest $request
     * @return RedirectResponse
     */
    public function updateProfil(UpdateProfilKantorRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil-kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Keterangan berhasil diperbarui.'
        ]);
    }

    /**
     * Menmabahkan gambar ke galeri kantor.
     *
     * @param StoreGaleriProfilKantorRequest $request
     * @return RedirectResponse
     */
    public function addImageToGallery(StoreGaleriProfilKantorRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('profil-kantor', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Galeri berhasil ditambahkan.',
        ]);
    }
}
