<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\ImportCompanyController\ActiveList;
use App\Context\ImportCompanyController\Add;
use App\Context\ImportCompanyController\Dashboard;
use App\Context\ImportCompanyController\Delete;
use App\Context\ImportCompanyController\Edit;
use App\Context\ImportCompanyController\Get;
use Illuminate\Http\Request;

class ImportCompanyController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'name' => 'required',
            'pib' => 'required',
            'total_pay' => 'required',
            'income_duty' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'name' => 'sometimes|required',
            'pib' => 'sometimes|required',
            'total_pay' => 'sometimes|required',
            'income_duty' => 'sometimes|required',
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

    public function dashboard($division_id, Request $request)
    {
        return $this->responseHasPaginate(new Dashboard($division_id, $request));
    }

    public function excel(Request $request)
    {
        return $this->exportExcel(new ActiveList($request), 'data-perusahaan-import');
    }
}
