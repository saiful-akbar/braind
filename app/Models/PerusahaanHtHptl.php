<?php

namespace App\Models;

use App\Models\Kantor;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PerusahaanHtHptl extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'perusahaan_ht_hptl';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'nama_perusahaan',
        'nppbkc',
        'jumlah_ck',
        'jenis_bkc',
        'jumlah',
        'jumlah_cukai',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki PerusahaanHtHptl.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki PerusahaanHtHptl.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
