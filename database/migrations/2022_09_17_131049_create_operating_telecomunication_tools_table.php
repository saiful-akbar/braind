<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperatingTelecomunicationToolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operating_telecomunication_tools', function (Blueprint $table) {
            $table->id();
            $table->string('device_type', 30);
            $table->float('acquisition_cost', 10, 0);
            $table->string('year_of_acquisition', 4);
            $table->string('brand', 50);
            $table->string('type', 50);
            $table->string('frequency_range', 20);
            $table->string('digital_technology', 30);
            $table->string('condition', 20);
            $table->string('status', 30);
            $table->string('placement_location', 50);
            $table->string('notes');
            $table->string('code', 20);
            $table->string('nup', 20);
            $table->string('name');
            $table->date('input_date');
            $table->bigInteger('user_id')->unsigned();
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
        Schema::dropIfExists('operating_telecomunication_tools');
    }
}
