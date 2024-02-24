<?php

namespace App\Imports;

use App\Models\Penerimaan;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PenerimaanImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Persiapan sebelum data divalidasi.
     *
     * @param array $data
     * @param int $index
     * @return array
     */
    public function prepareForValidation(array $data, int $index): array
    {
        $data['tanggal_input'] = Date::excelToDateTimeObject($data['tanggal_input'])->format('Y-m-d');

        return $data;
    }

    /**
     * Aturan validasi
     * 
     * @return array
     */
    public function rules(): array
    {
        return [
            'kantor_id'            => 'nullable|exists:kantor,id',
            'target_bea_masuk'     => 'required|numeric|min:0',
            'realisasi_bea_masuk'  => 'required|numeric|min:0',
            'target_bea_keluar'    => 'required|numeric|min:0',
            'realisasi_bea_keluar' => 'required|numeric|min:0',
            'target_cukai'         => 'required|numeric|min:0',
            'realisasi_cukai'      => 'required|numeric|min:0',
            'tanggal_input'        => 'nullable|date',
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
            'kantor_id'            => 'kantor ID',
            'target_bea_masuk'     => 'target bea masuk',
            'realisasi_bea_masuk'  => 'realisasi bea masuk',
            'target_bea_keluar'    => 'target bea keluar',
            'realisasi_bea_keluar' => 'realisasi bea kelauar',
            'target_cukai'         => 'target cukai',
            'realisasi_cukai'      => 'realisasi cukai',
            'tanggal_input'        => 'tanggal input',
        ];
    }

    /**
     * Insert data ke database
     *
     * @param array $row
     * @return void
     */
    public function model(array $row): void
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

        Penerimaan::create([
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'target_bea_masuk'     => $row['target_bea_masuk'],
            'realisasi_bea_masuk'  => $row['realisasi_bea_masuk'],
            'target_bea_keluar'    => $row['target_bea_keluar'],
            'realisasi_bea_keluar' => $row['realisasi_bea_keluar'],
            'target_cukai'         => $row['target_cukai'],
            'realisasi_cukai'      => $row['realisasi_cukai'],
            'tanggal_input'        => $tanggalInput,
        ]);
    }
}
