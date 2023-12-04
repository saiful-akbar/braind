<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperatingFirearmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operating_firearms', function (Blueprint $table) {
            $table->id();
            $table->string('caliber_type', 30);
            $table->string('weapon_number', 30);
            $table->string('pass_book_number', 30);
            $table->string('validity_period', 30);
            $table->string('condition');
            $table->string('weapon_holder_name', 50);
            $table->string('weapon_holder_position', 20);
            $table->float('ammo_amount', 10, 0);
            $table->string('notes');
            $table->bigInteger('user_id')->unsigned();
            $table->date('input_date');
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
        Schema::dropIfExists('operating_firearms');
    }
}
