<?php

namespace App\Http\Requests\PerusahaanHtHptl;

use App\Models\MenuUser;
use App\Models\PerusahaanHtHptl;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class ReportPerusahaanHtHptlRequest extends FormRequest
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
            'start_period' => 'required|date_format:Y-m-d',
            'end_period' => 'required|date_format:Y-m-d',
            'status' => 'nullable|in:aktif,dihapus',
            'search' => 'nullable|string',
        ];
    }

    /**
     * Perusahaan HT + HPTL report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'perusahaan_ht_hptl.*',
            'kantor.nama as kantor_nama',
        ];

        // select data perusahaan HT HPTL dan join dengan tabel kantor.
        $query = PerusahaanHtHptl::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'perusahaan_ht_hptl.kantor_id')
            ->whereBetween('tanggal_input', [
                $this->query('start_period'),
                $this->query('end_period'),
            ]);

        // jika ada request status dengan nilai dihapus dan user memiliki akses destroy,
        // tampilkan hanya data yang sudah dihapus.
        if ($this->query('status') == 'dihapus' && $access->destroy) {
            $query->onlyTrashed();
        }

        // jika user bukan sebagai admin, tampilkan hanya data yang memiliki kantor_id
        // yang sama dengan kantor_id yang dimiliki user yang sedang login.
        if (!user()->admin) {
            $query->where('perusahaan_ht_hptl.kantor_id', user()->kantor_id);
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('perusahaan_ht_hptl.nama_perusahaan', 'like', "%{$search}%")
                    ->orWhere('perusahaan_ht_hptl.nppbkc', 'like', "%{$search}%")
                    ->orWhere('perusahaan_ht_hptl.jenis_bkc', 'like', "%{$search}%")
                    ->orWhere('kantor.nama', 'like', "%{$search}%");
            });
        }

        $data = [
            'perusahaan' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.perusahaan-ht-hptl', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
