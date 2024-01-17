<?php

namespace App\Http\Requests\Perusahaan\HtHptl;

use App\Models\MenuUser;
use App\Models\PerusahaanHtHptl;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class HtHptlRequest extends FormRequest
{
    private array $columns = [
        'nama_perusahaan',
        'nppbkc',
        'jumlah_ck',
        'jenis_bkc',
        'jumlah_cukai',
        'tanggal_input',
        'deleted_at',
        'kantor_id',
        'kantor_nama',
    ];

    private string $order = 'asc';
    private string $orderBy = 'nama_perusahaan';
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
     * Ambil data perusahaan_ht_hptl
     *
     * @param MenuUser $access
     * @return LengthAwarePaginator
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        // kolom data yang akan diambil
        $columns = [
            'perusahaan_ht_hptl.*',
            'kantor.nama as kantor_nama',
        ];

        // Buat query select data perusahaan_ht_hptl dan join dengan data kantor.
        // lalu filter berdasarkan tanggal_input dengan where between
        $query = PerusahaanHtHptl::select($columns)
            ->leftJoin('kantor', 'perusahaan_ht_hptl.kantor_id', '=', 'kantor.id')
            ->whereBetween('perusahaan_ht_hptl.tanggal_input', [
                $this->query('start_period', date('Y-m-01')),
                $this->query('end_period', date('Y-m-d')),
            ]);

        // jika ada query string "status" dengan nilai "dihapus"
        // tampilkan hanya data yang telah dihapus
        if ($access->destroy && $this->query('status') == 'dihapus') {
            $query->onlyTrashed();
        }

        // jika user sebegai admin tampilkan semua data perusahaan.
        // jika user bukan admin tampilkan hanya data perusahaan dengan kantor_id
        // yang sama dengan kantor_id yang dimiliki user.
        if (!user()->admin) {
            $query->where('perusahaan_ht_hptl.kantor_id', user()->kantor_id);
        }

        // jika ada query string "search" tambahkan query where like
        if (!empty($this->query('search'))) {
            $query->where(function (Builder $query): void {
                $search = $this->query('search');
                $query->where('perusahaan_ht_hptl.nama_perusahaan', 'like', "%{$search}%")
                    ->orWhere('kantor.nama', 'like', "%{$search}%");
            });
        }

        // jika ada query string "per_page" ubah properti "$perPage"
        if (in_array($this->query('per_page'), $this->rowsPerPage)) {
            $this->perPage = $this->query('per_page');
        }

        // Periksa jika ada query string "order_by" ubah properti "$orderBy"
        if (in_array($this->query('order_by'), $this->columns)) {
            $this->orderBy = $this->query('order_by');
        }

        // Periksa jika ada query string "order" ubah properti "$order"
        if ($this->query('order') === 'desc') {
            $this->order = 'desc';
        }

        return $query->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }
}
