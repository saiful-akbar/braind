<?php

namespace App\Http\Requests\Penindakan;

use App\Models\MenuUser;
use App\Models\Penindakan;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportPenindakanRequest extends FormRequest
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
     * Penindakan report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'penindakan.*',
            'kantor.nama as kantor_nama',
        ];

        // select data penindakan dan join dengan tabel kantor.
        $query = Penindakan::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'penindakan.kantor_id')
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
            $query->where('penindakan.kantor_id', user()->kantor_id);
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('penindakan.kppbc', 'like', "%{$search}%")
                    ->orWhere('penindakan.nomor_sbp', 'like', "%{$search}%")
                    ->orWhere('penindakan.kode_komoditi', 'like', "%{$search}%")
                    ->orWhere('penindakan.uraian', 'like', "%{$search}%")
                    ->orWhere('penindakan.tindak_lanjut', 'like', "%{$search}%");
            });
        }

        $data = [
            'data' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.penindakan', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
