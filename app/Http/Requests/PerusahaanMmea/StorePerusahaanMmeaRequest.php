<?php

namespace App\Http\Requests\PerusahaanMmea;

use App\Models\PerusahaanMmea;
use Illuminate\Foundation\Http\FormRequest;

class StorePerusahaanMmeaRequest extends FormRequest
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
            'nppbkc'          => 'required|string|max:100',
            'jumlah_dokumen'  => 'required|numeric|min:0',
            'jumlah_liter'    => 'required|numeric|min:0',
            'jumlah_cukai'    => 'required|numeric|min:0',
            'tanggal_input'   => 'nullable|date',
        ];
    }

    /**
     * Simpan data perusahaan ke database.
     *
     * @return void
     */
    public function insert(): void
    {
        // Jika user sebagai admin dan kantor_id diisi ambil kantor_id dari request, jika kosong
        // ambil kantor_id yang dimiliki user.
        // Jika user bukan admin ambil kantor_id yang dimiliki user.
        if (user()->admin) {
            $kantorId = $this->kantor_id ?? user()->kantor_id;
        } else {
            $kantorId = user()->kantor_id;
        }

        PerusahaanMmea::create([
            'user_id'         => user()->id,
            'kantor_id'       => $kantorId,
            'nama_perusahaan' => $this->nama_perusahaan,
            'nppbkc'          => $this->nppbkc,
            'jumlah_dokumen'  => $this->jumlah_dokumen,
            'jumlah_liter'    => $this->jumlah_liter,
            'jumlah_cukai'    => $this->jumlah_cukai,
            'tanggal_input'   => $this->tanggal_input ?? date('Y-m-d'),
        ]);
    }
}
