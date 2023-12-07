<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DivisionProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'division_id',
        'description',
        'activity',
        'surveillance_area',
    ];

    /**
     * Ambil Division yang mmeniliki DivisionProfile
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
