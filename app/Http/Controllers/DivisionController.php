<?php

namespace App\Http\Controllers;

use App\Http\Requests\Divisions\DivisionRequest;
use Inertia\Response;

class DivisionController extends Controller
{
    function index(DivisionRequest $request): Response
    {
        return $this->renderPaginate('Division/index', $request->paginate());
    }
}
