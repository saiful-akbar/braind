<?php

namespace App\Imports;

use App\Models\Perusahaan;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PerusahaanImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'nama_perusahaan' => 'required|string|max:100|unique:perusahaan,nama',
        ];
    }

    /**
     * Custom validation attribute
     *
     * @return array
     */
    public function customValidationAttributes(): array
    {
        return [
            'nama_perusahaan' => 'Nama Perusahaan',
        ];
    }

    /**
     * Insert data ke database
     */
    public function model(array $row)
    {
        Perusahaan::create(['nama' => $row['nama_perusahaan']]);
    }
}
