<?php

namespace App\Http\Requests\PerusahaanExport;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusahaanExportRequest extends FormRequest
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
            'kantor_id'       => 'nullable|exists:kantor,id',
            'nama_perusahaan' => 'required|string|max:100|exists:perusahaan,nama',
            'npwp'            => 'required|string|max:20',
            'peb'             => 'required|numeric|min:0',
            'bruto'           => 'required|numeric|min:0',
            'netto'           => 'required|numeric|min:0',
            'devisa'          => 'required|numeric|min:0',
            'bea_keluar'      => 'required|numeric|min:0',
            'jumlah_liter'    => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
            'tanggal_input'   => 'nullable|date',
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
        $this->perusahaan->peb = $this->peb;
        $this->perusahaan->bruto = $this->bruto;
        $this->perusahaan->netto = $this->netto;
        $this->perusahaan->devisa = $this->devisa;
        $this->perusahaan->bea_keluar = $this->bea_keluar;
        $this->perusahaan->jumlah_liter = $this->jumlah_liter;
        $this->perusahaan->jumlah_cukai = $this->jumlah_cukai;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->perusahaan->tanggal_input = $this->tanggal_input;
        } else {
            $this->perusahaan->tanggal_input = date('Y-m-d');
        }

        $this->perusahaan->save();
    }
}
