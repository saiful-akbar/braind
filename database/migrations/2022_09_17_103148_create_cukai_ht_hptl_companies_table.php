<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCukaiHtHptlCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cukai_ht_hptl_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->float('ck_amount', 11, 2);
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
        Schema::dropIfExists('cukai_ht_hptl_companies');
    }
}
