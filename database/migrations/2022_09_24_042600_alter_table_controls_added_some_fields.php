<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableControlsAddedSomeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('controls', function (Blueprint $table) {
            $table->string('name')->default('')->after('id');
            $table->float('loss_value', 10, 0)->nullable()->after('item_value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('controls', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('loss_value');
        });
    }
}
