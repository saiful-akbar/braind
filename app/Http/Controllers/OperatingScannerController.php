<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\OperatingScannerController\ActiveList;
use App\Context\OperatingScannerController\Add;
use App\Context\OperatingScannerController\Delete;
use App\Context\OperatingScannerController\Edit;
use App\Context\OperatingScannerController\Get;
use App\Context\OperatingScannerController\PublicActiveList;
use Illuminate\Http\Request;

class OperatingScannerController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'scanner' => 'required',
            'name' => 'required',
            'tool_size' => 'required',
            'brand' => 'required',
            'type' => 'required',
            'serial_number' => 'required',
            'singgle_dual_view' => 'required',
            'year_of_acquisition' => 'required',
            'condition' => 'required',
            'placement_location' => 'required',
            'operating_hours' => 'required',
            'scan_hours' => 'required',
            'number_of_scans' => 'required',
            'output' => 'required',
            'notes' => 'required',
            // 'input_date' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'scanner' => 'sometimes|required',
            'name' => 'sometimes|required',
            'tool_size' => 'sometimes|required',
            'brand' => 'sometimes|required',
            'type' => 'sometimes|required',
            'serial_number' => 'sometimes|required',
            'singgle_dual_view' => 'sometimes|required',
            'year_of_acquisition' => 'sometimes|required',
            'condition' => 'sometimes|required',
            'placement_location' => 'sometimes|required',
            'operating_hours' => 'sometimes|required',
            'scan_hours' => 'sometimes|required',
            'number_of_scans' => 'sometimes|required',
            'output' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'pemindai-pendeteksi');
    }
}
