<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCukaiHtHptlCompaniesAddedSomeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cukai_ht_hptl_companies', function (Blueprint $table) {
            $table->float('amount_of_excise_duty', 11, 2)->nullable()->change();
            $table->string('nppbkc')->after('name');
            $table->string('bkc_type', 100)->after('nppbkc');
            $table->float('amount', 11, 2)->after('nppbkc');
            $table->float('tax_amount', 11, 2)->after('nppbkc');
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
            $table->dropColumn('nppbkc');
            $table->dropColumn('bkc_type');
            $table->dropColumn('amount');
            $table->dropColumn('tax_amount');
        });
    }
}
