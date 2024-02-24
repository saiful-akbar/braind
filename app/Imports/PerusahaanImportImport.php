<?php

namespace App\Imports;

use App\Models\PerusahaanImport;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PerusahaanImportImport implements ToModel, WithHeadingRow, WithValidation
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
            'nama_perusahaan'      => 'required|string|max:100|exists:perusahaan,nama',
            'npwp'                 => 'required|string|max:20',
            'pib'                  => 'required|numeric|min:0',
            'pembayaran_bea_masuk' => 'required|numeric|min:0',
            'netto'                => 'required|numeric|min:0',
            'bruto'                => 'required|numeric|min:0',
            'total_pembayaran'     => 'required|numeric|min:0',
            'bea_masuk'            => 'required|numeric|min:0',
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
            'kantor_id'            => 'ID kantor',
            'nama_perusahaan'      => 'nama perusahaan',
            'npwp'                 => 'NPWP',
            'pib'                  => 'PIB',
            'pembayaran_bea_masuk' => 'pembayaran bea masuk',
            'netto'                => 'netto',
            'bruto'                => 'bruto',
            'total_pembayaran'     => 'total pembayaran',
            'bea_masuk'            => 'bea masuk',
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

        PerusahaanImport::create([
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'nama_perusahaan'      => $row['nama_perusahaan'],
            'npwp'                 => $row['npwp'],
            'pib'                  => $row['pib'],
            'pembayaran_bea_masuk' => $row['pembayaran_bea_masuk'],
            'netto'                => $row['netto'],
            'bruto'                => $row['bruto'],
            'total_pembayaran'     => $row['total_pembayaran'],
            'bea_masuk'            => $row['bea_masuk'],
            'tanggal_input'        => $tanggalInput,
        ]);
    }
}
