<?php

namespace App\Http\Requests\OperasiKapalPatroli;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperasiKapalPatroliRequest extends FormRequest
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
            'kondisi_aktif'        => 'boolean',
            'cetak'                => 'boolean',
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

        $this->operasi->nomor_lambung        = $this->nomor_lambung;
        $this->operasi->kondisi              = $this->kondisi;
        $this->operasi->nomor_spb            = $this->nomor_spb;
        $this->operasi->tanggal_spb          = $this->tanggal_spb;
        $this->operasi->penerbit_spb         = $this->penerbit_spb;
        $this->operasi->jumlah_hari          = $this->jumlah_hari;
        $this->operasi->catatan              = $this->catatan;
        $this->operasi->jenis_kapal          = $this->jenis_kapal;
        $this->operasi->merk_tipe_mesin      = $this->merk_tipe_mesin;
        $this->operasi->jumlah_mesin         = $this->jumlah_mesin;
        $this->operasi->tahun_pembuatan      = $this->tahun_pembuatan;
        $this->operasi->tahun_rehab          = $this->tahun_rehab;
        $this->operasi->kondisi_badan_kapal  = $this->kondisi_badan_kapal;
        $this->operasi->kondisi_mesin_kapal  = $this->kondisi_mesin_kapal;
        $this->operasi->status_pengoperasian = $this->status_pengoperasian;
        $this->operasi->kondisi_aktif        = $this->kondisi_aktif;
        $this->operasi->cetak                = $this->cetak;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
