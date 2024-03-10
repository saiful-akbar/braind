<?php

namespace App\Http\Requests\Profil;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfilRequest extends FormRequest
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
            'nama_lengkap' => ['required', 'string', 'max:100'],
            'foto' => ['nullable', 'image', 'max:1024'],
            'tanggal_lahir' => ['nullable', 'date'],
            'tempat_lahir' => ['nullable', 'string', 'max:50'],
            'jenis_kelamin' => ['nullable', 'in:l,p']
        ];
    }

    /**
     * simpan pembaruan profil ke database.
     *
     * @return void
     */
    public function update(): void
    {
        $user = user();

        // simpan foto
        if ($this->hasFile('foto')) {

            // Periksa apakah sebelumnya user sudah memiliki foto atau belu.
            // Jika sebelumnya sudah ada hapus foto lama pada storage.
            if (!is_null($user->foto)) {
                $path = str_replace(asset('/storage'), '', $user->foto);
                Storage::disk('public')->delete($path);
            }

            // upload foro baru
            $fileName  = Str::random(16) . '.' . $this->foto->extension();
            $user->foto = $this->file('foto')->storeAs('user-foto', $fileName, 'public');
        }

        // update profil
        $user->nama_lengkap = $this->nama_lengkap;
        $user->jenis_kelamin = $this->jenis_kelamin;
        $user->tanggal_lahir = $this->tanggal_lahir;
        $user->tempat_lahir = $this->tempat_lahir;

        $user->save();
    }
}
