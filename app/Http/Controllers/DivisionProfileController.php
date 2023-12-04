<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\DivisionProfileController\ActiveList;
use App\Context\DivisionProfileController\Add;
use App\Context\DivisionProfileController\Delete;
use App\Context\DivisionProfileController\SetByMe;
use Illuminate\Http\Request;

class DivisionProfileController extends ApiController
{
    public function setByMe(Request $request)
    {
        return $this->responseHandler(new SetByMe($request));
    }

    // public function add(Request $request)
    // {
    //     return $this->responseHandler(new Add($request), $request, $validator);
    // }

    // public function delete($id)
    // {
    //     return $this->responseHandler(new Delete($id));
    // }

    // public function activeList(Request $request)
    // {
    //     return $this->responseHasPaginate(new ActiveList($request));
    // }
}
