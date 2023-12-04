<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\SbpController;

use App\Context\Handler;
use App\Models\Sbp;
use Carbon\Carbon;
use Illuminate\Http\Request;

class Add implements Handler
{
    private $valid;

    public function __construct(Request $request)
    {
        $this->valid = $request->all();
        $this->valid['input_date'] = Carbon::now(env('APP_TIMEZONE'))->format('Y-m-d');
    }

    public function handle()
    {
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('Invalid user data', 422);
        }
        $sbp = new Sbp();
        $sbp->fill($this->valid);
        $sbp->division_id = $this->valid['division']['id'];
        $sbp->user_id = $user->id;
        $sbp->save();
        return $sbp;
    }
}
