<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\SbpController;

use App\Context\Reader;
use App\Models\Control;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $sbp = Control::find($this->id);
        if (is_null($sbp)) {
            throw new \Exception("Data not found", 422);
        }
        $sbp->division;
        return $sbp;
    }
}
