<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ImportCompanyController;

use App\Context\Handler;
use App\Models\ImportCompany;
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
        $ic = new ImportCompany();
        $ic->fill($this->valid);
        $ic->user_id = $user->id;
        $ic->division_id = $user->division_id;
        $ic->save();
        return $ic;
    }
}
