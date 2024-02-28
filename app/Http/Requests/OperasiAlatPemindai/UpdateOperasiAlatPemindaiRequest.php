<?php

namespace App\Http\Requests\OperasiAlatPemindai;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperasiAlatPemindaiRequest extends FormRequest
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
            'kantor_id'         => 'nullable|exists:kantor,id',
            'pemindai'          => 'required|string|max:30',
            'nama_alat'         => 'required|string|max:50',
            'ukuran_alat'       => 'required|string|max:50',
            'merek'             => 'required|string|max:30',
            'tipe'              => 'required|string|max:20',
            'nomor_seri'        => 'required|string|max:30',
            'tampilan'          => 'required|string|in:runggal,ganda',
            'tahun_perolehan'   => 'required|date_format:Y|min:1970|max:' . date('Y'),
            'kondisi'           => 'required|string|max:50',
            'lokasi_penempatan' => 'required|string|max:50',
            'jam_operasi'       => 'required|date_format:H:i',
            'jam_pemindaian'    => 'required|date_format:H:i',
            'jumlah_pemindaian' => 'required|numeric|min:0|max:1000',
            'hasil_keluaran'    => 'required|string|max:250',
            'catatan'           => 'required|string|max:250',
            'tanggal_input'     => 'nullable|date',
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

        $this->operasi->pemindaian        = $this->pemindaian;
        $this->operasi->nama_alat         = $this->nama_alat;
        $this->operasi->ukuran_alat       = $this->ukuran_alat;
        $this->operasi->merek             = $this->merek;
        $this->operasi->tipe              = $this->tipe;
        $this->operasi->nomor_seri        = $this->nomor_seri;
        $this->operasi->tampilan          = $this->tampilan;
        $this->operasi->tahun_perolehan   = $this->tahun_perolehan;
        $this->operasi->kondisi           = $this->kondisi;
        $this->operasi->lokasi_penempatan = $this->lokasi_penempatan;
        $this->operasi->jam_operasi       = $this->jam_operasi;
        $this->operasi->jam_pemindaian    = $this->jam_pemindaian;
        $this->operasi->jumlah_pemindaian = $this->jumlah_pemindaian;
        $this->operasi->hasil_keluaran    = $this->hasil_keluaran;
        $this->operasi->catatan           = $this->catatan;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
