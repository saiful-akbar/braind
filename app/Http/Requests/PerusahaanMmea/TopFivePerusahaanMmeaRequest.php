<?php

namespace App\Http\Requests\PerusahaanMmea;

use App\Models\PerusahaanMmea;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;

class TopFivePerusahaanMmeaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function read(): Collection
    {
        $query = PerusahaanMmea::select(
            'nama_perusahaan',
            DB::raw('SUM(jumlah_dokumen) AS jumlah_dokumen'),
            DB::raw('SUM(jumlah_liter) AS jumlah_liter'),
            DB::raw('SUM(jumlah_cukai) AS jumlah_cukai'),
        );

        // periksa jika user bukan sebagai admin, ambil data
        // hanya berdasarkan kantor_id yang sesuai dengan kantor_id
        // yang dimiliki user.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // filter data tahun saat ini berdasarkan kolom "tanggal_input"
        $currentYear = date('Y');
        $query->where('tanggal_input', 'like', "$currentYear%");

        return $query->groupBy('nama_perusahaan')
            ->orderBy(DB::raw('SUM(jumlah_cukai)'), 'desc')
            ->limit(5)
            ->offset(0)
            ->get();
    }
}
