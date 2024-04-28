<?php

namespace App\Http\Requests\OperasiSenjataApi;

use App\Models\MenuUser;
use App\Models\OperasiSenjataApi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class OperasiSenjataApiRequest extends FormRequest
{
    private array $columns = [
        'kantor_id',
        'kantor_nama',
        'jenis_kaliber',
        'nomor_senjata',
        'nama_pemegang_senjata',
        'pangkat_pemegang_senjata',
        'jabatan_pemegang_senjata',
        'nomor_buku_pas',
        'masa_berlaku',
        'kondisi',
        'jumlah_amunisi',
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
     * Ambil data sarana operasi senjata api dan buat query pagination.
     *
     * @param MenuUser $access
     * @return LengthAwarePaginator
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        // daftar kolom yang akan diambil atau ditampilkan.
        $columns = [
            'operasi_senjata_api.*',
            'kantor.id as kantor_id',
            'kantor.nama as kantor_nama',
        ];

        // Ambil data pada tabel operasi senjata api dan join dengan tabel kantor.
        // lalu buat filter berdasarkan periode waktu.
        $operasi = OperasiSenjataApi::select($columns)
            ->leftJoin('kantor', 'operasi_senjata_api.kantor_id', '=', 'kantor.id')
            ->whereBetween('operasi_senjata_api.tanggal_input', [
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
