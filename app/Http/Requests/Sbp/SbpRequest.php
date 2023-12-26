<?php

namespace App\Http\Requests\Sbp;

use App\Models\Sbp;
use App\Models\MenuUser;
use App\Http\Requests\Pagination;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class SbpRequest extends FormRequest implements Pagination
{
    private array $columns = [
        'id',
        'jumlah',
        'tindak_lanjut',
        'tanggal_input',
        'created_at',
        'updated_at',
        'deleted_at',
        'user_id',
        'user_nama_lengkap',
        'kantor_id',
        'kantor_nama',
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
        $sbp = Sbp::leftJoin('users', 'sbp.user_id', '=', 'users.id')
            ->leftJoin('kantor', 'sbp.kantor_id', '=', 'kantor.id')
            ->select([
                'id',
                'jumlah',
                'tindak_lanjut',
                'tanggal_input',
                'created_at',
                'updated_at',
                'deleted_at',
                'user.id as user_id',
                'user.nama_lengkap as user_nama_lengkap',
                'kantor.id as kantor_id',
                'kantor.nama as kantor_nama',
            ]);

        // periksa role user.
        // jika role user sebagai admin tampilkan semua data
        // jika role user sebagai kanwil tampilkan hanya data yan

        return $sbp->paginate();
    }
}
