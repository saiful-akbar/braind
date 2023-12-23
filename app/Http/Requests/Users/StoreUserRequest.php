<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class StoreUserRequest extends FormRequest
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
            'kanwil' => 'required|exists:divisions,id',
            'username' => 'required|string|max:200|unique:users,username',
            'kata_sandi' => 'required|string|max:200|min:4',
            'foto' => 'nullable|image|max:1000',
            'nama_lengkap' => 'required|string|max:100',
            'jenis_kelamin' => 'nullable|in:male,female',
            'tanggal_lahir' => 'nullable|date',
            'tempat_lahir' => 'nullable|string|max:50',
            'negara' => 'nullable|string|max:50',
            'kota' => 'nullable|string|max:50',
            'kode_pos' => 'nullable|string|max:10',
            'alamat' => 'nullable|string|max:200',
            'telepon' => 'nullable|unique:users,phone|regex:/^[0-9]{10,13}+$/',
            'email' => 'nullable|email:filter|unique:users,email'
        ];
    }

    /**
     * simpan data user baru pada database.
     */
    public function save(): User
    {
        $data = [
            'division_id' => $this->kanwil,
            'username' => $this->username,
            'password' => bcrypt($this->kata_sandi),
            'full_name' => $this->nama_lengkap,
            'gender' => $this->jenis_kelamin,
            'date_of_birth' => $this->tanggal_lahir,
            'place_of_birth' => $this->tempat_lahir,
            'country' => $this->negara,
            'city' => $this->kota,
            'postal_code' => $this->kode_pos,
            'address' => $this->alamat,
            'phone' => $this->telepon,
            'email' => $this->email,
        ];

        // Jika user upload foto simpan pada storage
        if ($this->hasFile('foto')) {
            $fileName = Str::random(16);
            $fileName .= ".";
            $fileName .= $this->foto->extension();

            $data['photo'] = $this->file('foto')->storeAs('user-photos', $fileName, 'public');
        }

        return User::create($data);
    }
}
