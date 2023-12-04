<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableReceiptsAddedMoreFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('receipts', function (Blueprint $table) {
            $table->float('target_import_duty', 12, 0)->after('id');
            $table->float('target_export_duty', 12, 0)->after('target_import_duty');
            $table->float('target_tax', 12, 0)->after('target_export_duty');

            $table->float('realization_import_duty', 12, 0)->after('target_tax');
            $table->float('realization_export_duty', 12, 0)->after('realization_import_duty');
            $table->float('realization_tax', 12, 0)->after('realization_export_duty');

            $table->dropColumn('achievement_target');
            $table->dropColumn('achievements');
            $table->dropColumn('percentage');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('receipts', function (Blueprint $table) {
            $table->dropColumn('target_import_duty');
            $table->dropColumn('target_export_duty');
            $table->dropColumn('target_tax');

            $table->dropColumn('realization_import_duty');
            $table->dropColumn('realization_export_duty');
            $table->dropColumn('realization_tax');

            $table->float('achievement_target', 12, 0)->after('id');
            $table->float('achievements', 12, 0)->after('achievement_target');
            $table->float('percentage', 5, 2)->after('achievements');
        });
    }
}
