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

    /**
     * Get all of the sbp for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sbp(): HasMany
    {
        return $this->hasMany(Sbp::class, 'kantor_id', 'id');
    }

    /**
     * Get all of the operasiKapalPtroli for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function operasiKapalPatroli(): HasMany
    {
        return $this->hasMany(OperasiKapalPatroli::class, 'kantor_id', 'id');
    }

    /**
     * Get all of the operasiAlatTelekomunikasi for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function operasiAlatTelekomunikasi(): HasMany
    {
        return $this->hasMany(OperasiAlatTelekomunikasi::class, 'kantor_id', 'id');
    }

    /**
     * Get all of the operasiSenjataApi for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function operasiSenjataApi(): HasMany
    {
        return $this->hasMany(OperasiSenjataApi::class, 'kantor_id', 'id');
    }

    /**
     * Get all of the operasiAlatPemindai for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function operasiAlatPemindai(): HasMany
    {
        return $this->hasMany(OperasiAlatPemindai::class, 'kantor_id', 'id');
    }

    /**
     * Get all of the operasiLainnya for the Kantor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function operasiLainnya(): HasMany
    {
        return $this->hasMany(OperasiLainnya::class, 'kantor_id', 'id');
    }
}
