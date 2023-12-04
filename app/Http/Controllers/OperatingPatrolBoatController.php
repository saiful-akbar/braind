<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\OperatingPatrolBoatController\ActiveList;
use App\Context\OperatingPatrolBoatController\Add;
use App\Context\OperatingPatrolBoatController\Delete;
use App\Context\OperatingPatrolBoatController\Edit;
use App\Context\OperatingPatrolBoatController\Get;
use App\Context\OperatingPatrolBoatController\PublicActiveList;
use Illuminate\Http\Request;

class OperatingPatrolBoatController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'hull_number' => 'required',
            'condition' => 'required',
            'spb_number' => 'required',
            'spb_date' => 'required',
            'day_amount' => 'required',
            'notes' => 'required',
            // 'input_date' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'hull_number' => 'sometimes|required',
            'condition' => 'sometimes|required',
            'spb_number' => 'sometimes|required',
            'spb_date' => 'sometimes|required',
            'day_amount' => 'sometimes|required',
            'notes' => 'sometimes|required',
            // 'input_date' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'patrol-boat');
    }
}
