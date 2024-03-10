<?php

namespace App\Http\Requests\OperasiSenjataApi;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperasiSenjataApiRequest extends FormRequest
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

        $this->operasi->jenis_kaliber            = $this->jenis_kaliber;
        $this->operasi->nomor_senjata            = $this->nomor_senjata;
        $this->operasi->nama_pemegang_senjata    = $this->nama_pemegang_senjata;
        $this->operasi->pangkat_pemegang_senjata = $this->pangkat_pemegang_senjata;
        $this->operasi->jabatan_pemegang_senjata = $this->jabatan_pemegang_senjata;
        $this->operasi->nomor_buku_pas           = $this->nomor_buku_pas;
        $this->operasi->masa_berlaku             = $this->masa_berlaku;
        $this->operasi->kondisi                  = $this->kondisi;
        $this->operasi->jumlah_amunisi           = $this->jumlah_amunisi;
        $this->operasi->catatan                  = $this->catatan;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
