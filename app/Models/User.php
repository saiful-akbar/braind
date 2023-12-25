<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Kantor;
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
        'kantor_id',
        'username',
        'password',
        'role',
        'nama_lengkap',
        'foto',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'negara',
        'kota',
        'kode_pos',
        'alamat',
        'telepon',
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
     * Ambil Kantor yang memiliki User.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }

    /**
     * Ambil Menu yang dimiliki User
     */
    public function menu(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_user', 'user_id', 'menu_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'remove', 'destroy');
    }

    /**
     * Ambil Menu yang dimiliki User dengan read access
     */
    public function menuWithReadAccess(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_user', 'user_id', 'menu_id')
            ->using(MenuUser::class)
            ->withPivot('create', 'read', 'update', 'remove', 'destroy')
            ->wherePivot('read', true);
    }

    /**
     * Merubah value pada attriute avatar.
     */
    public function foto(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : asset("/storage/$value"),
        );
    }
}
