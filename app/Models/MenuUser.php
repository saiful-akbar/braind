<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\Pivot;

class MenuUser extends Pivot
{
    use HasUuids;

    protected $table = 'menu_user';
    protected $keyType = 'string';
    public $incrementing = false;

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
