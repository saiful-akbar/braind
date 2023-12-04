<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperatingPatrolBoatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operating_patrol_boats', function (Blueprint $table) {
            $table->id();
            $table->string('hull_number', 30);
            $table->string('condition');
            $table->string('spb_number', 30);
            $table->date('spb_date');
            $table->smallInteger('day_amount');
            $table->string('notes');
            $table->date('input_date', 30);
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
        Schema::dropIfExists('operating_patrol_boats');
    }
}
