<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingPatrolBoatController;

use App\Context\Reader;
use App\Models\OperationPatrolBoat;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $ic = OperationPatrolBoat::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }
        return $ic;
    }
}
