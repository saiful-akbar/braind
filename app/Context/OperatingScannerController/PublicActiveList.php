<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingScannerController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingScanner;
use Illuminate\Http\Request;

class PublicActiveList implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $this->request = $request;
        $this->data = OperatingScanner::whereNull('operating_scanners.deleted_at')
            ->orderBy('operating_scanners.created_at', 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('operating_scanners.division_id', $divId);
        }
    }

    public function read()
    {
    }
}
