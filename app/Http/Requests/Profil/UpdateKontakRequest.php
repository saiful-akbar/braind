<?php

namespace App\Http\Requests\Profil;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKontakRequest extends FormRequest
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
        $userId = user()->id;

        return [
            'telepon' => "nullable|regex:/^[0-9]{10,13}+$/|unique:users,telepon,{$userId},id",
            'email' => "nullable|email:filter|unique:users,email,{$userId},id"
        ];
    }

    /**
     * Memperbarui data kontak user ke database.
     *
     * @return void
     */
    public function update(): void
    {
        $user = user();
        $user->email = $this->email;
        $user->telepon = $this->telepon;
        $user->save();
    }
}
