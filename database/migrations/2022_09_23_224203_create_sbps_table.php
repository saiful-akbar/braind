<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSbpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sbps', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->integer('division_id')->unsigned();
            $table->integer('amount');
            $table->integer('follow_up');
            $table->bigInteger('user_id')->unsigned();
            $table->dateTime('input_date');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('division_id')->references('id')->on('divisions');
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
        Schema::dropIfExists('sbps');
    }
}
