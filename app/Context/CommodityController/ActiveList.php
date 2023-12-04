<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\CommodityController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Commodity;
use Illuminate\Http\Request;

class ActiveList implements Reader
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->data = Commodity::whereNull('deleted_at')
            ->orderBy('label', 'asc');
    }

    public function read()
    {
    }
}
