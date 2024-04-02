<?php

namespace App\Models;

use App\Models\Kantor;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GaleriKantor extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'galeri_kantor';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'kantor_id',
        'url',
        'uri',
        'mime_type',
        'tipe',
        'judul',
        'keterangan',
    ];

    /**
     * Merubah value uri ketika di ambil.
     *
     * @return Attribute
     */
    public function uri(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset("/storage/{$value}"),
        );
    }

    /**
     * Ambil Kantor yang memiliki galeri.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
