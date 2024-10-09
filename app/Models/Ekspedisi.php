<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ekspedisi extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'ekspedisi';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'nama'
    ];

    /**
     * Get all of the kiriman for the Ekspedisi
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function kiriman(): HasMany
    {
        return $this->hasMany(Kiriman::class, 'ekspedisi_id', 'id');
    }
}
