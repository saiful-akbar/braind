<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ActionController;

use App\Context\Reader;
use App\Models\Action;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $act = Action::find($this->id);
        if (is_null($act)) {
            throw new \Exception("Data not found", 422);
        }
        return $act;
    }
}
