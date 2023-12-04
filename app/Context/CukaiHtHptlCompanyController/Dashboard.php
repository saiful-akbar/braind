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

class Dashboard implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $ord = $request->get('ord');
        $this->request = $request;
        $this->data = CukaiHtHptlCompany::whereNull('deleted_at')
            ->orderBy("ck_amount", 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('division_id', $divId);
        }
        $user = auth()->user();
        if ($user && $user->division_id) {
            $this->data->where('cukai_ht_hptl_companies.division_id', $user->division_id);
        }
    }

    public function read()
    {
    }
}
