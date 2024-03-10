<?php

namespace App\Http\Requests\Profil;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'password_lama' => 'required|string|current_password',
            'password_baru' => 'required|string|max:200|min:6',
            'password_konfirmasi' => 'required_with:password_baru|same:password_baru',
        ];
    }

    /**
     * Memperbarui password user ke database.
     */
    public function update(): void
    {
        $user = user();
        $user->password = bcrypt($this->password_baru);
        $user->save();
    }
}
