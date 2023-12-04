<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCukaiMMEACompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cukai_mmea_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('number_of_documents', 30);
            $table->float('number_of_liters', 11, 2);
            $table->float('amount_of_excise_duty', 11, 2);
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
        Schema::dropIfExists('cukai_mmea_companies');
    }
}
