<?php

namespace App\Models;

use App\Models\Kantor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProfilKantor extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'profil_kantor';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'kantor_id',
        'keterangan',
        'aktifitas',
        'area_pengawasan',
    ];

    /**
     * Ambil Kantor yang mmeniliki ProfilKantor
     */
    public function profil(): BelongsTo
    {
        return $this->belongsTo(Kantor::class, 'kantor_id', 'id');
    }
}
