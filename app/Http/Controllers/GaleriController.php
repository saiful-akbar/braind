<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\GaleriKantor;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Galeri\GaleriRequest;
use App\Http\Requests\Galeri\StoreGaleriRequest;

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

    /**
     * Tambah galeri ke database.
     *
     * @param StoreGaleriRequest $request
     * @return RedirectResponse
     */
    public function store(StoreGaleriRequest $request): RedirectResponse
    {
        $request->insert();

        return to_route('galeri', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Gambar berhasil ditambahkan.'
        ]);
    }

    /**
     * Hapus permanen data galeri
     *
     * @param Request $request
     * @param GaleriKantor $galeri
     * @return RedirectResponse
     */
    public function destroy(Request $request, GaleriKantor $galeri): RedirectResponse
    {
        // jika data berupa gambar, hapus juga file gambar dari storage
        if (!is_null($galeri->gambar_url)) {
            $path = str_replace(storage_url(), "", $galeri->gambar_url);
            Storage::disk('public')->delete($path);
        }

        // Hapus galeri
        $galeri->forceDelete();

        return to_route('galeri', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Galeri berhasil dihapus.'
        ]);
    }
}
