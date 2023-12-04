<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCukaiHtHptlCompaniesIncreaseFloatLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cukai_ht_hptl_companies', function (Blueprint $table) {
            $table->float('tax_amount', 17, 2)->change();
            $table->float('amount', 17, 2)->change();
            $table->float('ck_amount', 17, 2)->change();
            $table->float('amount_of_excise_duty', 17, 2)->change();
            $table->string('bkc_type', 100)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cukai_ht_hptl_companies', function (Blueprint $table) {
            //
        });
    }
}
