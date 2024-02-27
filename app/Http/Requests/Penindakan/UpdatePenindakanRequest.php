<?php

namespace App\Http\Requests\Penindakan;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePenindakanRequest extends FormRequest
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
     * Simpan perubahan ke database.
     *
     * @return void
     */
    public function update(): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $this->penindakan->kantor_id = $this->kantor_id;
        }

        $this->penindakan->kppbc = $this->kppbc;
        $this->penindakan->nomor_sbp = $this->nomor_sbp;
        $this->penindakan->tanggal_sbp = $this->tanggal_sbp;
        $this->penindakan->kode_komoditi = $this->kode_komoditi;
        $this->penindakan->jumlah = $this->jumlah;
        $this->penindakan->uraian = $this->uraian;
        $this->penindakan->perkiraan_nilai_barang = $this->perkiraan_nilai_barang;
        $this->penindakan->potensi_kurang_bayar = $this->potensi_kurang_bayar;
        $this->penindakan->tindak_lanjut = $this->tindak_lanjut;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->penindakan->tanggal_input = $this->tanggal_input;
        } else {
            $this->penindakan->tanggal_input = date('Y-m-d');
        }

        $this->penindakan->save();
    }
}
