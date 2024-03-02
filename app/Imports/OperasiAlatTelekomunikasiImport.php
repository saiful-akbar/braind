<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\OperasiAlatTelekomunikasi;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class OperasiAlatTelekomunikasiImport implements ToModel, WithHeadingRow, WithValidation
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
        $minYear = date('Y') - 100;
        $maxYear = date('Y');

        return [
            'kantor_id'         => 'nullable|exists:kantor,id',
            'nama_barang'       => 'required|string|max:100',
            'kode_barang'       => 'required|string|max:20',
            'nup'               => 'required|string|max:20',
            'jenis_perangkat'   => 'required|string|max:30',
            'harga_perolehan'   => 'required|numeric',
            'tahun_perolehan'   => "required|integer|min:$minYear|max:$maxYear",
            'merek'             => 'required|string|max:50',
            'tipe'              => 'required|string|max:50',
            'rentang_frekuensi' => 'required|string|max:20',
            'teknologi_digital' => 'required|string|max:30',
            'kondisi'           => 'required|string|max:20',
            'status'            => 'required|string|max:30',
            'lokasi_penempatan' => 'required|string|max:50',
            'catatan'           => 'required|string|max:250',
            'tanggal_input'     => 'nullable|date',
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
            'nama_barang'       => 'nama barang',
            'kode_barang'       => 'kode barang',
            'nup'               => 'NUP',
            'jenis_perangkat'   => 'jenis perangkat',
            'harga_perolehan'   => 'harga perolehan',
            'tahun_perolehan'   => 'tahun perolehan',
            'merek'             => 'merek',
            'tipe'              => 'tipe',
            'rentang_frekuensi' => 'rentang frekuensi',
            'teknologi_digital' => 'teknologi digital',
            'kondisi'           => 'kondisi',
            'status'            => 'status',
            'lokasi_penempatan' => 'lokasi penempatan',
            'catatan'           => 'catatan',
            'tanggal_input'     => 'tanggal input',
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

        OperasiAlatTelekomunikasi::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'nama_barang'       => $row['nama_barang'],
            'kode_barang'       => $row['kode_barang'],
            'nup'               => $row['nup'],
            'jenis_perangkat'   => $row['jenis_perangkat'],
            'harga_perolehan'   => $row['harga_perolehan'],
            'tahun_perolehan'   => $row['tahun_perolehan'],
            'merek'             => $row['merek'],
            'tipe'              => $row['tipe'],
            'rentang_frekuensi' => $row['rentang_frekuensi'],
            'teknologi_digital' => $row['teknologi_digital'],
            'kondisi'           => $row['kondisi'],
            'status'            => $row['status'],
            'lokasi_penempatan' => $row['lokasi_penempatan'],
            'catatan'           => $row['catatan'],
            'tanggal_input'     => $tanggalInput,
        ]);
    }
}
