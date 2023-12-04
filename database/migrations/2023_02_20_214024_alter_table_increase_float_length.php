<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableIncreaseFloatLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('import_companies', function (Blueprint $table) {
            $table->float('total_pay', 17, 2)->change();
            $table->float('income_duty', 17, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('import_companies', function (Blueprint $table) {
            //
        });
    }
}
