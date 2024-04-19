<?php

namespace App\Http\Requests\Galeri;

use App\Models\GaleriKantor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class GaleriRequest extends FormRequest
{
    /**
     * Default baris per halaman
     */
    private int $perPage = 12;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'kantor' => ['nullable', 'exists:kantor,id']
        ];
    }

    /**
     * Ambil data galeri kantor
     *
     * @return LengthAwarePaginator
     */
    public function paginate(): LengthAwarePaginator
    {
        $galeri = GaleriKantor::with('kantor')->where('tipe', 'galeri');

        // Periksa jika user bukan sebagai admin, tampilkan hanya data yang
        // sesuai dengan kantor_id yang dimiliki user.
        if (!user()->admin) {
            $galeri->where('kantor_id', user()->kantor_id);
        }

        // Periksa jika ada request "kantor" dan user sebagai admin, filter data
        // hanya berdasarkan kolom "kantor_id"
        if (!empty($this->query('kantor')) && user()->admin) {
            $galeri->where('kantor_id', $this->query('kantor'));
        }

        // periksa jika ada request "type" dengan nilai "video"
        // tampilkan hanya data yang berupa "video"
        if ($this->query('type') == 'video') {
            $galeri->whereNotNull('video_url');
        } else {
            $galeri->whereNotNull('gambar_url');
        }

        // Periksa jika ada request pencarian
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $galeri->where(function (Builder $query) use ($search): void {
                $query->where('judul', 'like', "%$search%")
                    ->orWhere('keterangan', 'like', "%$search%");
            });
        }

        return $galeri->orderBy('created_at', 'desc')->paginate($this->perPage);
    }
}
