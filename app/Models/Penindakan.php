<?php

namespace App\Models;

use App\Models\Kantor;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penindakan extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'penindakan';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'kppbc',
        'nomor_sbp',
        'tanggal_sbp',
        'kode_komoditi',
        'jumlah',
        'uraian',
        'perkiraan_nilai_barang',
        'potensi_kurang_bayar',
        'tindak_lanjut',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki Penindakan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki Penindakan.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
