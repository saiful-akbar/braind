<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperatingScannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operating_scanners', function (Blueprint $table) {
            $table->id();
            $table->string('scanner', 30);
            $table->string('name', 50);
            $table->string('tool_size', 10);
            $table->string('brand', 30);
            $table->string('type', 20);
            $table->string('serial_number', 30);
            $table->string('singgle_dual_view', 10);
            $table->string('year_of_acquisition', 4);
            $table->string('condition', 50);
            $table->string('placement_location', 50);
            $table->string('operating_hours', 50);
            $table->string('scan_hours', 10);
            $table->smallInteger('number_of_scans');
            $table->string('output');
            $table->string('notes');
            $table->bigInteger('user_id')->unsigned();
            $table->string('input_date');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('operating_scanners');
    }
}
