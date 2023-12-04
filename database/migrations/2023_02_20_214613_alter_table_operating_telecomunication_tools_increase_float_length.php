<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableOperatingTelecomunicationToolsIncreaseFloatLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('operating_telecomunication_tools', function (Blueprint $table) {
            $table->float('acquisition_cost', 17, 0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('operating_telecomunication_tools', function (Blueprint $table) {
            //
        });
    }
}
