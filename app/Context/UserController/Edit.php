<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\UserController;

use App\Context\Handler;
use App\Models\User;
use App\Models\UserPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Edit implements Handler
{
    private $id;
    private $valid;

    public function __construct($id, Request $request)
    {
        $this->id = $id;
        $this->valid = $request->all();
    }

    public function handle()
    {
        $usr = User::find($this->id);
        if (is_null($usr)) {
            throw new \Exception("Data not found", 422);
        }
        $usr->fill($this->valid);
        DB::beginTransaction();
        if (isset($this->valid['password'])) {
            $pass = $usr->password;
            $pass->active = false;
            $pass->save();

            $newPass = new UserPassword();
            $newPass->user_id = $usr->id;
            $newPass->active = true;
            $newPass->setPassword($this->valid['password']);
            $newPass->save();
        }

        if ($this->valid['division']) {
            $usr->division_id = $this->valid['division']['id'];
        }

        $usr->save();
        DB::commit();
        return $usr;
    }
}
