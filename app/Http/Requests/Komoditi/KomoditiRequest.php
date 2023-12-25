<?php

namespace App\Http\Requests\Komoditi;

use App\Models\Komoditi;
use App\Models\MenuUser;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class KomoditiRequest extends FormRequest
{
    /**
     * Daftar kolom yang akan ditampilkan
     *
     * @var array
     */
    private $columns = [
        'id',
        'kode',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Default sortir kolom
     */
    private string $sort = 'asc';
    private string $sortBy = 'kode';

    /**
     * Jumlah baris perhalaman
     */
    private array $rowsPerPage = [10, 25, 50, 100, 200];

    /**
     * Defalt baris perhalaman
     */
    private int $perPage = 10;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Query pagination
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        $komoditi = Komoditi::select($this->columns);

        // periksa apakah user memiliki akses destroy atau tidak.
        // periksa juga apakah ada request "status" dengan nilai "removed"...
        // ...jika ada tampilkan hanya data yang sudah dihapus (soft deletes).
        if ($access->destroy && $this->status == 'dihapus') {
            $komoditi->onlyTrashed();
        }

        // periksa apakah ada request "order_by" atau tidak...
        // ...Jika ada periksa juga apakah kolom yang ingin di-order ada pada...
        // ...kolom yang akan ditampilkan atau tidak pada properti "$columns"
        if (in_array($this->order_by, $this->columns)) {
            $this->sortBy = $this->order_by;
        }

        // periksa apakah ada request "order" untuk jenis urutan orderBy...
        // ...pada kolom (asc || desc)
        if ($this->order == 'desc') {
            $this->sort = 'desc';
        }

        // periksa apakah ada request "search" untuk pencarian pada tabel.
        if (!empty($this->search)) {
            $komoditi->where(function (Builder $query): void {
                $query->where('id', 'like', "%{$this->search}%")
                    ->orWhere('kode', 'like', "%{$this->search}%");
            });
        }

        // periksa apakah ada request "per_page" untuk merubah jumlah...
        // ...baris per halaman yang ditampilkan.
        if (in_array($this->per_page, $this->rowsPerPage)) {
            $this->perPage = $this->per_page;
        }

        return $komoditi->orderBy($this->sortBy, $this->sort)->paginate($this->perPage);
    }
}
