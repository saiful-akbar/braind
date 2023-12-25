<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperasiSenjataApi extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'operasi_senjata_api';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'kantor_id',
        'jenis_kaliber',
        'nomor_senjata',
        'nama_pemegang_senjata',
        'pangkat_pemegang_senjata',
        'jabatan_pemegang_senajat',
        'nomor_buku_pas',
        'masa_berlaku',
        'kondisi',
        'jumlah_amunisi',
        'catatan',
        'tanggal_input',
    ];

    /**
     * Ambil User yang memiliki OperasiSenjataApi
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Ambil kantor yang memiliki OperasiSenjataApi
     */
    public function kantor(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
