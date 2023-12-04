<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\ExportCompanyController\ActiveList;
use App\Context\ExportCompanyController\Add;
use App\Context\ExportCompanyController\Dashboard;
use App\Context\ExportCompanyController\Delete;
use App\Context\ExportCompanyController\Edit;
use App\Context\ExportCompanyController\Get;
use Illuminate\Http\Request;

class ExportCompanyController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'name' => 'required',
            'peb' => 'required',
            'devisa' => 'required',
            'export_duty' => 'required',
            'netto' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        $validator = [
            'name' => 'sometimes|required',
            'peb' => 'sometimes|required',
            'devisa' => 'sometimes|required',
            'export_duty' => 'sometimes|required',
            'netto' => 'sometimes|required',
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
        return $this->exportExcel(new ActiveList($request), 'perusahaan-expor-');
    }
}
