<?php

namespace App\Imports;

use App\Models\Pengawasan;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PengawasanImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    private array $types = [
        'Cukai EA',
        'Cukai HT',
        'Cukai MMEA',
        'Export',
        'Import',
    ];

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
        $types = implode(",", $this->types);

        return [
            'kantor_id'        => 'nullable|exists:kantor,id',
            'tipe'             => "required|in:{$types}",
            'sbp'              => 'required|string|max:30',
            'kantor'           => 'required|string|max:50',
            'nilai_barang'     => 'required|numeric|min:0',
            'total_kerugian'   => 'required|numeric',
            'potensi_kerugian' => 'required|numeric',
            'tindak_lanjut'    => 'required|string|max:100',
            'tanggal_input'    => 'nullable|date',
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
            'kantor_id'        => 'kantor ID',
            'tipe'             => 'tipe',
            'sbp'              => 'SBP',
            'kantor'           => 'kantor',
            'nilai_barang'     => 'nilai barang',
            'total_kerugian'   => 'total kerugian',
            'potensi_kerugian' => 'potensi kerugian',
            'tindak_lanjut'    => 'tindak lanjut',
            'tanggal_input'    => 'tanggal input',
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

        Pengawasan::create([
            'user_id'          => user()->id,
            'kantor_id'        => $kantorId,
            'tipe'             => $row['tipe'],
            'sbp'              => $row['sbp'],
            'kantor'           => $row['kantor'],
            'nilai_barang'     => $row['nilai_barang'],
            'total_kerugian'   => $row['total_kerugian'],
            'potensi_kerugian' => $row['potensi_kerugian'],
            'tindak_lanjut'    => $row['tindak_lanjut'],
            'tanggal_input'    => $tanggalInput,
        ]);
    }
}
