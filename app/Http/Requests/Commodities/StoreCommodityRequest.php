<?php

namespace App\Http\Requests\Commodities;

use App\Models\Commodity;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommodityRequest extends FormRequest
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
            "komoditi" => [
                'required',
                'string',
                'max:100',
                'unique:commodities,name',
            ],
        ];
    }

    /**
     * Simpan commodity baru pada database
     */
    public function save(): Commodity
    {
        return Commodity::create([
            'name' => $this->komoditi
        ]);
    }
}
