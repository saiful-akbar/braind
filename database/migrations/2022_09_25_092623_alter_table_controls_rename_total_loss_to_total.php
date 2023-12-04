<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableControlsRenameTotalLossToTotal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('controls', function (Blueprint $table) {
            $table->dropColumn('total_loss');
            $table->float('total', 10, 0)->after('item_value');
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
            $table->float('total_loss', 10, 0)->after('item_value');
            $table->dropColumn('total');
        });
    }
}
