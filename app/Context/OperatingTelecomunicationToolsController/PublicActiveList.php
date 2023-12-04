<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\OperatingTelecomunicationToolsController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\OperatingTelecomunicationTools;
use Illuminate\Http\Request;

class PublicActiveList implements Reader
{
    use HasPaginate;

    public function __construct($divId, Request $request)
    {
        $this->request = $request;
        $this->data = OperatingTelecomunicationTools::whereNull('operating_telecomunication_tools.deleted_at')
            ->orderBy('operating_telecomunication_tools.created_at', 'desc');
        if ($divId && $divId > 0) {
            $this->data->where('operating_telecomunication_tools.division_id', $divId);
        }
    }

    public function read()
    {
    }
}
