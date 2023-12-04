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

class Dashboard implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $ord = $request->get('ord');
        $this->request = $request;
        $this->data = CukaiMMEACompany::whereNull('cukai_mmea_companies.deleted_at')
            ->orderBy("cukai_mmea_companies.number_of_liters", 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('.division_id', $divId);
        }
        $user = auth()->user();
        if ($user && $user->division_id) {
            $this->data->where('cukai_mmea_companies.division_id', $user->division_id);
        }
    }

    public function read()
    {
    }
}
