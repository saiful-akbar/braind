<?php

namespace App\Http\Requests\Perusahaan;

use App\Models\MenuUser;
use App\Models\Perusahaan;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class PerusahaanRequest extends FormRequest
{
    private array $columns = [
        'id',
        'nama',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    private string $orderBy = 'nama';
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

    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        // Ambil semua kolom pada data 
        $perusahaan = Perusahaan::select($this->columns);

        // Jika dad request "status" dengan nilai "dihapus" dan user login
        // memiliki akses destroy maka tampilkan data yang sudah dihapus.
        if ($access->destroy && $this->query('status', 'aktif') == 'dihapus') {
            $perusahaan->onlyTrashed();
        }

        // Periksa jika ada request "search" untuk pencarian data
        // tambahkan query where like.
        if (!empty($this->query('search'))) {
            $perusahaan->where(function (Builder $query): void {
                $search = $this->query('search');

                $query->where('id', 'like', "%{$search}%")
                    ->orWhere('nama', 'like', "%{$search}%");
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

        return $perusahaan->orderBy($this->orderBy, $this->order)
            ->paginate($this->perPage)
            ->withQueryString();
    }
}
