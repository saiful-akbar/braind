<?php

namespace App\Http\Requests\ProfilKantor;

use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;

class DestroyGaleriProfilKantorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Hapus gambar pada galeri kantor
     *
     * @return void
     */
    public function destroy(): void
    {
        // Hapus gambar dari storage
        if (!empty($this->galeri->uri)) {
            $path = str_replace(asset('/storage'), '', $this->galeri->uri);
            Storage::disk('public')->delete($path);
        }

        // hapus data galeri dari database
        $this->galeri->forceDelete();
    }
}
