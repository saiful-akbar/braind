<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use App\Models\MenuUser;
use App\Http\Requests\Pagination;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRequest extends FormRequest implements Pagination
{
    private array $columns = [
        'id',
        'nama_lengkap',
        'foto',
        'admin',
        'email',
        'kantor_id',
        'kantor_nama',
    ];

    private string $order = 'asc';
    private string $orderBy = 'nama_lengkap';

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
     * Ambin data user dan buat query pagination.
     */
    public function paginate(MenuUser $access): LengthAwarePaginator
    {
        $user = User::leftJoin('kantor', 'users.kantor_id', '=', 'kantor.id')
            ->select(
                'users.*',
                'kantor.id AS kantor_id',
                'kantor.nama AS kantor_nama',
            );

        // Tampilkan hanya data yang sudah dihapus jika ada request
        // status dengan nilai "removed" dan user memiliki akses destroy.
        if ($this->get('status') == 'dihapus' && $access->destroy) {
            $user->onlyTrashed();
        }

        // cari data berdasarkan request search
        if ($this->get('search') != '') {
            $search = $this->get('search');

            $user->where(function (Builder $query) use ($search): void {
                $query->where('users.nama_lengkap', 'like', "%$search%")
                    ->orWhere('users.email', 'like', "%$search%")
                    ->orWhere('kantor.nama', 'like', "%$search%");
            });
        }

        // urutkan data berdasarkan request "order_by" dan "order"
        if (in_array($this->get('order_by'), $this->columns)) {
            $this->orderBy = $this->get('order_by');
        }

        if ($this->get('order') == 'desc') {
            $this->order = 'desc';
        }

        // ambil banyaknya baris data berdasarkan nilai pada request "per_page"
        if (in_array($this->get('per_page'), $this->rowsPerPage)) {
            $this->perPage = $this->get('per_page');
        }

        return $user->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }
}
