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
            'kantor_id'     => 'nullable|exists:kantor,id',
            'nomor_lambung' => 'required|string|max:30',
            'kondisi'       => 'required|string|max:50',
            'nomor_spb'     => 'required|string|max:30',
            'tanggal_spb'   => 'required|date',
            'penerbit_spb'  => 'required|string|max:30',
            'jumlah_hari'   => 'required|integer|max:1000',
            'catatan'       => 'required|string|max:250',
            'tanggal_input' => 'nullable|date',
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

        $this->operasi->nomor_lambung = $this->nomor_lambung;
        $this->operasi->kondisi       = $this->kondisi;
        $this->operasi->nomor_spb     = $this->nomor_spb;
        $this->operasi->tanggal_spb   = $this->tanggal_spb;
        $this->operasi->penerbit_spb  = $this->penerbit_spb;
        $this->operasi->jumlah_hari   = $this->jumlah_hari;
        $this->operasi->catatan       = $this->catatan;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
