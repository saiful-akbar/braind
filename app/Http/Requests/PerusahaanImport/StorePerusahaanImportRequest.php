<?php

namespace App\Http\Requests\PerusahaanImport;

use App\Models\PerusahaanImport;
use Illuminate\Foundation\Http\FormRequest;

class StorePerusahaanImportRequest extends FormRequest
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

        // Jika user sebagai admin dan tanggal_input tidak kosong...
        // ...ambil data tanggal_input dari request. Selain dari itu...
        // ...ambil tanggal hari ini.
        if (user()->admin && !empty($this->tanggal_input)) {
            $tanggalInput = $this->tanggal_input;
        } else {
            $tanggalInput = date('Y-m-d');
        }

        PerusahaanImport::create([
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'nama_perusahaan'      => $this->nama_perusahaan,
            'npwp'                 => $this->npwp,
            'pib'                  => $this->pib,
            'pembayaran_bea_masuk' => $this->pembayaran_bea_masuk,
            'netto'                => $this->netto,
            'bruto'                => $this->bruto,
            'total_pembayaran'     => $this->total_pembayaran,
            'bea_masuk'            => $this->bea_masuk,
            'tanggal_input'        => $tanggalInput,
        ]);
    }
}
