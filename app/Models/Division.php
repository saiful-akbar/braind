<?php

namespace App\Models;

use App\Models\DivisionProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Division extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'seq',
    ];

    /**
     * Ambil DivisionProfile yang dimiliki Division.
     */
    public function profile(): HasOne
    {
        return $this->hasOne(DivisionProfile::class, 'division_id', 'id');
    }

    /**
     * Ambil DivisionGallery yang dimiliki Division
     */
    public function galleries(): HasMany
    {
        return $this->hasMany(DivisionGallery::class, 'division_id', 'id');
    }
}
