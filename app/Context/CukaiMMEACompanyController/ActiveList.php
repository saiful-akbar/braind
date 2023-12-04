<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CukaiMMEACompanyController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\CukaiMMEACompany;
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
            ->select(['cukai_mmea_companies.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'cukai_mmea_companies.name',
                'cukai_mmea_companies.number_of_documents',
                'cukai_mmea_companies.number_of_liters',
                'cukai_mmea_companies.amount_of_excise_duty',
                'cukai_mmea_companies.input_date',
                'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama Perusahaan', 'Jumlah Dokumen CK 1A', 'Jumlah Liter',
            'Jumlah Nilai Cukai', 'Tanggal Input', 'User Input'
        ];
    }

    public function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = CukaiMMEACompany::whereNull('cukai_mmea_companies.deleted_at')
            ->leftJoin('users as u', 'u.id', 'cukai_mmea_companies.user_id')
            ->select(['cukai_mmea_companies.*', 'u.name as user_name'])
            ->orderBy('cukai_mmea_companies.created_at', 'desc');
        if ($user->division_id) {
            $data->where('cukai_mmea_companies.division_id', $user->division_id);
        }

        $q = $this->request->get('q');
        if ($q) {
            $data->where('cukai_mmea_companies.name', 'like', "%$q%");
        }

        return $data;
    }

    public function read()
    {
    }
}
