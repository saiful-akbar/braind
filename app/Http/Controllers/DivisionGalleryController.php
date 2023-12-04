<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\DivisionGalleryController\ActiveListBySlug;
use App\Context\DivisionGalleryController\Add;
use App\Context\DivisionGalleryController\Delete;
use App\Context\DivisionGalleryController\Edit;
use Illuminate\Http\Request;

class DivisionGalleryController extends ApiController
{
    public function add(Request $request)
    {
        $validator = [
            'uri' => 'required',
            'url' => 'required',
        ];
        return $this->responseHandler(new Add($request), $request, $validator);
    }

    public function edit($id, Request $request)
    {
        return $this->responseHandler(new Edit($id, $request));
    }

    public function delete($id)
    {
        return $this->responseHandler(new Delete($id));
    }

    public function activeListBySlug($div_slug, Request $request)
    {
        return $this->responseHasPaginate(new ActiveListBySlug($div_slug, $request));
    }
}
