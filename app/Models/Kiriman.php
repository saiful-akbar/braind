<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kiriman extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'kiriman';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'ekspedisi_id',
        'ekspedisi_asal',
        'ekspedisi_asal_no_resi',
        'jenis_kiriman',
        'partner',
        'resi_nomor',
        'resi_tanggal',
        'pengirim_id',
        'pengirim_nama',
        'pengirim_alamat',
        'pengirim_no_tlp',
        'pengirim_asal_negara',
        'pengirim_asal_kota',
        'pengirim_asal_kecamatan',
        'penerima_id',
        'penerima_nama',
        'penerima_alamat',
        'penerima_no_tlp',
        'penerima_tujuan_negara',
        'penerima_tujuan_kota',
        'penerima_tujuan_kecamatan',
        'penerima_catatan',
        'barang_nama',
        'barang_berat',
        'barang_koli',
        'barang_penerima',
        'barang_tanggal_terima',
        'jenis_layanan',
    ];

    /**
     * Get the ekspedisi that owns the Kiriman
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ekspedisi(): BelongsTo
    {
        return $this->belongsTo(Ekspedisi::class, 'ekspedisi_id', 'id');
    }
}
