<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterTableAddedDivisionId extends Migration
{
    private static $TABLES = [
        'controls',
        'cukai_ht_hptl_companies',
        'cukai_mmea_companies',
        'export_companies',
        'import_companies',
        'operating_firearms',
        'operating_others',
        'operating_patrol_boats',
        'operating_scanners',
        'operating_telecomunication_tools',
        'receipts',
    ];
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach (self::$TABLES as $tb) {
            Schema::table($tb, function (Blueprint $table) {
                $table->integer('division_id')->unsigned()->nullable()->after('user_id');

                $table->foreign('division_id')->references('id')->on('divisions');
            });

            // $all = DB::table($tb)->get();
            // foreach ($all as $data) {
            //     $user = DB::table('users')->where('id', $data->user_id)->first();
            //     if ($user) {
            //         DB::update("UPDATE $tb SET division_id = $user->division_id WHERE id = $data->id");
            //     }
            // }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (self::$TABLES as $tb) {
            Schema::table($tb, function (Blueprint $table) use ($tb) {
                $table->dropForeign($tb . "_division_id_foreign");
                $table->dropIndex($tb . "_division_id_foreign");
                $table->dropColumn('division_id');
            });
        }
    }
}
