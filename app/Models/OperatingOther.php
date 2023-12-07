<?php

namespace App\Models;

use App\Models\Division;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperatingOther extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'division_id',
        'type_of_opration',
        'type',
        'placement_location',
        'condition',
        'notes',
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
