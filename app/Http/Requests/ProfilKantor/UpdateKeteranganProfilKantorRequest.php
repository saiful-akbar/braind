<?php

namespace App\Http\Requests\ProfilKantor;

use App\Models\ProfilKantor;
use Illuminate\Foundation\Http\FormRequest;

class UpdateKeteranganProfilKantorRequest extends FormRequest
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
            'keterangan' => 'nullable|string|max:300'
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

        // Periksa jika profil kosong tambahkan data baru.
        // Jika profil sudah ada sebelumnya update datanya.
        if (empty($profil)) {
            ProfilKantor::create([
                'kantor_id' => $kantorId,
                'keterangan' => $this->keterangan,
            ]);
        } else {
            $profil->keterangan = $this->keterangan;
            $profil->save();
        }
    }
}
