<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableOperatingFirearmsAddedWeaponHolderRank extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('operating_firearms', function (Blueprint $table) {
            $table->string('weapon_holder_rank', 20)->nullable()->after('weapon_holder_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('operating_firearms', function (Blueprint $table) {
            $table->dropColumn('weapon_holder_rank');
        });
    }
}
