<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\MenuController;

use App\Context\Handler;
use Illuminate\Http\Request;

class SaveAccessHandler implements Handler
{
    private $userId;
    private $request;

    public function __construct($userId, Request $request)
    {
        $this->userId = $userId;
        $this->request = $request;
    }

    public function handle()
    {
        return MenuAccess::save($this->userId, $this->request->all());
    }
}
