<?php

namespace App\Imports;

use App\Models\PerusahaanHtHptl;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PerusahaanHtHptlImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Aturan validasi
     */
    public function rules(): array
    {
        return [
            'id_kantor'       => 'required|exists:kantor,id',
            'nama_perusahaan' => 'required|string|max:100',
            'nppbkc'          => 'required|string|max:100',
            'jumlah_ck'       => 'required|numeric|min:0',
            'jenis_bkc'       => 'required|string|max:100',
            'jumlah'          => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
        ];
    }

    /**
     * Insert data ke database
     */
    public function model(array $row)
    {
        return PerusahaanHtHptl::create([
            'user_id'         => user()->id,
            'kantor_id'       => user()->admin ? $row['id_kantor'] : user()->kantor_id,
            'nama_kantor'     => $row['nama_kantor'],
            'nama_perusahaan' => $row['nama_perusahaan'],
            'nppbkc'          => $row['nppbkc'],
            'jumlah_ck'       => $row['jumlah_ck'],
            'jenis_bkc'       => $row['jenis_bkc'],
            'jumlah'          => $row['jumlah'],
            'jumlah_cukai'    => $row['jumlah_cukai'],
            'tanggal_input'   => date('Y-m-d'),
        ]);
    }
}
