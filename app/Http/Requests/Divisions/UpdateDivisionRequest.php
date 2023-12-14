<?php

namespace App\Http\Requests\Divisions;

use App\Models\Division;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDivisionRequest extends FormRequest
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
            'nama' => [
                "required",
                "string",
                "max:50",
                "unique:divisions,name,{$this->id},id"
            ],
        ];
    }

    /**
     * Simpan hasil perubahan
     */
    public function save(Division $division): void
    {
        $division->name = $this->nama;
        $division->slug = Str::slug($this->nama);
        $division->save();
    }
}
