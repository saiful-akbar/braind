<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserEmail extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'email',
        'domain',
        'raw_input',
        'primary',
        'active',
    ];

    protected $casts = [
        'primary' => 'boolean',
        'active' => 'boolean',
    ];

    /**
     * Ambil User yang memiliki UserEmail.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
