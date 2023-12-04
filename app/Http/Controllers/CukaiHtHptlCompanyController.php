<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\CukaiHtHptlCompanyController\ActiveList;
use App\Context\CukaiHtHptlCompanyController\Add;
use App\Context\CukaiHtHptlCompanyController\Dashboard;
use App\Context\CukaiHtHptlCompanyController\Delete;
use App\Context\CukaiHtHptlCompanyController\Edit;
use App\Context\CukaiHtHptlCompanyController\Get;
use Illuminate\Http\Request;

class CukaiHtHptlCompanyController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'name' => 'required',
            'ck_amount' => 'required',
            'amount_of_excise_duty' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'name' => 'sometimes|required',
            'ck_amount' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'cukai-ht-hptl');
    }
}
