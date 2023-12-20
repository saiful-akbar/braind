<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\Pagination;
use App\Models\MenuUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRequest extends FormRequest implements Pagination
{
    private array $columns = [
        'division_id',
        'division_name',
        'photo',
        'full_name',
    ];

    private string $order = 'asc';
    private string $orderBy = 'full_name';

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
        $user = User::select('users.*', 'divisions.name AS division_name')
            ->leftJoin('divisions', 'users.division_id', '=', 'divisions.id');

        // Tampilkan hanya data yang sudah dihapus jika ada request
        // display dengan nilai "removed" dan user memiliki akses destroy.
        if ($this->get('display') == 'removed' && $access->destroy) {
            $user->onlyTrashed();
        }

        // cari data berdasarkan request search
        if ($this->get('search') != '') {
            $search = $this->get('search');

            $user->where('users.full_name', 'like', "%$search%")
                ->orWhere('divisions.name', 'like', "%$search%");
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
