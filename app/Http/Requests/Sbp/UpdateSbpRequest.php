<?php

namespace App\Http\Requests\Sbp;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSbpRequest extends FormRequest
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
            'kantor_id' => "required|exists:kantor,id",
            'jumlah' => "required|numeric|min:0",
            'tindak_lanjut' => "required|numeric|min:0",
            'tanggal_input' => "nullable|date",
        ];
    }

    /**
     * perbarui data SBP dan simpan ke database
     */
    public function update(): void
    {
        $this->sbp->kantor_id = $this->kantor_id;
        $this->sbp->jumlah = $this->jumlah;
        $this->sbp->tindak_lanjut = $this->tindak_lanjut;
        $this->sbp->tanggal_input = $this->tanggal_input;

        $this->sbp->save();
    }
}
