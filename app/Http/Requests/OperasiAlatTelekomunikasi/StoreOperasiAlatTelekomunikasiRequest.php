<?php

namespace App\Http\Requests\OperasiAlatTelekomunikasi;

use App\Models\OperasiAlatTelekomunikasi;
use Illuminate\Foundation\Http\FormRequest;

class StoreOperasiAlatTelekomunikasiRequest extends FormRequest
{
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
            'cetak'             => 'boolean',
        ];
    }

    /**
     * Simpan data perusahaan export ke database
     *
     * @return void
     */
    public function insert(): void
    {

        // Jika user sebagai admin dan dan request kantor_id tidak kosong
        // ambil data kantor_id dari request. Jika user bukan admin atau request
        // kantor_id kosong ambil data kantor_id dari user yang sedang login.
        if (user()->admin && !empty($this->kantor_id)) {
            $kantorId = $this->kantor_id;
        } else {
            $kantorId = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong
        // ambil data tanggal_input dari request. Selain dari itu
        // ambil tanggal hari ini.
        if (user()->admin && !empty($this->tanggal_input)) {
            $tanggalInput = $this->tanggal_input;
        } else {
            $tanggalInput = date('Y-m-d');
        }

        OperasiAlatTelekomunikasi::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'nama_barang'       => $this->nama_barang,
            'kode_barang'       => $this->kode_barang,
            'nup'               => $this->nup,
            'jenis_perangkat'   => $this->jenis_perangkat,
            'harga_perolehan'   => $this->harga_perolehan,
            'tahun_perolehan'   => $this->tahun_perolehan,
            'merek'             => $this->merek,
            'tipe'              => $this->tipe,
            'rentang_frekuensi' => $this->rentang_frekuensi,
            'teknologi_digital' => $this->teknologi_digital,
            'kondisi'           => $this->kondisi,
            'status'            => $this->status,
            'lokasi_penempatan' => $this->lokasi_penempatan,
            'catatan'           => $this->catatan,
            'tanggal_input'     => $tanggalInput,
            'cetak'             => $this->cetak,
        ]);
    }
}
