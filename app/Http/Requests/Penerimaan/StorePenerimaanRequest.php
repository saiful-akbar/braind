<?php

namespace App\Http\Requests\Penerimaan;

use App\Models\Penerimaan;
use Illuminate\Foundation\Http\FormRequest;

class StorePenerimaanRequest extends FormRequest
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
            'target_bea_masuk'     => 'required|numeric|min:0',
            'realisasi_bea_masuk'  => 'required|numeric|min:0',
            'target_bea_keluar'    => 'required|numeric|min:0',
            'realisasi_bea_keluar' => 'required|numeric|min:0',
            'target_cukai'         => 'required|numeric|min:0',
            'realisasi_cukai'      => 'required|numeric|min:0',
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

        Penerimaan::create([
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'target_bea_masuk'     => $this->target_bea_masuk,
            'realisasi_bea_masuk'  => $this->realisasi_bea_masuk,
            'target_bea_keluar'    => $this->target_bea_keluar,
            'realisasi_bea_keluar' => $this->realisasi_bea_keluar,
            'target_cukai'         => $this->target_cukai,
            'realisasi_cukai'      => $this->realisasi_cukai,
            'tanggal_input'        => $tanggalInput,
        ]);
    }
}
