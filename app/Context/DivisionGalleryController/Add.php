<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionGalleryController;

use App\Context\Handler;
use App\Helpers\Slug;
use App\Models\DivisionGallery;
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
        $gl = new DivisionGallery();
        $gl->fill($this->valid);
        $gl->save();
        return $gl;
    }
}
