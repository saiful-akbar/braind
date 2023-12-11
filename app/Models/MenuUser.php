<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MenuUser extends Pivot
{
    protected $table = 'menu_user';

    protected $fillable = [
        'menu_id',
        'user_id',
        'create',
        'read',
        'update',
        'remove',
        'destroy',
    ];

    protected $casts = [
        'create' => 'boolean',
        'read' => 'boolean',
        'update' => 'boolean',
        'remove' => 'boolean',
        'destroy' => 'boolean',
    ];
}
