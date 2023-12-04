<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\ReceiptController\ActiveList;
use App\Context\ReceiptController\Add;
use App\Context\ReceiptController\ChartActiveList;
use App\Context\ReceiptController\Delete;
use App\Context\ReceiptController\Edit;
use App\Context\ReceiptController\Get;
use Illuminate\Http\Request;

class ReceiptController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'target_import_duty' => 'required',
            'target_export_duty' => 'required',
            'target_tax' => 'required',
            'realization_import_duty' => 'required',
            'realization_export_duty' => 'required',
            'realization_tax' => 'required',
            // 'achievement_target' => 'required',
            // 'achievements' => 'required',
            // 'percentage' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'target_import_duty' => 'sometimes|required',
            'target_export_duty' => 'sometimes|required',
            'target_tax' => 'sometimes|required',
            'realization_import_duty' => 'sometimes|required',
            'realization_export_duty' => 'sometimes|required',
            'realization_tax' => 'sometimes|required',

            // 'achievement_target' => 'sometimes|required',
            // 'achievements' => 'sometimes|required',
            // 'percentage' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'data-penerimaan-');
    }
}
