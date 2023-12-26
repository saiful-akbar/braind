<?php

namespace App\Http\Requests\Sbp;

use App\Models\Sbp;
use Illuminate\Foundation\Http\FormRequest;

class StoreSbpRequest extends FormRequest
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
            'jumlah' => 'required|numeric|min:0',
            'tindak_lanjut' => 'required|numeric|min:0',
            'tanggal_input' => 'nullable|date',
        ];
    }

    /**
     * Simpan SBP baru ke database
     */
    public function insert(): void
    {
        Sbp::create([
            'kantor_id' => user()->kantor_id,
            'user_id' => user()->id,
            'jumlah' => $this->jumlah,
            'tindak_lanjut' => $this->tindak_lanjut,
            'tanggal_input' => $this->tanggal_input ?? date('Y-m-d'),
        ]);
    }
}
