<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperatingOthersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operating_others', function (Blueprint $table) {
            $table->id();
            $table->string('type_of_operation', 30);
            $table->string('type', 30);
            $table->string('placement_location', 30);
            $table->string('condition');
            $table->string('notes');
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
        Schema::dropIfExists('operating_others');
    }
}
