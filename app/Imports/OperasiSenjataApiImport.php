<?php

namespace App\Imports;

use App\Models\OperasiSenjataApi;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class OperasiSenjataApiImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Persiapan sebelum data divalidasi.
     *
     * @param array $data
     * @return array
     */
    public function prepareForValidation(array $data): array
    {
        $data['nomor_senjata'] = (string) $data['nomor_senjata'];

        if (gettype($data['masa_berlaku']) == 'integer') {
            $data['masa_berlaku'] = Date::excelToDateTimeObject($data['masa_berlaku'])->format('Y-m-d');
        }

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
            'kantor_id'                => 'nullable|exists:kantor,id',
            'jenis_kaliber'            => 'required|string|max:30',
            'nomor_senjata'            => 'required|string|max:30',
            'nama_pemegang_senjata'    => 'required|string|max:50',
            'pangkat_pemegang_senjata' => 'required|string|max:50',
            'jabatan_pemegang_senjata' => 'required|string|max:50',
            'nomor_buku_pas'           => 'required|string|max:30',
            'masa_berlaku'             => 'required|date',
            'kondisi'                  => 'required|string|max:30',
            'jumlah_amunisi'           => 'required|integer|max:1000000',
            'catatan'                  => 'required|string|max:250',
            'tanggal_input'            => 'nullable|date',
            'cetak_laporan'            => 'in:Ya,ya,Tidak,tidak',
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
            'kantor_id'                => 'Kantor ID',
            'jenis_kaliber'            => 'jenis kaliber',
            'nomor_senjata'            => 'nomor senjata',
            'nama_pemegang_senjata'    => 'nama pemegang senjata',
            'pangkat_pemegang_senjata' => 'pangkat pemegang senjata',
            'jabatan_pemegang_senjata' => 'jabatan pemegang senjata',
            'nomor_buku_pas'           => 'nomor buku PAS',
            'masa_berlaku'             => 'masa berlaku',
            'kondisi'                  => 'kondisi',
            'jumlah_amunisi'           => 'jumlah amunisi',
            'catatan'                  => 'catatan',
            'tanggal_input'            => 'tanggal input',
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

        OperasiSenjataApi::create([
            'user_id'                  => user()->id,
            'kantor_id'                => $kantorId,
            'jenis_kaliber'            => $row['jenis_kaliber'],
            'nomor_senjata'            => $row['nomor_senjata'],
            'nama_pemegang_senjata'    => $row['nama_pemegang_senjata'],
            'pangkat_pemegang_senjata' => $row['pangkat_pemegang_senjata'],
            'jabatan_pemegang_senjata' => $row['jabatan_pemegang_senjata'],
            'nomor_buku_pas'           => $row['nomor_buku_pas'],
            'masa_berlaku'             => $row['masa_berlaku'],
            'kondisi'                  => $row['kondisi'],
            'jumlah_amunisi'           => $row['jumlah_amunisi'],
            'catatan'                  => $row['catatan'],
            'tanggal_input'            => $tanggalInput,
            'cetak'                    => strtolower($row['cetak_laporan']) === 'ya',
        ]);
    }
}
