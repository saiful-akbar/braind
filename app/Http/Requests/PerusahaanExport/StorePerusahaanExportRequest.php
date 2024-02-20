<?php

namespace App\Http\Requests\PerusahaanExport;

use App\Models\PerusahaanExport;
use Illuminate\Foundation\Http\FormRequest;

class StorePerusahaanExportRequest extends FormRequest
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

        PerusahaanExport::create([
            'user_id'         => user()->id,
            'kantor_id'       => $kantorId,
            'nama_perusahaan' => $this->nama_perusahaan,
            'npwp'            => $this->npwp,
            'peb'             => $this->peb,
            'bruto'           => $this->bruto,
            'netto'           => $this->netto,
            'devisa'          => $this->devisa,
            'bea_keluar'      => $this->bea_keluar,
            'jumlah_liter'    => $this->jumlah_liter,
            'jumlah_cukai'    => $this->jumlah_cukai,
            'tanggal_input'   => $this->tanggal_input ?? date('Y-m-d'),
        ]);
    }
}
