<?php

namespace App\Http\Requests\ProfilKantor;

use App\Models\GaleriKantor;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;

class StoreGaleriProfilKantorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gambar' => ['required', 'image', 'max:1024'],
            'judul' => ['required', 'string', 'max:50'],
            'keterangan' => ['required', 'string', 'max:250']
        ];
    }

    /**
     * tambahkan gambar pada galeri kantor di database.
     *
     * @return void
     */
    public function insert(): void
    {
        $kantorId = user()->kantor_id;

        // simpan gambar pada storage
        if ($this->hasFile('gambar')) {
            $mimeType  = $this->gambar->getMimeType();
            $extension = $this->gambar->extension();
            $fileName  = Str::random(16) . ".{$extension}";

            // simpan gambar ke storage.
            $imagePath = $this->file('gambar')->storeAs('galeri-kantor', $fileName, 'public');

            GaleriKantor::create([
                'kantor_id'  => $kantorId,
                'uri'        => $imagePath,
                'mime_type'  => $mimeType,
                'tipe'       => 'gambar',
                'judul'      => $this->judul,
                'keterangan' => $this->keterangan,
            ]);
        }
    }
}
