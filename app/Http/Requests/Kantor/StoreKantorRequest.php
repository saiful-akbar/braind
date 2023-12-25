<?php

namespace App\Http\Requests\Kantor;

use App\Models\Kantor;
use Illuminate\Foundation\Http\FormRequest;

class StoreKantorRequest extends FormRequest
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
            'nama' => 'required|string|max:50|unique:kantor,nama'
        ];
    }

    /**
     * Simpan data division (kanwil) baru.
     */
    public function save(): void
    {
        Kantor::create(['nama' => $this->nama]);
    }
}
