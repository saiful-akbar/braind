<?php

namespace App\Imports;

use App\Models\PerusahaanHtHptl;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PerusahaanHtHptlImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        DB::transaction(function () use ($rows): void {
            foreach ($rows as $row) {
                PerusahaanHtHptl::create([
                    'user_id'         => user()->id,
                    'kantor_id'       => $row['id_kantor'],
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
        });
    }
}
