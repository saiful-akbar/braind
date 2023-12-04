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

class Edit implements Handler
{
    private $id;
    private $valid;

    public function __construct($id, Request $request)
    {
        $this->id = $id;
        $this->valid = $request->all();
        $this->valid['input_date'] = Carbon::now(env('APP_TIMEZONE'))->format('Y-m-d');
    }

    public function handle()
    {
        $sbp = Sbp::find($this->id);
        if (is_null($sbp)) {
            throw new \Exception("Data not found", 422);
        }
        $sbp->fill($this->valid);
        $sbp->save();
        return $sbp;
    }
}
