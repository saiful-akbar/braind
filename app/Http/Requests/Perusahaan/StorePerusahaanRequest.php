<?php

namespace App\Http\Requests\Perusahaan;

use App\Models\Perusahaan;
use Illuminate\Foundation\Http\FormRequest;

class StorePerusahaanRequest extends FormRequest
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
            'nama' => 'required|string|max:100|unique:perusahaan,nama'
        ];
    }

    /**
     * Simpan perusahaan baru pada database
     */
    public function insert(): void
    {
        Perusahaan::create(['nama' => $this->nama]);
    }
}
