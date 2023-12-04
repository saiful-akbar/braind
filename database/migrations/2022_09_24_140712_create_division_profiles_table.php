<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDivisionProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('division_profiles', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->integer('division_id')->unsigned();
            $table->text('description');
            $table->text('activity',);
            $table->text('surveillance_area');
            $table->timestamps();

            $table->foreign('division_id')->references('id')->on('divisions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('division_profiles');
    }
}
