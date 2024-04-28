<?php

namespace App\Http\Requests\OperasiLainnya;

use App\Models\MenuUser;
use App\Models\OperasiLainnya;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class OperasiLainnyaRequest extends FormRequest
{
    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'jenis_operasi',
        'merek',
        'tipe',
        'lokasi_penempatan',
        'kondisi',
        'catatan',
        'tanggal_input',
        'cetak',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'kantor_nama';
    private string $order = 'asc';

    private int $perPage = 10;
    private array $rowsPerPage = [10, 25, 50, 100, 200];

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
            'start_period' => 'date',
            'end_period'   => 'date',
            'status'       => 'nullable|in:aktif,dihapus',
            'search'       => 'nullable|string',
        ];
    }

    /**
     * Ambil data sarana operasi lainnya dan buat query pagination.
     *
     * @param MenuUser $access
     * @return LengthAwarePaginator
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        // daftar kolom yang akan diambil atau ditampilkan.
        $columns = [
            'operasi_lainnya.*',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // Ambil data pada tabel operasi lainnya dan join dengan tabel kantor.
        // lalu buat filter berdasarkan periode waktu.
        $operasi = OperasiLainnya::select($columns)
            ->leftJoin('kantor', 'operasi_lainnya.kantor_id', '=', 'kantor.id')
            ->whereBetween('operasi_lainnya.tanggal_input', [
                $this->query('start_period'),
                $this->query('end_period'),
            ]);

        // Periksa jika user yang sedang login bukan sebagai admin tampilkan
        // hanya data perusahaan yang sesuai dengan kantor yang dimiliki user.
        // Jika user sebagai admin tampilkan semua data.
        if (!user()->admin) {
            $operasi->where('kantor.id', user()->kantor_id);
        }

        // Periksa jika ada request "status" dengan nilai "dihapus"
        // dan user yang sedang login memiliki akses "destroy" (hapus permanen)
        // tampilkan hanya data yang sudah dihapus saja.
        if ($access->destroy && $this->query('status', 'aktif') == 'dihapus') {
            $operasi->onlyTrashed();
        }

        // Periksa jika ada request "search" untuk pencarian data
        // tambahkan query where like.
        if (!empty($this->query('search'))) {
            $operasi->where(function (Builder $query): void {
                $search = $this->query('search');

                $query->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.jenis_operasi', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.merek', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.tipe', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.lokasi_penempatan', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.kondisi', 'like', "%{$search}%")
                    ->orWhere('operasi_lainnya.catatan', 'like', "%{$search}%");
            });
        }

        // Periksa jika ada request "order_by" ubah properti $orderBy
        if (in_array($this->query('order_by'), $this->columns)) {
            $this->orderBy = $this->query('order_by');
        }

        // Periksa jika ada request "order" obah properti pada $order
        if ($this->query('order') == 'desc') {
            $this->order = 'desc';
        }

        // Periksa jika ada request "per_page" ubah properti $perPage
        if (in_array($this->query('per_page'), $this->rowsPerPage)) {
            $this->perPage = $this->query('per_page');
        }

        return $operasi->orderBy($this->orderBy, $this->order)
            ->paginate($this->perPage)
            ->withQueryString();
    }
}
