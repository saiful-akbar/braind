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
            'kantor_id'     => 'nullable|exists:kantor,id',
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
            'kantor_id'     => 'ID kantor',
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
        // Jika user sebagai admin dan dan request kantor_id tidak kosong...
        // ...ambil data kantor_id dari request. Jika user bukan admin atau request...
        // ...kantor_id kosong ambil data kantor_id dari user yang sedang login.
        if (user()->admin && !empty($row['kantor_id'])) {
            $kantorId = $row['kantor_id'];
        } else {
            $kantorId = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong...
        // ...ambil data tanggal_input dari request. Selain dari itu...
        // ...ambil tanggal hari ini.
        if (user()->admin && !empty($row['tanggal_input'])) {
            $tanggalInput = $row['tanggal_input'];
        } else {
            $tanggalInput = date('Y-m-d');
        }

        return Sbp::create([
            'kantor_id'     => $kantorId,
            'user_id'       => user()->id,
            'jumlah'        => $row['jumlah'],
            'tindak_lanjut' => $row['tindak_lanjut'],
            'tanggal_input' => $tanggalInput,
        ]);
    }
}
