<?php

namespace App\Models;

use App\Models\Division;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DivisionGallery extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'division_id',
        'url',
        'uri',
        'mime_type',
        'type',
        'title',
        'description',
    ];

    /**
     * Ambil Division yang memiliki DivisionGallery.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
