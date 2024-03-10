<?php

namespace App\Http\Requests\Profil;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAlamatRequest extends FormRequest
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
            'negara' => 'nullable|string|max:50',
            'kota' => 'nullable|string|max:50',
            'kode_pos' => 'nullable|string|max:10',
            'alamat' => 'nullable|string|max:200',
        ];
    }

    /**
     * Simpan pembaruan alamat user ke database.
     *
     * @return void
     */
    public function update(): void
    {
        $user = user();
        $user->negara = $this->negara;
        $user->kode_pos = $this->kode_pos;
        $user->kota = $this->kota;
        $user->alamat = $this->alamat;
        $user->save();
    }
}
