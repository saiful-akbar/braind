<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ActionController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Action;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $ord = $request->get('ord');
        $this->request = $request;
        $this->data = Action::whereNull('actions.deleted_at')
            ->select('name', DB::raw("$ord as value"))
            ->orderBy("actions.$ord", 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('actions.division_id', $divId);
        }
    }

    public function read()
    {
    }
}
