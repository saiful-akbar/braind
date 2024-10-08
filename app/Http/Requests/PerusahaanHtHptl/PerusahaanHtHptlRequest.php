<?php

namespace App\Http\Requests\PerusahaanHtHptl;

use App\Models\MenuUser;
use App\Models\PerusahaanHtHptl;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class PerusahaanHtHptlRequest extends FormRequest
{
    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'nama_perusahaan',
        'nppbkc',
        'jumlah_ck',
        'jenis_bkc',
        'jumlah',
        'jumlah_cukai',
        'tanggal_input',
        'deleted_at',
    ];

    private string $order = 'asc';
    private string $orderBy = 'kantor_nama';
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
        ];
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
                $this->query('start_period'),
                $this->query('end_period'),
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
                    ->orWhere('perusahaan_ht_hptl.nppbkc', 'like', "%{$search}%")
                    ->orWhere('perusahaan_ht_hptl.jenis_bkc', 'like', "%{$search}%")
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

        // buat query order dan pagination
        return $query->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }
}
