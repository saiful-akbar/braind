<?php

namespace App\Http\Requests\Perusahaan;

use App\Models\Perusahaan;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusahaanRequest extends FormRequest
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
            'nama' => "required|string|max:100|unique:perusahaan,nama,{$this->id},id"
        ];
    }

    /**
     * Perbarui data perusahaan pada database.
     *
     * @param Perusahaan $perusahaan
     * @return void
     */
    public function update(Perusahaan $perusahaan): void
    {
        $perusahaan->nama = $this->nama;
        $perusahaan->save();
    }
}
