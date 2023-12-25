<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperasiAlatTelekomunikasi extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'operasi_alat_telekomunikasi';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'nama_barang',
        'kode_barang',
        'nup',
        'jenis_perangkat',
        'harga_perolehan',
        'tahun_perolehan',
        'merek',
        'tipe',
        'rentang_frekuensi',
        'teknologi_digital',
        'kondisi',
        'status',
        'lokasi_penempatan',
        'catatan',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki OperasiAlatTelekomunikasi
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Kantor yang memiliki OperasiAlatTelekomunikasi
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
