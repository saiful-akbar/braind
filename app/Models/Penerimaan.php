<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penerimaan extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'penerimaan';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'target_bea_masuk',
        'realisasi_bea_masuk',
        'target_bea_keluar',
        'realisasi_bea_keluar',
        'target_cukai',
        'realisasi_cukai',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki Penerimaan
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki Penerimaan
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
