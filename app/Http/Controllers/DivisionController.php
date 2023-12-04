<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\DivisionController\ActiveList;
use App\Context\DivisionController\Add;
use App\Context\DivisionController\Delete;
use App\Context\DivisionController\Edit;
use App\Context\DivisionController\Get;
use App\Context\DivisionController\GetBySlug;
use App\Context\DivisionController\GetProfileByMe;
use Illuminate\Http\Request;

class DivisionController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'name' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'name' => 'sometimes|required',
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

    public function getProfileByMe()
    {
        return $this->responseReader(new GetProfileByMe());
    }

    public function getBySlug($slug)
    {
        return $this->responseReader(new GetBySlug($slug));
    }

    public function activeList(Request $request)
    {
        return $this->responseHasPaginate(new ActiveList($request));
    }
}
