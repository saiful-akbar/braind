<?php

namespace App\Imports;

use App\Models\PerusahaanMmea;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class PerusahaanMmeaImport implements ToModel, WithHeadingRow, WithValidation
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
            'kantor_id'       => 'nullable|exists:kantor,id',
            'nama_kantor'     => 'nullable|exists:kantor,nama',
            'nama_perusahaan' => 'required|string|max:100|exists:perusahaan,nama',
            'nppbkc'          => 'required|string|max:100',
            'jumlah_dokumen'  => 'required|numeric|min:0',
            'jumlah_liter'    => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
            'tanggal_input'   => 'nullable|date',
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
            'kantor_id'       => 'ID kantor',
            'nama_kantor'     => 'nama kantor',
            'nama_perusahaan' => 'nama perusahaan',
            'nppbkc'          => 'NPPBKC',
            'jumlah_dokumen'  => 'jumlah dokumen',
            'jumlah_liter'    => 'jumlah liter',
            'jumlah_cukai'    => 'jumlah cukai',
            'tanggal_input'   => 'tanggal input',
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

        PerusahaanMmea::create([
            'user_id'         => user()->id,
            'kantor_id'       => $kantorId,
            'nama_perusahaan' => $row['nama_perusahaan'],
            'nppbkc'          => $row['nppbkc'],
            'jumlah_dokumen'  => $row['jumlah_dokumen'],
            'jumlah_liter'    => $row['jumlah_liter'],
            'jumlah_cukai'    => $row['jumlah_cukai'],
            'tanggal_input'   => $tanggalInput,
        ]);
    }
}
