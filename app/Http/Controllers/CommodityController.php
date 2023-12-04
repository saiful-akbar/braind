<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\CommodityController\ActiveList;
use App\Context\CommodityController\Add;
use App\Context\CommodityController\Delete;
use App\Context\CommodityController\Edit;
use App\Context\CommodityController\Get;
use Illuminate\Http\Request;

class CommodityController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'label' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'label' => 'sometimes|required',
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
}
