<?php

namespace App\Http\Requests\PerusahaanHtHptl;

use App\Models\PerusahaanHtHptl;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusahaanHtHptlRequest extends FormRequest
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
            'nama_perusahaan' => 'required|string|max:100',
            'nppbkc'          => 'required|string|max:100',
            'jumlah_ck'       => 'required|numeric|min:0',
            'jenis_bkc'       => 'required|string|max:100',
            'jumlah'          => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
            'tanggal_input'   => 'nullable|date',
        ];
    }

    /**
     * Update data database perusahaan
     */
    public function update(): void
    {
        PerusahaanHtHptl::findOrFail($this->id)->update([
            'user_id'         => user()->id,
            'kantor_id'       => user()->admin ? $this->kantor_id : user()->kantor_id,
            'nama_perusahaan' => $this->nama_perusahaan,
            'nppbkc'          => $this->nppbkc,
            'jumlah_ck'       => $this->jumlah_ck,
            'jenis_bkc'       => $this->jenis_bkc,
            'jumlah'          => $this->jumlah,
            'jumlah_cukai'    => $this->jumlah_cukai,
            'tanggal_input'   => $this->tanggal_input ?? date('Y-m-d'),
        ]);
    }
}
