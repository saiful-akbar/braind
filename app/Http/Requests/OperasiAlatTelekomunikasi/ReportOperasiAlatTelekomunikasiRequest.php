<?php

namespace App\Http\Requests\OperasiAlatTelekomunikasi;

use App\Models\MenuUser;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\OperasiAlatTelekomunikasi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ReportOperasiAlatTelekomunikasiRequest extends FormRequest
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
     * Operasi alat telekomunikasi report PDF
     *
     * @param MenuUser $access
     * @return Response
     */
    public function printPdf(MenuUser $access): Response
    {
        $columns = [
            'operasi_alat_telekomunikasi.*',
            'kantor.nama as kantor_nama',
        ];

        // select data operasi alat telekomunikasi dan join dengan tabel kantor.
        $query = OperasiAlatTelekomunikasi::select($columns)
            ->leftJoin('kantor', 'kantor.id', '=', 'operasi_alat_telekomunikasi.kantor_id')
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
            $query->where('operasi_alat_telekomunikasi.kantor_id', user()->kantor_id);
        }

        // jika ada request search, tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.nama_barang', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.kode_barang', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.nup', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.jenis_perangkat', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.merek', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.tipe', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.rentang_frekuensi', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.teknologi_digital', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.kondisi', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.status', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.lokasi_penempatan', 'like', "%{$search}%")
                    ->orWhere('operasi_alat_telekomunikasi.catatan', 'like', "%{$search}%");
            });
        }

        $data = [
            'data' => $query->orderBy('kantor.nama', 'asc')->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.operasi-alat-telekomunikasi', $data)
            ->setPaper('a4', 'landscape')
            ->stream();
    }
}
