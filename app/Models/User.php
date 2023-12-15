<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\MenuUser;
use App\Models\UserEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasUuids;

    protected $fillable = [
        'division_id',
        'name',
        'sex',
        'place_of_birth',
        'birth_date',
        'phone',
        'role',
        'instagram',
        'avatar',
    ];

    /**
     * Ambil Division yang memiliki User.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    /**
     * Ambil UserPassword yang dimiliki User
     */
    public function password(): HasOne
    {
        return $this->hasOne(UserPassword::class, 'user_id', 'id');
    }

    /**
     * Ambil UserEmail yang dimiliki User.
     */
    public function emails(): HasMany
    {
        return $this->hasMany(UserEmail::class, 'user_id', 'id');
    }

    /**
     * Ambil Menu yang dimiliki User
     */
    public function menus(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_user', 'user_id', 'menu_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'remove', 'destroy');
    }

    /**
     * Ambil Menu yang dimiliki User dengan read access
     */
    public function menusWithReadAccess(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_user', 'user_id', 'menu_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'remove', 'destroy')
            ->wherePivot('read', true);
    }

    /**
     * Merubah value pada attriute avatar.
     */
    public function avatar(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : asset("/storage/$value"),
        );
    }
}
