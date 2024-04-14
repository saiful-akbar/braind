<?php

namespace App\Http\Requests\Pengawasan;

use App\Models\MenuUser;
use App\Models\Pengawasan;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportPengawasanRequest extends FormRequest
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
        $types = implode(',', $this->types);

        return [
            'type'         => "in:semua,{$types}",
            'start_period' => 'date',
            'end_period'   => 'date',
            'status'       => 'nullable|in:aktif,dihapus',
            'search'       => 'nullable|string',
        ];
    }

    /**
     * Pengawasan report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'pengawasan.*',
            'kantor.nama as kantor_nama',
        ];

        // select data pengawasan dan join dengan tabel kantor.
        $query = Pengawasan::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'pengawasan.kantor_id')
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
            $query->where('pengawasan.kantor_id', user()->kantor_id);
        }

        // filter data berdasarkan tipenya.
        if (in_array($this->query('type'), $this->types)) {
            $query->where('pengawasan.tipe', $this->query('type'));
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('pengawasan.kantor', 'like', "%{$search}%")
                    ->orWhere('pengawasan.sbp', 'like', "%{$search}%")
                    ->orWhere('pengawasan.tindak_lanjut', 'like', "%{$search}%");
            });
        }

        $data = [
            'data' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.pengawasan', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
