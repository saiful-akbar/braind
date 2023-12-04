<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableImportCompaniesIncreaseFloatLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('import_companies', function (Blueprint $table) {
            $table->float('pib', 17, 2)->change();
            $table->float('income_duty', 17, 2)->nullable()->change();
            $table->float('bruto', 17, 2)->after('pib')->change();
            $table->float('netto', 17, 2)->after('pib')->change();
            $table->float('bm_pay', 17, 2)->after('pib')->change();
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
