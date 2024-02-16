<?php

namespace App\Http\Requests\Perusahaan;

use App\Imports\PerusahaanImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Foundation\Http\FormRequest;

class ImportPerusahaanRequest extends FormRequest
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
            'file' => 'required|mimes:xlsx,xls|max:100000'
        ];
    }

    /**
     * Jalankan proses import excel
     */
    public function importExcel(): void
    {
        Excel::import(new PerusahaanImport, $this->file('file'));
    }
}
