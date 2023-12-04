<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionController;

use App\Context\Reader;
use App\Models\Division;

class GetBySlug implements Reader
{
    private $slug;

    public function __construct($slug)
    {
        $this->slug = $slug;
    }

    public function read()
    {
        $div = Division::where('slug', $this->slug)
            ->first();
        if (is_null($div)) {
            throw new \Exception("Data not found", 422);
        }
        $div->galleries;
        $div->profile;
        return $div;
    }
}
