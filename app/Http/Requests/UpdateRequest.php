<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Collection;

interface UpdateRequest
{
    public function update(): void;
}
