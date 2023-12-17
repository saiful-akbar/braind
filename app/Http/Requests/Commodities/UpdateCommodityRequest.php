<?php

namespace App\Http\Requests\Commodities;

use App\Models\Commodity;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCommodityRequest extends FormRequest
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
            'komoditi' => [
                'required', 'string', 'max:100',
                "unique:commodities,name,{$this->commodity->id},id"
            ],
        ];
    }

    /**
     * Simpan hasil perubahan ke database
     */
    public function save(Commodity $commodity): Commodity
    {
        $commodity->name = $this->komoditi;
        $commodity->save();

        return $commodity;
    }
}
