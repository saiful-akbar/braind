<?php

namespace App\Http\Requests\Galeri;

use App\Models\GaleriKantor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class StoreGaleriRequest extends FormRequest
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
        if ($this->tab === 'gambar' && $this->hasFile('gambar')) {
            $gambar = $this->file('gambar');
            $mimeType = $gambar->getMimeType();
            $gambarUrl = $gambar->store('galeri', ['disk' => 'public']);
        } else {
            $gambarUrl = null;
            $mimeType = null;
        }

        GaleriKantor::create([
            'kantor_id'  => user()->kantor_id,
            'video_url'  => $this->id_youtube,
            'gambar_url' => $gambarUrl,
            'mime_type'  => $mimeType,
            'tipe'       => 'galeri',
            'judul'      => $this->judul,
            'keterangan' => $this->keterangan,
        ]);
    }
}
