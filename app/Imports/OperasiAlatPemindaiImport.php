<?php

namespace App\Imports;

use App\Models\OperasiAlatPemindai;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class OperasiAlatPemindaiImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * Persiapan sebelum data divalidasi.
     *
     * @param array $data
     * @param int $index
     * @return array
     */
    public function prepareForValidation(array $data): array
    {
        $data['ukuran']         = (string) $data['ukuran'];
        $data['nomor_seri']     = (string) $data['nomor_seri'];
        $data['hasil_keluaran'] = (string) $data['hasil_keluaran'];
        $data['tampilan']       = ucfirst($data['tampilan']);

        if (gettype($data['tanggal_input']) == 'integer') {
            $data['tanggal_input']  = Date::excelToDateTimeObject($data['tanggal_input'])->format('Y-m-d');
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
        $minYear = date('Y') - 100;
        $maxYear = date('Y');

        return [
            'kantor_id'         => 'nullable|exists:kantor,id',
            'pemindai'          => 'required|string|max:30',
            'nama_alat'         => 'required|string|max:50',
            'ukuran'            => 'required|string|max:10',
            'merek'             => 'required|string|max:30',
            'tipe'              => 'required|string|max:20',
            'nomor_seri'        => 'required|string|max:30',
            'tampilan'          => 'required|string|in:Tunggal,Ganda',
            'tahun_perolehan'   => "required|integer|digits:4|min:$minYear|max:$maxYear",
            'kondisi'           => 'required|string|max:50',
            'lokasi_penempatan' => 'required|string|max:50',
            'jam_operasi'       => 'required|numeric|max:1000',
            'jam_pemindaian'    => 'required|numeric|max:1000',
            'jumlah_pemindaian' => 'required|numeric|min:0|max:1000000',
            'hasil_keluaran'    => 'required|string|max:250',
            'catatan'           => 'required|string|max:250',
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
            'kantor_id'         => 'kantor ID',
            'pemindai'          => 'pemindai',
            'nama_alat'         => 'nama alat',
            'ukuran'            => 'ukuran',
            'merek'             => 'merek',
            'tipe'              => 'tipe',
            'nomor_seri'        => 'nomor seri',
            'tampilan'          => 'tampilan',
            'tahun_perolehan'   => 'tahun perolehan',
            'kondisi'           => 'kondisi',
            'lokasi_penempatan' => 'lokasi penempatan',
            'jam_operasi'       => 'jam operasi',
            'jam_pemindaian'    => 'jam pemindaian',
            'jumlah_pemindaian' => 'jumlah pemindaian',
            'hasil_keluaran'    => 'hasil keluaran',
            'catatan'           => 'catatan',
            'tanggal_input'     => 'tanggal input',
            'cetak_laporan'     => 'Cetak Laporan',
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

        OperasiAlatPemindai::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'pemindai'          => $row['pemindai'],
            'nama_alat'         => $row['nama_alat'],
            'ukuran'            => $row['ukuran'],
            'merek'             => $row['merek'],
            'tipe'              => $row['tipe'],
            'nomor_seri'        => $row['nomor_seri'],
            'tampilan'          => $row['tampilan'],
            'tahun_perolehan'   => $row['tahun_perolehan'],
            'kondisi'           => $row['kondisi'],
            'lokasi_penempatan' => $row['lokasi_penempatan'],
            'jam_operasi'       => $row['jam_operasi'],
            'jam_pemindaian'    => $row['jam_pemindaian'],
            'jumlah_pemindaian' => $row['jumlah_pemindaian'],
            'hasil_keluaran'    => $row['hasil_keluaran'],
            'catatan'           => $row['catatan'],
            'tanggal_input'     => $tanggalInput,
            'cetak'             => strtolower($row['cetak_laporan']) === 'ya',
        ]);
    }
}
