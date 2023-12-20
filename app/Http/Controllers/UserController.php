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
    public function index(UserRequest $request): mixed
    {
        $access = $this->getAccessByRoute('user');
        $data = $request->paginate($access);

        return $this->renderPaginate(
            component: 'User/index',
            paginator: $data,
            access: $access,
        );
    }
}
