<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ControlController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Control;
use Illuminate\Http\Request;

class PublicList implements Reader
{
    use HasPaginate;

    public function __construct(Request $request)
    {
        $type = $request->get('type');
        $division = $request->get('division');
        $this->request = $request;
        $this->data = Control::whereNull('controls.deleted_at')
            ->select(['controls.*'])
            ->orderBy('controls.created_at', 'desc');
        if ($type) {
            $this->data->where('type', $type);
        }
        if ($division) {
            $this->data->where('controls.division_id', $division);
        }
    }

    public function read()
    {
    }
}
