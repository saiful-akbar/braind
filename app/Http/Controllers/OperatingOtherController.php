<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\OperatingOtherController\ActiveList;
use App\Context\OperatingOtherController\Add;
use App\Context\OperatingOtherController\Delete;
use App\Context\OperatingOtherController\Edit;
use App\Context\OperatingOtherController\Get;
use App\Context\OperatingOtherController\PublicActiveList;
use Illuminate\Http\Request;

class OperatingOtherController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'type_of_operation' => 'required',
            'type' => 'required',
            'placement_location' => 'required',
            'condition' => 'required',
            'notes' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'type_of_operation' => 'sometimes|required',
            'type' => 'sometimes|required',
            'placement_location' => 'sometimes|required',
            'condition' => 'sometimes|required',
            'notes' => 'sometimes|required',
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

    public function pubActiveList($division_id, Request $request)
    {
        return $this->responseHasPaginate(new PublicActiveList($division_id, $request));
    }

    public function excel(Request $request)
    {
        return $this->exportExcel(new ActiveList($request), 'sarana-operasi-lainnya');
    }
}
