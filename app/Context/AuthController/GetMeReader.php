<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\AuthController;

use App\Context\Reader;
use Illuminate\Contracts\Auth\Authenticatable;

class GetMeReader implements Reader
{
    /**
     * @return Authenticatable|null
     */
    public function read()
    {
        $user = auth()->user();
        $ue = $user->email;
        unset($user->email);
        $user['email'] = $ue->email;
        $user->division;
        return $user;
    }
}
