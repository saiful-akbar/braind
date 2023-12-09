<?php

namespace App\Models;

use App\Models\User;
use App\Models\MenuUser;
use App\Models\MenuGroup;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_group_id',
        'name',
        'icon',
        'uri',
        'route',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    /**
     * Ambil MenuGroup yang memiliki Menu
     */
    public function menuGroup(): BelongsTo
    {
        return $this->belongsTo(MenuGroup::class, 'menu_group_id', 'id');
    }

    /**
     * Ambil User yang memiliki Menu
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'menu_user', 'menu_id', 'user_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'delete', 'destroy');
    }

    /**
     * Ambil User yang memiliki Menu dengan akses read
     */
    public function usersWithReadAccess(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'menu_user', 'menu_id', 'user_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'delete', 'destroy')
            ->wherePivot('read', true);
    }

    /**
     * Ubah value pada attribute uri
     */
    public function uri(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : url($value),
        );
    }
}
