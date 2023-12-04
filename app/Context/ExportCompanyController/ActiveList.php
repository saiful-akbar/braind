<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ExportCompanyController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\ExportCompany;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActiveList implements Reader, FromCollection, WithHeadings
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $this->request = $request;
        $this->data = $this->data()
            ->select(['export_companies.*', 'u.name as user_name']);
    }

    public function collection()
    {
        return $this->data()
            ->select([
                'export_companies.name',
                'export_companies.peb',
                'export_companies.devisa',
                'export_companies.export_duty',
                'export_companies.netto',
                'export_companies.input_date',
                'u.name as user_name'
            ])->get();
    }

    public function headings(): array
    {
        return ['Nama Perusahaan', 'PEB', 'Devisa', 'Bea Keluar', 'Netto', 'Tanggal Input', 'User Input'];
    }

    public function data()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('invalid user', 422);
        }
        $data = ExportCompany::whereNull('export_companies.deleted_at')
            ->leftJoin('users as u', 'u.id', 'export_companies.user_id')
            ->orderBy('export_companies.created_at', 'desc');
        if ($user->division_id) {
            $data->where('export_companies.division_id', $user->division_id);
        }
        $q = $this->request->get('q');
        if ($q) {
            $data->where('export_companies.name', 'like', "%$q%");
        }
        return $data;
    }

    public function read()
    {
    }
}
