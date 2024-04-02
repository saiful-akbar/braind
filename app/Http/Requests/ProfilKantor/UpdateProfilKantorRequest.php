<?php

namespace App\Http\Requests\ProfilKantor;

use App\Models\ProfilKantor;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfilKantorRequest extends FormRequest
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
            'keterangan' => 'nullable|string',
            'aktifitas' => 'nullable|string',
            'area_pengawasan' => 'nullable|string',
        ];
    }

    /**
     * Perbarui data keterangan pada profil kantor di database.
     *
     * @return void
     */
    public function update(): void
    {
        // ambil data profil kantor berdasarkan id kantor yang dimiliki user
        $kantorId = user()->kantor_id;
        $profil = ProfilKantor::where('kantor_id', $kantorId)->first();

        // Jika profil kantor kosong buat profil kantor baru, Jika sudah ada update datanya.
        if (empty($profil)) {
            ProfilKantor::create([
                'kantor_id' => $kantorId,
                'keterangan' => $this->keterangan,
                'aktifitas' => $this->aktifitas,
                'area_pengawasan' => $this->area_pengawasan,
            ]);
        } else {
            $profil->keterangan = $this->keterangan;
            $profil->aktifitas = $this->aktifitas;
            $profil->area_pengawasan = $this->area_pengawasan;
            $profil->save();
        }
    }
}
