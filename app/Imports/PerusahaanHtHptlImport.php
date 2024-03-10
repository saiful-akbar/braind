<?php

namespace App\Imports;

use App\Models\PerusahaanHtHptl;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PerusahaanHtHptlImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Persiapan untuk validasi.
     *
     * @param array $data
     * @param integer $index
     * @return array
     */
    public function prepareForValidation(array $data, int $index): array
    {
        $data['tanggal_input'] = Date::excelToDateTimeObject($data['tanggal_input'])->format('Y-m-d');

        return $data;
    }

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'kantor_id'       => 'required|exists:kantor,id',
            'nama_perusahaan' => 'required|string|max:100',
            'nppbkc'          => 'required|string|max:100',
            'jumlah_ck'       => 'required|numeric|min:0',
            'jenis_bkc'       => 'required|string|max:100',
            'jumlah'          => 'required|numeric|min:0',
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
            'nama_perusahaan' => 'nama perusahaan',
            'nppbkc'          => 'NPPKBC',
            'jumlah_ck'       => 'jumlah CK',
            'jenis_bkc'       => 'jenis BKC',
            'jumlah'          => 'jumlah',
            'jumlah_cukai'    => 'jumlah cukai',
            'tanggal_input'   => 'tanggal input',
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
            $kantor = $row['kantor_id'];
        } else {
            $kantor = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong...
        // ...ambil data tanggal_input dari request. Selain dari itu...
        // ...ambil tanggal hari ini.
        if (user()->admin && !empty($row['tanggal_input'])) {
            $tanggalInput = $row['tanggal_input'];
        } else {
            $tanggalInput = date('Y-m-d');
        }

        return PerusahaanHtHptl::create([
            'user_id'         => user()->id,
            'kantor_id'       => $kantor,
            'nama_kantor'     => $row['nama_kantor'],
            'nama_perusahaan' => $row['nama_perusahaan'],
            'nppbkc'          => $row['nppbkc'],
            'jumlah_ck'       => $row['jumlah_ck'],
            'jenis_bkc'       => $row['jenis_bkc'],
            'jumlah'          => $row['jumlah'],
            'jumlah_cukai'    => $row['jumlah_cukai'],
            'tanggal_input'   => $tanggalInput,
        ]);
    }
}
