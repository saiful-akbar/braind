<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\CukaiMMEACompanyController\ActiveList;
use App\Context\CukaiMMEACompanyController\Add;
use App\Context\CukaiMMEACompanyController\Dashboard;
use App\Context\CukaiMMEACompanyController\Delete;
use App\Context\CukaiMMEACompanyController\Edit;
use App\Context\CukaiMMEACompanyController\Get;
use Illuminate\Http\Request;

class CukaiMMEACompanyController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'name' => 'required',
            'number_of_documents' => 'required',
            'number_of_liters' => 'required',
            'amount_of_excise_duty' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'name' => 'sometimes|required',
            'number_of_documents' => 'sometimes|required',
            'number_of_liters' => 'sometimes|required',
            'amount_of_excise_duty' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'cukai-mmea');
    }
}
