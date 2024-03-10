<?php

namespace App\Http\Requests\PerusahaanImport;

use App\Models\PerusahaanImport;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;

class TopFivePerusahaanImportRequest extends FormRequest
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
            'by' => 'required|in:pib,total_pembayaran,bea_masuk',
        ];
    }

    public function read(): Collection
    {
        // jiak request "by" pada query string kosong buat nilai default
        // sebagai "pib". Jika request "by" ada dan validasi berhasil ambil data dari
        // request query string.
        $by = empty($this->query('by')) ? 'peb' : $this->query('by');

        // Ambil data 5 besar perusahaan export
        $query = PerusahaanImport::select(
            'nama_perusahaan',
            DB::raw("SUM($by) AS value"),
        );

        // Periksa jika user bukan sebagai admin
        // ambil data berdasarkan "kantor_id" yang sesuai
        // dengan "kantor_id" yang dimiliki oleh user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // filter data berdasarkan tanggal input pada tahun saat ini.
        $query->where('tanggal_input', 'like', date('Y') . '%');

        return $query->groupBy('nama_perusahaan')
            ->orderBy(DB::raw("SUM($by)"), 'desc')
            ->limit(5)
            ->offset(0)
            ->get();
    }
}
