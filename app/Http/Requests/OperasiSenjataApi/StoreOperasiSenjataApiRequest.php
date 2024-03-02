<?php

namespace App\Http\Requests\OperasiSenjataApi;

use App\Models\OperasiSenjataApi;
use Illuminate\Foundation\Http\FormRequest;

class StoreOperasiSenjataApiRequest extends FormRequest
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
        $masaBerlakuRules = ['required'];

        if (gettype(request('masa_berlaku')) === 'string') {
            array_push($masaBerlakuRules, ['string', 'max:30']);
        } else {
            array_push($masaBerlakuRules, ['integer']);
        }

        return [
            'kantor_id'                => 'nullable|exists:kantor,id',
            'jenis_kaliber'            => 'required|string|max:30',
            'nomor_senjata'            => 'required|string|max:30',
            'nama_pemegang_senjata'    => 'required|string|max:50',
            'pangkat_pemegang_senjata' => 'required|string|max:50',
            'jabatan_pemegang_senjata' => 'required|string|max:50',
            'nomor_buku_pas'           => 'required|string|max:30',
            'masa_berlaku'             => $masaBerlakuRules,
            'kondisi'                  => 'required|string|max:30',
            'jumlah_amunisi'           => 'required|integer|max:1000',
            'catatan'                  => 'required|string|max:250',
            'tanggal_input'            => 'nullable|date',
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

        OperasiSenjataApi::create([
            'user_id'                  => user()->id,
            'kantor_id'                => $kantorId,
            'jenis_kaliber'            => $this->jenis_kaliber,
            'nomor_senjata'            => $this->nomor_senjata,
            'nama_pemegang_senjata'    => $this->nama_pemegang_senjata,
            'pangkat_pemegang_senjata' => $this->pangkat_pemegang_senjata,
            'jabatan_pemegang_senjata' => $this->jabatan_pemegang_senjata,
            'nomor_buku_pas'           => $this->nomor_buku_pas,
            'masa_berlaku'             => $this->masa_berlaku,
            'kondisi'                  => $this->kondisi,
            'jumlah_amunisi'           => $this->jumlah_amunisi,
            'catatan'                  => $this->catatan,
            'tanggal_input'            => $tanggalInput,
        ]);
    }
}
