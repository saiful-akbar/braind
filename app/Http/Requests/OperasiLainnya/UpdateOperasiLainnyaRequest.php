<?php

namespace App\Http\Requests\OperasiLainnya;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperasiLainnyaRequest extends FormRequest
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
            'kantor_id'         => 'nullable|exists:kantor,id',
            'jenis_operasi'     => 'required|string|max:30',
            'merek'             => 'required|string|max:30',
            'tipe'              => 'required|string|max:30',
            'lokasi_penempatan' => 'required|string|max:30',
            'kondisi'           => 'required|string|max:50',
            'catatan'           => 'required|string|max:250',
            'tanggal_input'     => 'nullable|date',
            'cetak'             => 'boolean',
        ];
    }

    /**
     * Simpan perubahan ke database.
     *
     * @return void
     */
    public function update(): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $this->operasi->kantor_id = $this->kantor_id;
        }

        $this->operasi->jenis_operasi     = $this->jenis_operasi;
        $this->operasi->merek             = $this->merek;
        $this->operasi->tipe              = $this->tipe;
        $this->operasi->lokasi_penempatan = $this->lokasi_penempatan;
        $this->operasi->kondisi           = $this->kondisi;
        $this->operasi->catatan           = $this->catatan;
        $this->operasi->cetak             = $this->cetak;

        if (user()->admin && !empty($this->tanggal_input)) {
            $this->operasi->tanggal_input = $this->tanggal_input;
        } else {
            $this->operasi->tanggal_input = date('Y-m-d');
        }

        $this->operasi->save();
    }
}
