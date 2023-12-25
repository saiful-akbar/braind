<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Komoditi extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'komoditi';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['kode'];
}
