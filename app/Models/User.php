<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\UserEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

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
     * Merubah value pada attriute avatar.
     */
    public function avatar(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : asset("/storage/$value"),
        );
    }
}
