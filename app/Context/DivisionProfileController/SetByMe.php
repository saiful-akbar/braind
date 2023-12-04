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

class SetByMe implements Handler
{
    private $id;
    private $valid;

    public function __construct(Request $request)
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('Invalid user data', 422);
        }
        if (is_null($user->division_id)) {
            throw new \Exception('Invalid division data', 422);
        }
        $this->id = $user->division_id;
        $this->valid = $request->all();
        $this->valid['division_id'] = $this->id;
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
