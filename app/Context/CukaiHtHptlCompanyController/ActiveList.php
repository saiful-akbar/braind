<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CukaiHtHptlCompanyController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\CukaiHtHptlCompany;
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
            ->select(['cukai_ht_hptl_companies.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'cukai_ht_hptl_companies.name',
                'cukai_ht_hptl_companies.ck_amount',
                'cukai_ht_hptl_companies.amount_of_excise_duty',
                'cukai_ht_hptl_companies.input_date', 'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return ['Nama Perusahaan', 'Jumlah CK', 'Jumlah Nilai Cukai', 'Tanggal Input', 'User Input'];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = CukaiHtHptlCompany::whereNull('cukai_ht_hptl_companies.deleted_at')
            ->leftJoin('users as u', 'u.id', 'cukai_ht_hptl_companies.user_id')
            ->orderBy('cukai_ht_hptl_companies.created_at', 'desc');
        if ($user->division_id) {
            $data->where('cukai_ht_hptl_companies.division_id', $user->division_id);
        }

        $q = $this->request->get('q');
        if ($q) {
            $data->where('cukai_ht_hptl_companies.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
