<?php

namespace App\Http\Requests\PerusahaanExport;

use App\Models\PerusahaanExport;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;

class TopFivePerusahaanExportRequest extends FormRequest
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
            'by' => 'nullable|in:peb,devisa,netto,bea_keluar',
            'year' => 'date_format:Y'
        ];
    }

    public function read(): Collection
    {
        // jiak request "by" pada query string kosong buat nilai defaul
        // sebagai "peb". Jika request "by" ada dan validasi berhasil ambil data dari
        // request query string.
        $by = empty($this->query('by')) ? 'peb' : $this->query('by');
        $year = $this->query('year') ?? date('Y');

        // Ambil data 5 besar perusahaan export
        $query = PerusahaanExport::select(
            'nama_perusahaan',
            DB::raw("SUM($by) AS value"),
        );

        // Periksa jika user bukan sebagai admin
        // ambil data berdasarkan "kantor_id" yang sesuai
        // dengan "kantor_id" yang dimiliki user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // filter data berdasarkan tanggal input pada tahun saat ini.
        $query->where('tanggal_input', 'like', "$year%");

        return $query->groupBy('nama_perusahaan')
            ->orderBy(DB::raw("SUM($by)"), 'desc')
            ->limit(5)
            ->offset(0)
            ->get();
    }
}
