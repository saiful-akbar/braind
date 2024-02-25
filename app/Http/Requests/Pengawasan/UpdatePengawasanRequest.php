<?php

namespace App\Http\Requests\Pengawasan;

use App\Models\Pengawasan;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePengawasanRequest extends FormRequest
{
    private array $types = [
        'Cukai EA',
        'Cukai HT',
        'Cukai MMEA',
        'Export',
        'Import',
    ];

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
        $types = implode(",", $this->types);

        return [
            'kantor_id'        => 'nullable|exists:kantor,id',
            'tipe'             => "required|in:{$types}",
            'sbp'              => 'required|string|max:30',
            'kantor'           => 'required|string|max:50',
            'nilai_barang'     => 'required|numeric|min:0',
            'total_kerugian'   => 'required|numeric|min:0',
            'potensi_kerugian' => 'required|numeric|min:0',
            'tindak_lanjut'    => 'required|string|max:100',
            'tanggal_input'    => 'nullable|date',
        ];
    }

    /**
     * SImpan perubahan ke database.
     *
     * @param Pengawasan $pengawasan
     * @return void
     */
    public function update(Pengawasan $pengawasan): void
    {
        if (user()->admin && !empty($this->kantor_id)) {
            $pengawasan->kantor_id = $this->kantor_id;
        }

        $pengawasan->tipe             = $this->tipe;
        $pengawasan->sbp              = $this->sbp;
        $pengawasan->kantor           = $this->kantor;
        $pengawasan->nilai_barang     = $this->nilai_barang;
        $pengawasan->total_kerugian   = $this->total_kerugian;
        $pengawasan->potensi_kerugian = $this->potensi_kerugian;
        $pengawasan->tindak_lanjut    = $this->tindak_lanjut;

        if (user()->admin && !empty($this->tanggal_input)) {
            $pengawasan->tanggal_input = $this->tanggal_input;
        } else {
            $pengawasan->tanggal_input = date('Y-m-d');
        }

        $pengawasan->save();
    }
}
