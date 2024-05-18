<?php

namespace App\Imports;

use App\Models\OperasiLainnya;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class OperasiLainnyaImport implements ToModel, WithHeadingRow, WithValidation
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
        if (gettype($data['tanggal_input']) == 'integer') {
            $data['tanggal_input'] = Date::excelToDateTimeObject($data['tanggal_input'])->format('Y-m-d');
        }

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
            'kantor_id'         => 'nullable|exists:kantor,id',
            'jenis_operasi'     => 'required|max:30',
            'merek'             => 'required|max:30',
            'tipe'              => 'required|max:30',
            'lokasi_penempatan' => 'required|max:30',
            'kondisi'           => 'required|max:50',
            'catatan'           => 'required|max:250',
            'tanggal_input'     => 'nullable|date',
            'cetak_laporan'     => 'in:Ya,ya,Tidak,tidak',
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
            'kantor_id'         => 'Kantor ID',
            'jenis_operasi'     => 'jenis operasi',
            'merek'             => 'merek',
            'tipe'              => 'tipe',
            'lokasi_penempatan' => 'lokasi penempatan',
            'kondisi'           => 'kondisi',
            'catatan'           => 'catatan',
            'tanggal_input'     => 'tanggal input',
            'cetak_laporan'     => 'cetak laporan'
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
        // Jika user sebagai admin dan dan request kantor_id tidak kosong
        // ambil data kantor_id dari request. Jika user bukan admin atau request
        // kantor_id kosong ambil data kantor_id dari user yang sedang login.
        if (user()->admin && !empty($row['kantor_id'])) {
            $kantorId = $row['kantor_id'];
        } else {
            $kantorId = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong
        // ambil data tanggal_input dari request. Selain dari itu
        // ambil tanggal hari ini.
        if (user()->admin && !empty($row['tanggal_input'])) {
            $tanggalInput = $row['tanggal_input'];
        } else {
            $tanggalInput = date('Y-m-d');
        }

        OperasiLainnya::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'jenis_operasi'     => $row['jenis_operasi'],
            'merek'             => $row['merek'],
            'tipe'              => $row['tipe'],
            'lokasi_penempatan' => $row['lokasi_penempatan'],
            'kondisi'           => $row['kondisi'],
            'catatan'           => $row['catatan'],
            'tanggal_input'     => $tanggalInput,
            'cetak'             => strtolower($row['cetak_laporan']) === 'ya',
        ]);
    }
}
