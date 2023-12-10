<?php

namespace App\Models;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
    ];

    /**
     * Ambil Menu yang dimiliki MenuHeader
     */
    public function childrens(): HasMany
    {
        return $this->hasMany(Menu::class, 'menu_group_id', 'id');
    }
}
