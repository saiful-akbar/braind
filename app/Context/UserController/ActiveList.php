<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\UserController;

use App\Context\HasPaginate;
use App\Context\PagedList;
use App\Context\Reader;
use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActiveList implements Reader, FromCollection, WithHeadings
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->data = $this->data()
            ->select(['users.*', 'ue.email as email']);
    }

    public function collection()
    {
        return $this->data()
            ->leftJoin('divisions as d', 'd.id', 'users.division_id')
            ->select(['users.name', 'ue.email as email', 'd.name as kanwil', 'users.created_at'])
            ->get();
    }

    public function data()
    {
        return User::whereNull('users.deleted_at')
            ->join('user_emails as ue', 'users.id', 'ue.user_id')
            ->orderBy('users.created_at', 'desc');
    }

    public function headings(): array
    {
        return ['Nama', 'Email', 'Kanwil', 'Tanggal Registrasi'];
    }

    public function read()
    {
        $paginator = $this->paginate();
        $items = [];

        foreach ($paginator->items() as $item) {
            $item->division;
            $items[] = $item;
        }

        return PagedList::fromPaginator($items, $paginator);
    }
}
