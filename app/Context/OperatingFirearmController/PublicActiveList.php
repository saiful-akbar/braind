<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingFirearmController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingFirearm;
use Illuminate\Http\Request;

class PublicActiveList implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $this->request = $request;
        $this->data = OperatingFirearm::whereNull('operating_firearms.deleted_at')
            ->orderBy('operating_firearms.created_at', 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('operating_firearms.division_id', $divId);
        }
    }

    public function read()
    {
    }
}
