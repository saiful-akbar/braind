<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterTableCukaiMmeaCompaniesCompaniesAddedSomeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('cukai_mmea_companies')->update(['number_of_documents' => 0]);
        Schema::table('cukai_mmea_companies', function (Blueprint $table) {
            $table->float('number_of_documents', 11, 2)->change();
            $table->string('nppbkc')->after('name');
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
            $table->dropColumn('nppbkc');
        });
    }
}
