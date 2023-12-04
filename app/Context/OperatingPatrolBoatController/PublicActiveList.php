<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingPatrolBoatController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperationPatrolBoat;
use Illuminate\Http\Request;

class PublicActiveList implements Reader
{
    use HasPaginate;

    public function __construct($divisionId, Request $request)
    {
        $this->request = $request;
        $this->data = OperationPatrolBoat::whereNull('operating_patrol_boats.deleted_at')
            ->orderBy('operating_patrol_boats.created_at', 'desc');
        if ($divisionId) {
            $this->data->where('operating_patrol_boats.division_id', $divisionId);
        }
    }

    public function read()
    {
    }
}
