<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Perusahaan extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'perusahaan';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'nama'
    ];
}
