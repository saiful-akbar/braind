<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ActionController;

use App\Context\Handler;
use App\Models\Action;
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
        $act = Action::find($this->id);
        if (is_null($act)) {
            throw new \Exception("Data not found", 422);
        }

        $act->deleted_at = Carbon::now(env('APP_TIMEZONE'));
        $act->save();

        return $act;
    }
}
