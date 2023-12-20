<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\MenuUser;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasUuids;

    protected $fillable = [
        'division_id',
        'username',
        'password',
        'full_name',
        'photo',
        'gender',
        'date_of_birth',
        'place_of_birth',
        'country',
        'city',
        'postal_code',
        'address',
        'phone',
        'email',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * Ambil Division yang memiliki User.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
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
    public function photo(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : asset("/storage/$value"),
        );
    }
}
