<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportCompany extends Model
{
    use HasFactory;

    protected $table = "import_companies";

    protected $fillable = [
        'name', 'pib', 'total_pay', 'income_duty', 'user_id', 'input_date',
        'division_id', 'tax_number', 'bruto', 'netto', 'bm_pay'
    ];
}
