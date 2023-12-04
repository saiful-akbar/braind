<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\MenuController;

use App\Context\Reader;
use Illuminate\Support\Facades\Auth;

class GetMyAccessReader implements Reader
{
    protected ?int $userId;

    public function __construct()
    {
        $user = Auth::user();

        if (is_null($user)) {
            throw new \Exception("Ups access not allowed ....", 422);
        }

        $this->userId = $user?->id;
    }

    public function read()
    {
        try {
            return MenuAccess::get($this->userId);
        } catch (\Exception $e) {
            return [];
        }
    }
}
