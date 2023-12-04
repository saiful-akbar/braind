<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableDivisionGalleriesAddedDescriptionAndType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('division_galleries', function (Blueprint $table) {
            $table->string('description')->nullable()->after('mime_type');
            $table->string('type', 2)->nullable()->after('mime_type');
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
            $table->dropColumn('description');
            $table->dropColumn('type');
        });
    }
}
