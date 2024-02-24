<?php

namespace App\Http\Requests\PerusahaanImports;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusahaanImportRequest extends FormRequest
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
            'nama_perusahaan'      => 'required|string|max:100|exists:perusahaan,nama',
            'npwp'                 => 'required|string|max:20',
            'pib'                  => 'required|numeric|min:0',
            'pembayaran_bea_masuk' => 'required|numeric|min:0',
            'netto'                => 'required|numeric|min:0',
            'bruto'                => 'required|numeric|min:0',
            'total_pembayaran'     => 'required|numeric|min:0',
            'bea_masuk'            => 'required|numeric|min:0',
            'tanggal_input'        => 'nullable|date',
        ];
    }

    /**
     * SImpan perubahan ke database.
     *
     * @return void
     */
    public function update(): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $this->perusahaan->kantor_id = $this->kantor_id;
        }

        $this->perusahaan->nama_perusahaan = $this->nama_perusahaan;
        $this->perusahaan->npwp = $this->npwp;
        $this->perusahaan->pib = $this->pib;
        $this->perusahaan->pembayaran_bea_masuk = $this->pembayaran_bea_masuk;
        $this->perusahaan->netto = $this->netto;
        $this->perusahaan->bruto = $this->bruto;
        $this->perusahaan->total_pembayaran = $this->total_pembayaran;
        $this->perusahaan->bea_masuk = $this->bea_masuk;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->perusahaan->tanggal_input = $this->tanggal_input;
        } else {
            $this->perusahaan->tanggal_input = date('Y-m-d');
        }

        $this->perusahaan->save();
    }
}
