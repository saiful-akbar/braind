<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\UserController;

use App\Context\Reader;
use App\Models\User;

class Get implements Reader
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function read()
    {
        $usr = User::find($this->id);
        if (is_null($usr)) {
            throw new \Exception("Data not found", 422);
        }
        $usr->email;
        $usr->division;
        return $usr;
    }
}
