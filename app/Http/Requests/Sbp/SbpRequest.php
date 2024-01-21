<?php

namespace App\Http\Requests\Sbp;

use App\Models\Sbp;
use App\Models\MenuUser;
use App\Http\Requests\Pagination;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class SbpRequest extends FormRequest implements Pagination
{
    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'id',
        'jumlah',
        'tindak_lanjut',
        'tanggal_input',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'updated_at';
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
     * Ambil data SBP dan buat query pagination
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        $columns = [
            'sbp.id',
            'sbp.jumlah',
            'sbp.tindak_lanjut',
            'sbp.tanggal_input',
            'sbp.created_at',
            'sbp.updated_at',
            'sbp.deleted_at',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // ambil data SBP dan join dengan tabel users dan kantor.
        $sbp = Sbp::select($columns)
            ->leftJoin('kantor', 'sbp.kantor_id', '=', 'kantor.id')
            ->whereBetween('sbp.tanggal_input', [
                $this->query('start_period', date('Y-m-01')),
                $this->query('end_period', date('Y-m-d')),
            ]);

        // periksa role user.
        // jika user sebagai admin tampilkan semua data.
        // jika bukan admin tampilkan hanya sbp yang sesuai dengan kantonya.
        if (!user()->admin) {
            $sbp->where('kantor.id', user()->kantor_id);
        }

        // jika ada request status dengan nilai "dihapus" dan user
        // memiliki akses destroy, ambil hanya data yang telah dihapus saja.
        if ($this->query('status', 'aktif') == 'dihapus' && $access->destroy) {
            $sbp->onlyTrashed();
        }

        // jika ada request search tambahkan query pencarian
        if (!empty($this->query('search'))) {
            $sbp->where(function (Builder $query): void {
                $query->where('sbp.id', 'like', '%' . $this->query('search') . '%')
                    ->orWhere('kantor.id', 'like', '%' . $this->query('search') . '%')
                    ->orWhere('kantor.nama', 'like', '%' . $this->query('search') . '%');
            });
        }

        // Periksa jika ada request "per_page"
        if (in_array($this->query('per_page'), $this->rowsPerPage)) {
            $this->perPage = $this->query('per_page');
        }

        // Periksa jika ada request "order_by"
        if (in_array($this->query('order_by'), $this->columns)) {
            $this->orderBy = $this->query('order_by');
        }

        // Periksa jika ada request "order"
        if ($this->query('order') === 'desc') {
            $this->order = 'desc';
        }

        return $sbp->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }
}
