<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\ControlController\ActiveList;
use App\Context\ControlController\Add;
use App\Context\ControlController\Delete;
use App\Context\ControlController\Edit;
use App\Context\ControlController\Get;
use App\Context\ControlController\PublicList;
use Illuminate\Http\Request;

class ControlController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'sbp' => 'required',
            'total' => 'required',
            'item_value' => 'required',
            'follow_up' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'sbp' => 'sometimes|required',
            'total' => 'sometimes|required',
            'item_value' => 'sometimes|required',
            'follow_up' => 'sometimes|required',
        ];
        return $this->responseHandler(new Edit($id, $request), $request, $validator);
    }

    public function delete($id)
    {
        return $this->responseHandler(new Delete($id));
    }

    public function get($id)
    {
        return $this->responseReader(new Get($id));
    }

    public function activeList(Request $request)
    {
        return $this->responseHasPaginate(new ActiveList($request));
    }

    public function publicList(Request $request)
    {
        return $this->responseHasPaginate(new PublicList($request));
    }

    public function excel(Request $request)
    {
        $type = $request->get('type') ?? '-';
        return $this->exportExcel(new ActiveList($request), 'pengawasan-' . $type);
    }
}
