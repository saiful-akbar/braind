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
        'video_url',
        'gambar_url',
        'mime_type',
        'tipe',
        'judul',
        'keterangan',
    ];

    /**
     * Merubah value gambar_url ketika di ambil.
     *
     * @return Attribute
     */
    public function gambar_url(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : asset("/storage/{$value}"),
        );
    }

    /**
     * Merubah value video_url ketika di ambil.
     *
     * @return Attribute
     */
    public function video_url(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? null : "https://www.youtube.com/embed/{$value}",
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
