<?php

namespace App\Http\Requests\Galeri;

use App\Models\GaleriKantor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class GaleriRequest extends FormRequest
{
    /**
     * Daftar kolom yang akan dikirim
     */
    private array $columns = [
        'id',
        'video_url',
        'gambar_url',
        'mime_type',
        'tipe',
        'judul',
        'keterangan',
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
    private string $orderBy = 'updated_at';
    private string $order = 'asc';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Ambil data galeri kantor
     *
     * @return LengthAwarePaginator
     */
    public function paginate(): LengthAwarePaginator
    {
        $galeri = GaleriKantor::select($this->columns)->where('kantor_id', user()->kantor_id);

        // periksa jika ada request untuk merubah jumlah baris perhalaman.
        if (in_array($this->query('per_page'), $this->rowsPerPage)) {
            $this->perPage = $this->query('per_page');
        }

        // Periksa jika ada request untuk merubah kolom yang disortir.
        if (in_array($this->query('order_by'), $this->columns)) {
            $this->orderBy = $this->query('order_by');
        }

        // Periksa jika ada request untuk merubah jenis sortir pada kolom.
        if ($this->query('order') == 'desc') {
            $this->order = 'desc';
        }


        // Periksa jika ada request pencarian
        if (!empty($this->query('search'))) {
            $galeri->where(function (Builder $query): void {
                $search = $this->query('search');

                $query->where('judul', 'like', "%$search%")
                    ->orWhere('keterangan', 'like', "%$search%");
            });
        }

        return $galeri->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }
}
