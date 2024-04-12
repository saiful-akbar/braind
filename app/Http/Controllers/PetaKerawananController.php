<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\GaleriKantor;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PetaKerawanan\PetaKerawananRequest;
use App\Http\Requests\PetaKerawanan\StorePetaKerawananRequest;

class PetaKerawananController extends Controller
{
    /**
     * Menampilkan halaman peta kerawanan kantor.
     *
     * @param PetaKerawananRequest $request
     * @return Response
     */
    public function index(PetaKerawananRequest $request): Response
    {
        $access = $this->getAccessByRoute('peta-kerawanan');
        $data = $request->paginate();

        return $this->renderPaginate(
            component: 'PetaKerawanan/index',
            paginator: $data,
            access: $access,
        );
    }

    /**
     * Menambah data peta kerawanan kantor pada database.
     *
     * @param StorePetaKerawananRequest $request
     * @return RedirectResponse
     */
    public function store(StorePetaKerawananRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('peta-kerawanan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Peta kerawanan berhasil ditambahkan.'
        ]);
    }

    /**
     * Hapus data peta kerawanan kantor permanan dari database.
     *
     * @param Request $request
     * @param GaleriKantor $petaKerawanan
     * @return RedirectResponse
     */
    public function destroy(Request $request, GaleriKantor $petaKerawanan): RedirectResponse
    {
        // Jika peta kerawanan berupa gambar, hapus gambar dari storage.
        if (!is_null($petaKerawanan->gambar_url)) {
            $path = str_replace(storage_url(), '', $petaKerawanan->gambar_url);
            Storage::disk('public')->delete($path);
        }

        // Hapus peta kerawanan dari database
        $petaKerawanan->forceDelete();

        return to_route('peta-kerawanan', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Peta kerawanan berhasil dihapus.',
        ]);
    }
}
