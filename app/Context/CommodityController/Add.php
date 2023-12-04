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
        $ic = new Commodity();
        $ic->fill($this->valid);
        $ic->slug = Slug::make(new Commodity(), $ic->label);
        $ic->save();
        return $ic;
    }
}
