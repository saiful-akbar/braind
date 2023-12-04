<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterTableExportCompaniesAddedSomeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('export_companies')->update(['peb' => 0]);
        Schema::table('export_companies', function (Blueprint $table) {
            $table->float('peb', 11, 2)->change();
            $table->string('tax_number', 20)->after('name');
            $table->float('bruto', 11, 2)->after('peb');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('export_companies', function (Blueprint $table) {
            $table->dropColumn('tax_number');
            $table->dropColumn('bruto');
        });
    }
}
