<?php

namespace App\Http\Requests\Penindakan;

use App\Models\Penindakan;
use Illuminate\Foundation\Http\FormRequest;

class StorePenindakanRequest extends FormRequest
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

        Penindakan::create([
            'user_id'                => user()->id,
            'kantor_id'              => $kantorId,
            'kppbc'                  => $this->kppbc,
            'nomor_sbp'              => $this->nomor_sbp,
            'tanggal_sbp'            => $this->tanggal_sbp,
            'kode_komoditi'          => $this->kode_komoditi,
            'jumlah'                 => $this->jumlah,
            'uraian'                 => $this->uraian,
            'perkiraan_nilai_barang' => $this->perkiraan_nilai_barang,
            'potensi_kurang_bayar'   => $this->potensi_kurang_bayar,
            'tindak_lanjut'          => $this->tindak_lanjut,
            'tanggal_input'          => $tanggalInput,
        ]);
    }
}
