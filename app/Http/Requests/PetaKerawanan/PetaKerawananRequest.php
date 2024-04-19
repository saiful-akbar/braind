<?php

namespace App\Http\Requests\PetaKerawanan;

use App\Models\GaleriKantor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class PetaKerawananRequest extends FormRequest
{
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
            'kantor' => ['nullable', 'exists:kantor,id'],
            'type' => ['nullable', 'in:gambar,video'],
            'search' => ['nullable', 'string'],
        ];
    }

    /**
     * Ambil data peta kerawanan
     *
     * @return LengthAwarePaginator
     */
    public function paginate(): LengthAwarePaginator
    {
        // select data peta kerawanan beserta kantornya.
        $sql = GaleriKantor::with('kantor')->where('tipe', 'peta');

        // Periksa jika user bukan sebagai admin,
        // tampilkan hanya data yang sesuai dengan kantor_id
        // yang dimiliki user.
        if (!user()->admin) {
            $sql->where('kantor_id', user()->kantor_id);
        }

        // Jika user sebagai admin dan ada request kantor,
        // filter data berdasarkan kantor_id yang dikirim
        if (user()->admin && !empty($this->query('kantor'))) {
            $sql->where('kantor_id', $this->query('kantor_id'));
        }

        // periksa jika ada request "type" dengan nilai "video",
        // tampilkan hanya data video saja
        if ($this->query('type') == 'video') {
            $sql->whereNotNull('video_url');
        } else {
            $sql->whereNotNull('gambar_url');
        }

        // Periksa jika ada request "search", tambahkan query pencarian
        // untuk judul dan ketarangan
        if (!empty($this->query('search'))) {
            $search = $this->query('search');

            $sql->where(function (Builder $sql) use ($search): void {
                $sql->where('judul', 'like', "%{$search}%")
                    ->orWhere('keterangan', 'like', "%{$search}%");
            });
        }

        return $sql->orderBy('created_at', 'desc')->paginate(12);
    }
}
