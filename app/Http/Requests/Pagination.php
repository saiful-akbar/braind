<?php

namespace App\Http\Requests;

use App\Models\MenuUser;
use Illuminate\Pagination\LengthAwarePaginator;

interface Pagination
{
	public function paginate(MenuUser $access): LengthAwarePaginator;
}