<?php

namespace App\Http\Requests\Pengawasan;

use App\Models\MenuUser;
use App\Models\Pengawasan;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class PengawasanRequest extends FormRequest
{
    private array $types = [
        'Cukai EA',
        'Cukai HT',
        'Cukai MMEA',
        'Export',
        'Import',
    ];

    private array $columns = [
        'kantor_nama',
        'kantor_id',
        'tipe',
        'sbp',
        'kantor',
        'nilai_barang',
        'total_kerugian',
        'potensi_kerugian',
        'tindak_lanjut',
        'tanggal_input',
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
     * Ambil data perusahaan cukai mmea dan buat query pagination.
     *
     * @param MenuUser $access
     * @return LengthAwarePaginator
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        // daftar kolom yang akan diambil atau ditampilkan.
        $columns = [
            'pengawasan.*',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // Ambil data pada tabel pengawasan dan join dengan tabel kantor.
        // lalu buat filter berdasarkan periode waktu.
        $pengawasan = Pengawasan::select($columns)
            ->leftJoin('kantor', 'pengawasan.kantor_id', '=', 'kantor.id')
            ->whereBetween('pengawasan.tanggal_input', [
                $this->query('start_period'),
                $this->query('end_period'),
            ]);

        // Periksa jika user yang sedang login bukan sebagai admin tampilkan
        // hanya data perusahaan yang sesuai dengan kantor yang dimiliki user.
        // Jika user sebagai admin tampilkan semua data.
        if (!user()->admin) {
            $pengawasan->where('kantor.id', user()->kantor_id);
        }

        // Periksa request type
        if (in_array($this->query('type'), $this->types)) {
            $pengawasan->where('pengawasan.tipe', $this->query('type'));
        }

        // Periksa jika ada request "status" dengan nilai "dihapus"
        // dan user yang sedang login memiliki akses "destroy" (hapus permanen)
        // tampilkan hanya data yang sudah dihapus saja.
        if ($access->destroy && $this->query('status', 'aktif') == 'dihapus') {
            $pengawasan->onlyTrashed();
        }

        // Periksa jika ada request "search" untuk pencarian data
        // tambahkan query where like.
        if (!empty($this->query('search'))) {
            $pengawasan->where(function (Builder $query): void {
                $search = $this->query('search');

                $query->where('kantor.nama', 'like', "%{$search}%")
                    ->orWhere('pengawasan.kantor', 'like', "%{$search}%")
                    ->orWhere('pengawasan.sbp', 'like', "%{$search}%")
                    ->orWhere('pengawasan.tindak_lanjut', 'like', "%{$search}%");
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

        return $pengawasan->orderBy($this->orderBy, $this->order)
            ->paginate($this->perPage)
            ->withQueryString();
    }
}
