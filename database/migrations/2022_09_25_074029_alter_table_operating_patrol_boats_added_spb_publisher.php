<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableOperatingPatrolBoatsAddedSpbPublisher extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('operating_patrol_boats', function (Blueprint $table) {
            $table->string('spb_publisher', 30)->nullable()->after('spb_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('operating_patrol_boats', function (Blueprint $table) {
            $table->dropColumn('spb_publisher');
        });
    }
}
