<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingOtherController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingOther;
use Illuminate\Http\Request;

class PublicActiveList implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $this->request = $request;
        $this->data = OperatingOther::whereNull('operating_others.deleted_at')
            ->orderBy('operating_others.created_at', 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('operating_others.division_id', $divId);
        }
    }

    public function read()
    {
    }
}
