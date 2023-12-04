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
use Illuminate\Support\Facades\DB;

class Dashboard implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $ord = $request->get('ord');
        $this->request = $request;
        $this->data = ExportCompany::whereNull('export_companies.deleted_at')
            ->select('name', DB::raw("$ord as value"))
            ->orderBy("export_companies.$ord", 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('export_companies.division_id', $divId);
        }
        $user = auth()->user();
        if ($user && $user->division_id) {
            $this->data->where('export_companies.division_id', $user->division_id);
        }
    }

    public function read()
    {
    }
}
