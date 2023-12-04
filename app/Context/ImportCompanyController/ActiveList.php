<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ImportCompanyController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\ImportCompany;
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
            ->select(['import_companies.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'import_companies.name', 'import_companies.pib',
                'import_companies.total_pay', 'import_companies.income_duty',
                'import_companies.input_date', 'u.name as user_name'
            ])
            ->get();
    }

    public function headings(): array
    {
        return ['Nama Perusahaan', 'PIB', 'Total Bayar', 'Income Duty', 'Tanggal Input', 'User Input'];
    }

    private function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = ImportCompany::whereNull('import_companies.deleted_at')
            ->leftJoin('users as u', 'u.id', 'import_companies.user_id')
            ->select(['import_companies.*', 'u.name as user_name'])
            ->orderBy('import_companies.created_at', 'desc');
        if ($user->division_id) {
            $data->where('import_companies.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('import_companies.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
