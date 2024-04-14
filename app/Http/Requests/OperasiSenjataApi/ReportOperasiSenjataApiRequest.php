<?php

namespace App\Http\Requests\OperasiSenjataApi;

use App\Models\MenuUser;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\OperasiSenjataApi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportOperasiSenjataApiRequest extends FormRequest
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
     * Operasi senjata api report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'operasi_senjata_api.*',
            'kantor.nama as kantor_nama',
        ];

        // select data operasi senjata api dan join dengan tabel kantor.
        $query = OperasiSenjataApi::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'operasi_senjata_api.kantor_id')
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
            $query->where('operasi_senjata_api.kantor_id', user()->kantor_id);
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.jenis_kaliber', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.nomor_senjata', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.nama_pemegang_senjata', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.pangkat_pemegang_senjata', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.jabatan_pemegang_senjata', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.nomor_buku_pas', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.masa_berlaku', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.kondisi', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.jumlah_amunisi', 'like', "%{$search}%")
                    ->orWhere('operasi_senjata_api.catatan', 'like', "%{$search}%");
            });
        }

        $data = [
            'data' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.operasi-senjata-api', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
