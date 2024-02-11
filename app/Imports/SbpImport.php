<?php

namespace App\Imports;

use App\Models\Sbp;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class SbpImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'id_kantor'     => 'nullable|exists:kantor,id',
            'jumlah'        => 'required|numeric|min:0',
            'tindak_lanjut' => 'required|numeric|min:0',
            'tanggal_input' => 'nullable|date',
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
            'id_kantor'     => 'ID kantor',
            'jumlah'        => 'jumlah',
            'tindak_lanjut' => 'tindak lanjut',
            'tanggal_input' => 'tanggal input',
        ];
    }

    /**
     * Insert data ke database
     */
    public function model(array $row)
    {
        if (user()->admin && !is_null($row['id_kantor'])) {
            $kantorId = $row['id_kantor'];
        } else {
            $kantorId = user()->kantor_id;
        }

        return Sbp::create([
            'kantor_id'     => $kantorId,
            'user_id'       => user()->id,
            'jumlah'        => $row['jumlah'],
            'tindak_lanjut' => $row['tindak_lanjut'],
            'tanggal_input' => $row['tanggal_input'] ?? date('Y-m-d'),
        ]);
    }
}
