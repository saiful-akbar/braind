<?php

namespace App\Http\Requests\Komoditi;

use App\Models\Komoditi;
use Illuminate\Foundation\Http\FormRequest;

class StoreKomoditiRequest extends FormRequest
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
            "kode" => [
                'required',
                'string',
                'max:100',
                'unique:komoditi,kode',
            ],
        ];
    }

    /**
     * Simpan commodity baru pada database
     */
    public function insert(): void
    {
        Komoditi::create([
            'kode' => $this->kode
        ]);
    }
}
