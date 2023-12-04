<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionGalleryController;

use App\Context\Handler;
use App\Models\DivisionGallery;
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
        $ic = DivisionGallery::find($this->id);
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }

        $ic->fill($this->valid);
        $ic->save();

        return $ic;
    }
}
