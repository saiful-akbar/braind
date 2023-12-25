<?php

namespace App\Http\Requests\Komoditi;

use App\Models\Komoditi;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class UpdateKomoditiRequest extends FormRequest
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
            'kode' => [
                'required', 'string', 'max:100',
                "unique:komoditi,kode,{$this->komoditi->id},id"
            ],
        ];
    }

    /**
     * Simpan hasil perubahan ke database
     */
    public function save(Komoditi $komoditi): Komoditi
    {
        $komoditi->kode = $this->kode;
        $komoditi->save();

        return $komoditi;
    }
}
