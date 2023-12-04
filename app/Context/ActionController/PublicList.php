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

class PublicList implements Reader
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->data = Action::whereNull('actions.deleted_at')
            ->join('divisions as d', 'd.id', 'actions.division_id')
            ->select(['actions.*', 'd.name as division_name'])
            ->orderBy('actions.created_at', 'desc');
    }

    public function read()
    {
    }
}
