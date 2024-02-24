<?php

namespace App\Http\Requests\Penerimaan;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePenerimaanRequest extends FormRequest
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
            'kantor_id'            => 'nullable|exists:kantor,id',
            'target_bea_masuk'     => 'required|numeric|min:0',
            'realisasi_bea_masuk'  => 'required|numeric|min:0',
            'target_bea_keluar'    => 'required|numeric|min:0',
            'realisasi_bea_keluar' => 'required|numeric|min:0',
            'target_cukai'         => 'required|numeric|min:0',
            'realisasi_cukai'      => 'required|numeric|min:0',
            'tanggal_input'        => 'nullable|date',
        ];
    }

    /**
     * SImpan perubahan ke database.
     *
     * @return void
     */
    public function update(): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $this->penerimaan->kantor_id = $this->kantor_id;
        }

        $this->penerimaan->target_bea_masuk = $this->target_bea_masuk;
        $this->penerimaan->realisasi_bea_masuk = $this->realisasi_bea_masuk;
        $this->penerimaan->target_bea_keluar = $this->target_bea_keluar;
        $this->penerimaan->realisasi_bea_keluar = $this->realisasi_bea_keluar;
        $this->penerimaan->target_cukai = $this->target_cukai;
        $this->penerimaan->realisasi_cukai = $this->realisasi_cukai;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->penerimaan->tanggal_input = $this->tanggal_input;
        } else {
            $this->penerimaan->tanggal_input = date('Y-m-d');
        }

        $this->penerimaan->save();
    }
}
