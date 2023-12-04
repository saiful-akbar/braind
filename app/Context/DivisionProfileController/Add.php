<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionProfileController;

use App\Context\Handler;
use App\Models\DivisionProfile;
use Illuminate\Http\Request;

class Add implements Handler
{
    private $id;
    private $valid;

    public function __construct($id, Request $request)
    {
        $this->id = $id;
        $this->valid = $request->all();
    }

    public function handle()
    {
        $dp = DivisionProfile::where('division_id', $this->id)
            ->first();
        if (is_null($dp)) {
            $dp = new DivisionProfile();
        }
        $dp->fill($this->valid);
        $dp->save();
        return $dp;
    }
}
