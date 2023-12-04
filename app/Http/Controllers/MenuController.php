<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\MenuController\GetAccessReader;
use App\Context\MenuController\GetByUserReader;
use App\Context\MenuController\GetMyAccessReader;
use App\Context\MenuController\SaveAccessHandler;
use Illuminate\Http\Request;

class MenuController extends ApiController
{
    public function getMenu(Request $request)
    {
        return $this->responseReader(new GetAccessReader($request));
    }

    public function saveAccess($user_id, Request $request)
    {
        return $this->responseHandler(new SaveAccessHandler($user_id, $request));
    }

    public function getMyAccess()
    {
        return $this->responseReader(new GetMyAccessReader());
    }

    public function getByUser($user_id)
    {
        return $this->responseReader(new GetByUserReader($user_id));
    }
}
