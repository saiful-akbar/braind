<?php

namespace App\Models;

use App\Models\GaleriKantor;
use App\Models\ProfilKantor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kantor extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'kantor';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['nama'];

    /**
     * Ambil ProfilKantor yang dimiliki Kantor.
     */
    public function profil(): HasOne
    {
        return $this->hasOne(ProfilKantor::class, 'kantor_id', 'id');
    }

    /**
     * Ambil GaleriKantor yang dimiliki Kantor
     */
    public function galeri(): HasMany
    {
        return $this->hasMany(GaleriKantor::class, 'kantor_id', 'id');
    }
}
