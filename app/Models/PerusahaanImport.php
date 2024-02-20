<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PerusahaanImport extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'perusahaan_import';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'nama_perusahaan',
        'npwp',
        'pib',
        'pembayaran_bea_masuk',
        'netto',
        'bruto',
        'total_pembayaran',
        'bea_masuk',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki PerusahaanImport.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil Division yang memiliki PerusahaanImport.
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
