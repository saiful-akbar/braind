<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperasiAlatPemindai extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'operasi_alat_pemindai';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'pemindai',
        'nama_alat',
        'ukuran_alat',
        'merek',
        'tipe',
        'nomor_seri',
        'tampilan',
        'tahun_perolehan',
        'kondisi',
        'lokasi_penempatan',
        'jam_operasi',
        'jam_pemindaian',
        'jumlah_pemindaian',
        'hasil_keluaran',
        'catatan',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki OperasiAlatPemindai
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki OperasiAlatPemindai
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
