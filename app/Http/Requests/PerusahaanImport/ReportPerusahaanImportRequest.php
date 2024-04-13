<?php

namespace App\Http\Requests\PerusahaanImport;

use App\Models\MenuUser;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\PerusahaanImport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportPerusahaanImportRequest extends FormRequest
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
     * Perusahaan import report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'perusahaan_import.*',
            'kantor.nama as kantor_nama',
        ];

        // select data perusahaan import dan join dengan tabel kantor.
        $query = PerusahaanImport::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'perusahaan_import.kantor_id')
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
            $query->where('perusahaan_import.kantor_id', user()->kantor_id);
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('perusahaan_import.nama_perusahaan', 'like', "%{$search}%")
                    ->orWhere('perusahaan_import.npwp', 'like', "%{$search}%")
                    ->orWhere('perusahaan_import.pib', 'like', "%{$search}%")
                    ->orWhere('kantor.nama', 'like', "%{$search}%");
            });
        }

        $data = [
            'perusahaan' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.perusahaan-import', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
