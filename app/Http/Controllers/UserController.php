<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Http\Controllers;

use App\Context\UserController\ActiveList;
use App\Context\UserController\Delete;
use App\Context\UserController\Edit;
use App\Context\UserController\EditUser;
use App\Context\UserController\Get;
use App\Context\UserController\RegisterUserHandler;
use App\Context\UserController\SetPasswordHandler;
use Illuminate\Http\Request;
use Validator;

class UserController extends ApiController
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email|unique:user_emails',
                'password' => 'required|confirmed',
                'name' => 'required',
            ]);
            $handler = new RegisterUserHandler($request);
            $data = $handler->handle();
            return $this->responseData($data);
        } catch (\Exception $e) {
            return $this->responseException($e);
        }
    }

    public function setPassword(Request $request)
    {
        try {
            $this->validate($request, [
                'password' => 'sometimes|required|confirmed',
            ]);
            $handler = new SetPasswordHandler($request);
            $data = $handler->handle();
            return $this->responseData($data);
        } catch (\Exception $e) {
            return $this->responseException($e);
        }
    }

    public function updateMe(Request $request)
    {
        return $this->responseHandler(new EditUser($request));
    }

    public function activeList(Request $request)
    {
        return $this->responseHasPaginateReader(new ActiveList($request));
    }

    public function get($id)
    {
        return $this->responseReader(new Get($id));
    }

    public function edit($id, Request $request)
    {
        $rules = [
            'password' => 'confirmed',
        ];
        return $this->responseHandler(new Edit($id, $request), $request, $rules);
    }

    public function delete($id)
    {
        return $this->responseHandler(new Delete($id));
    }

    public function excel(Request $request)
    {
        return $this->exportExcel(new ActiveList($request), 'User');
    }
}
