<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\UserController;

use App\Context\Handler;
use App\Models\User;
use App\Models\UserEmail;
use App\Models\UserPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterUserHandler implements Handler
{
    private $valid;

    public function __construct(Request $request)
    {
        $this->valid = $request->all();
    }

    public function handle()
    {
        $user = new User();
        $user->fill($this->valid);
        if (isset($this->valid['division'])) {
            $user->division_id = $this->valid['division']['id'];
        }
        DB::transaction(function () use ($user) {
            $user->save();
            $this->setPassword($user, $this->valid);
            $this->setEmail($user, $this->valid);
        });
        return $user;
    }

    public function setPassword(User $user, $valid)
    {
        $userPass = new UserPassword();
        $userPass->user_id = $user->id;
        $userPass->setPassword($valid['password']);
        $userPass->active = true;
        $userPass->save();
    }

    public function setEmail(User $user, $valid)
    {
        $userEmail = new UserEmail();
        $userEmail->user_id = $user->id;
        $userEmail->email = $valid['email'];
        if (isset($valid['domain'])) {
            $userEmail->domain = $valid['domain'];
        }
        if (isset($valid['raw_input'])) {
            $userEmail->raw_input = $valid['raw_input'];
        }
        $userEmail->primary = true;
        $userEmail->active = true;
        $userEmail->save();
    }
}
