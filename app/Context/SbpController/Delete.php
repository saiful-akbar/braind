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

class Delete implements Handler
{
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function handle()
    {
        $sbp = Sbp::find($this->id);
        if (is_null($sbp)) {
            throw new \Exception("Data not found", 422);
        }

        $sbp->deleted_at = Carbon::now(env('APP_TIMEZONE'));
        $sbp->save();

        return $sbp;
    }
}
