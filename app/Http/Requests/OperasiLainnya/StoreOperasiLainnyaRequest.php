<?php

namespace App\Http\Requests\OperasiLainnya;

use App\Models\OperasiLainnya;
use Illuminate\Foundation\Http\FormRequest;

class StoreOperasiLainnyaRequest extends FormRequest
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
            'kantor_id'         => 'nullable|exists:kantor,id',
            'jenis_operasi'     => 'required|string|max:30',
            'merek'             => 'required|string|max:30',
            'tipe'              => 'required|string|max:30',
            'lokasi_penempatan' => 'required|string|max:30',
            'kondisi'           => 'required|string|max:50',
            'catatan'           => 'required|string|max:250',
            'tanggal_input'     => 'nullable|date',
            'cetak'             => 'boolean',
        ];
    }

    /**
     * Simpan data operasi lainnya ke database
     *
     * @return void
     */
    public function insert(): void
    {
        // Jika user sebagai admin dan dan request kantor_id tidak kosong
        // ambil data kantor_id dari request. Jika user bukan admin atau request
        // kantor_id kosong ambil data kantor_id dari user yang sedang login.
        if (user()->admin && !empty($this->kantor_id)) {
            $kantorId = $this->kantor_id;
        } else {
            $kantorId = user()->kantor_id;
        }

        // Jika user sebagai admin dan tanggal_input tidak kosong
        // ambil data tanggal_input dari request. Selain dari itu
        // ambil tanggal hari ini.
        if (user()->admin && !empty($this->tanggal_input)) {
            $tanggalInput = $this->tanggal_input;
        } else {
            $tanggalInput = date('Y-m-d');
        }

        OperasiLainnya::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'jenis_operasi'     => $this->jenis_operasi,
            'merek'             => $this->merek,
            'tipe'              => $this->tipe,
            'lokasi_penempatan' => $this->lokasi_penempatan,
            'kondisi'           => $this->kondisi,
            'catatan'           => $this->catatan,
            'tanggal_input'     => $tanggalInput,
            'cetak'             => $this->cetak,
        ]);
    }
}
