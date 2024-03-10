<?php

namespace App\Http\Requests\Profil;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAkunRequest extends FormRequest
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
            'username' => "required|string|max:200|unique:users,username,{$userId},id",
        ];
    }

    /**
     * Memperbarui data akun user ke database
     */
    public function update(): void
    {
        $user = user();
        $user->username = $this->username;
        $user->save();
    }
}
