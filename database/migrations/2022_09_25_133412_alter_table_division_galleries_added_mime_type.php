<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableDivisionGalleriesAddedMimeType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('division_galleries', function (Blueprint $table) {
            $table->string('mime_type', 50)->after('uri');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('division_galleries', function (Blueprint $table) {
            $table->dropColumn('mime_type');
        });
    }
}
