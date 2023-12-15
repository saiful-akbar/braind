<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailVerification extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'email',
        'token',
        'expired_at',
        'request_remaining',
        'verified',
    ];

    protected $hidden = [
        'token'
    ];

    protected $casts = [
        'verified' => 'boolean'
    ];
}
