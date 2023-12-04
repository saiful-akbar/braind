<?php

/**
 * Generated by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $table = "actions";

    protected $fillable = [
        'kppbc', 'division_id', 'user_id', 'sbp_number', 'sbp_date',
        'comodity_code', 'amount', 'description', 'underpayment_potential',
        'follow_up', 'estimated_item_value', 'input_date'
    ];
}
