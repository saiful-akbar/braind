<?php

namespace App\Http\Requests\Sbp;

use App\Models\Sbp;
use Illuminate\Http\Response;
use App\Models\MenuUser;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportSbpRequest extends FormRequest
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
            'search' => 'nullable|string',
            'status' => 'nullable|in:aktif,dihapus'
        ];
    }

    /**
     * Cetak laporan PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'sbp.*',
            'kantor.nama as kantor_nama',
        ];

        $query = Sbp::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'sbp.kantor_id')
            ->whereBetween('tanggal_input', [$this->query('start_period'), $this->query('end_period')]);

        // jika user bukan sebagai admin, tampilkan hanya data yang sesuai
        // dengan "kantor_id" yang dimiliki user yang sedang login.
        if (!user()->admin) {
            $query->where('kantor_id', user()->kantor_id);
        }

        // jika ada request "search", tambahkan query where like
        if (!empty($this->query('search'))) {
            $search = $this->query('search');
            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('sbp.id', 'like', "%{$search}%")
                    ->orWhere('kantor.id', 'like', "%{$search}%")
                    ->orWhere('kantor.nama', 'like', "%{$search}%");
            });
        }

        // jika request "status" dengan nilai "dihapus" dan user memiliki akses destroy
        // tampilkan hanya data yang sudah dihapus.
        if ($this->query('status') == 'dihapus' && $access->destroy) {
            $query->onlyTrashed();
        }

        $data = [
            'sbp' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.sbp', $data)
            ->setPaper('a4', 'potrait')
            ->stream();
    }
}
