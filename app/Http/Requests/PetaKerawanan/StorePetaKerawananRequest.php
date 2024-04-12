<?php

namespace App\Http\Requests\PetaKerawanan;

use App\Models\GaleriKantor;
use Illuminate\Foundation\Http\FormRequest;

class StorePetaKerawananRequest extends FormRequest
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
            'tab'        => ['required', 'in:gambar,video'],
            'gambar'     => ['required_if:tab,gambar', 'nullable', 'image', 'max:1024'],
            'id_youtube' => ['required_if:tab,video', 'nullable', 'string', 'max:100'],
            'judul'      => ['required', 'string', 'max:50'],
            'keterangan' => ['required', 'string', 'max:100'],
        ];
    }

    /**
     * insert gambar pada tabel galeri_kantor
     *
     * @return void
     */
    public function insert(): void
    {
        $gambarUrl = null;
        $mimeType  = null;

        if ($this->hasFile('gambar')) {
            $gambar    = $this->file('gambar');
            $mimeType  = $gambar->getMimeType();
            $gambarUrl = $gambar->store('peta-kerawanan', ['disk' => 'public']);
        }

        GaleriKantor::create([
            'kantor_id'  => user()->kantor_id,
            'video_url'  => $this->id_youtube,
            'gambar_url' => $gambarUrl,
            'mime_type'  => $mimeType,
            'tipe'       => 'peta',
            'judul'      => $this->judul,
            'keterangan' => $this->keterangan,
        ]);
    }
}
