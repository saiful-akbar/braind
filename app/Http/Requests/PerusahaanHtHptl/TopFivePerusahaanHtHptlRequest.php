<?php

namespace App\Http\Requests\PerusahaanHtHptl;

use App\Models\PerusahaanHtHptl;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;

class TopFivePerusahaanHtHptlRequest extends FormRequest
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
            'year' => 'date_format:Y'
        ];
    }

    /**
     * Ambil data perusahaan HT HPTL
     *
     * @return Collection
     */
    public function read(): Collection
    {
        $query = PerusahaanHtHptl::select(
            'nama_perusahaan',
            DB::raw('sum(jumlah_ck) AS jumlah_ck'),
            DB::raw('sum(jumlah_cukai) AS jumlah_cukai'),
        );

        // filter data berdasarkan tahun yang dipilih dari tanggal_input
        $year = $this->query('year') ?? date('Y');
        $query->where('tanggal_input', 'like', "$year%");

        // Periksa jika user bukan sebagai admin, tampilkan hanya data
        // dengan "kantor_id" yang sesuai dengan "kantor_id" milik user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        return $query->groupBy('nama_perusahaan')
            ->orderBy(DB::raw('sum(jumlah_cukai)'), 'desc')
            ->limit(5)
            ->offset(0)
            ->get();
    }
}
