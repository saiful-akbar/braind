<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;

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
            'kantor_id' => 'required|exists:kantor,id',
            'username' => 'required|string|max:200|unique:users,username',
            'password' => 'required|string|max:200|min:4',
            'admin' => 'required|boolean',
            'nama_lengkap' => 'required|string|max:100',
            'foto' => 'nullable|image|max:1000',
            'jenis_kelamin' => 'nullable|in:l,p',
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
        $data = $this->all();
        $data['password'] = bcrypt($this->password);

        // Jika user upload foto simpan pada storage
        if ($this->hasFile('foto')) {
            $fileName  = Str::random(16);
            $fileName .= ".";
            $fileName .= $this->foto->extension();

            $data['foto'] = $this->file('foto')->storeAs('user-foto', $fileName, 'public');
        }

        return User::create($data);
    }
}
