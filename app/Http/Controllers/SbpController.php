<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\SbpController\ActiveList;
use App\Context\SbpController\Add;
use App\Context\SbpController\ChartActiveList;
use App\Context\SbpController\Delete;
use App\Context\SbpController\Edit;
use App\Context\SbpController\Get;
use Illuminate\Http\Request;

class SbpController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'division' => 'required',
            'amount' => 'required',
            'follow_up' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'amount' => 'required',
            'follow_up' => 'required',
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

    public function getChart(Request $request)
    {
        return $this->responseReader(new ChartActiveList($request));
    }

    public function excel(Request $request)
    {
        return $this->exportExcel(new ActiveList($request), 'sbp');
    }
}
