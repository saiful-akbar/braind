<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionController;

use App\Context\Handler;
use App\Helpers\Slug;
use App\Models\Division;
use Illuminate\Http\Request;

class Add implements Handler
{
    private $valid;

    public function __construct(Request $request)
    {
        $this->valid = $request->all();
    }

    public function handle()
    {
        $ic = new Division();
        $ic->fill($this->valid);
        $ic->slug = Slug::make(new Division(), $this->valid['name']);
        $ic->save();
        return $ic;
    }
}
