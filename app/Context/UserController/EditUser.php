<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\UserController;

use App\Context\Handler;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EditUser implements Handler
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function handle()
    {
        /** @var User */
        $user = auth()->user();
        if (is_null($user)) {
            throw new \Exception('Invalid user data', 422);
        }
        $user->fill($this->request->all());
        DB::transaction(function () use ($user) {
            $user->save();
        });
        return $user;
    }
}
