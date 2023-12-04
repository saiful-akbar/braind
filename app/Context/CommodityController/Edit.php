<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CommodityController;

use App\Context\Handler;
use App\Helpers\Slug;
use App\Models\Commodity;
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
        $ic = Commodity::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }
        $ic->fill($this->valid);
        $ic->slug = Slug::make(new Commodity(), $ic->label);
        $ic->save();
        return $ic;
    }
}
