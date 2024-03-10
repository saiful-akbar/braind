<?php

namespace App\Http\Requests\Pengawasan;

use App\Models\Pengawasan;
use Illuminate\Foundation\Http\FormRequest;

class StorePengawasanRequest extends FormRequest
{
    private array $types = [
        'Cukai EA',
        'Cukai HT',
        'Cukai MMEA',
        'Export',
        'Import',
    ];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validari request
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
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
     * Simpan data perusahaan export ke database
     *
     * @return void
     */
    public function insert(): void
    {
        // Jika user sebagai admin dan dan request kantor_id tidak kosong...
        // ...ambil data kantor_id dari request. Jika user bukan admin atau request...
        // ...kantor_id kosong ambil data kantor_id dari user yang sedang login.
        if (user()->admin && !empty($this->kantor_id)) {
            $kantorId = $this->kantor_id;
        } else {
            $kantorId = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong...
        // ...ambil data tanggal_input dari request. Selain dari itu...
        // ...ambil tanggal hari ini.
        if (user()->admin && !empty($this->tanggal_input)) {
            $tanggalInput = $this->tanggal_input;
        } else {
            $tanggalInput = date('Y-m-d');
        }

        Pengawasan::create([
            'user_id'          => user()->id,
            'kantor_id'        => $kantorId,
            'tipe'             => $this->tipe,
            'sbp'              => $this->sbp,
            'kantor'           => $this->kantor,
            'nilai_barang'     => $this->nilai_barang,
            'total_kerugian'   => $this->total_kerugian,
            'potensi_kerugian' => $this->potensi_kerugian,
            'tindak_lanjut'    => $this->tindak_lanjut,
            'tanggal_input'    => $tanggalInput,
        ]);
    }
}
