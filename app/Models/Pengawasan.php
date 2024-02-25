<?php

namespace App\Models;

use App\Models\User;
use App\Models\Kantor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengawasan extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'pengawasan';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'tipe',
        'sbp',
        'kantor',
        'nilai_barang',
        'total_kerugian',
        'potensi_kerugian',
        'tindak_lanjut',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki Sbp.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil kantor yang memiliki Sbp.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
