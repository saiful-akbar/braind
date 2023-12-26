<?php

namespace App\Http\Requests\Users;

use Illuminate\Support\Str;
use App\Http\Requests\UpdateRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest implements UpdateRequest
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
            'username' => "required|string|max:200|unique:users,username,{$this->user->id},id",
            'password' => 'nullable|string|max:200',
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
            'telepon' => "nullable|regex:/^[0-9]{10,13}+$/|unique:users,telepon,{$this->user->id},id",
            'email' => "nullable|email:filter|unique:users,email,{$this->user->id},id"
        ];
    }

    /**
     * Simpan data user ke database
     */
    public function update(): void
    {
        $this->user->kantor_id = $this->kantor_id;
        $this->user->username = $this->username;
        $this->user->admin = $this->admin;
        $this->user->nama_lengkap = $this->nama_lengkap;
        $this->user->jenis_kelamin = $this->jenis_kelamin;
        $this->user->tanggal_lahir = $this->tanggal_lahir;
        $this->user->tempat_lahir = $this->tempat_lahir;
        $this->user->negara = $this->negara;
        $this->user->kota = $this->kota;
        $this->user->kode_pos = $this->kode_pos;
        $this->user->alamat = $this->alamat;
        $this->user->telepon = $this->telepon;
        $this->user->email = $this->email;

        // simpan password jika dirubah
        if (!is_null($this->password)) {
            $this->user->password = bcrypt($this->password);
        }

        // simpan foto jika diubah
        if ($this->hasFile('foto')) {

            // Periksa apakah sebelumnya user sudah memiliki foto atau belu.
            // Jika sebelumnya sudah ada hapus foto lama pada storage.
            if (!is_null($this->user->foto)) {
                $path = str_replace(asset('/storage'), '', $this->user->foto);
                Storage::disk('public')->delete($path);
            }

            // upload foro baru
            $fileName  = Str::random(16) . '.' . $this->foto->extension();
            $this->user->foto = $this->file('foto')->storeAs('user-foto', $fileName, 'public');
        }

        $this->user->save();
    }
}
