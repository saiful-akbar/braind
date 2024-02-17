<?php

namespace App\Http\Requests\PerusahaanMmea;

use App\Models\PerusahaanMmea;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusahaanMmeaRequest extends FormRequest
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
            'kantor_id'       => 'required|exists:kantor,id',
            'nama_perusahaan' => 'required|string|exists:perusahaan,nama',
            'nppbkc'          => 'required|string|max:100',
            'jumlah_dokumen'  => 'required|numeric|min:0',
            'jumlah_liter'    => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
            'tanggal_input'   => 'nullable|date',
        ];
    }

    /**
     * Perbarui data perusahaan mmea.
     *
     * @return void
     */
    public function update(): void
    {
        $this->perusahaan->update([
            'kantor_id'       => $this->kantor_id,
            'nama_perusahaan' => $this->nama_perusahaan,
            'nppbkc'          => $this->nppbkc,
            'jumlah_dokumen'  => $this->jumlah_dokumen,
            'jumlah_liter'    => $this->jumlah_liter,
            'jumlah_cukai'    => $this->jumlah_cukai,
            'tanggal_input'   => $this->tanggal_input ?? date('Y-m-d'),
        ]);
    }
}
