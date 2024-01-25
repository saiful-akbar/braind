<?php

namespace App\Imports;

use App\Models\Komoditi;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class KomoditiImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'kode_komoditi' => 'required|string|max:100|unique:komoditi,kode'
        ];
    }

    /**
     * Custom validation attribute
     *
     * @return array
     */
    public function customValidationAttributes(): array
    {
        return ['kode_komoditi' => 'kode komoditi'];
    }

    /**
     * Insert data ke database
     */
    public function model(array $row): Komoditi
    {
        return Komoditi::create([
            'kode' => $row['kode_komoditi']
        ]);
    }
}
