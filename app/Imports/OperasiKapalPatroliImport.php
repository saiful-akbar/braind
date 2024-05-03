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
        if (gettype($data['tanggal_input']) == 'integer') {
            $data['tanggal_input'] = Date::excelToDateTimeObject($data['tanggal_input'])->format('Y-m-d');
        }

        if (gettype($data['tanggal_input']) == 'integer') {
            $data['tanggal_spb'] = Date::excelToDateTimeObject($data['tanggal_spb'])->format('Y-m-d');
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
            'kantor_id'            => 'nullable|exists:kantor,id',
            'nomor_lambung'        => 'required|string|max:30',
            'kondisi'              => 'required|string|max:50',
            'nomor_spb'            => 'required|string|max:30',
            'tanggal_spb'          => 'required|date',
            'penerbit_spb'         => 'required|string|max:30',
            'jumlah_hari'          => 'required|integer|max:1000',
            'catatan'              => 'required|string|max:250',
            'tanggal_input'        => 'nullable|date',
            'jenis_kapal'          => 'nullable|string|max:100',
            'merk_tipe_mesin'      => 'nullable|string|max:100',
            'jumlah_mesin'         => 'nullable|numeric',
            'tahun_pembuatan'      => 'nullable|date_format:Y',
            'tahun_rehab'          => 'nullable|date_format:Y',
            'kondisi_badan_kapal'  => 'nullable|string|max:100',
            'kondisi_mesin_kapal'  => 'nullable|string|max:100',
            'status_pengoperasion' => 'in:aktif,Aktif,Tidak Aktif,tidak aktif',
            'kondisi_aktif'        => 'in:ya,Ya,Tidak,tidak',
            'cetak_laporan'        => 'in:ya,Ya,Tidak,tidak',
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
            'kantor_id'            => 'Kantor ID',
            'nomor_lambung'        => 'nomor lambung',
            'kondisi'              => 'kondisi',
            'nomor_spb'            => 'nomor spb',
            'tanggal_spb'          => 'tanggal spb',
            'penerbit_spb'         => 'penerbit spb',
            'jumlah_hari'          => 'jumlah hari',
            'catatan'              => 'catatan',
            'tanggal_input'        => 'tanggal input',
            'jenis_kapal'          => 'jenis kapal',
            'merk_tipe_mesin'      => 'merk tipe mesin',
            'jumlah_mesin'         => 'jumlah mesin',
            'tahun_pembuatan'      => 'tahun pembuatan',
            'tahun_rehab'          => 'tahun rehab',
            'kondisi_badan_kapal'  => 'kondisi badan kapal',
            'kondisi_mesin_kapal'  => 'kondisi mesin kapal',
            'status_pengoperasian' => 'status pengoperasian',
            'kondisi_aktif'        => 'kondisi aktif',
            'cetak_lapotan'        => 'cetak laporan',
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
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'nomor_lambung'        => $row['nomor_lambung'],
            'kondisi'              => $row['kondisi'],
            'nomor_spb'            => $row['nomor_spb'],
            'tanggal_spb'          => $row['tanggal_spb'],
            'penerbit_spb'         => $row['penerbit_spb'],
            'jumlah_hari'          => $row['jumlah_hari'],
            'catatan'              => $row['catatan'],
            'tanggal_input'        => $tanggalInput,
            'jenis_kapal'          => $row['jenis_kapal'],
            'merk_tipe_mesin'      => $row['merk_tipe_mesin'],
            'jumlah_mesin'         => $row['jumlah_mesin'],
            'tahun_pembuatan'      => $row['tahun_pembuatan'],
            'tahun_rehab'          => $row['tahun_rehab'],
            'kondisi_badan_kapal'  => $row['kondisi_badan_kapal'],
            'kondisi_mesin_kapal'  => $row['kondisi_mesin_kapal'],
            'status_pengoperasian' => $row['status_pengoperasian'],
            'kondisi_aktif'        => strtolower($row['kondisi_aktif']) === 'ya',
            'cetak'                => strtolower($row['cetak_laporan']) === 'ya',
        ]);
    }
}
