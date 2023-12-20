<?php

namespace App\Http\Requests\Divisions;

use App\Models\Division;
use App\Models\MenuUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class DivisionRequest extends FormRequest
{
    /**
     * Daftar kolom yang akan dikirim
     */
    private array $columns = [
        'id',
        'name',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Jumlah baris per halaman
     */
    private array $rowsPerPage = [10, 25, 50, 100, 200];

    /**
     * Default baris per halaman
     */
    private int $perPage = 10;

    /**
     * Default kolom yang diorder
     */
    private string $sortBy = 'name';
    private string $sort = 'asc';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Buat query pagination pada model
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        $query = Division::select($this->columns);

        // Periksa apakah user memliki akses destroy atau tidak,
        // dan jika ada request display dengan nilai 'removed'
        // tampilkan hanya data yang sudah dihapus.
        if ($access->destroy && $this->display == 'removed') {
            $query->onlyTrashed();
        }

        // periksa jika ada request untuk merubah jumlah baris perhalaman.
        if (in_array($this->per_page, $this->rowsPerPage)) {
            $this->perPage = $this->per_page;
        }

        // Periksa jika ada request untuk merubah kolom yang disortir.
        if (in_array($this->order_by, $this->columns)) {
            $this->sortBy = $this->order_by;
        }

        // Periksa jika ada request untuk merubah jenis sorti pada kolom.
        if ($this->order == 'desc') {
            $this->sort = 'desc';
        }

        // Periksa jika ada request pemcarian.
        if (!empty($this->search)) {
            $query->where('id', 'like', "%{$this->search}%")
                ->orWhere('name', 'like', "%{$this->search}%");
        }

        return $query->orderBy($this->sortBy, $this->sort)->paginate($this->perPage);
    }
}
