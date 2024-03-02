<?php

namespace App\Imports;

use App\Models\OperasiKapalPatroli;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class OperasiKapalPatroliImport implements ToModel, WithHeadingRow, WithValidation
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
        $data['tanggal_spb'] = Date::excelToDateTimeObject($data['tanggal_spb'])->format('Y-m-d');

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
            'kantor_id'     => 'nullable|exists:kantor,id',
            'nomor_lambung' => 'required|string|max:30',
            'kondisi'       => 'required|string|max:50',
            'nomor_spb'     => 'required|string|max:30',
            'tanggal_spb'   => 'required|date',
            'penerbit_spb'  => 'required|string|max:30',
            'jumlah_hari'   => 'required|integer|max:1000',
            'catatan'       => 'required|string|max:250',
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
            'kantor_id'     => 'Kantor ID',
            'nomor_lambung' => 'nomor lambung',
            'kondisi'       => 'kondisi',
            'nomor_spb'     => 'nomor spb',
            'tanggal_spb'   => 'tanggal spb',
            'penerbit_spb'  => 'penerbit spb',
            'jumlah_hari'   => 'jumlah hari',
            'catatan'       => 'catatan',
            'tanggal_input' => 'tanggal input',
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

        OperasiKapalPatroli::create([
            'user_id'       => user()->id,
            'kantor_id'     => $kantorId,
            'nomor_lambung' => $row['nomor_lambung'],
            'kondisi'       => $row['kondisi'],
            'nomor_spb'     => $row['nomor_spb'],
            'tanggal_spb'   => $row['tanggal_spb'],
            'penerbit_spb'  => $row['penerbit_spb'],
            'jumlah_hari'   => $row['jumlah_hari'],
            'catatan'       => $row['catatan'],
            'tanggal_input' => $tanggalInput,
        ]);
    }
}
