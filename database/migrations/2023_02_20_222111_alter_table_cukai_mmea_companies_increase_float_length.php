<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCukaiMmeaCompaniesIncreaseFloatLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cukai_mmea_companies', function (Blueprint $table) {
            $table->float('number_of_liters', 17, 2)->change();
            $table->float('amount_of_excise_duty', 17, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cukai_mmea_companies', function (Blueprint $table) {
            //
        });
    }
}
