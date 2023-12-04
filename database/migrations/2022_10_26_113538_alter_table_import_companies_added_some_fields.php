<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableImportCompaniesAddedSomeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('import_companies', function (Blueprint $table) {
            $table->float('pib', 11, 2)->change();
            $table->float('income_duty', 11, 2)->nullable()->change();
            $table->string('tax_number', 20)->after('name');
            $table->float('bruto', 11, 2)->after('pib');
            $table->float('netto', 11, 2)->after('pib');
            $table->float('bm_pay', 11, 2)->after('pib');
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
            $table->dropColumn('tax_number');
            $table->dropColumn('bruto');
            $table->dropColumn('netto');
            $table->dropColumn('bm_pay');
        });
    }
}
