<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dokumen extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'dokumen';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'kantor_id',
        'tanggal',
        'jenis_dokumen',
        'keterangan',
        'file',
        'mime_type',
        'extension',
    ];

    /**
     * Merubah value file ketika diambil.
     *
     * @return Attribute
     */
    public function file(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => storage_url('dokumen/' . ltrim($value, '/')),
        );
    }

    /**
     * Get the kantor that owns the Dokumen
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
