<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CommodityController;

use App\Context\Reader;
use App\Models\Commodity;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $ic = Commodity::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }
        return $ic;
    }
}
