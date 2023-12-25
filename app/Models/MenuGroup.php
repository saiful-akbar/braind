<?php

namespace App\Models;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuGroup extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'menu_group';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['nama'];

    /**
     * Ambil Menu yang dimiliki MenuHeader
     */
    public function subMenu(): HasMany
    {
        return $this->hasMany(Menu::class, 'menu_group_id', 'id');
    }
}
