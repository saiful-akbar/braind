<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\OperatingFirearmController\ActiveList;
use App\Context\OperatingFirearmController\Add;
use App\Context\OperatingFirearmController\Delete;
use App\Context\OperatingFirearmController\Edit;
use App\Context\OperatingFirearmController\Get;
use App\Context\OperatingFirearmController\PublicActiveList;
use Illuminate\Http\Request;

class OperatingFirearmController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'caliber_type' => 'required',
            'weapon_number' => 'required',
            'pass_book_number' => 'required',
            'validity_period' => 'required',
            'condition' => 'required',
            'weapon_holder_name' => 'required',
            'weapon_holder_position' => 'required',
            'ammo_amount' => 'required',
            'notes' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'caliber_type' => 'sometimes|required',
            'weapon_number' => 'sometimes|required',
            'pass_book_number' => 'sometimes|required',
            'validity_period' => 'sometimes|required',
            'condition' => 'sometimes|required',
            'weapon_holder_name' => 'sometimes|required',
            'weapon_holder_position' => 'sometimes|required',
            'ammo_amount' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'senjata-api');
    }
}
