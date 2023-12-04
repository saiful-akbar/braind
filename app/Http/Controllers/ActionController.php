<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\ActionController\ActiveList;
use App\Context\ActionController\Add;
use App\Context\ActionController\Delete;
use App\Context\ActionController\Edit;
use App\Context\ActionController\Get;
use App\Context\ActionController\PublicList;
use Illuminate\Http\Request;

class ActionController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'kppbc' => 'required',
            'sbp_number' => 'required',
            'sbp_date' => 'required',
            'comodity_code' => 'required',
            'amount' => 'required',
            'description' => 'required',
            'underpayment_potential' => 'required',
            'follow_up' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'kppbc' => 'sometimes|required',
            'sbp_number' => 'sometimes|required',
            'sbp_date' => 'sometimes|required',
            'comodity_code' => 'sometimes|required',
            'amount' => 'sometimes|required',
            'description' => 'sometimes|required',
            'underpayment_potential' => 'sometimes|required',
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

    public function pubList(Request $request)
    {
        return $this->responseHasPaginate(new PublicList($request));
    }

    public function excel(Request $request)
    {
        return $this->exportExcel(new ActiveList($request), 'data-penindakan');
    }
}
