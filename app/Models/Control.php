<?php

namespace App\Models;

use App\Models\Division;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Control extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'user_id',
        'division_id',
        'name',
        'sbp',
        'follow_up',
        'item_value',
        'total',
        'loss_value',
        'type',
        'input_date',
    ];

    /**
     * Ambil User yang memiliki Sbp.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Division yang memiliki Sbp.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
