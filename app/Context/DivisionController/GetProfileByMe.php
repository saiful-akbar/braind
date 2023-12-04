<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionController;

use App\Context\Reader;
use App\Models\Division;

class GetProfileByMe implements Reader
{
    private $id;

    public function __construct()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('Invalid user data', 422);
        }
        if (is_null($user->division_id)) {
            throw new \Exception('Belum tergabung di kanwil', 421);
        }
        $this->id = $user->division_id;
    }

    public function read()
    {
        $div = Division::find($this->id);
        if (is_null($div)) {
            throw new \Exception("Data not found", 422);
        }
        $div->profile;
        $div->galleries;
        return $div;
    }
}
