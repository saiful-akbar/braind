<?php

namespace App\Http\Requests\OperasiAlatPemindai;

use App\Models\OperasiAlatPemindai;
use Illuminate\Foundation\Http\FormRequest;

class StoreOperasiAlatPemindaiRequest extends FormRequest
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
        $minYear = date('Y') - 100;
        $maxYear = date('Y');

        return [
            'kantor_id'         => 'nullable|exists:kantor,id',
            'pemindai'          => 'required|string|max:30',
            'nama_alat'         => 'required|string|max:50',
            'ukuran'            => 'required|string|max:10',
            'merek'             => 'required|string|max:30',
            'tipe'              => 'required|string|max:20',
            'nomor_seri'        => 'required|string|max:30',
            'tampilan'          => 'required|string|in:Tunggal,Ganda',
            'tahun_perolehan'   => "required|integer|digits:4|min:$minYear|max:$maxYear",
            'kondisi'           => 'required|string|max:50',
            'lokasi_penempatan' => 'required|string|max:50',
            'jam_operasi'       => 'required|numeric|max:1000',
            'jam_pemindaian'    => 'required|numeric|max:1000',
            'jumlah_pemindaian' => 'required|numeric|min:0|max:1000000',
            'hasil_keluaran'    => 'required|string|max:250',
            'catatan'           => 'required|string|max:250',
            'tanggal_input'     => 'nullable|date',
            'cetak'             => 'boolean'
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

        OperasiAlatPemindai::create([
            'user_id'           => user()->id,
            'kantor_id'         => $kantorId,
            'pemindai'          => $this->pemindai,
            'nama_alat'         => $this->nama_alat,
            'ukuran'            => $this->ukuran,
            'merek'             => $this->merek,
            'tipe'              => $this->tipe,
            'nomor_seri'        => $this->nomor_seri,
            'tampilan'          => $this->tampilan,
            'tahun_perolehan'   => $this->tahun_perolehan,
            'kondisi'           => $this->kondisi,
            'lokasi_penempatan' => $this->lokasi_penempatan,
            'jam_operasi'       => $this->jam_operasi,
            'jam_pemindaian'    => $this->jam_pemindaian,
            'jumlah_pemindaian' => $this->jumlah_pemindaian,
            'hasil_keluaran'    => $this->hasil_keluaran,
            'catatan'           => $this->catatan,
            'tanggal_input'     => $tanggalInput,
            'cetak'             => $this->cetak,
        ]);
    }
}
