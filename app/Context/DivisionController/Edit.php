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
    }

    public function handle()
    {
        $ic = Division::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }
        $ic->fill($this->valid);
        $ic->slug = Slug::make(new Division(), $this->valid['name']);
        $ic->save();
        return $ic;
    }
}
