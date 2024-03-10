<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Profil\UpdateAkunRequest;
use App\Http\Requests\Profil\UpdateAlamatRequest;
use App\Http\Requests\Profil\UpdateKontakRequest;
use App\Http\Requests\Profil\UpdateProfilRequest;
use App\Http\Requests\Profil\UpdatePasswordRequest;

class ProfilController extends Controller
{
    /**
     * Menampilkan halaman profil
     */
    public function index(): Response
    {
        return $this->render(
            component: 'Profil/index',
            data: user(),
        );
    }

    /**
     * Update profil user.
     *
     * @param UpdateProfilRequest $request
     * @return RedirectResponse
     */
    public function updateProfil(UpdateProfilRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Profil berhasil diperbarui.'
        ]);
    }

    /**
     * Update alamat user.
     *
     * @param UpdateAlamatRequest $request
     * @return RedirectResponse
     */
    public function updateAlamat(UpdateAlamatRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Alamat berhasil diperbarui.'
        ]);
    }

    /**
     * Update kontak user.
     *
     * @param UpdateKontakRequest $request
     * @return RedirectResponse
     */
    public function updateKontak(UpdateKontakRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Kontak berhasil diperbarui.'
        ]);
    }

    /**
     * Update akun user.
     *
     * @param UpdateAkunRequest $request
     * @return RedirectResponse
     */
    public function updateAkun(UpdateAkunRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Akun berhasil diperbarui.'
        ]);
    }

    /**
     * Update password user.
     *
     * @param UpdatePasswordRequest $request
     * @return RedirectResponse
     */
    public function updatePassword(UpdatePasswordRequest $request): RedirectResponse
    {
        $request->update();

        return to_route('profil', $request->query())->with([
            'flash.status' => 'success',
            'flash.message' => 'Password berhasil diperbarui.'
        ]);
    }
}
