<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperasiLainnya extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'operasi_lainnya';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'jenis_operasi',
        'merek',
        'tipe',
        'lokasi_penempatan',
        'kondisi',
        'catatan',
        'tanggal_input',
        'cetak'
    ];

    protected $casts = [
        'cetak' => 'boolean',
    ];

    /**
     * Ambil User yang memiliki OperasiLainnya
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil kantor yang memiliki OperasiLainnya
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
