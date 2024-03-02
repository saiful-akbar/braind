<?php

namespace App\Http\Requests\OperasiAlatTelekomunikasi;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperasiAlatTelekomunikasiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
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
        ];
    }

    /**
     * Simpan perubahan ke database.
     *
     * @return void
     */
    public function update(): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $this->operasi->kantor_id = $this->kantor_id;
        }

        $this->operasi->nama_barang       = $this->nama_barang;
        $this->operasi->kode_barang       = $this->kode_barang;
        $this->operasi->nup               = $this->nup;
        $this->operasi->jenis_perangkat   = $this->jenis_perangkat;
        $this->operasi->harga_perolehan   = $this->harga_perolehan;
        $this->operasi->tahun_perolehan   = $this->tahun_perolehan;
        $this->operasi->merek             = $this->merek;
        $this->operasi->tipe              = $this->tipe;
        $this->operasi->rentang_frekuensi = $this->rentang_frekuensi;
        $this->operasi->teknologi_digital = $this->teknologi_digital;
        $this->operasi->kondisi           = $this->kondisi;
        $this->operasi->status            = $this->status;
        $this->operasi->lokasi_penempatan = $this->lokasi_penempatan;
        $this->operasi->catatan           = $this->catatan;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
