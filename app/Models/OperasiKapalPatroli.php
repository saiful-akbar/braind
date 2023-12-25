<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperasiKapalPatroli extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'operasi_kapal_patroli';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'nomor_lambung',
        'kondisi',
        'nomor_spb',
        'tanggal_spb',
        'penerbit_spb',
        'jumlah_hari',
        'catatan',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki OperasiKapalPatroli.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki OperasiKapalPatroli.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
