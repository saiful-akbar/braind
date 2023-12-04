<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CommodityController;

use App\Context\Handler;
use App\Models\Commodity;
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
        $ic = Commodity::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }

        $ic->deleted_at = Carbon::now(env('APP_TIMEZONE'));
        $ic->save();

        return $ic;
    }
}
