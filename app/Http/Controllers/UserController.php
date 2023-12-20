<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\UserRequest;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Menampilkan halaman utama master user.
     */
    public function index(UserRequest $request): Response
    {
        return $this->render('User/index');
    }
}
