<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Division;
use Illuminate\Http\Request;

class ActiveList implements Reader
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->data = Division::whereNull('deleted_at')
            ->orderBy('seq', 'asc');
    }

    public function read()
    {
    }
}
