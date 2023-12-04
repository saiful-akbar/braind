<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\OperatingTelecomunicationToolsController\ActiveList;
use App\Context\OperatingTelecomunicationToolsController\Add;
use App\Context\OperatingTelecomunicationToolsController\Delete;
use App\Context\OperatingTelecomunicationToolsController\Edit;
use App\Context\OperatingTelecomunicationToolsController\Get;
use App\Context\OperatingTelecomunicationToolsController\PublicActiveList;
use Illuminate\Http\Request;

class OperatingTelecomunicationToolsController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'code' => 'required',
            'nup' => 'required',
            'name' => 'required',
            'device_type' => 'required',
            'acquisition_cost' => 'required',
            'year_of_acquisition' => 'required',
            'brand' => 'required',
            'type' => 'required',
            'frequency_range' => 'required',
            'digital_technology' => 'required',
            'condition' => 'required',
            'status' => 'required',
            'placement_location' => 'required',
            'notes' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'code' => 'sometimes|required',
            'nup' => 'sometimes|required',
            'name' => 'sometimes|required',
            'device_type' => 'sometimes|required',
            'acquisition_cost' => 'sometimes|required',
            'year_of_acquisition' => 'sometimes|required',
            'brand' => 'sometimes|required',
            'type' => 'sometimes|required',
            'frequency_range' => 'sometimes|required',
            'digital_technology' => 'sometimes|required',
            'condition' => 'sometimes|required',
            'status' => 'sometimes|required',
            'placement_location' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'telecom-tool');
    }
}
