<?php

namespace App\Imports;

use App\Models\Kantor;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class KantorImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'nama_kantor' => 'required|string|max:100|unique:kantor,nama'
        ];
    }

    /**
     * Custom validation attribute
     *
     * @return array
     */
    public function customValidationAttributes(): array
    {
        return ['nama_kantor' => 'nama kantor'];
    }

    /**
     * Insert data ke database
     */
    public function model(array $row): Kantor
    {
        return Kantor::create([
            'nama' => $row['nama_kantor']
        ]);
    }
}
