<?php

namespace App\Http\Requests\Penerimaan;

use App\Imports\PenerimaanImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Foundation\Http\FormRequest;

class ImportPenerimaanRequest extends FormRequest
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
            'file' => 'required|mimes:xlsx,xls|max:5000'
        ];
    }

    /**
     * Import data dari excel ke database
     *
     * @return void
     */
    public function importExcel(): void
    {
        Excel::import(new PenerimaanImport, $this->file('file'));
    }
}
