<?php

namespace App\Imports;

use App\Models\Penindakan;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PenindakanImport implements ToModel, WithHeadingRow, WithValidation
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
        $data['tanggal_sbp'] = Date::excelToDateTimeObject($data['tanggal_sbp'])->format('Y-m-d');

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
            'kantor_id'              => 'nullable|exists:kantor,id',
            'kppbc'                  => 'required|string|max:100',
            'nomor_sbp'              => 'required|string|max:100',
            'tanggal_sbp'            => 'required|date|max:100',
            'kode_komoditi'          => 'required|exists:komoditi,kode',
            'jumlah'                 => 'required|numeric|min:0',
            'uraian'                 => 'required|string|max:200',
            'perkiraan_nilai_barang' => 'required|numeric|min:0',
            'potensi_kurang_bayar'   => 'required|numeric|min:0',
            'tindak_lanjut'          => 'nullable|string|max:100',
            'tanggal_input'          => 'nullable|date',
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
            'kantor_id'              => 'kantor ID',
            'kppbc'                  => 'target bea masuk',
            'nomor_sbp'              => 'nomor SBP',
            'tanggal_sbp'            => 'tanggal SBP',
            'kode_komoditi'          => 'kode komoditi',
            'jumlah'                 => 'jumlah',
            'uraian'                 => 'uraian',
            'perkiraan_nilai_barang' => 'perkiraan nilai barang',
            'potensi_kurang_bayar'   => 'potensi kurang bayar',
            'tindak_lanjut'          => 'tindak_lanjut',
            'tanggal_input'          => 'tanggal input',
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

        Penindakan::create([
            'user_id'                => user()->id,
            'kantor_id'              => $kantorId,
            'kppbc'                  => $row['kppbc'],
            'nomor_sbp'              => $row['nomor_sbp'],
            'tanggal_sbp'            => $row['tanggal_sbp'],
            'kode_komoditi'          => $row['kode_komoditi'],
            'jumlah'                 => $row['jumlah'],
            'uraian'                 => $row['uraian'],
            'perkiraan_nilai_barang' => $row['perkiraan_nilai_barang'],
            'potensi_kurang_bayar'   => $row['potensi_kurang_bayar'],
            'tindak_lanjut'          => $row['tindak_lanjut'],
            'tanggal_input'          => $tanggalInput,
        ]);
    }
}
