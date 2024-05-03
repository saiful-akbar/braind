<?php

namespace App\Http\Requests\OperasiKapalPatroli;

use App\Models\OperasiKapalPatroli;
use Illuminate\Foundation\Http\FormRequest;

class StoreOperasiKapalPatroliRequest extends FormRequest
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
            'nomor_lambung'        => 'required|string|max:30',
            'kondisi'              => 'required|string|max:50',
            'nomor_spb'            => 'required|string|max:30',
            'tanggal_spb'          => 'required|date',
            'penerbit_spb'         => 'required|string|max:30',
            'jumlah_hari'          => 'required|integer|max:1000',
            'catatan'              => 'required|string|max:250',
            'tanggal_input'        => 'nullable|date',
            'jenis_kapal'          => 'nullable|string|max:100',
            'merk_tipe_mesin'      => 'nullable|string|max:100',
            'jumlah_mesin'         => 'nullable|numeric',
            'tahun_pembuatan'      => 'nullable|date_format:Y',
            'tahun_rehab'          => 'nullable|date_format:Y',
            'kondisi_badan_kapal'  => 'nullable|string|max:100',
            'kondisi_mesin_kapal'  => 'nullable|string|max:100',
            'status_pengoperasion' => 'in:aktif,Aktif,Tidak Aktif,tidak aktif',
            'kondisi_aktif'        => 'boolean',
            'cetak'                => 'boolean',
        ];
    }

    /**
     * Simpan data operasi kapal patroli ke database
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

        OperasiKapalPatroli::create([
            'user_id'              => user()->id,
            'kantor_id'            => $kantorId,
            'nomor_lambung'        => $this->nomor_lambung,
            'kondisi'              => $this->kondisi,
            'nomor_spb'            => $this->nomor_spb,
            'tanggal_spb'          => $this->tanggal_spb,
            'penerbit_spb'         => $this->penerbit_spb,
            'jumlah_hari'          => $this->jumlah_hari,
            'catatan'              => $this->catatan,
            'tanggal_input'        => $tanggalInput,
            'jenis_kapal'          => $this->jenis_kapal,
            'merk_tipe_mesin'      => $this->merk_tipe_mesin,
            'jumlah_mesin'         => $this->jumlah_mesin,
            'tahun_pembuatan'      => $this->tahun_pembuatan,
            'tahun_rehab'          => $this->tahun_rehab,
            'kondisi_badan_kapal'  => $this->kondisi_badan_kapal,
            'kondisi_mesin_kapal'  => $this->kondisi_mesin_kapal,
            'status_pengoperasian' => $this->status_pengoperasian,
            'kondisi_aktif'        => $this->kondisi_aktif,
            'cetak'                => $this->cetak,
        ]);
    }
}
